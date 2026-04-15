import { useState, useEffect } from 'react'
import { Form, useForm } from 'react-hook-form'
import { Input, Select, Textarea, Button } from '../../components/ui';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { AlertCircle } from 'lucide-react';
import TailwindGridTable from '../../components/reports/TailwindGridTable';

const FrmInactiveUserAcs = () => {
    const { user } = useAuth();
    const { showWarning, showError } = useNotification();
    const today = new Date().toISOString().split('T')[0]
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            startDate: "",
            endDate: "",
            userId: "",
            userDropdownId: "Inactive"
        }
    });
    const navigate = useNavigate();

    const tableHeader = [
        {
            displayName: "Unallocated Date",
            field: "date"
        },
        {
            displayName: "Collection Associate ID",
            field: "collectionID"
        },
        {
            displayName: "Account Number",
            field: "accountNumber"
        }
    ]

    const [tableData, setTableData] = useState([]);
    const [showTable, setShowTable] = useState(false);

    function formatDate(dateString) {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }

    function formatDateToDDMMYYYY(dateString) {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }

    const onSearch = async (values) => {
        try {
            // console.log(values);
            const payload = {
                startDate: values.startDate ? formatDate(values.startDate) : '',
                endDate: values.endDate ? formatDate(values.endDate) : '',
                userType: values.userDropdownId
            };
            const url = `/inactive-user-accounts/search?startDate=${payload?.startDate}&endDate=${payload?.endDate}&userType=${payload?.userType}${values.userId.trim().length > 0 ? `&userId=${values.userId}` : ''}`;

            const response = await apiClient.get(url);

            if (response.data.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
                const formattedTableData = response.data.data.map(item => ({
                    date: formatDateToDDMMYYYY(item.UNALLOCATE_DATE),
                    collectionID: item.VAR_BANKDATA_USERID,
                    accountNumber: item.VAR_BANKDATA_CONTRACTNUM
                }))
                setTableData(formattedTableData);
                setShowTable(true);
            } if (response.data.success && response.data.data.length === 0) {
                showWarning("No records found");
                setShowTable(false);
                setTableData([]);
            }
        } catch (error) {
            console.error(error);
            showError(error?.response?.data?.message || error?.message || 'Failed to fetch inactive user accounts');
        }
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <div className="flex justify-center">
                        <button
                            type='button'
                            className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        >
                            Unallocate All Accounts
                        </button>
                    </div>
                    <p className='text-md font-semibold my-7'>Users Unallocated Accounts</p>
                    <form onSubmit={handleSubmit(onSearch)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Select Start Date:
                                </label>
                                <input
                                    type="date"
                                    {...register('startDate', {
                                        required: 'Start Date is required',
                                        validate: (value) => !value || value <= today || 'Future dates are not allowed'
                                    })}
                                    max={today}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                />
                                {errors.startDate && (
                                    <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.startDate.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Select End Date:
                                </label>
                                <input
                                    type="date"
                                    {...register('endDate', {
                                        required: 'End Date is required',
                                        validate: (value) => !value || value <= today || 'Future dates are not allowed'
                                    })}
                                    max={today}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                />
                                {errors.endDate && (
                                    <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.endDate.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    User Id:
                                </label>
                                <input
                                    type="text"
                                    {...register('userId')}
                                    placeholder="Enter User ID"
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${errors.userId
                                        ? 'border-danger-500'
                                        : 'border-gray-300'
                                        }`}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Select User:
                                </label>
                                <select
                                    {...register('userDropdownId', {
                                        required: 'User Type is required',
                                    })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                                >
                                    <option value="">--Select Option --</option>
                                    <option value="All" key="1">All</option>
                                    <option value="Inactive" key="2">Inactive</option>
                                </select>
                                {errors.userDropdownId && (
                                    <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.userDropdownId.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-5 justify-center mt-7">
                            <button
                                type="submit"
                                className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            >
                                Search
                            </button>
                            <button
                                type="button"
                                className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                onClick={() => {
                                    navigate("/dashboard");
                                }}
                            >
                                Close
                            </button>
                        </div>
                        {showTable &&
                            <div className="mt-7">
                                <TailwindGridTable
                                    title="Users Unallocated Accounts"
                                    headers={tableHeader}
                                    rows={tableData}
                                />
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
};

export default FrmInactiveUserAcs;