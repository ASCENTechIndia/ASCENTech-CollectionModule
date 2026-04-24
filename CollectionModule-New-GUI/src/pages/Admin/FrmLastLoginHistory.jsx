import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ReusableDataGrid from "../../components/ReusableDataGrid";
import apiClient from "../../services/apiClient";
import { useNotification } from "../../context/useNotification";

// Debounce utility
function debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function FrmLastLoginHistory() {
  const { showError, showWarning, showSuccess } = useNotification();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userId: "",
    },
  });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔍 Search state for user name/id
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [userId, setUserId] = useState("");

  const columns = [
    { label: "User ID", sortable: true },
    { label: "IP Address", sortable: true },
    { label: "Login Date", sortable: true },
  ];

  const tableRows = useMemo(
    () => rows.map((item) => [item.userid, item.ipaddress, item.logdate]),
    [rows],
  );

  // Debounced search
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
    setValue("userId", cleanId);
    setSearchError("");
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setSearchError("");
    setUserId("");
    setValue("userId", "");
  };

  const onSubmit = async () => {
    const trimmedUserId = userId.trim();

    if (!trimmedUserId) {
      showError("User ID is required");
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.get("/admin/getLastLogin", {
        params: { userId: trimmedUserId },
      });

      const success = response?.success;
      const data = Array.isArray(response?.data) ? response.data : [];

      if (success && data.length > 0) {
        const mapped = data.map((item) => ({
          userid: String(item.USERID ?? item.userid ?? ""),
          ipaddress: String(item.IP_ADDRESS ?? item.ip_address ?? ""),
          logdate: String(item.LOG_DATE ?? item.log_date ?? ""),
        }));
        setRows(mapped);
        showSuccess(`Found ${mapped.length} records`);
      } else {
        setRows([]);
        showWarning("No data available");
      }
    } catch (apiError) {
      setRows([]);
      const message = apiError?.message || "Failed to fetch login history";
      showError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content page-last-login-history">
      <div className="page-header">
        <h1 className="page-title">Web Users Login History</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            Home
          </Link>
          <span className="breadcrumb-item">Admin</span>
          <span className="breadcrumb-item active">Last Login History</span>
        </nav>
      </div>

      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center gap-3 flex-wrap">
          <h5 className="card-title mb-0">Search</h5>

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3 align-items-end">
              <div className="col-md-8">
                <label htmlFor="userId" className="form-label">
                  User ID <span className="text-danger">*</span>
                </label>
                <input
                  id="userId"
                  type="text"
                  className={`form-control ${errors.userId ? "is-invalid" : ""}`}
                  placeholder="Select from search"
                  readOnly
                  value={userId}
                  {...register("userId", { required: "User ID is required" })}
                />
                {errors.userId && (
                  <div className="invalid-feedback">
                    {errors.userId.message}
                  </div>
                )}
              </div>
              <div className="col-md-4 d-grid">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {tableRows.length > 0 && (
        <div className="card">
          <div className="card-body">
            <ReusableDataGrid
              rows={tableRows}
              columns={columns}
              pageSize={10}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FrmLastLoginHistory;
