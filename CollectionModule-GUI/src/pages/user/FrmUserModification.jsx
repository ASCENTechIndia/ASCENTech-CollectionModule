import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Select, Textarea, Button } from '../../components/ui';
import { useNavigate } from 'react-router-dom';

const FrmUserModification = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        userId: "",
        userName: "",
        userCurrentStatus: ""
    });
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">User Modification</h1>
                </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-8">
                <form>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>


                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                User Id<span className="text-danger-600">*</span>
                            </label>
                            <input
                                type="text"
                                {...register('userId', {
                                    required: 'User ID is required',
                                })}
                                placeholder="Enter User ID"
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
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                User Name<span className="text-danger-600">*</span>
                            </label>
                            <input
                                type="text"
                                {...register('userName', {
                                    required: 'User Name is required',
                                })}
                                placeholder="Enter Username"
                                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${errors.userId
                                    ? 'border-danger-500'
                                    : 'border-gray-300'
                                    }`}
                            />
                            {errors.userName && (
                                <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.userName.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                User Current Status<span className="text-danger-600">*</span>
                            </label>
                            <input
                                type="text"
                                {...register('userCurrentStatus', {
                                    required: 'User Current Status is required',
                                })}
                                placeholder="Enter User Current Status"
                                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${errors.userCurrentStatus
                                    ? 'border-danger-500'
                                    : 'border-gray-300'
                                    }`}
                            />
                            {errors.userCurrentStatus && (
                                <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.userCurrentStatus.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-center flex-col md:flex-row gap-5 mt-7">
                        <button
                            type='button'
                            className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        >
                            Modify Status
                        </button>
                        <button
                            type='button'
                            className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        >Page Access</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default FrmUserModification;