import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DataTable from "../../components/Datatable";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/useNotification";
import { useLoader } from "../../context/LoaderContext";

// SMA badge color map
const smaBadgeColor = {
  SMA0: { bg: "#fff3cd", color: "#856404", border: "#ffc107" },
  SMA1: { bg: "#fff0e6", color: "#c45000", border: "#fd7e14" },
  SMA2: { bg: "#fde8e8", color: "#b02a37", border: "#dc3545" },
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

// format YYYY-MM-DD to DD-MMM-YYYY
function formatDateToAbbr(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const year = parts[0];
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (month < 1 || month > 12) return dateStr;
  return `${day.toString().padStart(2, "0")}-${monthNames[month - 1]}-${year}`;
}

const columns = [
  {
    key: "collectionAssosId",
    label: "Collection Associate",
    sortable: true,
    render: (val) =>
      val ? (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "#e8f0fe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <i
              className="bi bi-person-fill"
              style={{ color: "#1a73e8", fontSize: "0.85rem" }}
            />
          </span>
          <span
            style={{ fontSize: "0.82rem", fontWeight: 500, color: "#1e293b" }}
          >
            {val}
          </span>
        </div>
      ) : (
        <span className="text-muted">—</span>
      ),
  },
  {
    key: "zone",
    label: "Zone",
    sortable: true,
    minWidth: "120px",
    render: (val) =>
      val ? (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            color: "#0f5132",
            fontSize: "0.82rem",
          }}
        >
          <i className="bi bi-geo-alt-fill" style={{ color: "#198754" }} />
          {val}
        </span>
      ) : (
        <span className="text-muted">—</span>
      ),
  },
  {
    key: "region",
    label: "Region",
    sortable: true,
    minWidth: "150px",
    render: (val) =>
      val ? (
        <span style={{ fontSize: "0.82rem", color: "#1e293b" }}>{val}</span>
      ) : (
        <span className="text-muted">—</span>
      ),
  },
  {
    key: "branch",
    label: "Branch",
    sortable: true,
    minWidth: "300px",
    render: (val) =>
      val ? (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            background: "#f0f4ff",
            color: "#3d5a99",
            padding: "3px 10px",
            borderRadius: "20px",
            fontSize: "0.78rem",
            fontWeight: 500,
            border: "1px solid #c5d3f0",
          }}
        >
          <i className="bi bi-bank" />
          {val}
        </span>
      ) : (
        <span className="text-muted">—</span>
      ),
  },
  {
    key: "allocationDate",
    label: "Allocation Date",
    minWidth: "150px",
    sortable: true,
    render: (val) =>
      val ? (
        <span style={{ fontSize: "0.82rem", color: "#1e293b" }}>{val}</span>
      ) : (
        <span className="text-muted">—</span>
      ),
  },
  {
    key: "contractNo",
    label: "Contract No.",
    sortable: true,
    render: (val) =>
      val ? (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            background: "#f8f9fa",
            color: "#495057",
            padding: "3px 10px",
            borderRadius: "6px",
            fontSize: "0.78rem",
            fontFamily: "monospace",
            border: "1px solid #dee2e6",
            letterSpacing: "0.03em",
          }}
        >
          <i className="bi bi-file-earmark-text" style={{ color: "#6c757d" }} />
          {val}
        </span>
      ) : (
        <span className="text-muted">—</span>
      ),
  },
  {
    key: "dispositionDate",
    label: "Disposition Date",
    minWidth: "250px",
    sortable: true,
    render: (val) =>
      val ? (
        <span style={{ fontSize: "0.82rem", color: "#1e293b" }}>{val}</span>
      ) : (
        <span className="text-muted">—</span>
      ),
  },
  {
    key: "smaType",
    label: "SMA Type",
    sortable: true,
    render: (val) => {
      if (!val) return <span className="text-muted">—</span>;
      const style = smaBadgeColor[val] || {
        bg: "#e9ecef",
        color: "#495057",
        border: "#ced4da",
      };
      return (
        <span
          style={{
            display: "inline-block",
            padding: "3px 12px",
            borderRadius: "20px",
            fontSize: "0.75rem",
            fontWeight: 600,
            background: style.bg,
            color: style.color,
            border: `1px solid ${style.border}`,
            letterSpacing: "0.04em",
          }}
        >
          {val}
        </span>
      );
    },
  },
];

