import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const FrmUserLocationTracking = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      trackingDate: "",
      userId: "",
    },
  });

  const onSubmit = (values) => {
    console.log("Form values:", values);
    // Future API call will be placed here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* ── Page Title ── */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            User Location Tracking
          </h1>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tracking Date */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Tracking Date<span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  {...register("trackingDate", {
                    required: "Tracking Date is required",
                  })}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    errors.trackingDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.trackingDate && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.trackingDate.message}
                  </p>
                )}
              </div>

              {/* User ID */}
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
            </div>

            {/* Action Buttons */}
            <div className="mt-7 flex justify-center gap-5">
              <button
                type="submit"
                className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Search
              </button>
              <button
                type="button"
                className="px-8 py-2.5 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
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

export default FrmUserLocationTracking;
