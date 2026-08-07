import React, { useState } from "react";
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
      status: "",
      minDebtAmount: "",
      maxDebtAmount: "",
      debtAgeMin: "",
      debtAgeMax: "",
      accountType: "all",
      region: "all",
      collectorSuccessRate: "",
      collectorExperience: "",
      assignedTo: "Select Team/Collector",
    },
  });

  const [priorityDropdown, setPriorityDropdown] = useState([
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ]);

  const [statusDropdown, setStatusDropdown] = useState([
    { value: "active", label: "Active" },
    { value: "draft", label: "Draft" },
    { value: "paused", label: "Paused" },
  ]);

  const [accountDropdown, setAccountDropdown] = useState([
    { value: "all", label: "All Types" },
    { value: "credit card", label: "Credit Card" },
    { value: "personal load", label: "Personal Loan" },
    { value: "medical", label: "Medical" },
    { value: "utility", label: "Utility" },
    { value: "Other", label: "Other" },
  ]);

  const [regionDropdown, setRegionDropdown] = useState([
    { value: "all", label: "All Regions" },
    { value: "North", label: "North" },
    { value: "South", label: "South" },
    { value: "East", label: "East" },
    { value: "West", label: "West" },
    { value: "International", label: "International" },
  ]);

  const [assignedToDropdown, setAssignedToDropdown] = useState([
    { value: "Select Team/Collector", label: "Select Team/Collector" },
    { value: "Senior Collector Team A", label: "Senior Collector Team A" },
    { value: "Collector  Team B", label: "Collector Team B" },
    { value: "Senior Collector Team C", label: "Senior Collector Team C" },
    {
      value: "New Collector Training Pool",
      label: "New Collector Training Pool",
    },
  ]);

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
                  {priorityDropdown.map((opt) => (
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
                <label className="form-label">
                  Status <span className="text-danger">*</span>
                </label>
                <select
                  {...register("status", {
                    required: "Status is required",
                  })}
                  className={`form-select ${errors.status ? "is-invalid" : ""}`}
                >
                  <option value="">Select Status</option>
                  {statusDropdown.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">{errors.status?.message}</div>
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
                  {accountDropdown.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">Region</label>
                <select {...register("region")} className="form-select">
                  {regionDropdown.map((opt) => (
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
                  {assignedToDropdown.map((opt) => (
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
