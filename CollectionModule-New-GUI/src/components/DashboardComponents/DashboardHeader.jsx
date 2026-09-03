import React from "react";
import { Home, RotateCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardHeader({ handleToggle, showInLacs }) {
  const navigate = useNavigate();

  const currentDate = new Date();

  const currentMonth = currentDate.toLocaleDateString("en-US", {
    month: "long",
  });

  const currentYear = currentDate.getFullYear();

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
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="lacsToggle"
              checked={showInLacs}
              onChange={handleToggle}
            />
            <label
              className="form-check-label"
              htmlFor="lacsToggle"
              style={{ width: "50px" }}
            >
              {showInLacs ? "Lakhs" : "Rupees"}
            </label>
          </div>
          <div>
            <span className="text-secondary me-1">Report Month :</span>

            <span className="report-date">
              {currentMonth} {currentYear}
            </span>
          </div>

          <RotateCw
            size={20}
            className="text-primary"
            role="button"
            style={{ cursor: "pointer" }}
            onClick={() => window.location.reload()}
          />
        </div>
      </div>
    </header>
  );
}
