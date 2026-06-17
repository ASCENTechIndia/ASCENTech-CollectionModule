import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

const FrmAgencyCreation = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
  const username = user?.userName;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
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

  const onSubmit = async (values) => {
    const payload = {
      username,
      code: values.code,
      name: values.name,
      agencytype: values.agencyType,
      status: values.status,

      license_no: values.licenseNo,
      license_expiry: values.licenseExpiry,

      coverage_zones: values.coverageZones
        .split(",")
        .map((x) => x.trim()),

      max_cases: Number(values.maxCases),
      current_cases: Number(values.currentCases),
      max_fos: Number(values.maxFos),

      // contact_person: values.contactPerson,
      city: values.city,
      state: values.state,
      pincode: values.pincode,
      country: values.country,
      email: values.email,
      mobile: values.mobile,

      address: values.address,

      sla_config: values.slaConfig,
      config: values.configuration
    };

    console.log(payload);
    return;

    // const response = await apiClient.post("", payload);
    // console.log(response);

    // if (response.success) {
    //   reset();
    //   showSuccess();
    // }
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
                    Agency Code *
                  </label>

                  <input
                    {...register("code", { required: "Agency Code is required" })}
                    className={`form-control ${errors.code ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">{errors.code?.message}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Agency Name *
                  </label>

                  <input
                    {...register("name", { required: "Agency Name is required" })}
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Agency Type *
                  </label>

                  <select
                    {...register("agencyType", { required: "Agency Type is required" })}
                    className={`form-select ${errors.agencyType ? "is-invalid" : ""}`}
                  >
                    <option value="">SELECT</option>
                  </select>
                  <div className="invalid-feedback">{errors.agencyType?.message}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    License No
                  </label>

                  <input
                    {...register("licenseNo", { required: "License Number is required" })}
                    className={`form-control ${errors.licenseNo ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">{errors.licenseNo?.message}</div>

                </div>

                <div className="mb-3">
                  <label className="form-label">
                    License Expiry
                  </label>

                  <input type="date" {...register("licenseExpiry", { required: "License Expiry is required" })} className={`form-control ${errors.licenseExpiry ? "is-invalid" : ""}`} />
                  <div className="invalid-feedback">{errors.licenseExpiry?.message}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    City
                  </label>

                  <input
                    {...register("city", { required: "City is required" })}
                    className={`form-control ${errors.city ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">{errors.city?.message}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    State
                  </label>

                  <input
                    {...register("state", { required: "State is required" })}
                    className={`form-control ${errors.state ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">{errors.state?.message}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Country
                  </label>

                  <input
                    {...register("country", { required: "Country is required" })}
                    className={`form-control ${errors.country ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">{errors.country?.message}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Pincode
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
                    Status
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
                    Coverage Zones
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
                    Address
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
                    Max Cases
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
                    Current Cases
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
                    Max FOS
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
                  {...register("mobile", { required: "Mobile is required" })}
                  className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.mobile?.message}</div>
              </div>

            </div>

            <div className="mt-3">
              <label className="form-label">
                SLA Config
              </label>

              <textarea
                rows="3"
                {...register("slaConfig", { required: "SLA Config is required" })}
                className={`form-control ${errors.slaConfig ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.slaConfig?.message}</div>
            </div>

            <div className="mt-3">
              <label className="form-label">
                Configuration
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