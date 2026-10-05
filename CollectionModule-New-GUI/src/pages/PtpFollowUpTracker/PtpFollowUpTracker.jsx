import { useMemo, useState } from "react";
import PtpSummaryCards from "./PtpSummaryCards";
import PtpList from "./PtpList";

/* ------------------------------------------------------------------
   DUMMY DATA – replace with API responses when the APIs are ready.
   Keep the same shapes so the child components need no changes.
------------------------------------------------------------------- */
const DUMMY_SUMMARY = [
  {
    id: "due",
    label: "Due today",
    value: "4",
    subText: "₹308K at stake",
    tone: "default",
  },
  {
    id: "overdue",
    label: "Overdue",
    value: "6",
    subText: "Needs follow-up",
    tone: "danger",
  },
  {
    id: "kept",
    label: "PTP kept rate",
    value: "6%",
    subText: "1 of 18 PTPs",
    tone: "warn",
  },
  {
    id: "risk",
    label: "Amount at risk",
    value: "₹630K",
    subText: "Broken + overdue",
    tone: "critical",
  },
];

// dueStatus: "today" | "overdue" | "upcoming"
const DUMMY_PTPS = [
  {
    id: 1,
    customerName: "Rohit Sharma",
    accountNo: "ACC-4002",
    officer: "Sunita Devi",
    dpd: 95,
    bucket: "D",
    dueStatus: "today",
    dueLabel: "Due today",
    note: "High-value — escalate if no payment by 3pm",
    amount: 115000,
    status: "pending",
    priority: "High",
  },
  {
    id: 2,
    customerName: "Meena Joshi",
    accountNo: "ACC-2034",
    officer: "Priya Singh",
    dpd: 72,
    bucket: "C",
    dueStatus: "today",
    dueLabel: "Due today",
    note: "Part-payment expected",
    amount: 88000,
    status: "pending",
    priority: "High",
  },
  {
    id: 3,
    customerName: "Dinesh Gupta",
    accountNo: "ACC-6017",
    officer: "Kavitha R",
    dpd: 68,
    bucket: "C",
    dueStatus: "today",
    dueLabel: "Due today",
    note: "",
    amount: 63000,
    status: "pending",
    priority: "Med",
  },
  {
    id: 4,
    customerName: "Vikram Seth",
    accountNo: "ACC-1021",
    officer: "Ramesh Kumar",
    dpd: 47,
    bucket: "B",
    dueStatus: "today",
    dueLabel: "Due today",
    note: "Promised after salary credit",
    amount: 42000,
    status: "pending",
    priority: "Med",
  },
  {
    id: 5,
    customerName: "Suresh Pillai",
    accountNo: "ACC-3011",
    officer: "Arjun Nair",
    dpd: 22,
    bucket: "A",
    dueStatus: "today",
    dueLabel: "Due today",
    note: "",
    amount: 25000,
    status: "kept",
    priority: "Low",
  },
  {
    id: 6,
    customerName: "Asha Rani",
    accountNo: "ACC-5009",
    officer: "Mohan Lal",
    dpd: 55,
    bucket: "B",
    dueStatus: "today",
    dueLabel: "Due today",
    note: "2nd broken PTP",
    amount: 18000,
    status: "broken",
    priority: "Med",
  },
  {
    id: 7,
    customerName: "Anil Verma",
    accountNo: "ACC-7781",
    officer: "Mohan Lal",
    dpd: 80,
    bucket: "C",
    dueStatus: "overdue",
    dueLabel: "Overdue 2d",
    note: "Not reachable on phone",
    amount: 54000,
    status: "pending",
    priority: "High",
  },
  {
    id: 8,
    customerName: "Neha Kapoor",
    accountNo: "ACC-8820",
    officer: "Ramesh Kumar",
    dpd: 61,
    bucket: "B",
    dueStatus: "overdue",
    dueLabel: "Overdue 1d",
    note: "",
    amount: 31000,
    status: "pending",
    priority: "Med",
  },
  {
    id: 9,
    customerName: "Sanjay Rao",
    accountNo: "ACC-9034",
    officer: "Arjun Nair",
    dpd: 35,
    bucket: "A",
    dueStatus: "overdue",
    dueLabel: "Overdue 3d",
    note: "Asked for more time",
    amount: 19000,
    status: "broken",
    priority: "Low",
  },
  {
    id: 10,
    customerName: "Farhan Ali",
    accountNo: "ACC-1150",
    officer: "Priya Singh",
    dpd: 28,
    bucket: "A",
    dueStatus: "upcoming",
    dueLabel: "Due 24 May",
    note: "",
    amount: 47000,
    status: "pending",
    priority: "Low",
  },
  {
    id: 11,
    customerName: "Lakshmi Iyer",
    accountNo: "ACC-2299",
    officer: "Kavitha R",
    dpd: 41,
    bucket: "B",
    dueStatus: "upcoming",
    dueLabel: "Due 26 May",
    note: "Will pay via UPI",
    amount: 36000,
    status: "pending",
    priority: "Med",
  },
];

