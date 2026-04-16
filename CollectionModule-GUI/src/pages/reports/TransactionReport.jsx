import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const TransactionReport = () => {
  const { user } = useAuth();
  const brid = user?.brid;
  const brCategory = user?.brCategory;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form values:", data);
    // API call will be added later
  };

  // Static options for dropdowns – replace with dynamic data later
  const zoneOptions = ["Zone 1", "Zone 2", "Zone 3"];
  const regionOptions = ["Region A", "Region B", "Region C"];
  const branchOptions = ["Branch X", "Branch Y", "Branch Z"];
  const collectionAssociateOptions = ["CA001", "CA002", "CA003"];
  const transactionTypeOptions = ["Type 1", "Type 2", "Type 3"];
  const smaTypeOptions = ["SMA1", "SMA2"];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Transaction Report
          </h1>
        </div>

        {/* Form Card */}
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
                <select
                  {...register("zone")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Zone</option>
                  {zoneOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Region Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Region
                </label>
                <select
                  {...register("region")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Region</option>
                  {regionOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Branch Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Branch
                </label>
                <select
                  {...register("branch")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Branch</option>
                  {branchOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* User Id (text) */}
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

              {/* Collection Associated Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Collection Associated
                </label>
                <select
                  {...register("collectionAssociated")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Collection Associate</option>
                  {collectionAssociateOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Transaction Type Dropdown */}
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
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* SMA Type Dropdown */}
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
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-7 flex justify-center gap-5">
              <button
                type="submit"
                className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Search
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

        {/* Table will be added here later */}
      </div>
    </div>
  );
};

export default TransactionReport;
