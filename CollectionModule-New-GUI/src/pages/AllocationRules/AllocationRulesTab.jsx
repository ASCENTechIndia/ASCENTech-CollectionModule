import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Plus, PlayCircle, Pencil, Trash2 } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";
import apiClient from "../../services/apiClient";
import { useLoader } from "../../context/LoaderContext";
import { useAuth } from "../../context/AuthContext";

const AllocationRulesTab = () => {
  const { showSuccess, showError } = useNotification();
  const { user } = useAuth();
  const userId = user?.userId;
  const { setLoader } = useLoader();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [editingRule, setEditingRule] = useState(null);
  const [rules, setRules] = useState([]);

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
    setValue,
    watch,
    setError,
    clearErrors,
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
    { value: "personal loan", label: "Personal Loan" },
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
    { value: "Collector Team B", label: "Collector Team B" },
    { value: "Senior Collector Team C", label: "Senior Collector Team C" },
    {
      value: "New Collector Training Pool",
      label: "New Collector Training Pool",
    },
  ];

  const debtAgeMin = watch("debtAgeMin");
  const debtAgeMax = watch("debtAgeMax");

  useEffect(() => {
    const min = Number(debtAgeMin);
    const max = Number(debtAgeMax);
    if (debtAgeMin && debtAgeMax && min > max) {
      setError("debtAgeMin", {
        type: "manual",
        message: "Min cannot be greater than Max",
      });
    } else {
      clearErrors("debtAgeMin");
    }
  }, [debtAgeMin, debtAgeMax, setError, clearErrors]);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      setLoader(true);
      const response = await apiClient.get("/allocation/getAll");
      if (response.success && response.data?.OUT_CURSOR) {
        const fetchedRules = response.data.OUT_CURSOR.map((item) => ({
          id: item.NUM_RULE_ID,
          ruleName: item.VAR_RULE_NAME,
          priority: item.VAR_PRIORITY,
          status: item.VAR_STATUS,
          minDebtAmount: item.NUM_MIN_DEBT_AMOUNT,
          maxDebtAmount: item.NUM_MAX_DEBT_AMOUNT,
          debtAgeMin: item.NUM_MIN_DEBT_AGE_DAYS,
          debtAgeMax: item.NUM_MAX_DEBT_AGE_DAYS,
          accountType: item.VAR_ACCOUNT_TYPE,
          region: item.VAR_REGION,
          collectorSuccessRate: item.VAR_MIN_COLLECTOR_SUCCESS_RATE,
          collectorExperience: item.VAR_MIN_COLLECTOR_EXPERIENCE,
          assignedTo: item.VAR_ASSIGNED_TO,
          createdDate: item.DAT_CREATED_DATE,
          createdBy: item.VAR_CREATED_BY,
          modifiedDate: item.DAT_MODIFIED_DATE,
          modifiedBy: item.VAR_MODIFIED_BY,
        }));
        setRules(fetchedRules);
      } else {
        showError("Failed to fetch rules");
        setRules([]);
      }
    } catch (error) {
      setRules([]);
      console.error("Error fetching rules:", error);
      showError(error.message || "Failed to load rules");
    } finally {
      setLoader(false);
    }
  };

  const onSubmit = async (data) => {
    if (!userId) {
      alert("User Id is not set");
      return;
    }
    try {
      setLoader(true);
      const payload = {
        action: editingRule ? "UPDATE" : "INSERT",
        ruleId: editingRule ? editingRule.id : null,
        ruleName: data.ruleName || null,
        priority: data.priority || null,
        status: data.status || null,
        minDebtAmount: data.minDebtAmount || null,
        maxDebtAmount: data.maxDebtAmount || null,
        minDebtAgeDays: data.debtAgeMin || null,
        maxDebtAgeDays: data.debtAgeMax || null,
        accountType: data.accountType || null,
        region: data.region || null,
        minCollectorSuccessRate: data.collectorSuccessRate || null,
        minCollectorExperience: data.collectorExperience || null,
        assignedTo: data.assignedTo || null,
        user: userId,
      };

      const endpoint = editingRule
        ? "/allocation/update"
        : "/allocation/insert";
      const res = await apiClient.post(endpoint, payload);
      if (res?.success) {
        showSuccess(res?.data?.OUT_CURSOR[0]?.MESSAGE || "Success");
        reset(defaultValues);
        fetchRules();
      } else {
        showError(
          `Failed to ${editingRule ? "update" : "insert"} allocation rule`,
        );
      }
    } catch (error) {
      console.error(error);
      showError(
        error.message ||
          `Failed to ${editingRule ? "update" : "insert"} allocation rule`,
      );
    } finally {
      setLoader(false);
      setEditingRule(null);
      setModalOpen(false);
    }
  };

  const handleEdit = (rule) => {
    setEditingRule(rule);
    setValue("ruleName", rule.ruleName || "");
    setValue("priority", rule.priority || "");
    setValue("status", rule.status || "");
    setValue("minDebtAmount", rule.minDebtAmount || "");
    setValue("maxDebtAmount", rule.maxDebtAmount || "");
    setValue("debtAgeMin", rule.debtAgeMin || "");
    setValue("debtAgeMax", rule.debtAgeMax || "");
    setValue("accountType", rule.accountType || "all");
    setValue("region", rule.region || "all");
    setValue("collectorSuccessRate", rule.collectorSuccessRate || "");
    setValue("collectorExperience", rule.collectorExperience || "");
    setValue("assignedTo", rule.assignedTo || "Select Team/Collector");
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteTargetId(id);
  };

  const confirmDelete = async () => {
    if (deleteTargetId === null) return;
    try {
      setLoader(true);
      const res = await apiClient.delete(
        `/allocation/delete-rule?ruleId=${deleteTargetId}`,
      );
      if (res?.success) {
        showSuccess(
          res?.data?.OUT_CURSOR[0].MESSAGE || "Rule deleted successfully",
        );
        fetchRules();
      } else {
        showError("Failed to delete rule");
      }
    } catch (error) {
      showError(error.message || "Failed to delete rule");
    } finally {
      setLoader(false);
      setDeleteTargetId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteTargetId(null);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingRule(null);
    reset(defaultValues);
  };

  const getPriorityBadge = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-danger";
      case "medium":
        return "bg-warning text-white";
      case "low":
        return "bg-info";
      default:
        return "bg-secondary";
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-success";
      case "draft":
        return "bg-warning text-white";
      case "paused":
        return "bg-secondary";
      default:
        return "bg-secondary";
    }
  };

  return (
    <>
      <div className="art-wrap">
        <h6 className="art-title">Rule set: standard consumer debt</h6>

        {rules.length === 0 ? (
          <div className="text-center py-4 text-muted">No rules found.</div>
        ) : (
          <div className="d-flex flex-column gap-2 mb-3">
            {rules.map((rule) => (
              <div className="art-rule-row" key={rule.id}>
                <div className="art-rule-body d-flex flex-column flex-md-row justify-content-between align-items-md-center w-100">
                  <div className="fw-bold">
                    {rule.ruleName || "Unnamed Rule"}
                  </div>
                  <div className="d-flex gap-2 align-items-center mt-2 mt-md-0">
                    <span
                      className={`badge ${getPriorityBadge(rule.priority)}`}
                      style={{
                        minWidth: "70px",
                        display: "inline-block",
                        textAlign: "center",
                      }}
                    >
                      {rule.priority?.toUpperCase() || "N/A"}
                    </span>
                    <span
                      className={`badge ${getStatusBadge(rule.status)}`}
                      style={{
                        minWidth: "70px",
                        display: "inline-block",
                        textAlign: "center",
                      }}
                    >
                      {rule.status?.toUpperCase() || "N/A"}
                    </span>
                  </div>
                </div>
                <div className="d-flex gap-1">
                  <button
                    className="art-edit-btn"
                    title="Edit rule"
                    onClick={() => handleEdit(rule)}
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    className="art-edit-btn text-danger"
                    title="Delete rule"
                    onClick={() => handleDelete(rule.id)}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="d-flex gap-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              setEditingRule(null);
              reset(defaultValues);
              setModalOpen(true);
            }}
          >
            <Plus className="inline mr-2" size={16} /> Add rule
          </button>
          <button className="btn btn-primary btn-sm">
            <PlayCircle className="inline mr-2" size={16} /> Test rule set
          </button>
        </div>
      </div>

      {modalOpen && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingRule
                    ? "Edit Allocation Rule"
                    : "Add New Allocation Rule"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                />
              </div>
              <div className="modal-body">
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
                        className={`form-control ${errors.ruleName ? "is-invalid" : ""}`}
                        placeholder="e.g. High-Value Delinquent Accounts - West"
                      />
                      <div className="invalid-feedback">
                        {errors.ruleName?.message}
                      </div>
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Priority</label>
                      <select {...register("priority")} className="form-select">
                        <option value="">Select Priority</option>
                        {priorityDropdown.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
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
                        min={0}
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
                        type="number"
                        min={0}
                        {...register("maxDebtAmount")}
                        className="form-control"
                        placeholder="No limit"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Debt Age Range – Min</label>
                      <input
                        type="number"
                        min={0}
                        {...register("debtAgeMin")}
                        className={`form-control ${errors.debtAgeMin ? "is-invalid" : ""}`}
                        placeholder="Min"
                      />
                      <div className="invalid-feedback">
                        {errors.debtAgeMin?.message}
                      </div>
                    </div>

                    <div className="col-md-3 mb-3">
                      <label className="form-label">– Max</label>
                      <input
                        type="number"
                        min={0}
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
                        min={0}
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
                        min={0}
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
                      {editingRule ? "Update Rule" : "Save Rule"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={closeModal}
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

      {deleteTargetId !== null && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-sm modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cancelDelete}
                />
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this rule?</p>
              </div>
              <div className="modal-footer py-3 justify-content-center">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllocationRulesTab;
