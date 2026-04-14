import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import apiClient from "../../services/apiService";
import Swal from "sweetalert2";

const FrmResetPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { userId: "" },
  });

  const onSubmit = async (values) => {
    if (!values.userId || values.userId.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Empty User ID",
        text: "Please enter a User ID.",
      });
      return;
    }

    setLoading(true);
    Swal.fire({
      title: "Processing...",
      text: "Resetting password...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const payload = { userId: values.userId };
      const response = await apiClient.post("/password/resetPassword", payload);
      Swal.close();
      console.log("res :", response);

      if (response?.data?.success && response?.data?.data?.success) {
        const newPwd = response?.data?.data?.Password || "";
        setNewPassword(newPwd);

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response.data.data.message || "Password reset successfully",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          //clear the User ID field
          reset();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            response?.data?.data?.message ||
            response?.data?.message ||
            "Reset failed",
        });
      }
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Network error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Reset Password
          </h1>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              {/* Radio group – only Login Password for now */}
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="resetType"
                    value="loginPassword"
                    defaultChecked
                    className="text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    Login Password
                  </span>
                </label>
              </div>

              {/* User ID field */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  User ID<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  {...register("userId", {
                    required: "User ID is required",
                    pattern: {
                      value: /^[A-Za-z0-9]+$/,
                      message: "User ID must contain only letters and numbers",
                    },
                  })}
                  placeholder="Enter User ID"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    errors.userId ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.userId && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.userId.message}
                  </p>
                )}
              </div>

              {/* New Password field – shown only after successful reset */}
              {newPassword && (
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    New Password
                  </label>
                  <input
                    type="text"
                    value={newPassword}
                    readOnly
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-7 flex justify-center gap-5">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Reset
                </button>
                <button
                  type="button"
                  className="px-8 py-2.5 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
                  onClick={() => navigate("/dashboard")}
                >
                  Back
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FrmResetPassword;
