const {
  pincodes, fetchUsername, fetchUserPincodes, assignPincode
} = require('./assignPincode.service');
const { auditLog } = require('../../utils/audit-log');
const { logApiSuccess, logApiError } = require('../../utils/log');

function requestMeta(req) {
  return {
    ip: req.ip,
    method: req.method,
    path: req.originalUrl,
  };
}

async function pincodeListHandler(req, res, next) {
  try {
    const rows = await pincodes();
    logApiSuccess(req, 200, { count: rows?.length || 0 }, `Pincode list retrieved`);
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Pincode list error');
    return next(error);
  }
}

async function usernameHandler(req, res, next) {
  try {
    const { userId } = req.query;  
    const rows = await fetchUsername(userId);
    logApiSuccess(req, 200, { count: rows?.length || 0 }, `User name retrieved`);
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'User name error');
    return next(error);
  }
}

async function userPincodeHandler(req, res, next) {
  try {
    const { userId } = req.query;  
    const rows = await fetchUserPincodes(userId);
    logApiSuccess(req, 200, { count: rows?.length || 0 }, `User Pincode retrieved`);
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'User Pincode error');
    return next(error);
  }
}

async function pincodeAssignHandler(req, res, next) {
  try {
    const payload = req.body;
    const out = await assignPincode(payload);

    const isSuccess = String(out.Out_errorCode) === '9999';
    if (isSuccess) {
      logApiSuccess(req, 200, `Pincode assigned successfully`);
    } else {
      logApiError(req, 400, out.Out_ErrorMsg, `Pincode assignment failed`);
    }

    auditLog({
      action: 'PINCODE_ASSIGN',
      actor: req.user?.userId || 'system',
 module: 'users',
      entityId: out.Out_User,
      status: isSuccess ? 'SUCCESS' : 'FAILED',
      details: { outErrorCode: out.Out_errorCode, outErrorMsg: out.Out_ErrorMsg },
      requestMeta: requestMeta(req),
    });

    return res.ok(out);
  } catch (error) {
logApiError(req, 500, error.message, 'Pincode assign error');
 return next(error);
  }
}

module.exports = {
  pincodeListHandler, usernameHandler, userPincodeHandler, pincodeAssignHandler}