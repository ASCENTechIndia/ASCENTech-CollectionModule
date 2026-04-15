const {
  searchAccounts,
  unallocateAllAccounts,
} = require('./inactiveUserAccounts.service');
const { auditLog } = require('../../utils/audit-log');
const { logApiSuccess, logApiError } = require('../../utils/log');

function requestMeta(req) {
  return {
    ip: req.ip,
    method: req.method,
    path: req.originalUrl,
  };
}

async function searchInactiveUserAccountsHandler(req, res, next) {
  try {
    const rows = await searchAccounts(req.query);
    logApiSuccess(req, 200, { count: rows?.length || 0 }, 'Inactive user accounts search completed');
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Inactive user accounts search error');
    return next(error);
  }
}

async function unallocateAllAccountsHandler(req, res, next) {
  try {
    const result = await unallocateAllAccounts();

    if (result.isSuccess) {
      logApiSuccess(req, 200, null, 'Unallocation successful for all users');
    } else {
      logApiError(req, 400, result.message, 'Unallocation failed for all users');
    }

    auditLog({
      action: 'UNALLOCATE_ALL_USER_ACCOUNTS',
      actor: req.user?.userId || 'system',
      module: 'users',
      entityId: 'ALL_USERS',
      status: result.isSuccess ? 'SUCCESS' : 'FAILED',
      details: {
        outErrorCode: result.out.out_ErrorCode,
        outErrorMsg: result.out.out_ErrorMsg,
      },
      requestMeta: requestMeta(req),
    });

    return res.ok(result, result.message);
  } catch (error) {
    logApiError(req, 500, error.message, 'Unallocate all users accounts error');
    return next(error);
  }
}

module.exports = {
  searchInactiveUserAccountsHandler,
  unallocateAllAccountsHandler,
};
