const { getDashboardSummaryData,getDashboardDailyTransactionsData,getDashboardPaymentModeData,
  getDashboardTransactionModeData,getDashboardTopLcoCollectionData,getDashboardStateCollectionData,
  getDashboardCityCollectionData,getDashboardCollectionCountData
 } = require('./CollectionDashboard.repo');

async function fetchDashboardSummary(payload) {
  return getDashboardSummaryData(payload);
}


async function fetchDashboardDailyTransactions(payload) {
  return getDashboardDailyTransactionsData(payload);
}

async function fetchDashboardPaymentMode(payload) {
  return getDashboardPaymentModeData(payload);
}

async function fetchDashboardTransactionMode(payload) {
  return getDashboardTransactionModeData(payload);
}

async function fetchDashboardTopLcoCollection(payload) {
  return getDashboardTopLcoCollectionData(payload);
}

async function fetchDashboardStateCollection(payload) {
  return getDashboardStateCollectionData(payload);
}

async function fetchDashboardCityCollection(payload) {
  return getDashboardCityCollectionData(payload);
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
