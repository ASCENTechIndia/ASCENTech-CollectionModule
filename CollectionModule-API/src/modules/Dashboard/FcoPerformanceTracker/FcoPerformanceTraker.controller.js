const { logApiError, logApiSuccess } = require("../../../utils/log");
const {
  getPerformaceDashboardDataService,
} = require("./FcoPerformanceTracker.service");

async function getPerformaceDashboardDataController(req, res, next) {
  try {
    const result = await getPerformaceDashboardDataService();
    logApiSuccess(
      req,
      200,
      {
        userId: result?.userContext?.userId || "",
      },
      "FCO Performance Tracker dashbaord data",
    );
    return res.ok(result);
  } catch (error) {
    logApiError(req, 500, error.message, "Performance tracker dashboard error");
    return next(error);
  }
}

module.exports = { getPerformaceDashboardDataController };
