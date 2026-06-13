import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const FrmAgencyCreation = () => {
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

      maxCases: "",
      currentCases: "",
      maxFos: "",

      contactPerson: "",
      email: "",
      mobile: "",

      address: "",
      coverageZones: "",
      slaConfig: "",
    },
  });

  const onSubmit = async (values) => {
    const payload = {
      code: values.code,
      name: values.name,
      agency_type: values.agencyType,
      status: values.status,

      license_no: values.licenseNo,
      license_expiry: values.licenseExpiry,

      coverage_zones: values.coverageZones
        .split(",")
        .map((x) => x.trim()),

      capacity: {
        max_cases: Number(values.maxCases),
        current_cases: Number(values.currentCases),
        max_fos: Number(values.maxFos),
      },

      contact: {
        contact_person: values.contactPerson,
        email: values.email,
        mobile: values.mobile,
      },

      address: values.address,

      sla_config: {
        config: values.slaConfig,
      },
    };

    console.log(payload);
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
                    {...register("code", {
                      required: "Agency Code required",
                    })}
                    className={`form-control ${
                      errors.code ? "is-invalid" : ""
                    }`}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Agency Name *
                  </label>

                  <input
                    {...register("name", {
                      required: "Agency Name required",
                    })}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Agency Type *
                  </label>

                  <select
                    {...register("agencyType", {
                      required: true,
                    })}
                    className="form-select"
                  >
                    <option value="">Select</option>
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="legal">Legal</option>
                    <option value="skip_trace">
                      Skip Trace
                    </option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    License No
                  </label>

                  <input
                    {...register("licenseNo")}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    License Expiry
                  </label>

                  <input
                    type="date"
                    {...register("licenseExpiry")}
                    className="form-control"
                  />
                </div>

              </div>

              <div className="col-md-6">

                <div className="mb-3">
                  <label className="form-label">
                    Status
                  </label>

                  <select
                    {...register("status")}
                    className="form-select"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                    <option value="onboarding">Onboarding</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Coverage Zones
                  </label>

                  <textarea
                    rows="3"
                    placeholder="Mumbai,Pune,Thane"
                    {...register("coverageZones")}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Address
                  </label>

                  <textarea
                    rows="3"
                    {...register("address")}
                    className="form-control"
                  />
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
                    {...register("maxCases")}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">
                    Current Cases
                  </label>

                  <input
                    type="number"
                    {...register("currentCases")}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">
                    Max FOS
                  </label>

                  <input
                    type="number"
                    {...register("maxFos")}
                    className="form-control"
                  />
                </div>
              </div>

            </div>

            <hr />

            <h5>Contact Information</h5>

            <div className="row">

              <div className="col-md-4">
                <input
                  placeholder="Contact Person"
                  {...register("contactPerson")}
                  className="form-control"
                />
              </div>

              <div className="col-md-4">
                <input
                  placeholder="Email"
                  {...register("email")}
                  className="form-control"
                />
              </div>

              <div className="col-md-4">
                <input
                  placeholder="Mobile"
                  {...register("mobile")}
                  className="form-control"
                />
              </div>

            </div>

            <div className="mt-3">
              <label className="form-label">
                SLA Config
              </label>

              <textarea
                rows="3"
                {...register("slaConfig")}
                className="form-control"
              />
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