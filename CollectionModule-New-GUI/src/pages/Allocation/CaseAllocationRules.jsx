import React, { useState } from "react";
import {
  Plus,
  Upload,
  CheckCircle2,
  FileText,
  AlertCircle,
  Clock,
  GripVertical,
  Edit,
  Copy,
  Trash2,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CaseAllocationRules = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [rules, setRules] = useState([
    {
      id: 1,
      priority: 1,
      name: "High-Value NPA",
      subtitle: "Bucket 90+ DPD",
      conditions: ["Amount > ₹5L", "DPD > 90"],
      allocateTo: "Senior Recovery",
      allocateColor: "blue",
      strategy: "Best Skill",
      cases: 342,
      active: true,
      tags: ["active", "high-value"],
    },
    {
      id: 2,
      priority: 2,
      name: "Legal Escalation",
      subtitle: "Litigation eligible",
      conditions: ["DPD > 180", "Legal notice sent"],
      allocateTo: "Legal & Litigation",
      allocateColor: "purple",
      strategy: "Least Loaded",
      cases: 87,
      active: true,
      tags: ["active"],
    },
    {
      id: 3,
      priority: 3,
      name: "Field Visit – Metro",
      subtitle: "Tier-1 cities",
      conditions: ["City in Metro", "Amount > ₹1L"],
      allocateTo: "Field Collection",
      allocateColor: "orange",
      strategy: "Round Robin",
      cases: 1204,
      active: true,
      tags: ["active", "round-robin"],
    },
    {
      id: 4,
      priority: 4,
      name: "Early Bucket Tele",
      subtitle: "0–30 DPD soft",
      conditions: ["DPD ≤ 30"],
      allocateTo: "Tele-calling A",
      allocateColor: "green",
      strategy: "Round Robin",
      cases: 5410,
      active: true,
      tags: ["active", "round-robin"],
    },
    {
      id: 5,
      priority: 5,
      name: "Agency Outsource",
      subtitle: "Written-off pool",
      conditions: ["DPD > 365"],
      allocateTo: "External – Alpha",
      allocateColor: "slate",
      strategy: "Weighted",
      cases: 912,
      active: false,
      tags: ["paused"],
    },
  ]);

  const filters = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "paused", label: "Paused" },
    { key: "round-robin", label: "Round-Robin" },
    { key: "high-value", label: "High Value" },
  ];

  const filteredRules =
    activeFilter === "all"
      ? rules
      : rules.filter((r) => r.tags.includes(activeFilter));

  const toggleActive = (id) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r)),
    );
  };

  return (
    <div className="main-content">
      <div className="page-case-allocation">
        <div className="page-header users-page-header">
          <div>
            <h1 className="page-title">Case Allocation Rules</h1>
            <p className="page-subtitle m-0 text-muted mb-3">
              Rules run top to bottom. The first matching rule assigns the case.
            </p>
          </div>
          <div className="page-header-actions mb-lg-0 mb-3">
            <button className="btn btn-outline-secondary btn-sm">
              <Upload className="inline mr-2" size={16} /> Import
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate("/allocation/add-allocation-rules")}
            >
              <Plus className="inline mr-2" size={16} /> New Rule
            </button>
          </div>
        </div>

        <div className="row g-4 mb-3">
          <div className="col-lg-3 col-md-6">
            <div className="card widget-stat-progress">
              <div className="card-body d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="widget-stat-icon primary">
                    <CheckCircle2 size={18} />
                  </div>
                  <div className="widget-stat-content ms-3">
                    <span className="widget-stat-label">Active Rules</span>
                    <span className="widget-stat-value">14</span>
                    <span className="widget-stat-sub text-success">
                      +3 this month
                    </span>
                  </div>
                </div>
                <div className="widget-stat-bar primary" />
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card widget-stat-progress">
              <div className="card-body d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="widget-stat-icon warning">
                    <FileText size={18} />
                  </div>
                  <div className="widget-stat-content ms-3">
                    <span className="widget-stat-label">Cases Allocated</span>
                    <span className="widget-stat-value">8,247</span>
                    <span className="widget-stat-sub text-muted">
                      Last 30 days
                    </span>
                  </div>
                </div>
                <div className="widget-stat-bar warning" />
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card widget-stat-progress">
              <div className="card-body d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="widget-stat-icon danger">
                    <AlertCircle size={18} />
                  </div>
                  <div className="widget-stat-content ms-3">
                    <span className="widget-stat-label">Unallocated</span>
                    <span className="widget-stat-value text-danger">126</span>
                    <span className="widget-stat-sub text-danger">
                      Needs attention
                    </span>
                  </div>
                </div>
                <div className="widget-stat-bar danger" />
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card widget-stat-progress">
              <div className="card-body d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="widget-stat-icon success">
                    <Clock size={18} />
                  </div>
                  <div className="widget-stat-content ms-3">
                    <span className="widget-stat-label">Avg Match Time</span>
                    <span className="widget-stat-value">0.4s</span>
                    <span className="widget-stat-sub text-success">
                      Real-time engine
                    </span>
                  </div>
                </div>
                <div className="widget-stat-bar success" />
              </div>
            </div>
          </div>
        </div>

        <div className="card users-list-card">
          <div className="users-toolbar">
            <div className="d-flex align-items-center flex-wrap gap-2 p-2">
              <span className="fw-semibold text-muted me-1">Filter:</span>
              {filters.map((f) => (
                <button
                  key={f.key}
                  className={`car-filter-pill ${
                    activeFilter === f.key ? "active" : ""
                  }`}
                  onClick={() => setActiveFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="table-responsive users-table-wrap">
            <table className="table table-hover align-middle mb-0 car-table">
              <thead>
                <tr>
                  <th>Priority</th>
                  <th>Rule Name</th>
                  <th>Conditions</th>
                  <th>Allocate To</th>
                  <th>Strategy</th>
                  <th>Cases</th>
                  <th>Status</th>
                  <th className="users-th-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRules.map((rule) => (
                  <tr key={rule.id}>
                    <td>
                      <span className="car-priority-badge">
                        {rule.priority}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="fw-semibold">{rule.name}</span>
                        <span className="text-muted small">
                          {rule.subtitle}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-wrap gap-1">
                        {rule.conditions.map((c, idx) => (
                          <span key={idx} className="car-condition-badge">
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`car-allocate-badge car-allocate-${rule.allocateColor}`}
                      >
                        {rule.allocateTo}
                      </span>
                    </td>
                    <td className="text-muted">{rule.strategy}</td>
                    <td className="fw-semibold">
                      {rule.cases.toLocaleString()}
                    </td>
                    <td>
                      <label className="car-switch">
                        <input
                          type="checkbox"
                          checked={rule.active}
                          onChange={() => toggleActive(rule.id)}
                        />
                        <span className="car-switch-slider" />
                      </label>
                    </td>
                    <td>
                      <div className="users-actions">
                        <button className="users-action-btn" title="Edit">
                          <Edit size={16} />
                        </button>
                        <button className="users-action-btn" title="Duplicate">
                          <Copy size={16} />
                        </button>
                        <button
                          className="users-action-btn"
                          title="Delete"
                          style={{ color: "#dc3545" }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="car-fallback-footer">
            <Zap size={14} className="me-2" />
            Default fallback — any unmatched case is sent to the{" "}
            <a href="#!" className="car-fallback-link">
              General Recovery Pool
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseAllocationRules;
