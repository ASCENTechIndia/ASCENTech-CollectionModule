import React, { useState, useEffect } from "react";
import { Home, RotateCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Format date as DD-MM-YYYY
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export default function DashboardHeader({
  handleToggle,
  showInLacs,
  onDateRangeChange,
}) {
  const navigate = useNavigate();

  const getMonthName = (monthIndex) => {
    const date = new Date(2000, monthIndex, 1);
    return date.toLocaleString("en-US", { month: "short" });
  };

  // Generate dropdown: Apr-YYYY to Mar-YYYY+1
  const currentYear = new Date().getFullYear();
  const startMonth = 3; // April
  const endMonth = 2;   // March
  const options = [];
  for (let m = startMonth; m <= 11; m++) {
    options.push({ year: currentYear, month: m });
  }
  for (let m = 0; m <= endMonth; m++) {
    options.push({ year: currentYear + 1, month: m });
  }

  const optionItems = options.map(({ year, month }) => ({
    label: `${getMonthName(month)}-${year}`,
    value: `${year}-${month}`,
  }));

  // Default to current month
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYearNow = now.getFullYear();
  const defaultKey =
    optionItems.find((opt) => {
      const [y, m] = opt.value.split("-").map(Number);
      return y === currentYearNow && m === currentMonth;
    })?.value || optionItems[0].value;

  const [selectedValue, setSelectedValue] = useState(defaultKey);

  // Compute date range: from = first day of selected month, to = today (always)
  const computeDateRange = (year, month) => {
    const from = new Date(year, month, 1);
    const to = new Date(); // today's date
    return { from, to };
  };

  const handleMonthChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    const [year, month] = value.split("-").map(Number);
    const { from, to } = computeDateRange(year, month);
    if (onDateRangeChange) {
      onDateRangeChange(formatDate(from), formatDate(to));
    }
  };

  // On mount, send default range
  useEffect(() => {
    const [year, month] = defaultKey.split("-").map(Number);
    const { from, to } = computeDateRange(year, month);
    if (onDateRangeChange) {
      onDateRangeChange(formatDate(from), formatDate(to));
    }
  }, []);

  const selectedLabel = optionItems.find((opt) => opt.value === selectedValue)?.label || "";

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

        <div>
          <select
            className="form-select form-select-sm"
            value={selectedValue}
            onChange={handleMonthChange}
            style={{ width: "140px" }}
          >
            {optionItems.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
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
            <span className="report-date">{selectedLabel}</span>
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