import React, { useEffect, useState } from "react";
import { useNotification } from "../../context/NotificationContext";
import apiClient from "../../services/apiClient";

const medal = (rank) => {
  if (rank === 1) return <span className="rank-medal">🥇</span>;
  if (rank === 2) return <span className="rank-medal">🥈</span>;
  if (rank === 3) return <span className="rank-medal">🥉</span>;
  return <span className="fw-semibold">{rank}</span>;
};

const formatINR = (num) =>
  Number(num).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function TopLCOsTable({ showInLacs, fromDate, toDate }) {
  const { showError } = useNotification();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!fromDate || !toDate) return;
    setLoading(true);
    try {
      const res = await apiClient.get(
        `/collection-dashboard/top-lco-collection?fromDate=${fromDate}&toDate=${toDate}`,
      );
      if (res?.success && res?.data?.topLcos?.length > 0) {
        const mapped = res.data.topLcos.map((item) => ({
          rank: item.rankNo,
          code: item.lcoCode,
          name: item.lcoName,
          transactions: item.totalTransactions,
          collection: item.totalCollection,
        }));
        setData(mapped);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error(error);
      showError(error.message || "Failed to fetch top LCOs");
      setData([]);
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
        <span>TOP 5 Agencies BY COLLECTION</span>
      </div>
      <div className="px-3 pb-3">
        <div className="panel-body-tight table-responsive p-0">
          <table className="table dash-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>LCO Code</th>
                <th>LCO Name</th>
                <th>Trans</th>
                <th>Collection(₹)</th>
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
              ) : data.length > 0 ? (
                data.map((row) => (
                  <tr key={row.rank}>
                    <td>{medal(row.rank)}</td>
                    <td>{row.code}</td>
                    <td>{row.name}</td>
                    <td>{row.transactions}</td>
                    <td style={{ textAlign: "right" }}>
                      {formatCollection(row.collection)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
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