const TABS = [
  { id: "today", label: "Due today", showCount: true },
  { id: "overdue", label: "Overdue", showCount: true },
  { id: "upcoming", label: "Upcoming" },
  { id: "broken", label: "Broken PTPs" },
  { id: "summary", label: "Summary" },
];

const SORT_OPTIONS = [
  { value: "amount", label: "Sort by amount" },
  { value: "dpd", label: "Sort by DPD" },
  { value: "priority", label: "Sort by priority" },
];

const PRIORITY_ORDER = { High: 0, Med: 1, Low: 2 };

const SORTERS = {
  amount: (a, b) => b.amount - a.amount,
  dpd: (a, b) => b.dpd - a.dpd,
  priority: (a, b) =>
    (PRIORITY_ORDER[a.priority] ?? 3) - (PRIORITY_ORDER[b.priority] ?? 3),
};

const PtpFollowUpTracker = () => {
  const [officer, setOfficer] = useState("all");
  const [activeTab, setActiveTab] = useState("today");
  const [sortBy, setSortBy] = useState("amount");
  const [ptps, setPtps] = useState(DUMMY_PTPS);

  const officerOptions = useMemo(
    () => [...new Set(ptps.map((p) => p.officer))].sort(),
    [ptps],
  );

  // Officer filter is applied first so tab badges respect it too
  const officerFiltered = useMemo(
    () => (officer === "all" ? ptps : ptps.filter((p) => p.officer === officer)),
    [ptps, officer],
  );

  const tabCount = (tabId) =>
    officerFiltered.filter(
      (p) => p.dueStatus === tabId && p.status === "pending",
    ).length;

  const visibleItems = useMemo(() => {
    let list = officerFiltered;
    if (activeTab === "broken") {
      list = list.filter((p) => p.status === "broken");
    } else if (activeTab !== "summary") {
      list = list.filter((p) => p.dueStatus === activeTab);
    }
    return [...list].sort(SORTERS[sortBy]);
  }, [officerFiltered, activeTab, sortBy]);

  // Local updates for now – replace with API calls (then refetch/update state)
  const updateStatus = (id, status) =>
    setPtps((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));

  const handleMarkKept = (id) => updateStatus(id, "kept");
  const handleMarkBroken = (id) => updateStatus(id, "broken");
  const handleEscalate = (id) => {
    console.log("Escalate PTP:", id); // TODO: hook up escalate API
  };

  return (
    <div className="main-content">
      <div className="page-ptp-tracker">
        {/* Header */}
        <div className="ptp-header">
          <div className="ptp-header-text">
            <h1 className="ptp-title">PTP follow-up tracker</h1>
            <p className="ptp-subtitle">As of 22 May 2026 · North zone</p>
          </div>

          <select
            className="ptp-select"
            value={officer}
            onChange={(e) => setOfficer(e.target.value)}
            aria-label="Filter by officer"
          >
            <option value="all">All officers</option>
            {officerOptions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Tabs */}
        <div className="ptp-tabs" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`ptp-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {tab.showCount && (
                <span className="ptp-tab-count">{tabCount(tab.id)}</span>
              )}
            </button>
          ))}
        </div>

        <PtpSummaryCards cards={DUMMY_SUMMARY} />

        {activeTab === "summary" ? (
          <div className="ptp-card ptp-empty">Summary view is coming soon.</div>
        ) : (
          <>
            <select
              className="ptp-select ptp-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort PTPs"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            <PtpList
              items={visibleItems}
              onMarkKept={handleMarkKept}
              onMarkBroken={handleMarkBroken}
              onEscalate={handleEscalate}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PtpFollowUpTracker;
