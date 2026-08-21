import React from "react";
import { Home, Calendar, RotateCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardHeader() {
  const navigate = useNavigate();
  return (
    <header className="dash-header">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div className="d-flex align-items-center gap-3">
          <Home
            size={26}
            className="text-primary"
            role="button"
            onClick={() => navigate("/")}
          />
          <span className="title">Collection &amp; Transaction Dashboard</span>
        </div>

        <div className="d-flex align-items-center gap-4">
          <div>
            <span className="text-secondary me-1">Report Date :</span>
            <span className="report-date">18-Aug-2026 (T-1)</span>
          </div>
          <div className="d-flex align-items-center gap-1 last-updated">
            <Calendar size={15} />
            <span>Last Updated : 20-Aug-2026 09:30 AM</span>
          </div>
          <RotateCw size={20} className="text-primary" role="button" />
        </div>
      </div>
    </header>
  );
}
