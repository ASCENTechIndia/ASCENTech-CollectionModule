const {
  resetPassword, desigandUsertype, changepwd
} = require('./Password.service');
const { auditLog } = require('../../utils/audit-log');
const { logApiSuccess, logApiError } = require('../../utils/log');

function requestMeta(req) {
  return {
    ip: req.ip,
    method: req.method,
    path: req.originalUrl,
  };
} 

async function resetPwdHandler(req, res, next) {
  try {
    const { userId } = req.body;
    const result = await resetPassword(userId);

    logApiSuccess(req, 200, {}, "Password Reset Done");

    return res.ok({
      success: true,
      message: "Password reset successfully",
      Password: result.password   
    });

  } catch (error) {
    logApiError(req, 500, error.message, "Password Reset error");
    return next(error);
  }
}

async function designationandusertypeHandler(req, res, next) {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.badRequest("userId is required");
    }

    const cleanUserId = userId.startsWith("E")
      ? userId.substring(1)
      : userId;

    const rows = await desigandUsertype(cleanUserId);

    logApiSuccess(req, 200, { count: rows.length }, "Designation and usertype fetched");

   return res.ok(rows);
  } catch (error) {
    console.error("❌ ERROR:", error);
    logApiError(req, 500, error.message, "Designation and usertype fetch error");
    return next(error);
  }
}

async function changePwdHandler(req, res, next) {
  try {
    const payload = req.body;
    const out = await changepwd(payload);

    const isSuccess = String(out.Out_errorCode) === '9999';
    if (isSuccess) {
      logApiSuccess(req, 200, `Password changed successfully`);
    } else {
      logApiError(req, 400, out.Out_ErrorMsg, `Password change failed`);
    }

    auditLog({
      action: 'PASSWORD_CHANGE',
      actor: req.user?.userId || 'system',
 module: 'users',
      entityId: out.Out_User,
      status: isSuccess ? 'SUCCESS' : 'FAILED',
      details: { outErrorCode: out.Out_errorCode, outErrorMsg: out.Out_ErrorMsg },
      requestMeta: requestMeta(req),
    });

    return res.ok(out);
  } catch (error) {
logApiError(req, 500, error.message, 'Password change error');
 return next(error);
  }
}


module.exports = {
  resetPwdHandler, designationandusertypeHandler, changePwdHandler}