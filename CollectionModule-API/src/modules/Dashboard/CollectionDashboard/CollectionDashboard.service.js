const { getDashboardSummaryData,getDashboardDailyTransactionsData,getDashboardPaymentModeData,
  getDashboardTransactionModeData,getDashboardTopLcoCollectionData,getDashboardStateCollectionData,
  getDashboardCityCollectionData,getDashboardCollectionCountData
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

async function fetchDashboardStateCollection() {
  return getDashboardStateCollectionData();
}

async function fetchDashboardCityCollection() {
  return getDashboardCityCollectionData();
}

async function fetchDashboardCollectionCount() {
  return getDashboardCollectionCountData();
}

module.exports = {
  fetchDashboardSummary,
  fetchDashboardDailyTransactions,
  fetchDashboardPaymentMode,
  fetchDashboardTransactionMode,
  fetchDashboardTopLcoCollection,
  fetchDashboardStateCollection,
  fetchDashboardCityCollection,
  fetchDashboardCollectionCount
};
