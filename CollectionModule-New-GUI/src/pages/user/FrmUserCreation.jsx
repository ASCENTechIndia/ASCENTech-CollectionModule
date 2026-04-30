import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { Link } from 'react-router-dom'
import { useNotification } from "../../context/NotificationContext";

const FrmUserCreation = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const [loadingDropdown, setLoadingDropdown] = useState(false);
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

      if (res?.success && res?.data?.Out_errorCode === 9999) {
        window.alert(res.data.Out_ErrorMsg || "User created successfully");
        reset();
        navigate("/User/FrmUserList");
      } else {
        window.alert(res?.data?.Out_ErrorMsg || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      window.alert(error?.response?.data?.message || error.message || "Failed to create user. Please try again.");
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
    console.log(response);

    if (response?.success && response?.data?.length > 0) {
      const dd = response.data.map((item) => ({
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
    showError(error.message || "Failed to fetch regions");
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

      if (response?.success && response?.data?.length > 0) {
        const dd = response.data.map((item) => ({
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
      showError(error.message || "Failed to fetch branches");
    } finally {
      setLoadingBranches(false);
    }
  };

  // Fetch initial dropdown data
  const fetchDropdown = async () => {
    setLoadingDropdown(true);
    try {
      const res = await apiClient.get("/users/mobile-form-options");

      if (res?.success && res?.message === "success") {
        // Working For
        if (res?.data?.workingFor?.length > 0) {
          const dd = res.data.workingFor.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setWorkingDropdown(dd);
        } else {
          setWorkingDropdown([]);
        }

        // User Designation
        if (res?.data?.designations?.length > 0) {
          const dd = res.data.designations.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setDesignationDropdown(dd);
        } else {
          setDesignationDropdown([]);
        }

        // Zone
        if (res?.data?.zones?.length > 0) {
          const dd = res.data.zones.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setZoneDropdown(dd);
        } else {
          setZoneDropdown([]);
        }

        // User Role
        if (res?.data?.userRoles?.length > 0) {
          const dd = res.data.userRoles.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setUserRoleDropdown(dd);
        } else {
          setUserRoleDropdown([]);
        }

        // User Device
        if (res?.data?.userDevices?.length > 0) {
          const dd = res.data.userDevices.map((item) => ({
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
      showError(error.message || "Failed to fetch form options");
    } finally{
       setLoadingDropdown(false);
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
  <>
   {loadingDropdown && (
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "rgba(0,0,0,0.4)", zIndex: 9999 }}
      >
        <div className="spinner-border text-light" style={{ width: "3rem", height: "3rem" }} />
      </div>
    )}
  <div className="main-content">
    <div className="page-header">
        <h1 className="page-title">User Creation</h1>
      </div>

    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">Create New User</h5>
        <small className="text-muted">Fill user details</small>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="row g-3">

            {/* Working For */}
            <div className="col-md-6">
              <label className="form-label">
                Working For <span className="text-danger">*</span>
              </label>
              <select
                  {...register("workingFor", {
    required: "Working For is required",
  })}
                className={`form-select ${errors.workingFor ? "is-invalid" : ""}`}
              >
                <option value="">Select Working For</option>
                {workingDropdown.map((item) => (
                  <option value={item.value} key={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              {errors.workingFor && (
                <div className="invalid-feedback">
                  {errors.workingFor.message}
                </div>
              )}
            </div>

            {/* Pincode */}
            <div className="col-md-6">
              <label className="form-label">
                Pincode <span className="text-danger">*</span>
              </label>
              <input
              maxLength={6} 
                type="text"
                {...register("pinCode",{
      required: "Pin Code is required",
       pattern: {
      value: /^[0-9]{6}$/,
      message: "Enter valid 6 digit pincode",
    },
    })}
                className={`form-control ${errors.pinCode ? "is-invalid" : ""}`}
                  onChange={(e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  }}
              />
              {errors.pinCode && (
                <div className="invalid-feedback">
                  {errors.pinCode.message}
                </div>
              )}
            </div>

            {/* First Name */}
         <div className="col-md-6">
  <label className="form-label">
    First Name <span className="text-danger">*</span>
  </label>

  <input
    {...register("firstName", {
      required: "First Name is required",
        pattern: {
      value: /^[A-Za-z\s]+$/,
      message: "Only alphabets allowed",
    },
    })}
     onChange={(e) => {
    e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
  }}
    className={`form-control ${
      errors.firstName ? "is-invalid" : ""
    }`}
  />

  {errors.firstName && (
    <div className="invalid-feedback">
      {errors.firstName.message}
    </div>
  )}
</div>

         {/* Last Name */}
<div className="col-md-6">
  <label className="form-label">
    Last Name <span className="text-danger">*</span>
  </label>
  <input
    {...register("lastName", {
      required: "Last Name is required",
          pattern: {
      value: /^[A-Za-z\s]+$/,
      message: "Only alphabets allowed",
    },
    })}
     onChange={(e) => {
    e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
  }}
    className={`form-control ${
      errors.lastName ? "is-invalid" : ""
    }`}
  />
  {errors.lastName && (
    <div className="invalid-feedback">
      {errors.lastName.message}
    </div>
  )}
</div>

{/* Mobile */}
<div className="col-md-6">
  <label className="form-label">
    Mobile Number <span className="text-danger">*</span>
  </label>
  <input
  maxLength={10}
    {...register("mobileNumber", {
      required: "Mobile Number is required",
    })}
       onChange={(e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  }}
    className={`form-control ${
      errors.mobileNumber ? "is-invalid" : ""
    }`}
  />
  {errors.mobileNumber && (
    <div className="invalid-feedback">
      {errors.mobileNumber.message}
    </div>
  )}
</div>

{/* MDM */}
<div className="col-md-6">
  <label className="form-label">
    MDM ID <span className="text-danger">*</span>
  </label>
  <input
    {...register("mdmId", {
      required: "MDM ID is required",
    })}
    className={`form-control ${
      errors.mdmId ? "is-invalid" : ""
    }`}
  />
  {errors.mdmId && (
    <div className="invalid-feedback">
      {errors.mdmId.message}
    </div>
  )}
</div>

{/* Designation */}
<div className="col-md-6">
  <label className="form-label">
    User Designation <span className="text-danger">*</span>
  </label>
  <select
    {...register("userDesignation", {
      required: "User Designation is required",
    })}
    className={`form-select ${
      errors.userDesignation ? "is-invalid" : ""
    }`}
  >
    <option value="">Select</option>
    {designationDropdown.map((item) => (
      <option value={item.value} key={item.value}>
        {item.label}
      </option>
    ))}
  </select>
  {errors.userDesignation && (
    <div className="invalid-feedback">
      {errors.userDesignation.message}
    </div>
  )}
</div>

{/* Zone */}
<div className="col-md-6">
  <label className="form-label">
    Zone <span className="text-danger">*</span>
  </label>
  <select
    {...register("zone", {
      required: "Zone is required",
    })}
    className={`form-select ${errors.zone ? "is-invalid" : ""}`}
  >
    <option value="">Select</option>
    {zoneDropdown.map((item) => (
      <option value={item.value} key={item.value}>
        {item.label}
      </option>
    ))}
  </select>
  {errors.zone && (
    <div className="invalid-feedback">
      {errors.zone.message}
    </div>
  )}
</div>

{/* Region */}
<div className="col-md-6">
  <label className="form-label">
    Region <span className="text-danger">*</span>
  </label>
  <select
    {...register("region", {
      required: "Region is required",
    })}
    className={`form-select ${errors.region ? "is-invalid" : ""}`}
    disabled={loadingRegions || !selectedZone}
  >
    <option value="">Select</option>
    {regionDropdown.map((item) => (
      <option value={item.value} key={item.value}>
        {item.label}
      </option>
    ))}
  </select>
  {errors.region && (
    <div className="invalid-feedback">
      {errors.region.message}
    </div>
  )}
</div>

{/* Branch */}
<div className="col-md-6">
  <label className="form-label">
    Branch <span className="text-danger">*</span>
  </label>
  <select
    {...register("branch", {
      required: "Branch is required",
    })}
    className={`form-select ${errors.branch ? "is-invalid" : ""}`}
    disabled={loadingBranches || !selectedRegion}
  >
    <option value="">Select</option>
    {branchDropdown.map((item) => (
      <option value={item.value} key={item.value}>
        {item.label}
      </option>
    ))}
  </select>
  {errors.branch && (
    <div className="invalid-feedback">
      {errors.branch.message}
    </div>
  )}
</div>

{/* Role */}
<div className="col-md-6">
  <label className="form-label">
    User Role <span className="text-danger">*</span>
  </label>
  <select
    {...register("userRole", {
      required: "User Role is required",
    })}
    className={`form-select ${errors.userRole ? "is-invalid" : ""}`}
  >
    <option value="">Select</option>
    {userRoleDropdown.map((item) => (
      <option value={item.value} key={item.value}>
        {item.label}
      </option>
    ))}
  </select>
  {errors.userRole && (
    <div className="invalid-feedback">
      {errors.userRole.message}
    </div>
  )}
</div>

{/* Device */}
<div className="col-md-6">
  <label className="form-label">
    User Device <span className="text-danger">*</span>
  </label>
  <select
    {...register("userDevice", {
      required: "User Device is required",
    })}
    className={`form-select ${errors.userDevice ? "is-invalid" : ""}`}
  >
    <option value="">Select</option>
    {userDeviceDropdown.map((item) => (
      <option value={item.value} key={item.value}>
        {item.label}
      </option>
    ))}
  </select>
  {errors.userDevice && (
    <div className="invalid-feedback">
      {errors.userDevice.message}
    </div>
  )}
</div>
          </div>

          {/* Buttons */}
          <div className="mt-4 text-center">
            <button type="submit" className="btn btn-primary me-2">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/User/FrmUserList")}
            >
              Close
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
  </>
);
};

export default FrmUserCreation;
