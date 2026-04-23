// src/pages/UnAssignedPincode.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { useNotification } from "../../context/useNotification";

export default function UnAssignedPincode() {
  const { showSuccess, showError } = useNotification();

  // Data states
  const [users, setUsers] = useState([]);
  const [selectedCases, setSelectedCases] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // UI states
  const [searchTerm, setSearchTerm] = useState("");
  const [pincodeSearchTerm, setPincodeSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Fetch users and pincodes from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/admin/unassign-cases/users");
      if (response?.success && Array.isArray(response.data)) {
        const usersData = response.data;
        setUsers(usersData);

        const initialSelected = {};
        usersData.forEach((user) => {
          const uid = String(user.userId);
          const pincodes = user.pincodes || [];
          const pincodeObj = {};
          pincodes.forEach((pin) => {
            pincodeObj[String(pin)] = false;
          });
          initialSelected[uid] = { allSelected: false, pincodes: pincodeObj };
        });
        setSelectedCases(initialSelected);
      } else {
        showError(response?.message || "Failed to fetch userid");
      }
    } catch (err) {
      showError(err?.message || "Failed to fetch userid");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users by search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;
    return users.filter((user) =>
      String(user.userId).includes(searchTerm.trim()),
    );
  }, [users, searchTerm]);

  // Filter pincodes for selected user
  const filteredPincodes = useMemo(() => {
    const selectedUserData = users.find(
      (u) => String(u.userId) === selectedUserId,
    );
    const pincodes = selectedUserData?.pincodes || [];
    if (!pincodeSearchTerm.trim()) return pincodes;
    return pincodes.filter((pin) =>
      String(pin).includes(pincodeSearchTerm.trim()),
    );
  }, [users, selectedUserId, pincodeSearchTerm]);

  const handleUserCheckChange = (userId) => {
    setSelectedCases((prev) => {
      const next = { ...prev };
      const currentAllSelected = next[userId]?.allSelected || false;
      const newAllSelected = !currentAllSelected;
      const userPincodes = next[userId]?.pincodes || {};
      const updatedPincodes = {};
      Object.keys(userPincodes).forEach((pin) => {
        updatedPincodes[pin] = newAllSelected;
      });
      next[userId] = {
        allSelected: newAllSelected,
        pincodes: updatedPincodes,
      };
      return next;
    });
  };

  const handlePincodeCheckChange = (userId, pincode) => {
    setSelectedCases((prev) => {
      const next = { ...prev };
      const currentPincodes = next[userId]?.pincodes || {};
      const newValue = !currentPincodes[pincode];
      const updatedPincodes = {
        ...currentPincodes,
        [pincode]: newValue,
      };
      const allSelected = Object.values(updatedPincodes).every(Boolean);
      next[userId] = {
        allSelected,
        pincodes: updatedPincodes,
      };
      return next;
    });
  };

  const selectedCount = useMemo(() => {
    let count = 0;
    Object.values(selectedCases).forEach((userSel) => {
      count += Object.values(userSel.pincodes || {}).filter(Boolean).length;
    });
    return count;
  }, [selectedCases]);

  const handleSubmit = async () => {
    const selections = [];
    Object.entries(selectedCases).forEach(([userId, userSelection]) => {
      const selectedPincodes = Object.entries(userSelection.pincodes || {})
        .filter(([, isSelected]) => isSelected)
        .map(([pincode]) => pincode);
      if (selectedPincodes.length > 0) {
        selections.push({ userId, pincodes: selectedPincodes });
      }
    });

    if (selections.length === 0) {
      showError("Please select at least one case to unassign");
      return;
    }

    setSubmitting(true);
    try {
      const response = await apiClient.post("/admin/unassign-cases", {
        selections,
      });
      if (response?.success) {
        showSuccess(response?.data?.message || "Cases unassigned successfully");
        await fetchUsers();
        setSelectedUserId(null);
        setPincodeSearchTerm("");
      } else {
        showError(response?.message || "Failed to unassign cases");
      }
    } catch (err) {
      showError(err?.message || "Failed to unassign cases");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedUserData = users.find(
    (u) => String(u.userId) === selectedUserId,
  );
  const selectedUserSelections = selectedCases[selectedUserId]?.pincodes || {};

  // Helper to toggle pincode on card click
  const togglePincode = (userId, pincode, e) => {
    // Prevent triggering if the click originated from the checkbox itself
    if (e.target.type !== "checkbox") {
      handlePincodeCheckChange(userId, pincode);
    }
  };

  return (
    <div className="page-users-edit p-4">
      <style>
        {`
          .responsive-split {
            display: flex;
            flex-direction: row;
            gap: 1.5rem;
          }
          .users-panel {
            flex: 1;
            min-width: 280px;
          }
          .pincodes-panel {
            flex: 3;
          }
          @media (max-width: 768px) {
            .responsive-split {
              flex-direction: column;
            }
            .users-panel, .pincodes-panel {
              width: 100%;
              flex: auto;
            }
          }

          /* Enhanced card style */
          .act-session-item {
            background: #fff;
            border-radius: 0.75rem;
            border: 1px solid #e2e8f0;
            padding: 0.75rem 1rem;
            transition: all 0.2s ease-in-out;
            cursor: pointer;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
          }
          .act-session-item:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 20px -10px rgba(0, 0, 0, 0.15);
            border-color: #cbd5e1;
          }
          .act-session-icon {
            display: inline-flex;
            margin-right: 0.75rem;
          }
          .act-session-copy {
            flex: 1;
          }
          .act-session-name {
            font-weight: 500;
            color: #1e293b;
          }
          .act-session-meta {
            font-size: 0.7rem;
            color: #64748b;
          }
        `}
      </style>

      <div className="page-header">
        <div>
          <h1 className="page-title">Unassign Cases For Users</h1>
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-item">
              Home
            </Link>
            <span className="breadcrumb-item">User</span>
            <span className="breadcrumb-item active">Unassign Cases</span>
          </nav>
        </div>
      </div>

      <div className="responsive-split">
        {/* Left Panel: Users - 25% width */}
        <div className="users-panel card m-0">
          <div className="card-header">
            <div className="support-search">
              <i className="bi bi-search"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Search user ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div
            className="card-body p-0"
            style={{ maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}
          >
            {loading ? (
              <div className="text-muted p-2">Loading users...</div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-muted p-2">No users found</div>
            ) : (
              filteredUsers.map((user) => {
                const uid = String(user.userId);
                const pincodeCount = user.pincodes?.length || 0;
                const selectedForUser = Object.values(
                  selectedCases[uid]?.pincodes || {},
                ).filter(Boolean).length;
                return (
                  <div
                    key={uid}
                    className={`support-nav-item ${selectedUserId === uid ? "active" : ""}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      padding: "0.75rem 1rem",
                      borderBottom: "1px solid #e9ecef",
                    }}
                    onClick={() => setSelectedUserId(uid)}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedCases[uid]?.allSelected || false}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleUserCheckChange(uid);
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <i className="bi bi-person"></i>
                      <span>{uid}</span>
                    </div>
                    <div
                      style={{ background: "#efecec", borderRadius: "5px" }}
                      className="px-2"
                    >
                      {selectedForUser}/{pincodeCount}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Panel: Pincodes - 75% width */}
        <div className="pincodes-panel card">
          <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div className="support-search flex-grow-1">
              <i className="bi bi-search"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Filter pincodes..."
                value={pincodeSearchTerm}
                onChange={(e) => setPincodeSearchTerm(e.target.value)}
              />
            </div>
            {selectedCount > 0 && (
              <div className="alert alert-info py-1 px-3 m-0">
                {selectedCount} case(s) selected
              </div>
            )}
          </div>

          <div
            className="card-body"
            style={{ maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}
          >
            {selectedUserId ? (
              filteredPincodes.length > 0 ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                  {filteredPincodes.map((pincode, idx) => {
                    const isChecked =
                      selectedUserSelections[String(pincode)] || false;
                    return (
                      <div
                        className="act-session-item"
                        key={idx}
                        onClick={(e) =>
                          togglePincode(selectedUserId, String(pincode), e)
                        }
                      >
                        <span className="act-session-icon">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={isChecked}
                            onChange={() =>
                              handlePincodeCheckChange(
                                selectedUserId,
                                String(pincode),
                              )
                            }
                            onClick={(e) => e.stopPropagation()}
                          />
                        </span>
                        <div className="act-session-copy">
                          <div className="act-session-name">
                            Pincode: {pincode}
                          </div>
                          <div className="act-session-meta">
                            Assigned to {selectedUserId}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center p-4">
                  {pincodeSearchTerm
                    ? "No matching pincodes found."
                    : "No pincodes assigned for this user."}
                </div>
              )
            ) : (
              <div className="text-center p-4">
                Select a user from the left panel to view assigned pincodes.
              </div>
            )}
          </div>
          <div className="card-footer">
            <button
              type="button"
              className="btn btn-primary"
              disabled={submitting || selectedCount === 0}
              onClick={handleSubmit}
            >
              {submitting ? "Processing..." : "Unassign Selected Users Cases"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
