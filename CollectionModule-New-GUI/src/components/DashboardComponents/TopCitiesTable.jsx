import React, { useEffect, useState } from "react";
import { useNotification } from "../../context/NotificationContext";
import { useLoader } from "../../context/LoaderContext";
import apiClient from "../../services/apiClient";

const formatINR = (num) =>
  Number(num).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function TopCitiesTable() {
  const { showError } = useNotification();
  const { setLoader } = useLoader();
  const [cityData, setCityData] = useState([]);

  const fetchData = async () => {
    try {
      setLoader(true);
      const res = await apiClient.get("/collection-dashboard/city-collection");
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
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="panel-card">
      <div className="panel-title">TOP 5 CITIES BY COLLECTION</div>
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
              {cityData.length > 0 ? (
                cityData.map((row) => (
                  <tr key={row.city}>
                    <td>{row.city}</td>
                    <td>{row.customers}</td>
                    <td>{row.transactions}</td>
                    <td>{formatINR(row.collection)}</td>
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
