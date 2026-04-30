
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/useNotification";
import apiClient from "../../services/apiClient";
import { useLoader } from "../../context/LoaderContext";

// Debounce utility
function debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function FrmChangePassword() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
  const { setLoader } = useLoader();

  const userIdPattern = /^\d+$/;
  const newPasswordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  const userId = user?.userId || user?.userid || "";

  const [username, setUsername] = useState("");
  // User search state
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
    // User search debounced API
    const doSearch = debounce(async (term) => {
      if (!term) {
        setSearchResults([]);
        setSearchError("");
        setSearchLoading(false);
        return;
      }
      setSearchLoading(true);
      setSearchError("");
      try {
        const response = await apiClient.get("/users/search-user-by-name-id", {
          params: { search: term },
        });
        if (response?.success && Array.isArray(response.data)) {
          setSearchResults(response.data);
        } else {
          setSearchResults([]);
          setSearchError("No results found");
        }
      } catch {
        setSearchResults([]);
        setSearchError("Search failed");
      } finally {
        setSearchLoading(false);
      }
    }, 400);

    const handleSearchInput = (e) => {
      const val = e.target.value;
      setSearchTerm(val);
      doSearch(val);
    };

    const handleSelectUser = (selectedUser) => {
      setSearchTerm(selectedUser.VAR_USERMST_USERFULLNAME);
      setSearchResults([]);
      // Remove leading "E" if present
      const cleanId = String(selectedUser.VAR_USERMST_USERID).replace(/^E/i, "");
      setUsername(cleanId);
      setSearchError("");
    };

    const handleClearSearch = () => {
      setSearchTerm("");
      setSearchResults([]);
      setSearchError("");
      setUsername("");
    };
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameDisabled, setUsernameDisabled] = useState(true);
  const [userInfoLoading, setUserInfoLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchUserInfo = async () => {
      setUserInfoLoading(true);
      try {
        setLoader(true);
        const res = await apiClient.get("/password/desgidandusertype", {
          params: { userId },
        });

        const rows = Array.isArray(res?.data) ? res.data : [];
        const first = rows[0] || {};
        const desgId = Number(first.NUM_USERMST_DESGID);
        const userType = Number(first.NUM_USERMST_USERTYPE);

        if (desgId === 1 && userType === 3) {
          setUsernameDisabled(false);
          setUsername("");
        } else {
          setUsername(String(userId));
          setUsernameDisabled(true);
        }
      } catch (apiError) {
        showError(apiError?.message || "Failed to fetch user info");
      } finally {
        setUserInfoLoading(false);
        setLoader(false);
      }
    };

    fetchUserInfo();
  }, [userId, showError]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (!username.trim() || !oldPassword || !newPassword || !confirmPassword) {
      showError("All fields are required");
      return;
    }

    if (!userIdPattern.test(username.trim())) {
      showError("User ID must contain numbers only");
      return;
    }

    if (!newPasswordPattern.test(newPassword)) {
      showError(
        "New Password must be at least 8 characters and include letters and numbers",
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    setSubmitting(true);
    try {
      setLoader(true);
      const res = await apiClient.post("/password/changePassword", {
        userId: username.trim(),
        oldPassword,
        newPassword,
      });

      const success = res?.success;
      const data = res?.data || {};
      if (success && Number(data.out_ErrorCode) === 9999) {
        showSuccess(data.out_ErrorMsg || "Password changed successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setSubmitted(false);
      } else {
        showError(data.out_ErrorMsg || "Something went wrong");
      }
    } catch (apiError) {
      showError(
        apiError?.message || "Failed to change password. Please try again.",
      );
    } finally {
      setSubmitting(false);
      setLoader(false);
    }
  };

  return (
    <div className="main-content page-change-password">
      <div className="page-header">
        <h1 className="page-title">Change Password</h1>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-6">
                <label htmlFor="username" className="form-label">
                  User Name <span className="text-danger">*</span>
                </label>
                <div className="position-relative" style={{ minWidth: "280px", width: "100%" }}>
                  <div className="input-group position-relative">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="bi bi-search text-muted"></i>
                    </span>
                    <input
                      id="username"
                      type="text"
                      className={`form-control border-start-0 pe-5 ${submitted && (!username.trim() || !userIdPattern.test(username.trim())) ? "is-invalid" : ""}`}
                      value={searchTerm}
                      onChange={handleSearchInput}
                      placeholder={userInfoLoading ? "Loading..." : "Type name or user ID..."}
                      autoComplete="off"
                      disabled={usernameDisabled}
                    />
                    {searchTerm && (
                      <button
                        type="button"
                        onClick={handleClearSearch}
                        className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-2 p-0"
                      >
                        <i className="bi bi-x-circle text-muted"></i>
                      </button>
                    )}
                  </div>

                  {searchLoading && (
                    <div className="spinner-border spinner-border-sm position-absolute end-0 top-50 translate-middle-y me-2" />
                  )}

                  {searchResults.length > 0 && (
                    <ul
                      className="list-group position-absolute w-100 shadow z-3"
                      style={{ maxHeight: 180, overflowY: "auto", top: "100%" }}
                    >
                      {searchResults.map((userItem, idx) => (
                        <li
                          key={userItem.VAR_USERMST_USERID || idx}
                          className="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2 px-2"
                          style={{ cursor: "pointer", fontSize: "13px" }}
                          onClick={() => handleSelectUser(userItem)}
                        >
                          <div className="d-flex flex-column">
                            <span className="fw-medium">
                              {userItem.VAR_USERMST_USERFULLNAME}
                            </span>
                            <small className="text-muted">
                              {userItem.VAR_USERMST_USERID}
                            </small>
                          </div>
                          <i className="bi bi-person text-primary"></i>
                        </li>
                      ))}
                    </ul>
                  )}

                  {searchError && (
                    <div className="text-danger small mt-1">{searchError}</div>
                  )}
                </div>
                {/* Hidden input for form submission */}
                <input
                  type="hidden"
                  value={username}
                  readOnly
                />
                {submitted && !username.trim() && (
                  <div className="invalid-feedback">User ID is required.</div>
                )}
                {submitted &&
                  username.trim() &&
                  !userIdPattern.test(username.trim()) && (
                    <div className="invalid-feedback">
                      User ID must contain numbers only.
                    </div>
                  )}
              </div>

              <div className="col-md-6">
                <label htmlFor="oldPassword" className="form-label">
                  Old Password <span className="text-danger">*</span>
                </label>
                <input
                  id="oldPassword"
                  type="password"
                  className="form-control"
                  value={oldPassword}
                  onChange={(event) => setOldPassword(event.target.value)}
                  placeholder="Enter Old Password"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="newPassword" className="form-label">
                  New Password <span className="text-danger">*</span>
                </label>
                <input
                  id="newPassword"
                  type="password"
                  className={`form-control ${submitted && (!newPassword || !newPasswordPattern.test(newPassword)) ? "is-invalid" : ""}`}
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="Enter New Password"
                />
                {submitted && !newPassword && (
                  <div className="invalid-feedback">
                    New Password is required.
                  </div>
                )}
                {submitted &&
                  newPassword &&
                  !newPasswordPattern.test(newPassword) && (
                    <div className="invalid-feedback">
                      Must be 8+ chars with letters and numbers.
                    </div>
                  )}
              </div>

              <div className="col-md-6">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password <span className="text-danger">*</span>
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className={`form-control ${submitted && (!confirmPassword || confirmPassword !== newPassword) ? "is-invalid" : ""}`}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Re-enter New Password"
                />
                {submitted && !confirmPassword && (
                  <div className="invalid-feedback">
                    Confirm Password is required.
                  </div>
                )}
                {submitted &&
                  confirmPassword &&
                  confirmPassword !== newPassword && (
                    <div className="invalid-feedback">
                      Passwords do not match.
                    </div>
                  )}
              </div>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting || userInfoLoading}
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/")}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FrmChangePassword;
