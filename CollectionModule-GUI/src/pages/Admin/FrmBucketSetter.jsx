import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import apiClient from "../../services/apiService";
import { useNotification } from "../../context/NotificationContext";

const FrmBucketSetter = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();

  const [loading, setLoading] = useState(false);
  const [firstMessage, setFirstMessage] = useState("");
  const [secondMessage, setSecondMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFirstMessage("");
    setSecondMessage("");

    try {
      const response = await apiClient.post("/admin/bucketsetter");
      const { success, data } = response.data;

      if (success && data) {
        // First message: split the "message" property by dot and take 0th index
        const fullMessage = data.message || "";
        const firstPart = fullMessage.split(".")[0] + ".";
        setFirstMessage(firstPart);

        // Second message: use p_updated_count
        const updatedCount = data.p_updated_count;
        setSecondMessage(`${updatedCount} Rows Updated`);

        showSuccess("Bucket set successfully");
      } else {
        showError("Unexpected response format");
      }
    } catch (err) {
      console.error("API call failed:", err);
      showError(
        err?.response?.data?.message || err.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* ── Page Title ── */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Bucket Setter
          </h1>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit}>
            <div className="flex ">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Processing..." : "Set Bucket"}
              </button>
            </div>

            {/* Response Messages */}
            {(firstMessage || secondMessage) && (
              <div className="mt-6 space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <p className="text-green-800">{firstMessage}</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Updated Rows
                  </label>
                  <p className="text-blue-800">{secondMessage}</p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FrmBucketSetter;