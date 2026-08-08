import React, { useState } from "react";
import { Search } from "lucide-react";

const segmentOptions = [
  { label: "All Segments", value: "all" },
  { label: "Early stage", value: "early" },
  { label: "Mid stage", value: "mid" },
  { label: "Late stage", value: "late" },
];

const CaseQueueTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [segment, setSegment] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);

  const [cases] = useState([
    {
      id: "AC-88213",
      balance: "£1,240",
      daysPastDue: 18,
      score: 0.71,
      route: "In-house early",
      routeColor: "green",
    },
    {
      id: "AC-88214",
      balance: "£3,890",
      daysPastDue: 54,
      score: 0.64,
      route: "High-propensity",
      routeColor: "red",
    },
    {
      id: "AC-88215",
      balance: "£720",
      daysPastDue: 112,
      score: 0.22,
      route: "External agency",
      routeColor: "gray",
    },
    {
      id: "AC-88216",
      balance: "£2,105",
      daysPastDue: 7,
      score: 0.83,
      route: "In-house early",
      routeColor: "green",
    },
  ]);

  const totalCount = 4;

  const filteredCases = cases.filter((c) =>
    c.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredCases.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredCases.map((c) => c.id));
    }
  };

  return (
    <div className="cqt-wrap">
      <div className="d-flex flex-wrap gap-2 mb-3">
        <div className="cqt-search flex-grow-1">
          <Search className="inline search-icon" size={16} />
          <input
            type="text"
            placeholder="Search by account ID or debtor name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="form-select cqt-segment-select"
          value={segment}
          onChange={(e) => setSegment(e.target.value)}
        >
          {segmentOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="table-responsive">
        <table className="table align-middle mb-0 cqt-table">
          <thead>
            <tr>
              <th style={{ width: 36 }}>
                <input
                  type="checkbox"
                  checked={
                    filteredCases.length > 0 &&
                    selectedIds.length === filteredCases.length
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              <th>Account</th>
              <th>Balance</th>
              <th>Days past due</th>
              <th>Score</th>
              <th>Suggested route</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map((c) => (
              <tr key={c.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(c.id)}
                    onChange={() => toggleSelect(c.id)}
                  />
                </td>
                <td className="fw-semibold">{c.id}</td>
                <td>{c.balance}</td>
                <td>{c.daysPastDue}</td>
                <td>{c.score.toFixed(2)}</td>
                <td>
                  <span className={`cqt-route-badge cqt-route-${c.routeColor}`}>
                    {c.route}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <span className="cqt-showing text-muted">
          Showing {filteredCases.length} of {totalCount.toLocaleString()}
        </span>
        <button
          className="btn btn-primary btn-sm"
          disabled={selectedIds.length === 0}
        >
          Allocate selected
          {selectedIds.length > 0 ? ` (${selectedIds.length})` : ""}
        </button>
      </div>
    </div>
  );
};

export default CaseQueueTab;
