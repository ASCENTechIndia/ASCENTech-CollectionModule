import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { DataTableGrouped } from "../../components/DataTableGrouped";
import apiClient from "../../services/apiClient";
import { useNotification } from "../../context/useNotification";
import { useLoader } from "../../context/LoaderContext";

//  Reusable percent renderer
const PctCell = ({ v, highIsGood = true }) => {
  const num = parseFloat(v) || 0;
  let color = "#6c757d"; // neutral gray default
  if (highIsGood)
    color = num >= 70 ? "#198754" : num >= 40 ? "#fd7e14" : "#dc3545";
  else color = num <= 30 ? "#198754" : num <= 60 ? "#fd7e14" : "#dc3545";
  return (
    <span style={{ fontWeight: 600, color, fontSize: "0.78rem" }}>{num}%</span>
  );
};

// Column groups
const columnGroups = [
  {
    label: "In Count",
    headerClass: "text-center",
    columns: [
      {
        key: "zone",
        label: "Zone",
        minWidth: "160px",
        render: (v) => {
          const value = String(v || "").trim();
          const isTotal = value.toLowerCase() === "total";
          return (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isTotal ? "#fff7ed" : "#eff6ff",
                  border: `1px solid ${isTotal ? "#fed7aa" : "#bfdbfe"}`,
                  flexShrink: 0,
                }}
              >
                <i
                  className={`bi ${isTotal ? "bi-calculator" : "bi-geo-alt"}`}
                  style={{
                    fontSize: "11px",
                    color: isTotal ? "#ea580c" : "#2563eb",
                  }}
                />
              </span>
              <span
                style={{
                  fontWeight: isTotal ? 700 : 500,
                  color: isTotal ? "#111827" : "#1e293b",
                  fontSize: "0.80rem",
                }}
              >
                {isTotal ? "TOTAL" : value}
              </span>
            </div>
          );
        },
      },
      {
        key: "nonVisits",
        label: "Not-Visits",
        minWidth: "130px",
        cellClass: "text-center",
        render: (v) => (
          <span
            style={{ fontWeight: 500, color: "#1e293b", fontSize: "0.78rem" }}
          >
            {Number(v).toLocaleString()}
          </span>
        ),
      },
      {
        key: "nonVisitsPercent",
        label: "Not-Visits %",
        minWidth: "140px",
        cellClass: "text-center",
        render: (v) => <PctCell v={v} highIsGood={false} />,
      },
      {
        key: "paidCount",
        label: "Paid",
        minWidth: "90px",
        cellClass: "text-center",
        render: (v) => (
          <span className="badge bg-success-subtle text-success">
            {Number(v).toLocaleString()}
          </span>
        ),
      },
      {
        key: "paidPercent",
        label: "Paid %",
        minWidth: "100px",
        cellClass: "text-center",
        render: (v) => <PctCell v={v} highIsGood={true} />,
      },
      {
        key: "fullyPaidCount",
        label: "Fully Paid",
        minWidth: "130px",
        cellClass: "text-center",
        render: (v) => (
          <span
            style={{ color: "#0f5132", fontWeight: 500, fontSize: "0.78rem" }}
          >
            {Number(v).toLocaleString()}
          </span>
        ),
      },
      {
        key: "fullyPaidPercent",
        label: "Fully Paid %",
        minWidth: "140px",
        cellClass: "text-center",
        render: (v) => <PctCell v={v} highIsGood={true} />,
      },
      {
        key: "partialPaidCount",
        label: "Partial Paid",
        minWidth: "140px",
        cellClass: "text-center",
        render: (v) => (
          <span className="badge bg-warning-subtle text-warning">
            {Number(v).toLocaleString()}
          </span>
        ),
      },
      {
        key: "partialPaidPercent",
        label: "Partial Paid %",
        minWidth: "150px",
        cellClass: "text-center",
        render: (v) => <PctCell v={v} highIsGood={false} />,
      },
      {
        key: "unpaidCount",
        label: "Unpaid",
        minWidth: "110px",
        cellClass: "text-center",
        render: (v) => (
          <span className="badge bg-danger-subtle text-danger">
            {Number(v).toLocaleString()}
          </span>
        ),
      },
      {
        key: "unpaidPercent",
        label: "Unpaid %",
        minWidth: "120px",
        cellClass: "text-center",
        render: (v) => <PctCell v={v} highIsGood={false} />,
      },
      {
        key: "npaCount",
        label: "NPA",
        minWidth: "90px",
        cellClass: "text-center",
        render: (v) => (
          <span className="badge bg-dark-subtle text-dark">
            {Number(v).toLocaleString()}
          </span>
        ),
      },
      {
        key: "npaPercent",
        label: "NPA %",
        minWidth: "100px",
        cellClass: "text-center",
        render: (v) => <PctCell v={v} highIsGood={false} />,
      },
    ],
  },

  {
    label: "In Value",
    headerClass: "text-center",
    columns: [
      {
        key: "valueAllocation",
        label: "Allocation",
        minWidth: "110px",
        cellClass: "text-center",
        render: (v) => (
          <span
            style={{ fontWeight: 500, color: "#1e293b", fontSize: "0.78rem" }}
          >
            ₹ {Number(v).toLocaleString()}
          </span>
        ),
      },
      {
        key: "valueNonVisitPercent",
        label: "Not-Visit %",
        minWidth: "130px",
        cellClass: "text-center",
        render: (v) => <PctCell v={v} highIsGood={false} />,
      },
      {
        key: "paidAmount",
        label: "Paid Amt",
        minWidth: "120px",
        cellClass: "text-center",
        render: (v) => (
          <span className="badge bg-success-subtle text-success">
            ₹ {Number(v).toLocaleString()}
          </span>
        ),
      },
      {
        key: "valuePaidPercent",
        label: "Paid %",
        minWidth: "100px",
        cellClass: "text-center",
        render: (v) => <PctCell v={v} highIsGood={true} />,
      },
      {
        key: "fullyPaidAmount",
        label: "Fully Paid Amt",
        cellClass: "text-center",
        minWidth: "150px",
        render: (v) => (
          <span
            style={{ color: "#0f5132", fontWeight: 500, fontSize: "0.78rem" }}
          >
            ₹ {Number(v).toLocaleString()}
          </span>
        ),
      },
      {
        key: "valueFullyPaidPercent",
        label: "Fully Paid %",
        minWidth: "140px",
        cellClass: "text-center",
        render: (v) => <PctCell v={v} highIsGood={true} />,
      },
      {
        key: "partialPaidAmount",
        label: "Partial Amt",
        minWidth: "140px",
        cellClass: "text-center",
        render: (v) => (
          <span className="badge bg-warning-subtle text-warning">
            ₹ {Number(v).toLocaleString()}
          </span>
        ),
      },
      {
        key: "valuePartialPaidPercent",
        label: "Partial Paid %",
        cellClass: "text-center",
        minWidth: "150px",
        render: (v) => <PctCell v={v} highIsGood={false} />,
      },
      {
        key: "unpaidAmount",
        label: "Unpaid Amt",
        minWidth: "130px",
        cellClass: "text-center",
        render: (v) => (
          <span className="badge bg-danger-subtle text-danger">
            ₹ {Number(v).toLocaleString()}
          </span>
        ),
      },
      {
        key: "valueUnpaidPercent",
        label: "Unpaid %",
        minWidth: "120px",
        cellClass: "text-center",
        render: (v) => <PctCell v={v} highIsGood={false} />,
      },
      {
        key: "npaAmount",
        label: "NPA Amt",
        minWidth: "110px",
        cellClass: "text-center",
        render: (v) => (
          <span className="badge bg-dark-subtle text-dark">
            ₹ {Number(v).toLocaleString()}
          </span>
        ),
      },
      {
        key: "valueNpaPercent",
        label: "NPA %",
        minWidth: "100px",
        cellClass: "text-center",
        render: (v) => <PctCell v={v} highIsGood={false} />,
      },
    ],
  },
];

function FrmNonVisitDoneSummaryReport() {
  const { setLoader } = useLoader();

  const { showError, showSuccess } = useNotification();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        setLoader(true);
        const response = await apiClient.get("/reports/nonVisitDoneSummary");
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

  return (
    <div className="main-content page-non-visit-done-summary-report">
      <div className="page-header">
        <h1 className="page-title">Non-Visit Done Summary Report</h1>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2" />
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Loading report...</p>
        </div>
      ) : (
        <DataTableGrouped
          columnGroups={columnGroups}
          data={rows}
          csvFilename="non-visit-done-summary.csv"
          defaultPerPage={10}
          fontSize="0.80rem"
          compactCells={false}
        />
      )}
    </div>
  );
}

export default FrmNonVisitDoneSummaryReport;
