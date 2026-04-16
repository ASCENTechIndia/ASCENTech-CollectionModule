import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import apiClient from "../../services/apiService";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import TailwindGridTable from "../../components/reports/TailwindGridTable";
import ImageViewer from "../../components/ui/ImageViewer";

const TransactionReport = () => {
  const { user } = useAuth();
  const brid = user?.brid;
  const brCategory = user?.brCategory;
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotification();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      zone: "",
      region: "",
      branch: "",
      collectionAssociated: "",
      userId: "",
      transactionType: "",
      smaType: "",
      fromDate: "",
      toDate: "",
    },
  });

  // Dropdown options state
  const [zoneOptions, setZoneOptions] = useState([]);
  const [regionOptions, setRegionOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [collectionOptions, setCollectionOptions] = useState([]);

  // Loading states
  const [loadingZones, setLoadingZones] = useState(false);
  const [loadingRegions, setLoadingRegions] = useState(false);
  const [loadingBranches, setLoadingBranches] = useState(false);
  const [loadingCollection, setLoadingCollection] = useState(false);

  // Table data & search
  const [tableData, setTableData] = useState([]);
  const [searching, setSearching] = useState(false);

  // Image popup state
  const [selectedImageCode, setSelectedImageCode] = useState(null);
  const [showImageViewer, setShowImageViewer] = useState(false);

  // Watch form values
  const watchZone = watch("zone");
  const watchRegion = watch("region");
  const watchBranch = watch("branch");

  // Options for Transaction Type and SMA Type
  const transactionTypeOptions = [
    { label: "Collection", value: "1" },
    { label: "Feedback", value: "2" },
  ];
  const smaTypeOptions = [
    { value: "SMA1", label: "SMA1" },
    { value: "SMA2", label: "SMA2" },
  ];

  // ---------- 1. Fetch Zones ----------
  useEffect(() => {
    const fetchZones = async () => {
      if (!brid || !brCategory) return;
      setLoadingZones(true);
      try {
        const res = await apiClient.get("/transactionReports/getZones", {
          params: { brid, brcategory: brCategory },
        });
        const dataArray = res?.data?.data?.data || [];
        if (res?.data?.success && dataArray.length > 0) {
          const zones = dataArray.map((item) => ({
            value: item.BRID,
            label: item.BRNAME,
          }));
          setZoneOptions(zones);
        } else {
          setZoneOptions([]);
        }
      } catch (err) {
        console.error(err.message);
        showError("Failed to load zones");
      } finally {
        setLoadingZones(false);
      }
    };
    fetchZones();
  }, [brid, brCategory, showError]);

  // ---------- 2. Fetch Regions when Zone changes ----------
  useEffect(() => {
    const fetchRegions = async () => {
      if (!watchZone || !brid || !brCategory) {
        setRegionOptions([]);
        setValue("region", "");
        setValue("branch", "");
        setValue("collectionAssociated", "");
        return;
      }
      setLoadingRegions(true);
      try {
        const res = await apiClient.get("/transactionReports/getRegions", {
          params: { zoneId: watchZone, brid, brcategory: brCategory },
        });
        const dataArray = res?.data?.data || [];
        if (res?.data?.success && dataArray.length > 0) {
          const regions = dataArray.map((item) => ({
            value: item.NUM_COMPANYMST_COMPID,
            label: item.VAR_COMPANYMST_BRANCHNAME,
          }));
          setRegionOptions(regions);
        } else {
          setRegionOptions([]);
        }
      } catch (err) {
        console.error(err.message);
        showError("Failed to load regions");
      } finally {
        setLoadingRegions(false);
      }
    };
    fetchRegions();
  }, [watchZone, brid, brCategory, setValue, showError]);

  // ---------- 3. Fetch Branches when Region changes ----------
  useEffect(() => {
    const fetchBranches = async () => {
      if (!watchRegion || !brid || !brCategory) {
        setBranchOptions([]);
        setValue("branch", "");
        setValue("collectionAssociated", "");
        return;
      }
      setLoadingBranches(true);
      try {
        const res = await apiClient.get("/transactionReports/getBranches", {
          params: { regionId: watchRegion, brid, brcategory: brCategory },
        });
        const dataArray = res?.data?.data || [];
        if (res?.data?.success && dataArray.length > 0) {
          const branches = dataArray.map((item) => ({
            value: item.NUM_COMPANYMST_COMPID,
            label: item.VAR_COMPANYMST_BRANCHNAME,
          }));
          setBranchOptions(branches);
        } else {
          setBranchOptions([]);
        }
      } catch (err) {
        console.error(err.message);
        showError("Failed to load branches");
      } finally {
        setLoadingBranches(false);
      }
    };
    fetchBranches();
  }, [watchRegion, brid, brCategory, setValue, showError]);

  // ---------- 4. Fetch Collection Associates ----------
  useEffect(() => {
    const fetchCollectionAssociates = async () => {
      let bridParam = "";
      if (watchBranch) bridParam = watchBranch;
      else if (watchRegion) bridParam = watchRegion;
      else if (watchZone) bridParam = watchZone;
      else {
        setCollectionOptions([]);
        setValue("collectionAssociated", "");
        return;
      }

      setLoadingCollection(true);
      try {
        const res = await apiClient.get(
          "/transactionReports/getCollAssociate",
          {
            params: { brid: bridParam },
          },
        );
        const dataArray = res?.data?.data || [];
        if (res?.data?.success && dataArray.length > 0) {
          const associates = dataArray.map((item) => ({
            value: item.USER_ID || item.VAR_USERMST_USERID,
            label: item.VAR_USERMST_USERID,
          }));
          setCollectionOptions(associates);
        } else {
          setCollectionOptions([]);
        }
      } catch (err) {
        console.error(err.message);
        showError("Failed to load collection associates");
      } finally {
        setLoadingCollection(false);
      }
    };
    fetchCollectionAssociates();
  }, [watchZone, watchRegion, watchBranch, setValue, showError]);

  // ---------- Helper: Format YYYY-MM-DD to DD/MM/YYYY ----------
  const formatDateForAPI = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  // ---------- 5. Search (Submit) with Real API ----------
  const onSubmit = async (data) => {
    const fromDate = data.fromDate ? formatDateForAPI(data.fromDate) : "";
    const toDate = data.toDate ? formatDateForAPI(data.toDate) : "";

    if (!fromDate || !toDate) {
      showError("From Date and To Date are required");
      return;
    }

    // Get zone name and region name from selected values
    const zoneName =
      zoneOptions.find((opt) => opt.value == data.zone)?.label || "";
    const regionName =
      regionOptions.find((opt) => opt.value == data.region)?.label || "";
    const userId = data.userId || "";
    const associateId = data.collectionAssociated || "";
    const transtype = data.transactionType || "";
    const smaType = data.smaType || "";

    const params = {
      fromDate,
      toDate,
      zoneName,
      regionName,
      brid: data.branch,
      userId,
      associateId,
      transtype,
      smaType,
      userOf: 1,
    };

    // Log the params
    console.log("API Params:", params);

    setSearching(true);
    setTableData([]);

    try {
      const response = await apiClient.get(
        "/transactionReports/getTransDetails",
        {
          params,
        },
      );
      console.log("submit response ::", response);

      const { success, data: apiData, message } = response.data;
      if (success && apiData && apiData.length > 0) {
        const mappedData = apiData.map((item) => ({
          userId: item.USERID || "",
          collectionAssociate: item.USERNAME || "",
          transactionId: item.TRANSID || "",
          accountNumber: item.CONTRACTNUM || "",
          distanceKm: item.DIST_VAR_BANKDATA_MATRIX_DISTANCE || "",
          customerName: item.CUSTNAME || "",
          customerRmn: item.MOBILENO || "",
          overdueAmount: item.COLLECTAMOUNT,
          feedback: item.FEEDBACK || "",
          paymentMode: item.PAYMODE || "",
          amount: item.PAIDAMT || "",
          ptpDate: item.PTPDATE || "",
          transactionDate: item.TRANS_DATE || "",
          transactionTime: item.TRANS_TIME || "",
          view: item.IMAGECODE || "",
          geolocation: item.GOLOCATION || "",
          mdmId: item.MDM_ID || "",
          smaType: item.VAR_BANKDATA_DPDBUCKET || "",
          transactionType: item.VISITSTSTS || "",
        }));
        setTableData(mappedData);
        showSuccess(`Found ${mappedData.length} records`);
      } else {
        setTableData([]);
        showError("No records found");
      }
    } catch (err) {
      console.error(err);
      showError(err?.response?.data?.message || err.message || "Search failed");
      setTableData([]);
    } finally {
      setSearching(false);
    }
  };

  // ---------- Custom Handlers for View & Geolocation ----------
  const handleViewClick = (imageCode) => {
    console.log("image code", imageCode);
    if (!imageCode) {
      showError("No image available");
      return;
    }
    setSelectedImageCode(imageCode);
    setShowImageViewer(true);
  };

  const handleLocationClick = (geoLocation) => {
    if (!geoLocation) {
      showError("No location data");
      return;
    }
    const [lat, lng] = geoLocation.split(",");
    if (!lat || !lng || isNaN(parseFloat(lat)) || isNaN(parseFloat(lng))) {
      showError("Invalid coordinates");
      return;
    }
    window.open(`/map-view?lat=${lat.trim()}&lng=${lng.trim()}`, "_blank");
  };

  // ---------- Table Headers with Custom Renderers ----------
  const tableHeaders = [
    { displayName: "User Id", field: "userId" },
    { displayName: "Collection Associate", field: "collectionAssociate" },
    { displayName: "Transaction Id", field: "transactionId" },
    { displayName: "Account Number", field: "accountNumber" },
    { displayName: "Distance KM", field: "distanceKm" },
    { displayName: "Customer Name", field: "customerName" },
    { displayName: "Customer RMN", field: "customerRmn" },
    { displayName: "OverDue Amount", field: "overdueAmount" },
    { displayName: "Feedback", field: "feedback" },
    { displayName: "Payment Mode", field: "paymentMode" },
    { displayName: "Amount", field: "amount" },
    { displayName: "PTP Date", field: "ptpDate" },
    { displayName: "Transaction date", field: "transactionDate" },
    { displayName: "Transaction Time", field: "transactionTime" },
    {
      displayName: "View",
      field: "view",
      render: (value) => (
        <button
          onClick={() => handleViewClick(value)}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          View
        </button>
      ),
    },
    {
      displayName: "Geolocation",
      field: "geolocation",
      render: (value) => (
        <button
          onClick={() => handleLocationClick(value)}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          View Location
        </button>
      ),
    },
    { displayName: "MDM ID", field: "mdmId" },
    { displayName: "SMA TYPE", field: "smaType" },
    { displayName: "Transaction Type", field: "transactionType" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Transaction Report
          </h1>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* From Date */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  From Date<span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  {...register("fromDate", {
                    required: "From Date is required",
                  })}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    errors.fromDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.fromDate && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.fromDate.message}
                  </p>
                )}
              </div>

              {/* To Date */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  To Date<span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  {...register("toDate", { required: "To Date is required" })}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    errors.toDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.toDate && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.toDate.message}
                  </p>
                )}
              </div>

              {/* Zone Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Zone
                </label>
                <div className="relative">
                  <select
                    {...register("zone")}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Select Zone</option>
                    {zoneOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {loadingZones && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 animate-spin" />
                  )}
                </div>
              </div>

              {/* Region Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Region
                </label>
                <div className="relative">
                  <select
                    {...register("region")}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    disabled={!watchZone}
                  >
                    <option value="">Select Region</option>
                    {regionOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {loadingRegions && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 animate-spin" />
                  )}
                </div>
              </div>

              {/* Branch Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Branch
                </label>
                <div className="relative">
                  <select
                    {...register("branch")}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    disabled={!watchRegion}
                  >
                    <option value="">Select Branch</option>
                    {branchOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {loadingBranches && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 animate-spin" />
                  )}
                </div>
              </div>

              {/* User Id */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  User Id
                </label>
                <input
                  type="text"
                  {...register("userId")}
                  placeholder="Enter User Id"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Collection Associate Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Collection Associate
                </label>
                <div className="relative">
                  <select
                    {...register("collectionAssociated")}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    disabled={!watchZone}
                  >
                    <option value="">Select Collection Associate</option>
                    {collectionOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {loadingCollection && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 animate-spin" />
                  )}
                </div>
              </div>

              {/* Transaction Type */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Transaction Type
                </label>
                <select
                  {...register("transactionType")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Transaction Type</option>
                  {transactionTypeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* SMA Type */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  SMA Type
                </label>
                <select
                  {...register("smaType")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
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

            <div className="mt-7 flex justify-center gap-5">
              <button
                type="submit"
                disabled={searching}
                className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 flex items-center gap-2"
              >
                {searching && <Loader2 className="w-4 h-4 animate-spin" />}
                {searching ? "Searching..." : "Search"}
              </button>
              <button
                type="button"
                className="px-8 py-2.5 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={() => navigate("/dashboard")}
              >
                Close
              </button>
            </div>
          </form>
        </div>

        {tableData.length > 0 && (
          <div className="mt-6">
            <TailwindGridTable
              title="Transaction Report"
              headers={tableHeaders}
              rows={tableData}
            />
          </div>
        )}
      </div>

      {showImageViewer && (
        <ImageViewer
          imageCode={selectedImageCode}
          onClose={() => setShowImageViewer(false)}
        />
      )}
    </div>
  );
};

export default TransactionReport;
