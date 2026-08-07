import React, { useState } from "react";
import {
  Search,
  Bell,
  List,
  CheckCircle2,
  Clock,
  Percent,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AllocationRulePage = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusDropdown, setStatusDropdown] = useState([
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "draft", label: "Draft" },
    { value: "paused", label: "Paused" },
  ]);
  const [priorityDropdown, setPriorityDropdown] = useState([
    { value: "all", label: "All Priority" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ]);

  const [rules] = useState([
    {
      id: 1,
      name: "High-Value Delinquent Accounts - West Region",
      status: "Active",
      priority: "High Priority",
      conditions: [
        { label: "Debt Amount", value: "> $10,000" },
        { label: "Age", value: "90–180 days" },
        { label: "Account Type", value: "Credit Card" },
        { label: "Region", value: "West" },
        { label: "Collector Success Rate", value: "> 85%" },
      ],
      assignedTo: "Senior Collector Team A",
    },
    {
      id: 2,
      name: "Early-Stage Consumer Loans - Midwest",
      status: "Active",
      priority: "Medium Priority",
      conditions: [
        { label: "Debt Amount", value: "$1,000 - $5,000" },
        { label: "Age", value: "0–30 days" },
        { label: "Account Type", value: "Personal Loan" },
        { label: "Region", value: "Midwest" },
      ],
      assignedTo: "Junior Collector Team B",
    },
    {
      id: 3,
      name: "Legacy Written-Off Accounts",
      status: "Pending Review",
      priority: "Low Priority",
      conditions: [
        { label: "Debt Amount", value: "Any" },
        { label: "Age", value: "> 365 days" },
        { label: "Account Type", value: "All" },
      ],
      assignedTo: "External Agency - Alpha",
    },
  ]);

  const filteredRules = rules.filter((rule) => {
    const matchesSearch = rule.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      rule.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesPriority =
      priorityFilter === "all" ||
      rule.priority.toLowerCase().includes(priorityFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const statusPillClass = (status) => {
    if (status === "Active") return "arp-status-pill arp-status-active";
    if (status === "Pending Review")
      return "arp-status-pill arp-status-pending";

    return "arp-status-pill";
  };

  const priorityTextClass = (priority) => {
    if (priority.includes("High")) return "arp-priority arp-priority-high";
    if (priority.includes("Medium")) return "arp-priority arp-priority-medium";
    return "arp-priority arp-priority-low";
  };

  return (
    <div className="main-content">
      <div className="page-allocation-rules">
        <div className="page-header users-page-header mb-2">
          <div>
            <h1 className="page-title m-0">Allocation Rules</h1>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="arp-header-search">
              <Search className="inline search-icon" size={16} />
              <input type="text" placeholder="Search rules..." />
            </div>
          </div>
        </div>

        {/* Summary cards */}
        <div className="row g-4 mb-3">
          <div className="col-lg-6 col-md-6">
            <div className="card widget-stat-progress">
              <div className="card-body d-flex justify-content-between">
                <div className="widget-stat-content">
                  <span className="widget-stat-label">Total Rules</span>
                  <span className="widget-stat-value">24</span>
                  <span className="widget-stat-sub text-success">
                    ↑ 12% from last month
                  </span>
                </div>
                <div className="widget-stat-icon primary">
                  <List size={18} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="card widget-stat-progress">
              <div className="card-body d-flex justify-content-between">
                <div className="widget-stat-content">
                  <span className="widget-stat-label">Active Rules</span>
                  <span className="widget-stat-value">18</span>
                  <span className="widget-stat-sub text-muted">
                    75% of total rules
                  </span>
                </div>
                <div className="widget-stat-icon success">
                  <CheckCircle2 size={18} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="card widget-stat-progress">
              <div className="card-body d-flex justify-content-between">
                <div className="widget-stat-content">
                  <span className="widget-stat-label">Pending Review</span>
                  <span className="widget-stat-value">3</span>
                  <span className="widget-stat-sub text-warning">
                    Requires approval
                  </span>
                </div>
                <div className="widget-stat-icon warning">
                  <Clock size={18} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="card widget-stat-progress">
              <div className="card-body d-flex justify-content-between">
                <div className="widget-stat-content">
                  <span className="widget-stat-label">Avg Compliance</span>
                  <span className="widget-stat-value">92%</span>
                  <span className="widget-stat-sub text-success">
                    ↑ 3% improvement
                  </span>
                </div>
                <div className="widget-stat-icon slate">
                  <Percent size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
          <button
            className="btn btn-primary btn-sm arp-add-btn"
            onClick={() => navigate("/allocation/add-allocation-rules")}
          >
            <Plus className="inline mr-2" size={16} /> Add New Rule
          </button>

          <select
            className="form-select arp-filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusDropdown.map((item) => (
              <option value={item.value} key={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <select
            className="form-select arp-filter-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            {priorityDropdown.map((item) => (
              <option value={item.value} key={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex flex-column gap-3">
          {filteredRules.length === 0 ? (
            <div className="card">
              <div className="card-body text-center text-muted py-4">
                No rules match your filters.
              </div>
            </div>
          ) : (
            filteredRules.map((rule) => (
              <div className="card arp-rule-card m-0" key={rule.id}>
                <div className="card-body">
                  <div className="d-flex align-items-center flex-wrap gap-2 mb-2">
                    <span className="arp-rule-name">{rule.name}</span>
                    <span className={statusPillClass(rule.status)}>
                      {rule.status}
                    </span>
                    <span className={priorityTextClass(rule.priority)}>
                      {rule.priority}
                    </span>
                  </div>

                  <div className="d-flex flex-wrap gap-4 mb-2">
                    {rule.conditions.map((cond, idx) => (
                      <div className="arp-condition" key={idx}>
                        <span className="arp-condition-label">
                          {cond.label}:
                        </span>{" "}
                        <span className="arp-condition-value">
                          {cond.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="arp-assigned">
                    Assigned to: <strong>{rule.assignedTo}</strong>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllocationRulePage;
