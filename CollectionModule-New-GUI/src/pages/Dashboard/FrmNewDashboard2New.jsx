import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useNotification } from "../../context/useNotification";
import Chart from "chart.js/auto";
import DataTable from "../../components/Datatable";
import { useLoader } from "../../context/LoaderContext";

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

  const { register } = useForm({
    defaultValues: { monthYear: getCurrentMonthYear() },
  });

  const commonColors = {
    accent: "#3b82f6",
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

  // ── Chart hook ────────────────────────────────────────────
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

  // ── Fetch data ────────────────────────────────────────────
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
          item.TRANS_DATE,
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
      fetchData(getCurrentMonthYear());
    }
  }, [userId, brCategory, userOf]);

  // Map raw array rows → objects 
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
      minWidth: "200px",
      render: (val) =>
        val ? (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              background: "#eff6ff",
              color: "#1d4ed8",
              padding: "3px 10px",
              borderRadius: "20px",
              fontSize: "0.78rem",
              fontWeight: 600,
              border: "1px solid #bfdbfe",
            }}
          >
            {val}
          </span>
        ) : (
          <span className="text-muted">—</span>
        ),
    },
    {
      key: "mdmId",
      label: "MDM ID",
      minWidth: "120px",
    },
    {
      key: "branchName",
      label: "Branch Name",
      minWidth: "140px",
    },
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
    {
      key: "customerName",
      label: "Customer Name",
      minWidth: "160px",
    },
    {
      key: "dispositionCode",
      label: "Disposition Code",
      minWidth: "170px",
    },
    {
      key: "subDispositionCode",
      label: "Sub Disposition Code",
      minWidth: "200px",
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
            <nav className="breadcrumb">
              <span className="breadcrumb-item">Home</span>
              <span className="breadcrumb-item">Dashboard</span>
              <span className="breadcrumb-item active">
                Disposition Dashboard
              </span>
            </nav>
          </div>
          <div className="d-flex flex-column align-items-md-center">
            <select
              className="form-select"
              style={{ maxWidth: "280px" }}
              {...register("monthYear")}
              onChange={(e) => fetchData(e.target.value)}
            >
              <option value="4-2025">April 2025</option>
              <option value="5-2025">May 2025</option>
              <option value="6-2025">June 2025</option>
              <option value="7-2025">July 2025</option>
              <option value="8-2025">August 2025</option>
              <option value="9-2025">September 2025</option>
              <option value="10-2025">October 2025</option>
              <option value="11-2025">November 2025</option>
              <option value="12-2025">December 2025</option>
              <option value="1-2026">January 2026</option>
              <option value="2-2026">February 2026</option>
              <option value="3-2026">March 2026</option>
              <option value="4-2026">April 2026</option>
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
