import React, { useState, useEffect } from "react";
import apiClient from "../../services/apiService";
import TailwindGridTable from "../../components/reports/TailwindGridTable";
import { useNotification } from "../../context/NotificationContext";

const FrmVisitDoneSummaryReport = () => {
  const { showError } = useNotification();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = [
    {
      displayName: "In Count",
      children: [
        { displayName: "Zone", field: "zone" },
        { displayName: "Visit Done", field: "visitDone" },
        { displayName: "Visit Done(%)", field: "visitDonePercent" },
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
        { displayName: "Visit Done(%)", field: "valueVisitDonePercent" },
        { displayName: "Paid Amount", field: "paidAmount" },
        { displayName: "Paid(%)", field: "valuePaidPercent" },
        { displayName: "Fully Paid Amount", field: "valueFullyPaidAmount" },
        { displayName: "Full Paid(%)", field: "valueFullyPaidPercent" },
        { displayName: "Partial Paid Amount", field: "valuePartialPaidAmount" },
        { displayName: "Partial Paid (%)", field: "valuePartialPaidPercent" },
        { displayName: "Unpaid Amount", field: "valueUnpaidAmount" },
        { displayName: "Unpaid(%)", field: "valueUnpaidPercent" },
        { displayName: "NPA Amount", field: "valueNpaAmount" },
        { displayName: "NPA(%)", field: "valueNpaPercent" },
      ],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/reports/visitDoneSummary");
        const { success, data } = response.data;

        if (success && data && data.length > 0) {
          const transformed = data.map((item) => ({
            // In Count group
            zone: item.VAR_COMPANYMST_BRANCHNAME || "",
            visitDone: item.TOTAL_VISITS ?? 0,
            visitDonePercent: item.TOTAL_VISITS_PERS ?? 0,
            paid: item.PAID_COUNT ?? 0,
            paidPercent: item.PAID_COUNT_PERS ?? 0,
            fullyPaid: item.FULLY_PAID_COUNT ?? 0,
            fullyPaidPercent: item.FULLY_PAID_PERS ?? 0,
            partialPaid: item.PARTIAL_PAID_COUNT ?? 0,
            partialPaidPercent: item.PARTIAL_PAID_PERS ?? 0,
            unpaid: item.NOT_PAID_COUNT ?? 0,
            unpaidPercent: item.NOT_PAID_PERS ?? 0,
            npa: item.NPA_COUNT ?? 0,
            npaPercent: item.NPA_PERS ?? 0,
            // In Value group
            valueAllocation: item.COLLECTABLE_AMT ?? 0,
            valueVisitDonePercent: item.COLLECTABLE_PERCENT ?? 0,
            paidAmount: item.PAIDAMT ?? 0,
            valuePaidPercent: item.PAID_PERCENT ?? 0,
            valueFullyPaidAmount: item.FULLYPAIDAMT ?? 0,
            valueFullyPaidPercent: item.FULLYPAID_PERCENT ?? 0,
            valuePartialPaidAmount: item.PARTIALPAIDAMT ?? 0,
            valuePartialPaidPercent: item.PARTIALPAID_PERCENT ?? 0,
            valueUnpaidAmount: item.UNPAID_AMT ?? 0,
            valueUnpaidPercent: item.UNPAID_PERCENT ?? 0,
            valueNpaAmount: item.NPA_AMT ?? 0,
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
            Visit Done Summary Report
          </h1>
        </div>

        {tableData.length > 0 ? (
          <TailwindGridTable
            title="Visit Done Summary"
            headers={headers}
            rows={tableData}
            // No columnMapping needed because headers already include 'field'
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

export default FrmVisitDoneSummaryReport;
