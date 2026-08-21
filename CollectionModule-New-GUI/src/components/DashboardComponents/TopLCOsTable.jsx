import React from "react";

// Dummy data — replace with API response later
const lcoData = [
  { rank: 1, code: "1433954358", name: "LCO 1433954358", transactions: 185, collection: 56872.0 },
  { rank: 2, code: "1397741674", name: "LCO 1397741674", transactions: 45, collection: 13420.0 },
  { rank: 3, code: "1424726425", name: "LCO 1424726425", transactions: 42, collection: 12180.0 },
  { rank: 4, code: "1376919145", name: "LCO 1376919145", transactions: 35, collection: 9860.0 },
  { rank: 5, code: "1356822512", name: "LCO 1356822512", transactions: 16, collection: 5210.0 },
];

const maxCollection = Math.max(...lcoData.map((d) => d.collection));

const medal = (rank) => {
  if (rank === 1) return <span className="rank-medal">🥇</span>;
  if (rank === 2) return <span className="rank-medal">🥈</span>;
  if (rank === 3) return <span className="rank-medal">🥉</span>;
  return <span className="fw-semibold">{rank}</span>;
};

const formatINR = (num) =>
  num.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function TopLCOsTable() {
  return (
    <div className="panel-card">
      <div className="panel-title">TOP 5 LCOs BY COLLECTION</div>
      <div className="panel-body-tight table-responsive" style={{maxHeight: "350px"}}>
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
            {lcoData.map((row) => (
              <tr key={row.code}>
                <td>{medal(row.rank)}</td>
                <td>{row.code}</td>
                <td>{row.name}</td>
                <td>{row.transactions}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <div className="mini-bar-track" style={{ maxWidth: "90px" }}>
                      <div
                        className="mini-bar-fill"
                        style={{
                          width: `${(row.collection / maxCollection) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span>{formatINR(row.collection)}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
