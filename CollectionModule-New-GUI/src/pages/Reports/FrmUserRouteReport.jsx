import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ReusableDataGrid from "../../components/ReusableDataGrid";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/useNotification";
import RouteMap from "../../components/ui/RouteMap";

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

  if (waypoints) {
    params.set("waypoints", waypoints);
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`;
};

function FrmUserRouteReport() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showError, showSuccess, showWarning } = useNotification();
  const {
    register,
    handleSubmit: handleFormSubmit,
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

  const tableRows = useMemo(() => {
    if (!Array.isArray(rows)) return [];

    return rows.map((item) => [
      item["Sr No"] ?? "",
      item["Collection Associate"] ?? "",
      item["Account Number"] ?? "",
      item["Transaction Date"] ?? "",
      item.GO_Location ?? "",
      item["Disposition Type"] ?? "",
      item["Visit Remark"] ?? "",
      item.Distance ?? "",
    ]);
  }, [rows]);

  const routeUrl = useMemo(() => getRouteUrl(coordinates), [coordinates]);

  const handleSearch = async () => {
    const trimmedFosId = fosId.trim();
    const formattedDate = formatDateForApi(date);

    setLoading(true);
    setRows([]);
    setCoordinates([]);

    try {
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
    }
  };

  // Validation helpers (red border only after submit)
  const isFosIdInvalid =
    searched && (!fosId.trim() || !/^\d+$/.test(fosId.trim()));
  const isDateInvalid = searched && !date;

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
        <div className="card-header">
          <h5 className="card-title mb-0">Search Filters</h5>
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
                  placeholder="Enter FOS ID"
                  inputMode="numeric"
                  maxLength={20}
                  {...register("fosId", {
                    required: "FOS ID is required",
                    pattern: {
                      value: /^\d+$/,
                      message: "FOS ID must contain numbers only",
                    },
                    onChange: (event) => setFosId(event.target.value.replace(/\D/g, "")),
                  })}
                />
                {errors.fosId && <div className="invalid-feedback">{errors.fosId.message}</div>}
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
                {errors.date && <div className="invalid-feedback">{errors.date.message}</div>}
              </div>

              <div className="col-12">
                <div className="form-check">
                  <input
                    id="withDistance"
                    type="checkbox"
                    className="form-check-input"
                    checked={withDistance}
                    {...register("withDistance", {
                      onChange: (event) => setWithDistance(event.target.checked),
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

export default FrmUserRouteReport;
