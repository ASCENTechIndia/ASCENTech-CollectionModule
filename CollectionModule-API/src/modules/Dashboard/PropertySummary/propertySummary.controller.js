const { getPropertySummaryDashboardService } = require('./propertySummary.service');
const { auditLog } = require('../../../utils/audit-log');
const { logApiSuccess, logApiError } = require('../../../utils/log');

function requestMeta(req) {
  return {
    ip: req.ip,
    method: req.method,
    path: req.originalUrl,
  };
}

/**
 * Get complete property summary dashboard
 */
async function getPropertySummaryDashboardHandler(req, res, next) {
  try {
    const result = await getPropertySummaryDashboardService();

    logApiSuccess(
      req,
      200,
      result.data,
      'Property summary dashboard fetched successfully'
    );

    return res.status(200).json(result.data);
  } catch (error) {
    logApiError(req, 400, error.message, 'Property summary dashboard fetch failed');
    return next(error);
  }
}

module.exports = {
  getPropertySummaryDashboardHandler,
};
