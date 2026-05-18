import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ReusableDataGrid from "../../components/ReusableDataGrid";
import apiClient from "../../services/apiClient";
import { useNotification } from "../../context/useNotification";
import DataTable from "../../components/Datatable";
import { useLoader } from "../../context/LoaderContext";

const MilestoneDate = ({ date }) => {
  if (!date) return null;

  const [day, month, year] = date.split("-");
  const parsedDate = new Date(`${year}-${month}-${day}`);

  if (isNaN(parsedDate)) return <span>-</span>;

  const d = parsedDate.getDate();
  const m = parsedDate.toLocaleString("default", { month: "short" });
  const y = parsedDate.getFullYear();

  return (
    <div className="milestone-date-horizontal">
      <span className="milestone-day-big">{d}</span>

      <div className="milestone-right">
        <span className="milestone-month">{m}</span>
        <span className="milestone-year">{y}</span>
      </div>
    </div>
  );
};

// Debounce utility
function debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const formatDateForApi = (value) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

function FrmInactiveUserPincodeHistory() {
  const navigate = useNavigate();
  const { setLoader } = useLoader();

  const { showError, showSuccess, showWarning } = useNotification();
  const {
    register,
    handleSubmit: handleFormSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",
      userId: "",
    },
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userId, setUserId] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const tableRows = useMemo(
    () =>
      rows.map((item) => [
        item.inactiveDate || "",
        item.userId || "",
        item.pincode || "",
        item.username || "",
      ]),
    [rows],
  );

  const columns2 = [
    {
      key: "inactiveDate", // keep main key (or rename if you want)
      label: "Inactive Date",
      render: (val, row) => (
        <MilestoneDate date={row.inactiveDate} userId={row.userId} />
      ),
    },
    {
      key: "username",
      label: "Username & UserId",
      minWidth: "120px",
      render: (val, row) => (
        <div class="workload-item">
          <img
            src="/assets/img/profile-img.jpg"
            alt=""
            class="workload-avatar"
          />
          <div class="workload-info">
            <div class="workload-name">{val}</div>
            <div class="workload-role">{row.userId}</div>
          </div>
        </div>
      ),
    },
    {
      key: "pincode",
      label: "Pincode",
      minWidth: "120px",
      render: (val) => (
        <span className="badge bg-success text-white">{val}</span>
      ),
    },
  ];

  const tableData2 = rows.map((item, index) => ({
    id: index,
    inactiveDate: item.inactiveDate || "",
    userId: item.userId || "",
    pincode: item.pincode || "",
    username: item.username || "",
  }));

  // Debounced search function
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

  const handleSearch = async () => {
    const params = {
      startDate: formatDateForApi(startDate),
      endDate: formatDateForApi(endDate),
      userId: userId.trim(),
    };

    const queryParams = new URLSearchParams(params);

    setLoading(true);
    try {
      setLoader(true);
      const response = await apiClient.get(
        `/reports/inactiveuserPincodeHistory?${queryParams.toString()}`,
      );
      const success = response?.success;
      const data = Array.isArray(response?.data) ? response.data : [];

      if (!success || !data.length) {
        setRows([]);
        showWarning("No data found");
        return;
      }

      const formattedData = data.map((item) => ({
        inactiveDate: item.INACTIVE_DATE || "",
        userId: item.VAR_USER_USERID || "",
        pincode: item.VAR_USER_PINCODE || "",
        username: item.VAR_USERMST_USERFULLNAME || "",
      }));

      setRows(formattedData);
      showSuccess(`Found ${formattedData.length} records`);
    } catch (apiError) {
      setRows([]);
      showError(apiError.message || "Something went wrong");
    } finally {
      setLoading(false);
      setLoader(false);
    }
  };

  return (
    <div className="main-content page-inactive-user-pincode-history">
      <div className="page-header">
        <h1 className="page-title">Inactive User Pincode History</h1>
      </div>

      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center gap-3 flex-wrap">
          <h5 className="card-title mb-0">Search Filters</h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleFormSubmit(handleSearch)}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="startDate" className="form-label">
                  Start Date <span className="text-danger">*</span>
                </label>
                <input
                  id="startDate"
                  type="date"
                  className={`form-control ${errors.startDate ? "is-invalid" : ""}`}
                  value={startDate}
                  {...register("startDate", {
                    required: "Start Date is required",
                    onChange: (event) => setStartDate(event.target.value),
                  })}
                />
                {errors.startDate && (
                  <div className="invalid-feedback">
                    {errors.startDate.message}
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="endDate" className="form-label">
                  End Date <span className="text-danger">*</span>
                </label>
                <input
                  id="endDate"
                  type="date"
                  className={`form-control ${errors.endDate ? "is-invalid" : ""}`}
                  value={endDate}
                  {...register("endDate", {
                    required: "End Date is required",
                    onChange: (event) => setEndDate(event.target.value),
                  })}
                />
                {errors.endDate && (
                  <div className="invalid-feedback">
                    {errors.endDate.message}
                  </div>
                )}
              </div>

              <div className="col-md-6">
                {/* 🔍 User search input (name or ID) */}
                <label htmlFor="endDate" className="form-label">
                  Search name or userId<span className="text-danger">*</span>
                </label>
                <div style={{ width: "100%" }}>
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

              {/* User ID field – now read‑only, filled from search dropdown */}
              <div className="col-md-6">
                <label htmlFor="userId" className="form-label">
                  User ID
                </label>
                <input
                  id="userId"
                  type="text"
                  className={`form-control ${errors.userId ? "is-invalid" : ""}`}
                  value={userId}
                  placeholder="Select from search"
                  readOnly
                  {...register("userId")}
                />
                {errors.userId && (
                  <div className="invalid-feedback">
                    {errors.userId.message}
                  </div>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
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

      {tableRows.length > 0 && (
        <DataTable
          title="Inactive Users Report"
          subtitle="Users who have been inactive"
          columns={columns2}
          data={tableData2}
          perPage={5}
          csvFilename="inactive_users.csv"
        />
      )}
    </div>
  );
}

export default FrmInactiveUserPincodeHistory;
