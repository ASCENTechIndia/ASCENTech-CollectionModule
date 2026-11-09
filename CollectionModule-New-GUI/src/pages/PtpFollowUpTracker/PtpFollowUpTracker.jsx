

import { useCallback, useEffect, useMemo, useState } from "react";

import PtpSummaryCards from "./PtpSummaryCards";

import PtpList from "./PtpList";

import apiClient from "../../services/apiClient";

import { useLoader } from "../../context/LoaderContext";



const SUMMARY_CARDS = [

  {

    id: "due",

    label: "Due today",

    value: "0",

    subText: "PTPs scheduled for today",

    tone: "default",

  },

  {

    id: "overdue",

    label: "Overdue",

    value: "0",

    subText: "Needs follow-up",

    tone: "danger",

  },

  {

    id: "kept",

    label: "PTP kept rate",

    value: "0%",

    subText: "0 of 0 PTPs",

    tone: "warn",

  },

  {

    id: "risk",

    label: "Amount at risk",

    value: "₹0",

    subText: "Broken + overdue",

    tone: "critical",

  },

];



const TABS = [

  { id: "today", label: "Due today", showCount: true },

  { id: "overdue", label: "Overdue", showCount: true },

  { id: "upcoming", label: "Upcoming", showCount: true },

  { id: "broken", label: "Broken PTPs", showCount: true },

  { id: "summary", label: "Summary" , showCount: false}

];



const SORT_OPTIONS = [
  { value: "dpd-asc", label: "Day Passed (Ascending)" },
  { value: "dpd-desc", label: "Day Passed (Descending)" },
  { value: "amount-asc", label: "EMI Amount (Ascending)" },
  { value: "amount-desc", label: "EMI Amount (Descending)" },
];

const SORTERS = {
  "dpd-asc": (a, b) => a.dpd - b.dpd,
  "dpd-desc": (a, b) => b.dpd - a.dpd,
  "amount-asc": (a, b) => a.amount - b.amount,
  "amount-desc": (a, b) => b.amount - a.amount,
};

const INITIAL_KEPT_DATA = {

  totalPtpCount: 0,

  ptpKeptCount: 0,

  keptPercentage: 0,

};



const INITIAL_FOLLOW_UP_DATA = {

  dueToday: 0,

  overdue: 0,

  upcoming: 0,

  brokenPtp: 0,

  amountAtRisk: 0,

};



const asNumber = (value) => {

  const number = Number(value);

  return Number.isFinite(number) ? number : 0;

};



const getLocalDateOnly = (date) =>

  new Date(date.getFullYear(), date.getMonth(), date.getDate());



const mapPTPRow = (row) => {

  const parsedDate = row.DT_BANKDATA_PTPDATE

    ? new Date(row.DT_BANKDATA_PTPDATE)

    : null;



  const validDate =

    parsedDate && !Number.isNaN(parsedDate.getTime())

      ? parsedDate

      : null;



  const today = getLocalDateOnly(new Date());

  const dueDate = validDate ? getLocalDateOnly(validDate) : null;



  const daysDifference = dueDate

    ? Math.round(

        (dueDate.getTime() - today.getTime()) / 86400000

      )

    : 0;



  let dueStatus = "today";

  let dueLabel = "Due today";



  if (daysDifference < 0) {

    dueStatus = "overdue";

    dueLabel = `Overdue ${Math.abs(daysDifference)}d`;

  } else if (daysDifference > 0) {

    dueStatus = "upcoming";

    dueLabel = `Due ${validDate.toLocaleDateString("en-IN", {

      day: "numeric",

      month: "short",

    })}`;

  }



  return {

    id: row.VAR_BANKDATA_USERID ?? row.VAR_BANKDATA_CONTRACTNUM,

    customerName: row.VAR_USERMST_USERFULLNAME || "—",

    accountNo: row.VAR_BANKDATA_CONTRACTNUM || "—",

    officer: row.VAR_BANKDATA_CUSTOMERNM?.trim?.() || "—",

    dpd: asNumber(row.DAYS_PASSED),

    bucket: "—",

    dueStatus,

    dueLabel,

    note: "",

    amount: asNumber(row.NUM_BANKDATA_EMI),



    // The current API does not return these fields.

    status: "pending",

    priority: "Med",

  };

};



