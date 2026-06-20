import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { Link } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import { useAuth } from "../../context/AuthContext";

const FrmUserCreation = () => {
  const { user } = useAuth();
  // console.log("user :", user);
  // console.log(user);
  const userId = user?.id;
  // console.log(userId.split("E")[1]);
  const branchCategory = user?.compId;
  const userLevel = user?.desgId;
  const navigate = useNavigate();
  const { showError, showSuccess, showWarning } = useNotification();
  const [loadingDropdown, setLoadingDropdown] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
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
      userPassword: "",
      userDesignation: "",
      branch: "",
      productCategorisation: "",
      collectionTeam: "",
      userDevice: "1",
      userIdProof: "",
      // uploadIdProof: "",
      idProofNo: "",
      userId: "",
      userRole: "",
      employerName: "",
      companyCode: "",
      teamLead: "",
      requestStatus: "",
      skills: "",
      whatsappNumber: "",
      maxCases: "",
      geoZones: "",
      aadharNo: "",
      openCases: "",
      exitDate: "",
      joiningDate: ""
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

  const formatDateToDMY = (dateStr) => {
    if (!dateStr || typeof dateStr !== "string") return "";

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Split the string by the hyphen ("YYYY-MM-DD")
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr; // Fallback if input format is wrong

    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1; // Subtract 1 for zero-indexed array
    const day = parts[2]; // Keeps the leading zero intact (e.g., "05")

    // Safety check for valid month numbers
    if (monthIndex < 0 || monthIndex > 11) return dateStr;

    return `${day}-${months[monthIndex]}-${year}`;
  };

  const onSubmit = async (values) => {
    try {
      const loggedInID = userId.split("E")[1];
      const companyCodeLabel = companyCodeDropdown.find(item => String(item?.value) === String(values.companyCode))?.label;

      const payload1 = {
        in_brid: Number(values.branch),
        in_userid: null,
        in_username: values.firstName.trim() + " " + values.lastName.trim(),
        in_userpwd: null,
        in_mobno: Number(values.mobileNumber),
        in_email: values.emailId,
        in_usertypeid: 1,
        in_DOB: values.dob,
        in_proofno: values.idProofNo,
        in_desgid: Number(values.userDesignation),
        in_roleid: Number(values.userRole),
        in_compcode: companyCodeLabel,
        in_workid: Number(values.workingFor),
        in_empid: Number(values.empid),
        in_collectionid: Number(values.collectionTeam),
        in_categoryid: Number(values.productCategorisation),
        in_status: "A",
        in_Empcode: values.pincode,
        in_firstname: values.firstName.trim(),
        in_lastname: values.lastName.trim(),
        in_prooftype: Number(values.userIdProof),
        in_mode: 1,
        in_compid: Number(values.companyCode),
        in_insby: loggedInID,
        in_Requeststatus: values.requestStatus,
        in_var_user_teamlead: values.teamLead,
        in_num_fosmst_whatsapp: Number(values.whatsappNumber),
        in_var_fosmst_skills: values.skills,
        in_var_fosmst_geo_zones: values.geoZones,
        in_num_fosmst_max_cases_day: Number(values.maxCases),
        in_num_fosmst_current_open_cases: Number(values.openCases),
        in_var_fosmst_aadhar_ref: values.aadharNo,
        in_dat_fosmst_joining_date: values.joiningDate,
        in_dat_fosmst_exit_date: values.exitDate,
        in_num_fosmst_created_by: Number(loggedInID)
      }

      console.log(payload1);

      // Map React form values to API payload structure
      // const payload = {
      //   // User Details
      //   firstname: values.firstName || "",
      //   lastname: values.lastName || "",
      //   userid: values.userId || "",

      //   // Contact Information
      //   mobno: values.mobileNumber || "",
      //   email: values.emailId || "",
      //   dob: formatDateToDMY(values.dob) || "",

      //   // Identification
      //   prooftype: Number(values.userIdProof) || 0,
      //   proofno: values.idProofNo || "",

      //   // Employment
      //   empcode: values.employeeCode || "",
      //   desgid: Number(values.userDesignation) || 0,
      //   workid: Number(values.workingFor) || 0,
      //   empid: values.employerName ? Number(values.employerName) : null,

      //   // Organization
      //   brid: Number(values.branch) || 0,
      //   compcode: Number(values.companyCode) || 0,
      //   collectionid: Number(values.collectionTeam) || 0,
      //   categoryid: Number(values.productCategorisation) || 0,

      //   // Access Control
      //   usertypeid: Number(values.userDevice) || 0,
      //   roleid: Number(values.userRole) || 0,

      //   // Status & Metadata
      //   status: "A", // Active
      //   mode: 1, // New user mode
      //   compid: 0, // Company ID
      //   requeststatus: "A", // Request status
      //   insby: userId,
      // };
      // console.log(payload);

      const res = await apiClient.post("/user-creation/create-new", payload1);
      console.log(res);
      return;
      // if (res?.success) {
      //   showSuccess(res.message || "User created successfully");
      //   reset();
      //   navigate("/user/user-list");
      // } else {
      //   showError(res?.message || "Something went wrong");
      // }
    } catch (error) {
      console.error(error);
      showError(
        error?.response?.data?.message ||
        error.message ||
        "Failed to create user. Please try again.",
      );
    }
  };

  // Fetch branches
  const fetchBranches = async () => {
    // console.log("category :", branchCategory, userLevel);
    if (!branchCategory || !userLevel) {
      showWarning("Branch category id or user level id is not set");
      return;
    }

    try {
      const response = await apiClient.get(
        `/user-creation/branches?branchCategory=${branchCategory}&userLevel=${userLevel}`,
      );
      // console.log("resp branch:", response);
      if (response?.success && Array.isArray(response.data)) {
        const options = response.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setBranchDropdown(options);
      } else {
        setBranchDropdown([]);
        showError(response?.message || "Failed to load branches");
      }
    } catch (error) {
      console.error(error);
      setBranchDropdown([]);
      showError(error?.message || "Failed to load branches");
    }
  };

  // Fetch all dropdown except branch
  const fetchDropdown = async () => {
    setLoadingDropdown(true);
    try {
      const res = await apiClient.get("/user-creation/form-options");
      // console.log(res);
      // Working For
      if (res?.workingFor?.length) {
        setWorkingDropdown(
          res.workingFor.map((item) => ({ value: item.id, label: item.name })),
        );
      } else setWorkingDropdown([]);

      // Designation
      if (res?.designation?.length) {
        setDesignationDropdown(
          res.designation.map((item) => ({ value: item.id, label: item.name })),
        );
      } else setDesignationDropdown([]);

      // User Role
      if (res?.userRole?.length) {
        setUserRoleDropdown(
          res.userRole.map((item) => ({ value: item.id, label: item.name })),
        );
      } else setUserRoleDropdown([]);

      // User Device
      if (res?.userDevice?.length) {
        setUserDeviceDropdown(
          res.userDevice.map((item) => ({ value: item.id, label: item.name })),
        );
      } else setUserDeviceDropdown([]);

      // Collection Team
      if (res?.collectionTeam?.length) {
        setCollectionTeamDropdown(
          res.collectionTeam.map((item) => ({
            value: item.id,
            label: item.name,
          })),
        );
      } else setCollectionTeamDropdown([]);

      // Product Category
      if (res?.productCategory?.length) {
        setProductCategoryDropdown(
          res.productCategory.map((item) => ({
            value: item.id,
            label: item.name,
          })),
        );
      } else setProductCategoryDropdown([]);

      // User ID Proof (idProof)
      if (res?.idProof?.length) {
        setUserIdProofDropdown(
          res.idProof.map((item) => ({ value: item.id, label: item.name })),
        );
      } else setUserIdProofDropdown([]);

      // Employer Name
      if (res?.employer?.length) {
        setEmployerNameDropdown(
          res.employer.map((item, idx) => ({
            value: item.id,
            label: item.name,
          })),
        );
      } else setEmployerNameDropdown([]);

      // Company Code
      if (res?.companyCode?.length) {
        setCompanyCodeDropdown(
          res.companyCode.map((item) => ({ value: item.id, label: item.name })),
        );
      } else setCompanyCodeDropdown([]);
    } catch (error) {
      console.error(error);
      showError(error.message || "Failed to fetch form options");
      setWorkingDropdown([]);
      setDesignationDropdown([]);
      setUserRoleDropdown([]);
      setUserDeviceDropdown([]);
      setCollectionTeamDropdown([]);
      setProductCategoryDropdown([]);
      setUserIdProofDropdown([]);
      setEmployerNameDropdown([]);
      setCompanyCodeDropdown([]);
    } finally {
      setLoadingDropdown(false);
    }
  };



  useEffect(() => {
    const initialize = async () => {
      setLoadingDropdown(true);
      await Promise.all([fetchDropdown()]);
      setLoadingDropdown(false);
    };
    initialize();
  }, []);

  useEffect(() => {
    // console.log("branch ", branchCategory, userLevel);
    if (branchCategory && userLevel) {
      fetchBranches();
    }
  }, [branchCategory, userLevel]);

  useEffect(() => {
    if (userDeviceDropdown.length > 0) {
      setValue("userDevice", "1", { shouldValidate: false });
    }
  }, [userDeviceDropdown]);
  useEffect(() => {
    if (userRoleDropdown.length > 0) {
      setValue("userRole", "1", { shouldValidate: false });
    }
  }, [userRoleDropdown]);

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
                            pattern: {
                              value: /^[A-Za-z\s]+$/,
                              message: "Only alphabets allowed",
                            },
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
                            pattern: {
                              value: /^[A-Za-z\s]+$/,
                              message: "Only alphabets allowed",
                            },
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

                  <div className="mb-3">
                    <label className="form-label">
                      Pincode <span className="text-danger">*</span>
                    </label>
                    <input type="text"
                      maxLength={6}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                      }}
                      {...register("pincode", {
                        required: "Pincode is required"
                      })}
                      className={`form-control ${errors.pincode ? "is-invalid" : ""}`}
                    />
                    {errors.pincode && (
                      <div className="invalid-feedback">
                        {errors.pincode.message}
                      </div>
                    )}
                  </div>

                  {/* Branch (from separate API) */}
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
                      {...register("collectionTeam", {
                        required: "Collection Team is required"
                      })}
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
                      {...register("userIdProof", {
                        required: "User ID Proof is required"
                      })}
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
                      {...register("idProofNo", {
                        required: "ID Proof Number is required"
                      })}
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
                      {...register("employerName", {
                        required: "Employer Name is required"
                      })}
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
                  <div className="mb-3">
                    <label className="form-label">
                      Request Status
                    </label>
                    <select
                      {...register("requestStatus", {
                        required: "Status is required"
                      })}
                      className={`form-select ${errors.requestStatus ? "is-invalid" : ""}`}
                    >
                      <option value="">--SELECT--</option>
                      <option value="P">P</option>
                    </select>
                    {errors.requestStatus && (
                      <div className="invalid-feedback">
                        {errors.requestStatus.message}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Whatsapp Number
                    </label>
                    <input type="text"
                      {...register("whatsappNumber", {
                        required: "Whatsapp number is required"
                      })}
                      className={`form-control ${errors.requestStatus ? "is-invalid" : ""}`}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                      }}
                    />
                    {errors.whatsappNumber && (
                      <div className="invalid-feedback">
                        {errors.whatsappNumber.message}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Geo Zones
                    </label>
                    <select
                      {...register("geoZones", {
                        required: "Geo Zones is required"
                      })}
                      className={`form-select ${errors.requestStatus ? "is-invalid" : ""}`}
                    >
                      <option value="">--SELECT--</option>
                      <option value="Zone-A">Zone A</option>
                    </select>
                    {errors.geoZones && (
                      <div className="invalid-feedback">
                        {errors.geoZones.message}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Current Open Cases
                    </label>
                    <input type="text"
                      {...register("openCases", {
                        required: "Current Open Cases is required"
                      })}
                      className={`form-control ${errors.openCases ? "is-invalid" : ""}`}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                      }}
                    />
                    {errors.openCases && (
                      <div className="invalid-feedback">
                        {errors.openCases.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="col-md-6">
                  {/* Employee Code */}
                  <div className="mb-3">
                    <label className="form-label">
                      Employee Id <span className="text-danger">*</span>
                    </label>
                    <input
                      {...register("empid", {
                        required: "Employee ID is required",
                      })}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                      }}
                      className={`form-control ${errors.empid ? "is-invalid" : ""}`}
                    />
                    {errors.empid && (
                      <div className="invalid-feedback">
                        {errors.empid.message}
                      </div>
                    )}
                  </div>

                  {/* D.O.B. */}
                  <div className="mb-3">
                    <label className="form-label">User D.O.B.</label>
                    <input
                      type="date"
                      {...register("dob", {
                        required: "DOB is required"
                      })}
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
                      {...register("emailId", {
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter valid email address",
                        },
                        required: "Email ID is required"
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
                      {...register("productCategorisation", {
                        required: "Product Category is required"
                      })}
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
                  {/* <div className="mb-3">
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
                  </div> */}

                  {/* User ID */}
                  {/* <div className="mb-3">
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
                  </div> */}

                  {/* Company Code */}
                  <div className="mb-3">
                    <label className="form-label">Company Code</label>
                    <select
                      {...register("companyCode", {
                        required: "Company code is required"
                      })}
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

                  <div className="mb-3">
                    <label className="form-label">
                      Team Lead
                    </label>
                    <select
                      {...register("teamLead", {
                        required: "Team Lead is required"
                      })}
                      className={`form-select ${errors.teamLead ? "is-invalid" : ""}`}
                    >
                      <option value="">--SELECT--</option>
                      <option value="sam">Sam</option>
                    </select>
                    {errors.teamLead && (
                      <div className="invalid-feedback">
                        {errors.teamLead.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Skills
                    </label>
                    <select
                      {...register("skills", {
                        required: "Skills is required"
                      })}
                      className={`form-select ${errors.skills ? "is-invalid" : ""}`}
                    >
                      <option value="">--SELECT--</option>
                      <option value="1">Skill 1</option>
                    </select>
                    {errors.skills && (
                      <div className="invalid-feedback">
                        {errors.skills.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Max Cases
                    </label>
                    <input type="text"
                      {...register("maxCases", {
                        required: "Max Cases is required"
                      })}
                      className={`form-control ${errors.maxCases ? "is-invalid" : ""}`}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                      }}
                    />
                    {errors.maxCases && (
                      <div className="invalid-feedback">
                        {errors.maxCases.message}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Aadhaar Number
                    </label>
                    <input type="text"
                      maxLength={12}
                      {...register("aadharNo", {
                        required: "Aadhar number is required"
                      })}
                      className={`form-control ${errors.aadharNo ? "is-invalid" : ""}`}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                      }}
                    />
                    {errors.aadharNo && (
                      <div className="invalid-feedback">
                        {errors.aadharNo.message}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Exit Date
                    </label>
                    <input type="date"
                      {...register("exitDate", {
                        required: "Exit Date is required"
                      })}
                      className={`form-control ${errors.exitDate ? "is-invalid" : ""}`}
                    />
                    {errors.exitDate && (
                      <div className="invalid-feedback">
                        {errors.exitDate.message}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Joining Date
                    </label>
                    <input type="date"
                      {...register("joiningDate", {
                        required: "Joining Date is required"
                      })}
                      className={`form-control ${errors.joiningDate ? "is-invalid" : ""}`}
                    />
                    {errors.exitDate && (
                      <div className="invalid-feedback">
                        {errors.exitDate.message}
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
