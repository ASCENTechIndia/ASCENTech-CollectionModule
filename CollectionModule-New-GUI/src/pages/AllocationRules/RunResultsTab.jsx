import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNotification } from "../../context/NotificationContext";
import { useLoader } from "../../context/LoaderContext";
import { useConfirm } from "../../context/ConfirmModalContext";
import apiClient from "../../services/apiClient";

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
  const { showError, showSuccess, showWarning } = useNotification();
  const { setLoader } = useLoader();
  const confirm = useConfirm();

  const [preview, setPreview] = useState([]);
  const [totalPreview, setTotalPreview] = useState(0);

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

  const onSimulate = (data) => {
    console.log("Simulate run with:", data);
  };

  const onRunAllocation = async (data) => {
    try {
      const agreed = await confirm(
        "Do you want to run allocation?"
      );

      if (!agreed) {
        return;
      }

      setLoader(true);

      const response = await apiClient.post(
        "/allocation/assign-rule-user-prioritywise",
        {
          ruleId: 1,
        }
      );

      if (response?.success) {
        showSuccess(
           "Allocation completed successfully"
        );
      } else {
        showError(
          response?.message || "Failed to run allocation"
        );
      }
    } catch (error) {
      console.error("Run allocation error:", error);

      showError(
        error?.message ||
          "Something went wrong while running allocation"
      );
    } finally {
      setLoader(false);
    }
  };

  const fetchSimulationPreviewList = async () => {
    try {
      setLoader(true);

      const res = await apiClient.get(
        "/allocation/allocation-rules/simulation-preview"
      );

      if (res?.success && res?.data?.length > 0) {
        let total = 0;

        const data = res.data.map((item) => {
          total += Number(item.MATCHING_COUNT) || 0;

          return {
            label: item.VAR_RULE_NAME,
            count: Number(item.MATCHING_COUNT) || 0,
          };
        });

        setTotalPreview(total);
        setPreview(data);
      } else {
        setPreview([]);
        setTotalPreview(0);

        showWarning(
          "Simulation Preview list data not found"
        );
      }
    } catch (error) {
      setPreview([]);
      setTotalPreview(0);

      console.error(error);

      showError(
        error?.message ||
          "Failed to fetch simulation preview"
      );
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchSimulationPreviewList();
  }, []);

  return (
    <div className="rrt-wrap">
      <div className="card rrt-config-card mb-4">
        <div className="card-body">
          <h6 className="rrt-card-title mb-3">
            Configure run
          </h6>

          <form>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label rrt-label">
                  Scope
                </label>

                <select
                  className={`form-select ${
                    errors.scope ? "is-invalid" : ""
                  }`}
                  {...register("scope", {
                    required: "Scope is required",
                  })}
                >
                  {scopeOptions.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>

                {errors.scope && (
                  <div className="invalid-feedback">
                    {errors.scope.message}
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label rrt-label">
                  Rule set
                </label>

                <select
                  className={`form-select ${
                    errors.ruleSet ? "is-invalid" : ""
                  }`}
                  {...register("ruleSet", {
                    required: "Rule set is required",
                  })}
                >
                  {ruleSetOptions.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                    >
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

      <h6 className="rrt-card-title mb-3">
        Simulation preview
      </h6>

      <div className="d-flex flex-column">
        {preview.map((item, idx) => (
          <div
            className="rrt-preview-row"
            key={idx}
          >
            <span>{item.label}</span>

            <span className="fw-semibold">
              +{item.count.toLocaleString()} cases
            </span>
          </div>
        ))}

        <div className="rrt-preview-row rrt-preview-total">
          <span>Total</span>

          <span>
            {totalPreview.toLocaleString()} cases
          </span>
        </div>
      </div>
    </div>
  );
};

export default RunResultsTab;