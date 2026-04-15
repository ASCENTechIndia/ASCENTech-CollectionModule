import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Select, Textarea, Button } from '../../components/ui';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Search } from 'lucide-react';
import apiClient from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';
import LineChart from '../../components/charts/LineChart';
import DoughnutChart from '../../components/charts/DoughnutChart';
import PieChart from '../../components/charts/PieChart';
import { Card } from '../../components/ui';
import { DataTable } from '../../components/tables/DataTable';
import TailwindGridTable from '../../components/reports/TailwindGridTable';

function FrmDailyVisit() {
    const { user } = useAuth();
    const userId = user?.userId;
    const brCategory = user?.brCategory;
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        defaultValues: {
            fromDate: new Date().toISOString().split('T')[0],
            toDate: new Date().toISOString().split('T')[0]
        }
    });

    const [showDetails, setShowDetails] = useState(false);

    const fetchDailyVisitData = async () => { };

    const onSubmit = async (values) => {
        console.log(values);
    }
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
                                        <DoughnutChart title='Total Accounts' />
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className='w-full'>
                            <Card className="w-full">
                                <div className="p-4 w-full">
                                    <div className="relative w-full">
                                        <DoughnutChart title='Visit Details' />
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className='w-full'>
                            <Card className="w-full">
                                <div className="p-4 w-full">
                                    <div className="relative w-full">
                                        <PieChart title="FOS Accounts Assigned %" />
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-7">
                        <div className="p-4 bg-blue-50 rounded border border-blue-100">
                            <p className="text-xs text-gray-600">Total Visit:</p>
                            <p className="text-2xl font-bold text-blue-600 mt-2">₹45,230</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded border border-blue-100">
                            <p className="text-xs text-gray-600">Total Unique Visit:</p>
                            <p className="text-2xl font-bold text-blue-600 mt-2">₹45,230</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded border border-blue-100">
                            <p className="text-xs text-gray-600">Intensity (Total Visits / Total Unique Visits)</p>
                            <p className="text-2xl font-bold text-blue-600 mt-2">₹45,230</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded border border-blue-100">
                            <p className="text-xs text-gray-600">Avg. Daily Visit Rate (Total Visits / No. of Days)</p>
                            <p className="text-2xl font-bold text-blue-600 mt-2">₹45,230</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded border border-blue-100">
                            <p className="text-xs text-gray-600">Total Collectable Amount:</p>
                            <p className="text-2xl font-bold text-blue-600 mt-2">₹45,230</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded border border-blue-100">
                            <p className="text-xs text-gray-600">Total Collected Amount:</p>
                            <p className="text-2xl font-bold text-blue-600 mt-2">₹45,230</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded border border-blue-100">
                            <p className="text-xs text-gray-600">Daily Avg. Collection Amt. (Collected Amt. / No. of Days)</p>
                            <p className="text-2xl font-bold text-blue-600 mt-2">₹45,230</p>
                        </div>

                        <div className="p-4 bg-blue-50 rounded border border-blue-100">
                            <p className="text-xs text-gray-600">Collection %</p>
                            <p className="text-2xl font-bold text-blue-600 mt-2">₹45,230</p>
                        </div>
                    </div>
                    <p className="mt-7 font-semibold text-md">PTP spans from 01-Feb-2026 to 28-Feb-2026</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-7">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-start">
                            <div className="p-4 bg-blue-50 rounded border border-blue-100">
                                <p className="text-xs text-gray-600">Total PTP Count</p>
                                <p className="text-md font-bold text-blue-600 mt-2">₹45,230</p>
                            </div>
                            <div className="p-4 bg-blue-50 rounded border border-blue-100">
                                <p className="text-xs text-gray-600">Pending PTP Count</p>
                                <p className="text-md font-bold text-blue-600 mt-2">45,230</p>
                            </div>
                            <div className="p-4 bg-blue-50 rounded border border-blue-100">
                                <p className="text-xs text-gray-600">Paid PTP Count</p>
                                <p className="text-md font-bold text-blue-600 mt-2">₹45,230</p>
                            </div>
                            <div className="p-4 bg-blue-50 rounded border border-blue-100">
                                <p className="text-xs text-gray-600">Broken PTP Count</p>
                                <p className="text-md font-bold text-blue-600 mt-2">₹45,230</p>
                            </div>
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
                        <div className="p-4 bg-blue-50 rounded border border-blue-100">
                            <p className="text-xs text-gray-600">Account Paid Via Visit</p>
                            <p className="text-2xl font-bold text-blue-600 mt-2">₹45,230</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded border border-blue-100">
                            <p className="text-xs text-gray-600">Total Full Paid Amount</p>
                            <p className="text-2xl font-bold text-blue-600 mt-2">₹45,230</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded border border-blue-100">
                            <p className="text-xs text-gray-600">Total Full Paid Account</p>
                            <p className="text-2xl font-bold text-blue-600 mt-2">₹45,230</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FrmDailyVisit;