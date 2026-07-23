// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

// import apiClient from "../../services/apiClient";
// import { useNotification } from "../../context/NotificationContext";
// import { useAuth } from "../../context/AuthContext";
// import { useLoader } from "../../context/LoaderContext";
// import DataTable from "../../components/Datatable";

// const FrmCreateMapping = () => {
//   const navigate = useNavigate();
//   const { showSuccess, showError } = useNotification();
//   const { user } = useAuth();
//   const { setLoader } = useLoader();
//   const username = user?.userName;
//   const userId = user?.userId.split("E").pop();

//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       fromEntityType: "",
//       fromEntity: "",
//       toEntityType: "",
//       toEntity: "",
//       relationship: "",
//       context: "",
//       effectiveFrom: "",
//       effectiveTo: "",
//       remark: "",
//     },
//   });

//   const [entityTypes, setEntityTypes] = useState([]);
//   const [fromEntities, setFromEntities] = useState([]);
//   const [toEntities, setToEntities] = useState([]);
//   const [relationships, setRelationships] = useState([]);
//   const [tableData, setTableData] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [loadingFromEntity, setLoadingFromEntity] = useState(false);
//   const [loadingToEntity, setLoadingToEntity] = useState(false);

//   const fromEntityType = watch("fromEntityType");
//   const toEntityType = watch("toEntityType");
//   const fromEntity = watch("fromEntity");
//   const toEntity = watch("toEntity");
//   const effectiveFrom = watch("effectiveFrom");

//   const tableCol = [
//     { label: "From Entity Type", key: "fromEntityType" },
//     { label: "", key: "" },
//   ];
//   const [tableRecord, setTableRecord] = useState([
//     { test: "1" },
//     { test: "2" },
//   ]);

//   useEffect(() => {
//     loadEntityTypes();
//     loadRelationshipTypes();
//     getActiveMappingData();
//   }, []);

//   const loadEntityTypes = async () => {
//     try {
//     } catch (error) {
//       console.error(error);
//       showError("Unable to load Entity Types");
//     }
//   };

//   const loadRelationshipTypes = async () => {
//     try {
//     } catch (error) {
//       console.error(error);
//       showError("Unable to load Relationship Types");
//     }
//   };

//   useEffect(() => {
//     if (!fromEntityType) {
//       setFromEntities([]);
//       setValue("fromEntity", "");
//       return;
//     }

//     loadFromEntities(fromEntityType);
//   }, [fromEntityType]);

//   const loadFromEntities = async (entityType) => {
//     try {
//       setLoadingFromEntity(true);
//       let apiUrl;
//       if (entityType === "COMPANY") {
//         apiUrl = "/mapping/company-list";
//       } else if (entityType === "AGENCY") {
//         apiUrl = "/mapping/agency-list";
//       }

//       const response = await apiClient.get(apiUrl);

//       if (response.success) {
//         const list =
//           entityType === "COMPANY"
//             ? response.data.map((item) => ({
//                 label: `${item.name} - ${item.branch}`,
//                 value: item.id,
//               }))
//             : entityType === "AGENCY"
//               ? response.data.map((item) => ({
//                   label: item.name,
//                   value: item.id,
//                 }))
//               : [];

//         setFromEntities(list);
//         setValue("fromEntity", "");
//       }
//     } catch (error) {
//       console.error(error);
//       showError("Unable to load From Entity");
//     } finally {
//       setLoadingFromEntity(false);
//     }
//   };

//   useEffect(() => {
//     if (!toEntityType) {
//       setToEntities([]);
//       setValue("toEntity", "");
//       return;
//     }

//     loadToEntities(toEntityType);
//   }, [toEntityType]);

//   const loadToEntities = async (entityType) => {
//     try {
//       setLoadingToEntity(true);
//       let apiUrl;
//       if (entityType === "COMPANY") {
//         apiUrl = "/mapping/company-list";
//       } else if (entityType === "AGENCY") {
//         apiUrl = "/mapping/agency-list";
//       } else if (entityType === "FOS") {
//         apiUrl = "/mapping/fos-list";
//       }

//       const response = await apiClient.get(apiUrl);
//       let list;
//       if (response.success) {
//         list =
//           entityType === "COMPANY"
//             ? response.data.map((item) => ({
//                 label: `${item.name} - ${item.branch}`,
//                 value: item.id,
//               }))
//             : entityType === "AGENCY" || entityType === "FOS"
//               ? response.data.map((item) => ({
//                   label: item.name,
//                   value: item.id,
//                 }))
//               : [];

