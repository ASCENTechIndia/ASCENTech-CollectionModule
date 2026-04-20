import { useEffect, useMemo, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { AlertCircle, Search } from 'lucide-react';
import apiClient from '../../services/apiClient';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/useNotification';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto'
import * as echarts from 'echarts'
// import { error } from 'echarts/types/src/util/log.js';

const FrmDailyVisit = () => {
    const { user } = useAuth();
    const userId = user?.userId;

    const { showError } = useNotification();
    const toInputDate = (date) => {
        const tzOffset = date.getTimezoneOffset() * 60000;
        return new Date(date.getTime() - tzOffset).toISOString().split('T')[0];
    };
    const today = toInputDate(new Date());
    const startOfMonth = (() => {
        const date = new Date();
        date.setDate(1);
        return toInputDate(date);
    })();
    const apiUserId = String(userId || '').replace(/\D/g, '');
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({
        defaultValues: {
            fromDate: startOfMonth,
            toDate: today
        }
    });
    const [dashboardData, setDashboardData] = useState(null);
    const fromDateValue = watch('fromDate')
    const toDateValue = watch('toDate');

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

    const commonColors = {
        accent: '#3b82f6',
        success: '#22c55e',
        warning: '#f59e0b',
        info: '#06b6d4',
        danger: '#ef4444',
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

    const commonGrid = { left: '3%', right: '4%', bottom: '3%', containLabel: true }
    const axisStyle = { color: colors.muted }

    const totalAccountsData = useChart((context) => new Chart(context, {
        type: 'doughnut',
        data: {
            labels: ['Allocated', 'Unallocated'], datasets: [{
                data: [dashboardData?.allocation?.allocatedAccounts || 0,
                dashboardData?.allocation?.unallocatedAccounts || 0], backgroundColor: [commonColors.success, 'rgba(148,163,184,.2)'], borderWidth: 0
            }]
        },
        options: { responsive: true, cutout: '75%' },
    }));

    const totalVisitsData = useChart((context) => new Chart(context, {
        type: 'doughnut',
        data: {
            labels: ['Visited', 'Not Visited'], datasets: [{
                data: [dashboardData?.allocation?.visitedAccounts || 0,
                dashboardData?.allocation?.nonVisitedAccounts || 0], backgroundColor: [commonColors.success, 'rgba(148,163,184,.2)'], borderWidth: 0
            }]
        },
        options: { responsive: true, cutout: '75%' },
    }));

    const fosAssignedData = useChart((context) => new Chart(context, {
        type: 'pie',
        data: {
            labels: ['Allocated Account %', 'Unallocated Account %'], datasets: [{
                data: [dashboardData?.allocation?.fosAssignedPercent || 0,
                Math.max(0, 100 - (dashboardData?.allocation?.fosAssignedPercent || 0)),], backgroundColor: [commonColors.accent, commonColors.success, commonColors.warning, commonColors.info]
            }]
        },
        options: { responsive: true },
    }));

    const ptpConversionData = useChart((context) => new Chart(context, {
        type: 'pie',
        data: {
            labels: ['PTP Conversion Percent', 'Non-PTP Conversion Percent'], datasets: [{
                data: [dashboardData?.ptp?.ptpConversionPercent || 0,
                Math.max(0, 100 - (dashboardData?.allocation?.ptpConversionPercent || 0))], backgroundColor: [commonColors.accent, commonColors.warning, commonColors.success, commonColors.info]
            }]
        },
        options: { responsive: true },
    }));


    const sunburst = useEChart(() => ({
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}',
            padding: [2, 6],
            textStyle: {
                fontSize: 12,
                lineHeight: 12
            },
            extraCssText: `
            max-width:120px;
        white-space:normal;
        border-radius:4px;
        max-height: 50px;
        `
        },
        graphic: {
            type: 'text',
            left: 'center',
            top: 'center',
            style: {
                text: `Total\n${dashboardData?.dispositionSunburst?.total}`,
                textAlign: 'center',
                fill: '#111827',
                fontSize: 20,
                fontWeight: 'bold'
            }
        },
        series: [{
            radius: [0, '90%'],
            type: 'sunburst',
            label: {
                show: true,
                formatter: '{b}',
                fontSize: 10,
                overflow: "break",
                width: 80
            },
            labelLayout: {
                hideOverlap: false
            },
            itemStyle: {
                borderWidth: 1,
                borderColor: '#fff'
            },
            levels: [
                {},
                {
                    label: {
                        rotate: 0,
                        align: "center",
                        verticalAlign: "middle"
                    },
                },
                {
                    label: {
                        rotate: "radial"
                    }
                }
            ],
            data: [{
                name: "Total",
                value: dashboardData?.dispositionSunburst?.total,
                itemStyle: {
                    color: 'rgba(254, 254, 254, 1)'
                },
                children: [
                    {
                        name: "REACT\nED",
                        value: dashboardData?.dispositionSunburst?.reacted,
                        itemStyle: {
                            color: 'rgba(251, 226, 130, 1)'
                            // color: 'rgba(212, 185, 209, 1)'
                        },
                        children: [
                            {
                                name: "PAYMENT\nCOLLECTED",
                                value: dashboardData?.dispositionSunburst?.collected,
                                itemStyle: { color: 'rgba(247, 181, 165, 1)' },
                                children: [
                                    {
                                        name: "FULLY\nPAID",
                                        value: dashboardData?.dispositionSunburst?.cf,
                                        itemStyle: {
                                            color: 'rgba(167, 103, 182, 1)'
                                        }
                                    },
                                    {
                                        name: "PARTIAL\nLY\nPAID",
                                        value: dashboardData?.dispositionSunburst?.cp,
                                        itemStyle: {
                                            color: 'rgba(160, 165, 187, 1)'
                                        }
                                    }
                                ]
                            },
                            {
                                name: "PROMISE\nTO\nPAY",
                                value: dashboardData?.dispositionSunburst?.ptp,
                                itemStyle: {
                                    color: 'rgba(212, 185, 209, 1)',
                                },
                                children: [
                                    {
                                        name: "PTP\nON\nFIELD",
                                        value: dashboardData?.dispositionSunburst?.ptp,
                                        itemStyle: {
                                            color: 'rgba(183, 157, 178, 1)'
                                        }
                                    }
                                ]
                            },
                            {
                                name: "BORROWER\nABUSIVE/\nAGGRES\nSIVE",
                                value: dashboardData?.dispositionSunburst?.borrowerAbusive,
                                itemStyle: {
                                    color: 'rgba(155, 136, 129, 1)'
                                },
                                children: [
                                    {
                                        name: "BORROWER\nABUSIVE/\nAGGRES\nSIVE",
                                        value: dashboardData?.dispositionSunburst?.borrowerAbusive,
                                        itemStyle: {
                                            color: 'rgba(155, 136, 129, 1)'
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: "NON-\nCONTACT\nABLE",
                        value: dashboardData?.dispositionSunburst?.nonReacted,
                        itemStyle: {
                            color: 'rgb(249, 75, 75)'
                        },
                        children: [
                            {
                                name: "INVALID",
                                value: dashboardData?.dispositionSunburst?.invalid,
                                itemStyle: {
                                    color: 'rgba(250, 198, 4, 1)'
                                },
                                children: [
                                    {
                                        name: "SHORT\nADDRESS",
                                        value: dashboardData?.dispositionSunburst?.shortAddress,
                                        itemStyle: {
                                            color: 'rgba(146, 211, 227, 1)'
                                        }
                                    },
                                    {
                                        name: "ADDRESS\nNOT\nFOUND",
                                        value: dashboardData?.dispositionSunburst?.addressNotFound,
                                        itemStyle: {
                                            color: 'rgba(63, 200, 200, 1)'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }]
        }],
    }))

    const fetchDailyVisitData = async (values) => {
        if (!apiUserId) {
            showError('User ID is not available');
            return;
        }

        try {
            const response = await apiClient.get('/daily-visit/dashboard', {
                params: {
                    userId: apiUserId,
                    fromDate: values.fromDate,
                    toDate: values.toDate,
                },
            });
            console.log(response.data);
            if (response?.success && response?.data) {
                setDashboardData(response.data);
                return;
            }

            setDashboardData(null);
            showError(response?.message || 'Failed to load daily visit data');
        } catch (error) {
            console.error('Failed to fetch daily visit dashboard:', error);
            setDashboardData(null);
            showError(error?.response?.data?.message || error?.message || 'Failed to load daily visit data');
        }
    };

    const onSubmit = async (values) => {
        fetchDailyVisitData(values);
    }

    const formatNumber = (value) => {
        const num = Number(value || 0);
        return num.toLocaleString('en-IN', { maximumFractionDigits: 2 });
    }

    const formatPercent = (value) => `${Number(value || 0).toFixed(2)}%`;

    const summaryCards = [
        {
            label: 'Total Visit',
            value: formatNumber(dashboardData?.visitStats?.totalVisits),
        },
        {
            label: 'Total Unique Visit',
            value: formatNumber(dashboardData?.visitStats?.uniqueVisits),
        },
        {
            label: 'Intensity (Total Visits / Total Unique Visits)',
            value: formatNumber(dashboardData?.visitStats?.intensity),
        },
        {
            label: 'Avg. Daily Visit Rate (Total Visits / No. of Days)',
            value: formatNumber(dashboardData?.visitStats?.avgDailyVisitRate),
        },
        {
            label: 'Total Collectable Amount',
            value: `₹ ${formatNumber(dashboardData?.collection?.totalCollectableAmount)}`,
        },
        {
            label: 'Total Collected Amount',
            value: `₹ ${formatNumber(dashboardData?.collection?.totalCollectedAmount)}`,
        },
        {
            label: 'Daily Avg. Collection Amt. (Collected Amt. / No. of Days)',
            value: `₹ ${formatNumber(dashboardData?.collection?.dailyAvgCollectionAmount)}`,
        },
        {
            label: 'Collection %',
            value: formatPercent(dashboardData?.collection?.collectionPercent),
        },
    ]

    const ptpCards = [
        {
            label: 'Total PTP Count',
            value: formatNumber(dashboardData?.ptp?.totalPtpCount),
        },
        {
            label: 'Pending PTP Count',
            value: formatNumber(dashboardData?.ptp?.pendingPtpCount),
        },
        {
            label: 'Paid PTP Count',
            value: formatNumber(dashboardData?.ptp?.paidPtpCount),
        },
        {
            label: 'Broken PTP Count',
            value: formatNumber(dashboardData?.ptp?.brokenPtpCount),
        },
    ]

    const fullPaymentCards = [
        {
            label: 'Account Paid Via Visit',
            value: formatNumber(dashboardData?.fullPayment?.accountsPaidViaVisit),
        },
        {
            label: 'Total Full Paid Amount',
            value: `₹ ${formatNumber(dashboardData?.fullPayment?.totalFullPaidAmount)}`,
        },
        {
            label: 'Total Full Paid Account',
            value: formatNumber(dashboardData?.fullPayment?.totalFullPaidAccounts),
        },
    ]

    useEffect(() => {
        if (userId) {
            fetchDailyVisitData({
                fromDate: startOfMonth,
                toDate: today,
            });
        }
    }, [userId]);
    return (
        <div className="main-content">
            <div className="page-header">
                <h1 className="page-title">Daily Visit Report</h1>
                <nav className="breadcrumb">
                    <Link to="/" className="breadcrumb-item">
                        Home
                    </Link>
                    <span className="breadcrumb-item">Dashboard</span>
                    <span className="breadcrumb-item active">Daily Visit Report</span>
                </nav>
            </div>
            <div className="card p-4">
                <h3 className="card-title">Select Date Range</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row g-3 align-items-center mt-3 pb-4">

                        {/* From Date */}
                        <div className="col-12 col-md-3">
                            <div className="d-flex flex-column flex-md-row align-items-md-center gap-2">
                                <label className="form-label mb-0 fw-medium">
                                    From Date:
                                </label>

                                <input
                                    type="date"
                                    {...register('fromDate', {
                                        required: 'From Date is required',
                                        validate: (value) => {
                                            if (!value) return true;
                                            if (value > today) {
                                                return 'Future dates are not allowed';
                                            }
                                            return true;
                                        }
                                    })}
                                    max={today}
                                    className="form-control"
                                />
                            </div>

                        </div>

                        {/* To Date */}
                        <div className="col-12 col-md-3">
                            <div className="d-flex flex-column flex-md-row align-items-md-center gap-2">
                                <label className="form-label mb-0 fw-medium">
                                    To Date:
                                </label>

                                <input
                                    type="date"
                                    {...register('toDate', {
                                        required: 'To Date is required',
                                        validate: (value) => {
                                            if (!value) return true;

                                            if (value > today) {
                                                return 'Future dates are not allowed';
                                            }

                                            if (!fromDateValue) return true;

                                            const from = new Date(fromDateValue);
                                            const to = new Date(value);

                                            const diffDays = (to - from) / (1000 * 60 * 60 * 24);

                                            if (diffDays < 0) {
                                                return 'To Date cannot be before From Date';
                                            }

                                            if (diffDays > 30) {
                                                return 'To Date cannot be more than 30 days after From Date';
                                            }

                                            return true;
                                        }
                                    })}
                                    max={today}
                                    className="form-control"
                                />
                            </div>


                        </div>
                        {errors.toDate && <div className="col-12 col-md-3">
                            {errors.toDate && (
                                <p className="text-danger small mt-1 d-flex align-items-center gap-1">
                                    {errors.toDate.message}
                                </p>
                            )}
                        </div>}
                        {/* Submit Button */}
                        <div className="col-12 col-md-3">
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Submit
                            </button>
                        </div>
                        <div className="card mt-3">
                            <div className="row g-4 my-2">
                                <div className="col-lg-4">
                                    <div className="position-relative">
                                        <ChartCard title="Total Accounts">
                                            <canvas ref={totalAccountsData}></canvas>
                                            <div className="chart-center-text">
                                                <div className="chart-center-value">75%</div>
                                                <div className="chart-center-label">Complete</div>
                                            </div>
                                        </ChartCard>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="position-relative d-flex justify-content-center align-items-center">
                                        <ChartCard title="Visit Details">
                                            <canvas ref={totalVisitsData}></canvas>
                                            <div className="chart-center-text position-absolute top-50 start-50 translate-middle text-center">
                                                <div className="chart-center-value">75%</div>
                                                <div className="chart-center-label">Complete</div>
                                            </div>
                                        </ChartCard>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <ChartCard title="FOS Assigned %">
                                        <canvas ref={fosAssignedData} />
                                    </ChartCard>
                                </div>
                            </div>
                            <div className="row g-4 mt-3">
                                {summaryCards.map(card => (
                                    <div className="col-md-3 col-12 d-flex">
                                        <div className="card widget-icon-left-stat h-100">
                                            <div className="card-body d-flex flex-row">

                                                <div className="widget-icon-left-icon primary">
                                                    <i className="bi bi-person-lines-fill" />
                                                </div>

                                                <div className="widget-icon-left-content">
                                                    <span className="widget-icon-left-value">{card.value}</span>
                                                    <span className="widget-icon-left-label">{card.label}</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4 fw-semibold fs-6">
                                {dashboardData?.dateRange?.ptpDateRangeLabel || 'PTP spans from - to -'}
                            </p>
                            <div className="row g-4 align-items-stretch">

                                {/* LEFT SIDE */}
                                <div className="col-12 col-md-6 d-flex">
                                    <div className="row g-3 w-100 align-items-stretch">
                                        {ptpCards.map(item => (
                                            <div className="col-12 col-md-6 d-flex" key={item.label}>
                                                <div className="card widget-icon-left-stat h-100 w-100">
                                                    <div className="card-body">
                                                        <div className="widget-icon-left-icon primary">
                                                            <i className="bi bi-person-lines-fill" />
                                                        </div>
                                                        <div className="widget-icon-left-content">
                                                            <span className="widget-icon-left-value">{item.value}</span>
                                                            <span className="widget-icon-left-label">{item.label}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* RIGHT SIDE */}
                                <div className="col-12 col-md-6 d-flex">
                                    <ChartCard title="PTP Conversion Percent">
                                        <canvas ref={ptpConversionData} />
                                    </ChartCard>
                                </div>

                            </div>
                            <div className="row g-4 mt-3 justify-content-around">
                                {fullPaymentCards.map(card => (
                                    <div className="col-md-4 col-12">
                                        <div className="card widget-icon-left-stat w-100">
                                            <div key={card.label} className="card-body">
                                                <div className="widget-icon-left-icon primary">
                                                    <i className="bi bi-person-lines-fill" />
                                                </div>
                                                <div className="widget-icon-left-content">
                                                    <span className="widget-icon-left-value">{card.value}</span>
                                                    <span className="widget-icon-left-label">{card.label}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-3 p-1">
                                <ChartCard title="Sunburst Chart">
                                    <div className="echart-container" ref={sunburst} style={{
                                        width: "100%",
                                        height: "80vh"
                                    }} />
                                </ChartCard>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default FrmDailyVisit;