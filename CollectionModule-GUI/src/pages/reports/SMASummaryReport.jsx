import React, { useState, useEffect } from "react";
import apiClient from "../../services/apiService";
import TailwindGridTable from "../../components/reports/TailwindGridTable";
import { useNotification } from "../../context/NotificationContext";

const SMASummaryReport = () => {
  const { showError } = useNotification();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = [
    {
      displayName: "ALLOCATION DURING THE MONTH",
      children: [
        { displayName: "PARTICULARS", field: "particular" },
        { displayName: "NO_OF_A_C_ALLOC", field: "noOfAlloc" },
        { displayName: "AMT_ALLOC", field: "amtAlloc" },
      ],
    },
    {
      displayName: "RESOLUTION DURING THE MONTH",
      children: [
        { displayName: "NO_OF_A_C_RESO", field: "noOfAcreso" },
        { displayName: "AMT_RESO", field: "amtReso" },
        { displayName: "PERCENT_RESO", field: "percentReso" },
      ],
    },
    {
      displayName: "PARTIAL PAID DURING THE MONTH",
      children: [
        { displayName: "NO_OF_A_C_PP", field: "noAcpp" },
        { displayName: "AMT_PP", field: "amtPp" },
        { displayName: "PP_PERCENT", field: "ppPercent" },
      ],
    },
    {
      displayName: "MOVED TO SMA2",
      children: [
        { displayName: "NO_OF_A_C_SMA2", field: "noSma2" },
        { displayName: "AMT_SMA2", field: "amtSma2" },
      ],
    },
    {
      displayName: "MOVED TO SMA1",
      children: [
        { displayName: "NO_OF_A_C_SMA1", field: "noSma1" },
        { displayName: "AMT_SMA1", field: "amtSma1" },
      ],
    },
    {
      displayName: "MOVED TO SMA0",
      children: [
        { displayName: "NO_OF_A_C_SMA0", field: "noSma0" },
        { displayName: "AMT_SMA0", field: "amtSma0" },
      ],
    },
    {
      displayName: "MOVED TO STANDARD ASSET",
      children: [
        { displayName: "NO_OF_A_C_STDASSET", field: "noStdasset" },
        { displayName: "AMT_STDASSET", field: "amtStdasset" },
      ],
    },
    {
      displayName: "SLIPPED TO NPA",
      children: [
        { displayName: "NO_OF_A_C_NPA", field: "noOfNpa" },
        { displayName: "AMT_NPA", field: "amtNpa" },
      ],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/reports/smaSummary");
        console.log("respo ::", response);
        const { success, data, message } = response.data;

        if (success && data && data.length > 0) {
          // Transform each item to match the field names defined in headers
          const transformed = data.map((item) => ({
            // ALLOCATION DURING THE MONTH
            particular: item.SMA_STATUS || "",
            noOfAlloc: item.ALLOCATED_CASES ?? 0,
            amtAlloc: item.TOTAL_COLLECTABLE_AMT ?? 0,
            // RESOLUTION DURING THE MONTH
            noOfAcreso: item.CF_COUNT ?? 0,
            amtReso: item.CF_COLLECTED_AMT ?? 0,
            percentReso: item.CF_COLLECTED_PERC ?? 0,
            // PARTIAL PAID DURING THE MONTH
            noAcpp: item.CP_COUNT ?? 0,
            amtPp: item.CP_COLLECTED_AMT ?? 0,
            ppPercent: item.CP_COLLECTED_PERC ?? 0,
            // MOVED TO SMA2
            noSma2: item.MOVED_TO_SMA2 ?? 0,
            amtSma2: item.COLLECTED_TO_SMA2 ?? 0,
            // MOVED TO SMA1
            noSma1: item.MOVED_TO_SMA1 ?? 0,
            amtSma1: item.COLLECTED_TO_SMA1 ?? 0,
            // MOVED TO SMA0
            noSma0: item.MOVED_TO_SMA0 ?? 0,
            amtSma0: item.COLLECTED_TO_SMA0 ?? 0,
            // MOVED TO STANDARD ASSET
            noStdasset: item.MOVED_TO_STANDARD_ASSET ?? 0,
            amtStdasset: item.COLLECTED_TO_STANDARD_ASSET ?? 0,
            // SLIPPED TO NPA
            noOfNpa: item.MOVED_TO_NPA_UNPAID ?? 0,
            amtNpa: item.COLLECTED_TO_NPA_UNPAID ?? 0,
          }));
          setTableData(transformed);
        } else {
          setTableData([]);
          showError("No record found");
        }
      } catch (err) {
        console.error("API error:", err);
        showError(err.message || "Failed to load SMA summary report");
        setTableData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      <div className="max-w-full mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            SMA Summary Report
          </h1>
        </div>

        {tableData.length > 0 ? (
          <TailwindGridTable
            title="SMA Summary"
            headers={headers}
            rows={tableData}
          />
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
            No records found
          </div>
        )}
      </div>
    </div>
  );
};

export default SMASummaryReport;
