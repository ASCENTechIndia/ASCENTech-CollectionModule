import { Link } from "react-router-dom";
import { useRef, useEffect, useState, useCallback } from "react";
import * as echarts from 'echarts'
import ReusableDataGrid from '../../components/ReusableDataGrid'
import apiClient from "../../services/apiClient";
import { useAuth } from '../../context/AuthContext';
import { useForm } from "react-hook-form";
import { useNotification } from "../../context/useNotification";
import Chart from 'chart.js/auto'
import DataTable from "../../components/Datatable";

const FrmActiveAgentsNew = () => {
    const { user } = useAuth();
    const userId = user?.userId;
    console.log("User ID:", userId);
    const { showError } = useNotification();
    const [loading, setLoading] = useState(false);
    const [summaryDetails, setSummaryDetails] = useState({});
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });
    const [tableData, setTableData] = useState([]);
    const columns = [
        { label: 'Zone Name', sortable: false },
        { label: 'Region Name', sortable: false },
        { label: 'Branch Name', sortable: false },
        {
            label: 'Collection Associate ID',
            sortable: true,
        },
        {
            label: 'Collection Associate',
            sortable: false,
        },
        {
            label: 'Login Date',
            sortable: true,
        },
        {
            label: 'First Login of the Day',
            sortable: true,
        },
        {
            label: 'Last Logout of the Day',
            sortable: true,
        },
        {
            label: 'MDM ID',
            sortable: true,
        },
    ]
    const {
        register,
    } = useForm({
        defaultValues: {
            monthYear: getCurrentMonthYear()
        }
    });
    const commonColors = {
        accent: '#0ea5a4',
        success: '#22c55e',
        warning: '#f59e0b',
        info: '#06b6d4',
        danger: '#ef4444',
    }

    function getCurrentMonthYear(padded = false) {
        const now = new Date();

        let month = now.getMonth() + 1; // 0-based → 1-based
        const year = now.getFullYear();

        if (padded) {
            month = String(month).padStart(2, '0');
        }

        return `${month}-${year}`;
    }

    function formatDate(dateString) {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
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
        )
    }

    function useChart(setup) {
        const canvasRef = useRef(null)

        useEffect(() => {
            const context = canvasRef.current?.getContext('2d')
            if (!context) return undefined

            const chart = setup(context)
            return () => chart?.destroy?.()
        }, [setup])

        return canvasRef
    }

    const summaryCards = [
        {
            label: 'No. of Onboarded and Active Collection Associate',
            value: summaryDetails?.onboardedActiveAssociates ?? 0,
            icon: 'bi bi-people',
            accent: '#3b82f6',
            bg: '#eff6ff'
        },
        {
            label: 'Collection Associate having Accounts Assigned',
            value: summaryDetails?.accountsAssigned ?? 0,
            icon: 'bi bi-cash-stack',
            accent: '#10b981',
            bg: '#ecfdf5'
        },
        {
            label: 'Total No. of Unique Logins',
            value: summaryDetails?.uniqueLogins ?? 0,
            icon: 'bi bi-box-arrow-in-right',
            accent: '#f59e0b',
            bg: '#fffbeb'
        },
    ];

    const bar1 = useChart((context) => new Chart(context, {
        type: 'bar',
        data: { labels: chartData.labels, datasets: [{ label: 'Unique Collection Assoiciate using the app on a day', data: chartData.datasets, backgroundColor: commonColors.accent }] },
        options: { responsive: true },
    }))

    const fetchData = useCallback(async (monthYear) => {
        setLoading(true);
        try {
            const [month, year] = monthYear.split("-");
            const userNo = userId.split("E")[1];

            const response = await apiClient.get(`/active-agents/dashboard?userId=${userNo}&month=${month}&year=${year}`, {});

            if (response.success) {
                setSummaryDetails(response.data.summary);
                setChartData({
                    labels: response?.data?.chart?.labels,
                    datasets: response?.data?.chart?.data
                });

                const formattedGridData = response.data.grid.map(item => ([
                    item.GRANDPARENT_BRANCH_NAME,
                    item.PARENT_BRANCH_NAME,
                    item.CURRENT_BRANCH_NAME,
                    item.USERID,
                    item.VAR_USERMST_USERFULLNAME,
                    item?.LOGIN_DATE ? formatDate(item.LOGIN_DATE) : "",
                    item?.MIN_LOGIN ? formatDate(item.MIN_LOGIN) : "",
                    item?.MAX_LOGOUT ? formatDate(item.MAX_LOGOUT) : "",
                    item.MDM_ID
                ]))
                setTableData(formattedGridData);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [userId])

    useEffect(() => {
        if (userId) {
            const monthYearStr = getCurrentMonthYear();
            const timeoutId = window.setTimeout(() => {
                fetchData(monthYearStr);
            }, 0);
            return () => window.clearTimeout(timeoutId);
        }
    }, [userId, fetchData]);
console.log(tableData);
    const data = tableData.map((rec, index) => ({
  id:                    index,
  zone:                  rec[0],
  regionName:            rec[1],   // shown as subtitle under zone
  branchName:            rec[2],
  collectionAssociateId: rec[3],
  collectionAssociate:   rec[4],
  loginDate:             rec[5],
  firstLogin:            rec[6],
  lastLogout:            rec[7],
  mdmId:                 rec[8],
  // rec[8] from original — add if needed:
  // extraField:         rec[8],
}));

const columns1 = [
  {
    key: "zone",
    label: "Zone / Region",
    minWidth: "200px",
    render: (val, row) => (
      <div className="d-flex align-items-center gap-3">
        <div
          className="product-img bg-primary-light rounded"
          style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <i className="bi bi-geo-alt text-primary"></i>
        </div>
        <div>
          <div className="fw-medium">{val}</div>
          <small className="text-muted">{row.regionName}</small>
        </div>
      </div>
    ),
  },
  {
    key: "branchName",
    label: "Branch Name"
  },
  {
    key: "collectionAssociateId",
    label: "Collection Associate ID",
    render: (val) => <span className="text-success">{val}</span>,
  },
  {
    key: "collectionAssociate",
    label: "Collection Associate",
    render: (val) => <span className="fw-semibold">{val}</span>,
  },
  { key: "loginDate",       label: "Login Date",              minWidth: "150px" },
  { key: "firstLogin",      label: "First Login of the Day",  minWidth: "120px" },
  { key: "lastLogout",      label: "Last Logout of the Day",  minWidth: "120px" },
  { key: "mdmId",           label: "MDM ID",                  minWidth: "120px" },
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
                                <span className="breadcrumb-item active">Active Agent Dashboard</span>
                            </nav>
                        </div>
                        <div className="d-flex flex-column align-items-md-center">
                            {/* <label className="form-label mb-0">
                                Select Month & Year:
                            </label> */}
                            <select className="form-select"
                                style={{ maxWidth: '280px' }}
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
                        <div className="row align-items-stretch g-3">
                            {summaryCards.map((card) => (
                                <div className="col-12 col-sm-6 col-xl-4 d-flex" key={card.label}>
                                    <div
                                        className="card h-100 w-100 border-0 shadow"
                                        style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
                                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)' }}
                                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
                                    >
                                        <div className="card-body">
                                            <div className="d-flex align-items-start gap-3 mb-2">
                                                <div
                                                    style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        borderRadius: '10px',
                                                        backgroundColor: card.bg,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        flexShrink: 0
                                                    }}
                                                >
                                                    <i className={card.icon} style={{ fontSize: '24px', color: card.accent }} />
                                                </div>
                                                <div className="flex-grow-1">
                                                    <div style={{ fontSize: '24px', fontWeight: 700, color: '#111827', lineHeight: '1.2' }}>
                                                        {card.value}
                                                    </div>
                                                </div>
                                            </div>
                                            <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: '1.4' }}>
                                                {card.label}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
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
           
    )
};

export default FrmActiveAgentsNew;  