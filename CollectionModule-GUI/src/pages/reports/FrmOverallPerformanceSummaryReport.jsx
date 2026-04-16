import React, { useState, useEffect } from "react";
import apiClient from "../../services/apiService";
import TailwindGridTable from "../../components/reports/TailwindGridTable";
import { useNotification } from "../../context/NotificationContext";

const FrmOverallPerformanceSummaryReport = () => {
  const { showError } = useNotification();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const headers = [
    {
      displayName: "In Count",
      children: [
        { displayName: "Zone", field: "zone" },
        { displayName: "Allocation", field: "allocation" },
        { displayName: "Weightage", field: "weightage" },
        { displayName: "Paid", field: "paid" },
        { displayName: "Paid (%)", field: "paidPercent" },
        { displayName: "Fully Paid", field: "fullyPaid" },
        { displayName: "Fully Paid (%)", field: "fullyPaidPercent" },
        { displayName: "Partial Paid", field: "partialPaid" },
        { displayName: "Partial Paid (%)", field: "partialPaidPercent" },
        { displayName: "Unpaid", field: "unpaid" },
        { displayName: "Unpaid (%)", field: "unpaidPercent" },
        { displayName: "NPA", field: "npa" },
        { displayName: "NPA (%)", field: "npaPercent" },
      ],
    },
    {
      displayName: "In Value",
      children: [
        { displayName: "Allocation", field: "valueAllocation" },
        { displayName: "Weightage", field: "valueWeightage" },
        { displayName: "Paid", field: "valuePaid" },
        { displayName: "Paid(%)", field: "valuePaidPercent" },
        { displayName: "Fully Paid", field: "valueFullyPaid" },
        { displayName: "Full Paid(%)", field: "valueFullyPaidPercent" },
        { displayName: "Partial Paid", field: "valuePartialPaid" },
        { displayName: "Partial Paid (%)", field: "valuePartialPaidPercent" },
        { displayName: "Unpaid", field: "valueUnpaid" },
        { displayName: "Unpaid(%)", field: "valueUnpaidPercent" },
        { displayName: "NPA", field: "valueNpa" },
        { displayName: "NPA(%)", field: "valueNpaPercent" },
      ],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(
          "/reports/overallPerformanceSummary",
        );
        const { success, data, message } = response.data;

        if (success && data && data.length > 0) {
          // Transform each item to match the field names defined in headers
          const transformed = data.map((item) => ({
            // In Count group
            zone: item.ZONE_NAME || "",
            allocation: item.ALLOCATED_CASES_COUNT ?? 0,
            weightage: item.PERCENTAGE ?? 0,
            paid: item.PAID_COUNT ?? 0,
            paidPercent: item.PAID_PERCENT ?? 0,
            fullyPaid: item.FULLY_PAID_COUNT ?? 0,
            fullyPaidPercent: item.FULLY_PAID_PERCENT ?? 0,
            partialPaid: item.PARTIAL_PAID_COUNT ?? 0,
            partialPaidPercent: item.PARTIAL_PAID_PERCENT ?? 0,
            unpaid: item.UNPAID_COUNT ?? 0,
            unpaidPercent: item.UNPAID_PERCENT ?? 0,
            npa: item.NPA_COUNT ?? 0,
            npaPercent: item.NPA_PERCENT ?? 0,
            // In Value group
            valueAllocation: item.FINAL_RECORD_COUNT ?? 0,
            valueWeightage: item.PERCENTAGE_OVERALL ?? 0,
            valuePaid: item.FINAL_COUNT_ENGNNO_12 ?? 0,
            valuePaidPercent: item.PERCENTAGE_ENGNNO_12 ?? 0,
            valueFullyPaid: item.FINAL_COUNT_ENGNNO_1 ?? 0,
            valueFullyPaidPercent: item.PERCENTAGE_ENGNNO_1 ?? 0,
            valuePartialPaid: item.FINAL_COUNT_ENGNNO_2 ?? 0,
            valuePartialPaidPercent: item.PERCENTAGE_ENGNNO_2 ?? 0,
            valueUnpaid: item.FINAL_COUNT_ENGNNO_NULL ?? 0,
            valueUnpaidPercent: item.PERCENTAGE_ENGNNO_NULL ?? 0,
            valueNpa: item.FINAL_COUNT_ENGNNO_3 ?? 0,
            valueNpaPercent: item.PERCENTAGE_ENGNNO_3 ?? 0,
          }));
          setTableData(transformed);
        } else {
          setTableData([]);
          showError("No record found");
        }
      } catch (err) {
        console.error("API error:", err);
        showError(err.message || "Failed to load report");
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
            Overall Performance Summary Report
          </h1>
        </div>

        {tableData.length > 0 ? (
          <TailwindGridTable
            title="Performance Summary"
            headers={headers}
            rows={tableData}
            // No columnMapping needed because headers already have 'field' properties
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

export default FrmOverallPerformanceSummaryReport;
