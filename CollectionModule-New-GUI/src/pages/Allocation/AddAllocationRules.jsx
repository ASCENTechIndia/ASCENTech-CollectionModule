import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";

const AddAllocationRules = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      ruleName: "",
      priority: "",
      status: "Draft",
      minDebtAmount: "",
      maxDebtAmount: "",
      debtAgeMin: "",
      debtAgeMax: "",
      accountType: "",
      region: "",
      collectorSuccessRate: "",
      collectorExperience: "",
      assignedTo: "",
    },
  });

  const priorityOptions = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];

  const statusOptions = [
    { value: "Draft", label: "Draft" },
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const accountTypeOptions = [
    { value: "All Types", label: "All Types" },
    { value: "Savings", label: "Savings" },
    { value: "Current", label: "Current" },
    { value: "Credit Card", label: "Credit Card" },
  ];

  const regionOptions = [
    { value: "All Regions", label: "All Regions" },
    { value: "North", label: "North" },
    { value: "South", label: "South" },
    { value: "East", label: "East" },
    { value: "West", label: "West" },
  ];

  const assignedToOptions = [
    { value: "Select Team/Collector", label: "Select Team/Collector" },
    { value: "Team A", label: "Team A" },
    { value: "Team B", label: "Team B" },
    { value: "Collector X", label: "Collector X" },
  ];

  const onSubmit = (data) => {
    console.log("Rule Data:", data);
    showSuccess("Allocation rule created successfully");
    reset();
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <h1 className="page-title">Add New Allocation Rule</h1>
      </div>

      <div className="card">
        <div className="card-header">
          <h5>Rule Details</h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Rule Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  {...register("ruleName", {
                    required: "Rule name is required",
                  })}
                  className={`form-control ${
                    errors.ruleName ? "is-invalid" : ""
                  }`}
                  placeholder="e.g. High-Value Delinquent Accounts - West"
                />
                <div className="invalid-feedback">
                  {errors.ruleName?.message}
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">
                  Priority <span className="text-danger">*</span>
                </label>
                <select
                  {...register("priority", {
                    required: "Priority is required",
                  })}
                  className={`form-select ${
                    errors.priority ? "is-invalid" : ""
                  }`}
                >
                  <option value="">Select Priority</option>
                  {priorityOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">
                  {errors.priority?.message}
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">Status</label>
                <select {...register("status")} className="form-select">
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <hr />

            <h6 className="fw-bold mb-3">Allocation Criteria</h6>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Minimum Debt Amount ($)</label>
                <input
                  type="number"
                  {...register("minDebtAmount")}
                  className="form-control"
                  placeholder="0"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Maximum Debt Amount ($)</label>
                <input
                  type="text"
                  {...register("maxDebtAmount")}
                  className="form-control"
                  placeholder="No limit"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 mb-3">
                <label className="form-label">
                  Debt Age Range (Days) – Min
                </label>
                <input
                  type="number"
                  {...register("debtAgeMin")}
                  className="form-control"
                  placeholder="Min"
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">– Max</label>
                <input
                  type="number"
                  {...register("debtAgeMax")}
                  className="form-control"
                  placeholder="Max"
                />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">Account Type</label>
                <select {...register("accountType")} className="form-select">
                  {accountTypeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">Region</label>
                <select {...register("region")} className="form-select">
                  {regionOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Minimum Collector Success Rate (%)
                </label>
                <input
                  type="number"
                  {...register("collectorSuccessRate")}
                  className="form-control"
                  placeholder="0"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Minimum Collector Experience (Years){" "}
                  <span className="text-muted">(from second image)</span>
                </label>
                <input
                  type="number"
                  {...register("collectorExperience")}
                  className="form-control"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Assigned To</label>
                <select {...register("assignedTo")} className="form-select">
                  {assignedToOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <hr />

            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary me-2">
                Save Rule
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAllocationRules;
