import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ReusableDataGrid from "../../components/ReusableDataGrid";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/useNotification";
import RouteMap from "../../components/ui/RouteMap";
import DataTable from "../../components/Datatable";
import { useLoader } from "../../context/LoaderContext";

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
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return "";
  return `${day}-${month}-${year}`;
};

const getCoordinates = (value) => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => String(item || "").trim())
    .filter((item) => item && item.includes(","));
};

const getRouteUrl = (coordinates) => {
  if (!coordinates.length) return "";
  if (coordinates.length === 1) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(coordinates[0])}`;
  }
  const origin = coordinates[0];
  const destination = coordinates[coordinates.length - 1];
  const waypoints = coordinates.slice(1, -1).join("|");
  const params = new URLSearchParams({
    api: "1",
    origin,
    destination,
    travelmode: "driving",
  });
  if (waypoints) params.set("waypoints", waypoints);
  return `https://www.google.com/maps/dir/?${params.toString()}`;
};

function FrmUserRouteReport() {
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
    defaultValues: {
      fosId: "",
      date: "",
      withDistance: false,
    },
  });

  const [fosId, setFosId] = useState("");
  const [date, setDate] = useState("");
  const [withDistance, setWithDistance] = useState(false);
  const [rows, setRows] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔍 Search state for FOS ID (user)
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const columns = [
    { label: "Sr No", sortable: true },
    { label: "Collection Associate", sortable: true },
    { label: "Account Number", sortable: true },
    { label: "Transaction Date", sortable: true },
    { label: "Go Location", sortable: true },
    { label: "Disposition Type", sortable: true },
    { label: "Visit Remark", sortable: true },
    { label: "Distance", sortable: true },
  ];

  const columns2 = [
    { key: "srNo", label: "Sr No", sortable: true },
    {
      key: "collectionassociate",
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
      key: "accountnumber",
      label: "Account Number",
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
            <i
              className="bi bi-file-earmark-text"
              style={{ color: "#6c757d" }}
            />
            {val}
          </span>
        ) : (
          <span className="text-muted">—</span>
        ),
    },
    { key: "transactiondate", label: "Transaction Date", sortable: true },
    {
      key: "golocation",
      label: "Go Location",
      sortable: true,
      render: (val) => (
        <span className="badge bg-success text-white p-1">
          <i class="bi bi-geo-alt-fill"></i> {val}
        </span>
      ),
    },
    { key: "dispositiontype", label: "Disposition Type", sortable: true },
    {
      key: "visitremark",
      label: "Visit Remark",
      sortable: true,
      render: (val) =>
        val ? <span>{val}</span> : <span className="text-muted">-</span>,
    },
    { key: "distance", label: "Distance", sortable: true },
  ];

  const tableRows = useMemo(() => {
    if (!Array.isArray(rows)) return [];
    return rows.map((item) => ({
      srNo: item["Sr No"] ?? "",
      collectionassociate: item["Collection Associate"] ?? "",
      accountnumber: item["Account Number"] ?? "",
      transactiondate: item["Transaction Date"] ?? "",
      golocation: item.GO_Location ?? "",
      dispositiontype: item["Disposition Type"] ?? "",
      visitremark: item["Visit Remark"] ?? "",
      distance: item.Distance ?? "",
    }));
  }, [rows]);

  const routeUrl = useMemo(() => getRouteUrl(coordinates), [coordinates]);

  // Debounced user search
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
    setFosId(cleanId);
    setValue("fosId", cleanId);
    setSearchError("");
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setSearchError("");
    setFosId("");
    setValue("fosId", "");
  };

  // Main search handler (unchanged except using fosId directly)
  const handleSearch = async () => {
    const trimmedFosId = fosId.trim();
    const formattedDate = formatDateForApi(date);

    if (!trimmedFosId || !formattedDate) {
      showError("FOS ID and Date are required");
      return;
    }

    setLoading(true);
    setRows([]);
    setCoordinates([]);

    try {
      setLoader(true);
      const response = await apiClient.get("/reports/user-route", {
        params: {
          fosId: trimmedFosId,
          date: formattedDate,
          withDistance,
          userof: user?.userof ?? 0,
        },
      });

      const success = response?.success;
      const apiData = response?.data || {};
      const apiRows = Array.isArray(apiData?.rows) ? apiData.rows : [];
      const apiCoordinates = getCoordinates(apiData?.coordinates);

      if (success && apiRows.length > 0) {
        setRows(apiRows);
        setCoordinates(apiCoordinates);
        showSuccess(`Found ${apiRows.length} records`);
      } else {
        setRows([]);
        setCoordinates([]);
        showWarning("No route data found");
      }
    } catch (apiError) {
      setRows([]);
      setCoordinates([]);
      const message = apiError?.message || "Failed to fetch route report";
      showError(message);
    } finally {
      setLoading(false);
      setLoader(false);
    }
  };

  return (
    <div className="main-content page-user-route-report">
      <div className="page-header">
        <h1 className="page-title">User Route Report</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            Home
          </Link>
          <span className="breadcrumb-item">Reports</span>
          <span className="breadcrumb-item active">User Route Report</span>
        </nav>
      </div>

      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center gap-3 flex-wrap">
          <h5 className="card-title mb-0">Search Filters</h5>

          {/* 🔍 User search input (name or ID) – specifically for FOS ID */}
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
          <form onSubmit={handleFormSubmit(handleSearch)}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="fosId" className="form-label">
                  FOS ID <span className="text-danger">*</span>
                </label>
                <input
                  id="fosId"
                  type="text"
                  className={`form-control ${errors.fosId ? "is-invalid" : ""}`}
                  value={fosId}
                  placeholder="Select from search"
                  readOnly
                  {...register("fosId", { required: "FOS ID is required" })}
                />
                {errors.fosId && (
                  <div className="invalid-feedback">{errors.fosId.message}</div>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="date" className="form-label">
                  Select Date <span className="text-danger">*</span>
                </label>
                <input
                  id="date"
                  type="date"
                  className={`form-control ${errors.date ? "is-invalid" : ""}`}
                  value={date}
                  {...register("date", {
                    required: "Date is required",
                    onChange: (event) => setDate(event.target.value),
                  })}
                />
                {errors.date && (
                  <div className="invalid-feedback">{errors.date.message}</div>
                )}
              </div>

              <div className="col-12">
                <div className="form-check">
                  <input
                    id="withDistance"
                    type="checkbox"
                    className="form-check-input"
                    checked={withDistance}
                    {...register("withDistance", {
                      onChange: (event) =>
                        setWithDistance(event.target.checked),
                    })}
                  />
                  <label htmlFor="withDistance" className="form-check-label">
                    Along with distance
                  </label>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Loading..." : "Show Route"}
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

      {coordinates.length > 0 && (
        <div className="mt-6">
          <h3 className="fs-5 fw-semibold text-secondary mb-2">Route Map</h3>
          <RouteMap coordinates={coordinates} />
        </div>
      )}

      {tableRows.length > 0 && (
        <div className="card mt-5">
          <div className="card-body">
            <DataTable
              title="User Route Report"
              columns={columns2}
              data={tableRows}
              defaultPerPage={10}
              csvFilename="user_route_report.csv"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FrmUserRouteReport;
