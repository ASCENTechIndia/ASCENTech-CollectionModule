import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, PlayCircle, Pencil, X } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

const AllocationRulesTab = () => {
  const { showSuccess } = useNotification();
  const [modalOpen, setModalOpen] = useState(false);
  const [rules] = useState([
    {
      id: 1,
      conditionParts: [
        { text: "If ", bold: false },
        { text: "days_past_due < 30", bold: true },
        { text: " and ", bold: false },
        { text: "balance > £500", bold: true },
      ],
      route: "Route to: in-house early-stage team",
      isFallback: false,
    },
    {
      id: 2,
      conditionParts: [
        { text: "If ", bold: false },
        { text: "days_past_due 30-90", bold: true },
        { text: " and ", bold: false },
        { text: "propensity_score > 0.6", bold: true },
      ],
      route: "Route to: high-propensity queue, skilled agents only",
      isFallback: false,
    },
    {
      id: 3,
      conditionParts: [
        { text: "If ", bold: false },
        { text: "days_past_due > 90", bold: true },
      ],
      route: "Route to: external agency panel (round-robin by placement rate)",
      isFallback: false,
    },
    {
      id: 4,
      conditionParts: [{ text: "Fallback: all unmatched cases", bold: true }],
      route: "Route to: general pool, weighted by agent capacity",
      isFallback: true,
    },
  ]);
  const defaultValues = {
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
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: defaultValues,
  });

  const priorityDropdown = [
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];
  const statusDropdown = [
    { value: "active", label: "Active" },
    { value: "draft", label: "Draft" },
    { value: "paused", label: "Paused" },
  ];
  const accountDropdown = [
    { value: "all", label: "All Types" },
    { value: "credit card", label: "Credit Card" },
    { value: "personal load", label: "Personal Loan" },
    { value: "medical", label: "Medical" },
    { value: "utility", label: "Utility" },
    { value: "Other", label: "Other" },
  ];
  const regionDropdown = [
    { value: "all", label: "All Regions" },
    { value: "North", label: "North" },
    { value: "South", label: "South" },
    { value: "East", label: "East" },
    { value: "West", label: "West" },
    { value: "International", label: "International" },
  ];
  const assignedToDropdown = [
    { value: "Select Team/Collector", label: "Select Team/Collector" },
    { value: "Senior Collector Team A", label: "Senior Collector Team A" },
    { value: "Collector  Team B", label: "Collector Team B" },
    { value: "Senior Collector Team C", label: "Senior Collector Team C" },
    {
      value: "New Collector Training Pool",
      label: "New Collector Training Pool",
    },
  ];

  const onSubmit = (data) => {
    console.log("Rule Data:", data);
    showSuccess("Allocation rule created successfully");
    reset();
    setModalOpen(false);
  };

  return (
    <>
      <div className="art-wrap">
        <h6 className="art-title">Rule set: standard consumer debt</h6>

        <div className="d-flex flex-column gap-2 mb-3">
          {rules.map((rule) => (
            <div
              className={`art-rule-row ${rule.isFallback ? "art-fallback" : ""}`}
              key={rule.id}
            >
              <span className="art-rule-badge">{rule.id}</span>
              <div className="art-rule-body">
                <div className="art-rule-condition">
                  {rule.conditionParts.map((part, idx) =>
                    part.bold ? (
                      <code key={idx} className="art-rule-code">
                        {part.text}
                      </code>
                    ) : (
                      <span key={idx}>{part.text}</span>
                    ),
                  )}
                </div>
                <div className="art-rule-route">{rule.route}</div>
              </div>
              <button
                className="art-edit-btn"
                title="Edit rule"
                onClick={() => setModalOpen(true)}
              >
                <Pencil size={15} />
              </button>
            </div>
          ))}
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setModalOpen(true)}
          >
            <Plus className="inline mr-2" size={16} /> Add rule
          </button>
          <button className="btn btn-primary btn-sm">
            <PlayCircle className="inline mr-2" size={16} /> Test rule set
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Allocation Rule</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalOpen(false)}
                />
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Rule Details */}
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
                        className={`form-select ${
                          errors.status ? "is-invalid" : ""
                        }`}
                      >
                        <option value="">Select Status</option>
                        {statusDropdown.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-feedback">
                        {errors.status?.message}
                      </div>
                    </div>
                  </div>

                  <hr />

                  <h6 className="fw-bold mb-3">Allocation Criteria</h6>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Minimum Debt Amount ($)
                      </label>
                      <input
                        type="number"
                        {...register("minDebtAmount")}
                        className="form-control"
                        placeholder="0"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Maximum Debt Amount ($)
                      </label>
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
                      <select
                        {...register("accountType")}
                        className="form-select"
                      >
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
                        Minimum Collector Experience (Years)
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
                      <select
                        {...register("assignedTo")}
                        className="form-select"
                      >
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
                      onClick={() => setModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllocationRulesTab;
