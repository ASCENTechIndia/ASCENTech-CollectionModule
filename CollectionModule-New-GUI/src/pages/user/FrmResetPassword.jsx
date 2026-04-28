import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "../../services/apiClient";
import { useNotification } from "../../context/useNotification";
import { useLoader } from "../../context/LoaderContext";

// Debounce utility
function debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function FrmResetPassword() {
  const navigate = useNavigate();
  const { showSuccess, showError, showWarning } = useNotification();
  const { setLoader } = useLoader();

  const [userId, setUserId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // 🔍 Search state for user name/id
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  // ── Debounced search ──────────────────────────────────────────
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
    setUserId(cleanId);
    setSearchError("");
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setSearchError("");
    setUserId("");
  };

  // Submit (Reset Password)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSearched(true);

    const trimmedUserId = userId.trim();
    if (!trimmedUserId) {
      showWarning("Please select a User ID.");
      return;
    }

    // User ID is guaranteed numeric by selection (cleanId removes non-digits)
    if (!/^\d+$/.test(trimmedUserId)) {
      showError("User ID must contain numbers only");
      return;
    }

    setLoading(true);
    setNewPassword("");

    try {
      setLoader(true);
      const response = await apiClient.post("/password/resetPassword", {
        userId: trimmedUserId,
      });
      const success = response?.success;
      const data = response?.data || {};

      if (success && data?.success) {
        setNewPassword(String(data.Password || ""));
        showSuccess(data.message || "Password reset successfully");
        setUserId("");
        setSearchTerm("");
        setSearchResults([]);
        setSearched(false);
      } else {
        showError(data?.message || response?.message || "Reset failed");
      }
    } catch (apiError) {
      showError(apiError?.message || "Network error");
    } finally {
      setLoading(false);
      setLoader(false);
    }
  };

  return (
    <div className="main-content page-reset-password">
      <div className="page-header">
        <h1 className="page-title">Reset Password</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            Home
          </Link>
          <span className="breadcrumb-item">User</span>
          <span className="breadcrumb-item active">Reset Password</span>
        </nav>
      </div>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center gap-3 flex-wrap">
          <h5 className="card-title mb-0">Reset Login Password</h5>

          {/* 🔍 User search input (name or ID) */}
          <div
            className="position-relative"
            style={{ minWidth: "280px", maxWidth: "350px", width: "100%" }}
          >
            <div className="input-group position-relative">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 pe-5"
                placeholder="Type name or user ID..."
                value={searchTerm}
                onChange={handleSearchInput}
                autoComplete="off"
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
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label d-flex align-items-center gap-2">
                <input
                  type="radio"
                  name="resetType"
                  value="loginPassword"
                  defaultChecked
                  readOnly
                />
                <span>Login Password</span>
              </label>
            </div>

            <div className="mb-3">
              <label htmlFor="resetUserId" className="form-label">
                User ID <span className="text-danger">*</span>
              </label>
              <input
                id="resetUserId"
                type="text"
                value={userId}
                readOnly
                placeholder="Select from search"
                className={`form-control ${searched && !userId.trim() ? "is-invalid" : ""}`}
              />
              {searched && !userId.trim() && (
                <div className="invalid-feedback">Please select a User ID.</div>
              )}
            </div>

            {newPassword && (
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="text"
                  className="form-control"
                  value={newPassword}
                  readOnly
                />
              </div>
            )}

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? "Resetting..." : "Reset"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/")}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FrmResetPassword;
