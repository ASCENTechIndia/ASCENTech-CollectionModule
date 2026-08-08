import React, { useState } from "react";
import { useForm } from "react-hook-form";

const scopeOptions = [
  { label: "All unallocated cases", value: "all" },
  { label: "Manual selection", value: "manual" },
  { label: "Segment: Early stage only", value: "early stage" },
];

const ruleSetOptions = [
  { label: "Standard consumer debt", value: "standart debt" },
  { label: "SME debt", value: "sme debt" },
];

const RunResultsTab = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      scope: "all",
      ruleSet: "standart debt",
    },
  });

  const [preview, setPreview] = useState([
    { label: "In-house early-stage", count: 842 },
    { label: "High-propensity specialists", count: 310 },
    { label: "Meridian (external)", count: 1120 },
    { label: "Castlebrook (external)", count: 890 },
  ]);

  const total = preview.reduce((sum, item) => sum + item.count, 0);

  const onSimulate = (data) => {
    console.log("Simulate run with:", data);
  };

  const onRunAllocation = (data) => {
    console.log("Run allocation with:", data);
  };

  return (
    <div className="rrt-wrap">
      <div className="card rrt-config-card mb-4">
        <div className="card-body">
          <h6 className="rrt-card-title mb-3">Configure run</h6>

          <form>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label rrt-label">Scope</label>
                <select
                  className={`form-select ${errors.scope ? "is-invalid" : ""}`}
                  {...register("scope", { required: "Scope is required" })}
                >
                  {scopeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.scope && (
                  <div className="invalid-feedback">{errors.scope.message}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label rrt-label">Rule set</label>
                <select
                  className={`form-select ${errors.ruleSet ? "is-invalid" : ""}`}
                  {...register("ruleSet", {
                    required: "Rule set is required",
                  })}
                >
                  {ruleSetOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.ruleSet && (
                  <div className="invalid-feedback">
                    {errors.ruleSet.message}
                  </div>
                )}
              </div>
            </div>

            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={handleSubmit(onSimulate)}
              >
                Simulate
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleSubmit(onRunAllocation)}
              >
                Run allocation
              </button>
            </div>
          </form>
        </div>
      </div>

      <h6 className="rrt-card-title mb-3">Simulation preview</h6>

      <div className="d-flex flex-column">
        {preview.map((item, idx) => (
          <div className="rrt-preview-row" key={idx}>
            <span>{item.label}</span>
            <span className="fw-semibold">
              +{item.count.toLocaleString()} cases
            </span>
          </div>
        ))}
        <div className="rrt-preview-row rrt-preview-total">
          <span>Total</span>
          <span>{total.toLocaleString()} cases</span>
        </div>
      </div>
    </div>
  );
};

export default RunResultsTab;
