import { useRef, useEffect, useState, useCallback } from "react";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
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

const FrmActiveAgentsNew = () => {
  const { user } = useAuth();
  const userId = user?.userId;
  const { setLoader } = useLoader();

  const [summaryDetails, setSummaryDetails] = useState({});
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [tableData, setTableData] = useState([]);

  const { register } = useForm({
    defaultValues: { monthYear: CURRENT_MONTH },
  });

  const commonColors = {
    accent: "#0ea5a4",
    success: "#22c55e",
    warning: "#f59e0b",
    info: "#06b6d4",
    danger: "#ef4444",
  };

  function getCurrentMonthYear() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    return `${month}-${year}`;
  }

  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const months = [
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

    const day = String(date.getDate()).padStart(2, "0");
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const mins = String(date.getMinutes()).padStart(2, "0");
    const secs = String(date.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // convert 0 → 12 for 12 AM
    const hh = String(hours).padStart(2, "0");

    return `${day}-${month}-${year} ${hh}:${mins}:${secs} ${ampm}`;
  }
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

  const bar1 = useChart(
    (context) =>
      new Chart(context, {
        type: "bar",
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: "Unique Collection Associate using the app on a day",
              data: chartData.datasets,
              backgroundColor: commonColors.accent,
            },
          ],
        },
        options: { responsive: true },
      }),
  );

  const summaryCards = [
    {
      label: "No. of Onboarded and Active Collection Associate",
      value: summaryDetails?.onboardedActiveAssociates ?? 0,
      icon: "bi bi-people",
      accent: "#3b82f6",
      bg: "#eff6ff",
    },
    {
      label: "Collection Associate having Accounts Assigned",
      value: summaryDetails?.accountsAssigned ?? 0,
      icon: "bi bi-cash-stack",
      accent: "#10b981",
      bg: "#ecfdf5",
    },
    {
      label: "Total No. of Unique Logins",
      value: summaryDetails?.uniqueLogins ?? 0,
      icon: "bi bi-box-arrow-in-right",
      accent: "#f59e0b",
      bg: "#fffbeb",
    },
  ];

  const fetchData = useCallback(
    async (monthYear) => {
      try {
        setLoader(true);
        const [month, year] = monthYear.split("-");
        const userNo = userId.split("E")[1];

        const response = await apiClient.get(
          `/active-agents/dashboard?userId=${userNo}&month=${month}&year=${year}`,
          {},
        );

        if (response.success) {
          setSummaryDetails(response.data.summary);
          setChartData({
            labels: response?.data?.chart?.labels,
            datasets: response?.data?.chart?.data,
          });

          const formattedGridData = response.data.grid.map((item) => [
            item.GRANDPARENT_BRANCH_NAME,
            item.PARENT_BRANCH_NAME,
            item.CURRENT_BRANCH_NAME,
            item.USERID,
            item.VAR_USERMST_USERFULLNAME,
            item?.LOGIN_DATE ? formatDate(item.LOGIN_DATE) : "",
            item?.MIN_LOGIN ? formatDate(item.MIN_LOGIN) : "",
            item?.MAX_LOGOUT ? formatDate(item.MAX_LOGOUT) : "",
          ]);
          setTableData(formattedGridData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoader(false);
      }
    },
    [userId],
  );

  useEffect(() => {
    if (userId) {
      const monthYearStr = getCurrentMonthYear();
      const timeoutId = window.setTimeout(() => fetchData(monthYearStr), 0);
      return () => window.clearTimeout(timeoutId);
    }
  }, [userId, fetchData]);

  const data = tableData.map((rec, index) => ({
    id: index,
    zone: rec[0],
    regionName: rec[1],
    branchName: rec[2],
    collectionAssociateId: rec[3],
    collectionAssociate: rec[4],
    loginDate: rec[5],
    firstLogin: rec[6],
    lastLogout: rec[7],
  }));

  const columns1 = [
    {
      key: "zone",
      label: "Zone",
      minWidth: "160px",
      render: (val) =>
        val ? (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.82rem",
              color: "#0f5132",
            }}
          >
            <i className="bi bi-geo-alt-fill" style={{ color: "#198754" }} />
            {val}
          </span>
        ) : (
          <span className="text-muted">—</span>
        ),
    },
    {
      key: "regionName",
      label: "Region",
      minWidth: "150px",
      render: (val) =>
        val ? (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.82rem",
              color: "#084298",
            }}
          >
            <i className="bi bi-map-fill" style={{ color: "#0d6efd" }} />
            {val}
          </span>
        ) : (
          <span className="text-muted">—</span>
        ),
    },
    {
      key: "branchName",
      label: "Branch Name",
      render: (val) =>
        val ? (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              background: "#f0f4ff",
              color: "#3d5a99",
              padding: "3px 10px",
              borderRadius: "20px",
              fontSize: "0.78rem",
              fontWeight: 500,
              border: "1px solid #c5d3f0",
            }}
          >
            <i className="bi bi-bank" />
            {val}
          </span>
        ) : (
          <span className="text-muted">—</span>
        ),
    },
    {
      key: "collectionAssociateId",
      label: "Collection Associate ID",
      render: (val) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              flexShrink: 0,
              background: "#e8f0fe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i
              className="bi bi-person-fill"
              style={{ color: "#1a73e8", fontSize: "0.8rem" }}
            />
          </span>
          <span
            style={{ fontSize: "0.82rem", fontWeight: 500, color: "#1e293b" }}
          >
            {val}
          </span>
        </div>
      ),
    },
    {
      key: "collectionAssociate",
      label: "Collection Associate",
      render: (val) => <span className="fw-semibold">{val}</span>,
    },
    {
      key: "loginDate",
      label: "Login Date",
      minWidth: "190px",
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
      key: "firstLogin",
      label: "First Login of the Day",
      minWidth: "190px",
      render: (val) =>
        val ? (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.82rem",
              color: "#0f5132",
            }}
          >
            <i
              className="bi bi-box-arrow-in-right"
              style={{ color: "#198754" }}
            />
            {val}
          </span>
        ) : (
          <span className="text-muted">—</span>
        ),
    },
    {
      key: "lastLogout",
      label: "Last Logout of the Day",
      minWidth: "190px",
      render: (val) =>
        val ? (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.82rem",
              color: "#7c3aed",
            }}
          >
            <i className="bi bi-box-arrow-right" style={{ color: "#7c3aed" }} />
            {val}
          </span>
        ) : (
          <span className="text-muted">—</span>
        ),
    },
  ];

  return (
    <div className="page-roles p-4">
      <div className="page-users-view">
        <div className="page-header uv-page-header">
          <div>
            <h1 className="page-title">Active Agent Dashboard</h1>
            <nav className="breadcrumb">
              <span className="breadcrumb-item">Home</span>
              <span className="breadcrumb-item">Dashboard</span>
              <span className="breadcrumb-item active">
                Active Agent Dashboard
              </span>
            </nav>
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
          {/* ── Summary cards ── */}
          <div className="row align-items-stretch g-3">
            {summaryCards.map((card) => (
              <div className="col-12 col-sm-6 col-xl-4 d-flex" key={card.label}>
                <div
                  className="card h-100 w-100 border-0 shadow"
                  style={{ transition: "all 0.3s ease", cursor: "pointer" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div className="card-body">
                    <div className="d-flex align-items-start gap-3 mb-2">
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "10px",
                          backgroundColor: card.bg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <i
                          className={card.icon}
                          style={{ fontSize: "24px", color: card.accent }}
                        />
                      </div>
                      <div className="flex-grow-1">
                        <div
                          style={{
                            fontSize: "24px",
                            fontWeight: 700,
                            color: "#111827",
                            lineHeight: "1.2",
                          }}
                        >
                          {card.value}
                        </div>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#64748b",
                        margin: 0,
                        lineHeight: "1.4",
                      }}
                    >
                      {card.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Chart ── */}
          <div className="mt-3 w-100">
            <ChartCard
              title="Unique Collection Associate Trend"
              subtitle="Daily active app usage"
            >
              <div style={{ width: "80%", margin: "0 auto" }}>
                <canvas ref={bar1} />
              </div>
            </ChartCard>
          </div>

          {/* ── Table ── */}
          <DataTable
            title="Collection Associate Login Report"
            subtitle="Daily login and logout tracking"
            columns={columns1}
            data={data}
            perPage={10}
            csvFilename="login_report.csv"
          />
        </div>
      </div>
    </div>
  );
};

export default FrmActiveAgentsNew;
