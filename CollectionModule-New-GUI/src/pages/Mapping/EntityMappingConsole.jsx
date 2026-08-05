import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../../services/apiClient";
import { useNotification } from "../../context/NotificationContext";
import { useLoader } from "../../context/LoaderContext";

const EntityMappingConsole = () => {
  const { showError, showWarning, showSuccess } = useNotification();
  const { setLoader } = useLoader();

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

  const [toEntities, setToEntities] = useState([]);
  const [loadingToEntity, setLoadingToEntity] = useState(false);

  const [mappingTree, setMappingTree] = useState([]);
  const [loadingTree, setLoadingTree] = useState(false);

  const [stats, setStats] = useState({
    companies: 0,
    agency: 0,
    fosAgent: 0,
    activeMapping: 0,
  });
  const [loadingStats, setLoadingStats] = useState(false);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      setLoadingStats(true);
      setLoader(true);
      const response = await apiClient.get("/mapping/get-count");
      if (response?.success && response?.data) {
        setStats({
          companies: response.data.companies?.COMPANY || 0,
          agency: response.data.agency?.AGENCY || 0,
          fosAgent: response.data.fosAgent?.FOSAGENTS || 0,
          activeMapping: response.data.activeMapping?.TOTAL_COUNT || 0,
        });
      } else {
        setStats({
          companies: 0,
          agency: 0,
          fosAgent: 0,
          activeMapping: 0,
        });
        showWarning("Could not load summary counts");
      }
    } catch (error) {
      console.error(error);
      setStats({
        companies: 0,
        agency: 0,
        fosAgent: 0,
        activeMapping: 0,
      });
      showError(error.message || "Failed to fetch summary counts");
    } finally {
      setLoadingStats(false);
      setLoader(false);
    }
  };

  // Reset values
  useEffect(() => {
    setToEntities([]);
    setValue("entity", "");
    setMappingTree([]);
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

  const fetchEntityFosTreeData = async () => {
    try {
      setLoadingTree(true);
      setLoader(true);
      const payload = {
        entityType,
        entityId: selectedEntity,
      };

      const response = await apiClient.post(
        "/mapping/entity-relationship",
        payload,
      );

      if (response?.success && response?.data?.length > 0) {
        setMappingTree(response.data || []);
        showSuccess(response.message);
      } else {
        setMappingTree([]);
        showWarning("Entity fos relationship data not found");
      }
    } catch (error) {
      setMappingTree([]);
      showError(error.message || "Failed to fetch entity fos graph data");
    } finally {
      setLoadingTree(false);
      setLoader(false);
    }
  };

  useEffect(() => {
    if (selectedEntity) {
      fetchEntityFosTreeData();
    } else {
      setMappingTree([]);
    }
  }, [selectedEntity]);

  // Extracting label of the currently selected entity
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
                <p className="m-0 fw-bold fs-4">
                  {loadingStats ? (
                    <span
                      className="spinner-border spinner-border-sm text-secondary"
                      role="status"
                    />
                  ) : (
                    stats.companies
                  )}
                </p>
                <p className="m-0">Companies</p>
              </div>
            </div>
            <div className="col-lg-3 col-6 px-1">
              <div className="py-3 d-flex justify-content-center align-items-center flex-column rounded-3 bg-light ">
                <p className="m-0 fw-bold fs-4">
                  {loadingStats ? (
                    <span
                      className="spinner-border spinner-border-sm text-secondary"
                      role="status"
                    />
                  ) : (
                    stats.agency
                  )}
                </p>
                <p className="m-0">Agency</p>
              </div>
            </div>
            <div className="col-lg-3 col-6 px-1">
              <div className="py-3 d-flex justify-content-center align-items-center flex-column rounded-3 bg-light ">
                <p className="m-0 fw-bold fs-4">
                  {loadingStats ? (
                    <span
                      className="spinner-border spinner-border-sm text-secondary"
                      role="status"
                    />
                  ) : (
                    stats.fosAgent
                  )}
                </p>
                <p className="m-0">FOS Agents</p>
              </div>
            </div>
            <div className="col-lg-3 col-6 px-1">
              <div className="py-3 d-flex justify-content-center align-items-center flex-column rounded-3 bg-light ">
                <p className="m-0 fw-bold fs-4">
                  {loadingStats ? (
                    <span
                      className="spinner-border spinner-border-sm text-secondary"
                      role="status"
                    />
                  ) : (
                    stats.activeMapping
                  )}
                </p>
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

          {!selectedEntity ? (
            <p className="text-muted m-0">
              Select an entity above to view the mapping hierarchy.
            </p>
          ) : loadingTree ? (
            <p className="text-muted m-0">Loading hierarchy...</p>
          ) : mappingTree.length === 0 ? (
            <p className="text-muted m-0">
              No mapping data found for this entity.
            </p>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default EntityMappingConsole;
