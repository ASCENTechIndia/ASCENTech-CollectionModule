import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Select, Textarea, Button } from '../../components/ui';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle } from 'lucide-react';

const FrmInactiveUserAcs = () => {
    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            startDate: new Date().toISOString().split("T")[0],
            endDate: new Date().toISOString().split("T")[0],
            userId: "",
            userDropdownId: ""
        }
    });
    const navigate = useNavigate();

    const onSearch = async () => {

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
                                        required: 'Start Date is required'
                                    })}
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
                                        required: 'End Date is required'
                                    })}
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
                                    defaultValue=""
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
                    </form>
                </div>
            </div>
        </div>
    )
};

export default FrmInactiveUserAcs;