import React from "react";

// Dummy data — replace with API response later
const stateData = [
  { state: "Maharashtra", collection: 120456.75, share: "93.13%", color: "#2f6fed" },
  { state: "Madhya Pradesh", collection: 6682.0, share: "5.17%", color: "#7ea5f3" },
  { state: "Gujarat", collection: 1150.0, share: "0.89%", color: "#c7dafb" },
  { state: "Other States", collection: 1063.0, share: "0.82%", color: "#e3ecfd" },
];

const totalRow = { collection: 129351.75, share: "100%" };

const formatINR = (num) =>
  num.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function CollectionByStateTable() {
  return (
    <div className="panel-card">
      <div className="panel-title">COLLECTION BY STATE</div>
      <div className="panel-body-tight table-responsive" style={{ maxHeight: "350px" }}>
        <table className="table dash-table">
          <thead>
            <tr>
              <th>State</th>
              <th>Collection (₹)</th>
              <th>% Share</th>
            </tr>
          </thead>
          <tbody>
            {stateData.map((row) => (
              <tr key={row.state}>
                <td>
                  <span className="state-dot" style={{ backgroundColor: row.color }}></span>
                  {row.state}
                </td>
                <td>{formatINR(row.collection)}</td>
                <td>{row.share}</td>
              </tr>
            ))}
            <tr className="fw-bold">
              <td>Total</td>
              <td>{formatINR(totalRow.collection)}</td>
              <td>{totalRow.share}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
