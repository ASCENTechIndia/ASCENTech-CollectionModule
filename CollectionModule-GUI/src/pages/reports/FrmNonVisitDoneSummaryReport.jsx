import React, { useState, useEffect } from "react";
import apiClient from "../../services/apiService";
import TailwindGridTable from "../../components/reports/TailwindGridTable";
import { useNotification } from "../../context/NotificationContext";

const FrmNonVisitDoneSummaryReport = () => {
  const { showError } = useNotification();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = [
    {
      displayName: "In Count",
      children: [
        { displayName: "Zone", field: "zone" },
        { displayName: "Not-Visits", field: "nonVisits" },
        { displayName: "Not-Visits %", field: "nonVisitsPercent" },
        { displayName: "Paid Count", field: "paidCount" },
        { displayName: "Paid %", field: "paidPercent" },
        { displayName: "Fully Paid", field: "fullyPaidCount" },
        { displayName: "Fully Paid %", field: "fullyPaidPercent" },
        { displayName: "Partial Paid Count", field: "partialPaidCount" },
        { displayName: "Partial Paid %", field: "partialPaidPercent" },
        { displayName: "Unpaid Count", field: "unpaidCount" },
        { displayName: "Unpaid %", field: "unpaidPercent" },
        { displayName: "NPA Count", field: "npaCount" },
        { displayName: "NPA %", field: "npaPercent" },
      ],
    },
    {
      displayName: "In Value",
      children: [
        { displayName: "Allocation", field: "valueAllocation" },
        { displayName: "Not-Visit Done %", field: "valueNonVisitPercent" },
        { displayName: "Paid Amount", field: "paidAmount" },
        { displayName: "Paid %", field: "valuePaidPercent" },
        { displayName: "Fully Paid Amount", field: "fullyPaidAmount" },
        { displayName: "Fully Paid %", field: "valueFullyPaidPercent" },
        { displayName: "Partial Paid Amount", field: "partialPaidAmount" },
        { displayName: "Partial Paid %", field: "valuePartialPaidPercent" },
        { displayName: "Unpaid Amount", field: "unpaidAmount" },
        { displayName: "Unpaid %", field: "valueUnpaidPercent" },
        { displayName: "NPA Amount", field: "npaAmount" },
        { displayName: "NPA %", field: "valueNpaPercent" },
      ],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/reports/nonVisitDoneSummary");
        const { success, data, message } = response.data;

        if (success && data && data.length > 0) {
          const transformed = data.map((item) => ({
            // In Count group
            zone: item.ZONE_NAME || "",
            nonVisits: item.TOTAL_NONVISITS ?? 0,
            nonVisitsPercent: item.TOTAL_NONVISITS_PERS ?? 0,
            paidCount: item.PAID_CNT ?? 0,
            paidPercent: item.PAID_PERS ?? 0,
            fullyPaidCount: item.FULLY_PAID_CNT ?? 0,
            fullyPaidPercent: item.FULLY_PAID_PERS ?? 0,
            partialPaidCount: item.PARTIAL_PAID_CNT ?? 0,
            partialPaidPercent: item.PARTIAL_PAID_PERS ?? 0,
            unpaidCount: item.UNPAID_CNT ?? 0,
            unpaidPercent: item.UNPAID_PERS ?? 0,
            npaCount: item.NPA_CNT ?? 0,
            npaPercent: item.NPA_PERS ?? 0,
            // In Value group
            valueAllocation: item.COLLECTABLE_AMT ?? 0,
            valueNonVisitPercent: item.COLLECTABLE_PERCENT ?? 0,
            paidAmount: item.PAIDAMT ?? 0,
            valuePaidPercent: item.PAID_PERCENT ?? 0,
            fullyPaidAmount: item.FULLYPAIDAMT ?? 0,
            valueFullyPaidPercent: item.FULLYPAID_PERCENT ?? 0,
            partialPaidAmount: item.PARTIALPAIDAMT ?? 0,
            valuePartialPaidPercent: item.PARTIALPAID_PERCENT ?? 0,
            unpaidAmount: item.UNPAID_AMT ?? 0,
            valueUnpaidPercent: item.UNPAID_PERCENT ?? 0,
            npaAmount: item.NPA_AMT ?? 0,
            valueNpaPercent: item.NPA_PERCENT ?? 0,
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
  }, [showError]);

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
            Non-Visit Done Summary Report
          </h1>
        </div>

        {tableData.length > 0 ? (
          <TailwindGridTable
            title="Non-Visit Done Summary"
            headers={headers}
            rows={tableData}
            // No columnMapping needed because headers include 'field'
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

export default FrmNonVisitDoneSummaryReport;
