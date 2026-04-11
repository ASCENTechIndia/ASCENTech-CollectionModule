const { getDashboardSummary } = require('./master.repo');

async function fetchDashboardSummary(brCategory, brid) {
  return getDashboardSummary(brCategory, brid);
}

module.exports = {
  fetchDashboardSummary,
};
