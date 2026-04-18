import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { Link } from 'react-router-dom';

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
  <div className="main-content">
     <div className="page-header">
        <h1 className="page-title">Web User Creation</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            Home
          </Link>
          <span className="breadcrumb-item">User</span>
          <span className="breadcrumb-item active">Web User Creation</span>
        </nav>
      </div>

    <div className="card">
      <div className="card-header">
        <h5>Create Web User</h5>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="row g-3">

            {/* User Level */}
            <div className="col-md-6">
              <label className="form-label">User Level <span className="text-danger">*</span></label>
              <select
                {...register("userLevel", { required: "User Level is required" })}
                className={`form-select ${errors.userLevel ? "is-invalid" : ""}`}
                onChange={(e) => setSelectedUserLevel(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Zone">Zone</option>
                <option value="Branch">Branch</option>
                <option value="Region">Region</option>
              </select>
              {errors.userLevel && (
                <div className="invalid-feedback">
                  {errors.userLevel.message}
                </div>
              )}
            </div>

            {/* Branch */}
            <div className="col-md-6">
              <label className="form-label">Zone/Region/Branch <span className="text-danger">*</span></label>
              <select
                {...register("zoneRegionBranch", { required: "Required" })}
                className={`form-select ${errors.zoneRegionBranch ? "is-invalid" : ""}`}
              >
                <option value="">Select</option>
                {branchOptions.map((i) => (
                  <option key={i.value} value={i.value}>{i.label}</option>
                ))}
              </select>
              {errors.zoneRegionBranch && (
                <div className="invalid-feedback">
                  {errors.zoneRegionBranch.message}
                </div>
              )}
            </div>

            {/* Role */}
            <div className="col-md-6">
              <label className="form-label">User Role <span className="text-danger">*</span></label>
              <select
                {...register("userRole", { required: "User Role is required" })}
                className={`form-select ${errors.userRole ? "is-invalid" : ""}`}
              >
                <option value="">Select</option>
                {roleOptions.map((i) => (
                  <option key={i.value} value={i.value}>{i.label}</option>
                ))}
              </select>
              {errors.userRole && (
                <div className="invalid-feedback">{errors.userRole.message}</div>
              )}
            </div>

            {/* Device */}
            <div className="col-md-6">
              <label className="form-label">User Device <span className="text-danger">*</span></label>
              <select
                {...register("userDevice", { required: "User Device is required" })}
                className={`form-select ${errors.userDevice ? "is-invalid" : ""}`}
              >
                <option value="">Select</option>
                {deviceOptions.map((i) => (
                  <option key={i.value} value={i.value}>{i.label}</option>
                ))}
              </select>
              {errors.userDevice && (
                <div className="invalid-feedback">{errors.userDevice.message}</div>
              )}
            </div>

            {/* Employee Code */}
            <div className="col-md-6">
              <label className="form-label">Employee Code <span className="text-danger">*</span></label>
              <input
                {...register("employeeCode", { required: "Employee Code is required" })}
                className={`form-control ${errors.employeeCode ? "is-invalid" : ""}`}
              />
              {errors.employeeCode && (
                <div className="invalid-feedback">{errors.employeeCode.message}</div>
              )}
            </div>

            {/* User For */}
            <div className="col-md-6">
              <label className="form-label">User For <span className="text-danger">*</span></label>
              <select
                {...register("userFor", { required: "User For is required" })}
                className={`form-select ${errors.userFor ? "is-invalid" : ""}`}
              >
                <option value="">Select</option>
                <option value="1">Conneqt</option>
                <option value="2">Central Bank</option>
              </select>
              {errors.userFor && (
                <div className="invalid-feedback">{errors.userFor.message}</div>
              )}
            </div>

            {/* First Name */}
            <div className="col-md-6">
              <label className="form-label">First Name <span className="text-danger">*</span></label>
              <input
                {...register("firstName", { required: "First Name is required" })}
                className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              />
              {errors.firstName && (
                <div className="invalid-feedback">{errors.firstName.message}</div>
              )}
            </div>

            {/* Last Name */}
            <div className="col-md-6">
              <label className="form-label">Last Name <span className="text-danger">*</span></label>
              <input
                {...register("lastName", { required: "Last Name is required" })}
                className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              />
              {errors.lastName && (
                <div className="invalid-feedback">{errors.lastName.message}</div>
              )}
            </div>

            {/* Mobile */}
            <div className="col-md-6">
              <label className="form-label">Mobile Number <span className="text-danger">*</span></label>
              <input
                {...register("mobileNumber", { required: "Mobile Number is required" })}
                className={`form-control ${errors.mobileNumber ? "is-invalid" : ""}`}
              />
              {errors.mobileNumber && (
                <div className="invalid-feedback">{errors.mobileNumber.message}</div>
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
              onClick={() => navigate("/dashboard")}
            >
              Close
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
);
}

export default FrmUserCreationWeb;