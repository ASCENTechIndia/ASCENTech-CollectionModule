import React from "react";

// Dummy data — replace with API response later
const cityData = [
  { city: "Mumbai", customers: 142, transactions: 155, collection: 48760.0 },
  {
    city: "Chhatrapati Sambhajinagar",
    customers: 78,
    transactions: 92,
    collection: 26540.0,
  },
  { city: "Betul", customers: 34, transactions: 41, collection: 11230.0 },
  { city: "Pune", customers: 31, transactions: 35, collection: 8930.0 },
  { city: "Bhopal", customers: 27, transactions: 28, collection: 7240.0 },
];

const formatINR = (num) =>
  num.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function TopCitiesTable() {
  return (
    <div className="panel-card">
      <div className="panel-title">TOP 5 CITIES BY COLLECTION</div>
      <div className="px-3 pb-3">
        <div
          className="panel-body-tight table-responsive p-0"
          style={{ maxHeight: "350px" }}
        >
          <table className="table dash-table">
            <thead>
              <tr>
                <th>City</th>
                <th>Customers</th>
                <th>Transactions</th>
                <th>Collection (₹)</th>
              </tr>
            </thead>
            <tbody>
              {cityData.map((row) => (
                <tr key={row.city}>
                  <td>{row.city}</td>
                  <td>{row.customers}</td>
                  <td>{row.transactions}</td>
                  <td>{formatINR(row.collection)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
