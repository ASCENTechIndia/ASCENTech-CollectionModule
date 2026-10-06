import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import { useLoader } from "../../context/LoaderContext";
import SummaryCards from "./SummaryCards";
import ActivityBreakdown from "./ActivityBreakdown";
import TodayVisitOutcomes from "./TodayVisitOutcomes";

// Dropdown
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

const OUTCOME_COLORS = ["teal", "blue", "green", "grey", "red"];

const formatNumber = (value) =>
  value === null || value === undefined
    ? ""
    : Number(value).toLocaleString("en-IN");

const formatAmount = (value) =>
  value === null || value === undefined
    ? ""
    : `₹${Number(value).toLocaleString("en-IN")}`;

const mapSummaryCards = (row = {}) => [
  { id: "visits", label: "Visits (MTD)", value: formatNumber(row.VISITS_MTD) },
  {
    id: "contacts",
    label: "Contacts made",
    value: formatNumber(row.CONTACTS_MADE),
  },
  {
    id: "ptps",
    label: "PTPs captured",
    value: formatNumber(row.PTP_CAPTURED),
  },
  {
    id: "amount",
    label: "Amount collected",
    value: formatAmount(row.AMOUNT_COLLECTED),
  },
];

// activityBreakdown
const mapOfficers = (rows = []) =>
  rows.map((r) => ({
    id: r.VAR_BANKDATA_USERID,
    name: r.OFFICER_NAME,
    visits: r.VISITS,
    contracts: r.TOTAL_CONTRACTS,
    ptpCount: r.PTP_CNT_COUNT,
    percent: Number(r.PERCENTAGE) || 0,
  }));

// feedbackPerformance
const mapOutcomes = (rows = []) =>
  rows.map((r, i) => ({
    id: r.NUM_VISITSTATUS_ID,
    label: r.FEEDBACK_TEXT,
    percent: Number(r.PERCENTAGE) || 0,
    color: OUTCOME_COLORS[i % OUTCOME_COLORS.length],
  }));

const FcoPerformanceTracker = () => {
  const { setLoader } = useLoader();
  const [zone, setZone] = useState("north");
  const [activeTab, setActiveTab] = useState("daily");

  const [summaryCards, setSummaryCards] = useState(mapSummaryCards());
  const [officers, setOfficers] = useState([]);
  const [outcomes, setOutcomes] = useState([]);
  const [error, setError] = useState("");

  const zoneLabel = ZONE_OPTIONS.find((z) => z.value === zone)?.label ?? "";
  const monthLabel = new Date().toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const fetchPerformanceTracker = async () => {
      try {
        setLoader(true);
        setError("");
        const res = await apiClient.get(
          "/tracker-dashboard/getPerformaceTracker",
        );

        if (res?.success && res?.data) {
          const { summaryCards, activityBreakdown, feedbackPerformance } =
            res.data;
          setSummaryCards(mapSummaryCards(summaryCards?.[0]));
          setOfficers(mapOfficers(activityBreakdown));
          setOutcomes(mapOutcomes(feedbackPerformance));
        } else {
          setSummaryCards(mapSummaryCards({}));
          setOfficers(mapOfficers([]));
          setOutcomes(mapOutcomes([]));
          setError("No performance data available.");
        }
      } catch (err) {
        setSummaryCards(mapSummaryCards({}));
        setOfficers(mapOfficers([]));
        setOutcomes(mapOutcomes([]));
        console.error("Error fetching performance tracker:", err);
        setError("Unable to load performance data. Please try again.");
      } finally {
        setLoader(false);
      }
    };

    fetchPerformanceTracker();
  }, []);

  return (
    <div className="main-content">
      <div className="page-fco-tracker">
        {/* Header */}
        <div className="fpt-header">
          <div className="fpt-header-text">
            <h1 className="fpt-title">FCO performance tracker</h1>
            <p className="fpt-subtitle">
              {monthLabel} · {zoneLabel} · {officers.length} officers
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

        {error && <p className="fpt-empty">{error}</p>}

        {/* Tab content */}
        {activeTab === "daily" ? (
          <>
            <SummaryCards cards={summaryCards} />
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
