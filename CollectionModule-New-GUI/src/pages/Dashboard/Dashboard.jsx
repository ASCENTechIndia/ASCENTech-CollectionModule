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
        <SummaryCards />

        <div className="row g-3 mt-2">
          <div className="col-12 col-xl-4 mt-0 px-1">
            <TransactionsPerDayChart />
          </div>
          <div className="col-12 col-xl-4 mt-0 px-1">
            <CollectionByPaymentModeChart />
          </div>
          <div className="col-12 col-xl-4 mt-0 px-1">
            <TransactionsByModeChart />
          </div>
        </div>

        <div className="row g-3 mt-2">
          <div className="col-12 col-xl-5 m-0 px-1">
            <TopLCOsTable />
          </div>
          <div className="col-12 col-xl-3 m-0 px-1">
            <CollectionByStateTable />
          </div>
          <div className="col-12 col-xl-4 m-0 px-1">
            <TopCitiesTable />
          </div>
        </div>
        <div className="row g-3 mt-2">
          <div className="col-12 p-0 m-0">
            <BottomStatsBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
