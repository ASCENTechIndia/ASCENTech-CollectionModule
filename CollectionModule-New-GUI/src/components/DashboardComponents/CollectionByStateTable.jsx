import React, { useEffect, useState } from "react";
import { useNotification } from "../../context/NotificationContext";
import { useLoader } from "../../context/LoaderContext";
import apiClient from "../../services/apiClient";

const COLORS = [
  "#2f6fed",
  "#7ea5f3",
  "#c7dafb",
  "#22b04c",
  "#f5a524",
  "#8b5cf6",
  "#dc3545",
  "#20c997",
  "#6f42c1",
  "#fd7e14",
];

const formatINR = (num) =>
  Number(num).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function CollectionByStateTable() {
  const { showError } = useNotification();
  const { setLoader } = useLoader();
  const [stateData, setStateData] = useState([]);
  const [totalCollection, setTotalCollection] = useState(0);
  const [showInLacs, setShowInLacs] = useState(false);

  const fetchData = async () => {
    try {
      setLoader(true);
      const res = await apiClient.get("/collection-dashboard/state-collection");
      if (res?.success && res?.data?.stateCollections?.length > 0) {
        const items = res.data.stateCollections;
        const mapped = items.map((item, index) => ({
          state: item.stateName,
          collection: item.totalCollection,
          share: item.collectionPercentage,
          color: COLORS[index % COLORS.length],
        }));
        setStateData(mapped);
        const total = mapped.reduce((sum, d) => sum + d.collection, 0);
        setTotalCollection(total);
      } else {
        setStateData([]);
        setTotalCollection(0);
      }
    } catch (error) {
      console.error(error);
      showError(error.message || "Failed to fetch state collection data");
      setStateData([]);
      setTotalCollection(0);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatCollection = (amount) => {
    if (showInLacs) {
      const lakhs = amount / 100000;
      return lakhs.toFixed(2) + " L";
    }
    return formatINR(amount);
  };

  const handleToggle = () => {
    setShowInLacs((prev) => !prev);
  };

  return (
    <div className="panel-card">
      <div className="panel-title d-flex justify-content-between align-items-center">
        <span>COLLECTION BY STATE</span>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="lacsToggle"
            checked={showInLacs}
            onChange={handleToggle}
          />
          <label
            className="form-check-label"
            htmlFor="lacsToggle"
            style={{ width: "50px" }}
          >
            {showInLacs ? "Lakhs" : "Rupees"}
          </label>
        </div>
      </div>

      <div className="px-3 pb-3">
        <div className="panel-body-tight table-responsive p-0">
          <table className="table dash-table">
            <thead>
              <tr>
                <th>State</th>
                <th>Collection (₹)</th>
                <th>% Share</th>
              </tr>
            </thead>
            <tbody>
              {stateData.length > 0 ? (
                stateData.map((row) => (
                  <tr key={row.state}>
                    <td className="d-flex align-items-center">
                      <span
                        className="state-dot"
                        style={{ backgroundColor: row.color }}
                      ></span>
                      {row.state}
                    </td>
                    <td>{formatCollection(row.collection)}</td>
                    <td>{row.share.toFixed(2)}%</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
                    No data available
                  </td>
                </tr>
              )}
              {stateData.length > 0 && (
                <tr className="fw-bold">
                  <td>Total</td>
                  <td>{formatCollection(totalCollection)}</td>
                  <td>100%</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
