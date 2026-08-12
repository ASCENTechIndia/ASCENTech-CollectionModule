import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import apiClient from "../../services/apiClient";
import { useNotification } from "../../context/NotificationContext";
import { useAuth } from "../../context/AuthContext";
import { useLoader } from "../../context/LoaderContext";
import DataTable from "../../components/Datatable";

const relationshipOptions = [{ value: "1", label: "Service -> Collector" }];

const FrmCreateMapping = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const { user } = useAuth();
  const { setLoader } = useLoader();
  const username = user?.userName;
  const userId = user?.userId.split("E").pop();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      fromEntityType: "",
      fromEntity: "",
      toEntityType: "",
      toEntity: "",
      relationship: "",
      context: "",
      effectiveFrom: "",
      effectiveTo: "",
      remark: "",
    },
  });

  const [entityTypes, setEntityTypes] = useState([]);
  const [fromEntities, setFromEntities] = useState([]);
  const [toEntities, setToEntities] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [tableData, setTableData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingFromEntity, setLoadingFromEntity] = useState(false);
  const [loadingToEntity, setLoadingToEntity] = useState(false);

  const fromEntityType = watch("fromEntityType");
  const toEntityType = watch("toEntityType");
  const fromEntity = watch("fromEntity");
  const toEntity = watch("toEntity");
  const effectiveFrom = watch("effectiveFrom");

  const [editingId, setEditingId] = useState(null);
  const [pendingEdit, setPendingEdit] = useState(null);

  const tableCol = [
    { label: "From Entity Type", key: "fromEntityType" },
    { label: "From Entity", key: "fromEntity" },
    { label: "To Entity Type", key: "toEntityType" },
    { label: "To Entity", key: "toEntity" },
    { label: "Relationship", key: "relationship" },
    { label: "Context", key: "context" },
    { label: "Effective From", key: "effectiveFrom" },
    { label: "Effective To", key: "effectiveTo" },
    { label: "Remark", key: "remark" },
    { label: "Status", key: "status" },
    { label: "Action", key: "actions" },
  ];
  const [tableRecord, setTableRecord] = useState([]);

  useEffect(() => {
    loadEntityTypes();
    loadRelationshipTypes();
    getActiveMappingData();
  }, []);

  const loadEntityTypes = async () => {
    try {
    } catch (error) {
      console.error(error);
      showError("Unable to load Entity Types");
    }
  };

  const loadRelationshipTypes = async () => {
    try {
    } catch (error) {
      console.error(error);
      showError("Unable to load Relationship Types");
    }
  };

  useEffect(() => {
    if (!fromEntityType) {
      setFromEntities([]);
      setValue("fromEntity", "");
      return;
    }

    loadFromEntities(fromEntityType);

    if (fromEntityType && toEntityType && fromEntityType === toEntityType) {
      setError("toEntityType", {
        type: "manual",
        message: "From entity type and to entity type cannot be same",
      });
      setError("fromEntityType", {
        type: "manual",
        message: "From entity type and to entity type cannot be same",
      });
    } else {
      clearErrors("fromEntityType");
      clearErrors("toEntityType");
    }
  }, [fromEntityType, toEntityType]);

  const loadFromEntities = async (entityType) => {
    try {
      setLoadingFromEntity(true);
      let apiUrl;
      if (entityType === "COMPANY") {
        apiUrl = "/mapping/company-list";
      } else if (entityType === "AGENCY") {
        apiUrl = "/mapping/agency-list";
      }

      const response = await apiClient.get(apiUrl);

      if (response.success) {
        const list =
          entityType === "COMPANY"
            ? response.data.map((item) => ({
                label: `${item.name} - ${item.branch}`,
                value: item.id,
              }))
            : entityType === "AGENCY"
              ? response.data.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))
              : [];

        setFromEntities(list);
        setValue("fromEntity", "");
      }
    } catch (error) {
      console.error(error);
      showError("Unable to load From Entity");
    } finally {
      setLoadingFromEntity(false);
    }
  };

  useEffect(() => {
    if (!toEntityType) {
      setToEntities([]);
      setValue("toEntity", "");
      return;
    }

    loadToEntities(toEntityType);
  }, [toEntityType]);

  const loadToEntities = async (entityType) => {
    try {
      setLoadingToEntity(true);
      let apiUrl;
      if (entityType === "COMPANY") {
        apiUrl = "/mapping/company-list";
      } else if (entityType === "AGENCY") {
        apiUrl = "/mapping/agency-list";
      }

      const response = await apiClient.get(apiUrl);
      let list;
      if (response.success) {
        list =
          entityType === "COMPANY"
            ? response.data.map((item) => ({
                label: `${item.name} - ${item.branch}`,
                value: item.id,
              }))
            : entityType === "AGENCY" || entityType === "FOS"
              ? response.data.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))
              : [];

        setToEntities(list);
        setValue("toEntity", "");
      }
    } catch (error) {
      console.error(error);
      showError("Unable to load To Entity");
    } finally {
      setLoadingToEntity(false);
    }
  };

  useEffect(() => {
    if (pendingEdit?.fromEntity !== undefined && fromEntities.length > 0) {
      setValue("fromEntity", pendingEdit.fromEntity);
      setPendingEdit((prev) =>
        prev ? { ...prev, fromEntity: undefined } : prev,
      );
    }
  }, [fromEntities]);

  useEffect(() => {
    if (pendingEdit?.toEntity !== undefined && toEntities.length > 0) {
      setValue("toEntity", pendingEdit.toEntity);
      setPendingEdit((prev) =>
        prev ? { ...prev, toEntity: undefined } : prev,
      );
    }
  }, [toEntities]);

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const [year, month, day] = dateString.split("-");

    return `${day}-${months[Number(month) - 1]}-${year}`;
  };

  const parseDateForInput = (dateString) => {
    if (!dateString) return "";

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const [day, monStr, year] = dateString.split("-");
    const monthIndex = months.indexOf(monStr);
    if (monthIndex === -1) return "";

    const mm = String(monthIndex + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  };

  const getActiveMappingData = async () => {
    try {
      setLoader(true);

      const response = await apiClient.get("/mapping/view-mapping");

      if (response.success) {
        setTableData(response.data);
      }
    } catch (error) {
      console.error(error);
      showError(error?.message || "Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  const handleAddRow = (values) => {
    if (values.fromEntity === values.toEntity) {
      showError("From Entity and To Entity cannot be same.");
      return;
    }

    if (values.effectiveTo && values.effectiveTo < values.effectiveFrom) {
      showError("Effective To cannot be earlier than Effective From.");
      return;
    }

    const rowData = {
      fromEntityType: values.fromEntityType,
      fromEntity: values.fromEntity,
      toEntityType: values.toEntityType,
      toEntity: values.toEntity,
      relationship: values.relationship,
      context: values.context,
      effectiveFrom: formatDate(values.effectiveFrom),
      effectiveTo: values.effectiveTo ? formatDate(values.effectiveTo) : "",
      remark: values.remark,
      createdBy: userId,
    };

    if (editingId) {
      setTableRecord((prev) =>
        prev.map((row) =>
          row.id === editingId
            ? { ...row, ...rowData, errorCode: null, errorMsg: null }
            : row,
        ),
      );
    } else {
      setTableRecord((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          ...rowData,
          errorCode: null,
          errorMsg: null,
        },
      ]);
    }

    setEditingId(null);
    setPendingEdit(null);
    reset();
  };

  const handleEditRow = (row) => {
    setEditingId(row.id);

    setValue("fromEntityType", row.fromEntityType);
    setValue("toEntityType", row.toEntityType);
    setValue("relationship", row.relationship);
    setValue("context", row.context);
    setValue("remark", row.remark);
    setValue("effectiveFrom", parseDateForInput(row.effectiveFrom));
    setValue(
      "effectiveTo",
      row.effectiveTo ? parseDateForInput(row.effectiveTo) : "",
    );

    setValue("fromEntity", row.fromEntity);
    setValue("toEntity", row.toEntity);
    setPendingEdit({ fromEntity: row.fromEntity, toEntity: row.toEntity });
  };

  // Badge shown in the Status column based on the row's errorCode.
  const getBadge = (row) => {
    if (row.errorCode === null || row.errorCode === undefined) {
      return <span className="text-muted">-</span>;
    }
    if (row.errorCode === 9999) {
      return (
        <span className="badge bg-success text-white">
          <i className="bi bi-check-circle-fill me-1"></i>
          Successfully Mapped
        </span>
      );
    }
    if (row.errorCode === -102) {
      return (
        <span className="badge bg-warning text-dark">
          <i className="bi bi-exclamation-triangle-fill me-1"></i>
          Already Exist
        </span>
      );
    }
    return (
      <span className="badge bg-danger text-white">
        <i className="bi bi-x-circle-fill me-1"></i>
        Failed
      </span>
    );
  };

  const displayRecords = tableRecord.map((row) => ({
    ...row,
    status: getBadge(row),
    actions: (
      <button
        type="button"
        className="btn btn-sm btn-outline-primary"
        disabled={row.errorCode === 9999}
        onClick={() => handleEditRow(row)}
      >
        Edit
      </button>
    ),
  }));

  const onSubmit = async (records) => {
    try {
      setLoading(true);
      setLoader(true);

      const payload = records.map(({ errorCode, errorMsg, ...rest }) => rest);

      const response = await apiClient.post("/mapping/create-mapping", payload);

      if (response.success && response?.data?.length > 0) {
        setTableRecord((prev) =>
          prev.map((row) => {
            const match = response.data.find((item) => item.id === row.id);
            if (!match) return row;
            return {
              ...row,
              errorCode: match.response?.OUT_ERRORCODE,
              errorMsg: match.response?.OUT_ERRORMSG,
            };
          }),
        );
        getActiveMappingData();
      }
    } catch (error) {
      console.error(error);
      showError(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
      setLoader(false);
    }
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <h1 className="page-title">Entity Mapping Master</h1>
      </div>

      <div className="card">
        <div className="card-header">
          <h5>Create New Mapping</h5>
        </div>

        <div className="card-body">
          <form>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    From Entity Type
                    <span className="text-danger">*</span>
                  </label>

                  <select
                    {...register("fromEntityType", {
                      required: "From Entity Type is required",
                    })}
                    className={`form-select ${
                      errors.fromEntityType ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="COMPANY">Company</option>
                    <option value="AGENCY">Agency</option>
                  </select>

                  <div className="invalid-feedback">
                    {errors.fromEntityType?.message}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    To Entity Type
                    <span className="text-danger">*</span>
                  </label>

                  <select
                    {...register("toEntityType", {
                      required: "To Entity Type is required",
                    })}
                    className={`form-select ${
                      errors.toEntityType ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="COMPANY">Company</option>
                    <option value="AGENCY">Agency</option>
                  </select>

                  <div className="invalid-feedback">
                    {errors.toEntityType?.message}
                  </div>
                </div>

                {/* Role */}

                <div className="mb-3">
                  <label className="form-label">
                    Role / Relationship
                    <span className="text-danger">*</span>
                  </label>

                  <select
                    {...register("relationship", {
                      required: "Relationship is required",
                    })}
                    className={`form-select ${
                      errors.relationship ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">Select</option>
                    {relationshipOptions.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>

                  <div className="invalid-feedback">
                    {errors.relationship?.message}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Effective From
                    <span className="text-danger">*</span>
                  </label>

                  <input
                    type="date"
                    {...register("effectiveFrom", {
                      required: "Effective From is required",
                    })}
                    className={`form-control ${
                      errors.effectiveFrom ? "is-invalid" : ""
                    }`}
                  />

                  <div className="invalid-feedback">
                    {errors.effectiveFrom?.message}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Remark</label>

                  <textarea
                    rows="2"
                    {...register("remark")}
                    className={`form-control`}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    From Entity
                    <span className="text-danger">*</span>
                  </label>

                  <select
                    disabled={!fromEntityType || loadingFromEntity}
                    {...register("fromEntity", {
                      required: "From Entity is required",
                    })}
                    className={`form-select ${
                      errors.fromEntity ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">
                      {loadingFromEntity ? "Loading..." : "Select"}
                    </option>

                    {fromEntities.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>

                  <div className="invalid-feedback">
                    {errors.fromEntity?.message}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    To Entity
                    <span className="text-danger">*</span>
                  </label>

                  <select
                    disabled={!toEntityType || loadingToEntity}
                    {...register("toEntity", {
                      required: "To Entity is required",
                    })}
                    className={`form-select ${
                      errors.toEntity ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">
                      {loadingToEntity ? "Loading..." : "Select"}
                    </option>

                    {toEntities.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>

                  <div className="invalid-feedback">
                    {errors.toEntity?.message}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Context (Portfolio / Region)
                    <span className="text-danger">*</span>
                  </label>

                  <input
                    type="text"
                    {...register("context", {
                      required: "Context is required",
                    })}
                    className={`form-control ${
                      errors.context ? "is-invalid" : ""
                    }`}
                  />

                  <div className="invalid-feedback">
                    {errors.context?.message}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Effective To</label>

                  <input
                    type="date"
                    min={effectiveFrom}
                    {...register("effectiveTo")}
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <hr />

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={handleSubmit(handleAddRow)}
                disabled={loading}
                className="btn btn-primary me-2"
              >
                {editingId ? "Update" : "Add"}
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

      {tableRecord.length > 0 && (
        <div className="card">
          <div className="card-body">
            <DataTable
              searchable={false}
              exportable={false}
              title="Form Records"
              columns={tableCol}
              data={displayRecords}
              defaultPerPage={10}
            />
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => onSubmit(tableRecord)}
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Saving...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
          <h5 className="mb-3 mb-md-0">Active Mappings</h5>

          <div
            className="d-flex flex-column flex-md-row gap-2 w-100 w-md-auto"
            style={{ maxWidth: "400px" }}
          >
            <select className="form-select">
              <option value="">Select</option>
              <option value="All">All Types</option>
            </select>
            <select className="form-select">
              <option value="">Select</option>
              <option value="All">All Status</option>
            </select>
          </div>
        </div>

        <div className="card-body">
          <div className="table-responsive users-table-wrap">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>From Entity</th>
                  <th>To Entity</th>
                  <th>Context / Region</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tableData.length > 0 && (
                  <>
                    {tableData.map((item) => (
                      <tr>
                        <td>
                          <span
                            className={`px-2 py-1 me-2 rounded text-white`}
                            style={{
                              fontSize: 12,
                              backgroundColor:
                                item.FROM_TYPE === "COMPANY"
                                  ? "#0ea5a4"
                                  : item.FROM_TYPE === "AGENCY"
                                    ? "#d97706"
                                    : "#dc2626",
                            }}
                          >
                            {item.FROM_TYPE.charAt(0).toUpperCase()}
                          </span>
                          {`${item.FROM_NAME}`}
                        </td>
                        <td>
                          <span
                            className={`px-2 py-1 me-2 rounded text-white`}
                            style={{
                              fontSize: 12,
                              backgroundColor:
                                item.TO_TYPE === "COMPANY"
                                  ? "#0ea5a4"
                                  : item.TO_TYPE === "AGENCY"
                                    ? "#d97706"
                                    : "#dc2626",
                            }}
                          >
                            {item.TO_TYPE.charAt(0).toUpperCase()}
                          </span>
                          {`${item.TO_NAME}`}
                        </td>
                        <td>{item.MAP_CONTEXT}</td>
                        <td>
                          <span
                            className={`px-2 py-1 bg-${item.MAP_STATUS === "ACTIVE" ? "success" : "danger"} rounded text-white`}
                            style={{
                              fontSize: 12,
                            }}
                          >
                            {item.MAP_STATUS}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrmCreateMapping;
