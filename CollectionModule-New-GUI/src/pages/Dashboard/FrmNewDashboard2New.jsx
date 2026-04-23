import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import * as echarts from 'echarts'
import ReusableDataGrid from '../../components/ReusableDataGrid'
import apiClient from "../../services/apiClient";
import { useAuth } from '../../context/AuthContext';
import { useForm } from "react-hook-form";
import { useNotification } from "../../context/useNotification";
import Chart from 'chart.js/auto'

const FrmNewDashboard2New = () => {
    const { user } = useAuth();
    const userId = user?.userId;
    const brCategory = user?.brCategory;
    const userOf = user?.userProofType;
    const { showError } = useNotification();
    const [loading, setLoading] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [chartData, setChartData] = useState({
        labels1: [],
        datasets1: [],
        labels2: [],
        datasets2: []
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
        accent: '#3b82f6',
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

    const bar4 = useChart((context) => new Chart(context, {
        type: 'bar',
        data: { labels: chartData?.labels1, datasets: [{ label: 'Unique Agents adding Disposition', data: chartData?.datasets1, backgroundColor: commonColors.accent }, { label: 'Disposition Added in a Day', data: chartData?.datasets2, backgroundColor: commonColors.success }] },
        options: { responsive: true },
    }))

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

    const fetchData = async (monthYear) => {
        try {
            const [month, year] = monthYear.split("-");
            const userNo = userId.split("E")[1];

            const response = await apiClient.get(`/disposition-dashboard/report?month=${month}&year=${year}&userId=${userNo}&brCategory=${brCategory}&userOf=${userOf ?? 0}`, {});

            console.log(response);

            if (response.success) {
                // setAgentChartData({
                //     labels: response.data.chart1.labels,
                //     datasets: response.data.chart1.data
                // });
                // setDispositionChartData({
                //     labels: response?.data?.chart2?.labels,
                //     datasets: response?.data?.chart2?.data
                // })
                setChartData({
                    labels1: response?.data?.chart1?.labels,
                    datasets1: response?.data?.chart1?.data,
                    labels2: response?.data?.chart2?.labels,
                    datasets2: response?.data?.chart2?.data
                })
                const formattedTableData = response.data.grid.map(item => ([
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
                    item.LONGTITUDE
                ]));

                setTableData(formattedTableData);
                setShowDetails(true);
            }
        } catch (error) {
            console.error(error?.response);
        }
    }

    useEffect(() => {
        if (userId && brCategory) {
            const monthYear = getCurrentMonthYear();
            fetchData(monthYear);
        }
    }, [userId, brCategory, userOf])
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
                            <span className="breadcrumb-item active">Disposition Dashboard</span>
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
                    <div className="mt-3 w-100">
                        <ChartCard
                            title="Disposition Graph"
                            subtitle="Dispositions Done"
                        >
                            <canvas ref={bar4} />
                        </ChartCard>
                    </div>
                    <div className="card mt-3">
                        <div className="card-header">
                            <h5 className="card-title">Top Selling Products</h5>
                            <div className="card-actions">
                                <a href="#" className="btn btn-sm btn-outline-primary">View All</a>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Disposition Date</th>
                                            <th>MDM ID</th>
                                            <th>Branch Name</th>
                                            <th>Account Number</th>
                                            <th>Customer Name</th>
                                            <th>Customer Address</th>
                                            <th>Product Type</th>
                                            <th>Disposition Code</th>
                                            <th>Sub Disposition Code</th>
                                            <th>Collection Associate Name</th>
                                            <th>Employee ID</th>
                                            <th>Latitude</th>
                                            <th>Longitude</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* <tr>
                                                <td>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="product-img bg-primary-light rounded" style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                            <i className="bi bi-laptop text-primary"></i>
                                                        </div>
                                                        <div>
                                                            <div className="fw-medium">MacBook Pro 14"</div>
                                                            <small className="text-muted">Electronics</small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>$1,999</td>
                                                <td>142</td>
                                                <td>$283,858</td>
                                                <td><span className="badge badge-soft-success"><i className="bi bi-arrow-up"></i> 12%</span></td>
                                            </tr> */}
                                        {console.log(tableData)}
                                        {tableData.length > 0 &&
                                            tableData.map((rec, index) => (
                                                <tr key={index}>
                                                    <td>{rec[0]}</td>
                                                    <td>{rec[1]}</td>
                                                    <td>{rec[2]}</td>
                                                    <td>{rec[3]}</td>
                                                    <td>{rec[4]}</td>
                                                    <td>{rec[5]}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-4">
                                                            <div className="product-img bg-primary-light rounded" style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                <i className="bi bi-file-earmark text-primary"></i>
                                                            </div>
                                                            <div>
                                                                {rec[6]}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{rec[7]}</td>
                                                    <td>{rec[8]}</td>
                                                    <td>{rec[9]}</td>
                                                    <td>{rec[10]}</td>
                                                    <td>{rec[11]}</td>
                                                    <td>{rec[12]}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        // </div>
    )
};

export default FrmNewDashboard2New;