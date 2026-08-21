const { fetchDashboardSummary , fetchDashboardDailyTransactions,
  fetchDashboardPaymentMode
} = require('./CollectionDashboard.service');
const { logApiSuccess, logApiError } = require('../../../utils/log');

async function dashboardSummaryHandler(req, res, next) {
  try {

    const data = await fetchDashboardSummary();

    logApiSuccess(
      req,
      200,
      {},
      "Dashboard summary loaded"
    );

    return res.ok(data);
  } catch (error) {
    const status = error?.statusCode || 500;

    if (status < 500) {
      return res.fail(error.message, status);
    }

    logApiError(
      req,
      500,
      error.message,
      "Dashboard summary error"
    );

    return next(error);
  }
}

async function dashboardDailyTransactionHandler(req, res, next) {
  try {

    const data = await fetchDashboardDailyTransactions();

    logApiSuccess(
      req,
      200,
      {
      },
      "Dashboard daily transactions loaded"
    );

    return res.ok(data);
  } catch (error) {
    const status = error?.statusCode || 500;

    if (status < 500) {
      return res.fail(error.message, status);
    }

    logApiError(
      req,
      500,
      error.message,
      "Dashboard daily transactions error"
    );

    return next(error);
  }
}

async function dashboardPaymentModeHandler(req, res, next) {
  try {
    const data = await fetchDashboardPaymentMode();

    logApiSuccess(
      req,
      200,
      {
      },
      "Dashboard payment mode loaded"
    );

    return res.ok(data);
  } catch (error) {
    const status = error?.statusCode || 500;

    if (status < 500) {
      return res.fail(error.message, status);
    }

    logApiError(
      req,
      500,
      error.message,
      "Dashboard payment mode error"
    );

    return next(error);
  }
}

module.exports = {
  dashboardSummaryHandler,
  dashboardDailyTransactionHandler,
  dashboardPaymentModeHandler
};
