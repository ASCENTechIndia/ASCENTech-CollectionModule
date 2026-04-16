import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import apiClient from "../../services/apiService";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import TailwindGridTable from "../../components/reports/TailwindGridTable";

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

  // Watch form values
  const watchZone = watch("zone");
  const watchRegion = watch("region");
  const watchBranch = watch("branch");

  // Table headers and mapping
  const tableHeaders = [
    { displayName: "User Id" },
    { displayName: "Collection Associate" },
    { displayName: "Transaction Id" },
    { displayName: "Account Number" },
    { displayName: "Distance KM" },
    { displayName: "Customer Name" },
    { displayName: "Customer RMN" },
    { displayName: "OverDue Amount" },
    { displayName: "Feedback" },
    { displayName: "Payment Mode" },
    { displayName: "Amount" },
    { displayName: "PTP Date" },
    { displayName: "Transaction date" },
    { displayName: "Transaction Time" },
    { displayName: "View" },
    { displayName: "Geolocation" },
    { displayName: "MDM ID" },
    { displayName: "SMA TYPE" },
    { displayName: "Transaction Type" },
  ];

  const tableKeyMapping = {
    "User Id": "userId",
    "Collection Associate": "collectionAssociate",
    "Transaction Id": "transactionId",
    "Account Number": "accountNumber",
    "Distance KM": "distanceKm",
    "Customer Name": "customerName",
    "Customer RMN": "customerRmn",
    "OverDue Amount": "overdueAmount",
    Feedback: "feedback",
    "Payment Mode": "paymentMode",
    Amount: "amount",
    "PTP Date": "ptpDate",
    "Transaction date": "transactionDate",
    "Transaction Time": "transactionTime",
    View: "view",
    Geolocation: "geolocation",
    "MDM ID": "mdmId",
    "SMA TYPE": "smaType",
    "Transaction Type": "transactionType",
  };

  const transactionTypeOptions = [
    {
      label: "Collection",
      value: "1",
    },
    {
      label: "Feedback",
      value: "2",
    },
  ];
  const smaTypeOptions = [
    { value: "SMA1", label: "SMA1" },
    { value: "SMA2", label: "SMA2" },
  ];

  // 1. Fetch Zones on mount
  useEffect(() => {
    const fetchZones = async () => {
      if (!brid || !brCategory) return;

      setLoadingZones(true);
      try {
        const res = await apiClient.get("/transactionReports/getZones", {
          params: { brid, brcategory: brCategory },
        });

        console.log("zone drop :", res);
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
  }, [brid, brCategory]);

  // 2. Fetch Regions when Zone changes
  useEffect(() => {
    const fetchRegions = async () => {
      console.log("watch zone :", watchZone);
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
        console.log("region drop :", res);
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
  }, [watchZone, brid, brCategory]);

  // 3. Fetch Branches when Region changes
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
        console.log("branch drop :", res);
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
  }, [watchRegion, brid, brCategory]);

  // 4. Fetch Collection Associates based on most specific selection
  useEffect(() => {
    const fetchCollectionAssociates = async () => {
      let bridParam = "";
      if (watchBranch) {
        bridParam = watchBranch;
      } else if (watchRegion) {
        bridParam = watchRegion;
      } else if (watchZone) {
        bridParam = watchZone;
      } else {
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
        console.log("collection dro :", res);
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
  }, [watchZone, watchRegion, watchBranch]);

  // 5. Search (Submit)
  const onSubmit = async (data) => {
    console.log("Search payload:", data);
    setSearching(true);
    try {
      // Replace with actual search API
      const response = { data: { success: true, data: [] } };
      if (response.data.success && response.data.data.length) {
        setTableData(response.data.data);
        showSuccess(`Found ${response.data.data.length} records`);
      } else {
        setTableData([]);
        showError("No records found");
      }
    } catch (err) {
      console.error(err);
      showError("Search failed");
      setTableData([]);
    } finally {
      setSearching(false);
    }
  };

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
              columnMapping={tableKeyMapping}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionReport;
