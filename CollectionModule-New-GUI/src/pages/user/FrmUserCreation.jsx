import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { Link } from 'react-router-dom'
import { useNotification } from "../../context/NotificationContext";

const FrmUserCreation = () => {
  const navigate = useNavigate();
  const { showError } = useNotification();
  const [loadingDropdown, setLoadingDropdown] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      workingFor: "",
      employeeCode: "",
      firstName: "",
      lastName: "",
      dob: "",
      mobileNumber: "",
      emailId: "",
      userDesignation: "",
      branch: "",
      productCategorisation: "",
      collectionTeam: "",
      userDevice: "",
      userIdProof: "",
      uploadIdProof: "",
      idProofNo: "",
      userId: "",
      userRole: "",
      employerName: "",
      companyCode: "",
    },
  });

  const [workingDropdown, setWorkingDropdown] = useState([]);
  const [designationDropdown, setDesignationDropdown] = useState([]);
  const [userRoleDropdown, setUserRoleDropdown] = useState([]);
  const [userDeviceDropdown, setUserDeviceDropdown] = useState([]);
  const [collectionTeamDropdown, setCollectionTeamDropdown] = useState([]);
  const [productCategoryDropdown, setProductCategoryDropdown] = useState([]);
  const [userIdProofDropdown, setUserIdProofDropdown] = useState([]);
  const [employerNameDropdown, setEmployerNameDropdown] = useState([]);
  const [companyCodeDropdown, setCompanyCodeDropdown] = useState([]);
  const [branchDropdown, setBranchDropdown] = useState([]);

  const onSubmit = async (values) => {
    console.log(values);

    try {
      const payload = {
        branchId: Number(values.branch),
        in_userid: values.userId || "",
        in_username: `${values.firstName} ${values.lastName}`,
        firstName: values.firstName,
        lastName: values.lastName,
        mobileNo: values.mobileNumber,
        emailId: values.emailId || "",
        dob: values.dob || "",
        userDeviceId: Number(values.userDevice),
        idProofNo: values.idProofNo || "",
        designationId: Number(values.userDesignation),
        roleId: Number(values.userRole),
        companyCodeId: Number(values.companyCode),
        workingForId: Number(values.workingFor),
        employerId: Number(values.employerName),
        empcode: values.employeeCode || "",
        collectionTeamId: Number(values.collectionTeam),
        categoryId: Number(values.productCategorisation),
        mode: 1,
        idProofType: Number(values.userIdProof),
        compId: 0,
        requestStatus: "A",
      };

      const res = await apiClient.post("/users/add-mobile-user", payload);

      if (res?.success && res?.data?.Out_errorCode === 9999) {
        window.alert(res.data.Out_ErrorMsg || "User created successfully");
        reset();
        navigate("/user/user-list");
      } else {
        window.alert(res?.data?.Out_ErrorMsg || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      window.alert(error?.response?.data?.message || error.message || "Failed to create user. Please try again.");
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

        // Collection Team
        if (res?.data?.collectionTeams?.length > 0) {
          const dd = res.data.collectionTeams.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setCollectionTeamDropdown(dd);
        } else {
          setCollectionTeamDropdown([]);
        }

        // Product Category
        if (res?.data?.productCategories?.length > 0) {
          const dd = res.data.productCategories.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setProductCategoryDropdown(dd);
        } else {
          setProductCategoryDropdown([]);
        }

        // User ID Proof
        if (res?.data?.userIdProofs?.length > 0) {
          const dd = res.data.userIdProofs.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setUserIdProofDropdown(dd);
        } else {
          setUserIdProofDropdown([]);
        }

        // Employer Name
        if (res?.data?.employers?.length > 0) {
          const dd = res.data.employers.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setEmployerNameDropdown(dd);
        } else {
          setEmployerNameDropdown([]);
        }

        // Company Code
        if (res?.data?.companyCodes?.length > 0) {
          const dd = res.data.companyCodes.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setCompanyCodeDropdown(dd);
        } else {
          setCompanyCodeDropdown([]);
        }

        // Branch
        if (res?.data?.branches?.length > 0) {
          const dd = res.data.branches.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setBranchDropdown(dd);
        } else {
          setBranchDropdown([]);
        }
      } else {
        setWorkingDropdown([]);
        setDesignationDropdown([]);
        setUserRoleDropdown([]);
        setUserDeviceDropdown([]);
        setCollectionTeamDropdown([]);
        setProductCategoryDropdown([]);
        setUserIdProofDropdown([]);
        setEmployerNameDropdown([]);
        setCompanyCodeDropdown([]);
        setBranchDropdown([]);
      }
    } catch (error) {
      setWorkingDropdown([]);
      setDesignationDropdown([]);
      setUserRoleDropdown([]);
      setUserDeviceDropdown([]);
      setCollectionTeamDropdown([]);
      setProductCategoryDropdown([]);
      setUserIdProofDropdown([]);
      setEmployerNameDropdown([]);
      setCompanyCodeDropdown([]);
      setBranchDropdown([]);
      console.error(error);
      showError(error.message || "Failed to fetch form options");
    } finally {
      setLoadingDropdown(false);
    }
  };

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
          <div className="row">
            {/* LEFT COLUMN */}
            <div className="col-md-6">
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

              {/* User Name - First Name & Last Name */}
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
                        pattern: {
                          value: /^[A-Za-z\s]+$/,
                          message: "Only alphabets allowed",
                        },
                      })}
                      onChange={(e) => {
                        e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
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
                        pattern: {
                          value: /^[A-Za-z\s]+$/,
                          message: "Only alphabets allowed",
                        },
                      })}
                      onChange={(e) => {
                        e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
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
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter valid 10 digit mobile number",
                    },
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

              {/* Collection Team */}
              <div className="mb-3">
                <label className="form-label">Collection Team</label>
                <select
                  {...register("collectionTeam")}
                  className={`form-select ${errors.collectionTeam ? "is-invalid" : ""}`}
                >
                  <option value="">-- Select Option --</option>
                  {collectionTeamDropdown.map((item) => (
                    <option value={item.value} key={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                {errors.collectionTeam && (
                  <div className="invalid-feedback">
                    {errors.collectionTeam.message}
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

              {/* User ID Proof */}
              <div className="mb-3">
                <label className="form-label">User ID Proof</label>
                <select
                  {...register("userIdProof")}
                  className={`form-select ${errors.userIdProof ? "is-invalid" : ""}`}
                >
                  <option value="">-- Select Option --</option>
                  {userIdProofDropdown.map((item) => (
                    <option value={item.value} key={item.value}>
                      {item.label}
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
                  {employerNameDropdown.map((item) => (
                    <option value={item.value} key={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                {errors.employerName && (
                  <div className="invalid-feedback">
                    {errors.employerName.message}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="col-md-6">
              {/* Employee Code */}
              <div className="mb-3">
                <label className="form-label">
                  Employee Code <span className="text-danger">*</span>
                </label>
                <input
                  {...register("employeeCode", {
                    required: "Employee Code is required",
                  })}
                  className={`form-control ${errors.employeeCode ? "is-invalid" : ""}`}
                />
                {errors.employeeCode && (
                  <div className="invalid-feedback">
                    {errors.employeeCode.message}
                  </div>
                )}
              </div>

              {/* User D.O.B. */}
              <div className="mb-3">
                <label className="form-label">User D.O.B.</label>
                <div className="input-group">
                  <input
                    type="date"
                    {...register("dob")}
                    className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                  />
                </div>
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
                  {...register("emailId", {
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter valid email address",
                    },
                  })}
                  className={`form-control ${errors.emailId ? "is-invalid" : ""}`}
                />
                {errors.emailId && (
                  <div className="invalid-feedback">
                    {errors.emailId.message}
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

              {/* Product Categorisation */}
              <div className="mb-3">
                <label className="form-label">Product Categorisation</label>
                <select
                  {...register("productCategorisation")}
                  className={`form-select ${errors.productCategorisation ? "is-invalid" : ""}`}
                >
                  <option value="">-- Select Option --</option>
                  {productCategoryDropdown.map((item) => (
                    <option value={item.value} key={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                {errors.productCategorisation && (
                  <div className="invalid-feedback">
                    {errors.productCategorisation.message}
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

              {/* User ID */}
              <div className="mb-3">
                <label className="form-label">User ID</label>
                <input
                  {...register("userId")}
                  className={`form-control ${errors.userId ? "is-invalid" : ""}`}
                />
                {errors.userId && (
                  <div className="invalid-feedback">
                    {errors.userId.message}
                  </div>
                )}
              </div>

              {/* Company Code */}
              <div className="mb-3">
                <label className="form-label">Company Code</label>
                <select
                  {...register("companyCode")}
                  className={`form-select ${errors.companyCode ? "is-invalid" : ""}`}
                >
                  <option value="">-- Select Option --</option>
                  {companyCodeDropdown.map((item) => (
                    <option value={item.value} key={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                {errors.companyCode && (
                  <div className="invalid-feedback">
                    {errors.companyCode.message}
                  </div>
                )}
              </div>
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
              onClick={() => navigate("/user/user-list")}
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
