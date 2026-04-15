const {
  accAllocationService, dailyUploadedReport
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


module.exports = {
  accAllocationHandler, dailyUploadedReportHandler
};
