import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import * as echarts from 'echarts'
import Chart from 'chart.js/auto'
import ReusableDataGrid from '../../components/ReusableDataGrid'
import apiClient from "../../services/apiClient";
// import { useAuth } from '../../context/AuthContext';

const FrmActiveAgents = () => {
    //  const { user } = useAuth();
    // const userId = user?.userId;
    const {
        register,
    } = useForm({
        defaultValues: {
            monthYear: getCurrentMonthYear()    
        }
    });
    const [loading, setLoading] = useState(false);
    const [summaryDetails, setSummaryDetails] = useState({});
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });
    const [tableData, setTableData] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
     const columns = [
    { label: 'Zone Name', sortable: true, className: 'fw-medium' },
    { label: 'Region Name', sortable: true },
    { label: 'Branch Name', sortable: true },
    {
      label: 'Collection Associate ID',
      sortable: true,
    //   render: (value) => `$${parseFloat(value || 0).toFixed(2)}`,
    },
    {
      label: 'Collection Associate',
      sortable: true,
      render: (value) => `$${parseFloat(value || 0).toFixed(2)}`,
    },
    {
      label: 'Login Date',
      sortable: true,
    //   render: (value) => {
    //     const percentage = parseFloat(value || 0)
    //     const badgeClass =
    //       percentage >= 100 ? 'badge-soft-success' : percentage >= 80 ? 'badge-soft-info' : 'badge-soft-warning'
    //     return <span className={`badge ${badgeClass}`}>{percentage.toFixed(1)}%</span>
    //   },
    },
    {
      label: 'First Login of the Day',
      sortable: true,
    //   render: (value) => {
    //     const statusClass =
    //       value === 'Active'
    //         ? 'badge-soft-success'
    //         : value === 'Pending'
    //           ? 'badge-soft-warning'
    //           : 'badge-soft-danger'
    //     return <span className={`badge ${statusClass}`}>{value}</span>
    //   },
    },
    {
      label: 'Last Logout of the Day',
      sortable: true,
    //   render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      label: 'MDM ID',
      sortable: false,
    //   render: () => (
    //     <div className="table-actions">
    //       <button className="btn btn-icon btn-sm btn-light" type="button" title="View">
    //         <i className="bi bi-eye" />
    //       </button>
    //       <button className="btn btn-icon btn-sm btn-light" type="button" title="Edit">
    //         <i className="bi bi-pencil" />
    //       </button>
    //       <button className="btn btn-icon btn-sm btn-light" type="button" title="Download">
    //         <i className="bi bi-download" />
    //       </button>
    //     </div>
    //   ),
    },
  ]

    const commonColors = {
        accent: '#3b82f6',
        success: '#22c55e',
        warning: '#f59e0b',
        info: '#06b6d4',
        danger: '#ef4444',
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

    const area1 = useChart((context) => new Chart(context, {
        type: 'line',
        data: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], datasets: [{ label: 'Unique Collection Associate using the app on a day', data: [31, 40, 28, 51, 42, 109, 100], borderColor: commonColors.accent, backgroundColor: 'rgba(59,130,246,.2)', fill: true, tension: 0.4 }] },
        options: { responsive: true, maintainAspectRatio: false },
    }))

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
    
    const fetchData = async (monthYear) => {
        try {
            const [month, year] = monthYear.split("-");
            const userNo = userId.split("E")[1];

            const response = await apiClient.get(`/active-agents/dashboard?userId=${userNo}&month=${month}&year=${year}`, {});

            if (response.data.success) {
                setSummaryDetails(response.data.data.summary);
                const formattedChartData = {
                    labels: response.data.data.chart.labels,
                    datasets: [
                        {
                            label: "Unique Collection Associate using the app on a day",
                            data: response.data.data.chart.data,
                            borderColor: 'rgba(59, 130, 246, 1)',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            tension: 0.4,
                            fill: true,
                        }
                    ]
                }
                setChartData(formattedChartData);

                const formattedGridData = response.data.data.grid.map(item => ({
                    zone: item.GRANDPARENT_BRANCH_NAME,
                    regionName: item.PARENT_BRANCH_NAME,
                    branchName: item.CURRENT_BRANCH_NAME,
                    collassociateId: item.USERID,
                    collassociate: item.VAR_USERMST_USERFULLNAME,
                    loginDate: item?.LOGIN_DATE ? formatDate(item.LOGIN_DATE) : "",
                    firstLogin: item?.MIN_LOGIN ? formatDate(item.MIN_LOGIN) : "",
                    lastLogout: item?.MAX_LOGOUT ? formatDate(item.MAX_LOGOUT) : "",
                    mdmId: item.MDM_ID
                }))
                setTableData(formattedGridData);
                setShowDetails(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (userId) {
            const monthYearStr = getCurrentMonthYear();
            fetchData(monthYearStr);
        }
    }, [userId]);

    return (
        <div className="main-content">
            <div className="page-header">
                <h1 className="page-title">Active Agent Dashboard</h1>
                <nav className="breadcrumb">
                    <Link to="/" className="breadcrumb-item">
                        Home
                    </Link>
                    <span className="breadcrumb-item">Dashboard</span>
                    <span className="breadcrumb-item active">Active Agents Dashboard</span>
                </nav>
            </div>
            <div className="card p-4">
                <div className="row align-items-center g-3 ">
                    <div className="col-12 col-md-3">
                        <p className="fw-bold mb-0">Collection Associate</p>
                    </div>

                    <div className="col-12 col-md-5">
                        <div className="d-flex flex-column flex-md-row align-items-md-center gap-2">
                            <label className="form-label mb-0">
                                Select Month & Year:
                            </label>
                            <select className="form-select">
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

                    <div className="col-12 col-md-2">
                        <button type="button" className="btn btn-info w-100">
                            <i className="bi bi-search me-1" /> Search
                        </button>
                    </div>
                </div>

                <div className="row align-items-stretch g-3 mt-2">
                    <div className="col-12 col-md-4">
                        <div className="card text-bg-light h-100">
                            <div className="card-body">
                                <h5 className="card-title">No. of Onboarded and Active Collection Associate: </h5>
                                <p className="card-text">32</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="card text-bg-light h-100">
                            <div className="card-body">
                                <h5 className="card-title">Collection Associate having Accounts Assigned:</h5>
                                <p className="card-text">0</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="card text-bg-light h-100">
                            <div className="card-body">
                                <h5 className="card-title">Total No. of Unique Logins:</h5>
                                <p className="card-text">1</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card h-100 mt-3">
                    <div className="card-body" style={{ height: "400px" }}>
                        <canvas ref={area1} />
                    </div>
                </div>

                <div className="mt-3 card">
        <div className="card-body">
                  {loading ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="mt-2 text-muted">Loading report data...</p>
                    </div>
                  ) : (
                    <ReusableDataGrid
                      rows={[]}
                      columns={columns}
                      pageSize={10}
                    />
                  )}
                </div>
                </div>

            </div>
        </div>
    )
};

export default FrmActiveAgents;