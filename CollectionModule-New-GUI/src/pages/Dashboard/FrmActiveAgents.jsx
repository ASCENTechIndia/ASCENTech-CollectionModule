import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import * as echarts from 'echarts'
import Chart from 'chart.js/auto'
import ReusableDataGrid from '../../components/ReusableDataGrid'
import apiClient from "../../services/apiClient";
import { useAuth } from '../../context/AuthContext';
import { useForm } from "react-hook-form";
import { color } from "chart.js/helpers";

const FrmActiveAgents = () => {
    const { user } = useAuth();
    const userId = user?.userId;
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

    const colors = {
        accent: '#3b82f6',
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#06b6d4',
        border: 'rgba(148, 163, 184, 0.25)',
        muted: '#64748b',
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
    // function useChart(setup) {
    //     const canvasRef = useRef(null)

    //     useEffect(() => {
    //         const context = canvasRef.current?.getContext('2d')
    //         if (!context) return undefined

    //         const chart = setup(context)
    //         return () => chart?.destroy?.()
    //     }, [setup])

    //     return canvasRef
    // }

    // const area1 = useChart((context) => new Chart(context, {
    //     type: 'line',
    //     data: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], datasets: [{ label: 'Unique Collection Associate using the app on a day', data: [31, 40, 28, 51, 42, 109, 100], borderColor: commonColors.accent, backgroundColor: 'rgba(59,130,246,.2)', fill: true, tension: 0.4 }] },
    //     options: { responsive: true, maintainAspectRatio: false },
    // }))

    // ECharts
    const commonGrid = { left: '5%', right: '4%', bottom: '12%', containLabel: true }
    const axisStyle = { color: colors.muted }
    function useEChart(optionFactory) {
        const ref = useRef(null)

        useEffect(() => {
            if (!ref.current) return undefined
            const chart = echarts.init(ref.current)
            chart.setOption(optionFactory())
            const resize = () => chart.resize()
            window.addEventListener('resize', resize)
            return () => {
                window.removeEventListener('resize', resize)
                chart.dispose()
            }
        }, [optionFactory])

        return ref
    }

    const gradientArea = useEChart(() => ({
        tooltip: {
            trigger: 'axis',
            padding: [2, 6],
            textStyle: {
                fontSize: 10,
                lineHeight: 14
            },
            extraCssText: 'max-width:120px; max-height: 80px; white-space:normal;'
        },
        grid: commonGrid,
        legend: {
            show: true,
            top: 20,
            left: 'center',
            textStyle: {
                color: colors.muted,
                fontSize: 12
            }
        },
        xAxis: {
            type: 'category', name: "Days", nameLocation: "middle", nameGap: 30, boundaryGap: false, data: chartData.labels, axisLine: { lineStyle: { color: colors.border } }, axisLabel: axisStyle, nameTextStyle: {
                color: colors.muted
            }
        },
        yAxis: { type: 'value', name: "Count", nameLocation: "middle", nameRotate: 90, nameGap: 35, axisLine: { show: false }, splitLine: { lineStyle: { color: colors.border, type: 'dashed' } }, axisLabel: axisStyle },
        series: [{
            name: 'Unique Collection Associate using the app on a day', type: 'line', smooth: true, data: chartData.datasets, itemStyle: { color: colors.accent }, areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: colors.accent }, { offset: 1, color: 'rgba(59,130,246,0.05)' }]) }
        }],
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
            console.log(response);
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
                            <select className="form-select"
                                {...register("monthYear")}
                                onChange={(e) => {
                                    setShowDetails(false);
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
                </div>

                <div className="row align-items-stretch g-3 mt-2">
                    <div className="col-12 col-md-4 d-flex">
                        <div className="card widget-info-stat h-100 w-100">
                            <div className="card-body">
                                <div className="widget-info-stat-icon primary">
                                    <i className="bi bi-people" />
                                </div>
                                <div className="widget-info-stat-content">
                                    <span className="widget-info-stat-value">
                                        {summaryDetails?.onboardedActiveAssociates}
                                    </span>
                                    <span className="widget-info-stat-label">
                                        No. of Onboarded and Active Collection Associate
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 d-flex">
                        <div className="card widget-info-stat h-100 w-100">
                            <div className="card-body">
                                <div className="widget-info-stat-icon primary">
                                    <i className="bi bi-cash-stack" />
                                </div>
                                <div className="widget-info-stat-content">
                                    <span className="widget-info-stat-value">
                                        {summaryDetails?.accountsAssigned}
                                    </span>
                                    <span className="widget-info-stat-label">
                                        Collection Associate having Accounts Assigned
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 d-flex">
                        <div className="card widget-info-stat h-100 w-100">
                            <div className="card-body">
                                <div className="widget-info-stat-icon primary">
                                    <i className="bi bi-box-arrow-in-right" />
                                </div>
                                <div className="widget-info-stat-content">
                                    <span className="widget-info-stat-value">
                                        {summaryDetails?.uniqueLogins}
                                    </span>
                                    <span className="widget-info-stat-label">
                                        Total No. of Unique Logins
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card h-100 mt-3 px-2">
                    <div className="echart-container" ref={gradientArea} />
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
                                rows={tableData}
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