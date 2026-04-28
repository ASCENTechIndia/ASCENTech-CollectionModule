import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { useNotification } from "../../context/useNotification";
import { useConfirm } from "../../context/ConfirmModalContext";
import { useLoader } from "../../context/LoaderContext";

export default function UnAssignedPincode() {
  const { showSuccess, showError } = useNotification();
  const confirm = useConfirm();
  const { setLoader } = useLoader();

  // Data states
  const [users, setUsers] = useState([]);
  const [selectedCases, setSelectedCases] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // UI states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoader(true);
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
            pincodeObj[String(pin)] = true;
          });
          initialSelected[uid] = { allSelected: true, pincodes: pincodeObj };
        });
        setSelectedCases(initialSelected);
      } else {
        showError(response?.message || "Failed to fetch userid");
      }
    } catch (err) {
      showError(err?.message || "Failed to fetch userid");
    } finally {
      setLoading(false);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;
    return users.filter((user) =>
      String(user.userId).includes(searchTerm.trim()),
    );
  }, [users, searchTerm]);

  const currentUserPincodes = useMemo(() => {
    const selectedUserData = users.find(
      (u) => String(u.userId) === selectedUserId,
    );
    return selectedUserData?.pincodes || [];
  }, [users, selectedUserId]);

  const handleSelectAllPincodesForUser = (userId, checked) => {
    setSelectedCases((prev) => {
      const next = { ...prev };
      const userPincodes = next[userId]?.pincodes || {};
      const updatedPincodes = {};
      Object.keys(userPincodes).forEach((pin) => {
        updatedPincodes[pin] = checked;
      });
      next[userId] = { allSelected: checked, pincodes: updatedPincodes };
      return next;
    });
  };

  const handlePincodeCheckChange = (userId, pincode) => {
    setSelectedCases((prev) => {
      const next = { ...prev };
      const currentPincodes = next[userId]?.pincodes || {};
      const newValue = !currentPincodes[pincode];
      const updatedPincodes = { ...currentPincodes, [pincode]: newValue };
      const allSelected = Object.values(updatedPincodes).every(Boolean);
      next[userId] = { allSelected, pincodes: updatedPincodes };
      return next;
    });
  };

  const unassignedCount = useMemo(() => {
    let count = 0;
    Object.values(selectedCases).forEach((userSel) => {
      count += Object.values(userSel.pincodes || {}).filter(
        (checked) => !checked,
      ).length;
    });
    return count;
  }, [selectedCases]);

  const handleSubmit = async () => {
    const selections = [];
    Object.entries(selectedCases).forEach(([userId, userSelection]) => {
      const unselectedPincodes = Object.entries(userSelection.pincodes || {})
        .filter(([, isChecked]) => !isChecked)
        .map(([pincode]) => pincode);
      if (unselectedPincodes.length > 0) {
        selections.push({ userId, pincodes: unselectedPincodes });
      }
    });

    if (selections.length === 0) {
      showError("Please uncheck at least one pincode to unassign.");
      return;
    }

    const agreed = await confirm(
      `Are you sure you want to unassign ${selections.reduce((sum, s) => sum + s.pincodes.length, 0)} pincode(s) across ${selections.length} user(s)? This action cannot be undone.`,
    );
    if (!agreed) return;

    setSubmitting(true);
    try {
      setLoader(true);
      const response = await apiClient.post("/admin/unassign-cases", {
        selections,
      });
      if (response?.success) {
        showSuccess(response?.data?.message || "Cases unassigned successfully");
        await fetchUsers();
        setSelectedUserId(null);
      } else {
        showError(response?.message || "Failed to unassign cases");
      }
    } catch (err) {
      showError(err?.message || "Failed to unassign cases");
    } finally {
      setSubmitting(false);
      setLoader(false);
    }
  };

  const selectedUserSelections = selectedCases[selectedUserId]?.pincodes || {};
  const areAllSelectedForCurrentUser =
    selectedUserId &&
    currentUserPincodes.length > 0 &&
    currentUserPincodes.every(
      (pin) => selectedUserSelections[String(pin)] === true,
    );

  const togglePincode = (userId, pincode, e) => {
    if (e.target.type !== "checkbox") {
      handlePincodeCheckChange(userId, pincode);
    }
  };

  return (
    <div className="page-users-edit p-4">
      <div className="page-header">
        <h1 className="page-title">Unassign Cases For Users</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            Home
          </Link>
          <span className="breadcrumb-item">User</span>
          <span className="breadcrumb-item active">Unassign Cases</span>
        </nav>
      </div>

      <div className="responsive-split">
        {/* Left Panel: Users */}
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
            style={{ maxHeight: "calc(100vh - 350px)", overflowY: "auto" }}
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

        {/* Right Panel: Pincodes */}
        <div className="pincodes-panel card">
          <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div className="select-all-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="selectAllPincodes"
                checked={areAllSelectedForCurrentUser}
                disabled={!selectedUserId || currentUserPincodes.length === 0}
                onChange={(e) =>
                  handleSelectAllPincodesForUser(
                    selectedUserId,
                    e.target.checked,
                  )
                }
              />
              <label
                htmlFor="selectAllPincodes"
                className="form-check-label mb-0"
              >
                Select All Pincodes
              </label>
            </div>
            {unassignedCount > 0 && (
              <div className="alert alert-info py-1 px-3 m-0">
                {unassignedCount} pincode(s) will be unassigned
              </div>
            )}
          </div>

          <div
            className="card-body"
            style={{ maxHeight: "calc(100vh - 350px)", overflowY: "auto" }}
          >
            {selectedUserId ? (
              currentUserPincodes.length > 0 ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                  {currentUserPincodes.map((pincode, idx) => {
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
                  No pincodes assigned for this user.
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
              disabled={submitting || unassignedCount === 0}
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
