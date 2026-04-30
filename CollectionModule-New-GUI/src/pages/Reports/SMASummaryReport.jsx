import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { DataTableGrouped } from "../../components/DataTableGrouped";
import apiClient from "../../services/apiClient";
import { useLoader } from "../../context/LoaderContext";

// Helpers
const fmtNum = (v) =>
  Number(v || 0).toLocaleString(undefined, { maximumFractionDigits: 0 });
const fmtAmt = (v) =>
  `₹ ${Number(v || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const fmtPct = (v) => `${Number(v || 0).toFixed(2)}%`;

// Smart percent cell
const PctCell = ({ v, highIsGood = true }) => {
  const num = parseFloat(v) || 0;
  let color;
  if (highIsGood)
    color = num >= 70 ? "#198754" : num >= 40 ? "#fd7e14" : "#dc3545";
  else color = num <= 30 ? "#198754" : num <= 60 ? "#fd7e14" : "#dc3545";
  return (
    <span style={{ fontWeight: 600, color, fontSize: "0.78rem" }}>
      {fmtPct(v)}
    </span>
  );
};

// SMA badge
const smaBadge = {
  SMA0: { bg: "#fff3cd", color: "#856404", border: "#ffc107" },
  SMA1: { bg: "#fff0e6", color: "#c45000", border: "#fd7e14" },
  SMA2: { bg: "#fde8e8", color: "#b02a37", border: "#dc3545" },
};
const SMABadge = ({ v }) => {
  if (!v) return <span className="text-muted">—</span>;
  const s = smaBadge[v] || {
    bg: "#e9ecef",
    color: "#495057",
    border: "#ced4da",
  };
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 12px",
        borderRadius: "20px",
        fontSize: "0.75rem",
        fontWeight: 700,
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        letterSpacing: "0.04em",
      }}
    >
      {v}
    </span>
  );
};

// Amount cell — plain ₹
const AmtCell = ({ v }) => (
  <span style={{ fontSize: "0.78rem", color: "#1e293b", fontWeight: 500 }}>
    {fmtAmt(v)}
  </span>
);

// Amount cell — red (for NPA)
const NpaAmtCell = ({ v }) => (
  <span
    className="badge bg-danger-subtle text-danger"
    style={{ fontSize: "0.75rem" }}
  >
    {fmtAmt(v)}
  </span>
);

// Count cell — plain
const NumCell = ({ v }) => (
  <span style={{ fontSize: "0.78rem", color: "#334155" }}>{fmtNum(v)}</span>
);

// Column groups
const columnGroups = [
  {
    label: "SUMMARY",
    headerClass: "text-center",
    columns: [
      {
        key: "SMA_STATUS",
        label: "SMA Status",
        minWidth: "140px",
        cellClass: "text-center",
        render: (v) => <SMABadge v={v} />, // ← styled: colored badge
      },
      {
        key: "FROM_SMA",
        label: "Particulars",
        minWidth: "130px",
      },
    ],
  },

  {
    label: "ALLOCATION DURING THE MONTH",
    headerClass: "text-center",
    columns: [
      {
        key: "ALLOCATED_CASES",
        label: "No. of A/C",
        cellClass: "text-center",
        minWidth: "130px",
        render: (v) => <NumCell v={v} />,
      },
      {
        key: "TOTAL_COLLECTABLE_AMT",
        label: "Amount",
        cellClass: "text-center",
        minWidth: "140px",
        render: (v) => <AmtCell v={v} />, // ← ₹ styled
      },
    ],
  },

  {
    label: "CF COLLECTED DURING THE MONTH",
    headerClass: "text-center",
    columns: [
      {
        key: "CF_COUNT",
        label: "No. of A/C",
        minWidth: "130px",
        cellClass: "text-center",
        render: (v) => <NumCell v={v} />,
      },
      {
        key: "CF_COLLECTED_AMT",
        label: "Amount",
        minWidth: "140px",
        cellClass: "text-center",
        render: (v) => <AmtCell v={v} />,
      },
      {
        key: "CF_COLLECTED_PERC",
        label: "(%)",
        cellClass: "text-center",
        minWidth: "70px",
        render: (v) => <PctCell v={v} highIsGood={true} />,
      },
    ],
  },

  {
    label: "CP COLLECTED DURING THE MONTH",
    headerClass: "text-center",
    columns: [
      {
        key: "CP_COUNT",
        label: "No. of A/C",
        minWidth: "130px",
        cellClass: "text-center",
        render: (v) => <NumCell v={v} />,
      },
      {
        key: "CP_COLLECTED_AMT",
        label: "Amount",
        minWidth: "140px",
        cellClass: "text-center",
        render: (v) => <AmtCell v={v} />,
      },
      {
        key: "CP_COLLECTED_PERC",
        label: "(%)",
        minWidth: "120px",
        cellClass: "text-center",
        render: (v) => <PctCell v={v} highIsGood={true} />,
      },
    ],
  },

  {
    label: "MOVED TO SMA2",
    headerClass: "text-center",
    columns: [
      {
        key: "MOVED_TO_SMA2",
        label: "No. of A/C",
        minWidth: "130px",
        cellClass: "text-center",
        render: (v) => <NumCell v={v} />,
      },
      {
        key: "COLLECTED_TO_SMA2",
        minWidth: "140px",
        label: "Amount",
        cellClass: "text-center",
        render: (v) => <AmtCell v={v} />,
      },
    ],
  },

  {
    label: "MOVED TO SMA1",
    headerClass: "text-center",
    columns: [
      {
        key: "MOVED_TO_SMA1",
        minWidth: "130px",
        label: "No. of A/C",
        cellClass: "text-center",
        render: (v) => <NumCell v={v} />,
      },
      {
        key: "COLLECTED_TO_SMA1",
        label: "Amount",
        minWidth: "140px",
        cellClass: "text-center",
        render: (v) => <AmtCell v={v} />,
      },
    ],
  },

  {
    label: "MOVED TO SMA0",
    headerClass: "text-center",
    columns: [
      {
        key: "MOVED_TO_SMA0",
        label: "No. of A/C",
        cellClass: "text-center",
        minWidth: "130px",
        render: (v) => <NumCell v={v} />,
      },
      {
        key: "COLLECTED_TO_SMA0",
        label: "Amount",
        minWidth: "140px",
        cellClass: "text-center",
        render: (v) => <AmtCell v={v} />,
      },
    ],
  },

  {
    label: "MOVED TO STANDARD ASSET",
    headerClass: "text-center",
    columns: [
      {
        key: "MOVED_TO_STANDARD_ASSET",
        label: "No. of A/C",
        minWidth: "130px",
        cellClass: "text-center",
        render: (v) => <NumCell v={v} />,
      },
      {
        key: "COLLECTED_TO_STANDARD_ASSET",
        label: "Amount",
        minWidth: "140px",
        cellClass: "text-center",
        render: (v) => <AmtCell v={v} />,
      },
    ],
  },

  {
    label: "SLIPPED TO NPA",
    headerClass: "text-center",
    columns: [
      {
        key: "MOVED_TO_NPA_UNPAID",
        label: "No. of A/C",
        cellClass: "text-center",
        minWidth: "130px",
        render: (v) => (
          <span
            className="badge bg-danger-subtle text-danger"
            style={{ fontSize: "0.75rem" }}
          >
            {fmtNum(v)}
          </span> // ← red badge for NPA count
        ),
      },
      {
        key: "COLLECTED_TO_NPA_UNPAID",
        label: "Amount",
        cellClass: "text-center",
        minWidth: "140px",
        render: (v) => <NpaAmtCell v={v} />, // ← red badge for NPA amount
      },
    ],
  },
];

function SMASummaryReport() {
  const navigate = useNavigate();
  const { setLoader } = useLoader();

  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    const fetchReportData = async () => {
      setLoading(true);
      setError(null);
      try {
        setLoader(true);
        const response = await apiClient.get("/reports/smaSummary");
        setReportData(response.data || []);
      } catch (err) {
        console.error("Failed to fetch report:", err);
        setError("Failed to load report data");
      } finally {
        setLoading(false);
        setLoader(false);
      }
    };

    void fetchReportData();
  }, []);

  return (
    <div className="main-content page-sma-summary-report">
      <div className="page-header">
        <h1 className="page-title">SMA Summary Report</h1>
      </div>

      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <i className="bi bi-exclamation-triangle me-2" />
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => navigate("/")}
          />
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Loading report data...</p>
        </div>
      ) : (
        <DataTableGrouped
          columnGroups={columnGroups}
          data={reportData}
          csvFilename="sma-summary-report.csv"
          defaultPerPage={10}
          fontSize="0.80rem"
          compactCells={false}
        />
      )}
    </div>
  );
}

export default SMASummaryReport;
