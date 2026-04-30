import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import * as echarts from 'echarts'
import ReusableDataGrid from '../../components/ReusableDataGrid'
import apiClient from "../../services/apiClient";
import { useAuth } from '../../context/AuthContext';
import { useForm } from "react-hook-form";

const FrmNewDashboard2 = () => {
    const { user } = useAuth();
    const userId = user?.userId;
    const brCategory = user?.brCategory;
    const userOf = user?.userProofType;
    const [showDetails, setShowDetails] = useState(false);
    const [agentChartData, setAgentChartData] = useState({
        labels: [],
        datasets: []
    });
    const [dispositionChartData, setDispositionChartData] = useState({
        labels: [],
        datasets: []
    });
    const [tableHeader, setTableHeader] = useState([
        {
            label: "Disposition Date",
            sortable: false
        },
        {
            label: "MDM ID",
            sortable: true
        },
        {
            label: "Branch Name",
            sortable: true
        },
        {
            label: "Account Number",
            sortable: true
        },
        {
            label: "Customer Name",
            sortable: false
        },
        {
            label: "Customer Address",
            sortable: false
        },
        {
            label: "Product Type",
            sortable: false
        },
        {
            label: "Disposition Code",
            sortable: true
        },
        {
            label: "Sub Disposition Code",
            sortable: true
        },
        {
            label: "Collection Associate Name",
            sortable: false
        },
        {
            label: "Employee ID",
            sortable: true
        },
        {
            label: "Latitude",
            sortable: true
        },
        {
            label: "Longitude",
            sortable: true
        }
    ]);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);

    const {
        register,
    } = useForm({
        defaultValues: {
            monthYear: getCurrentMonthYear()
        }
    });

    function getCurrentMonthYear(padded = false) {
        const now = new Date();

        let month = now.getMonth() + 1; // 0-based → 1-based
        const year = now.getFullYear();

        if (padded) {
            month = String(month).padStart(2, '0');
        }

        return `${month}-${year}`;
    }

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

    const gradientArea1 = useEChart(() => {
        const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
        const isMobile = width < 576;
        const isTablet = width >= 576 && width < 992;

        return {
            tooltip: {
                trigger: 'axis',
                padding: [2, 6],
                textStyle: {
                    fontSize: 10,
                    lineHeight: 14
                },
                extraCssText: 'max-width:140px; max-height: 90px; white-space:normal;'
            },
            grid: {
                left: isMobile ? '10%' : commonGrid.left,
                right: isMobile ? '6%' : commonGrid.right,
                bottom: isMobile ? '20%' : isTablet ? '16%' : commonGrid.bottom,
                containLabel: true
            },
            legend: {
                show: true,
                top: isMobile ? 8 : 14,
                left: 'center',
                textStyle: {
                    color: colors.muted,
                    fontSize: isMobile ? 10 : 12
                }
            },
            xAxis: {
                type: 'category',
                name: "Days",
                nameLocation: "middle",
                nameGap: isMobile ? 24 : 30,
                boundaryGap: false,
                data: agentChartData.labels,
                axisLine: { lineStyle: { color: colors.border } },
                axisLabel: {
                    ...axisStyle,
                    fontSize: isMobile ? 10 : 12,
                    rotate: isMobile ? 35 : 0
                },
                nameTextStyle: {
                    color: colors.muted,
                    fontSize: isMobile ? 10 : 12
                },
            },

            yAxis: {
                type: 'value',
                name: "No. of Agents",
                nameLocation: "middle",
                nameRotate: 90,
                nameGap: isMobile ? 48 : 35,
                axisLine: { show: false },
                splitLine: { lineStyle: { color: colors.border, type: 'dashed' } },
                axisLabel: { ...axisStyle, fontSize: isMobile ? 10 : 12 }
            },
            series: [{
                name: 'Unique Agents Adding Disposition',
                type: 'line',
                smooth: true,
                data: agentChartData.datasets,
                itemStyle: { color: colors.accent },
                areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: colors.accent }, { offset: 1, color: 'rgba(59,130,246,0.05)' }]) }
            }],
        }
    })

    const gradientArea2 = useEChart(() => {
        const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
        const isMobile = width < 576;
        const isTablet = width >= 576 && width < 992;

        return {
            tooltip: {
                trigger: 'axis',
                padding: [2, 6],
                textStyle: {
                    fontSize: 10,
                    lineHeight: 14
                },
                extraCssText: 'max-width:140px; max-height: 90px; white-space:normal;'
            },
            grid: {
                left: isMobile ? '10%' : commonGrid.left,
                right: isMobile ? '6%' : commonGrid.right,
                bottom: isMobile ? '20%' : isTablet ? '16%' : commonGrid.bottom,
                containLabel: true
            },
            legend: {
                show: true,
                top: isMobile ? 8 : 14,
                left: 'center',
                textStyle: {
                    color: colors.muted,
                    fontSize: isMobile ? 10 : 12
                }
            },
            xAxis: {
                type: 'category',
                name: "Days",
                nameLocation: "middle",
                nameGap: isMobile ? 24 : 30,
                boundaryGap: false,
                data: dispositionChartData.labels,
                axisLine: { lineStyle: { color: colors.border } },
                axisLabel: {
                    ...axisStyle,
                    fontSize: isMobile ? 10 : 12,
                    rotate: isMobile ? 35 : 0
                },
                nameTextStyle: {
                    color: colors.muted,
                    fontSize: isMobile ? 10 : 12
                }
            },
            yAxis: {
                type: 'value',
                name: "Count",
                nameLocation: "middle",
                nameRotate: 90,
                nameGap: isMobile ? 42 : 30,
                axisLine: { show: false },
                splitLine: { lineStyle: { color: colors.border, type: 'dashed' } },
                axisLabel: { ...axisStyle, fontSize: isMobile ? 10 : 12 }
            },
            series: [{
                name: 'Dispositions Added in a Day',
                type: 'line',
                smooth: true,
                data: dispositionChartData.datasets,
                itemStyle: { color: colors.warning },
                areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: colors.warning }, { offset: 1, color: 'rgba(246, 196, 59, 0.05)' }]) }
            }],
        }
    })

    const fetchData = async (monthYear) => {
        try {
            const [month, year] = monthYear.split("-");
            const userNo = userId.split("E")[1];

            const response = await apiClient.get(`/disposition-dashboard/report?month=${month}&year=${year}&userId=${userNo}&brCategory=${brCategory}&userOf=${userOf ?? 0}`, {});

            console.log(response);

            if (response.success) {
                setAgentChartData({
                    labels: response.data.chart1.labels,
                    datasets: response.data.chart1.data
                });
                setDispositionChartData({
                    labels: response?.data?.chart2?.labels,
                    datasets: response?.data?.chart2?.data
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
        <div className="page-roles">
            <div className="page-header">
                <h1 className="page-title">Disposition Report</h1>
            </div>
            <div className="card p-4 shadow border-0">
                <div className="row align-items-center g-3 ">
                    <div className="col-12 col-lg-6">
                        <div className="d-flex flex-column flex-md-row align-items-md-center gap-2">
                            <label className="form-label mb-0">
                                Select Month & Year:
                            </label>
                            <select className="form-select"
                                style={{ maxWidth: '280px' }}
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
                <div className="row g-3 mt-1">
                    <div className="col-12">
                        <ChartCard
                            title="Unique Agents Adding Disposition"
                            subtitle="Daily unique agent activity"
                        >
                            <div
                                className="echart-container"
                                ref={gradientArea1}
                                style={{ width: '100%', height: 'clamp(260px, 40vh, 430px)' }}
                            />
                        </ChartCard>
                    </div>
                    <div className="col-12">
                        <ChartCard
                            title="Dispositions Added in a Day"
                            subtitle="Daily disposition volume"
                        >
                            <div
                                className="echart-container"
                                ref={gradientArea2}
                                style={{ width: '100%', height: 'clamp(260px, 40vh, 430px)' }}
                            />
                        </ChartCard>
                    </div>
                </div>
                <div className="mt-3 card shadow border-0">
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
                                columns={tableHeader}
                                pageSize={10}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FrmNewDashboard2;