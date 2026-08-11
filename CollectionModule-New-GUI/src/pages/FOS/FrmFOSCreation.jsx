import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const FrmFOSCreation = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      employeeId: "",
      firstName: "",
      lastName: "",
      fosRole: "",
      status: "active",

      mobile: "",
      email: "",

      joiningDate: "",
      exitDate: "",

      skills: "",
      geoZones: "",

      maxCases: "",
      maxCasesPerDay: "",
      openCases: "",

      aadhaarRef: "",
      panRef: "",
    },
  });

  const onSubmit = async (values) => {
    const payload = {
      employee_id: values.employeeId,

      first_name: values.firstName,
      last_name: values.lastName,

      fos_role: values.fosRole,
      status: values.status,

      contact: {
        mobile: values.mobile,
        email: values.email,
      },

      skills: values.skills
        .split(",")
        .map((x) => x.trim()),

      geo_zones: values.geoZones
        .split(",")
        .map((x) => x.trim()),

      capacity: {
        max_cases: Number(values.maxCases),
        max_cases_per_day: Number(
          values.maxCasesPerDay
        ),
        current_open_cases: Number(
          values.openCases
        ),
      },

      identity_docs: {
        aadhaar_ref: values.aadhaarRef,
        pan_ref: values.panRef,
      },

      joining_date: values.joiningDate,
      exit_date: values.exitDate,
    };

    console.log(payload);
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <h1 className="page-title">
          FOS Master
        </h1>
      </div>

      <div className="card">
        <div className="card-header">
          <h5>Create FOS</h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="row">

              <div className="col-md-6">

                <div className="mb-3">
                  <label className="form-label">
                    Employee ID *
                  </label>

                  <input
                    {...register("employeeId")}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    First Name *
                  </label>

                  <input
                    {...register("firstName")}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Last Name *
                  </label>

                  <input
                    {...register("lastName")}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    FOS Role
                  </label>

                  <select
                    {...register("fosRole")}
                    className="form-select"
                  >
                    <option value="">
                      Select
                    </option>

                    <option value="collector">
                      Collector
                    </option>

                    <option value="supervisor">
                      Supervisor
                    </option>

                    <option value="team_lead">
                      Team Lead
                    </option>

                    <option value="manager">
                      Manager
                    </option>
                  </select>
                </div>

              </div>

              <div className="col-md-6">

                <div className="mb-3">
                  <label className="form-label">
                    Mobile
                  </label>

                  <input
                    {...register("mobile")}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Email
                  </label>

                  <input
                    {...register("email")}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Joining Date
                  </label>

                  <input
                    type="date"
                    {...register("joiningDate")}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Exit Date
                  </label>

                  <input
                    type="date"
                    {...register("exitDate")}
                    className="form-control"
                  />
                </div>

              </div>

            </div>

            <hr />

            <h5>Skills & Zones</h5>

            <div className="row">

              <div className="col-md-6">
                <label className="form-label">
                  Skills
                </label>

                <textarea
                  rows="3"
                  placeholder="field_visit,legal_notice,skip_trace"
                  {...register("skills")}
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Geo Zones
                </label>

                <textarea
                  rows="3"
                  placeholder="Mumbai,Pune,Thane"
                  {...register("geoZones")}
                  className="form-control"
                />
              </div>

            </div>

            <hr />

            <h5>Capacity</h5>

            <div className="row">

              <div className="col-md-4">
                <input
                  type="number"
                  placeholder="Max Cases"
                  {...register("maxCases")}
                  className="form-control"
                />
              </div>

              <div className="col-md-4">
                <input
                  type="number"
                  placeholder="Cases Per Day"
                  {...register("maxCasesPerDay")}
                  className="form-control"
                />
              </div>

              <div className="col-md-4">
                <input
                  type="number"
                  placeholder="Open Cases"
                  {...register("openCases")}
                  className="form-control"
                />
              </div>

            </div>

            <hr />

            <h5>Identity Documents</h5>

            <div className="row">

              <div className="col-md-6">
                <input
                  placeholder="Aadhaar Reference"
                  {...register("aadhaarRef")}
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <input
                  placeholder="PAN Reference"
                  {...register("panRef")}
                  className="form-control"
                />
              </div>

            </div>

            <div className="mt-3">
              <label className="form-label">
                Upload Documents
              </label>

              <input
                type="file"
                multiple
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

export default FrmFOSCreation;