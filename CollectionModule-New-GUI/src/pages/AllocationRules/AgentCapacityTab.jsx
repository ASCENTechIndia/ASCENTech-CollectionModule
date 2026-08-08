import React, { useState } from "react";

const AgentCapacityTab = () => {
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "In-house early-stage team",
      used: 312,
      total: 400,
      color: "#2b8a3e",
    },
    {
      id: 2,
      name: "High-propensity specialists",
      used: 188,
      total: 200,
      color: "#e8590c",
    },
    {
      id: 3,
      name: "External agency: Meridian",
      used: 640,
      total: 1000,
      color: "#1971c2",
    },
    {
      id: 4,
      name: "External agency: Castlebrook",
      used: 55,
      total: 800,
      color: "#e03131",
    },
  ]);

  return (
    <div className="act-wrap">
      <div className="d-flex flex-column">
        {teams.map((team) => {
          const percent = Math.min(
            100,
            Math.round((team.used / team.total) * 100),
          );
          return (
            <div className="card act-card" key={team.id}>
              <div className="p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="act-team-name">{team.name}</span>
                  <span className="act-team-count">
                    {team.used.toLocaleString()} / {team.total.toLocaleString()}{" "}
                    capacity
                  </span>
                </div>
                <div className="act-progress-track">
                  <div
                    className="act-progress-fill"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: team.color,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}

        <p>The five screens cover the full flow</p>
      </div>
    </div>
  );
};

export default AgentCapacityTab;
