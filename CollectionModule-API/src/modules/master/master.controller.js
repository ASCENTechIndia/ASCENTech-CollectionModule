const { fetchDashboardSummary } = require('./master.service');
const { logApiSuccess, logApiError } = require('../../utils/log');

async function dashboardSummary(req, res, next) {
  try {
    const payload = req.query;
    const data = await fetchDashboardSummary(payload.brCategory, payload.brid);
    logApiSuccess(req, 200, { category: payload.brCategory }, `Dashboard summary fetched successfully`);
    return res.ok(data);
  } catch (error) {
    logApiError(req, 500, error.message, 'Dashboard summary error');
    return next(error);
  }
}

module.exports = {
  dashboardSummary,
};
