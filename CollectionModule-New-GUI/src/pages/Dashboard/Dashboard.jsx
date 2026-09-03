import React, { useState } from "react";
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
  const handleToggle = () => {
    setShowInLacs((prev) => !prev);
  };
  return (
    <div className="dashboard-shell">
      <DashboardHeader handleToggle={handleToggle} showInLacs={showInLacs}/>

      <div className="container-fluid px-3 px-md-4 py-3">
        <SummaryCards showInLacs={showInLacs}/>

        <div className="row g-3 mt-3">
          <div className="col-12 col-xl-4 mt-0 px-2 py-xl-0 py-2">
            <TransactionsPerDayChart showInLacs={showInLacs}/>
          </div>
          <div className="col-12 col-xl-4 mt-0 px-2 py-xl-0 py-2">
            <CollectionByPaymentModeChart showInLacs={showInLacs} />
          </div>
          <div className="col-12 col-xl-4 mt-0 px-2 py-xl-0 py-2">
            <TransactionsByModeChart showInLacs={showInLacs}/>
          </div>
        </div>
        <div className="row g-3 mt-3">
          <div className="col-12 px-2 m-0">
            <BottomStatsBar showInLacs={showInLacs}/>
          </div>
        </div>
        <div className="row g-3 mt-3">
          <div className="col-12 col-xl-4 m-0 px-2 py-xl-0 py-2">
            <TopLCOsTable showInLacs={showInLacs} />
          </div>
          <div className="col-12 col-xl-4 m-0 px-2 py-xl-0 py-2">
            <CollectionByStateTable showInLacs={showInLacs}/>
          </div>
          <div className="col-12 col-xl-4 m-0 px-2 py-xl-0 py-2">
            <TopCitiesTable showInLacs={showInLacs}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
