import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReusableDataGrid from "../../components/ReusableDataGrid";
import ImageViewer from "../../components/ui/ImageViewer";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/useNotification";
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

const formatDateForAPI = (dateStr) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
};

const formatToDDMMYYYY = (isoString) => {
  if (!isoString) return "";

  const date = new Date(isoString);

  if (isNaN(date)) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const getPayload = (response) => response?.data ?? response ?? {};
const getDataRows = (response) => {
  const payload = getPayload(response);
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.rows)) return payload.rows;
  return [];
};

function FrmTransactionReport() {
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
      fromDate: "",
      toDate: "",
      userId: "",
    },
  });
  const brid = user?.brid ?? user?.BRID ?? user?.num_usermst_brid ?? null;
  const brCategory =
    user?.brCategory ?? user?.brcategory ?? user?.BRCATEGORY ?? null;

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [zone, setZone] = useState("");
  const [region, setRegion] = useState("");
  const [branch, setBranch] = useState("");
  const [userId, setUserId] = useState("");
  const [collectionAssociated, setCollectionAssociated] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [smaType, setSmaType] = useState("");

  const [zoneOptions, setZoneOptions] = useState([]);
  const [regionOptions, setRegionOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [collectionOptions, setCollectionOptions] = useState([]);

  const [loadingZones, setLoadingZones] = useState(false);
  const [loadingRegions, setLoadingRegions] = useState(false);
  const [loadingBranches, setLoadingBranches] = useState(false);
  const [loadingCollection, setLoadingCollection] = useState(false);

  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  const [selectedImageCode, setSelectedImageCode] = useState("");
  const [showImageViewer, setShowImageViewer] = useState(false);

  // 🔍 Search state for user name/id
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const transactionTypeOptions = [
    { label: "Collection", value: "1" },
    { label: "Feedback", value: "2" },
  ];

  const smaTypeOptions = [
    { value: "SMA1", label: "SMA1" },
    { value: "SMA2", label: "SMA2" },
  ];

  // ---------- User search debounced API ----------
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
      setLoader(true);
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
      setLoader(false);
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

  // ---------- Existing dropdown fetches (unchanged) ----------
  useEffect(() => {
    const fetchZones = async () => {
      if (brid === null || brCategory === null) return;
      setLoadingZones(true);
      try {
        setLoader(true);
        const res = await apiClient.get("/transactionReports/getZones", {
          params: { brid, brcategory: brCategory },
        });
        const dataArray = getDataRows(res);
        if (dataArray.length > 0) {
          const zones = dataArray
            .map((item) => ({
              value: String(
                item.BRID ?? item.brid ?? item.NUM_COMPANYMST_COMPID ?? "",
              ),
              label: String(
                item.BRNAME ??
                  item.brname ??
                  item.VAR_COMPANYMST_BRANCHNAME ??
                  "",
              ),
            }))
            .filter((item) => item.value);
          setZoneOptions(zones);
        } else {
          setZoneOptions([]);
        }
      } catch (apiError) {
        setError(apiError?.message || "Failed to load zones");
      } finally {
        setLoadingZones(false);
        setLoader(false);
      }
    };
    fetchZones();
  }, [brid, brCategory]);

  useEffect(() => {
    const fetchRegions = async () => {
      if (!zone || brid === null || brCategory === null) {
        setRegionOptions([]);
        setBranchOptions([]);
        setCollectionOptions([]);
        setRegion("");
        setBranch("");
        setCollectionAssociated("");
        return;
      }
      setLoadingRegions(true);
      try {
        setLoader(true);
        const res = await apiClient.get("/transactionReports/getRegions", {
          params: { zoneId: zone, brid, brcategory: brCategory },
        });
        const dataArray = getDataRows(res);
        if (dataArray.length > 0) {
          const regions = dataArray
            .map((item) => ({
              value: String(
                item.NUM_COMPANYMST_COMPID ??
                  item.num_companymst_compid ??
                  item.BRID ??
                  "",
              ),
              label: String(
                item.VAR_COMPANYMST_BRANCHNAME ??
                  item.var_companymst_branchname ??
                  item.BRNAME ??
                  "",
              ),
            }))
            .filter((item) => item.value);
          setRegionOptions(regions);
        } else {
          setRegionOptions([]);
        }
      } catch (apiError) {
        setError(apiError?.message || "Failed to load regions");
      } finally {
        setLoadingRegions(false);
        setLoader(false);
      }
    };
    fetchRegions();
  }, [zone, brid, brCategory]);

  useEffect(() => {
    const fetchBranches = async () => {
      if (!region || brid === null || brCategory === null) {
        setBranchOptions([]);
        setCollectionOptions([]);
        setBranch("");
        setCollectionAssociated("");
        return;
      }
      setLoadingBranches(true);
      try {
        setLoader(true);
        const res = await apiClient.get("/transactionReports/getBranches", {
          params: { regionId: region, brid, brcategory: brCategory },
        });
        const dataArray = getDataRows(res);
        if (dataArray.length > 0) {
          const branches = dataArray
            .map((item) => ({
              value: String(
                item.NUM_COMPANYMST_COMPID ??
                  item.num_companymst_compid ??
                  item.BRID ??
                  "",
              ),
              label: String(
                item.VAR_COMPANYMST_BRANCHNAME ??
                  item.var_companymst_branchname ??
                  item.BRNAME ??
                  "",
              ),
            }))
            .filter((item) => item.value);
          setBranchOptions(branches);
        } else {
          setBranchOptions([]);
        }
      } catch (apiError) {
        setError(apiError?.message || "Failed to load branches");
      } finally {
        setLoadingBranches(false);
        setLoader(false);
      }
    };
    fetchBranches();
  }, [region, brid, brCategory]);

  useEffect(() => {
    const fetchCollectionAssociates = async () => {
      if (!zone) {
        setCollectionOptions([]);
        setCollectionAssociated("");
        return;
      }
      const bridParam = String(branch || region || zone || "");
      setLoadingCollection(true);
      try {
        setLoader(true);
        const res = await apiClient.get(
          "/transactionReports/getCollAssociate",
          {
            params: { brid: bridParam },
          },
        );
        const dataArray = getDataRows(res);
        if (dataArray.length > 0) {
          const associates = dataArray
            .map((item) => {
              const optionValue =
                item.USER_ID ||
                item.user_id ||
                item.VAR_USERMST_USERID ||
                item.var_usermst_userid ||
                "";
              const optionLabel =
                item.VAR_USERMST_USERID ||
                item.var_usermst_userid ||
                optionValue;
              return {
                value: String(optionValue),
                label: String(optionLabel),
              };
            })
            .filter((item) => item.value);
          setCollectionOptions(associates);
          setCollectionAssociated((previous) =>
            associates.some((opt) => opt.value === previous) ? previous : "",
          );
        } else {
          setCollectionOptions([]);
          setCollectionAssociated("");
        }
      } catch (apiError) {
        setError(apiError?.message || "Failed to load collection associates");
      } finally {
        setLoadingCollection(false);
        setLoader(false);
      }
    };
    fetchCollectionAssociates();
  }, [zone, region, branch, brid]);

  // ---------- Image & location handlers (unchanged) ----------
  const handleViewClick = (imageCode) => {
    if (!imageCode) {
      showError("No image available");
      setError("No image available");
      return;
    }
    setSelectedImageCode(imageCode);
    setShowImageViewer(true);
  };

  const handleLocationClick = (geoLocation) => {
    if (!geoLocation) {
      showError("No location data");
      setError("No location data");
      return;
    }
    const [lat, lng] = geoLocation.split(",");
    if (
      !lat ||
      !lng ||
      Number.isNaN(parseFloat(lat)) ||
      Number.isNaN(parseFloat(lng))
    ) {
      showError("Invalid coordinates");
      setError("Invalid coordinates");
      return;
    }
    window.open(`/map-view?lat=${lat.trim()}&lng=${lng.trim()}`, "_blank");
  };

  // ---------- Main search (transaction report) ----------
  const handleSearch = async () => {
    setError("");
    const fromDateFormatted = fromDate ? formatDateForAPI(fromDate) : "";
    const toDateFormatted = toDate ? formatDateForAPI(toDate) : "";

    if (!fromDateFormatted || !toDateFormatted) {
      showError("From Date and To Date are required");
      setError("From Date and To Date are required");
      return;
    }

    const zoneName = zoneOptions.find((opt) => opt.value == zone)?.label || "";
    const regionName =
      regionOptions.find((opt) => opt.value == region)?.label || "";

    const params = {
      fromDate: fromDateFormatted,
      toDate: toDateFormatted,
      zoneName,
      regionName,
      brid: branch,
      userId: userId.trim(),
      associateId: collectionAssociated || "",
      transtype: transactionType || "",
      smaType: smaType || "",
      userOf: 1,
    };

    setSearching(true);
    setRows([]);

    try {
      setLoader(true);
      const response = await apiClient.get(
        "/transactionReports/getTransDetails",
        { params },
      );
      const success = response?.success;
      const apiData = response?.data;

      if (success && apiData && apiData.length > 0) {
        const mappedRows = apiData.map((item) => [
          item.USERID || "",
          item.USERNAME || "",
          item.TRANSID || "",
          item.CONTRACTNUM || "",
          item.DIST_VAR_BANKDATA_MATRIX_DISTANCE || "",
          item.CUSTNAME || "",
          item.MOBILENO || "",
          item.COLLECTAMOUNT || "",
          item.FEEDBACK || "",
          item.PAYMODE || "",
          item.PAIDAMT || "",
          item.PTPDATE || "",
          item.TRANS_DATE || "",
          item.TRANS_TIME || "",
          item.IMAGECODE || "",
          item.GOLOCATION || "",
          item.MDM_ID || "",
          item.VAR_BANKDATA_DPDBUCKET || "",
          item.VISITSTSTS || "",
        ]);
        const mappedRows2 = apiData.map((item) => ({
          userId: item.USERID || "",
          collectionassociate: item.USERNAME || "",
          transactionId: item.TRANSID || "",
          accountNumber: item.CONTRACTNUM || "",
          distanceKm: item.DIST_VAR_BANKDATA_MATRIX_DISTANCE || "",
          customerName: item.CUSTNAME || "",
          mobileNo: item.MOBILENO || "",
          overdueamount: item.COLLECTAMOUNT || "",
          feedback: item.FEEDBACK || "",
          paymode: item.PAYMODE || "",
          amount: item.PAIDAMT || "",
          ptpdate: item.PTPDATE || "",
          transactiondate: item.TRANS_DATE || "",
          transactiontime: item.TRANS_TIME || "",
          view: item.IMAGECODE || "",
          geolocation: item.GOLOCATION || "",
          mdmid: item.MDM_ID || "",
          smatype: item.VAR_BANKDATA_DPDBUCKET || "",
          transactiontype: item.VISITSTSTS || "",
        }));
        setRows(mappedRows);
        setRows2(mappedRows2);
        showSuccess(`Found ${mappedRows.length} records`);
      } else {
        setRows([]);
        showWarning("No records found");
        setError("No records found");
      }
    } catch (apiError) {
      setRows([]);
      showError(
        apiError?.response?.data?.message ||
          apiError?.message ||
          "Search failed",
      );
      setError(
        apiError?.response?.data?.message ||
          apiError?.message ||
          "Search failed",
      );
    } finally {
      setSearching(false);
      setLoader(false);
    }
  };

  const columns = [
    { label: "User Id", sortable: true, field: "userId" },
    { label: "Collection Associate", sortable: true },
    { label: "Transaction Id", sortable: true },
    { label: "Account Number", sortable: true },
    { label: "Distance KM", sortable: true },
    { label: "Customer Name", sortable: true },
    { label: "Customer RMN", sortable: true },
    { label: "OverDue Amount", sortable: true },
    { label: "Feedback", sortable: true },
    { label: "Payment Mode", sortable: true },
    { label: "Amount", sortable: true },
    { label: "PTP Date", sortable: true },
    { label: "Transaction date", sortable: true },
    { label: "Transaction Time", sortable: true },
    {
      label: "View",
      sortable: false,
      render: (value) => (
        <button
          type="button"
          onClick={() => handleViewClick(value)}
          className="btn btn-link p-0"
        >
          View
        </button>
      ),
    },
    {
      label: "Geolocation",
      sortable: false,
      render: (value) => (
        <button
          type="button"
          onClick={() => handleLocationClick(value)}
          className="btn btn-link p-0"
        >
          View Location
        </button>
      ),
    },
    { label: "MDM ID", sortable: true },
    { label: "SMA TYPE", sortable: true },
    { label: "Transaction Type", sortable: true },
  ];

  const columns2 = [
    {
      key: "userId",
      label: "User ID",
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
      key: "collectionassociate",
      label: "Collection Associate",
    },
    {
      key: "transactionId",
      label: "Transaction ID",
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
    {
      key: "accountNumber",
      label: "Account Number",
      render: (val) => (
        <span className="badge bg-success text-white">{val}</span>
      ),
    },
    {
      key: "distanceKm",
      label: "Distance KM",
      render: (val) =>
        val ? <span>{val}</span> : <span className="text-muted">-</span>,
    },
    {
      key: "customerName",
      label: "Customer Name",
      render: (val) =>
        val ? <span>{val}</span> : <span className="text-muted">-</span>,
    },
    {
      key: "mobileNo",
      label: "Customer RMN",
      render: (val) =>
        val ? <span>{val}</span> : <span className="text-muted">-</span>,
    },
    {
      key: "overdueamount",
      label: "Overdue Amount",
      render: (val) => <span>₹ {val}</span>,
    },
    {
      key: "feedback",
      label: "Feedback",
      render: (val) =>
        val ? <span>{val}</span> : <span className="text-muted">-</span>,
    },
    {
      key: "paymode",
      label: "Payment Mode",
      render: (val) =>
        val ? <span>{val}</span> : <span className="text-muted">-</span>,
    },
    {
      key: "amount",
      label: "Amount",
      render: (val) =>
        val ? <span>{val}</span> : <span className="text-muted">-</span>,
    },
    {
      key: "ptpdate",
      label: "PTP Date",
      render: (val) =>
        val ? (
          <span>{formatToDDMMYYYY(val)}</span>
        ) : (
          <span className="text-muted">-</span>
        ),
    },
    {
      key: "transactiondate",
      label: "Transaction Date",
      render: (val) =>
        val ? <span>{val}</span> : <span className="text-muted">-</span>,
    },
    {
      key: "transactiontime",
      label: "Transaction Time",
      render: (val) =>
        val ? <span>{val}</span> : <span className="text-muted">-</span>,
    },
    {
      key: "view",
      label: "View",
      render: (value) => (
        <button
          type="button"
          onClick={() => handleViewClick(value)}
          className="btn btn-link p-0"
        >
          View
        </button>
      ),
    },
    {
      key: "geolocation",
      label: "Geolocation",
      render: (value) => (
        <button
          type="button"
          onClick={() => handleLocationClick(value)}
          className="btn btn-link p-0"
        >
          View Location
        </button>
      ),
    },
    {
      key: "mdmid",
      label: "MDM ID",
      render: (val) =>
        val ? <span>{val}</span> : <span className="text-muted">-</span>,
    },
    {
      key: "smatype",
      label: "SMA Type",
      render: (val) =>
        val === "SMA1" ? (
          <span className="badge bg-info text-white">{val}</span>
        ) : (
          <span className="badge bg-primary text-white">{val}</span>
        ),
    },
    {
      key: "transactiontype",
      label: "Transaction Type",
      render: (val) =>
        val ? <span>{val}</span> : <span className="text-muted">-</span>,
    },
  ];

  return (
    <div className="main-content page-transaction-report">
      <div className="page-header">
        <h1 className="page-title">Transaction Report</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            Home
          </Link>
          <span className="breadcrumb-item">Reports</span>
          <span className="breadcrumb-item active">Transaction Report</span>
        </nav>
      </div>

      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center gap-3 flex-wrap">
          <h5 className="card-title mb-0">Search Filters</h5>

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
          <form onSubmit={handleFormSubmit(handleSearch)}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="fromDate" className="form-label">
                  From Date <span className="text-danger">*</span>
                </label>
                <input
                  id="fromDate"
                  type="date"
                  className={`form-control ${errors.fromDate ? "is-invalid" : ""}`}
                  value={fromDate}
                  {...register("fromDate", {
                    required: "From Date is required",
                    onChange: (event) => setFromDate(event.target.value),
                  })}
                />
                {errors.fromDate && (
                  <div className="invalid-feedback">
                    {errors.fromDate.message}
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="toDate" className="form-label">
                  To Date <span className="text-danger">*</span>
                </label>
                <input
                  id="toDate"
                  type="date"
                  className={`form-control ${errors.toDate ? "is-invalid" : ""}`}
                  value={toDate}
                  {...register("toDate", {
                    required: "To Date is required",
                    onChange: (event) => setToDate(event.target.value),
                  })}
                />
                {errors.toDate && (
                  <div className="invalid-feedback">
                    {errors.toDate.message}
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="zone" className="form-label">
                  Zone
                </label>
                <select
                  id="zone"
                  className="form-select"
                  value={zone}
                  onChange={(event) => setZone(event.target.value)}
                  disabled={loadingZones}
                >
                  <option value="">Select Zone</option>
                  {zoneOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="region" className="form-label">
                  Region
                </label>
                <select
                  id="region"
                  className="form-select"
                  value={region}
                  onChange={(event) => setRegion(event.target.value)}
                  disabled={!zone || loadingRegions}
                >
                  <option value="">Select Region</option>
                  {regionOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="branch" className="form-label">
                  Branch
                </label>
                <select
                  id="branch"
                  className="form-select"
                  value={branch}
                  onChange={(event) => setBranch(event.target.value)}
                  disabled={!region || loadingBranches}
                >
                  <option value="">Select Branch</option>
                  {branchOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* User ID field – now readOnly, populated via search dropdown */}
              <div className="col-md-6">
                <label htmlFor="userId" className="form-label">
                  User Id
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

              <div className="col-md-6">
                <label htmlFor="collectionAssociated" className="form-label">
                  Collection Associate
                </label>
                <select
                  id="collectionAssociated"
                  className="form-select"
                  value={collectionAssociated}
                  onChange={(event) =>
                    setCollectionAssociated(event.target.value)
                  }
                  disabled={!zone || loadingCollection}
                >
                  <option value="">Select Collection Associate</option>
                  {collectionOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="transactionType" className="form-label">
                  Transaction Type
                </label>
                <select
                  id="transactionType"
                  className="form-select"
                  value={transactionType}
                  onChange={(event) => setTransactionType(event.target.value)}
                >
                  <option value="">Select Transaction Type</option>
                  {transactionTypeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="smaType" className="form-label">
                  SMA Type
                </label>
                <select
                  id="smaType"
                  className="form-select"
                  value={smaType}
                  onChange={(event) => setSmaType(event.target.value)}
                >
                  <option value="">Select SMA Type</option>
                  {smaTypeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={searching}
              >
                {searching ? "Searching..." : "Search"}
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

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2" /> {error}
        </div>
      )}

      {/* {rows.length > 0 && (
        <div className="card">
          <div className="card-body">
            <ReusableDataGrid rows={rows} columns={columns} pageSize={10} />
          </div>
        </div>
      )} */}

      {rows.length > 0 && (
        <div className="card">
          <div className="card-body">
            {/* <ReusableDataGrid rows={rows} columns={columns} pageSize={10} /> */}
            <DataTable
              title="Transaction Report Table"
              csvFilename="transaction_report.csv"
              data={rows2}
              columns={columns2}
              defaultPerPage={10}
            />
          </div>
        </div>
      )}

      {showImageViewer && (
        <ImageViewer
          imageCode={selectedImageCode}
          onClose={() => setShowImageViewer(false)}
        />
      )}
    </div>
  );
}

export default FrmTransactionReport;
