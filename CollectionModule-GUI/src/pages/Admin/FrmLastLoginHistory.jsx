import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AlertCircle, Search } from "lucide-react";
import apiClient from "../../services/apiService";
import { DataTable } from "../../components/tables/DataTable";

const FrmLastLoginHistory = () => {
  // ✅ FORM
  const {
    register,
    formState: { errors },
  } = useForm();

  // ✅ STATE
  const [searchUserId, setSearchUserId] = useState("");
  const [tableData, setTableData] = useState([]);

  // ✅ TABLE HEADER
  const [tableHeader] = useState([
    { key: "userid", label: "User ID" },
    { key: "ipaddress", label: "IP Address" },
    { key: "logdate", label: "Login Date" },
  ]);

  // ✅ SEARCH FUNCTION

  const handleSearch = async () => {
    if (!searchUserId) {
      alert("Enter User ID");
      return;
    }

    try {
      const response = await apiClient.post(`/login-history`, {
        userid: searchUserId,
      });

      // ✅ FIXED HERE
      if (response.data && Array.isArray(response.data.data)) {
        const formattedData = response.data.data.map((item) => ({
          userid: item.USERID,
          ipaddress: item.IP_ADDRESS,
          logdate: item.LOG_DATE,
        }));

        setTableData(formattedData);
      } else {
        setTableData([]);
      }
    } catch (error) {
      console.error("Error fetching login history:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Web Users Login History
          </h1>
        </div>

        {/* SEARCH BOX */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                User Id<span className="text-danger-600">*</span>
              </label>

              <div className="flex flex-col md:flex-row gap-5">
                {/* INPUT */}
                <div>
                  <input
                    type="text"
                    {...register("userId", {
                      required: "User ID is required",
                    })}
                    placeholder="Enter User ID"
                    value={searchUserId}
                    onChange={(e) => setSearchUserId(e.target.value)}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, "");
                    }}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                      errors.userId ? "border-danger-500" : "border-gray-300"
                    }`}
                  />

                  {errors.userId && (
                    <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.userId.message}
                    </p>
                  )}
                </div>

                {/* BUTTON */}
                <div>
                  <button
                    type="button"
                    className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center justify-center"
                    onClick={handleSearch}
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {tableData.length > 0 ? (
            <DataTable columns={tableHeader} data={tableData} />
          ) : (
            <p className="text-gray-500 text-center">No records found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FrmLastLoginHistory;
