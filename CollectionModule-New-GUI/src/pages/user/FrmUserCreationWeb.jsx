import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Select, Textarea, Button } from '../../components/ui';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { AlertCircle } from 'lucide-react';
const FrmUserCreationWeb = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        userLevel: "",
        ZoneRegionBranch: "",
        userRole: "",
        userDevice: "",
        employeeCode: "",
        userFor: "",
        firstName: "",
        lastName: "",
        mobileNumber: ""
    });

    const navigate = useNavigate();
    const { user } = useAuth();
    const { showSuccess, showError } = useNotification();
    const brCategory = user?.brCategory;
    const userName = user?.userName;
    const [selectedUserLevel, setSelectedUserLevel] = useState("");
    const [branchOptions, setBranchOptions] = useState([]);
    const [roleOptions, setRoleOptions] = useState([]);
    const [deviceOptions, setDeviceOptions] = useState([]);
    const fetchBranches = async () => {
        try {
            const response = await apiClient.get(`/users/getUsercreationbranches/?brcategory=${brCategory}&userLevel=${selectedUserLevel}`, {});

            if (response.data.success && Array.isArray(response.data.data)) {
                const formattedOptions = response.data.data.map((item) => ({
                    label: item.BRANCHNAME,
                    value: item.BRID
                }));

                setBranchOptions(formattedOptions);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await apiClient.get(`/users/getRoles`, {});

            if (response.data.success && Array.isArray(response.data.data)) {
                const formattedOptions = response.data.data.map((item) => ({
                    label: item.VAR_USERROLE_NAME,
                    value: item.NUM_USERROLE_ID
                }));
                setRoleOptions(formattedOptions);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const fetchUserDevices = async () => {
        try {
            const response = await apiClient.get(`/users/getUserDevices`, {});

            if (response.data.success && Array.isArray(response.data.data)) {
                const formattedOptions = response.data.data.map((item) => ({
                    label: item.VAR_USERDEVICE_NAME,
                    value: item.NUM_USERDEVICE_ID
                }));
                setDeviceOptions(formattedOptions)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const onSubmit = async (values) => {
        try {
            const payload = {
                "in_brid": Number(values.zoneRegionBranch),
                "in_userid": "0",
                "in_username": `${values.firstName.trim()} ${values.lastName.trim()}`,
                "in_userpwd": "",
                "in_mobno": Number(values.mobileNumber),
                "in_email": "",
                "in_usertypeid": Number(values.userDevice),
                "in_DOB": null,
                "in_proofno": null,
                "in_desgid": 0,
                "in_roleid": Number(values.userRole),
                "in_compcode": 0,
                "in_workid": 0,
                "in_empid": 0,
                "in_collectionid": 0,
                "in_categoryid": 0,
                "in_mode": 1,
                "in_status": "A",
                "in_Empcode": values.employeeCode,
                "in_firstname": values.firstName.trim(),
                "in_lastname": values.lastName.trim(),
                "in_prooftype": values.userFor === "1" ? 1 : 2,
                "in_compid": 0,
                "in_insby": userName
            }

            const response = await apiClient.post("/users/createWebUser", payload);

            if (response.data.success && response.data.data.Out_errorCode === 9999) {
                showSuccess(response.data.data.Out_ErrorMsg || 'User created successfully');

                reset({
                    userLevel: "",
                    ZoneRegionBranch: "",
                    userRole: "",
                    userDevice: "",
                    employeeCode: "",
                    userFor: "",
                    firstName: "",
                    lastName: "",
                    mobileNumber: ""
                });

                setSelectedUserLevel("");
                setBranchOptions([]);
            }
        } catch (error) {
            console.error(error?.response?.data);
            showError(error?.response?.data?.message || error?.message || 'Failed to create user');
        }
    }

    useEffect(() => {
        if (!selectedUserLevel || !brCategory) return;

        fetchBranches();
    }, [selectedUserLevel, brCategory]);

    useEffect(() => {
        fetchRoles();
        fetchUserDevices();
    }, [])

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Web User Creation</h1>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    User Level<span className="text-danger-600">*</span>
                                </label>
                                <select
                                    {...register('userLevel', {
                                        required: 'User Level is required',
                                    })}
                                    defaultValue=""
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                                    onChange={(e) => {
                                        setSelectedUserLevel(e.target.value);
                                    }}
                                >
                                    <option value="">-- Select Option --</option>
                                    <option value="Zone">Zone</option>
                                    <option value="Branch">Branch</option>
                                    <option value="Region">Region</option>

                                </select>
                                {errors.userLevel && (
                                    <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.userLevel.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Zone/Region/Branch<span className="text-danger-600">*</span>
                                </label>
                                <select
                                    {...register('zoneRegionBranch', {
                                        required: 'Zone/Region/Branch is required',
                                    })}
                                    defaultValue=""
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                                >
                                    <option value="">--Select Option--</option>
                                    {branchOptions.map((item) => (
                                        <option key={item.value} value={item.value}>{item.label}</option>
                                    ))}

                                </select>
                                {errors.zoneRegionBranch && (
                                    <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.zoneRegionBranch.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    User Role<span className="text-danger-600">*</span>
                                </label>
                                <select
                                    {...register('userRole', {
                                        required: 'User Role is required',
                                    })}
                                    defaultValue=""
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                                >
                                    <option value="">Select User Role</option>
                                    {roleOptions.map((item) => (
                                        <option value={item.value} key={item.value}>{item.label}</option>
                                    ))}
                                </select>
                                {errors.userRole && (
                                    <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.userRole.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    User Device<span className="text-danger-600">*</span>
                                </label>
                                <select
                                    {...register('userDevice', {
                                        required: 'User Device is required',
                                    })}
                                    defaultValue=""
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                                >
                                    <option value="">Select User Device</option>
                                    {deviceOptions.map((item) => (
                                        <option key={item.value} value={item.value}>{item.label}</option>
                                    ))}
                                </select>
                                {errors.userDevice && (
                                    <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.userDevice.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Employee Code<span className="text-danger-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register('employeeCode', {
                                        required: 'Employee Code is required',
                                    })}
                                    placeholder="Enter Employee Code"
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${errors.employeeCode
                                        ? 'border-danger-500'
                                        : 'border-gray-300'
                                        }`}
                                />
                                {errors.employeeCode && (
                                    <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.employeeCode.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    User For<span className="text-danger-600">*</span>
                                </label>
                                <select
                                    {...register('userFor', {
                                        required: 'User For is required',
                                    })}
                                    defaultValue=""
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                                >
                                    <option value="">-- Select Option -- </option>
                                    <option value="1">Conneqt</option>
                                    <option value="2">Central Bank</option>
                                </select>
                                {errors.userFor && (
                                    <p className="text-danger-600 text-sm mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.userFor.message}
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
                                                pattern: {
                                                    value: /^[A-Za-z]+$/,
                                                    message: 'Only alphabets are allowed'
                                                }
                                            })}
                                            placeholder="FIRST NAME"
                                            onInput={(e) => {
                                                e.target.value = e.target.value.replace(/[^A-Za-z]/g, '');
                                            }}
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
                                                pattern: {
                                                    value: /^[A-Za-z]+$/,
                                                    message: 'Only alphabets are allowed'
                                                }
                                            })}
                                            placeholder="LAST NAME"
                                            onInput={(e) => {
                                                e.target.value = e.target.value.replace(/[^A-Za-z]/g, '');
                                            }}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Mobile Number<span className="text-danger-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register('mobileNumber', {
                                        required: 'Mobile Number is required',
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: 'Mobile number must be exactly 10 digits'
                                        }
                                    })}
                                    placeholder="Enter Mobile Number"
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                    }}
                                    maxLength={10}
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
}

export default FrmUserCreationWeb;