const PtpFollowUpTracker = () => {

  const { setLoader } = useLoader();



  const [officer, setOfficer] = useState("all");

  const [sortBy, setSortBy] = useState("dpd-asc");



  const [ptps, setPtps] = useState([]);

  const [ptpKeptData, setPtpKeptData] = useState(

    INITIAL_KEPT_DATA

  );

  const [followUpData, setFollowUpData] = useState(

    INITIAL_FOLLOW_UP_DATA

  );



  // Fetch all dashboard APIs.

  useEffect(() => {

    let isMounted = true;



    const fetchTrackerData = async () => {

      setLoader(true);



      try {

        const results = await Promise.allSettled([

          apiClient.get("/ptp-tracker/getPTPKeptCount"),

          apiClient.get("/ptp-tracker/getPTPFollowUpTracker"),

          apiClient.get("/ptp-tracker/getPTPSorting"),

        ]);



        if (!isMounted) return;



        const [keptResult, followUpResult, sortingResult] =

          results;



        // PTP kept count API

        if (

          keptResult.status === "fulfilled" &&

          keptResult.value?.success

        ) {

          const row =

            keptResult.value.data?.ptpKeptCount?.[0];



          if (row) {

            setPtpKeptData({

              totalPtpCount: asNumber(row.TOTAL_PTP_COUNT),

              ptpKeptCount: asNumber(row.PTP_KEPT_COUNT),

              keptPercentage: asNumber(row.KEPT_PERCENTAGE),

            });

          } else {

            setPtpKeptData(INITIAL_KEPT_DATA);

          }

        } else if (keptResult.status === "rejected") {

          console.error(

            "Error fetching PTP kept count:",

            keptResult.reason

          );

        }



        // PTP follow-up summary API

        if (

          followUpResult.status === "fulfilled" &&

          followUpResult.value?.success

        ) {

          const row =

            followUpResult.value.data?.ptpFollowUpTracker?.[0];



          if (row) {

            setFollowUpData({

              dueToday: asNumber(row.DUE_TODAY),

              overdue: asNumber(row.OVERDUE),

              upcoming: asNumber(row.UPCOMING),

              brokenPtp: asNumber(row.BROKEN_PTP),

              amountAtRisk: asNumber(row.AMOUNT_AT_RISK),

            });

          } else {

            setFollowUpData(INITIAL_FOLLOW_UP_DATA);

          }

        } else if (followUpResult.status === "rejected") {

          console.error(

            "Error fetching PTP follow-up tracker:",

            followUpResult.reason

          );

        }



        // PTP list API

        if (

          sortingResult.status === "fulfilled" &&

          sortingResult.value?.success

        ) {

          const rows = sortingResult.value.data?.ptpSorting;



          setPtps(

            Array.isArray(rows) ? rows.map(mapPTPRow) : []

          );

        } else {

          setPtps([]);



          if (sortingResult.status === "rejected") {

            console.error(

              "Error fetching PTP sorting data:",

              sortingResult.reason

            );

          }

        }

      } catch (error) {

        if (isMounted) {

          console.error(

            "Error loading PTP tracker data:",

            error

          );

        }

      } finally {

        if (isMounted) {

          setLoader(false);

        }

      }

    };



    fetchTrackerData();



    return () => {

      isMounted = false;

    };

  }, []);



  // Build officer dropdown options from the API data.

  const officerOptions = useMemo(

    () =>

      [

        ...new Set(

          ptps.map((ptp) => ptp.officer).filter(Boolean)

        ),

      ].sort((a, b) => a.localeCompare(b)),

    [ptps]

  );



  // Filter PTP records by officer.

  const officerFiltered = useMemo(

    () =>

      officer === "all"

        ? ptps

        : ptps.filter((ptp) => ptp.officer === officer),

    [ptps, officer]

  );



  // Get tab counts from the summary API.

  const tabCount = useCallback(

    (tabId) => {

      switch (tabId) {

        case "today":

          return followUpData.dueToday;

        case "overdue":

          return followUpData.overdue;

        case "upcoming":

          return followUpData.upcoming;

        case "broken":

          return followUpData.brokenPtp;

        default:

          return 0;

      }

    },

    [followUpData]

  );



  // Show all PTP records; count boxes do not filter the list.
  // Sorting is performed on the frontend without additional API calls.
  const visibleItems = useMemo(
    () => [...officerFiltered].sort(SORTERS[sortBy] || SORTERS["dpd-asc"]),
    [officerFiltered, sortBy]
  );

    // Update status locally.

  const updateStatus = useCallback((id, status) => {

    setPtps((previous) =>

      previous.map((ptp) =>

        ptp.id === id ? { ...ptp, status } : ptp

      )

    );

  }, []);



  const handleMarkKept = useCallback(

    (id) => updateStatus(id, "kept"),

    [updateStatus]

  );



  const handleMarkBroken = useCallback(

    (id) => updateStatus(id, "broken"),

    [updateStatus]

  );



  const handleEscalate = useCallback((id) => {

    // Connect your escalation API here when available.

    console.info("Escalate PTP:", id);

  }, []);



  // Build summary cards from API results.

  const summaryCards = useMemo(

    () =>

      SUMMARY_CARDS.map((card) => {

        if (card.id === "due") {

          return {

            ...card,

            value: followUpData.dueToday.toLocaleString(

              "en-IN"

            ),

          };

        }



        if (card.id === "overdue") {

          return {

            ...card,

            value: followUpData.overdue.toLocaleString(

              "en-IN"

            ),

          };

        }



        if (card.id === "kept") {

          return {

            ...card,

            value: `${ptpKeptData.keptPercentage}%`,

            subText: `${ptpKeptData.ptpKeptCount.toLocaleString(

              "en-IN"

            )} of ${ptpKeptData.totalPtpCount.toLocaleString(

              "en-IN"

            )} PTPs`,

          };

        }



        if (card.id === "risk") {

          return {

            ...card,

            value: `₹${followUpData.amountAtRisk.toLocaleString(

              "en-IN"

            )}`,

          };

        }



        return card;

      }),

    [followUpData, ptpKeptData]

  );



  const currentDate = new Date().toLocaleDateString(

    "en-IN",

    {

      day: "numeric",

      month: "short",

      year: "numeric",

    }

  );



  return (

    <div className="main-content">

      <div className="page-ptp-tracker">

        {/* Header */}

        <div className="ptp-header">

          <div className="ptp-header-text">

            <h1 className="ptp-title">

              PTP follow-up tracker

            </h1>

            <p className="ptp-subtitle">

              As of {currentDate}

            </p>

          </div>



          <select

            className="ptp-select"

            value={officer}

            onChange={(event) =>

              setOfficer(event.target.value)

            }

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



        {/* Count boxes only — clicking them does not filter the list. */}
        <div className="ptp-tabs" aria-label="PTP counts">
          {TABS.filter((tab) => tab.showCount).map((tab) => (
            <div key={tab.id} className="ptp-tab">
              {tab.label}
              <span className="ptp-tab-count">{tabCount(tab.id)}</span>
            </div>
          ))}
        </div>

        {/* Summary cards */}

        <PtpSummaryCards cards={summaryCards} />



        {/* All records are always displayed, regardless of the count boxes. */}
        <select
          className="ptp-select ptp-sort"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          aria-label="Sort PTPs"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <PtpList
          items={visibleItems}
          onMarkKept={handleMarkKept}
          onMarkBroken={handleMarkBroken}
          onEscalate={handleEscalate}
        />
      </div>
    </div>
  );
};

export default PtpFollowUpTracker;