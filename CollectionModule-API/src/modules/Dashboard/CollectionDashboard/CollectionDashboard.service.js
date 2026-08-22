const { getDashboardSummaryData,getDashboardDailyTransactionsData,getDashboardPaymentModeData,
  getDashboardTransactionModeData,getDashboardTopLcoCollectionData
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

async function fetchDashboardTopLcoCollection() {
  return getDashboardTopLcoCollectionData();
}

module.exports = {
  fetchDashboardSummary,
  fetchDashboardDailyTransactions,
  fetchDashboardPaymentMode,
  fetchDashboardTransactionMode,
  fetchDashboardTopLcoCollection
};
