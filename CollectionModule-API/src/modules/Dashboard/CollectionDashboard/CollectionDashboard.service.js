const { getDashboardSummaryData,getDashboardDailyTransactionsData,getDashboardPaymentModeData,
  getDashboardTransactionModeData
 } = require('./CollectionDashboard.repo');

async function fetchDashboardSummary() {
  return getDashboardSummaryData();
}

async function fetchDashboardDailyTransactions() {
  return getDashboardDailyTransactionsData();
}

async function fetchDashboardPaymentMode() {
  return getDashboardPaymentModeData();
}

async function fetchDashboardTransactionMode() {
  return getDashboardTransactionModeData();
}

module.exports = {
  fetchDashboardSummary,
  fetchDashboardDailyTransactions,
  fetchDashboardPaymentMode,
  fetchDashboardTransactionMode
};
