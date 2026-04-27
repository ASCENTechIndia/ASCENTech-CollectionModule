import { Link } from "react-router-dom";
import { useRef, useEffect, useState, useCallback } from "react";
import * as echarts from 'echarts'
import ReusableDataGrid from '../../components/ReusableDataGrid'
import apiClient from "../../services/apiClient";
import { useAuth } from '../../context/AuthContext';
import { useForm } from "react-hook-form";
import { useNotification } from "../../context/useNotification";
// import Chart from 'chart.js/auto'
import Chart from "react-apexcharts";

const DailyVisitNew = () => {
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
        watch,
        setValue
    } = useForm({
        defaultValues: {
            mode: "onblur",
            reValidateMode: "onblur",
            fromDate: startOfMonth,
            toDate: today
        }
    });
    const [dashboardData, setDashboardData] = useState(null);
    const fromDateValue = watch('fromDate')
    const toDateValue = watch('toDate')

    useEffect(() => {
        if (fromDateValue && toDateValue && toDateValue < fromDateValue) {
            setValue('toDate', fromDateValue, { shouldValidate: true, shouldDirty: true });
        }
    }, [fromDateValue, toDateValue, setValue]);

    function ChartCard({ title, children, subtitle }) {
        return (
            <div className="card h-100 shadow border-0">
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

    const totalAccountsData = useChart((context) => new Chart(context, {
        type: 'doughnut',
        data: {
            labels: ['Allocated', 'Unallocated'],
            datasets: [{
                data: [
                    dashboardData?.allocation?.allocatedAccounts || 0,
                    dashboardData?.allocation?.unallocatedAccounts || 0
                ],
                backgroundColor: [commonColors.success, commonColors.danger],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.label}: ${context.parsed}`
                    }
                },
                datalabels: {
                    color: '#000',
                    font: { weight: 'bold' }
                }
            }
        }
    }));

    const totalVisitsData = useChart((context) => new Chart(context, {
        type: 'doughnut',
        data: {
            labels: ['Visited', 'Not Visited'],
            datasets: [{
                data: [
                    dashboardData?.allocation?.visitedAccounts || 0,
                    dashboardData?.allocation?.nonVisitedAccounts || 0
                ],
                backgroundColor: [commonColors.accent, commonColors.warning],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.label}: ${context.parsed}`
                    }
                },
                datalabels: {
                    color: '#000',
                    font: { weight: 'bold' }
                }
            }
        }
    }));

    const fosAssignedData = useChart((context) => new Chart(context, {
        type: 'pie',
        data: {
            labels: ['Allocated Account %', 'Unallocated Account %'], datasets: [{
                data: [dashboardData?.allocation?.fosAssignedPercent || 0,
                Math.max(0, 100 - (dashboardData?.allocation?.fosAssignedPercent || 0)),], backgroundColor: [commonColors.accent, commonColors.success, commonColors.warning, commonColors.info]
            }]
        },
        options: { responsive: true, maintainAspectRatio: false },
    }));

    const ptpConversionData = useChart((context) => new Chart(context, {
        type: 'pie',
        data: {
            labels: ['PTP Conversion Percent', 'Non-PTP Conversion Percent'],
            datasets: [{
                data: [
                    dashboardData?.ptp?.ptpConversionPercent || 0,
                    Math.max(0, 100 - (dashboardData?.ptp?.ptpConversionPercent || 0))
                ],
                backgroundColor: ['#8b5cf6', 'rgba(139, 92, 246, 0.15)'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: { size: 13, weight: '500' },
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percent = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value.toFixed(2)}% (${percent}% of total)`;
                        }
                    }
                }
            }
        },
    }));

    const dealSourcesOptions = {
        series: [dashboardData?.ptp?.ptpConversionPercent || 0,
        Math.max(0, 100 - (dashboardData?.ptp?.ptpConversionPercent || 0))],
        chart: {
            type: 'donut',
            height: 240
        },
        labels: ['PTP Conversion Percent', 'Non-PTP Conversion Percent'],
        colors: [
            'var(--accent-color)',
            'var(--success-color)',
            // 'var(--warning-color)',
            // 'var(--info-color)'
        ],
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total',
                            formatter: function () {
                                return '100%';
                            }
                        }
                    }
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        stroke: {
            width: 0
        }
    };


    const sunburst = useEChart(() => {
        const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
        const isMobile = width < 576;
        const isTablet = width >= 576 && width < 992;

        return {
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c}',
                padding: [4, 8],
                textStyle: {
                    fontSize: isMobile ? 10 : 12,
                    lineHeight: isMobile ? 10 : 12
                },
                extraCssText: `
            max-width:${isMobile ? '110px' : '140px'};
        white-space:normal;
        border-radius:4px;
        max-height: ${isMobile ? '42px' : '56px'};
        `
            },
            graphic: {
                type: 'text',
                left: 'center',
                top: 'center',
                style: {
                    text: `Total\n${dashboardData?.dispositionSunburst?.total ?? 0}`,
                    textAlign: 'center',
                    fill: '#111827',
                    fontSize: isMobile ? 14 : isTablet ? 17 : 20,
                    fontWeight: 'bold'
                }
            },
            series: [{
                radius: isMobile ? [0, '72%'] : isTablet ? [0, '82%'] : [0, '90%'],
                type: 'sunburst',
                label: {
                    show: true,
                    formatter: '{b}',
                    fontSize: isMobile ? 8 : isTablet ? 9 : 10,
                    overflow: 'truncate',
                    width: isMobile ? 54 : isTablet ? 66 : 80
                },
                labelLayout: {
                    hideOverlap: true
                },
                itemStyle: {
                    borderWidth: isMobile ? 0.5 : 1,
                    borderColor: '#fff'
                },
                levels: [
                    {},
                    {
                        label: {
                            rotate: 0,
                            align: 'center',
                            verticalAlign: 'middle',
                            fontSize: isMobile ? 8 : 9
                        },
                    },
                    {
                        label: {
                            rotate: isMobile ? 0 : 'radial',
                            fontSize: isMobile ? 8 : 9
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
        }
    })

    const fetchDailyVisitData = useCallback(async (values) => {
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
    }, [apiUserId, showError]);

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

    // useEffect(() => {
    //     if (userId) {
    //         fetchDailyVisitData({
    //             fromDate: startOfMonth,
    //             toDate: today,
    //         });
    //     }
    // }, [userId, fetchDailyVisitData, startOfMonth, today]);

    //  useEffect(() => {
    //     if (!fromDateValue || !toDateValue) return;

    //     const from = new Date(fromDateValue);
    //     const to = new Date(toDateValue);
    //     const todayDate = new Date(today);

    //     const diffDays = (to - from) / (1000 * 60 * 60 * 24);

    //     // ❌ Only show errors AFTER both selected
    //     if (to > todayDate) {
    //         showError("To Date: Future dates are not allowed");
    //         return;
    //     }

    //     if (from > todayDate) {
    //         showError("From Date: Future dates are not allowed");
    //         return;
    //     }

    //     if (diffDays < 0) {
    //         showError("To Date cannot be before From Date");
    //         return;
    //     }

    //     if (diffDays > 30) {
    //         showError("Date range cannot exceed 30 days");
    //         return;
    //     }

    //     fetchDailyVisitData({
    //     fromDate: toInputDate(from),
    //     toDate: toInputDate(to)
    // });

    // }, [fromDateValue, toDateValue]);

    useEffect(() => {
        if (!fromDateValue || !toDateValue) return;

        const from = new Date(fromDateValue);
        const to = new Date(toDateValue);
        const todayDate = new Date(today);

        const diffDays = (to - from) / (1000 * 60 * 60 * 24);

        // if (to > todayDate || from > todayDate || diffDays < 0 || diffDays > 30) {
        //     return; // stop invalid calls
        // }

        if (to > todayDate) {
            showError("To Date: Future dates are not allowed");
            return;
        }

        if (from > todayDate) {
            showError("From Date: Future dates are not allowed");
            return;
        }

        if (diffDays < 0) {
            showError("To Date cannot be before From Date");
            return;
        }

        if (diffDays > 30) {
            showError("Date range cannot exceed 30 days");
            return;
        }

        fetchDailyVisitData({
            fromDate: fromDateValue, // already correct format
            toDate: toDateValue
        });

    }, [fromDateValue, toDateValue]);
    const chart1Options = {
        chart: {
            type: "donut",
        },
        labels: ["Allocated", "Unallocated"],
        colors: [
            "var(--accent-color)",
            "var(--success-color)",
        ],
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total',
                            formatter: function () {
                                return `${dashboardData?.allocation?.totalAccounts || 0}`;
                            }
                        }
                    }
                }
            }
        },
        legend: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 0
        }
    };

    const chart1Series = [dashboardData?.allocation?.allocatedAccounts || 0, dashboardData?.allocation?.unallocatedAccounts || 0];

    const chart2Options = {
        chart: {
            type: "donut",
        },
        labels: ["Visited", "Not Visited"],
        colors: [
            "var(--warning-color)",
            "var(--info-color)",
        ],
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total',
                            formatter: function () {
                                return `${dashboardData?.allocation?.allocatedAccounts || 0}`;
                            }
                        }
                    }
                }
            }
        },
        legend: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 0
        }
    };

    const chart2Series = [dashboardData?.allocation?.visitedAccounts || 0, dashboardData?.allocation?.nonVisitedAccounts || 0];
    const ptpOptions = {
        chart: {
            type: 'pie',
            height: 280,
            fontFamily: 'inherit'
        },
        labels: ['PTP Conversion', 'Non-PTP Conversion'],
        colors: ['#8b5cf6', '#e5e7eb'],
        legend: {
            position: 'bottom'
        },
        stroke: {
            width: 0
        }
    };

    const ptpSeries = [
        dashboardData?.ptp?.ptpConversionPercent || 0,
        Math.max(0, 100 - (dashboardData?.ptp?.ptpConversionPercent || 0))
    ];
    return (
        <div className="page-roles p-4">
            <div className="page-users-view">
                <div className="page-header uv-page-header">
                    <div>
                        <h1 className="page-title">Daily Visit Dashboard</h1>
                        <nav className="breadcrumb">
                            <span className="breadcrumb-item">Home</span>
                            <span className="breadcrumb-item">Dashboard</span>
                            <span className="breadcrumb-item active">Daily Visit Dashboard</span>
                        </nav>
                    </div>
                    <div className="d-flex gap-2">
                        <div className="d-flex flex-column align-items-md-center">
                            <label className="form-label mb-0">
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
                            // onChange={(e) => {
                            //     setValue("fromDate", e);
                            // }}
                            />
                        </div>
                        <div className="d-flex flex-column align-items-md-center">
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
                                            // showError("Future dates are not allowed");
                                            // return;
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
                                min={fromDateValue || undefined}
                                max={today}
                                className="form-control"
                            />
                        </div>
                        {/* {errors.toDate && <div className="col-12 col-md-3">
                            {errors.toDate && (
                                <p className="text-danger small mt-1 d-flex align-items-center gap-1">
                                    {errors.toDate.message}
                                </p>
                            )}
                        </div>} */}
                        {/* <div className="d-flex align-items-end">
                            <button type="submit" className="btn btn-primary">
                                Search
                            </button>
                        </div> */}
                    </div>


                </div>
                {/* <div className="card p-4 shadow border-0 d-flex flex-column flex-md-row gap-3 align-items-stretch"> */}
                <div className="row g-3">
                    <div className="col-12 col-md-4 d-flex">
                        <div className="card w-100 h-100">
                            <div className="card-header">
                                <h5 className="card-title">Total Visits</h5>
                            </div>

                            <div className="card-body">
                                {/* ✅ REAL CHART */}
                                <Chart
                                    options={chart1Options}
                                    series={chart1Series}
                                    type="donut"
                                    height={220}
                                />

                                <div className="mt-4">

                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <span
                                                className="badge-dot"
                                                style={{ backgroundColor: "var(--accent-color)" }}
                                            ></span>
                                            <span>Allocated Account</span>
                                        </div>
                                        <span className="fw-medium">{dashboardData?.allocation?.allocatedAccounts || 0}</span>
                                    </div>

                                    {/* Audio */}
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <span
                                                className="badge-dot"
                                                style={{ backgroundColor: "var(--success-color)" }}
                                            ></span>
                                            <span>Unallocated Account</span>
                                        </div>
                                        <span className="fw-medium">{dashboardData?.allocation?.unallocatedAccounts || 0}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 d-flex">
                        <div className="card w-100 h-100">
                            <div className="card-header">
                                <h5 className="card-title">Visits Details</h5>
                            </div>

                            <div className="card-body d-flex flex-column flex-grow-1">
                                {/* ✅ REAL CHART */}
                                <Chart
                                    options={chart2Options}
                                    series={chart2Series}
                                    type="donut"
                                    height={220}
                                />

                                <div className="mt-4">
                                    {/* Electronics */}
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <span
                                                className="badge-dot"
                                                style={{ backgroundColor: "var(--warning-color)" }}
                                            ></span>
                                            <span>Visited</span>
                                        </div>
                                        <span className="fw-medium">{dashboardData?.allocation?.visitedAccounts || 0}</span>
                                    </div>

                                    {/* Audio */}
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <span
                                                className="badge-dot"
                                                style={{ backgroundColor: "var(--info-color)" }}
                                            ></span>
                                            <span>Not Visited</span>
                                        </div>
                                        <span className="fw-medium">{dashboardData?.allocation?.nonVisitedAccounts || 0}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 d-flex">
                        <div className="card w-100 h-100">
                            <div className="card-header">
                                <h5 className="card-title mb-0">FOS Assigned %</h5>
                            </div>
                            <div className="card-body d-flex flex-column flex-grow-1">
                                <div className="funnel-chart justify-content-center">
                                    <div className="funnel-stage" style={{ "--funnel-width": `${dashboardData?.allocation?.fosAssignedPercent || 0}%` }}>
                                        <div className="funnel-bar primary"></div>
                                        <div className="funnel-info">
                                            <span className="funnel-name">Allocated %</span>
                                            <span className="funnel-value">{dashboardData?.allocation?.fosAssignedPercent || 0}%</span>
                                        </div>
                                    </div>
                                    <div className="funnel-stage" style={{ "--funnel-width": `${Math.max(0, 100 - (dashboardData?.allocation?.fosAssignedPercent || 0))}%` }}>
                                        <div className="funnel-bar info"></div>
                                        <div className="funnel-info">
                                            <span className="funnel-name">Unallocated %</span>
                                            <span className="funnel-value">{`${Math.max(0, 100 - (dashboardData?.allocation?.fosAssignedPercent || 0))}%`}</span>
                                            {/* <span className="funnel-rate">65%</span> */}
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="funnel-stage" style={{ "--funnel-width": "35%" }}>
                  <div className="funnel-bar warning"></div>
                  <div className="funnel-info">
                    <span className="funnel-name">MQL</span>
                    <span className="funnel-value">15,848</span>
                    <span className="funnel-rate">54%</span>
                  </div>
                </div>
                <div className="funnel-stage" style={{ "--funnel-width": "18%" }}>
                  <div className="funnel-bar success"></div>
                  <div className="funnel-info">
                    <span className="funnel-name">SQL</span>
                    <span className="funnel-value">8,150</span>
                    <span className="funnel-rate">51%</span>
                  </div>
                </div>
                <div className="funnel-stage" style={{ "--funnel-width" : "8%" }}>
                  <div className="funnel-bar danger"></div>
                  <div className="funnel-info">
                    <span className="funnel-name">Customers</span>
                    <span className="funnel-value">3,622</span>
                    <span className="funnel-rate">44%</span>
                  </div>
                </div> */}
                                <div className="mt-auto">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <span
                                                className="badge-dot"
                                                style={{ backgroundColor: "var(--info-color)" }}
                                            ></span>
                                            <span>Allocated</span>
                                        </div>
                                        <span className="fw-medium">{dashboardData?.allocation?.totalAssignedFOS || 0}</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <span
                                                className="badge-dot"
                                                style={{ backgroundColor: "var(--info-color)" }}
                                            ></span>
                                            <span>Unallocated</span>
                                        </div>
                                        <span className="fw-medium">{dashboardData?.allocation?.totalUnassignedFOS_alt || 0}</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mt-3 p-4">
                    <div className="page-dashboard row g-3 mb-3">
                        {summaryCards.map((card, index) => {
                            const colors = ['#3b82f6', '#22c55e', '#f59e0b', '#06b6d4', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];
                            const bgColors = ['#eff6ff', '#f0fdf4', '#fffbeb', '#ecf8fc', '#fef2f2', '#f5f3ff', '#fdf2f8', '#f0fdfa'];
                            const color = colors[index % colors.length];
                            const bgColor = bgColors[index % bgColors.length];
                            const icons = ['bi-graph-up', 'bi-people-fill', 'bi-lightning-fill', 'bi-calendar-check', 'bi-currency-rupee', 'bi-cash-coin', 'bi-percent', 'bi-check-circle-fill'];
                            const icon = icons[index % icons.length];
                            return (
                                <div class="col-md-3 col-12 d-flex">
                                    <div class="card fx-mini-stat h-100" style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                        <div class="card-body">
                                            <span class="fx-mini-icon revenue"><i class={`bi ${icon}`} style={{ fontSize: '24px', color: color }}></i></span>
                                            <span class="fx-mini-label">{card.label}</span>
                                            <span class="fx-mini-value">{card.value}</span>
                                            {/* <span class="fx-mini-meta positive"><i class="bi bi-arrow-up"></i> 7.1%</span> */}
                                        </div>
                                    </div>
                                </div>)
                        })}
                    </div>
                </div>
                <div className="card mt-3 p-4">
                    <div className="row g-3">
                        <div className="col-12 col-md-6">
                            <div className="card h-100">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="card-title mb-0">{dashboardData?.dateRange?.ptpDateRangeLabel || 'PTP spans from - to -'}</h5>
                                    {/* <a href="#" class="btn btn-sm btn-link">View All</a> */}
                                </div>
                                <div className="card-body p-0">
                                    <div className="deal-list">
                                        <div className="deal-item" style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>

                                            <div className="d-flex align-items-center gap-3 deal-info">
                                                <div className="product-img bg-primary-light rounded" style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}>
                                                    <i className="bi bi-bar-chart text-primary"></i>
                                                </div>
                                                <div>
                                                    <div className="fw-medium">Total</div>
                                                    <small className="text-muted">PTP Count</small>
                                                </div>
                                            </div>
                                            <div className="deal-meta">
                                                <span className="deal-amount">{formatNumber(dashboardData?.ptp?.totalPtpCount)}</span>
                                                {/* <span class="badge bg-success-subtle text-success">Won</span> */}
                                            </div>
                                        </div>
                                        <div className="deal-item" style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                            <div className="d-flex align-items-center gap-3 deal-info">
                                                <div className="product-img bg-primary-light rounded" style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}>
                                                    <i className="bi bi-hourglass-split text-warning"></i>
                                                </div>
                                                <div>
                                                    <div className="fw-medium">Pending</div>
                                                    <small className="text-muted">PTP Count</small>
                                                </div>
                                            </div>
                                            <div className="deal-meta">
                                                <span className="deal-amount">{formatNumber(dashboardData?.ptp?.pendingPtpCount)}</span>
                                                {/* <span class="badge bg-success-subtle text-success">Won</span> */}
                                            </div>
                                        </div>
                                        <div className="deal-item" style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                            <div className="d-flex align-items-center gap-3 deal-info">
                                                <div className="product-img bg-primary-light rounded" style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}>
                                                    <i className="bi bi-check-circle text-success"></i>
                                                </div>
                                                <div>
                                                    <div className="fw-medium">Paid</div>
                                                    <small className="text-muted">PTP Count</small>
                                                </div>
                                            </div>
                                            <div className="deal-meta">
                                                <span className="deal-amount">{formatNumber(dashboardData?.ptp?.paidPtpCount)}</span>
                                                {/* <span class="badge bg-success-subtle text-success">Won</span> */}
                                            </div>
                                        </div>
                                        <div className="deal-item" style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                            <div className="d-flex align-items-center gap-3 deal-info">
                                                <div className="product-img bg-primary-light rounded" style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}>
                                                    <i className="bi bi-x-circle text-danger"></i>
                                                </div>
                                                <div>
                                                    <div className="fw-medium">Broken</div>
                                                    <small className="text-muted">PTP Count</small>
                                                </div>
                                            </div>
                                            <div className="deal-meta">
                                                <span className="deal-amount">{formatNumber(dashboardData?.ptp?.brokenPtpCount)}</span>
                                                {/* <span class="badge bg-success-subtle text-success">Won</span> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-12 col-md-6">
                            <div className="col-12 col-md-6 d-flex">
                                <ChartCard title="PTP Conversion Percent">
                                    <div style={{ height: 'clamp(220px, 32vw, 300px)', width: '100%' }}>
                                        <canvas ref={ptpConversionData} />
                                    </div>
                                </ChartCard>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6 col-12">
                            <div className="card h-100">
                                <div className="card-header">
                                    <h5 className="card-title">PTP Conversion</h5>
                                </div>
                                <div className="card-body">
                                    <Chart
                                        options={ptpOptions}
                                        series={ptpSeries}
                                        type="pie"
                                        height={280}
                                    />
                                </div>
                            </div>
                        </div> */}
                        <div className="col-12 col-md-6">
                            <div className="card h-100">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">PTP Conversion Percent</h5>
                                </div>
                                <div className="card-body">
                                    <Chart
                                        options={dealSourcesOptions}
                                        series={dealSourcesOptions.series}
                                        type="donut"
                                        height={240}
                                    />
                                    <div className="chart-legend mt-3">
                                        <div className="chart-legend-item">
                                            <span className="legend-dot" style={{ backgroundColor: "var(--accent-color)" }}></span>
                                            <span className="legend-label">PTP Conversion</span>
                                            <span className="legend-value">{`${dashboardData?.ptp?.ptpConversionPercent || 0}`}%</span>
                                        </div>
                                        <div className="chart-legend-item">
                                            <span className="legend-dot" style={{ backgroundColor: "var(--success-color)" }}></span>
                                            <span className="legend-label">Non-PTP Conversion</span>
                                            <span className="legend-value">{`${Math.max(0, 100 - (dashboardData?.ptp?.ptpConversionPercent || 0))}`}%</span>
                                        </div>
                                        {/* <div className="legend-item">
                                            <span className="legend-dot" style={{ backgroundColor: "var(--warning-color)" }}></span>
                                            <span className="legend-label">Website</span>
                                            <span className="legend-value">22%</span>
                                        </div>
                                        <div className="legend-item">
                                            <span className="legend-dot" style={{ backgroundColor: "var(--info-color)" }}></span>
                                            <span className="legend-label">Social</span>
                                            <span className="legend-value">15%</span>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card page-dashboard mt-3 p-3">
                    <div className="row g-3"> {/* 👈 use gutters */}
                        {fullPaymentCards.map((card, index) => (
                            <div className="col-12 col-md-4 d-flex" key={card.label}>
                                <div
                                    className="fx-kpi-item w-100 h-100"
                                    style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
                                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                                >
                                    <span className="fx-kpi-label">{card.label}</span>
                                    <span className="fx-kpi-value">{card.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-3 p-1">
                        <ChartCard title="Sunburst Chart">
                            <div className="echart-container" ref={sunburst} style={{
                                width: "100%",
                                height: "clamp(300px, 55vh, 680px)"
                            }} />
                        </ChartCard>
                    </div>
                </div>
            </div>
        </div >

    )
};

export default DailyVisitNew;