import React from "react";

const DashboardTab = () => {
  const stats = [
    { label: "Unallocated cases", value: "4,812" },
    { label: "Allocated today", value: "1,340" },
    { label: "Portfolio value", value: "£8.2m" },
    { label: "Avg recovery rate", value: "31%" },
  ];

  const segments = [
    {
      label: "Early stage (0-30d)",
      count: 1920,
      percent: 100,
      color: "#1971c2",
    },
    {
      label: "Mid stage (30-90d)",
      count: 1540,
      percent: 80,
      color: "#ff922b",
    },
    {
      label: "Late stage (90+)",
      count: 890,
      percent: 46,
      color: "#e64980",
    },
    {
      label: "Legal / pre-charge-off",
      count: 462,
      percent: 24,
      color: "#adb5bd",
    },
  ];

  const recentRuns = [
    { name: "Daily batch #482", status: "Complete", type: "status" },
    { name: "Legal escalation", status: "Complete", type: "status" },
    { name: "Manual reassignment", status: "2h ago", type: "time" },
  ];

  return (
    <div className="dbt-wrap">
      <div className="row g-4 mb-4">
        {stats.map((stat, idx) => (
          <div className="col-lg-3 col-6" key={idx}>
            <div className="dbt-stat">
              <span className="dbt-stat-label">{stat.label}</span>
              <span className="dbt-stat-value">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card dbt-card h-100">
            <div className="card-body">
              <h6 className="dbt-card-title">Allocation by segment</h6>

              <div className="d-flex flex-column gap-3 mt-3">
                {segments.map((seg, idx) => (
                  <div key={idx}>
                    <div className="d-flex justify-content-between mb-1">
                      <span className="dbt-segment-label">{seg.label}</span>
                      <span className="dbt-segment-count">
                        {seg.count.toLocaleString()}
                      </span>
                    </div>
                    <div className="dbt-progress-track">
                      <div
                        className="dbt-progress-fill"
                        style={{
                          width: `${seg.percent}%`,
                          backgroundColor: seg.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card dbt-card h-100">
            <div className="card-body">
              <h6 className="dbt-card-title">Recent runs</h6>

              <div className="d-flex flex-column mt-3">
                {recentRuns.map((run, idx) => (
                  <div className="dbt-run-row" key={idx}>
                    <span className="dbt-run-name">{run.name}</span>
                    {run.type === "status" ? (
                      <span className="dbt-run-status">{run.status}</span>
                    ) : (
                      <span className="dbt-run-time">{run.status}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
