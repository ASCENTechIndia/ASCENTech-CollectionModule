import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AlertCircle, Search } from 'lucide-react';
import apiClient from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';
import DoughnutChart from '../../components/charts/DoughnutChart';
import PieChart from '../../components/charts/PieChart';
import { Card } from '../../components/ui';
import { useNotification } from '../../context/NotificationContext';

function FrmDailyVisit() {
    const { user } = useAuth();
    const { showError } = useNotification();
    const userId = user?.userId;
    const apiUserId = String(userId || '').replace(/\D/g, '');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fromDate: new Date().toISOString().split('T')[0],
            toDate: new Date().toISOString().split('T')[0]
        }
    });

    const [dashboardData, setDashboardData] = useState(null);

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

            if (response?.data?.success && response?.data?.data) {
                setDashboardData(response.data.data);
                return;
            }

            setDashboardData(null);
            showError(response?.data?.message || 'Failed to load daily visit data');
        } catch (error) {
            console.error('Failed to fetch daily visit dashboard:', error);
            setDashboardData(null);
            showError(error?.response?.data?.message || error?.message || 'Failed to load daily visit data');
        }
    };

    useEffect(() => {
        if (userId) {
            fetchDailyVisitData({
                fromDate: new Date().toISOString().split('T')[0],
                toDate: new Date().toISOString().split('T')[0],
            });
        }
    }, [userId]);

    const onSubmit = async (values) => {
        fetchDailyVisitData(values);
    }

    const allocationChartData = useMemo(() => ({
        labels: ['Allocated', 'Unallocated', 'Visited', 'Non Visited'],
        datasets: [{
            label: 'Accounts',
            data: [
                dashboardData?.allocation?.allocatedAccounts || 0,
                dashboardData?.allocation?.unallocatedAccounts || 0,
                dashboardData?.allocation?.visitedAccounts || 0,
                dashboardData?.allocation?.nonVisitedAccounts || 0,
            ],
            backgroundColor: [
                'rgba(59, 130, 246, 0.7)',
                'rgba(239, 68, 68, 0.7)',
                'rgba(34, 197, 94, 0.7)',
                'rgba(249, 115, 22, 0.7)',
            ],
            borderColor: [
                'rgba(59, 130, 246, 1)',
                'rgba(239, 68, 68, 1)',
                'rgba(34, 197, 94, 1)',
                'rgba(249, 115, 22, 1)',
            ],
            borderWidth: 2,
        }],
    }), [dashboardData]);

    const visitChartData = useMemo(() => ({
        labels: ['Total Visits', 'Unique Visits', 'Repeated Visits'],
        datasets: [{
            label: 'Visits',
            data: [
                dashboardData?.visitStats?.totalVisits || 0,
                dashboardData?.visitStats?.uniqueVisits || 0,
                Math.max(0, (dashboardData?.visitStats?.totalVisits || 0) - (dashboardData?.visitStats?.uniqueVisits || 0)),
            ],
            backgroundColor: [
                'rgba(59, 130, 246, 0.7)',
                'rgba(34, 197, 94, 0.7)',
                'rgba(168, 85, 247, 0.7)',
            ],
            borderColor: [
                'rgba(59, 130, 246, 1)',
                'rgba(34, 197, 94, 1)',
                'rgba(168, 85, 247, 1)',
            ],
            borderWidth: 2,
        }],
    }), [dashboardData]);

    const ptpChartData = useMemo(() => ({
        labels: ['Assigned %', 'Remaining %'],
        datasets: [{
            label: 'FOS Assigned %',
            data: [
                dashboardData?.allocation?.fosAssignedPercent || 0,
                Math.max(0, 100 - (dashboardData?.allocation?.fosAssignedPercent || 0)),
            ],
            backgroundColor: [
                'rgba(59, 130, 246, 0.7)',
                'rgba(229, 231, 235, 0.9)',
            ],
            borderColor: [
                'rgba(59, 130, 246, 1)',
                'rgba(209, 213, 219, 1)',
            ],
            borderWidth: 2,
        }],
    }), [dashboardData]);

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
            value: formatNumber(dashboardData?.collection?.totalCollectableAmount),
        },
        {
            label: 'Total Collected Amount',
            value: formatNumber(dashboardData?.collection?.totalCollectedAmount),
        },
        {
            label: 'Daily Avg. Collection Amt. (Collected Amt. / No. of Days)',
            value: formatNumber(dashboardData?.collection?.dailyAvgCollectionAmount),
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
            value: formatNumber(dashboardData?.fullPayment?.totalFullPaidAmount),
        },
        {
            label: 'Total Full Paid Account',
            value: formatNumber(dashboardData?.fullPayment?.totalFullPaidAccounts),
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
                <h1 className="text-2xl font-semibold text-gray-900">Daily Visit Report</h1>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-8">
                <p className="font-semibold text-md">Select Date Range</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 grid-cols-3 gap-6 items-center mt-7">
                        <div className="flex flex-col md:flex-row gap-3">
                            <label className="block text-sm font-medium text-gray-900">
                                From Date:
                            </label>
                            <input
                                type="date"
                                {...register('fromDate', {
                                    required: 'From Date is required',
                                    // validate: (value) => !value || value <= today || 'Future dates are not allowed'
                                })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                            />
                            {errors.fromDate && (
                                <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.fromDate.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col md:flex-row gap-3">
                            <label className="block text-sm font-medium text-gray-900">
                                To Date:
                            </label>
                            <input
                                type="date"
                                {...register('toDate', {
                                    required: 'To Date is required',
                                    // validate: (value) => !value || value <= today || 'Future dates are not allowed'
                                })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                            />
                            {errors.toDate && (
                                <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.toDate.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-7">
                        <div className='w-full'>
                            <Card className="w-full">
                                <div className="p-4 w-full">
                                    <div className="relative w-full">
                                        <DoughnutChart
                                            title='Total Accounts'
                                            data={allocationChartData}
                                            options={{
                                                plugins: {
                                                    legend: { position: 'right' },
                                                },
                                            }}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className='w-full'>
                            <Card className="w-full">
                                <div className="p-4 w-full">
                                    <div className="relative w-full">
                                        <DoughnutChart
                                            title='Visit Details'
                                            data={visitChartData}
                                            options={{
                                                plugins: {
                                                    legend: { position: 'right' },
                                                },
                                            }}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className='w-full'>
                            <Card className="w-full">
                                <div className="p-4 w-full">
                                    <div className="relative w-full">
                                        <PieChart
                                            title="FOS Accounts Assigned %"
                                            data={ptpChartData}
                                            options={{
                                                plugins: {
                                                    legend: { position: 'bottom' },
                                                },
                                            }}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-7">
                        {summaryCards.map((card) => (
                            <div key={card.label} className="p-4 bg-blue-50 rounded border border-blue-100">
                                <p className="text-xs text-gray-600">{card.label}</p>
                                <p className="text-2xl font-bold text-blue-600 mt-2">{card.value}</p>
                            </div>
                        ))}
                    </div>
                    <p className="mt-7 font-semibold text-md">
                        {dashboardData?.dateRange?.ptpDateRangeLabel || 'PTP spans from - to -'}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-7">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-start">
                            {ptpCards.map((card) => (
                                <div key={card.label} className="p-4 bg-blue-50 rounded border border-blue-100">
                                    <p className="text-xs text-gray-600">{card.label}</p>
                                    <p className="text-md font-bold text-blue-600 mt-2">{card.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className='w-full'>
                            <Card className="w-full">
                                <div className="p-4 w-full">
                                    <div className="relative w-full">
                                        <PieChart title="PTP Conversion Percent" />
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 mt-7 gap-3">
                        {fullPaymentCards.map((card) => (
                            <div key={card.label} className="p-4 bg-blue-50 rounded border border-blue-100">
                                <p className="text-xs text-gray-600">{card.label}</p>
                                <p className="text-2xl font-bold text-blue-600 mt-2">{card.value}</p>
                            </div>
                        ))}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FrmDailyVisit;