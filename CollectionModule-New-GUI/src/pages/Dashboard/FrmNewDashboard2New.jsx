import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import * as echarts from "echarts";
import ReusableDataGrid from "../../components/ReusableDataGrid";
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
  const {loading, setLoader} = useLoader();
  const [showDetails, setShowDetails] = useState(false);
  const [chartData, setChartData] = useState({
    labels1: [],
    datasets1: [],
    labels2: [],
    datasets2: [],
  });
  const [tableData, setTableData] = useState([]);
  const columns = [
    { label: "Zone Name", sortable: false },
    { label: "Region Name", sortable: false },
    { label: "Branch Name", sortable: false },
    {
      label: "Collection Associate ID",
      sortable: true,
    },
    {
      label: "Collection Associate",
      sortable: false,
    },
    {
      label: "Login Date",
      sortable: true,
    },
    {
      label: "First Login of the Day",
      sortable: true,
    },
    {
      label: "Last Logout of the Day",
      sortable: true,
    },
    {
      label: "MDM ID",
      sortable: true,
    },
  ];
  const { register } = useForm({
    defaultValues: {
      monthYear: getCurrentMonthYear(),
    },
  });

  const commonColors = {
    accent: "#3b82f6",
    success: "#22c55e",
    warning: "#f59e0b",
    info: "#06b6d4",
    danger: "#ef4444",
  };

  function getCurrentMonthYear(padded = false) {
    const now = new Date();

    let month = now.getMonth() + 1; // 0-based → 1-based
    const year = now.getFullYear();

    if (padded) {
      month = String(month).padStart(2, "0");
    }

    return `${month}-${year}`;
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
      const monthYear = getCurrentMonthYear();
      fetchData(monthYear);
    }
  }, [userId, brCategory, userOf]);
console.log(tableData);

const users = tableData.map((rec, index) => ({
  id:                      index,
  dispositionDate:         rec[0],
  mdmId:                   rec[1],
  branchName:              rec[2],
  accountNumber:           rec[3],
  customerName:            rec[4],
  customerAddress:         rec[5],
  productType:             rec[6],   // used inside dispositionDate render
  dispositionCode:         rec[7],
  subDispositionCode:      rec[8],
  collectionAssociateName: rec[9],
  employeeId:              rec[10],
  latitude:                rec[11],  // shown with bi-geo-alt (info badge)
  longitude:               rec[12],  // shown with bi-geo (warning badge)
}));
const columns1 = [
  {
    key: "dispositionDate",
    label: "Disposition Date / Product Type",
     minWidth: "200px",
    render: (val, row) => (
      <div className="d-flex align-items-center gap-3">
        <div
          className="product-img bg-primary-light rounded"
          style={{ width: "35px", height: "35px", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <i className="bi bi-geo-alt text-primary"></i>
        </div>
        <div>
          <div className="fw-medium">{val}</div>
          <small className="text-muted">{row.productType}</small>
        </div>
      </div>
    ),
  },
  { key: "mdmId",            label: "MDM ID" },
  { key: "branchName",       label: "Branch Name" },
  {
    key: "accountNumber",
    label: "Account Number",
    render: (val) => (
      <span className="badge bg-danger-subtle text-danger d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill border border-danger-subtle">
        <i className="bi bi-credit-card text-danger"></i>
        {val}
      </span>
    ),
  },
  { key: "customerName",    label: "Customer Name" },
  { key: "customerAddress", label: "Customer Address" , minWidth: "300px",},
  { key: "dispositionCode", label: "Disposition Code" },
  { key: "subDispositionCode",       label: "Sub Disposition Code" },
  { key: "collectionAssociateName",  label: "Collection Associate Name", cellClass: "text-nowrap" },
  { key: "employeeId",               label: "Employee ID",               cellClass: "text-nowrap" },
  { key: "latitude",        label: "Latitude", 
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
    render: (val) => (
      <span className="badge bg-info-subtle text-info d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill border">
        <i className="bi bi-geo-alt"></i>
        {val}
      </span>
    ),
  },
  // {
  //   key: "longitude",
  //   label: "Longitude",
  //   exportable: false,
  //   render: (val) => (
  //     <span className="badge bg-warning-subtle text-warning d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill border">
  //       <i className="bi bi-geo"></i>
  //       {val}
  //     </span>
  //   ),
  // },
];
  return (
    // <div className="main">
    //     <div className="main-content page-users-view">
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
            {/* <label className="form-label mb-0">
                                Select Month & Year:
                            </label> */}
            <select
              className="form-select"
              style={{ maxWidth: "280px" }}
              {...register("monthYear")}
              onChange={(e) => {
                fetchData(e.target.value);
              }}
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
    // </div>
  );
};

export default FrmNewDashboard2New;
