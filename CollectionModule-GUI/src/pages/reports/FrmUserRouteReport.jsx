import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import apiClient from "../../services/apiService";
import { useNotification } from "../../context/NotificationContext";
import TailwindGridTable from "../../components/reports/TailwindGridTable";
import RouteMap from "../../components/ui/RouteMap";

const FrmUserRouteReport = () => {
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotification();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fosId: "",
      date: "",
      withDistance: false,
    },
  });

  const [tableData, setTableData] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const tableHeaders = [
    { displayName: "Sr No" },
    { displayName: "Collection Associate" },
    { displayName: "Account Number" },
    { displayName: "Transaction Date" },
    { displayName: "Go Location" },
    { displayName: "Disposition Type" },
    { displayName: "Visit Remark" },
    { displayName: "Distance" },
  ];

  const tableKeyMapping = {
    "Sr No": "Sr No",
    "Collection Associate": "Collection Associate",
    "Account Number": "Account Number",
    "Transaction Date": "Transaction Date",
    "Go Location": "GO_Location",
    "Disposition Type": "Disposition Type",
    "Visit Remark": "Visit Remark",
    Distance: "Distance",
  };

  const onSubmit = async (data) => {
    const { fosId, date, withDistance } = data;
    if (!fosId || !date) {
      showError("Both FOS ID and Date are required");
      return;
    }

    const formattedDate = formatDate(date);
    setLoading(true);
    setTableData([]);
    setCoordinates([]);

    try {
      const response = await apiClient.get("/reports/user-route", {
        params: {
          fosId,
          date: formattedDate,
          withDistance: withDistance || false,
          userof: 0,
        },
      });

      const { success, data: apiData } = response.data;

      if (success && apiData?.rows?.length > 0) {
        setTableData(apiData.rows);
        setCoordinates(apiData.coordinates || []);
        showSuccess(`Found ${apiData.rows.length} records`);
      } else {
        setTableData([]);
        setCoordinates([]);
        showError("No route data found");
      }
    } catch (err) {
      console.error(err);
      showError(
        err?.response?.data?.message || err.message || "Failed to fetch route",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            User Route Report
          </h1>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  FOS ID<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  {...register("fosId", { required: "FOS ID is required" })}
                  placeholder="Enter FOS ID"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    errors.fosId ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.fosId && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.fosId.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Select Date<span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  {...register("date", { required: "Date is required" })}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    errors.date ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.date && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.date.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                id="withDistance"
                {...register("withDistance")}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label
                htmlFor="withDistance"
                className="text-sm font-medium text-gray-900"
              >
                Along with distance
              </label>
            </div>

            <div className="mt-7 flex justify-center gap-5">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 flex items-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Loading..." : "Show Route"}
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

        {coordinates.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Route Map
            </h3>
            <RouteMap coordinates={coordinates} />
          </div>
        )}

        {tableData.length > 0 && (
          <div className="mt-6">
            <TailwindGridTable
              title="User Route Report"
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

export default FrmUserRouteReport;
