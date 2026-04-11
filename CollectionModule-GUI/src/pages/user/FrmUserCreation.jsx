import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input, Select, Textarea, Button } from "../../components/ui";
import { useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from "lucide-react";
import axios from "axios";
import apiClient from "../../services/apiService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const FrmUserCreation = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      workingFor: "",
      pinCode: "",
      firstName: "",
      lastName: "",
      mobileNumber: "",
      mdmId: "",
      userDesignation: "",
      zone: "",
      region: "",
      branch: "",
      userRole: "",
      userDevice: "",
    },
  });

  const [workingDropdown, setWorkingDropdown] = useState([]);
  const [designationDropdown, setDesignationDropdown] = useState([]);
  const [zoneDropdown, setZoneDropdown] = useState([]);
  const [regionDropdown, setRegionDropdown] = useState([]);
  const [branchDropdown, setBranchDropdown] = useState([]);
  const [userRoleDropdown, setUserRoleDropdown] = useState([]);
  const [userDeviceDropdown, setUserDeviceDropdown] = useState([]);

  // Loading states
  const [loadingRegions, setLoadingRegions] = useState(false);
  const [loadingBranches, setLoadingBranches] = useState(false);

  const selectedZone = watch("zone");
  const selectedRegion = watch("region");

  const onSubmit = async (values) => {
    console.log(values);
  };

  // Fetch regions based on selected zone
  const fetchRegionsByZone = async (zoneId) => {
    if (!zoneId) {
      setRegionDropdown([]);
      return;
    }

    setLoadingRegions(true);
    try {
      const response = await apiClient.get(`/users/regions?zoneId=${zoneId}`);

      if (response?.data?.success && response?.data?.data?.length > 0) {
        const dd = response.data.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setRegionDropdown(dd);
      } else {
        setRegionDropdown([]);
      }
    } catch (error) {
      console.error("Error fetching regions:", error);
      setRegionDropdown([]);
      alert(error.message || "Failed to fetch regions");
    } finally {
      setLoadingRegions(false);
    }
  };

  // Fetch branches based on selected region
  const fetchBranchesByRegion = async (regionId) => {
    if (!regionId) {
      setBranchDropdown([]);
      return;
    }

    setLoadingBranches(true);
    try {
      const response = await apiClient.get(
        `/users/branches?regionId=${regionId}`,
      );

      if (response?.data?.success && response?.data?.data?.length > 0) {
        const dd = response.data.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setBranchDropdown(dd);
      } else {
        setBranchDropdown([]);
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
      setBranchDropdown([]);
      alert(error.message || "Failed to fetch branches");
    } finally {
      setLoadingBranches(false);
    }
  };

  // Fetch initial dropdown data
  const fetchDropdown = async () => {
    try {
      const res = await apiClient.get("/users/mobile-form-options");

      if (res?.data?.success && res?.data?.message === "success") {
        // Working For
        if (res?.data?.data?.workingFor?.length > 0) {
          const dd = res.data.data.workingFor.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setWorkingDropdown(dd);
        } else {
          setWorkingDropdown([]);
        }

        // User Designation
        if (res?.data?.data?.designations?.length > 0) {
          const dd = res.data.data.designations.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setDesignationDropdown(dd);
        } else {
          setDesignationDropdown([]);
        }

        // Zone
        if (res?.data?.data?.zones?.length > 0) {
          const dd = res.data.data.zones.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setZoneDropdown(dd);
        } else {
          setZoneDropdown([]);
        }

        // User Role
        if (res?.data?.data?.userRoles?.length > 0) {
          const dd = res.data.data.userRoles.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setUserRoleDropdown(dd);
        } else {
          setUserRoleDropdown([]);
        }

        // User Device
        if (res?.data?.data?.userDevices?.length > 0) {
          const dd = res.data.data.userDevices.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setUserDeviceDropdown(dd);
        } else {
          setUserDeviceDropdown([]);
        }
      } else {
        setWorkingDropdown([]);
        setDesignationDropdown([]);
        setZoneDropdown([]);
        setBranchDropdown([]);
        setRegionDropdown([]);
        setUserRoleDropdown([]);
        setUserDeviceDropdown([]);
      }
    } catch (error) {
      setWorkingDropdown([]);
      setDesignationDropdown([]);
      setZoneDropdown([]);
      setBranchDropdown([]);
      setRegionDropdown([]);
      setUserRoleDropdown([]);
      setUserDeviceDropdown([]);
      console.error(error);
      alert(error.message);
    }
  };

  // Fetch regions when zone changes
  useEffect(() => {
    if (selectedZone) {
      fetchRegionsByZone(selectedZone);
      // Reset region and branch when zone changes
      setValue("region", "");
      setValue("branch", "");
      setBranchDropdown([]);
    } else {
      setRegionDropdown([]);
      setBranchDropdown([]);
    }
  }, [selectedZone]);

  // Fetch branches when region changes
  useEffect(() => {
    if (selectedRegion) {
      fetchBranchesByRegion(selectedRegion);
      // Reset branch when region changes
      setValue("branch", "");
    } else {
      setBranchDropdown([]);
    }
  }, [selectedRegion]);

  useEffect(() => {
    fetchDropdown();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            User Creation
          </h1>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Working For<span className="text-danger-600">*</span>
                </label>
                <select
                  {...register("workingFor")}
                  defaultValue=""
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="">Select Department</option>
                  {workingDropdown.map((item) => (
                    <option value={item.value} key={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Pincode<span className="text-danger-600">*</span>
                </label>
                <input
                  type="text"
                  {...register("pinCode", {
                    required: "Pin Code is required",
                  })}
                  placeholder="Enter Pincode"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                    errors.pinCode ? "border-danger-500" : "border-gray-300"
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
                      {...register("firstName", {
                        required: "First Name is required",
                      })}
                      placeholder="FIRST NAME"
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                        errors.pinCode ? "border-danger-500" : "border-gray-300"
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
                      {...register("lastName", {
                        required: "Last Name is required",
                      })}
                      placeholder="LAST NAME"
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                        errors.pinCode ? "border-danger-500" : "border-gray-300"
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
                  {...register("mobileNumber", {
                    required: "Mobile Number is required",
                  })}
                  placeholder="Enter Mobile Number"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                    errors.pinCode ? "border-danger-500" : "border-gray-300"
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
                  {...register("mdmId", {
                    required: "MDM ID is required",
                  })}
                  placeholder="Enter MDM ID"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                    errors.pinCode ? "border-danger-500" : "border-gray-300"
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
                  {...register("userDesignation")}
                  defaultValue=""
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="">Select Designation</option>
                  {designationDropdown?.length > 0 &&
                    designationDropdown.map((item) => (
                      <option value={item.value} key={item.value}>
                        {item.label}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Zone<span className="text-danger-600">*</span>
                </label>
                <select
                  {...register("zone")}
                  defaultValue=""
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="">Select Zone</option>
                  {zoneDropdown?.length > 0 &&
                    zoneDropdown.map((item) => (
                      <option value={item.value} key={item.value}>
                        {item.label}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Region<span className="text-danger-600">*</span>
                </label>
                <select
                  {...register("region")}
                  defaultValue=""
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                  disabled={loadingRegions || !selectedZone}
                >
                  <option value="">
                    {loadingRegions ? "Loading regions..." : "Select Region"}
                  </option>
                  {regionDropdown?.length > 0 &&
                    regionDropdown.map((item) => (
                      <option value={item.value} key={item.value}>
                        {item.label}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Branch<span className="text-danger-600">*</span>
                </label>
                <select
                  {...register("branch")}
                  defaultValue=""
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                  disabled={loadingBranches || !selectedRegion}
                >
                  <option value="">
                    {loadingBranches ? "Loading branches..." : "Select Branch"}
                  </option>
                  {branchDropdown?.length > 0 &&
                    branchDropdown.map((item) => (
                      <option value={item.value} key={item.value}>
                        {item.label}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  User Role<span className="text-danger-600">*</span>
                </label>
                <select
                  {...register("userRole")}
                  defaultValue=""
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="">Select User Role</option>
                  {userRoleDropdown?.length > 0 &&
                    userRoleDropdown.map((item) => (
                      <option value={item.value} key={item.value}>
                        {item.label}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  User Device<span className="text-danger-600">*</span>
                </label>
                <select
                  {...register("userDevice")}
                  defaultValue=""
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="">Select User Device</option>
                  {userDeviceDropdown?.length > 0 &&
                    userDeviceDropdown.map((item) => (
                      <option value={item.value} key={item.value}>
                        {item.label}
                      </option>
                    ))}
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
  );
};

export default FrmUserCreation;
