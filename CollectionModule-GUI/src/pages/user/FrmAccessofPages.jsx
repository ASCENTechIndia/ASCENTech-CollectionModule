import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Select, Textarea, Button } from '../../components/ui';
import { useNavigate, useLocation } from 'react-router-dom';
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
        userOf: "",
        userId: "",
        userName: "",
        accessPages: []
    });
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { userID } = location.state || null;
    const userOfOptions = [
        { label: "Conneqt", value: "1" },
        { label: "Central Bank", value: "2" }
    ]

    const [userPageAccessDetails, setUserPageAccessDetails] = useState({});
    const [pageAccessList, setPageAccessList] = useState([]);
    const fetchUserOfId = (name) => {
        const userOfObj = userOfOptions.find((item) =>
            item.label === name
        );
        return userOfObj ? userOfObj?.value : "";
    }

    const fetchPageAccessDetails = async () => {
        try {
            const response = await apiClient.get(`/users/get-page-access?userId=${userID}`, {});

            if (response.data.success) {
                setUserPageAccessDetails(response.data.data);
                setValue("userId", response.data.data.userId);

                const userOfValue = fetchUserOfId(response.data.data.userOf);
                setValue("userOf", userOfValue);

                setPageAccessList(response.data.data.pages);

                const selectedPages = response.data.data.pages
                    .filter(page => page.selected)
                    .map(page => page.menuId);

                setValue("accessPages", selectedPages);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const onSubmit = async (values) => {
        try {
            const payload = {
                "userId": values.userId,
                "menuIds": values.accessPages.map(id => Number(id))
            }

            const response = await apiClient.post(`/users/update-page-access`, payload);

            if (response.data.success && response.data.data.out_ErrorCode === "9999") {
                alert("Page Access Updated Successfully");
                reset({
                    userOf: "",
                    userId: "",
                    userName: "",
                    accessPages: []
                });
                navigate("/User/FrmUserModification");
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchPageAccessDetails();
    }, []);
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
                        <div className='flex flex-col md:flex-row md:items-center gap-2'>
                            <label className="block text-sm font-medium text-gray-900">
                                User Name:
                            </label>
                            <p>
                                {userPageAccessDetails?.userName}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Access Pages:
                            </label>
                            <div className="space-y-2 mt-3">
                                {pageAccessList.map((item) => (
                                    <label key={item.menuId} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            value={item.menuId}
                                            {...register("accessPages", {
                                                required: "Select at least one page"
                                            })}
                                        />
                                        {item.menuName}
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