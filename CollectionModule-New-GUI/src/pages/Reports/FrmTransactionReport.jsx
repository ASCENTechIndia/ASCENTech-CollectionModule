import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReusableDataGrid from "../../components/ReusableDataGrid";
import ImageViewer from "../../components/ui/ImageViewer";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/useNotification";

const formatDateForAPI = (dateStr) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
};

const getPayload = (response) => response?.data ?? response ?? {};
const getArray = (value) => {
  if (Array.isArray(value)) return value;
  return [];
};
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
  const { showError, showSuccess } = useNotification();
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
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const [selectedImageCode, setSelectedImageCode] = useState("");
  const [showImageViewer, setShowImageViewer] = useState(false);

  const transactionTypeOptions = [
    { label: "Collection", value: "1" },
    { label: "Feedback", value: "2" },
  ];

  const smaTypeOptions = [
    { value: "SMA1", label: "SMA1" },
    { value: "SMA2", label: "SMA2" },
  ];

  useEffect(() => {
    const fetchZones = async () => {
      if (brid === null || brCategory === null) return;
      setLoadingZones(true);
      try {
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
      }
    };
    fetchCollectionAssociates();
  }, [zone, region, branch, brid]);

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

  // Handle numeric input only for User ID
  const handleUserIdChange = (event) => {
    const numericValue = event.target.value.replace(/\D/g, "");
    setUserId(numericValue);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setError("");
    setSearched(true);

    const fromDateFormatted = fromDate ? formatDateForAPI(fromDate) : "";
    const toDateFormatted = toDate ? formatDateForAPI(toDate) : "";

    if (!fromDateFormatted || !toDateFormatted) {
      showError("From Date and To Date are required");
      setError("From Date and To Date are required");
      return;
    }

    const trimmedUserId = userId.trim();
    if (trimmedUserId && !/^\d+$/.test(trimmedUserId)) {
      showError("User ID must contain only numbers");
      setError("User ID must contain only numbers");
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
      userId: trimmedUserId,
      associateId: collectionAssociated || "",
      transtype: transactionType || "",
      smaType: smaType || "",
      userOf: 1,
    };

    setSearching(true);
    setRows([]);

    try {
      const response = await apiClient.get(
        "/transactionReports/getTransDetails",
        {
          params,
        },
      );
      console.log("trans :", response);

      const success = response?.success;
      const apiData = response?.data;
      console.log("api data");

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
        setRows(mappedRows);
        showSuccess(`Found ${mappedRows.length} records`);
      } else {
        setRows([]);
        showError("No records found");
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

  // Validation helper for User ID red border (only after search and non-numeric)
  const isUserIdInvalid =
    searched && userId.trim() && !/^\d+$/.test(userId.trim());

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
        <div className="card-header">
          <h5 className="card-title mb-0">Search Filters</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSearch}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="fromDate" className="form-label">
                  From Date <span className="text-danger">*</span>
                </label>
                <input
                  id="fromDate"
                  type="date"
                  className={`form-control ${!fromDate && searched ? "is-invalid" : ""}`}
                  value={fromDate}
                  onChange={(event) => setFromDate(event.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="toDate" className="form-label">
                  To Date <span className="text-danger">*</span>
                </label>
                <input
                  id="toDate"
                  type="date"
                  className={`form-control ${!toDate && searched ? "is-invalid" : ""}`}
                  value={toDate}
                  onChange={(event) => setToDate(event.target.value)}
                />
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

              <div className="col-md-6">
                <label htmlFor="userId" className="form-label">
                  User Id
                </label>
                <input
                  id="userId"
                  type="text"
                  inputMode="numeric"
                  className={`form-control ${isUserIdInvalid ? "is-invalid" : ""}`}
                  value={userId}
                  onChange={handleUserIdChange}
                  placeholder="Enter User Id (numbers only, optional)"
                />
                {isUserIdInvalid && (
                  <div className="invalid-feedback">
                    User ID must contain only numbers
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
          <i className="bi bi-exclamation-triangle me-2" />
          {error}
        </div>
      )}

      {rows.length > 0 && (
        <div className="card">
          <div className="card-body">
            <ReusableDataGrid rows={rows} columns={columns} pageSize={10} />
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