//         setToEntities(list);
//         setValue("toEntity", "");
//       }
//     } catch (error) {
//       console.error(error);
//       showError("Unable to load To Entity");
//     } finally {
//       setLoadingToEntity(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "";

//     const months = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];

//     const [year, month, day] = dateString.split("-");

//     return `${day}-${months[Number(month) - 1]}-${year}`;
//   };

//   const getActiveMappingData = async () => {
//     try {
//       setLoader(true);

//       const response = await apiClient.get("/mapping/view-mapping");

//       if (response.success) {
//         setTableData(response.data);
//       }
//     } catch (error) {
//       console.error(error);
//       showError(error?.message || "Something went wrong");
//     } finally {
//       setLoader(false);
//     }
//   };

//   const onSubmit = async (values) => {
//     try {
//       if (values.fromEntity === values.toEntity) {
//         showError("From Entity and To Entity cannot be same.");
//         return;
//       }

//       if (values.effectiveTo && values.effectiveTo < values.effectiveFrom) {
//         showError("Effective To cannot be earlier than Effective From.");
//         return;
//       }

//       setLoading(true);
//       setLoader(true);

//       const payload = {
//         fromEntityType: values.fromEntityType,
//         fromEntityId: Number(values.fromEntity),

//         toEntityType: values.toEntityType,
//         toEntityId: Number(values.toEntity),

//         relationship: values.relationship,

//         context: values.context,

//         effectiveFrom: formatDate(values.effectiveFrom),
//         effectiveTo: values.effectiveTo ? formatDate(values.effectiveTo) : "",
//         remark: values.remark,
//         createdBy: userId,
//       };

//       let url;
//       if (
//         (values.fromEntityType === "COMPANY" &&
//           values.toEntityType === "AGENCY") ||
//         (values.fromEntityType === "AGENCY" &&
//           values.toEntityType === "COMPANY")
//       ) {
//         url = "/mapping/create-mapping";
//       } else {
//         url = "";
//       }

//       const response = await apiClient.post(url, payload);

//       if (response.success && response.code === 9999) {
//         showSuccess(response.message);
//         reset();
//         getActiveMappingData();
//       }
//     } catch (error) {
//       console.error(error);
//       showError(error?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//       setLoader(false);
//     }
//   };

//   return (
//     <div className="main-content">
//       <div className="page-header">
//         <h1 className="page-title">Entity Mapping Master</h1>
//       </div>

//       <div className="card">
//         <div className="card-header">
//           <h5>Create New Mapping</h5>
//         </div>

//         <div className="card-body">
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="row">
//               <div className="col-md-6">
//                 <div className="mb-3">
//                   <label className="form-label">
//                     From Entity Type
//                     <span className="text-danger">*</span>
//                   </label>

//                   <select
//                     {...register("fromEntityType", {
//                       required: "From Entity Type is required",
//                     })}
//                     className={`form-select ${
//                       errors.fromEntityType ? "is-invalid" : ""
//                     }`}
//                   >
//                     <option value="">--SELECT--</option>
//                     <option value="COMPANY">Company</option>
//                     <option value="AGENCY">Agency</option>
//                   </select>

//                   <div className="invalid-feedback">
//                     {errors.fromEntityType?.message}
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">
//                     To Entity Type
//                     <span className="text-danger">*</span>
//                   </label>

//                   <select
//                     {...register("toEntityType", {
//                       required: "To Entity Type is required",
//                     })}
//                     className={`form-select ${
//                       errors.toEntityType ? "is-invalid" : ""
//                     }`}
//                   >
//                     <option value="">--SELECT--</option>
//                     <option value="COMPANY">Company</option>
//                     <option value="AGENCY">Agency</option>
//                     <option value="FOS">FOS</option>
//                   </select>

//                   <div className="invalid-feedback">
//                     {errors.toEntityType?.message}
//                   </div>
//                 </div>

//                 {/* Role */}

//                 <div className="mb-3">
//                   <label className="form-label">
//                     Role / Relationship
//                     <span className="text-danger">*</span>
//                   </label>

//                   <select
//                     {...register("relationship", {
//                       required: "Relationship is required",
//                     })}
//                     className={`form-select ${
//                       errors.relationship ? "is-invalid" : ""
//                     }`}
//                   >
//                     <option value="">--Select--</option>
//                     <option value="1">{`Service -> Collector`}</option>
//                   </select>

//                   <div className="invalid-feedback">
//                     {errors.relationship?.message}
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">
//                     Effective From
//                     <span className="text-danger">*</span>
//                   </label>

