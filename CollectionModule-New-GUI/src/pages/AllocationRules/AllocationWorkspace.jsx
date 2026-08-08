import React, { useState } from "react";
import DashboardTab from "./DashboardTab";
import AllocationRulesTab from "./AllocationRulesTab";
import CaseQueueTab from "./CaseQueueTab";
import AgentCapacityTab from "./AgentCapacityTab";
import RunResultsTab from "./RunResultsTab";

const AllocationWorkspace = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { key: "dashboard", label: "Dashboard" },
    { key: "allocation-rules", label: "Allocation rules" },
    { key: "case-queue", label: "Case queue" },
    { key: "agent-capacity", label: "Agent capacity" },
    { key: "run-results", label: "Run and results" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
      case "allocation-rules":
        return <AllocationRulesTab />;
      case "case-queue":
        return <CaseQueueTab />;
      case "agent-capacity":
        return <AgentCapacityTab />;
      case "run-results":
        return <RunResultsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="main-content">
      <div className="card">
        <div className="card-body">
          <div className="page-allocation-workspace">
            <ul className="nav aw-tabs mb-4">
              {tabs.map((tab) => (
                <li className="nav-item" key={tab.key}>
                  <button
                    className={`nav-link aw-tab-btn ${
                      activeTab === tab.key ? "active" : ""
                    }`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="aw-tab-content">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocationWorkspace;
