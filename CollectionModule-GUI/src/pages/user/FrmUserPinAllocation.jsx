import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Search, Loader2 } from "lucide-react";
import apiClient from "../../services/apiService";
import { useNotification } from "../../context/NotificationContext";

const FrmUserPinAllocation = () => {
  const navigate = useNavigate();
  const { showSuccess, showError, showWarning } = useNotification();

  // Pincode transfer state
  const [allPincodes, setAllPincodes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPins, setSelectedPins] = useState([]);
  const [loadingPincodes, setLoadingPincodes] = useState(false);
  const [loadingUsername, setLoadingUsername] = useState(false);
  const [loadingUserPincodes, setLoadingUserPincodes] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: { userId: "", userName: "" },
  });

  const userIdValue = watch("userId");

  // Fetch pincode list on mount
  useEffect(() => {
    const fetchPincodes = async () => {
      setLoadingPincodes(true);
      try {
        const response = await apiClient.get("/assignPincode/getPincodeList");
        if (response?.data?.success && response?.data?.data?.length) {
          const codes = response.data.data.map((item) => item.VAR_PINCODE_NO);
          setAllPincodes(codes);
        } else {
          setAllPincodes([]);
        }
      } catch (error) {
        console.error("Error fetching pincodes:", error);
        showError("Failed to load pincode list");
        setAllPincodes([]);
      } finally {
        setLoadingPincodes(false);
      }
    };
    fetchPincodes();
  }, []);

  // Fetch username and user's existing pincodes when search button is clicked
  const handleSearchUser = async () => {
    const userId = userIdValue;
    if (!userId || userId.trim() === "") {
      showWarning("Please enter a User ID first.");
      return;
    }

    setLoadingUsername(true);
    setLoadingUserPincodes(true);

    try {
      const [usernameResult, pincodesResult] = await Promise.allSettled([
        apiClient.get(
          `/assignPincode/fetchUsername?userId=${encodeURIComponent(userId)}`,
        ),
        apiClient.get(
          `/assignPincode/fetchUserPincodes?userId=${encodeURIComponent(userId)}`,
        ),
      ]);

      // Handle username API
      if (usernameResult.status === "fulfilled") {
        const response = usernameResult.value;
        if (response?.data?.success && response?.data?.data?.length) {
          const userName = response.data.data[0].VAR_USERMST_USERFULLNAME;
          setValue("userName", userName);
        } else {
          setValue("userName", "");
          showWarning("No user found for this User ID");
        }
      } else {
        setValue("userName", "");
        showError("Failed to fetch username. Please try again.");
      }

      // Handle user pincodes API
      if (pincodesResult.status === "fulfilled") {
        const response = pincodesResult.value;
        if (response?.data?.success && response?.data?.data?.length) {
          const userPincodes = response.data.data.map(
            (item) => item.VAR_USER_PINCODE,
          );
          setSelectedPins(userPincodes);
        } else {
          setSelectedPins([]);
          // If API succeeded but no pincodes, just clear (no error)
          if (!response?.data?.success) {
            showWarning(response?.data?.message || "No pincodes found for this user.");
          }
        }
      } else {
        setSelectedPins([]);
        showError("Failed to fetch assigned pincodes. Please try again.");
      }
    } catch (error) {
      console.error("Unexpected error in handleSearchUser:", error);
      showError("An unexpected error occurred. Please try again.");
    } finally {
      setLoadingUsername(false);
      setLoadingUserPincodes(false);
    }
  };

  // Move pin from left → right
  const handleAddPin = (pin) => {
    if (!selectedPins.includes(pin)) {
      setSelectedPins((prev) => [...prev, pin]);
    }
  };

  // Remove pin from right → left
  const handleRemovePin = (pin) => {
    setSelectedPins((prev) => prev.filter((p) => p !== pin));
  };

  // Filtered left-panel list based on search
  const filteredPins = allPincodes.filter((pin) => pin.includes(search.trim()));

  const onSubmit = async (values) => {
    if (selectedPins.length === 0) {
      showWarning("Please select at least one pincode to allocate.");
      return;
    }

    const payload = {
      username: Number(values.userId),
      pincode_str: selectedPins.join("~"),
    };

    try {
      const response = await apiClient.post(
        "/assignPincode/assignPinCode",
        payload,
      );

      if (
        response?.data?.success &&
        response?.data?.data?.out_errcode === 9999
      ) {
        showSuccess(response.data.data.out_data || "Pincodes allocated successfully");
        reset();
        setSelectedPins([]);
        setSearch("");
      } else {
        showError(
          response?.data?.data?.out_data ||
            response?.data?.message ||
            "Allocation failed",
        );
      }
    } catch (error) {
      showError(error?.response?.data?.message || "Network error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            User PIN Allocation
          </h1>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User ID with Search Button */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  User ID<span className="text-red-600">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    {...register("userId", {
                      required: "User ID is required",
                      pattern: {
                        value: /^[A-Za-z0-9]+$/,
                        message:
                          "User ID must contain only letters and numbers",
                      },
                    })}
                    placeholder="Enter User ID"
                    className={`flex-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                      errors.userId ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleSearchUser}
                    disabled={loadingUsername || loadingUserPincodes}
                    className="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loadingUsername || loadingUserPincodes ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                    Search
                  </button>
                </div>
                {errors.userId && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.userId.message}
                  </p>
                )}
              </div>

              {/* User Name (disabled, auto-filled) – no validation */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  User Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register("userName")} // No validation rules
                    disabled={true}
                    placeholder="Click Search to auto-fill"
                    className="w-full px-4 py-2.5 border rounded-lg bg-gray-100 cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Pincode Transfer Section */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                PinCode
              </label>

              {/* Search bar */}
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search pincode..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Dual panels */}
              <div className="flex gap-0 border border-gray-300 rounded-lg overflow-hidden">
                {/* Left panel — available pincodes */}
                <div className="w-1/2 border-r border-gray-300">
                  <div className="bg-gray-100 px-3 py-1.5 border-b border-gray-300">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Available ({allPincodes.length - selectedPins.length})
                    </span>
                  </div>
                  <div className="h-52 overflow-y-auto">
                    {loadingPincodes ? (
                      <div className="flex justify-center items-center h-full">
                        <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                      </div>
                    ) : filteredPins.length === 0 ? (
                      <p className="text-center text-sm text-gray-400 py-6">
                        {search ? "No results" : "No pincodes available"}
                      </p>
                    ) : (
                      filteredPins.map((pin) => {
                        const isDisabled = selectedPins.includes(pin);
                        return (
                          <div
                            key={pin}
                            onClick={() => !isDisabled && handleAddPin(pin)}
                            className={`px-4 py-2 text-sm border-b border-gray-100 last:border-0 transition-colors select-none
                    ${
                      isDisabled
                        ? "text-gray-300 cursor-not-allowed bg-gray-50"
                        : "text-blue-600 cursor-pointer hover:bg-blue-50 hover:text-blue-800"
                    }`}
                          >
                            {pin}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Right panel — selected pincodes */}
                <div className="w-1/2">
                  <div className="bg-gray-100 px-3 py-1.5 border-b border-gray-300">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Selected ({selectedPins.length})
                    </span>
                  </div>
                  <div className="h-52 overflow-y-auto">
                    {selectedPins.length === 0 ? (
                      <p className="text-center text-sm text-gray-400 py-6">
                        Click a pincode to add
                      </p>
                    ) : (
                      selectedPins.map((pin) => (
                        <div
                          key={pin}
                          onClick={() => handleRemovePin(pin)}
                          className="px-4 py-2 text-sm text-blue-600 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-red-50 hover:text-red-500 transition-colors select-none group flex items-center justify-between"
                        >
                          <span>{pin}</span>
                          <span className="text-xs text-gray-300 group-hover:text-red-400">
                            ✕ remove
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Click a pincode to move it. Click again on the right side to
                remove.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-7 flex justify-center gap-5">
              <button
                type="submit"
                className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Submit
              </button>
              <button
                type="button"
                className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
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

export default FrmUserPinAllocation;
