import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Select, Textarea, Button } from '../../components/ui';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle } from 'lucide-react';

function FrmAccessofPages() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        userOf: "1",
        userId: "",
        userName: "",
        accessPages: []
    });
    const { user } = useAuth();
    const userOfOptions = [
        { label: "Conneqt", value: "1" },
        { label: "Central Bank", value: "2" }
    ]
    const fetchUserOfId = (name) => {
        const userOfObj = "";
    }

    const onSubmit = async (values) => {
        console.log(values);
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                User Of:
                            </label>
                            <select
                                {...register('userOf', {
                                    required: 'User Of is required',
                                })}
                                defaultValue="1"
                                disabled={true}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                            >
                                <option value="">-- Select Option -- </option>
                                {userOfOptions.map((item) => (
                                    <option value={item.value} key={item.value}>{item.label}</option>
                                ))}
                            </select>
                            {errors.userOf && (
                                <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.userOf.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                User ID:
                            </label>
                            <input
                                type="text"
                                {...register('userId', {
                                    required: 'User ID is required',
                                })}
                                placeholder="Enter User ID"
                                disabled={true}
                                defaultValue={1001}
                                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${errors.userId
                                    ? 'border-danger-500'
                                    : 'border-gray-300'
                                    }`}
                            />
                            {errors.userId && (
                                <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.userId.message}
                                </p>
                            )}
                        </div>
                        <div className='flex flex-col md:flex-row'>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                User Name:
                            </label>
                            <p>
                                { }
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Access Pages:
                            </label>
                            <div className="space-y-2 mt-3">
                                {[
                                    { label: "Dashboard", value: "dashboard" },
                                    { label: "Users", value: "users" },
                                    { label: "Reports", value: "reports" },
                                    { label: "Settings", value: "settings" }
                                ].map((item) => (
                                    <label key={item.value} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            value={item.value}
                                            {...register("accessPages", {
                                                required: "Select at least one page"
                                            })}
                                        />
                                        {item.label}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-5 mt-7">
                        <button
                            type='submit'
                            className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FrmAccessofPages;