//                   <input
//                     type="date"
//                     {...register("effectiveFrom", {
//                       required: "Effective From is required",
//                     })}
//                     className={`form-control ${
//                       errors.effectiveFrom ? "is-invalid" : ""
//                     }`}
//                   />

//                   <div className="invalid-feedback">
//                     {errors.effectiveFrom?.message}
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">Remark</label>

//                   <textarea
//                     rows="2"
//                     {...register("remark")}
//                     className={`form-control`}
//                   />
//                 </div>
//               </div>

//               <div className="col-md-6">
//                 <div className="mb-3">
//                   <label className="form-label">
//                     From Entity
//                     <span className="text-danger">*</span>
//                   </label>

//                   <select
//                     disabled={!fromEntityType || loadingFromEntity}
//                     {...register("fromEntity", {
//                       required: "From Entity is required",
//                     })}
//                     className={`form-select ${
//                       errors.fromEntity ? "is-invalid" : ""
//                     }`}
//                   >
//                     <option value="">
//                       {loadingFromEntity ? "Loading..." : "Select"}
//                     </option>

//                     {fromEntities.map((item) => (
//                       <option key={item.value} value={item.value}>
//                         {item.label}
//                       </option>
//                     ))}
//                   </select>

//                   <div className="invalid-feedback">
//                     {errors.fromEntity?.message}
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">
//                     To Entity
//                     <span className="text-danger">*</span>
//                   </label>

//                   <select
//                     disabled={!toEntityType || loadingToEntity}
//                     {...register("toEntity", {
//                       required: "To Entity is required",
//                     })}
//                     className={`form-select ${
//                       errors.toEntity ? "is-invalid" : ""
//                     }`}
//                   >
//                     <option value="">
//                       {loadingToEntity ? "Loading..." : "Select"}
//                     </option>

//                     {toEntities.map((item) => (
//                       <option key={item.value} value={item.value}>
//                         {item.label}
//                       </option>
//                     ))}
//                   </select>

//                   <div className="invalid-feedback">
//                     {errors.toEntity?.message}
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">
//                     Context (Portfolio / Region)
//                     <span className="text-danger">*</span>
//                   </label>

//                   <input
//                     type="text"
//                     {...register("context", {
//                       required: "Context is required",
//                     })}
//                     className={`form-control ${
//                       errors.context ? "is-invalid" : ""
//                     }`}
//                   />

//                   <div className="invalid-feedback">
//                     {errors.context?.message}
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">Effective To</label>

//                   <input
//                     type="date"
//                     min={effectiveFrom}
//                     {...register("effectiveTo")}
//                     className="form-control"
//                   />
//                 </div>
//               </div>
//             </div>

//             <hr />

//             <div className="text-center mt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="btn btn-primary me-2"
//               >
//                 {loading ? (
//                   <>
//                     <span className="spinner-border spinner-border-sm me-2"></span>
//                     Saving...
//                   </>
//                 ) : (
//                   "Submit"
//                 )}
//               </button>

//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={() => navigate(-1)}
//               >
//                 Close
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       <DataTable
//         searchable={false}
//         exportable={false}
//         title="Form Records"
//         columns={tableCol}
//         data={tableRecord}
//         defaultPerPage={10}
//       />

//       <div className="card">
//         <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
//           <h5 className="mb-3 mb-md-0">Active Mappings</h5>

//           <div
//             className="d-flex flex-column flex-md-row gap-2 w-100 w-md-auto"
//             style={{ maxWidth: "400px" }}
//           >
//             <select className="form-select">
//               <option value="">--SELECT--</option>
//               <option value="All">All Types</option>
//             </select>
//             <select className="form-select">
//               <option value="">--SELECT--</option>
//               <option value="All">All Status</option>
//             </select>
//           </div>
//         </div>

