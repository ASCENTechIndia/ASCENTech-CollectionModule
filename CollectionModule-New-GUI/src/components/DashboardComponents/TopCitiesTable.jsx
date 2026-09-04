import React, { useEffect, useState } from "react";
import { useNotification } from "../../context/NotificationContext";
import apiClient from "../../services/apiClient";

const formatINR = (num) =>
  Number(num).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function TopCitiesTable({ showInLacs, fromDate, toDate }) {
  const { showError } = useNotification();
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!fromDate || !toDate) return;
    setLoading(true);
    try {
      const res = await apiClient.get(
        `/collection-dashboard/city-collection?fromDate=${fromDate}&toDate=${toDate}`,
      );
      if (res?.success && res?.data?.cityCollections?.length > 0) {
        const items = res.data.cityCollections;
        const mapped = items.map((item) => ({
          city: item.cityName,
          customers: item.totalCustomers,
          transactions: item.totalTransactions,
          collection: item.totalCollection,
        }));
        setCityData(mapped);
      } else {
        setCityData([]);
      }
    } catch (error) {
      console.error(error);
      showError(error.message || "Failed to fetch city collection data");
      setCityData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fromDate && toDate) {
      fetchData();
    }
  }, [fromDate, toDate]);

  const formatCollection = (amount) => {
    if (showInLacs) {
      const lakhs = amount / 100000;
      return lakhs.toFixed(2) + " L";
    }
    return formatINR(amount);
  };

  return (
    <div className="panel-card">
      <div className="panel-title">
        <span>TOP CITIES BY COLLECTION</span>
      </div>
      <div className="px-3 pb-3">
        <div className="panel-body-tight table-responsive p-0">
          <table className="table dash-table">
            <thead>
              <tr>
                <th>City</th>
                <th>Customers</th>
                <th>Trans</th>
                <th>Collection (₹)</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center"
                    style={{ height: "200px" }}
                  >
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : cityData.length > 0 ? (
                cityData.map((row) => (
                  <tr key={row.city}>
                    <td>{row.city}</td>
                    <td>{row.customers}</td>
                    <td>{row.transactions}</td>
                    <td style={{ textAlign: "right" }}>
                      {formatCollection(row.collection)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
