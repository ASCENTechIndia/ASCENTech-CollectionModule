import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useNotification } from "../../context/useNotification";
import Chart from "chart.js/auto";
import DataTable from "../../components/Datatable";
import { useLoader } from "../../context/LoaderContext";

// Generate month options from Sep-2024 to current month 
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

  const startMonth = 9; // September
  const startYear = 2024;

  const now = new Date();
  const currentMonth = now.getMonth() + 1; // 1-based
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

const FrmNewDashboard2New = () => {
  const { user } = useAuth();
  const userId = user?.userId;
  const brCategory = user?.brCategory;
  const userOf = user?.userProofType;
  const { showError } = useNotification();
  const { setLoader } = useLoader();

  const [showDetails, setShowDetails] = useState(false);
  const [chartData, setChartData] = useState({
    labels1: [],
    datasets1: [],
    labels2: [],
    datasets2: [],
  });
  const [tableData, setTableData] = useState([]);

  // default to current month
  const { register } = useForm({
    defaultValues: { monthYear: CURRENT_MONTH },
  });

  const commonColors = {
    accent: "#3b82f6",
    success: "#22c55e",
    warning: "#f59e0b",
    info: "#06b6d4",
    danger: "#ef4444",
  };

  function useChart(setup) {
    const canvasRef = useRef(null);
    useEffect(() => {
      const context = canvasRef.current?.getContext("2d");
      if (!context) return undefined;
      const chart = setup(context);
      return () => chart?.destroy?.();
    }, [setup]);
    return canvasRef;
  }

  const bar4 = useChart(
    (context) =>
      new Chart(context, {
        type: "bar",
        data: {
          labels: chartData?.labels1,
          datasets: [
            {
              label: "Unique Agents adding Disposition",
              data: chartData?.datasets1,
              backgroundColor: commonColors.accent,
            },
            {
              label: "Disposition Added in a Day",
              data: chartData?.datasets2,
              backgroundColor: commonColors.success,
            },
          ],
        },
        options: { responsive: true },
      }),
  );

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
    const parts = dateStr.split("/");
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
        setChartData({
          labels1: response?.data?.chart1?.labels,
          datasets1: response?.data?.chart1?.data,
          labels2: response?.data?.chart2?.labels,
          datasets2: response?.data?.chart2?.data,
        });

        const formattedTableData = response.data.grid.map((item) => [
          formatDateToAbbr(item.TRANS_DATE),
          item.MDM_ID,
          item.VAR_BANKDATA_BRANCH,
          item.CONTRACTNUM,
          item.CUSTOMERNAME,
          item.CUSTOMERADDRESS,
          item.PRODUCT_TYPE,
          item.VISITSTSTS,
          item.FEEDBACK,
          item.USERNAME,
          item.EMPLOYECODE,
          item.LATTITUDE,
          item.LONGTITUDE,
        ]);

        setTableData(formattedTableData);
        setShowDetails(true);
      }
    } catch (error) {
      console.error(error?.response);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (userId && brCategory) {
      fetchData(CURRENT_MONTH);
    }
  }, [userId, brCategory, userOf]);

  const users = tableData.map((rec, index) => ({
    id: index,
    dispositionDate: rec[0],
    mdmId: rec[1],
    branchName: rec[2],
    accountNumber: rec[3],
    customerName: rec[4],
    productType: rec[6],
    dispositionCode: rec[7],
    subDispositionCode: rec[8],
    collectionAssociateName: rec[9],
    employeeId: rec[10],
    latitude: rec[11],
    longitude: rec[12],
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
      key: "productType",
      label: "Product Type",
      minWidth: "250px",
      render: (val) =>
        val ? (
          <span className="text-primary">{val}</span>
        ) : (
          <span className="text-muted">—</span>
        ),
    },
    { key: "mdmId", label: "MDM ID", minWidth: "120px" },
    { key: "branchName", label: "Branch Name", minWidth: "300px" },
    {
      key: "accountNumber",
      label: "Account Number",
      minWidth: "170px",
      render: (val) => (
        <span className="badge bg-danger-subtle text-danger d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill border border-danger-subtle">
          <i className="bi bi-credit-card text-danger"></i>
          {val}
        </span>
      ),
    },
    { key: "customerName", label: "Customer Name", minWidth: "160px" },
    { key: "dispositionCode", label: "Disposition Code", minWidth: "220px" },
    {
      key: "subDispositionCode",
      label: "Sub Disposition Code",
      minWidth: "220px",
    },
    {
      key: "collectionAssociateName",
      label: "Collection Associate Name",
      cellClass: "text-nowrap",
      minWidth: "240px",
    },
    {
      key: "employeeId",
      label: "Employee ID",
      cellClass: "text-nowrap",
      minWidth: "140px",
    },
    {
      key: "latitude",
      label: "Latitude",
      minWidth: "130px",
      render: (val) => (
        <span className="badge bg-warning-subtle text-warning d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill border">
          <i className="bi bi-geo"></i>
          {val}
        </span>
      ),
    },
    {
      key: "longitude",
      label: "Longitude",
      minWidth: "130px",
      render: (val) => (
        <span className="badge bg-info-subtle text-info d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill border">
          <i className="bi bi-geo-alt"></i>
          {val}
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

          {/* ── Dynamic month/year dropdown ── */}
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
                <canvas ref={bar4} />
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
