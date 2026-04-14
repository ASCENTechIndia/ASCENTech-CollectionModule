import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Select, Textarea, Button } from '../../components/ui';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Search } from 'lucide-react';
import apiClient from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';

const FrmUserModification = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        userId: "",
        userName: "",
        userCurrentStatus: ""
    });
    const navigate = useNavigate();
    const { user } = useAuth();
    const webUserId = user?.userId;
    const [searchUserId, setSearchUserId] = useState("");
    const [userDetails, setUserDetails] = useState({});
    const [openModifyStatusModal, setOpenModifyStatusModal] = useState(false);
    const [newStatus, setNewStatus] = useState("");


    const handleSearch = async (userID) => {
        if (!userID) {
            alert("Enter User ID");
            return;
        }
        try {
            const response = await apiClient.get(`/users/search-by-userid?userId=${userID}`);

            if (response.data.success) {
                setUserDetails(response.data.data);
                setValue("userName", response.data?.data?.userName);
                setValue("userCurrentStatus", response.data?.data?.currentStatus)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleModifyStatus = async () => {
        try {
            if (!newStatus.length) {
                alert("Please select the status");
                return;
            }
            const payload = {
                "userId": userDetails?.userId,
                "newStatus": newStatus,
                "insBy": webUserId
            };

            const response = await apiClient.post("/users/modify-status-submit", payload);

            if (response.data.success && response.data.data.out_ErrorCode === -100) {
                alert(response.data.data.out_ErrorMsg);
                setOpenModifyStatusModal(false);
                setNewStatus("");
                handleSearch(userDetails?.userId);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">User Modification</h1>
                </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-8">
                <form>
                    <div className='grid grid-cols-1 gap-5'>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                User Id<span className="text-danger-600">*</span>
                            </label>
                            <div className='flex flex-col justify-start md:flex-row gap-5'>
                                <div>
                                    <input
                                        type="text"
                                        {...register('userId', {
                                            required: 'User ID is required',
                                        })}
                                        placeholder="Enter User ID"
                                        onChange={(e) => {
                                            setSearchUserId(e.target.value);
                                        }}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/\D/g, '');
                                        }}
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
                                    <button
                                        type='button'
                                        className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                        onClick={() => handleSearch(searchUserId)}
                                    >
                                        <Search className="w-6 h-6 text-white" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-7'>
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
                                disabled={true}
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
                                disabled={true}
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
                            onClick={() => {
                                setOpenModifyStatusModal(true);
                            }}
                        >
                            Modify Status
                        </button>
                        <button
                            type='button'
                            className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        >Page Access</button>
                    </div>

                    {openModifyStatusModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                            <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 m-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold">Modify Status</h2>
                                    <button
                                        onClick={() => setOpenModifyStatusModal(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 justify-around gap-4 mb-7">
                                    <p><span className='text-sm font-medium'>User Id:</span> {userDetails?.userId}</p>
                                    <p><span className="text-sm font-medium">Current Status:</span> {userDetails?.currentStatus}</p>
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-sm font-medium">
                                        New Status<span className="text-danger-600">*</span>
                                    </label>
                                    <select
                                        value={newStatus}
                                        onChange={(e) => setNewStatus(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg">
                                        <option value="">-- Select Status --</option>
                                        <option value="A" disabled={userDetails?.currentStatus === "Active"}>Active</option>
                                        <option value="I" disabled={userDetails?.currentStatus === "Inactive"}>Inactive</option>
                                    </select>
                                </div>

                                <div className="flex justify-center gap-3 mt-6">
                                    <button
                                        type='button'
                                        className="px-4 py-2 bg-primary-600 text-white rounded-lg"
                                        onClick={() => {
                                            handleModifyStatus();
                                        }}
                                    >
                                        Save
                                    </button>
                                    <button
                                        type='button'
                                        className="px-4 py-2 bg-gray-300 rounded-lg"
                                        onClick={() => setOpenModifyStatusModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
};

export default FrmUserModification;