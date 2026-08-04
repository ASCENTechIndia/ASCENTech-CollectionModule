import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../../services/apiClient";
import { useNotification } from "../../context/NotificationContext";

const EntityMappingConsole = () => {
  const { showError } = useNotification();

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      entityType: "",
      entity: "",
    },
  });

  const entityType = watch("entityType");
  const selectedEntity = watch("entity");
  console.log("entiry :", selectedEntity);

  const [toEntities, setToEntities] = useState([]);
  const [loadingToEntity, setLoadingToEntity] = useState(false);

  const [mappingTree, setMappingTree] = useState([
    {
      agency: "First Agency",
      persons: ["Person 1", "Person 2"],
    },
    {
      agency: "Second Agency",
      persons: ["Person 1", "Person 2", "Person 3"],
    },
    {
      agency: "Second Agency",
      persons: ["Person 1"],
    },
  ]);

  // Reset values
  useEffect(() => {
    setToEntities([]);
    setValue("entity", "");
    if (entityType) {
      loadToEntities(entityType);
    }
  }, [entityType]);

  const loadToEntities = async (type) => {
    try {
      setLoadingToEntity(true);
      let apiUrl;
      if (type === "COMPANY") {
        apiUrl = "/mapping/company-list";
      } else if (type === "AGENCY") {
        apiUrl = "/mapping/agency-list";
      } else if (type === "FOS") {
        apiUrl = "/mapping/fos-list";
      }

      const response = await apiClient.get(apiUrl);
      if (response.success) {
        let list;
        if (type === "COMPANY") {
          list = response.data.map((item) => ({
            label: `${item.name} - ${item.branch}`,
            value: item.id,
          }));
        } else if (type === "AGENCY" || type === "FOS") {
          list = response.data.map((item) => ({
            label: item.name,
            value: item.id,
          }));
        }
        setToEntities(list);
        setValue("entity", ""); // clear previous selection
      }
    } catch (error) {
      console.error(error);
      showError("Unable to load Entities");
    } finally {
      setLoadingToEntity(false);
    }
  };

  // Extracting label of the currently selected entity type
  const selectedEntityLabel = toEntities.find(
    (item) => String(item.value) === String(selectedEntity),
  )?.label;

  return (
    <div className="main-content">
      <div className="page-header">
        <h1 className="page-title">Entity & Mapping Console</h1>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-3 col-6 px-1">
              <div className="py-3 d-flex justify-content-center align-items-center flex-column rounded-3 bg-light ">
                <p className="m-0 fw-bold fs-4">12</p>
                <p className="m-0">Companies</p>
              </div>
            </div>
            <div className="col-lg-3 col-6 px-1">
              <div className="py-3 d-flex justify-content-center align-items-center flex-column rounded-3 bg-light ">
                <p className="m-0 fw-bold fs-4">47</p>
                <p className="m-0">Agency</p>
              </div>
            </div>
            <div className="col-lg-3 col-6 px-1">
              <div className="py-3 d-flex justify-content-center align-items-center flex-column rounded-3 bg-light ">
                <p className="m-0 fw-bold fs-4">318</p>
                <p className="m-0">FOS Agents</p>
              </div>
            </div>
            <div className="col-lg-3 col-6 px-1">
              <div className="py-3 d-flex justify-content-center align-items-center flex-column rounded-3 bg-light ">
                <p className="m-0 fw-bold fs-4">204</p>
                <p className="m-0">Active Mappings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">
                Select Entity Type
                <span className="text-danger">*</span>
              </label>
              <select
                {...register("entityType", {
                  required: "Entity Type is required",
                })}
                className={`form-select ${
                  errors.entityType ? "is-invalid" : ""
                }`}
              >
                <option value="">--SELECT--</option>
                <option value="COMPANY">Company</option>
                <option value="AGENCY">Agency</option>
                <option value="FOS">FOS</option>
              </select>
              <div className="invalid-feedback">
                {errors.entityType?.message}
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Select Entity
                <span className="text-danger">*</span>
              </label>
              <select
                disabled={!entityType || loadingToEntity}
                {...register("entity", {
                  required: "Entity is required",
                })}
                className={`form-select ${errors.entity ? "is-invalid" : ""}`}
              >
                <option value="">
                  {loadingToEntity ? "Loading..." : "Select Entity"}
                </option>
                {toEntities.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">{errors.entity?.message}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <p className="fw-bold fs-5 mb-3">Relationship Graph</p>

          {selectedEntity ? (
            <div className="mapping-tree">
              <div className="tree-row tree-root">
                <span className="tree-badge badge-co">CO</span>
                <span>{selectedEntityLabel || "Selected Entity"}</span>
              </div>

              <div className="tree-children">
                {mappingTree.map((agencyItem, idx) => (
                  <div className="tree-branch" key={idx}>
                    <div className="tree-row tree-agency">
                      <span className="tree-badge badge-ag">AG</span>
                      <span>{agencyItem.agency}</span>
                    </div>

                    <div className="tree-children">
                      {agencyItem.persons.map((person, pIdx) => (
                        <div className="tree-row tree-fos" key={pIdx}>
                          <span className="tree-badge badge-fos">FOS</span>
                          <span>{person}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-muted m-0">
              Select an entity above to view the mapping hierarchy.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntityMappingConsole;
