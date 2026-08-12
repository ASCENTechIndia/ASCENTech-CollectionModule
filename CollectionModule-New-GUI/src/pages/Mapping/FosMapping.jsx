import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";
import { useLoader } from "../../context/LoaderContext";

const FosMapping = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setLoader } = useLoader();
  const userId = user?.userId;
  const { showSuccess, showError, showWarning } = useNotification();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      agency: "",
      fos: "",
      action: "1",
      effectiveFromDate: "",
      effectiveToDate: "",
      remark: "",
    },
  });

  const agencyValue = watch("agency");

  const [agencyOptions, setAgencyOptions] = useState([]);
  const [fosOptions, setFosOptions] = useState([]);

  const actionOptions = [
    { value: "1", label: "Assign" },
    { value: "2", label: "Action 2" },
    { value: "3", label: "Action 3" },
  ];

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

  const onSubmit = async (data) => {
    if (!userId) {
      alert("User Id is not set");
      return;
    }
    try {
      setLoader(true);
      const payload = {
        entityId: data.agency,
        fosId: data.fos,
        userId: userId,
        effectiveFromDate: formatDate(data.effectiveFromDate),
        effectiveToDate: formatDate(data.effectiveToDate),
        remark: data.remark,
      };
      const res = await apiClient.post("/mapping/create-fos-mapping", payload);
      if (res?.success && Number(res?.code) === 9999) {
        showSuccess(res.message);
        reset();
      } else {
        showError(res.message);
      }
    } catch (error) {
      showError(error.message);
    } finally {
      setLoader(false);
    }
  };

  const fetchList = async () => {
    try {
      const result = await Promise.allSettled([
        apiClient.get("/mapping/agency-list"),
        apiClient.get("/mapping/fos-list"),
      ]);

      // Agency List
      if (result[0].status === "fulfilled") {
        const res = result[0].value;
        if (res?.success && res?.data?.length > 0) {
          const opt = res.data.map((item) => ({
            label: item.name,
            value: item.id,
          }));
          setAgencyOptions(opt);
        } else {
          setAgencyOptions([]);
          showWarning("Agency record not found");
        }
      } else {
        setAgencyOptions([]);
        showWarning("Failed to fetch agency list");
      }

      //   FOS list
      if (result[1].status === "fulfilled") {
        const res = result[1].value;
        if (res?.success && res?.data?.length > 0) {
          const options = res.data.map((item) => ({
            label: item.name,
            value: item.id,
          }));
          setFosOptions(options);
        } else {
          setFosOptions([]);
          showWarning("FOS Record not found");
        }
      } else {
        setFosOptions([]);
        showWarning("Failed to fetch fos list");
      }
    } catch (error) {
      setFosOptions([]);
      setAgencyOptions([]);
      showError(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="main-content">
      <div className="page-header">
        <h1 className="page-title">FOS Mapping</h1>
      </div>

      <div className="card">
        <div className="card-header">
          <h5>Create FOS Mapping</h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Agency <span className="text-danger">*</span>
                </label>
                <select
                  {...register("agency", {
                    required: "Agency is required",
                  })}
                  className={`form-select ${errors.agency ? "is-invalid" : ""}`}
                >
                  <option value="">Select</option>
                  {agencyOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">{errors.agency?.message}</div>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  FOS <span className="text-danger">*</span>
                </label>
                <select
                  {...register("fos", {
                    required: "FOS is required",
                  })}
                  className={`form-select ${errors.fos ? "is-invalid" : ""}`}
                >
                  <option value="">Select</option>
                  {fosOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">{errors.fos?.message}</div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Action <span className="text-danger">*</span>{" "}
                </label>
                <select
                  {...register("action", {
                    required: "Action is required",
                  })}
                  className={`form-select ${errors.action ? "is-invalid" : ""}`}
                >
                  <option value="">Select</option>
                  {actionOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">{errors.action?.message}</div>
              </div>

              <div className="col-md-6 mb-3">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <label className="form-label">
                      Effective Date <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      {...register("effectiveFromDate", {
                        required: "Effective Date is required",
                      })}
                      className={`form-control ${
                        errors.effectiveFromDate ? "is-invalid" : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.effectiveFromDate?.message}
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <label className="form-label">
                      Effective To <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      {...register("effectiveToDate", {
                        required: "Effective Date is required",
                      })}
                      className={`form-control ${
                        errors.effectiveToDate ? "is-invalid" : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.effectiveToDate?.message}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 mb-3">
                <label className="form-label">Remark</label>
                <textarea
                  rows="3"
                  {...register("remark")}
                  className="form-control"
                />
              </div>
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary me-2">
                Submit
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

export default FosMapping;
