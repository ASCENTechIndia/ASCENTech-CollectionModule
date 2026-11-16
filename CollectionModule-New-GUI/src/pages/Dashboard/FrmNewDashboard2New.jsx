import { useRef, useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useNotification } from "../../context/useNotification";
import Chart from "chart.js/auto";
import DataTable from "../../components/Datatable";
import { useLoader } from "../../context/LoaderContext";

function generateMonthOptions() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const startMonth = 9;
  const startYear = 2024;

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const options = [];
  let month = startMonth;
  let year = startYear;

  while (
    year < currentYear ||
    (year === currentYear && month <= currentMonth)
  ) {
    options.push({
      value: `${month}-${year}`,
      label: `${monthNames[month - 1]} ${year}`,
    });
    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
  }

  return options.reverse();
}

const MONTH_OPTIONS = generateMonthOptions();

const CURRENT_MONTH = (() => {
  const now = new Date();
  return `${now.getMonth() + 1}-${now.getFullYear()}`;
})();

const DATASET_COLORS = {
  uniqueAgents: "#3b82f6", // accent — blue
  dispositions: "#22c55e", // success — green
};

function ChartCard({ title, children, subtitle }) {
  return (
    <div className="card h-100">
      <div className="card-header">
        <h5 className="card-title mb-1">{title}</h5>
        {subtitle ? <p className="card-subtitle mb-0">{subtitle}</p> : null}
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}

function formatDateToAbbr(dateStr) {
  const parts = String(dateStr || "").split("/");
  if (parts.length !== 3) return dateStr;
  const day = parts[0].padStart(2, "0");
  const month = parseInt(parts[1], 10);
  const year = parts[2];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (month < 1 || month > 12) return dateStr;
  return `${day}-${monthNames[month - 1]}-${year}`;
}

const FrmNewDashboard2New = () => {
  const { user } = useAuth();
  const userId = user?.userId;
  const brCategory = user?.brCategory;
  const userOf = user?.userProofType;

  const { showError } = useNotification();
  const { setLoader } = useLoader();

  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [tableData, setTableData] = useState([]);

  const { register } = useForm({
    defaultValues: { monthYear: CURRENT_MONTH },
  });

  /* ---------- Chart.js instance lifecycle ---------- */
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return undefined;

    chartRef.current?.destroy();
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: chartData.labels,
        datasets: chartData.datasets.map((ds) => ({
          label: ds.label,
          data: ds.data,
          backgroundColor: DATASET_COLORS[ds.key] ?? "#3b82f6",
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { position: "top" },
        },
        scales: {
          y: { beginAtZero: true, ticks: { precision: 0 } },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [chartData]);

  const fetchData = async (monthYear) => {
    try {
      setLoader(true);
      const [month, year] = monthYear.split("-");
      const userNo = userId.split("E")[1];

      const response = await apiClient.get(
        `/disposition-dashboard/report?month=${month}&year=${year}&userId=${userNo}&brCategory=${brCategory}&userOf=${userOf ?? 0}`,
        {},
      );

      if (response.success) {
        // single combined chart
        setChartData({
          labels: response?.data?.chart?.labels ?? [],
          datasets: response?.data?.chart?.datasets ?? [],
        });

        setTableData(response?.data?.grid ?? []);
      }
    } catch (error) {
      console.error(error?.response);
      showError?.(error?.response?.data?.message ?? "Failed to load dashboard");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (userId && brCategory) {
      fetchData(CURRENT_MONTH);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, brCategory, userOf]);

  const users = tableData.map((item, index) => ({
    id: index,
    dispositionDate: formatDateToAbbr(item.TRANS_DATE),
    transactionId: item.TRANSID,
    customerName: item.CUSTOMERNAME,
    accountNumber: item.CONTRACTNUM,
    branchName: item.VAR_BANKDATA_BRANCH,
    productType: item.PRODUCT_TYPE,
    productName: item.VAR_BANKDATA_PRODUCTNM,
    visitStatus: item.VISITSTSTS,
    feedback: item.FEEDBACK,
    collectionAssociate: item.USERNAME,
    employeeCode: item.EMPLOYEECODE,
    mobileNo: item.MOBILENO,
    latitude: item.LATITUDE,
    longitude: item.LONGITUDE,
  }));

  const columns1 = [
    {
      key: "dispositionDate",
      label: "Disposition Date",
      minWidth: "170px",
      render: (val) =>
        val ? (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.82rem",
              color: "#1e293b",
            }}
          >
            <i className="bi bi-calendar-check" style={{ color: "#0d6efd" }} />
            {val}
          </span>
        ) : (
          <span className="text-muted">—</span>
        ),
    },
    {
      key: "transactionId",
      label: "Transaction ID",
      minWidth: "180px",
      cellClass: "text-nowrap",
      render: (val) => (
        <span className="badge bg-secondary-subtle text-secondary border px-2 py-1 rounded">
          {val ?? "—"}
        </span>
      ),
    },
    {
      key: "customerName",
      label: "Customer Name",
      minWidth: "220px",
    },
    {
      key: "accountNumber",
      label: "Account Number",
      minWidth: "170px",
      render: (val) =>
        val ? (
          <span className="badge bg-danger-subtle text-danger d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill border border-danger-subtle">
            <i className="bi bi-credit-card text-danger"></i>
            {val}
          </span>
        ) : (
          <span className="text-muted">—</span>
        ),
    },
    {
      key: "branchName",
      label: "Branch Name",
      minWidth: "260px",
    },
    {
      key: "productType",
      label: "Product Type",
      minWidth: "220px",
      render: (val) =>
        val ? (
          <span className="text-primary">{val}</span>
        ) : (
          <span className="text-muted">—</span>
        ),
    },
    {
      key: "productName",
      label: "Product Name / Zone",
      minWidth: "200px",
    },
    {
      key: "visitStatus",
      label: "Visit Status",
      minWidth: "220px",
      render: (val) =>
        val ? (
          <span className="badge bg-primary-subtle text-primary border px-3 py-2 rounded-pill">
            {val}
          </span>
        ) : (
          <span className="text-muted">—</span>
        ),
    },
    {
      key: "feedback",
      label: "Feedback",
      minWidth: "200px",
      render: (val) => val ?? <span className="text-muted">—</span>,
    },
    {
      key: "collectionAssociate",
      label: "Collection Associate",
      minWidth: "220px",
      cellClass: "text-nowrap",
    },
    {
      key: "employeeCode",
      label: "Employee Code",
      minWidth: "140px",
      cellClass: "text-nowrap",
    },
    {
      key: "mobileNo",
      label: "Mobile No",
      minWidth: "150px",
      cellClass: "text-nowrap",
      render: (val) =>
        val ? (
          <span className="d-inline-flex align-items-center gap-2">
            <i className="bi bi-telephone text-success"></i>
            {val}
          </span>
        ) : (
          <span className="text-muted">—</span>
        ),
    },
    {
      key: "latitude",
      label: "Latitude",
      minWidth: "140px",
      render: (val) => (
        <span className="badge bg-warning-subtle text-warning d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill border">
          <i className="bi bi-geo"></i>
          {val ?? "—"}
        </span>
      ),
    },
    {
      key: "longitude",
      label: "Longitude",
      minWidth: "140px",
      render: (val) => (
        <span className="badge bg-info-subtle text-info d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill border">
          <i className="bi bi-geo-alt"></i>
          {val ?? "—"}
        </span>
      ),
    },
  ];

  return (
    <div className="page-roles p-4">
      <div className="page-users-view">
        <div className="page-header uv-page-header">
          <div>
            <h1 className="page-title">Disposition Report</h1>
          </div>

          <div className="d-flex flex-column align-items-md-center">
            <select
              className="form-select"
              style={{ maxWidth: "280px" }}
              defaultValue={CURRENT_MONTH}
              {...register("monthYear")}
              onChange={(e) => fetchData(e.target.value)}
            >
              {MONTH_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="card p-4 shadow border-0">
          <div className="mt-3 w-100">
            <ChartCard title="Disposition Graph" subtitle="Dispositions Done">
              <div style={{ width: "80%", margin: "0 auto" }}>
                <canvas ref={canvasRef} />
              </div>
            </ChartCard>
          </div>

          <DataTable
            title="Disposition Data"
            subtitle="Manage disposition data with date and code"
            columns={columns1}
            data={users}
            perPage={8}
            csvFilename="users.csv"
            addLabel="Add User"
          />
        </div>
      </div>
    </div>
  );
};

export default FrmNewDashboard2New;
