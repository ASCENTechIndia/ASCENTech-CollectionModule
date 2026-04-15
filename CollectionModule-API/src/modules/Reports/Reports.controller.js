const {
  accAllocationService, dailyUploadedReport, pincodeHistoryReport, nonVisitDoneService, overallPerfService,
  visitDoneService
} = require('./Reports.service');
const { auditLog } = require('../../utils/audit-log');
const { logApiSuccess, logApiError } = require('../../utils/log');

function requestMeta(req) {
  return {
    ip: req.ip,
    method: req.method,
    path: req.originalUrl,
  };
}

async function accAllocationHandler(req, res, next) {
  try {
    const rows = await accAllocationService(req.query);
    logApiSuccess( req, 200, { count: rows?.length || 0 }, 'Contract Allocation Report completed' );
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Contract Allocation Report search error');
    return next(error);
  }
}

async function dailyUploadedReportHandler(req, res, next) {
  try {
    const rows = await dailyUploadedReport(req.query);
    logApiSuccess( req, 200, { count: rows?.length || 0 }, 'Daily Uploaded Report completed' );
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Daily Uploaded Report search error');
    return next(error);
  }
}

async function pinCodeHistoryHandler(req, res, next) {
  try {
    const rows = await pincodeHistoryReport(req.query);
    logApiSuccess( req, 200, { count: rows?.length || 0 }, 'Inactive User Pincode History Report completed' );
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Inactive User Pincode History Report search error');
    return next(error);
  }
}


async function nonVisitDoneHandler(req, res, next) {
  try {
    const rows = await nonVisitDoneService(req.query);
    logApiSuccess( req, 200, { count: rows?.length || 0 }, 'Non Visit Done Summary Report completed' );
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Non Visit Done Summary Report search error');
    return next(error);
  }
}

async function overallPerformanceHandler(req, res, next) {
  try {
    const rows = await overallPerfService(req.query);
    logApiSuccess( req, 200, { count: rows?.length || 0 }, 'Overall Performance Summary Report completed' );
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Overall Performance Summary Report search error');
    return next(error);
  }
}

async function visitDoneHandler(req, res, next) {
  try {
    const rows = await visitDoneService(req.query);
    logApiSuccess( req, 200, { count: rows?.length || 0 }, 'Visit Done Summary Report completed' );
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Visit Done Summary Report search error');
    return next(error);
  }
}

module.exports = {
  accAllocationHandler, dailyUploadedReportHandler, pinCodeHistoryHandler, nonVisitDoneHandler, overallPerformanceHandler,
  visitDoneHandler
};
