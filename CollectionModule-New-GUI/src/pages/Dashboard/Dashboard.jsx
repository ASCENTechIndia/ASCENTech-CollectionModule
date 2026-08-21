import React from "react";
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
  return (
    <div className="dashboard-shell">
      <DashboardHeader />

      <div className="container-fluid px-3 px-md-4 py-3">
        {/* Row 1: Summary cards */}
        <SummaryCards />

        {/* Row 2: Charts */}
        <div className="row g-3 mt-1">
          <div className="col-12 col-xl-4">
            <TransactionsPerDayChart />
          </div>
          <div className="col-12 col-xl-4">
            <CollectionByPaymentModeChart />
          </div>
          <div className="col-12 col-xl-4">
            <TransactionsByModeChart />
          </div>
        </div>

        {/* Row 3: Tables */}
        <div className="row g-3 mt-1">
          <div className="col-12 col-xl-5">
            <TopLCOsTable />
          </div>
          <div className="col-12 col-xl-3">
            <CollectionByStateTable />
          </div>
          <div className="col-12 col-xl-4">
            <TopCitiesTable />
          </div>
        </div>
      </div>

      <BottomStatsBar />
    </div>
  );
};

export default Dashboard;
