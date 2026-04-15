import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button } from '../../components/ui'
import apiClient from '../../services/apiService'
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { AlertCircle } from 'lucide-react';

const FrmPincodeMstrInserion = () => {
    const { user } = useAuth();
    const { showSuccess, showError } = useNotification();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        pinCode: ""
    });

    const onSubmit = async (values) => {
        try {
            const payload = {
                "pincode": values.pinCode
            };

            const response = await apiClient.post("/assignPincode/insertPincodeMaster", payload);

            if (response.data.success && response.data.data.isSuccess) {
                showSuccess(response.data.data.message || 'Pincode inserted successfully');
                reset({
                    "pinCode": ""
                });
            } else if (response.data.success && !response.data.data.isSuccess) {
                showError(response.data.data.message || 'Failed to insert pincode');
            }
        } catch (error) {
            console.log(error);
            showError(error?.response?.data?.message || error?.message || 'Failed to insert pincode');
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Pincode Master Insertion</h1>
                </div>
            </div>
            <div className="max-w-md mx-auto px-4 pb-6">
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Enter Pincode<span className="text-danger-600">*</span>
                            </label>
                            <input
                                type="text"
                                {...register('pinCode', {
                                    required: 'Pincode is required',
                                })}
                                maxLength={6}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/\D/g, '')
                                }}
                                placeholder="Enter Pincode"
                                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${errors.pinCode
                                    ? 'border-danger-500'
                                    : 'border-gray-300'
                                    }`}
                            />
                            {errors.pinCode && (
                                <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.pinCode.message}
                                </p>
                            )}
                        </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-center mt-7">
                            <button
                                type="submit"
                                className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default FrmPincodeMstrInserion;