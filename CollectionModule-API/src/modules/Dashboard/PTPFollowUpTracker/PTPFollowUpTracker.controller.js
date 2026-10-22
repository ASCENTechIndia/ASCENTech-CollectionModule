const { logApiError, logApiSuccess } = require("../../../utils/log");
const {
 getPTPKeptCountService,
 getPTPFollowUpTrackerService,
 getPTPSortingService
} = require("./PTPFollowUpTracker.service");

async function getPTPKeptCountController(req, res, next) {
  try {
    const result = await getPTPKeptCountService();

    logApiSuccess(
      req,
      200,
      {
        userId: result?.userContext?.userId || "",
      },
      "PTP Kept Count dashboard data"
    );

    return res.ok(result);
  } catch (error) {
    logApiError(
      req,
      500,
      error.message,
      "PTP Kept Count dashboard error"
    );

    return next(error);
  }
}

async function getPTPFollowUpTrackerController(req, res, next) {
  try {
    const result = await getPTPFollowUpTrackerService();

    logApiSuccess(
      req,
      200,
      {
        userId: result?.userContext?.userId || "",
      },
      "PTP Follow Up Tracker dashboard data"
    );

    return res.ok(result);
  } catch (error) {
    logApiError(
      req,
      500,
      error.message,
      "PTP Follow Up Tracker dashboard error"
    );

    return next(error);
  }
}

async function getPTPSortingController(req, res, next) {
  try {
    const result = await getPTPSortingService();

    logApiSuccess(
      req,
      200,
      {
        userId: result?.userContext?.userId || "",
      },
      "PTP Sorting dashboard data"
    );

    return res.ok(result);
  } catch (error) {
    logApiError(
      req,
      500,
      error.message,
      "PTP Sorting dashboard error"
    );

    return next(error);
  }
}

module.exports = { getPTPKeptCountController,
  getPTPFollowUpTrackerController,
  getPTPSortingController
 };
