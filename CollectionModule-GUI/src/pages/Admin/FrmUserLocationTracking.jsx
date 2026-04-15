import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import apiClient from "../../services/apiService";
import Swal from "sweetalert2";
import MapComponent from "../../components/ui/MapComponent";

const FrmUserLocationTracking = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState(null); // { lat, lng }

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

  const onSubmit = async (values) => {
    if (!values.trackingDate || !values.userId) return;

    setLoading(true);
    Swal.fire({
      title: "Fetching location...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      console.log("vdate :", values.trackingDate);
      const response = await apiClient.get(
        `/userTracking/getLocationTracking?userId=${encodeURIComponent(
          values.userId,
        )}&cDate=${encodeURIComponent(values.trackingDate)}`,
      );

      Swal.close();

    //   console.log("res ::", response)
      if (response?.data?.success && response.data.data?.length > 0) {
        
        const locationStr = response.data.data[0].LOCATION; // e.g. "19.44742951,72.81012215"
        const [lat, lng] = locationStr.split(",").map(Number);
        if (!isNaN(lat) && !isNaN(lng)) {
          setCoordinates({ lat, lng });
        } else {
          Swal.fire({
            icon: "error",
            title: "Invalid coordinates",
            text: "The received location data is invalid.",
          });
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "No data",
          text: "No location found for the given user and date.",
        });
        setCoordinates(null);
      }
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Failed to fetch location.",
      });
      setCoordinates(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
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
                disabled={loading}
                className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
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

          {/* Display Map if coordinates exist */}
          {coordinates && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">User Location</h3>
              <MapComponent lat={coordinates.lat} lng={coordinates.lng} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FrmUserLocationTracking;
