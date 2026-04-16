import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import apiClient from "../../services/apiService";
import TailwindGridTable from "../../components/reports/TailwindGridTable";

const FrmUnallocatedCasesReport = () => {
  const { user } = useAuth();
  const branchName = user?.branchName;
  const brid = user?.brid;
  const { showError, showSuccess } = useNotification();

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Table headers with field mappings (assumed based on column names)
  const headers = [
    { displayName: "Account Number", field: "accountNumber" },
    { displayName: "Pincode", field: "pincode" },
    { displayName: "Reason", field: "reason" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!brid || !branchName) {
        showError("Branch ID or Branch Name missing");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await apiClient.get("/reports/unallocatedcases", {
          params: { brid, branchName },
        });

        const { success, data, message } = response.data;
        if (success && data && data.length > 0) {
          const mappedData = data.map((item) => ({
            accountNumber: item.VAR_BANKDATA_CONTRACTNUM || "",
            pincode: item.NUM_BANKDATA_PINCODE || "",
            reason: item.REASON || "",
          }));
          setTableData(mappedData);
          showSuccess(`Found ${mappedData.length} records`);
        } else {
          setTableData([]);
          if (message) showError("No record found");
        }
      } catch (err) {
        console.error(err);
        showError(err.message || "Failed to fetch unallocated cases");
        setTableData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [brid, branchName]);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading report...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Unallocated Cases Report
          </h1>
        </div>

        {tableData.length > 0 ? (
          <TailwindGridTable
            title="Unallocated Cases"
            headers={headers}
            rows={tableData}
          />
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
            No unallocated cases found
          </div>
        )}
      </div>
    </div>
  );
};

export default FrmUnallocatedCasesReport;
