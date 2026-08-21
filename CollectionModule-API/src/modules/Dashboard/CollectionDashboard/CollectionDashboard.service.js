const { getDashboardSummaryData,getDashboardDailyTransactionsData,getDashboardPaymentModeData } = require('./CollectionDashboard.repo');

async function fetchDashboardSummary() {
  return getDashboardSummaryData();
}

async function fetchDashboardDailyTransactions() {
  return getDashboardDailyTransactionsData();
}

async function fetchDashboardPaymentMode() {
  return getDashboardPaymentModeData();
}

module.exports = {
  fetchDashboardSummary,
  fetchDashboardDailyTransactions,
  fetchDashboardPaymentMode
};
