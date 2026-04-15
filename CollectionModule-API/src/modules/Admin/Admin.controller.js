const {
  locationTrackingService, lastLoginService, bucketSetterService
} = require('./Admin.service');
const { auditLog } = require('../../utils/audit-log');
const { logApiSuccess, logApiError } = require('../../utils/log');

function requestMeta(req) {
  return {
    ip: req.ip,
    method: req.method,
    path: req.originalUrl,
  };
}

async function locationTrackingHandler(req, res, next) {
  try {
     const { userId, cDate } = req.query; 
    const rows = await locationTrackingService(userId, cDate);
    logApiSuccess(req, 200, { count: rows?.length || 0 }, `Location tracking data retrieved`);
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Location tracking error');
    return next(error);
  }
}

async function lastLoginHandler(req, res, next) {
  try {
     const { userId } = req.query; 
    const rows = await lastLoginService(userId);
    logApiSuccess(req, 200, { count: rows?.length || 0 }, `Last login data retrieved`);
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Last login error');
    return next(error);
  }
}

async function bucketSetterHandler(req, res, next) {
  try {
    const result = await bucketSetterService();

    logApiSuccess(
      req,
      200,
      { count: result?.p_updated_count || 0 },
      result.message || "Bucket Setter completed"
    );

    return res.ok(result);

  } catch (error) {
    logApiError(req, 500, error.message, 'Bucket Setter error');
    return next(error);
  }
}

module.exports = {
  locationTrackingHandler, lastLoginHandler, bucketSetterHandler
}