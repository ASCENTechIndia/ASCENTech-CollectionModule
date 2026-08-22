import React, { useEffect, useState } from "react";
import { useNotification } from "../../context/NotificationContext";
import { useLoader } from "../../context/LoaderContext";
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

export default function TopLCOsTable() {
  const { showError } = useNotification();
  const { setLoader } = useLoader();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      setLoader(true);
      const res = await apiClient.get(
        "/collection-dashboard/top-lco-collection",
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
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="panel-card">
      <div className="panel-title">TOP LCOs BY COLLECTION</div>
      <div className="px-3 pb-3">
        <div className="panel-body-tight table-responsive p-0">
          <table className="table dash-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>LCO Code</th>
                <th>LCO Name</th>
                <th>Transactions</th>
                <th style={{ minWidth: "160px" }}>Collection (₹)</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row) => (
                  <tr key={row.rank}>
                    <td>{medal(row.rank)}</td>
                    <td>{row.code}</td>
                    <td>{row.name}</td>
                    <td>{row.transactions}</td>
                    <td>{formatINR(row.collection)}</td>
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
