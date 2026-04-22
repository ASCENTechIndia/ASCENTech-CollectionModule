// src/pages/UserPinAllocation.jsx
import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useNotification } from "../../context/useNotification";
import apiClient from "../../services/apiClient";

export default function UserPinAllocation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showSuccess, showError, showWarning } = useNotification();

  // Get employeeId from navigation state
  const employeeId = location.state?.employeeId || "10001100070";

  // State for all pincodes (independent of employeeId)
  const [allPincodes, setAllPincodes] = useState([]);
  const [loadingPincodes, setLoadingPincodes] = useState(false);

  // State for user-specific data
  const [userName, setUserName] = useState("");
  const [assignedPincodes, setAssignedPincodes] = useState([]);
  const [selectedPincodes, setSelectedPincodes] = useState([]);
  const [loadingUserData, setLoadingUserData] = useState(false);

  // Search and submission states
  const [searchTerm, setSearchTerm] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 1. Fetch all pincodes on mount (independent of employeeId)
  useEffect(() => {
    const fetchAllPincodes = async () => {
      setLoadingPincodes(true);
      try {
        const pincodeRes = await apiClient.get("/assignPincode/getPincodeList");
        if (pincodeRes.success && Array.isArray(pincodeRes.data)) {
          const codes = pincodeRes.data
            .map((item) => String(item.VAR_PINCODE_NO ?? item.var_pincode_no ?? ""))
            .filter(Boolean);
          setAllPincodes(codes);
        } else {
          setAllPincodes([]);
        }
      } catch (err) {
        console.error(err);
        showError(err?.message || "Failed to load pincode list");
      } finally {
        setLoadingPincodes(false);
      }
    };
    fetchAllPincodes();
  }, []);

  // 2. Fetch user-specific data only when employeeId is available
  useEffect(() => {
    if (!employeeId) return;

    const fetchUserData = async () => {
      setLoadingUserData(true);
      try {
        // Fetch username
        const usernameRes = await apiClient.get("/assignPincode/fetchUsername", {
          params: { userId: employeeId },
        });
        if (usernameRes.success && usernameRes.data?.length) {
          setUserName(
            String(usernameRes.data[0].VAR_USERMST_USERFULLNAME ?? usernameRes.data[0].var_usermst_userfullname ?? "")
          );
        } else {
          setUserName("");
        }

        // Fetch already assigned pincodes
        const assignedRes = await apiClient.get("/assignPincode/fetchUserPincodes", {
          params: { userId: employeeId },
        });
        if (assignedRes.success && Array.isArray(assignedRes.data)) {
          const userPins = assignedRes.data
            .map((item) => String(item.VAR_USER_PINCODE ?? item.var_user_pincode ?? ""))
            .filter(Boolean);
          setAssignedPincodes(userPins);
          setSelectedPincodes(userPins); // pre-select those already assigned
        } else {
          setAssignedPincodes([]);
          setSelectedPincodes([]);
        }
      } catch (err) {
        console.error(err);
        showError(err?.message || "Failed to load user data");
      } finally {
        setLoadingUserData(false);
      }
    };

    fetchUserData();
  }, [employeeId]);

  // Filter pincodes based on search (partial match, case-insensitive)
  const filteredPincodes = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return allPincodes;
    return allPincodes.filter((pin) => pin.toLowerCase().includes(term));
  }, [allPincodes, searchTerm]);

  // Checkbox handlers
  const handleCheckboxChange = (pin, isChecked) => {
    if (isChecked) {
      setSelectedPincodes((prev) => [...prev, pin]);
    } else {
      setSelectedPincodes((prev) => prev.filter((p) => p !== pin));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      const newSelected = [...selectedPincodes];
      filteredPincodes.forEach((pin) => {
        if (!newSelected.includes(pin)) newSelected.push(pin);
      });
      setSelectedPincodes(newSelected);
    } else {
      const remaining = selectedPincodes.filter((pin) => !filteredPincodes.includes(pin));
      setSelectedPincodes(remaining);
    }
  };

  const isAllSelected = () => {
    if (filteredPincodes.length === 0) return false;
    return filteredPincodes.every((pin) => selectedPincodes.includes(pin));
  };

  const isIndeterminate = () => {
    const selectedCount = filteredPincodes.filter((pin) => selectedPincodes.includes(pin)).length;
    return selectedCount > 0 && selectedCount < filteredPincodes.length;
  };

  // Submit selected pincodes
  const handleSubmit = async () => {
    if (!employeeId) {
      showWarning("User ID missing");
      return;
    }
    if (selectedPincodes.length === 0) {
      showWarning("Please select at least one pincode to allocate.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        username: Number(employeeId),
        pincode_str: selectedPincodes.join("~"),
      };
      const response = await apiClient.post("/assignPincode/assignPinCode", payload);
      const success = response?.success;
      const data = response?.data || {};
      const outErrCode = Number(data.Out_errorCode ?? data.out_errcode);
      const outMessage = data.Out_ErrorMsg ?? data.out_data ?? response?.message;

      if (success && outErrCode === 9999) {
        showSuccess(outMessage || "Pincodes allocated successfully");
        setAssignedPincodes(selectedPincodes);
      } else {
        showError(outMessage || "Allocation failed");
      }
    } catch (err) {
      showError(err?.message || "Network error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-users-edit p-4">
      <div className="page-header">
        <div>
          <h1 className="page-title">Pincode Allocation</h1>
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-item">
              Home
            </Link>
            <span className="breadcrumb-item active">Pincode Allocation</span>
          </nav>
        </div>
      </div>

      {/* Summary Row */}
      <div className="ue-summary-row mb-3">
        <div className="ue-summary-item">
          <span className="ue-summary-icon">
            <i className="bi bi-person-vcard"></i>
          </span>
          <span className="ue-summary-label">User ID</span>
          <strong className="ue-summary-value">{employeeId || "—"}</strong>
        </div>
        <div className="ue-summary-item">
          <span className="ue-summary-icon">
            <i className="bi bi-person-badge"></i>
          </span>
          <span className="ue-summary-label">User Name</span>
          <strong className="ue-summary-value">
            {loadingUserData ? "Loading..." : userName || "—"}
          </strong>
        </div>
        <div className="ue-summary-item">
          <span className="ue-summary-icon">
            <i className="bi bi-grid-3x3-gap-fill"></i>
          </span>
          <span className="ue-summary-label">Total Pincodes</span>
          <strong className="ue-summary-value">{allPincodes.length}</strong>
        </div>
        <div className="ue-summary-item">
          <span className="ue-summary-icon">
            <i className="bi bi-check-circle"></i>
          </span>
          <span className="ue-summary-label">Selected</span>
          <strong className="ue-summary-value">{selectedPincodes.length}</strong>
        </div>
      </div>

      <div className="row g-3">
        {/* Left: Pincode Table */}
        <div className="col-xxl-8">
          <div className="card">
            <div className="card-header">
              <div>
                <h5 className="card-title">Available Pincodes</h5>
                <span className="text-muted small">
                  {filteredPincodes.length} of {allPincodes.length} displayed
                </span>
              </div>
              <div className="card-actions d-flex gap-2">
                <div className="input-group input-group-sm" style={{ width: "200px" }}>
                  <span className="input-group-text">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search pincode..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value.replace(/\D/g, ""))}
                  />
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              {loadingPincodes ? (
                <div className="text-center py-4">Loading pincodes...</div>
              ) : (
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                  <table className="table widget-reviews-table mb-0">
                    <thead style={{ position: "sticky", top: 0, background: "#fff", zIndex: 1 }}>
                      <tr>
                        <th style={{ width: "40px" }}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={isAllSelected()}
                            ref={(el) => {
                              if (el) el.indeterminate = isIndeterminate();
                            }}
                            onChange={(e) => handleSelectAll(e.target.checked)}
                          />
                        </th>
                        <th>Pincode</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPincodes.length === 0 ? (
                        <tr>
                          <td colSpan="2" className="text-center text-muted py-3">
                            {searchTerm ? "No matching pincode" : "No pincodes available"}
                          </td>
                        </tr>
                      ) : (
                        filteredPincodes.map((pin) => (
                          <tr key={pin}>
                            <td>
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={selectedPincodes.includes(pin)}
                                onChange={(e) => handleCheckboxChange(pin, e.target.checked)}
                              />
                            </td>
                            <td>{pin}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="widget-table-footer d-flex justify-content-end">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleSubmit}
                  disabled={submitting || loadingPincodes || loadingUserData}
                >
                  {submitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Selected Pincodes */}
        <div className="col-xl-4">
          <div className="card mb-3">
            <div className="card-header">
              <h5 className="card-title">Selected Pincodes</h5>
              <span className="text-muted small">{selectedPincodes.length} selected</span>
            </div>
            <div className="card-body">
              {selectedPincodes.length === 0 ? (
                <div className="text-muted text-center py-3">No pincode selected</div>
              ) : (
                <div className="profile-skills d-flex flex-wrap gap-2" style={{ maxHeight: "300px", overflowY: "auto" }}>
                  {selectedPincodes.map((pin) => (
                    <span key={pin} className="profile-skill">
                      {pin}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}