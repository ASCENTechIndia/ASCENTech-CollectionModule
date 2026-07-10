import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import apiClient from "../../services/apiClient";
import { useNotification } from "../../context/NotificationContext";
import { useAuth } from "../../context/AuthContext";

const FrmCreateMapping = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const { user } = useAuth();
  // console.log(user);
  const username = user?.userName;
  const userId = user?.userId.split("E").pop();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
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
      // remark: ""
    },
  });

  //-------------------- Dropdown Data --------------------//

  const [entityTypes, setEntityTypes] = useState([]);
  const [fromEntities, setFromEntities] = useState([]);
  const [toEntities, setToEntities] = useState([]);
  const [relationships, setRelationships] = useState([]);

  //-------------------- Loading --------------------//

  const [loading, setLoading] = useState(false);
  const [loadingFromEntity, setLoadingFromEntity] = useState(false);
  const [loadingToEntity, setLoadingToEntity] = useState(false);

  //-------------------- Watch --------------------//

  const fromEntityType = watch("fromEntityType");
  const toEntityType = watch("toEntityType");
  const fromEntity = watch("fromEntity");
  const toEntity = watch("toEntity");
  const effectiveFrom = watch("effectiveFrom");

  //-------------------- Initial Load --------------------//

  useEffect(() => {
    loadEntityTypes();
    loadRelationshipTypes();
  }, []);

  //-------------------- Load Entity Types --------------------//

  const loadEntityTypes = async () => {
    try {
      // const response = await apiClient.get("/entity-types");

      // if (response.success) {
      //   setEntityTypes(response.data);
      // }
    } catch (error) {
      console.error(error);
      showError("Unable to load Entity Types");
    }
  };

  //-------------------- Load Relationship --------------------//

  const loadRelationshipTypes = async () => {
    try {
      // const response = await apiClient.get("/relationship-types");

      // if (response.success) {
      //   setRelationships(response.data);
      // }
    } catch (error) {
      console.error(error);
      showError("Unable to load Relationship Types");
    }
  };

  //-------------------- Load From Entity --------------------//

  useEffect(() => {
    if (!fromEntityType) {
      setFromEntities([]);
      setValue("fromEntity", "");
      return;
    }

    loadFromEntities(fromEntityType);
  }, [fromEntityType]);

  const loadFromEntities = async (entityType) => {
    try {
      setLoadingFromEntity(true);
      let apiUrl;
      if (entityType === "company") {
        apiUrl = '/mapping/company-list'
      } else if (entityType === "agency") {
        apiUrl = '/mapping/agency-list'
      }

      const response = await apiClient.get(
        apiUrl
      );


      if (response.success) {
        const list = entityType === "company" ? response.data.map(item => (
          {
            label: `${item.name} - ${item.branch}`,
            value: item.id
          }
        )) : entityType === "agency" ? response.data.map(item => (
          {
            label: item.name,
            value: item.id
          }
        )) : [];

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

  //-------------------- Load To Entity --------------------//

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
      if (entityType === "company") {
        apiUrl = '/mapping/company-list'
      } else if (entityType === "agency") {
        apiUrl = '/mapping/agency-list'
      } else if (entityType === "fos") {
        apiUrl = '/mapping/fos-list'
      }

      const response = await apiClient.get(
        apiUrl
      );
      let list;
      if (response.success) {
        list = entityType === "company" ? response.data.map(item => (
          {
            label: `${item.name} - ${item.branch}`,
            value: item.id
          }
        )) : (entityType === "agency" || entityType === "fos") ? response.data.map(item => (
          {
            label: item.name,
            value: item.id
          }
        )) : [];

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

  //-------------------- Submit --------------------//

  const onSubmit = async (values) => {
    try {
      // console.log(values);
      // return;
      if (values.fromEntity === values.toEntity) {
        showError("From Entity and To Entity cannot be same.");
        return;
      }

      if (
        values.effectiveTo &&
        values.effectiveTo < values.effectiveFrom
      ) {
        showError(
          "Effective To cannot be earlier than Effective From."
        );
        return;
      }

      setLoading(true);

      const payload = {
        // fromEntityTypeId: Number(values.fromEntityType),
        companyId: Number(values.fromEntity),

        // toEntityTypeId: Number(values.toEntityType),
        agencyId: Number(values.toEntity),

        relationship: values.relationship,

        context: values.context,

        effectiveFrom: values.effectiveFrom,
        effectiveTo: values.effectiveTo || "",
        remark: "",
        createdBy: userId,
      };

      let url;
      if (values.fromEntityType === "company" && values.toEntityType === "agency") {
        url = "/mapping/create-mapping";
      } else {
        url = ""
      }

      console.log(payload);
      // console.log(url);
      // return;

      const response = await apiClient.post(
        url,
        payload
      );

      console.log(response);
      return;

      if (response.data.success && response.data.code === "9999") {
        showSuccess(response.data.message);
        reset();
      }
    } catch (error) {
      console.error(error);
      showError(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
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
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="row">

              {/* Left Side */}

              <div className="col-md-6">

                {/* From Entity Type */}

                <div className="mb-3">
                  <label className="form-label">
                    From Entity Type
                    <span className="text-danger">*</span>
                  </label>

                  <select
                    {...register("fromEntityType", {
                      required: "From Entity Type is required",
                    })}
                    className={`form-select ${errors.fromEntityType ? "is-invalid" : ""
                      }`}
                  >
                    <option value="">--SELECT--</option>
                    <option value="company">Company</option>
                    <option value="agency">Agency</option>

                  </select>

                  <div className="invalid-feedback">
                    {errors.fromEntityType?.message}
                  </div>
                </div>

                {/* To Entity Type */}

                <div className="mb-3">
                  <label className="form-label">
                    To Entity Type
                    <span className="text-danger">*</span>
                  </label>

                  <select
                    {...register("toEntityType", {
                      required: "To Entity Type is required",
                    })}
                    className={`form-select ${errors.toEntityType ? "is-invalid" : ""
                      }`}
                  >
                    <option value="">--SELECT--</option>
                    <option value="company">Company</option>
                    <option value="agency">Agency</option>
                    <option value="fos">FOS</option>


                    {/* {entityTypes.map((item) => (
                      <option
                        key={item.entityTypeId}
                        value={item.entityTypeId}
                      >
                        {item.entityTypeName}
                      </option>
                    ))} */}
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
                    className={`form-select ${errors.relationship ? "is-invalid" : ""
                      }`}
                  >
                    <option value="">--Select--</option>
                    <option value="1">{`Service -> Collector`}</option>
                    {/* 
                    {relationships.map((item) => (
                      <option
                        key={item.relationshipId}
                        value={item.relationshipId}
                      >
                        {item.relationshipName}
                      </option>
                    ))}
                     */}
                  </select>

                  <div className="invalid-feedback">
                    {errors.relationship?.message}
                  </div>
                </div>

                {/* Effective From */}

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
                    className={`form-control ${errors.effectiveFrom ? "is-invalid" : ""
                      }`}
                  />

                  <div className="invalid-feedback">
                    {errors.effectiveFrom?.message}
                  </div>
                </div>

                {/* <div className="mb-3">
                  <label className="form-label">
                    Remark
                    <span className="text-danger">*</span>
                  </label>

                  <textarea
                    rows="2"
                    {...register("remark")}
                    className={`form-control`}
                  />
                  <div className="invalid-feedback">
                    {errors.remark?.message}
                  </div>
                </div> */}
              </div>

              {/* Right Side */}

              <div className="col-md-6">

                {/* From Entity */}

                <div className="mb-3">
                  <label className="form-label">
                    From Entity
                    <span className="text-danger">*</span>
                  </label>

                  <select
                    disabled={!fromEntityType || loadingFromEntity}
                    {...register("fromEntity", {
                      // required: "From Entity is required",
                    })}
                    className={`form-select ${errors.fromEntity ? "is-invalid" : ""
                      }`}
                  >
                    <option value="">
                      {loadingFromEntity
                        ? "Loading..."
                        : "Select"}
                    </option>

                    {fromEntities.map((item) => (
                      <option
                        key={item.value}
                        value={item.value}
                      >
                        {item.label}
                      </option>
                    ))}
                  </select>

                  <div className="invalid-feedback">
                    {errors.fromEntity?.message}
                  </div>
                </div>



                {/* To Entity */}

                <div className="mb-3">
                  <label className="form-label">
                    To Entity
                    <span className="text-danger">*</span>
                  </label>

                  <select
                    disabled={!toEntityType || loadingToEntity}
                    {...register("toEntity", {
                      // required: "To Entity is required",
                    })}
                    className={`form-select ${errors.toEntity ? "is-invalid" : ""
                      }`}
                  >
                    <option value="">
                      {loadingToEntity
                        ? "Loading..."
                        : "Select"}
                    </option>

                    {toEntities.map((item) => (
                      <option
                        key={item.value}
                        value={item.value}
                      >
                        {item.label}
                      </option>
                    ))}
                  </select>

                  <div className="invalid-feedback">
                    {errors.toEntity?.message}
                  </div>
                </div>

                {/* Context */}

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
                    className={`form-control ${errors.context ? "is-invalid" : ""
                      }`}
                  />

                  <div className="invalid-feedback">
                    {errors.context?.message}
                  </div>
                </div>



                {/* Effective To */}

                <div className="mb-3">
                  <label className="form-label">
                    Effective To
                  </label>

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
                type="submit"
                disabled={loading}
                className="btn btn-primary me-2"
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                    ></span>
                    Saving...
                  </>
                ) : (
                  "Submit"
                )}
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

export default FrmCreateMapping;