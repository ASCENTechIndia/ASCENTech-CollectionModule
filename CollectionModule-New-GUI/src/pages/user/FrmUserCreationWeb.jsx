import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import { Link } from "react-router-dom";

const FrmUserCreationWeb = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      userId: "",
      userRole: "",
      companyCode: "",
      firstName: "",
      lastName: "",
      mobileNumber: "",
      userIdProof: "",
      idProofNo: "",
      employerName: "",
      collectionTeam: "",
      branch: "",
      userDevice: "",
      employeeCode: "",
      dob: "",
      emailId: "",
      uploadIdProof: "",
      workingFor: "",
      userDesignation: "",
      productCategorisation: "",
    },
  });

  const navigate = useNavigate();
  const { user } = useAuth();
  const { showError, showSuccess } = useNotification();
  const userName = user?.userName;

  const [loadingDropdown, setLoadingDropdown] = useState(false);
  const [branchOptions, setBranchOptions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [deviceOptions, setDeviceOptions] = useState([]);
  const [userIdProofOptions, setUserIdProofOptions] = useState([]);
  const [employerNameOptions, setEmployerNameOptions] = useState([]);
  const [collectionTeamOptions, setCollectionTeamOptions] = useState([]);
  const [workingForOptions, setWorkingForOptions] = useState([]);
  const [userDesignationOptions, setUserDesignationOptions] = useState([]);
  const [productCategorizationOptions, setProductCategorizationOptions] =
    useState([]);
  const [companyCodeOptions, setCompanyCodeOptions] = useState([]);

  // Fetch branches from the dedicated endpoint
  const fetchBranches = async () => {
    try {
      const response = await apiClient.get(`/web-creation/branches`, {});
      if (response?.success && Array.isArray(response.data)) {
        const formattedOptions = response.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setBranchOptions(formattedOptions);
      } else {
        setBranchOptions([]);
        showError(response?.message || "Failed to load branches");
      }
    } catch (error) {
      console.error(error);
      setBranchOptions([]);
      showError(error?.message || "Failed to load branches");
    }
  };

  // Fetch roles (separate API)
  const fetchRoles = async () => {
    try {
      const response = await apiClient.get(`/users/getRoles`, {});
      if (response.success && Array.isArray(response.data)) {
        const formattedOptions = response.data.map((item) => ({
          label: item.VAR_USERROLE_NAME,
          value: item.NUM_USERROLE_ID,
        }));
        setRoleOptions(formattedOptions);
      } else {
        setRoleOptions([]);
      }
    } catch (error) {
      console.error(error);
      setRoleOptions([]);
      showError("Failed to load roles");
    }
  };

  // Fetch all form options from the new API
  const fetchFormOptions = async () => {
    try {
      const response = await apiClient.get(`/web-creation/form-options`, {});
      // Working For
      if (response?.workingFor?.length) {
        setWorkingForOptions(
          response.workingFor.map((item) => ({
            value: item.id,
            label: item.name,
          })),
        );
      } else setWorkingForOptions([]);

      // Designation
      if (response?.designation?.length) {
        setUserDesignationOptions(
          response.designation.map((item) => ({
            value: item.id,
            label: item.name,
          })),
        );
      } else setUserDesignationOptions([]);

      // Collection Team
      if (response?.collectionTeam?.length) {
        setCollectionTeamOptions(
          response.collectionTeam.map((item) => ({
            value: item.id,
            label: item.name,
          })),
        );
      } else setCollectionTeamOptions([]);

      // Product Category
      if (response?.productCategory?.length) {
        setProductCategorizationOptions(
          response.productCategory.map((item) => ({
            value: item.id,
            label: item.name,
          })),
        );
      } else setProductCategorizationOptions([]);

      // Company Code
      if (response?.companyCode?.length) {
        setCompanyCodeOptions(
          response.companyCode.map((item) => ({
            value: item.id,
            label: item.name,
          })),
        );
      } else setCompanyCodeOptions([]);

      // Employer
      if (response?.employer?.length) {
        setEmployerNameOptions(
          response.employer.map((item, idx) => ({
            value: item.name,
            label: item.name,
          })),
        );
      } else setEmployerNameOptions([]);

      // ID Proof
      if (response?.idProof?.length) {
        setUserIdProofOptions(
          response.idProof.map((item) => ({
            value: item.id,
            label: item.name,
          })),
        );
      } else setUserIdProofOptions([]);

      // User Device
      if (response?.userDevice?.length) {
        setDeviceOptions(
          response.userDevice.map((item) => ({
            value: item.id,
            label: item.name,
          })),
        );
      } else setDeviceOptions([]);
    } catch (error) {
      console.error("Error fetching form options:", error);
      setWorkingForOptions([]);
      setUserDesignationOptions([]);
      setCollectionTeamOptions([]);
      setProductCategorizationOptions([]);
      setCompanyCodeOptions([]);
      setEmployerNameOptions([]);
      setUserIdProofOptions([]);
      setDeviceOptions([]);
      showError(error?.message || "Failed to load form options");
    }
  };

  const onSubmit = async (values) => {
    try {
      const payload = {
        in_brid: Number(values.branch),
        in_userid: values.userId || "",
        in_username: `${values.firstName.trim()} ${values.lastName.trim()}`,
        in_userpwd: "",
        in_mobno: Number(values.mobileNumber),
        in_email: values.emailId || "",
        in_usertypeid: Number(values.userDevice),
        in_DOB: values.dob || null,
        in_proofno: values.idProofNo || null,
        in_desgid: Number(values.userDesignation),
        in_roleid: Number(values.userRole),
        in_compcode: Number(values.companyCode),
        in_workid: Number(values.workingFor),
        in_empid: Number(values.employerName),
        in_collectionid: Number(values.collectionTeam),
        in_categoryid: Number(values.productCategorisation),
        in_mode: 1,
        in_status: "A",
        in_Empcode: values.employeeCode,
        in_firstname: values.firstName.trim(),
        in_lastname: values.lastName.trim(),
        in_prooftype: Number(values.userIdProof) || 0,
        in_compid: 0,
        in_insby: userName,
      };

      const response = await apiClient.post("/users/createWebUser", payload);

      if (response?.data?.Out_errorCode === 9999) {
        showSuccess(response.data.Out_ErrorMsg || "User created successfully");
        reset();
      } else {
        showError(response?.data?.Out_ErrorMsg || "Something went wrong");
      }
    } catch (error) {
      console.error(error?.response?.data);
      showError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to create user",
      );
    }
  };

  useEffect(() => {
    const initializeDropdowns = async () => {
      setLoadingDropdown(true);
      await Promise.all([fetchBranches(), fetchRoles(), fetchFormOptions()]);
      setLoadingDropdown(false);
    };
    initializeDropdowns();
  }, []);

  return (
    <>
      {loadingDropdown && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.4)", zIndex: 9999 }}
        >
          <div
            className="spinner-border text-light"
            style={{ width: "3rem", height: "3rem" }}
          />
        </div>
      )}
      <div className="main-content">
        <div className="page-header">
          <h1 className="page-title">Web User Creation</h1>
        </div>

        <div className="card">
          <div className="card-header">
            <h5>Create Web User</h5>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                {/* LEFT COLUMN */}
                <div className="col-md-6">
                  {/* User ID */}
                  <div className="mb-3">
                    <label className="form-label">
                      User ID <span className="text-danger">*</span>
                    </label>
                    <input
                      {...register("userId", {
                        required: "User ID is required",
                      })}
                      className={`form-control ${errors.userId ? "is-invalid" : ""}`}
                    />
                    {errors.userId && (
                      <div className="invalid-feedback">
                        {errors.userId.message}
                      </div>
                    )}
                  </div>

                  {/* User Role */}
                  <div className="mb-3">
                    <label className="form-label">
                      User Role <span className="text-danger">*</span>
                    </label>
                    <select
                      {...register("userRole", {
                        required: "User Role is required",
                      })}
                      className={`form-select ${errors.userRole ? "is-invalid" : ""}`}
                    >
                      <option value="">-- Select Option --</option>
                      {roleOptions.map((i) => (
                        <option key={i.value} value={i.value}>
                          {i.label}
                        </option>
                      ))}
                    </select>
                    {errors.userRole && (
                      <div className="invalid-feedback">
                        {errors.userRole.message}
                      </div>
                    )}
                  </div>

                  {/* Company Code */}
                  <div className="mb-3">
                    <label className="form-label">
                      Company Code <span className="text-danger">*</span>
                    </label>
                    <select
                      {...register("companyCode", {
                        required: "Company Code is required",
                      })}
                      className={`form-select ${errors.companyCode ? "is-invalid" : ""}`}
                    >
                      <option value="">-- Select Option --</option>
                      {companyCodeOptions.map((i) => (
                        <option key={i.value} value={i.value}>
                          {i.label}
                        </option>
                      ))}
                    </select>
                    {errors.companyCode && (
                      <div className="invalid-feedback">
                        {errors.companyCode.message}
                      </div>
                    )}
                  </div>

                  {/* User Name */}
                  <div className="mb-3">
                    <label className="form-label">
                      User Name <span className="text-danger">*</span>
                    </label>
                    <div className="row g-2">
                      <div className="col-6">
                        <input
                          placeholder="FIRST NAME"
                          {...register("firstName", {
                            required: "First Name is required",
                          })}
                          onChange={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^A-Za-z\s]/g,
                              "",
                            );
                          }}
                          className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                        />
                        {errors.firstName && (
                          <div className="invalid-feedback">
                            {errors.firstName.message}
                          </div>
                        )}
                      </div>
                      <div className="col-6">
                        <input
                          placeholder="LAST NAME"
                          {...register("lastName", {
                            required: "Last Name is required",
                          })}
                          onChange={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^A-Za-z\s]/g,
                              "",
                            );
                          }}
                          className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                        />
                        {errors.lastName && (
                          <div className="invalid-feedback">
                            {errors.lastName.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Mobile No. */}
                  <div className="mb-3">
                    <label className="form-label">
                      Mobile No. <span className="text-danger">*</span>
                    </label>
                    <input
                      maxLength={10}
                      {...register("mobileNumber", {
                        required: "Mobile Number is required",
                      })}
                      onChange={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                      }}
                      className={`form-control ${errors.mobileNumber ? "is-invalid" : ""}`}
                    />
                    {errors.mobileNumber && (
                      <div className="invalid-feedback">
                        {errors.mobileNumber.message}
                      </div>
                    )}
                  </div>

                  {/* User ID Proof */}
                  <div className="mb-3">
                    <label className="form-label">User ID Proof</label>
                    <select
                      {...register("userIdProof")}
                      className={`form-select ${errors.userIdProof ? "is-invalid" : ""}`}
                    >
                      <option value="">-- Select Option --</option>
                      {userIdProofOptions.map((i) => (
                        <option key={i.value} value={i.value}>
                          {i.label}
                        </option>
                      ))}
                    </select>
                    {errors.userIdProof && (
                      <div className="invalid-feedback">
                        {errors.userIdProof.message}
                      </div>
                    )}
                  </div>

                  {/* ID Proof No. */}
                  <div className="mb-3">
                    <label className="form-label">ID Proof No.</label>
                    <input
                      {...register("idProofNo")}
                      className={`form-control ${errors.idProofNo ? "is-invalid" : ""}`}
                    />
                    {errors.idProofNo && (
                      <div className="invalid-feedback">
                        {errors.idProofNo.message}
                      </div>
                    )}
                  </div>

                  {/* Employer Name */}
                  <div className="mb-3">
                    <label className="form-label">Employer Name</label>
                    <select
                      {...register("employerName")}
                      className={`form-select ${errors.employerName ? "is-invalid" : ""}`}
                    >
                      <option value="">-- Select Option --</option>
                      {employerNameOptions.map((i) => (
                        <option key={i.value} value={i.value}>
                          {i.label}
                        </option>
                      ))}
                    </select>
                    {errors.employerName && (
                      <div className="invalid-feedback">
                        {errors.employerName.message}
                      </div>
                    )}
                  </div>

                  {/* Collection Team */}
                  <div className="mb-3">
                    <label className="form-label">Collection Team</label>
                    <select
                      {...register("collectionTeam")}
                      className={`form-select ${errors.collectionTeam ? "is-invalid" : ""}`}
                    >
                      <option value="">-- Select Option --</option>
                      {collectionTeamOptions.map((i) => (
                        <option key={i.value} value={i.value}>
                          {i.label}
                        </option>
                      ))}
                    </select>
                    {errors.collectionTeam && (
                      <div className="invalid-feedback">
                        {errors.collectionTeam.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="col-md-6">
                  {/* Branch */}
                  <div className="mb-3">
                    <label className="form-label">
                      Branch <span className="text-danger">*</span>
                    </label>
                    <select
                      {...register("branch", {
                        required: "Branch is required",
                      })}
                      className={`form-select ${errors.branch ? "is-invalid" : ""}`}
                    >
                      <option value="">-- Select Option --</option>
                      {branchOptions.map((i) => (
                        <option key={i.value} value={i.value}>
                          {i.label}
                        </option>
                      ))}
                    </select>
                    {errors.branch && (
                      <div className="invalid-feedback">
                        {errors.branch.message}
                      </div>
                    )}
                  </div>

                  {/* User Device */}
                  <div className="mb-3">
                    <label className="form-label">
                      User Device <span className="text-danger">*</span>
                    </label>
                    <select
                      {...register("userDevice", {
                        required: "User Device is required",
                      })}
                      className={`form-select ${errors.userDevice ? "is-invalid" : ""}`}
                    >
                      <option value="">-- Select Option --</option>
                      {deviceOptions.map((i) => (
                        <option key={i.value} value={i.value}>
                          {i.label}
                        </option>
                      ))}
                    </select>
                    {errors.userDevice && (
                      <div className="invalid-feedback">
                        {errors.userDevice.message}
                      </div>
                    )}
                  </div>

                  {/* Employee Code */}
                  <div className="mb-3">
                    <label className="form-label">
                      Employee Code <span className="text-danger">*</span>
                    </label>
                    <input
                      {...register("employeeCode", {
                        required: "Employee Code is required",
                      })}
                      onChange={(e) => {
                        e.target.value = e.target.value.replace(
                          /[^A-Za-z0-9]/g,
                          "",
                        );
                      }}
                      className={`form-control ${errors.employeeCode ? "is-invalid" : ""}`}
                    />
                    {errors.employeeCode && (
                      <div className="invalid-feedback">
                        {errors.employeeCode.message}
                      </div>
                    )}
                  </div>

                  {/* D.O.B. */}
                  <div className="mb-3">
                    <label className="form-label">User D.O.B.</label>
                    <input
                      type="date"
                      {...register("dob")}
                      className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                    />
                    {errors.dob && (
                      <div className="invalid-feedback">
                        {errors.dob.message}
                      </div>
                    )}
                  </div>

                  {/* Email ID */}
                  <div className="mb-3">
                    <label className="form-label">Email ID</label>
                    <input
                      type="email"
                      {...register("emailId")}
                      className={`form-control ${errors.emailId ? "is-invalid" : ""}`}
                    />
                    {errors.emailId && (
                      <div className="invalid-feedback">
                        {errors.emailId.message}
                      </div>
                    )}
                  </div>

                  {/* Upload ID Proof */}
                  <div className="mb-3">
                    <label className="form-label">Upload ID Proof</label>
                    <input
                      type="file"
                      {...register("uploadIdProof")}
                      className={`form-control ${errors.uploadIdProof ? "is-invalid" : ""}`}
                    />
                    {errors.uploadIdProof && (
                      <div className="invalid-feedback">
                        {errors.uploadIdProof.message}
                      </div>
                    )}
                  </div>

                  {/* Working For */}
                  <div className="mb-3">
                    <label className="form-label">
                      Working For <span className="text-danger">*</span>
                    </label>
                    <select
                      {...register("workingFor", {
                        required: "Working For is required",
                      })}
                      className={`form-select ${errors.workingFor ? "is-invalid" : ""}`}
                    >
                      <option value="">-- Select Option --</option>
                      {workingForOptions.map((i) => (
                        <option key={i.value} value={i.value}>
                          {i.label}
                        </option>
                      ))}
                    </select>
                    {errors.workingFor && (
                      <div className="invalid-feedback">
                        {errors.workingFor.message}
                      </div>
                    )}
                  </div>

                  {/* User Designation */}
                  <div className="mb-3">
                    <label className="form-label">
                      User Designation <span className="text-danger">*</span>
                    </label>
                    <select
                      {...register("userDesignation", {
                        required: "User Designation is required",
                      })}
                      className={`form-select ${errors.userDesignation ? "is-invalid" : ""}`}
                    >
                      <option value="">-- Select Option --</option>
                      {userDesignationOptions.map((i) => (
                        <option key={i.value} value={i.value}>
                          {i.label}
                        </option>
                      ))}
                    </select>
                    {errors.userDesignation && (
                      <div className="invalid-feedback">
                        {errors.userDesignation.message}
                      </div>
                    )}
                  </div>

                  {/* Product Categorisation */}
                  <div className="mb-3">
                    <label className="form-label">
                      Product Categorisation{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <select
                      {...register("productCategorisation", {
                        required: "Product Categorisation is required",
                      })}
                      className={`form-select ${errors.productCategorisation ? "is-invalid" : ""}`}
                    >
                      <option value="">-- Select Option --</option>
                      {productCategorizationOptions.map((i) => (
                        <option key={i.value} value={i.value}>
                          {i.label}
                        </option>
                      ))}
                    </select>
                    {errors.productCategorisation && (
                      <div className="invalid-feedback">
                        {errors.productCategorisation.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>

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

export default FrmUserCreationWeb;
