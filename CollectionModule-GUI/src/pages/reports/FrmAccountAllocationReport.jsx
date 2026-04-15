import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import apiClient from "../../services/apiService";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utils/dateFormat";
import GridTable from "../../components/reports/GridTable";
import TailwindGridTable from "../../components/reports/TailwindGridTable";
import { useNotification } from "../../context/NotificationContext";

const FrmAccountAllocationReport = () => {
  const { user } = useAuth();
  const brid = user?.brid || "";
  const branchName = user?.branchName || "";
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const tableHeader = [
    { displayName: "Collection Associate ID" },
    { displayName: "Zone" },
    { displayName: "Region" },
    { displayName: "Branch" },
    { displayName: "Allocation Date" },
    { displayName: "Contract Number" },
    { displayName: "Disposition Date" },
    { displayName: "SMA Type" },
  ];

  const tableKeyMapping = {
    "Collection Associate ID": "collectionAssosId",
    Zone: "zone",
    Region: "region",
    Branch: "branch",
    "Allocation Date": "allocationDate",
    "Contract Number": "contractNo",
    "Disposition Date": "dispositionDate",
    "SMA Type": "smaType",
  };

  const onSubmit = async (data) => {
    // Prepare parameters
    const startDate = data.startDate
      ? formatDate(new Date(data.startDate))
      : "";
    const endDate = data.endDate ? formatDate(new Date(data.endDate)) : "";
    const userId = data.userId || "";
    const smaType = data.smaType || "";

    // Validation: startDate and endDate are already required by react-hook-form
    if (!startDate || !endDate) return;

    setLoading(true);
    try {
      const response = await apiClient.get("/reports/AccAllocationReport", {
        params: {
          startDate,
          endDate,
          userId,
          smaType,
          brid,
          branchName,
        },
      });

      console.log("respo :", response);
      const { success, data: apiData } = response.data;

      if (success && apiData && apiData.length > 0) {
        // Map API response to the keys expected by GridTable
        const formattedData = apiData.map((item) => ({
          collectionAssosId: item.ASSIGNEDFOS || "",
          zone: "",
          region: "",
          branch: item.VAR_BANKDATA_BRANCH || "",
          allocationDate: item.CONTRACTALLOCATIONDATE || "",
          contractNo: item.CONTRACTNUMBER || "",
          dispositionDate: item.TRANSDAT || "",
          smaType: "",
        }));
        setTableData(formattedData);
        showSuccess(`Found ${formattedData.length} records`);
      } else {
        setTableData([]);
        showError("No data found");
      }
    } catch (err) {
      console.error("API error:", err);
      showError(err.message || "Something went wrong");
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Account Allocation Report
          </h1>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Start Date<span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  {...register("startDate", {
                    required: "Start Date is required",
                  })}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    errors.startDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.startDate && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.startDate.message}
                  </p>
                )}
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  End Date<span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  {...register("endDate", {
                    required: "End Date is required",
                  })}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    errors.endDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.endDate && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.endDate.message}
                  </p>
                )}
              </div>

              {/* User Id (optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  User Id
                </label>
                <input
                  type="text"
                  {...register("userId")}
                  placeholder="Enter User Id (optional)"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* SMA Type Dropdown (optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  SMA Type
                </label>
                <select
                  {...register("smaType")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select SMA Type (optional)</option>
                  <option value="SMA1">SMA1</option>
                  <option value="SMA2">SMA2</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-7 flex justify-center gap-5">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? "Searching..." : "Search"}
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

        {/* Table Section */}
        {tableData.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <TailwindGridTable
              title="Account Allocation Report"
              headers={tableHeader}
              rows={tableData}
              columnMapping={tableKeyMapping}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FrmAccountAllocationReport;
