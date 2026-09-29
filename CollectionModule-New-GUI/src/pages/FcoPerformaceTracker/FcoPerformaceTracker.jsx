import { useState } from "react";
import SummaryCards from "./SummaryCards";
import ActivityBreakdown from "./ActivityBreakdown";
import TodayVisitOutcomes from "./TodayVisitOutcomes";

const ZONE_OPTIONS = [
  { label: "North zone", value: "north" },
  { label: "South zone", value: "south" },
  { label: "East zone", value: "east" },
  { label: "West zone", value: "west" },
];

const TABS = [
  { id: "daily", label: "Daily ops" },
  { id: "monthly", label: "Monthly review" },
  { id: "leaderboard", label: "Leaderboard" },
  { id: "model", label: "Data model" },
];

const DUMMY_SUMMARY = [
  {
    id: "visits",
    label: "Visits today",
    value: "148",
    subText: "Target: 180",
    trend: "82% of target",
    trendTone: "warn",
  },
  {
    id: "contacts",
    label: "Contacts made",
    value: "112",
    subText: "76% contact rate",
    trend: "vs 71% yesterday",
    trendTone: "up",
  },
  {
    id: "ptps",
    label: "PTPs captured",
    value: "64",
    subText: "57% of contacts",
    trend: "vs 52% yesterday",
    trendTone: "up",
  },
  {
    id: "amount",
    label: "Amount collected",
    value: "₹18L",
    subText: "Target: ₹24L",
    trend: "75% of target",
    trendTone: "warn",
  },
];

const DUMMY_OFFICERS = [
  { id: 1, name: "Ramesh Kumar", visitsDone: 18, visitTarget: 20, ptps: 9 },
  { id: 2, name: "Priya Singh", visitsDone: 22, visitTarget: 20, ptps: 13 },
  { id: 3, name: "Arjun Nair", visitsDone: 15, visitTarget: 20, ptps: 6 },
  { id: 4, name: "Sunita Devi", visitsDone: 19, visitTarget: 20, ptps: 10 },
  { id: 5, name: "Mohan Lal", visitsDone: 12, visitTarget: 20, ptps: 4 },
  { id: 6, name: "Kavitha R", visitsDone: 20, visitTarget: 20, ptps: 11 },
];

const DUMMY_OUTCOMES = [
  { id: "contact", label: "Contact made", percent: 76, color: "teal" },
  { id: "locked", label: "Door locked", percent: 14, color: "grey" },
  { id: "skip", label: "Skip / untraceable", percent: 10, color: "red" },
  { id: "ptp", label: "PTP captured", percent: 57, color: "blue" },
  { id: "paid", label: "Paid on visit", percent: 18, color: "green" },
];

const FcoPerformanceTracker = () => {
  const [zone, setZone] = useState("north");
  const [activeTab, setActiveTab] = useState("daily");

  const zoneLabel = ZONE_OPTIONS.find((z) => z.value === zone)?.label ?? "";

  const summary = DUMMY_SUMMARY;
  const officers = DUMMY_OFFICERS;
  const outcomes = DUMMY_OUTCOMES;

  return (
    <div className="main-content">
      <div className="page-fco-tracker">
        {/* Header */}
        <div className="fpt-header">
          <div className="fpt-header-text">
            <h1 className="fpt-title">FCO performance tracker</h1>
            <p className="fpt-subtitle">
              May 2026 · {zoneLabel} · {officers.length * 2} officers
            </p>
          </div>

          <select
            className="fpt-select"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            aria-label="Select zone"
          >
            {ZONE_OPTIONS.map((z) => (
              <option key={z.value} value={z.value}>
                {z.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tabs */}
        <div className="fpt-tabs" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`fpt-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "daily" ? (
          <>
            <SummaryCards cards={summary} />
            <ActivityBreakdown officers={officers} />
            <TodayVisitOutcomes outcomes={outcomes} />
          </>
        ) : (
          <div className="fpt-card fpt-empty">
            {TABS.find((t) => t.id === activeTab)?.label} view is coming soon.
          </div>
        )}
      </div>
    </div>
  );
};

export default FcoPerformanceTracker;
