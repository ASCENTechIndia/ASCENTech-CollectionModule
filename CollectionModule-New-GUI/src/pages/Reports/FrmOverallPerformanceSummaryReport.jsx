import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ReusableGroupedDataGrid } from "../../components/ReusableGroupedDataGrid";
import apiClient from "../../services/apiClient";
import { useNotification } from "../../context/useNotification";
import { DataTableGrouped } from "../../components/DataTableGrouped";
import { useLoader } from "../../context/LoaderContext";

function FrmOverallPerformanceSummaryReport() {
  const { setLoader } = useLoader();

  const { showError, showSuccess } = useNotification();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const hasFetchedRef = useRef(false);

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
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        setLoader(true);
        const response = await apiClient.get(
          "/reports/overallPerformanceSummary",
        );
        const success = response?.success;
        const data = Array.isArray(response?.data) ? response.data : [];

        if (!success || !data.length) {
          setRows([]);
          showError("No record found");
          setError("No record found");
          return;
        }

        const transformed = data.map((item) => ({
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

        setRows(transformed);
        showSuccess(`Loaded ${transformed.length} records`);
      } catch (apiError) {
        setRows([]);
        showError(apiError.message || "Failed to load report");
        setError(apiError.message || "Failed to load report");
      } finally {
        setLoading(false);
        setLoader(false);
      }
    };

    void fetchData();
  }, []);

  const columnGroups = [
    {
      label: "In Count",
      headerClass: "text-center",
      columns: [
        {
          key: "zone",
          label: "Zone",
          minWidth: "180px",
          render: (v) => {
            const value = String(v || "").trim();
            const isTotal = value.toLowerCase() === "total";

            return (
              <div className="d-flex align-items-center gap-2">
                {/* Icon badge */}
                <div
                  style={{
                    width: 22,
                    height: 22,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "6px",
                    background: isTotal ? "#fff7ed" : "#eff6ff",
                    border: `1px solid ${isTotal ? "#fed7aa" : "#bfdbfe"}`,
                  }}
                >
                  <i
                    className={`bi ${isTotal ? "bi-calculator" : "bi-geo-alt"}`}
                    style={{
                      fontSize: "12px",
                      color: isTotal ? "#ea580c" : "#2563eb",
                    }}
                  />
                </div>

                {/* Text */}
                <span
                  style={{
                    fontWeight: isTotal ? 700 : 500,
                    color: isTotal ? "#111827" : "#1e293b",
                    letterSpacing: isTotal ? "0.3px" : "normal",
                  }}
                >
                  {isTotal ? "TOTAL" : value}
                </span>
              </div>
            );
          },
        },
        {
          key: "allocation",
          label: "Allocation",
          render: (v) => Number(v).toLocaleString(),
          cellClass: "text-center",
        },
        {
          key: "weightage",
          label: "Weightage",
          render: (v) => `${v}%`,
          cellClass: "text-center text-muted",
        },
        {
          key: "paid",
          label: "Paid",
          render: (v) => (
            <span className="badge bg-success-subtle text-success">
              {Number(v).toLocaleString()}
            </span>
          ),
          cellClass: "text-center",
        },
        {
          key: "paidPercent",
          label: "Paid (%)",
          minWidth: "140px",
          render: (v) => (
            <span
              className={`fw-semibold ${v > 70 ? "text-success" : "text-warning"}`}
            >
              {v}%
            </span>
          ),
          cellClass: "text-center",
        },
        {
          key: "fullyPaid",
          label: "Fully Paid",
          minWidth: "140px",
          render: (v) => Number(v).toLocaleString(),
          cellClass: "text-center",
        },
        {
          key: "fullyPaidPercent",
          label: "Fully Paid (%)",
          minWidth: "150px",
          render: (v) => (
            <span
              className={`fw-semibold ${v > 50 ? "text-success" : "text-danger"}`}
            >
              {v}%
            </span>
          ),
          cellClass: "text-center",
        },
        {
          key: "partialPaid",
          label: "Partial Paid",
          minWidth: "150px",
          render: (v) => Number(v).toLocaleString(),
          cellClass: "text-center",
        },
        {
          key: "partialPaidPercent",
          label: "Partial Paid (%)",
          minWidth: "170px",
          render: (v) => <span className="text-warning fw-semibold">{v}%</span>,
          cellClass: "text-center",
        },
        {
          key: "unpaid",
          label: "Unpaid",
          minWidth: "150px",
          render: (v) => (
            <span className="badge bg-danger-subtle text-danger">
              {Number(v).toLocaleString()}
            </span>
          ),
          cellClass: "text-center",
        },
        {
          key: "unpaidPercent",
          label: "Unpaid (%)",
          minWidth: "150px",
          render: (v) => <span className="text-danger fw-semibold">{v}%</span>,
          cellClass: "text-center",
        },
        {
          key: "npa",
          label: "NPA",
          minWidth: "150px",
          render: (v) => (
            <span className="badge bg-dark-subtle text-dark">
              {Number(v).toLocaleString()}
            </span>
          ),
          cellClass: "text-center",
        },
        {
          key: "npaPercent",
          label: "NPA (%)",
          minWidth: "150px",
          render: (v) => <span className="text-dark fw-semibold">{v}%</span>,
          cellClass: "text-center",
        },
      ],
    },

    {
      label: "In Value",
      headerClass: "text-center bg-light fw-semibold",
      columns: [
        {
          key: "valueAllocation",
          label: "Allocation",
          render: (v) => `₹ ${Number(v).toLocaleString()}`,
          cellClass: "text-center",
        },
        {
          key: "valueWeightage",
          label: "Weightage",
          render: (v) => `${v}%`,
          cellClass: "text-center text-muted",
        },
        {
          key: "valuePaid",
          label: "Paid",
          render: (v) => (
            <span className="badge bg-success-subtle text-success">
              ₹ {Number(v).toLocaleString()}
            </span>
          ),
          cellClass: "text-center",
        },
        {
          key: "valuePaidPercent",
          label: "Paid (%)",
          minWidth: "150px",
          render: (v) => (
            <span
              className={`fw-semibold ${v > 70 ? "text-success" : "text-warning"}`}
            >
              {v}%
            </span>
          ),
          cellClass: "text-center",
        },
        {
          key: "valueFullyPaid",
          label: "Fully Paid",
          minWidth: "150px",
          render: (v) => `₹ ${Number(v).toLocaleString()}`,
          cellClass: "text-center",
        },
        {
          key: "valueFullyPaidPercent",
          label: "Full Paid (%)",
          minWidth: "150px",
          render: (v) => <span className="text-success fw-semibold">{v}%</span>,
          cellClass: "text-center",
        },
        {
          key: "valuePartialPaid",
          label: "Partial Paid",
          minWidth: "150px",
          render: (v) => `₹ ${Number(v).toLocaleString()}`,
          cellClass: "text-center",
        },
        {
          key: "valuePartialPaidPercent",
          label: "Partial Paid (%)",
          minWidth: "170px",
          render: (v) => <span className="text-warning fw-semibold">{v}%</span>,
          cellClass: "text-center",
        },
        {
          key: "valueUnpaid",
          label: "Unpaid",
          minWidth: "150px",
          render: (v) => (
            <span className="badge bg-danger-subtle text-danger">
              ₹ {Number(v).toLocaleString()}
            </span>
          ),
          cellClass: "text-center",
        },
        {
          key: "valueUnpaidPercent",
          label: "Unpaid (%)",
          minWidth: "150px",
          render: (v) => <span className="text-danger fw-semibold">{v}%</span>,
          cellClass: "text-center",
        },
        {
          key: "valueNpa",
          label: "NPA",
          render: (v) => `₹ ${Number(v).toLocaleString()}`,
          cellClass: "text-center",
        },
        {
          key: "valueNpaPercent",
          label: "NPA (%)",
          minWidth: "150px",
          render: (v) => <span className="text-dark fw-semibold">{v}%</span>,
          cellClass: "text-center",
        },
      ],
    },
  ];

  return (
    <div className="main-content page-overall-performance-summary-report">
      <div className="page-header">
        <h1 className="page-title">Overall Performance Summary Report</h1>
      </div>

      <DataTableGrouped
        columnGroups={columnGroups}
        data={rows}
        csvFilename="agent-performance.csv"
        defaultPerPage={5}
        fontSize="0.80rem"
        compactCells={false}
      />
    </div>
  );
}

export default FrmOverallPerformanceSummaryReport;
