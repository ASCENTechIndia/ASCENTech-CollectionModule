import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Select, Textarea, Button } from '../../components/ui'
import { useNavigate } from 'react-router-dom';

const FrmUserCreation = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            workingFor: '',
            pinCode: '',
            firstName: '',
            lastName: '',
            mobileNumber: '',
            mdmId: '',
            userDesignation: "",
            zone: "",
            region: "",
            branch: "",
            userRole: "",
            userDevice: ""
        }
    });
    const navigate = useNavigate();
    const onSubmit = async (values) => {
        console.log(values)
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">User Creation</h1>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Working For<span className="text-danger-600">*</span>
                                </label>
                                <select
                                    {...register('workingFor')}
                                    defaultValue=""
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                                >
                                    <option value="">Select Department</option>

                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Pincode<span className="text-danger-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register('pinCode', {
                                        required: 'Pin Code is required',
                                    })}
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
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    User Name<span className="text-danger-600">*</span>
                                </label>
                                <div className="flex flex-col md:flex-row justify-start gap-3">
                                    <div>
                                        <input
                                            type="text"
                                            {...register('firstName', {
                                                required: 'First Name is required',
                                            })}
                                            placeholder="FIRST NAME"
                                            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${errors.firstName
                                                ? 'border-danger-500'
                                                : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.firstName && (
                                            <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.firstName.message}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            {...register('lastName', {
                                                required: 'Last Name is required',
                                            })}
                                            placeholder="LAST NAME"
                                            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${errors.lastName
                                                ? 'border-danger-500'
                                                : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.lastName && (
                                            <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.lastName.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-7">
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Mobile Number<span className="text-danger-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register('mobileNumber', {
                                        required: 'Mobile Number is required',
                                    })}
                                    placeholder="Enter Mobile Number"
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${errors.mobileNumber
                                        ? 'border-danger-500'
                                        : 'border-gray-300'
                                        }`}
                                />
                                {errors.mobileNumber && (
                                    <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.mobileNumber.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    MDM ID<span className="text-danger-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register('mdmId', {
                                        required: 'MDM ID is required',
                                    })}
                                    placeholder="Enter MDM ID"
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${errors.mdmId
                                        ? 'border-danger-500'
                                        : 'border-gray-300'
                                        }`}
                                />
                                {errors.mdmId && (
                                    <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.mdmId.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    User Designation<span className="text-danger-600">*</span>
                                </label>
                                <select
                                    {...register('userDesignation')}
                                    defaultValue=""
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                                >
                                    <option value="">Select Designation</option>

                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Zone<span className="text-danger-600">*</span>
                                </label>
                                <select
                                    {...register('zone')}
                                    defaultValue=""
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                                >
                                    <option value="">Select Zone</option>

                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Region<span className="text-danger-600">*</span>
                                </label>
                                <select
                                    {...register('region')}
                                    defaultValue=""
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                                >
                                    <option value="">Select Region</option>

                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Branch<span className="text-danger-600">*</span>
                                </label>
                                <select
                                    {...register('branch')}
                                    defaultValue=""
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                                >
                                    <option value="">Select Branch</option>

                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    User Role<span className="text-danger-600">*</span>
                                </label>
                                <select
                                    {...register('userRole')}
                                    defaultValue=""
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                                >
                                    <option value="">Select User Role</option>

                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    User Device<span className="text-danger-600">*</span>
                                </label>
                                <select
                                    {...register('userDevice')}
                                    defaultValue=""
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                                >
                                    <option value="">Select User Device</option>

                                </select>
                            </div>
                        </div>
                        <div className="mt-7 flex justify-center gap-5">
                            <button
                                type="submit"
                                className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            >
                                Submit
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

export default FrmUserCreation;