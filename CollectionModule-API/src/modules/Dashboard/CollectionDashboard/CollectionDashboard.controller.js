const { fetchDashboardSummary , fetchDashboardDailyTransactions,
  fetchDashboardPaymentMode,fetchDashboardTransactionMode,fetchDashboardTopLcoCollection,
  fetchDashboardStateCollection,fetchDashboardCityCollection,fetchDashboardCollectionCount
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

async function dashboardTransactionModeHandler(req, res, next) {
  try {

    const data = await fetchDashboardTransactionMode();

    logApiSuccess(
      req,
      200,
      {
      },
      "Dashboard transaction mode loaded"
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
      "Dashboard transaction mode error"
    );

    return next(error);
  }
}

async function dashboardTopLcoCollectionHandler(req, res, next) {
  try {

    const data = await fetchDashboardTopLcoCollection(req.query);

    logApiSuccess(
      req,
      200,
      {
      },
      "Dashboard top LCO collection loaded"
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
      "Dashboard top LCO collection error"
    );

    return next(error);
  }
}

async function dashboardStateCollectionHandler(req, res, next) {
  try {
    const data = await fetchDashboardStateCollection(req.query);

    logApiSuccess(
      req,
      200,
      {},
      "Dashboard state collection loaded"
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
      "Dashboard state collection error"
    );

    return next(error);
  }
}

async function dashboardCityCollectionHandler(req, res, next) {
  try {

    const data = await fetchDashboardCityCollection(req.query);

    logApiSuccess(
      req,
      200,
      {},
      "Dashboard city collection loaded"
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
      "Dashboard city collection error"
    );

    return next(error);
  }
}

async function dashboardCollectionCountHandler(req, res, next) {
  try {

    const data = await fetchDashboardCollectionCount();

    logApiSuccess(
      req,
      200,
      {},
      "Dashboard collection count loaded"
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
      "Dashboard collection count error"
    );

    return next(error);
  }
}

module.exports = {
  dashboardSummaryHandler,
  dashboardDailyTransactionHandler,
  dashboardPaymentModeHandler,
  dashboardTransactionModeHandler,
  dashboardTopLcoCollectionHandler,
  dashboardStateCollectionHandler,
  dashboardCityCollectionHandler,
  dashboardCollectionCountHandler
};
