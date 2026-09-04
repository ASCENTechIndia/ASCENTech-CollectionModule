import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/DashboardComponents/DashboardHeader.jsx";
import SummaryCards from "../../components/DashboardComponents/SummaryCards.jsx";
import TransactionsPerDayChart from "../../components/DashboardComponents/TransactionsPerDayChart.jsx";
import CollectionByPaymentModeChart from "../../components/DashboardComponents/CollectionByPaymentModeChart.jsx";
import TransactionsByModeChart from "../../components/DashboardComponents/TransactionsByModeChart.jsx";
import TopLCOsTable from "../../components/DashboardComponents/TopLCOsTable.jsx";
import CollectionByStateTable from "../../components/DashboardComponents/CollectionByStateTable.jsx";
import TopCitiesTable from "../../components/DashboardComponents/TopCitiesTable.jsx";
import BottomStatsBar from "../../components/DashboardComponents/BottomStatsBar.jsx";

const Dashboard = () => {
  const [showInLacs, setShowInLacs] = useState(true);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [bottomStatBarData, setBottomStatBarData] = useState({
    avgCollectionPerTransaction: 0,
    avgCollectionPerCustomer: 0,
    cashCollection: 0,
    digitalCollection: 0,
    chequeCollection: 0,
  });

  const handleToggle = () => {
    setShowInLacs((prev) => !prev);
  };

  const handleDateRangeChange = (start, end) => {
    setFromDate(start);
    setToDate(end);
  };

  return (
    <div className="dashboard-shell">
      <DashboardHeader
        handleToggle={handleToggle}
        showInLacs={showInLacs}
        onDateRangeChange={handleDateRangeChange}
      />

      <div className="container-fluid px-3 px-md-4 py-3">
        <SummaryCards
          showInLacs={showInLacs}
          fromDate={fromDate}
          toDate={toDate}
          setBottomStatBarData={setBottomStatBarData}
        />

        <div className="row g-3 mt-3">
          <div className="col-12 col-xl-4 mt-0 px-2 py-xl-0 py-2">
            <TransactionsPerDayChart
              showInLacs={showInLacs}
              fromDate={fromDate}
              toDate={toDate}
            />
          </div>
          <div className="col-12 col-xl-4 mt-0 px-2 py-xl-0 py-2">
            <CollectionByPaymentModeChart
              showInLacs={showInLacs}
              fromDate={fromDate}
              toDate={toDate}
              setBottomStatBarData={setBottomStatBarData}
            />
          </div>
          <div className="col-12 col-xl-4 mt-0 px-2 py-xl-0 py-2">
            <TransactionsByModeChart
              showInLacs={showInLacs}
              fromDate={fromDate}
              toDate={toDate}
            />
          </div>
        </div>
        <div className="row g-3 mt-3">
          <div className="col-12 px-2 m-0">
            <BottomStatsBar
              showInLacs={showInLacs}
              bottomStatBarData={bottomStatBarData}
            />
          </div>
        </div>
        <div className="row g-3 mt-3">
          <div className="col-12 col-xl-4 m-0 px-2 py-xl-0 py-2">
            <TopLCOsTable
              showInLacs={showInLacs}
              fromDate={fromDate}
              toDate={toDate}
            />
          </div>
          <div className="col-12 col-xl-4 m-0 px-2 py-xl-0 py-2">
            <CollectionByStateTable
              showInLacs={showInLacs}
              fromDate={fromDate}
              toDate={toDate}
            />
          </div>
          <div className="col-12 col-xl-4 m-0 px-2 py-xl-0 py-2">
            <TopCitiesTable
              showInLacs={showInLacs}
              fromDate={fromDate}
              toDate={toDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
