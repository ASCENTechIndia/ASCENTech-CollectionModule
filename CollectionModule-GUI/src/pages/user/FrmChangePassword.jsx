import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import apiClient from "../../services/apiService";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";

const FrmChangePassword = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.userId;

  const [usernameDisabled, setUsernameDisabled] = useState(true);
  const [userInfoLoading, setUserInfoLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPasswordValue = watch("newPassword");

  useEffect(() => {
    if (!userId) return;

    const fetchUserInfo = async () => {
      setUserInfoLoading(true);
      try {
        const res = await apiClient.get(
          `/password/desgidandusertype?userId=${userId}`,
        );

        if (res?.data?.success && res.data.data.length > 0) {
          const { NUM_USERMST_DESGID, NUM_USERMST_USERTYPE } = res.data.data[0];

          if (NUM_USERMST_DESGID === 1 && NUM_USERMST_USERTYPE === 3) {
            // User can type their own username
            setUsernameDisabled(false);
            setValue("username", "");
          } else {
            // Pre-fill with userId and lock the field
            setValue("username", userId);
            setUsernameDisabled(true);
          }
        }
      } catch (err) {
        console.error("Failed to fetch user info:", err);
        alert(err.message);
      } finally {
        setUserInfoLoading(false);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const onSubmit = async (values) => {
    try {
      Swal.fire({
        title: "Updating...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const payload = {
        userId: values.username,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };

      const res = await apiClient.post("/password/changePassword", payload);

      Swal.close();

      if (res?.data?.success && res?.data?.data?.out_ErrorCode === 9999) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: res.data.data.out_ErrorMsg || "Password changed successfully",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
          timer: 3000,
          timerProgressBar: true,
        }).then(() => {
          reset();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: res.data.data.out_ErrorMsg || "Something went wrong",
          confirmButtonText: "OK",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "Failed to change password. Please try again.",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* ── Page Title ── */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Change Password
          </h1>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ── Username ── */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  User Name<span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register("username", {
                      required: "User Name is required",
                    })}
                    disabled={usernameDisabled}
                    placeholder={
                      userInfoLoading ? "Loading..." : "Enter User Name"
                    }
                    className={`w-full px-4 py-2.5 border rounded-lg outline-none transition-all ${
                      usernameDisabled
                        ? "bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed"
                        : errors.username
                          ? "border-red-500 focus:ring-2 focus:ring-red-400"
                          : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    }`}
                  />
                  {userInfoLoading && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 animate-spin" />
                  )}
                </div>
                {errors.username && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* ── Old Password ── */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Old Password<span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  {...register("oldPassword", {
                    required: "Old Password is required",
                  })}
                  placeholder="Enter Old Password"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    errors.oldPassword ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.oldPassword && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.oldPassword.message}
                  </p>
                )}
              </div>

              {/* ── New Password ── */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  New Password<span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  {...register("newPassword", {
                    required: "New Password is required",
                  })}
                  placeholder="Enter New Password"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    errors.newPassword ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.newPassword && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* ── Confirm Password ── */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Confirm Password<span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === newPasswordValue || "Passwords do not match",
                  })}
                  placeholder="Re-enter New Password"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* ── Action Buttons ── */}
            <div className="mt-7 flex justify-center gap-5">
              <button
                type="submit"
                className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit
              </button>
              <button
                type="button"
                className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => navigate("/dashboard")}
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

export default FrmChangePassword;
