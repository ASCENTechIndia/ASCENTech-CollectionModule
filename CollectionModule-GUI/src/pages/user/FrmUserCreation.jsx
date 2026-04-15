import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input, Select, Textarea, Button } from "../../components/ui";
import { useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from "lucide-react";
import axios from "axios";
import apiClient from "../../services/apiService";
import Swal from "sweetalert2";

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

    // Show loading alert
    Swal.fire({
      title: "Processing...",
      text: "Please wait while we create the user.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const payload = {
        branchId: Number(values.branch),
        in_userid: "",
        in_username: `${values.firstName} ${values.lastName}`,
        firstName: values.firstName,
        lastName: values.lastName,
        mobileNo: values.mobileNumber,
        mdmId: values.mdmId,
        userDeviceId: Number(values.userDevice),
        dob: "",
        idProofNo: "",
        designationId: Number(values.userDesignation),
        roleId: Number(values.userRole),
        companyCodeId: 0,
        workingForId: Number(values.workingFor),
        employerId: 0,
        empcode: "",
        collectionTeamId: 0,
        categoryId: 0,
        mode: 1,
        pincode: values.pinCode,
        idProofType: 0,
        compId: 0,
        requestStatus: "A",
      };

      const res = await apiClient.post("/users/add-mobile-user", payload);

      // Close loading
      Swal.close();

      if (res?.data?.success && res?.data?.data?.Out_errorCode === 9999) {
        // Success case
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: res.data.data.Out_ErrorMsg || "User created successfully",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
          timer: 3000,
          timerProgressBar: true,
        }).then(() => {
          reset(); // Reset form
          navigate("/User/FrmUserList"); // Navigate to user list
        });
      } else {
        // Error case from API
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: res.data.data.Out_ErrorMsg || "Something went wrong",
          confirmButtonText: "OK",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error(error);
      // Close loading if still open
      Swal.close();

      // Network or unexpected error
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "Failed to create user. Please try again.",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33",
      });
    }
  };

  // Validation patterns
  const namePattern = /^[A-Za-z]+$/; // Only English letters
  const mobilePattern = /^[0-9]{10}$/; // 10 digits
  const pincodePattern = /^[0-9]{6}$/; // 6 digits
  const mdmIdPattern = /^[A-Za-z0-9]+$/; // Alphanumeric

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
              {/* Working For */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Working For<span className="text-red-600">*</span>
                </label>
                <select
                  {...register("workingFor", {
                    required: "Working For is required",
                  })}
                  defaultValue=""
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                    errors.workingFor ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Department</option>
                  {workingDropdown.map((item) => (
                    <option value={item.value} key={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                {errors.workingFor && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.workingFor.message}
                  </p>
                )}
              </div>

              {/* Pincode */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Pincode<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  {...register("pinCode", {
                    required: "Pincode is required",
                    pattern: {
                      value: pincodePattern,
                      message: "Pincode must be exactly 6 digits",
                    },
                    maxLength: {
                      value: 6,
                      message: "Pincode must be exactly 6 digits",
                    },
                    minLength: {
                      value: 6,
                      message: "Pincode must be exactly 6 digits",
                    },
                  })}
                  placeholder="Enter Pincode"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                    errors.pinCode ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.pinCode && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.pinCode.message}
                  </p>
                )}
              </div>

              {/* User Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  User Name<span className="text-red-600">*</span>
                </label>
                <div className="flex flex-col md:flex-row justify-start gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      {...register("firstName", {
                        required: "First Name is required",
                        pattern: {
                          value: namePattern,
                          message:
                            "First Name must contain only English letters",
                        },
                      })}
                      placeholder="FIRST NAME"
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      {...register("lastName", {
                        required: "Last Name is required",
                        pattern: {
                          value: namePattern,
                          message:
                            "Last Name must contain only English letters",
                        },
                      })}
                      placeholder="LAST NAME"
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-7">
              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Mobile Number<span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  {...register("mobileNumber", {
                    required: "Mobile Number is required",
                    pattern: {
                      value: mobilePattern,
                      message: "Mobile Number must be exactly 10 digits",
                    },
                    maxLength: {
                      value: 10,
                      message: "Mobile Number must be exactly 10 digits",
                    },
                    minLength: {
                      value: 10,
                      message: "Mobile Number must be exactly 10 digits",
                    },
                  })}
                  placeholder="Enter Mobile Number"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                    errors.mobileNumber ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.mobileNumber && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.mobileNumber.message}
                  </p>
                )}
              </div>

              {/* MDM ID */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  MDM ID<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  {...register("mdmId", {
                    required: "MDM ID is required",
                    pattern: {
                      value: mdmIdPattern,
                      message: "MDM ID must contain only letters and numbers",
                    },
                  })}
                  placeholder="Enter MDM ID"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                    errors.mdmId ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.mdmId && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.mdmId.message}
                  </p>
                )}
              </div>

              {/* User Designation */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  User Designation<span className="text-red-600">*</span>
                </label>
                <select
                  {...register("userDesignation", {
                    required: "User Designation is required",
                  })}
                  defaultValue=""
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                    errors.userDesignation
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select Designation</option>
                  {designationDropdown?.length > 0 &&
                    designationDropdown.map((item) => (
                      <option value={item.value} key={item.value}>
                        {item.label}
                      </option>
                    ))}
                </select>
                {errors.userDesignation && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.userDesignation.message}
                  </p>
                )}
              </div>

              {/* Zone */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Zone<span className="text-red-600">*</span>
                </label>
                <select
                  {...register("zone", {
                    required: "Zone is required",
                  })}
                  defaultValue=""
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                    errors.zone ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Zone</option>
                  {zoneDropdown?.length > 0 &&
                    zoneDropdown.map((item) => (
                      <option value={item.value} key={item.value}>
                        {item.label}
                      </option>
                    ))}
                </select>
                {errors.zone && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.zone.message}
                  </p>
                )}
              </div>

              {/* Region */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Region<span className="text-red-600">*</span>
                </label>
                <select
                  {...register("region", {
                    required: "Region is required",
                  })}
                  defaultValue=""
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                    errors.region ? "border-red-500" : "border-gray-300"
                  }`}
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
                {errors.region && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.region.message}
                  </p>
                )}
              </div>

              {/* Branch */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Branch<span className="text-red-600">*</span>
                </label>
                <select
                  {...register("branch", {
                    required: "Branch is required",
                  })}
                  defaultValue=""
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                    errors.branch ? "border-red-500" : "border-gray-300"
                  }`}
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
                {errors.branch && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.branch.message}
                  </p>
                )}
              </div>

              {/* User Role */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  User Role<span className="text-red-600">*</span>
                </label>
                <select
                  {...register("userRole", {
                    required: "User Role is required",
                  })}
                  defaultValue=""
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                    errors.userRole ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select User Role</option>
                  {userRoleDropdown?.length > 0 &&
                    userRoleDropdown.map((item) => (
                      <option value={item.value} key={item.value}>
                        {item.label}
                      </option>
                    ))}
                </select>
                {errors.userRole && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.userRole.message}
                  </p>
                )}
              </div>

              {/* User Device */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  User Device<span className="text-red-600">*</span>
                </label>
                <select
                  {...register("userDevice", {
                    required: "User Device is required",
                  })}
                  defaultValue=""
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                    errors.userDevice ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select User Device</option>
                  {userDeviceDropdown?.length > 0 &&
                    userDeviceDropdown.map((item) => (
                      <option value={item.value} key={item.value}>
                        {item.label}
                      </option>
                    ))}
                </select>
                {errors.userDevice && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.userDevice.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-7 flex justify-center gap-5">
              <button
                type="submit"
                className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit
              </button>
              <button
                type="button"
                className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
