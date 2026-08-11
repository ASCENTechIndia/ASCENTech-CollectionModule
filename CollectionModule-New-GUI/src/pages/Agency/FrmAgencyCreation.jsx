import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import apiClient from "../../services/apiClient";

const FrmAgencyCreation = () => {
  const { user } = useAuth();
  console.log(user);
  const { showSuccess, showError } = useNotification();
  const username = user?.userName;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      code: "",
      name: "",
      agencyType: "",
      status: "active",
      licenseNo: "",
      licenseExpiry: "",
      city: "",
      state: "",
      country: "",
      pincode: "",

      maxCases: "",
      currentCases: "",
      maxFos: "",

      contactPerson: "",
      email: "",
      mobile: "",

      address: "",
      coverageZones: "",
      slaConfig: "",
      configuration: []
    },
  });

  const formatDate = (date) => {
    if (!date) return "";

    const d = new Date(date);

    const year = d.getFullYear();

    const month = String(d.getMonth() + 1).padStart(2, "0");

    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const onSubmit = async (values) => {
    const payload = {
      username: "23",
      id: Number(values.id),
      code: values.code,
      name: values.name,
      type: values.agencyType,
      // type: "collection",
      status: values.status,

      licenseNo: values.licenseNo,
      licenseExpiry: formatDate(values.licenseExpiry),

      coverageZones: values.coverageZones,
      // .split(",")
      // .map((x) => x.trim()),

      maxCases: Number(values.maxCases),
      currentCases: Number(values.currentCases),
      maxFos: Number(values.maxFos),

      // contact_person: values.contactPerson,
      city: values.city,
      state: values.state,
      pincode: values.pincode,
      country: values.country,
      contactEmail: values.email,
      contactPhone: Number(values.mobile),

      address1: values.address,

      slaConfig: "",
      // slaConfig: values.slaConfig,
      // config: values.configuration
      config: ""
    };

    const response = await apiClient.post("/agency-creation/create-new", payload);

    if (response.success) {
      reset();
      showSuccess(response.message);
    }
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <h1 className="page-title">Agency Master</h1>
      </div>

      <div className="card">
        <div className="card-header">
          <h5>Create Agency</h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">

              <div className="col-md-6">

                <div className="mb-3">
                  <label className="form-label">
                    Agency Code <span className="text-danger">*</span>
                  </label>

                  <input
                    {...register("code", { required: "Agency Code is required" })}
                    className={`form-control ${errors.code ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">{errors.code?.message}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Agency Name <span className="text-danger">*</span>
                  </label>

                  <input
                    {...register("name", { required: "Agency Name is required" })}
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Agency Type <span className="text-danger">*</span>
                  </label>

                  <select
                    {...register("agencyType", { required: "Agency Type is required" })}
                    className={`form-select ${errors.agencyType ? "is-invalid" : ""}`}
                  >
                    <option value="">SELECT</option>
                    <option value="1">Type 1</option>
                  </select>
                  <div className="invalid-feedback">{errors.agencyType?.message}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    License No <span className="text-danger">*</span>
                  </label>

                  <input
                    {...register("licenseNo", { required: "License Number is required" })}
                    className={`form-control ${errors.licenseNo ? "is-invalid" : ""}`}
                    maxLength={15}
                  />
                  <div className="invalid-feedback">{errors.licenseNo?.message}</div>

                </div>

                <div className="mb-3">
                  <label className="form-label">
                    License Expiry <span className="text-danger">*</span>
                  </label>

                  <input type="date" {...register("licenseExpiry", { required: "License Expiry is required" })} className={`form-control ${errors.licenseExpiry ? "is-invalid" : ""}`} />
                  <div className="invalid-feedback">{errors.licenseExpiry?.message}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    City <span className="text-danger">*</span>
                  </label>

                  <input
                    {...register("city", { required: "City is required" })}
                    className={`form-control ${errors.city ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">{errors.city?.message}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    State <span className="text-danger">*</span>
                  </label>

                  <input
                    {...register("state", { required: "State is required" })}
                    className={`form-control ${errors.state ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">{errors.state?.message}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Country <span className="text-danger">*</span>
                  </label>

                  <input
                    {...register("country", { required: "Country is required" })}
                    className={`form-control ${errors.country ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">{errors.country?.message}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Pincode <span className="text-danger">*</span>
                  </label>

                  <input
                    maxLength={6}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, "");
                    }}
                    {...register("pincode", { required: "Pincode is required" })}
                    className={`form-control ${errors.pincode ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">{errors.pincode?.message}</div>
                </div>

              </div>

              <div className="col-md-6">

                <div className="mb-3">
                  <label className="form-label">
                    Agency ID
                  </label>
                  <input
                    // maxLength={6}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, "");
                    }}
                    {...register("id", { required: "ID is required" })}
                    className={`form-control ${errors.id ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">{errors.id?.message}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Status <span className="text-danger">*</span>
                  </label>

                  <select
                    {...register("status", { required: "Status is required" })}
                    className={`form-select ${errors.status ? "is-invalid" : ""}`}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                    <option value="onboarding">Onboarding</option>
                  </select>
                  <div className="invalid-feedback">{errors.status?.message}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Coverage Zones <span className="text-danger">*</span>
                  </label>

                  <textarea
                    rows="3"
                    placeholder="Mumbai,Pune,Thane"
                    {...register("coverageZones", { required: "Coverage Zones are required" })}
                    className={`form-control ${errors.coverageZones ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">{errors.coverageZones?.message}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Address <span className="text-danger">*</span>
                  </label>

                  <textarea
                    rows="3"
                    {...register("address", { required: "Address is required" })}
                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">{errors.address?.message}</div>
                </div>

              </div>

            </div>

            <hr />

            <h5>Capacity Configuration</h5>

            <div className="row">

              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">
                    Max Cases <span className="text-danger">*</span>
                  </label>

                  <input
                    type="number"
                    {...register("maxCases", { required: "Max Cases is required" })}
                    className={`form-control ${errors.maxCases ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">{errors.maxCases?.message}</div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">
                    Current Cases <span className="text-danger">*</span>
                  </label>

                  <input
                    type="number"
                    {...register("currentCases", { required: "Current Cases is required" })}
                    className={`form-control ${errors.currentCases ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">{errors.currentCases?.message}</div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">
                    Max FOS <span className="text-danger">*</span>
                  </label>

                  <input
                    type="number"
                    {...register("maxFos", { required: "Max FOS is required" })}
                    className={`form-control ${errors.maxFos ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">{errors.maxFos?.message}</div>
                </div>
              </div>

            </div>

            <hr />

            <h5>Contact Information</h5>

            <div className="row">

              {/* <div className="col-md-4">
                <input
                  placeholder="Contact Person"
                  {...register("contactPerson")}
                  className="form-control"
                />
              </div> */}

              <div className="col-md-6">
                <input
                  placeholder="Email"
                  {...register("email", { required: "Email is required" })}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>

              <div className="col-md-6">
                <input
                  placeholder="Mobile"
                  maxLength={10}
                  {...register("mobile", { required: "Mobile is required" })}
                  className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.mobile?.message}</div>
              </div>

            </div>

            <div className="mt-3">
              <label className="form-label">
                SLA Config <span className="text-danger">*</span>
              </label>

              {/* <textarea
                rows="3"
                {...register("slaConfig", { required: "SLA Config is required" })}
                className={`form-control ${errors.slaConfig ? "is-invalid" : ""}`}
              /> */}
              <select
                {...register("slaConfig", { required: "SLA Config is required" })}
                className={`form-select ${errors.slaConfig ? "is-invalid" : ""}`}
              >
                <option value="">--SELECT--</option>
                <option value="1">SLA-1</option>
                <option value="2">SLA-2</option>
                <option value="3">SLA-3</option>
              </select>

              <div className="invalid-feedback">{errors.slaConfig?.message}</div>
            </div>

            <div className="mt-3">
              <label className="form-label">
                Configuration <span className="text-danger">*</span>
              </label>
              <select
                multiple
                {...register("configuration", { required: "Config is required" })}
                className={`form-select ${errors.configuration ? "is-invalid" : ""}`}
              >
                <option value="">Select</option>
                <option value="TC">Test Config</option>
                <option value="DC">Demo Config</option>
              </select>
              <div className="invalid-feedback">{errors.configuration?.message}</div>
            </div>

            <div className="text-center mt-4">
              <button
                className="btn btn-primary me-2"
                type="submit"
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

export default FrmAgencyCreation;