//         <div className="card-body">
//           <div className="table-responsive users-table-wrap">
//             <table className="table table-hover align-middle mb-0">
//               <thead>
//                 <tr>
//                   <th>From Entity</th>
//                   <th>To Entity</th>
//                   <th>Context / Region</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tableData.length > 0 && (
//                   <>
//                     {tableData.map((item) => (
//                       <tr>
//                         <td>
//                           <span
//                             className={`px-2 py-1 me-2 rounded text-white`}
//                             style={{
//                               fontSize: 12,
//                               backgroundColor:
//                                 item.FROM_TYPE === "COMPANY"
//                                   ? "#0ea5a4"
//                                   : item.FROM_TYPE === "AGENCY"
//                                     ? "#d97706"
//                                     : "#dc2626",
//                             }}
//                           >
//                             {item.FROM_TYPE.charAt(0).toUpperCase()}
//                           </span>
//                           {`${item.FROM_NAME}`}
//                         </td>
//                         <td>
//                           <span
//                             className={`px-2 py-1 me-2 rounded text-white`}
//                             style={{
//                               fontSize: 12,
//                               backgroundColor:
//                                 item.TO_TYPE === "COMPANY"
//                                   ? "#0ea5a4"
//                                   : item.TO_TYPE === "AGENCY"
//                                     ? "#d97706"
//                                     : "#dc2626",
//                             }}
//                           >
//                             {item.TO_TYPE.charAt(0).toUpperCase()}
//                           </span>
//                           {`${item.TO_NAME}`}
//                         </td>
//                         <td>{item.MAP_CONTEXT}</td>
//                         <td>
//                           <span
//                             className={`px-2 py-1 bg-${item.MAP_STATUS === "ACTIVE" ? "success" : "danger"} rounded text-white`}
//                             style={{
//                               fontSize: 12,
//                             }}
//                           >
//                             {item.MAP_STATUS}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FrmCreateMapping;

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
  }, [fromEntityType]);

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
      } else if (entityType === "FOS") {
        apiUrl = "/mapping/fos-list";
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

  // Called when the "Add" button is clicked. Validates the form (via
  // handleSubmit) and appends the current field values as a new row into
  // tableRecord, which is rendered in the "Form Records" DataTable below.
  const handleAddRow = (values) => {
    if (values.fromEntity === values.toEntity) {
      showError("From Entity and To Entity cannot be same.");
      return;
    }

    if (values.effectiveTo && values.effectiveTo < values.effectiveFrom) {
      showError("Effective To cannot be earlier than Effective From.");
      return;
    }

    const fromEntityLabel =
      fromEntities.find(
        (item) => String(item.value) === String(values.fromEntity),
      )?.label || values.fromEntity;

    const toEntityLabel =
      toEntities.find((item) => String(item.value) === String(values.toEntity))
        ?.label || values.toEntity;

    const relationshipLabel =
      relationshipOptions.find(
        (item) => String(item.value) === String(values.relationship),
      )?.label || values.relationship;

    const newRow = {
      fromEntityType: values.fromEntityType,
      fromEntity: fromEntityLabel,
      toEntityType: values.toEntityType,
      toEntity: toEntityLabel,
      relationship: relationshipLabel,
      context: values.context,
      effectiveFrom: formatDate(values.effectiveFrom),
      effectiveTo: values.effectiveTo ? formatDate(values.effectiveTo) : "",
      remark: values.remark,
    };

    setTableRecord((prev) => [...prev, newRow]);
    reset()
  };

  const onSubmit = async (values) => {
    try {
      if (values.fromEntity === values.toEntity) {
        showError("From Entity and To Entity cannot be same.");
        return;
      }

      if (values.effectiveTo && values.effectiveTo < values.effectiveFrom) {
        showError("Effective To cannot be earlier than Effective From.");
        return;
      }

      setLoading(true);
      setLoader(true);

      const payload = {
        fromEntityType: values.fromEntityType,
        fromEntityId: Number(values.fromEntity),

        toEntityType: values.toEntityType,
        toEntityId: Number(values.toEntity),

        relationship: values.relationship,

        context: values.context,

        effectiveFrom: formatDate(values.effectiveFrom),
        effectiveTo: values.effectiveTo ? formatDate(values.effectiveTo) : "",
        remark: values.remark,
        createdBy: userId,
      };

      let url;
      if (
        (values.fromEntityType === "COMPANY" &&
          values.toEntityType === "AGENCY") ||
        (values.fromEntityType === "AGENCY" &&
          values.toEntityType === "COMPANY")
      ) {
        url = "/mapping/create-mapping";
      } else {
        url = "";
      }

      const response = await apiClient.post(url, payload);

      if (response.success && response.code === 9999) {
        showSuccess(response.message);
        reset();
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
                    <option value="">--SELECT--</option>
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
                    <option value="">--SELECT--</option>
                    <option value="COMPANY">Company</option>
                    <option value="AGENCY">Agency</option>
                    <option value="FOS">FOS</option>
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
                    <option value="">--Select--</option>
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
                Add
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
            data={tableRecord}
            defaultPerPage={10}
          />
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
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
              <option value="">--SELECT--</option>
              <option value="All">All Types</option>
            </select>
            <select className="form-select">
              <option value="">--SELECT--</option>
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
