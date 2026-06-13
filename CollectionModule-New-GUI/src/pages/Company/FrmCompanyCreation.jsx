import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const FrmCompanyCreation = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
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

      addressLine1: "",
      city: "",
      state: "",
      country: "India",

      primaryEmail: "",
      escalationEmail: "",
      phone: "",

      brandingTheme: "",
      slaDefault: "",
    },
  });

  const onSubmit = async (values) => {
    const payload = {
      code: values.code,
      name: values.name,
      legal_name: values.legalName,
      company_type: values.companyType,
      status: values.status,

      identifiers: {
        pan: values.pan,
        gst: values.gst,
        cin: values.cin,
      },

      address: {
        line1: values.addressLine1,
        city: values.city,
        state: values.state,
        country: values.country,
      },

      contact: {
        primary_email: values.primaryEmail,
        escalation_email: values.escalationEmail,
        phone: values.phone,
      },

      config: {
        branding_theme: values.brandingTheme,
        sla_default: values.slaDefault,
      },
    };

    console.log(payload);
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
                    className={`form-control ${
                      errors.code ? "is-invalid" : ""
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
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Legal Name
                  </label>

                  <input
                    {...register("legalName")}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Company Type *
                  </label>

                  <select
                    {...register("companyType", {
                      required: true,
                    })}
                    className="form-select"
                  >
                    <option value="">Select</option>
                    <option value="bank">Bank</option>
                    <option value="nbfc">NBFC</option>
                    <option value="fintech">Fintech</option>
                    <option value="utility">Utility</option>
                    <option value="telecom">Telecom</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    PAN
                  </label>

                  <input
                    {...register("pan")}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    GST
                  </label>

                  <input
                    {...register("gst")}
                    className="form-control"
                  />
                </div>
              </div>

              {/* RIGHT */}

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    CIN
                  </label>

                  <input
                    {...register("cin")}
                    className="form-control"
                  />
                </div>

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
                    Address
                  </label>

                  <textarea
                    rows="3"
                    {...register("addressLine1")}
                    className="form-control"
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      City
                    </label>

                    <input
                      {...register("city")}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      State
                    </label>

                    <input
                      {...register("state")}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Country
                  </label>

                  <input
                    {...register("country")}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Primary Email
                  </label>

                  <input
                    type="email"
                    {...register("primaryEmail")}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Phone
                  </label>

                  <input
                    {...register("phone")}
                    className="form-control"
                  />
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
                    Escalation Email
                  </label>

                  <input
                    {...register("escalationEmail")}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-md-3">
                <div className="mb-3">
                  <label className="form-label">
                    Branding Theme
                  </label>

                  <input
                    {...register("brandingTheme")}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-md-3">
                <div className="mb-3">
                  <label className="form-label">
                    SLA Default
                  </label>

                  <input
                    {...register("slaDefault")}
                    className="form-control"
                  />
                </div>
              </div>
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