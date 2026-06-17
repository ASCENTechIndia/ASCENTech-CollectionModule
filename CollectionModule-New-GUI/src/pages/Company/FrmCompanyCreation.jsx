import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import apiClient from "../../services/apiClient";
import { useNotification } from "../../context/NotificationContext";

const branchOptions = [
  { value: "1", label: "Branch 1" },
  { value: "2", label: "Branch 2" },
];

const FrmCompanyCreation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const username = user?.userName;
  const brCategory = user?.brCategory;
  const { showError, showSuccess } = useNotification();
  const {
    register,
    handleSubmit,
    // setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
      name: "",
      legalName: "",
      companyType: "",
      status: "active",

      pan: "",
      gst: "",
      cin: "",

      remark: "",
      branch: "",
      logo: "",
      operatorId: "",

      addressLine1: "",
      ishoBranch: "",
      // city: "",
      // state: "",
      // country: "India",

      primaryEmail: "",
      // escalationEmail: "",
      configuration: [],
      phone: "",

      // brandingTheme: "",
      // slaDefault: "",
    },
  });

  // const handleLogoChange = (e) => {
  //   const file = e.target.files[0];

  //   if (file) {
  //     setValue("logo", file, {
  //       shouldValidate: true,
  //     });
  //   }
  // };

  const selectedLogo = watch("logo");
  const selectedBranch = watch("branch");
  const selectedBranchLabel =
    branchOptions.find((b) => b.value === selectedBranch)?.label;
  const file = selectedLogo?.[0];

  const formatFileSize = (bytes) => {
    if (!bytes) return "";

    if (bytes < 1024) return `${bytes} B`;

    if (bytes < 1024 * 1024)
      return `${(bytes / 1024).toFixed(1)} KB`;

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (values) => {
    try {
      const file = values.logo?.[0];

      let logoBase64 = "";

      if (file) {
        logoBase64 = await convertToBase64(file);
      }

      const payload = {
        username,
        compid: values.code,
        cin: values.cin,
        compname: values.name,
        status: values.status,
        legalname: values.legalName,
        email: values.primaryEmail,
        companytype: values.companyType,
        upassoperid: values.operatorId,
        pan: values.pan,
        ishobranch: values.ishoBranch,
        address: values.addressLine1,
        gst: values.gst,
        remark: values.remark,
        mobileno: values.phone,
        branchname: selectedBranchLabel,
        brcategory: brCategory,
        logo: logoBase64,
        branchcode: values.branch,
        config: values.configuration
      };

      console.log(payload);
      return;

      // const response = await apiClient.post("", payload);
      // console.log(response);

      // if (response.success) {
      //   reset();
      //   showSuccess("")
      // }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <h1 className="page-title">Company Master</h1>
      </div>

      <div className="card">
        <div className="card-header">
          <h5>Create Company</h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              {/* LEFT */}

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Company Code *
                  </label>

                  <input
                    {...register("code", {
                      required: "Company Code required",
                    })}
                    className={`form-control ${errors.code ? "is-invalid" : ""
                      }`}
                  />

                  <div className="invalid-feedback">
                    {errors.code?.message}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Company Name *
                  </label>

                  <input
                    {...register("name", {
                      required: "Company Name required",
                    })}
                    className={`form-control ${errors.name ? "is-invalid" : ""
                      }`}
                  />
                  <div className="invalid-feedback">
                    {errors.name?.message}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Legal Name
                  </label>

                  <input
                    {...register("legalName", {
                      required: "Legal Name required",
                    })}
                    className={`form-control ${errors.legalName ? "is-invalid" : ""
                      }`}
                  />
                  <div className="invalid-feedback">
                    {errors.legalName?.message}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Company Type *
                  </label>

                  <select
                    {...register("companyType", {
                      required: "Company Type is required",
                    })}
                    className={`form-select ${errors.companyType ? "is-invalid" : ""
                      }`}
                  >
                    <option value="">Select</option>
                    <option value="bank">Bank</option>
                    <option value="nbfc">NBFC</option>
                    <option value="fintech">Fintech</option>
                    <option value="utility">Utility</option>
                    <option value="telecom">Telecom</option>
                  </select>

                  <div className="invalid-feedback">
                    {errors.companyType?.message}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    PAN
                  </label>

                  <input
                    {...register("pan", {
                      required: "PAN is required",
                    })}
                    // maxLength={10}
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .replace(/[^a-zA-Z0-9]/g, ""); // remove special characters        
                    }}
                    className={`form-control ${errors.pan ? "is-invalid" : ""
                      }`}
                  />
                  <div className="invalid-feedback">
                    {errors.pan?.message}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    GST
                  </label>

                  <input
                    {...register("gst", {
                      required: "GST is required",
                    })}
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .replace(/[^a-zA-Z0-9]/g, ""); // remove special characters        
                    }}
                    className={`form-control ${errors.gst ? "is-invalid" : ""
                      }`}
                  />
                  <div className="invalid-feedback">
                    {errors.gst?.message}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Phone
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={10}
                    {...register("phone", {
                      required: "Mobile number is required"
                    })}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, "");
                    }}
                    className={`form-control ${errors.phone ? "is-invalid" : ""
                      }`}
                  />
                  <div className="invalid-feedback">
                    {errors.phone?.message}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Branch Name
                  </label>

                  {/* <input
                    {...register("branch")}
                    className="form-control"
                  /> */}

                  <select
                    {...register("branch", {
                      required: "Branch is required"
                    })}
                    className={`form-select ${errors.branch ? "is-invalid" : ""
                      }`}
                  >
                    <option value="">SELECT</option>
                    {branchOptions.map((b) => (
                      <option key={b.value} value={b.value}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">
                    {errors.branch?.message}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Logo</label>

                  <label
                    htmlFor="logoInput"
                    className="upload-dropzone d-flex align-items-center p-2 border rounded"
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    <div className="me-2">
                      <i className="bi bi-cloud-arrow-up fs-4 text-primary"></i>
                    </div>

                    <div>
                      {file ? (
                        <>
                          <div>{file.name}</div>

                          <small className="text-muted">
                            {formatFileSize(file.size)}
                          </small>
                        </>
                      ) : (
                        <span>Click to upload logo</span>
                      )}
                    </div>
                  </label>

                  <input
                    id="logoInput"
                    type="file"
                    hidden
                    accept="image/*"
                    {...register("logo", {
                      required: "Please select a logo file",
                    })}
                  />

                  {errors.logo && (
                    <div className="text-danger">
                      <small>{errors.logo.message}</small>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT */}

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    CIN
                  </label>

                  <input
                    {...register("cin", {
                      required: "CIN is required"
                    })}
                    className={`form-control ${errors.cin ? "is-invalid" : ""
                      }`}
                  />
                  <div className="invalid-feedback">
                    {errors.cin?.message}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Status
                  </label>

                  <select
                    {...register("status", {
                      required: "Status is required"
                    })}
                    className={`form-select ${errors.status ? "is-invalid" : ""
                      }`}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                    <option value="onboarding">Onboarding</option>
                  </select>
                  <div className="invalid-feedback">
                    {errors.status?.message}
                  </div>
                </div>

                {/* <div className="mb-3">
                    <label className="form-label">
                      City
                    </label>

                    <input
                      {...register("city")}
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      State
                    </label>

                    <input
                      {...register("state")}
                      className="form-control"
                    />
                  </div>

                <div className="mb-3">
                  <label className="form-label">
                    Country
                  </label>

                  <input
                    {...register("country")}
                    className="form-control"
                  />
                </div> */}

                <div className="mb-3">
                  <label className="form-label">
                    Primary Email
                  </label>

                  <input
                    type="email"
                    {...register("primaryEmail", {
                      required: "Email is required"
                    })}
                    className={`form-control ${errors.primaryEmail ? "is-invalid" : ""
                      }`}
                  />
                  <div className="invalid-feedback">
                    {errors.primaryEmail?.message}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    UPass Operator ID
                  </label>
                  <select
                    {...register("operatorId", {
                      required: "UPass Operator ID is required",
                    })}
                    className={`form-select ${errors.operatorId ? "is-invalid" : ""
                      }`}
                  >
                    <option value="">Select</option>
                    <option value="E1">Emp 1</option>
                  </select>
                  <div className="invalid-feedback">
                    {errors.operatorId?.message}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    IshoBranch
                  </label>
                  <select
                    {...register("ishoBranch", {
                      required: "IshoBranch is required",
                    })}
                    className={`form-select ${errors.ishoBranch ? "is-invalid" : ""
                      }`}
                  >
                    <option value="">Select</option>
                    <option value="B1">B1</option>
                  </select>
                  <div className="invalid-feedback">
                    {errors.ishoBranch?.message}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Address
                  </label>

                  <textarea
                    rows="3"
                    {...register("addressLine1", {
                      required: "Address is required"
                    })}
                    className={`form-control ${errors.addressLine1 ? "is-invalid" : ""
                      }`}
                  />
                  <div className="invalid-feedback">
                    {errors.addressLine1?.message}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Remark
                  </label>

                  <textarea
                    rows="3"
                    {...register("remark", {
                      required: "Remark is required"
                    })}
                    className={`form-control ${errors.remark ? "is-invalid" : ""
                      }`}
                  />
                  <div className="invalid-feedback">
                    {errors.remark?.message}
                  </div>
                </div>

              </div>
            </div>

            <hr />

            <h5 className="mb-3">
              Configuration
            </h5>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Configuration
                  </label>

                  {/* <input
                    {...register("escalationEmail")}
                    className="form-control"
                  /> */}

                  <select
                    multiple
                    {...register("configuration", {
                      required: "Configuration is required",
                    })}
                    className={`form-select ${errors.configuration ? "is-invalid" : ""
                      }`}
                  >
                    <option value="">Select</option>
                    <option value="TC">Test Config</option>
                    <option value="DC">Demo Config</option>
                  </select>
                  <div className="invalid-feedback">
                    {errors.configuration?.message}
                  </div>
                </div>
              </div>

              {/* <div className="col-md-3">
                <div className="mb-3">
                  <label className="form-label">
                    Branding Theme
                  </label>

                  <input
                    {...register("brandingTheme")}
                    className="form-control"
                  />
                </div>
              </div> */}

              {/* <div className="col-md-3">
                <div className="mb-3">
                  <label className="form-label">
                    SLA Default
                  </label>

                  <input
                    {...register("slaDefault")}
                    className="form-control"
                  />
                </div>
              </div> */}
            </div>

            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn btn-primary me-2"
              >
                Submit
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
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

export default FrmCompanyCreation;