function FrmAccountAllocationReport() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setLoader } = useLoader();
  const { showError, showSuccess, showWarning } = useNotification();

  const {
    register,
    handleSubmit: handleFormSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { startDate: "", endDate: "", userId: "", smaType: "" },
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userId, setUserId] = useState("");
  const [smaType, setSmaType] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const [dateRangeOption, setDateRangeOption] = useState("currentMonth");

  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const getFirstDay = (year, monthIndex) =>
    `${year}-${String(monthIndex + 1).padStart(2, "0")}-01`;

  const getLastDay = (year, monthIndex) => {
    const lastDay = new Date(year, monthIndex + 1, 0).getDate();
    return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
  };

  const updateDatesFromOption = (option) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0‑based

    if (option === "currentMonth") {
      // First day of current month → today
      const firstDay = getFirstDay(currentYear, currentMonth);
      const today = getTodayDate();
      setStartDate(firstDay);
      setEndDate(today);
      setValue("startDate", firstDay);
      setValue("endDate", today);
    } else if (option === "lastMonth") {
      // First day of last month → last day of last month
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const lastMonthIndex = currentMonth === 0 ? 11 : currentMonth - 1;
      const firstDay = getFirstDay(lastMonthYear, lastMonthIndex);
      const lastDay = getLastDay(lastMonthYear, lastMonthIndex);
      setStartDate(firstDay);
      setEndDate(lastDay);
      setValue("startDate", firstDay);
      setValue("endDate", lastDay);
    } else if (option === "lastThreeMonths") {
      let startYear = currentYear;
      let startMonth = currentMonth - 2;
      if (startMonth < 0) {
        startYear = currentYear - 1;
        startMonth += 12;
      }
      const startFirstDay = getFirstDay(startYear, startMonth);
      const endYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const endMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const endLastDay = getLastDay(endYear, endMonth);
      setStartDate(startFirstDay);
      setEndDate(endLastDay);
      setValue("startDate", startFirstDay);
      setValue("endDate", endLastDay);
    }
  };

  // Handle dropdown change
  const handleDateRangeChange = (e) => {
    const option = e.target.value;
    setDateRangeOption(option);
    updateDatesFromOption(option);
  };

  useEffect(() => {
    const today = getTodayDate();
    setStartDate(today);
    setEndDate(today);
    setValue("startDate", today);
    setValue("endDate", today);
  }, []);

  // User search
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
    setSearchTerm(e.target.value);
    doSearch(e.target.value);
  };

  const handleSelectUser = (selectedUser) => {
    setSearchTerm(selectedUser.VAR_USERMST_USERFULLNAME);
    setSearchResults([]);
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

  // Fetch report data
  const handleSearch = async () => {
    const queryParams = new URLSearchParams({
      startDate: formatDateForApi(startDate),
      endDate: formatDateForApi(endDate),
      userId: userId.trim(),
      smaType,
      brid: user?.brid || "",
      branchName: user?.branchName || "",
    });

    setLoading(true);
    try {
      setLoader(true);
      const response = await apiClient.get(
        `/reports/AccAllocationReport?${queryParams.toString()}`,
      );
      const success = response?.success;
      const apiData = Array.isArray(response?.data) ? response.data : [];

      if (!success || !apiData.length) {
        setRows([]);
        showWarning("No data found");
        return;
      }

      const formattedData = apiData.map((item) => ({
        collectionAssosId: item.ASSIGNEDFOS || "",
        zone: item.VAR_BANKDATA_PRODUCTNM || "",
        region: item.VAR_BANKDATA_PRODUCTCODE || "",
        branch: item.VAR_BANKDATA_BRANCH || "",
        allocationDate: formatDateToAbbr(item.CONTRACTALLOCATIONDATE) || "",
        contractNo: item.CONTRACTNUMBER || "",
        dispositionDate: item.TRANSDAT || "",
        smaType: item.VAR_BANKDATA_DPDBUCKET || "",
      }));

      setRows(formattedData);
      showSuccess(`Found ${formattedData.length} records`);
    } catch (apiError) {
      setRows([]);
      showError(
        apiError.message || "Something went wrong while fetching report data",
      );
    } finally {
      setLoading(false);
      setLoader(false);
    }
  };

  const tableData = rows.map((item, index) => ({ id: index, ...item }));

  return (
    <div className="main-content page-account-allocation-report">
      <div className="page-header">
        <h1 className="page-title">
          Account Allocation Report
          <span className="info-icon">
            <i className="bi bi-info-circle-fill text-muted"></i>
            <span className="info-icon-text">
              This report shows allocated accounts by FOS, branch, and SMA type.
              Filter by date range, user, and SMA type.
            </span>
          </span>
        </h1>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleFormSubmit(handleSearch)}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Search name or userId</label>
                <div className="position-relative" style={{ width: "100%" }}>
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

              <div className="col-md-4">
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
                    onChange: (e) => setStartDate(e.target.value),
                  })}
                />
                {errors.startDate && (
                  <div className="invalid-feedback">
                    {errors.startDate.message}
                  </div>
                )}
              </div>

              <div className="col-md-4">
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
                    onChange: (e) => setEndDate(e.target.value),
                  })}
                />
                {errors.endDate && (
                  <div className="invalid-feedback">
                    {errors.endDate.message}
                  </div>
                )}
              </div>
            </div>

            <div className="row g-3 mt-2">
              <div className="col-md-4">
                <label className="form-label">Date Range Preset</label>
                <select
                  className="form-select"
                  value={dateRangeOption}
                  onChange={handleDateRangeChange}
                >
                  <option value="currentMonth">Current Month</option>
                  <option value="lastMonth">Last Month</option>
                  <option value="lastThreeMonths">Last Three Months</option>
                </select>
              </div>

              <div className="col-md-4">
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

              <div className="col-md-4">
                <label htmlFor="smaType" className="form-label">
                  SMA Type
                </label>
                <select
                  id="smaType"
                  className="form-select"
                  value={smaType}
                  {...register("smaType", {
                    onChange: (e) => setSmaType(e.target.value),
                  })}
                >
                  <option value="">Select SMA Type (optional)</option>
                  <option value="SMA1">SMA1</option>
                  <option value="SMA2">SMA2</option>
                </select>
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

      {tableData.length > 0 && (
        <DataTable
          title="Account Allocation Report"
          subtitle={`${tableData.length} records found`}
          columns={columns}
          data={tableData}
          defaultPerPage={10}
          csvFilename="account_allocation_report.csv"
        />
      )}
    </div>
  );
}

export default FrmAccountAllocationReport;
