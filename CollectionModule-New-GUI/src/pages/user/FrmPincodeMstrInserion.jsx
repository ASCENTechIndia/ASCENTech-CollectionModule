import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/useNotification";

const FrmPincodeMstrInserion = () => {
  const { user } = useAuth();
  const { showError, showSuccess } = useNotification();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { pinCode: "" },
  });

  const onSubmit = async (values) => {
    try {
      const payload = { pincode: values.pinCode };
      const response = await apiClient.post(
        "/assignPincode/insertPincodeMaster",
        payload,
      );

      if (response.success && response.data.isSuccess) {
        showSuccess(response.data.message || "Pincode inserted successfully");
        reset({ pinCode: "" });
      } else if (response.success && !response.data.isSuccess) {
        showError(response.data.message || "Failed to insert pincode");
      }
    } catch (error) {
      console.log(error);
      showError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to insert pincode",
      );
    }
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <h1 className="page-title">Pincode Master Insertion</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            Home
          </Link>
          <span className="breadcrumb-item">User Management</span>
          <span className="breadcrumb-item active">Pincode Master</span>
        </nav>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label">
                    Enter Pincode <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.pinCode ? "is-invalid" : ""}`}
                    placeholder="Enter Pincode (6 digits)"
                    maxLength={6}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, "");
                    }}
                    {...register("pinCode", {
                      required: "Pincode is required",
                    })}
                  />
                  {errors.pinCode && (
                    <div className="invalid-feedback">
                      {errors.pinCode.message}
                    </div>
                  )}
                </div>

                <div className="d-flex justify-content-center gap-3 mt-4">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/dashboard")}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrmPincodeMstrInserion;
