const { getPerformaceDashboardData } = require("./FcoPerformanceTracker.repo");

async function getPerformaceDashboardDataService() {
  return await getPerformaceDashboardData();
}

module.exports = { getPerformaceDashboardDataService };
