const {
  createUser,
  updateUser,
  updateUserStatus,
  updateRole,
  search, branchList,
  agentList,
  getFormOptions,
  getRegions,
  getBranches,
  submitMobileUser,
   branchListforInsert,
  Roles,
  UserDevice,
  createWebUser,
} = require('./users.service');
const { auditLog } = require('../../utils/audit-log');
const { logApiSuccess, logApiError } = require('../../utils/log');

function requestMeta(req) {
  return {
    ip: req.ip,
    method: req.method,
    path: req.originalUrl,
  };
}

async function createUserHandler(req, res, next) {
  try {
    const payload = req.body;
    const out = await createUser(payload);

    const isSuccess = String(out.Out_errorCode) === '-100';
    if (isSuccess) {
      logApiSuccess(req, 200, { userId: out.Out_User }, `User created successfully: ${out.Out_User}`);
    } else {
      logApiError(req, 400, out.Out_ErrorMsg, `User creation failed`);
    }

    auditLog({
      action: 'USER_CREATE',
      actor: req.user?.userId || 'system',
      module: 'users',
      entityId: out.Out_User,
      status: isSuccess ? 'SUCCESS' : 'FAILED',
      details: { outErrorCode: out.Out_errorCode, outErrorMsg: out.Out_ErrorMsg },
      requestMeta: requestMeta(req),
    });

    return res.ok(out);
  } catch (error) {
    logApiError(req, 500, error.message, 'User create error');
    return next(error);
  }
}

async function updateUserHandler(req, res, next) {
  try {
    const payload = req.body;
    const out = await updateUser(payload);

    const isSuccess = String(out.Out_errorCode) === '-100';
    if (isSuccess) {
      logApiSuccess(req, 200, { userId: out.Out_User || payload.in_userid }, `User updated successfully`);
    } else {
      logApiError(req, 400, out.Out_ErrorMsg, `User update failed`);
    }

    auditLog({
      action: 'USER_UPDATE',
      actor: req.user?.userId || 'system',
      module: 'users',
      entityId: out.Out_User || payload.in_userid,
      status: isSuccess ? 'SUCCESS' : 'FAILED',
      details: { outErrorCode: out.Out_errorCode, outErrorMsg: out.Out_ErrorMsg },
      requestMeta: requestMeta(req),
    });

    return res.ok(out);
  } catch (error) {
    logApiError(req, 500, error.message, 'User update error');
    return next(error);
  }
}

async function updateUserStatusHandler(req, res, next) {
  try {
    const payload = req.body;
    const out = await updateUserStatus(payload);

    const isSuccess = String(out.out_ErrorCode) === '-100';
    if (isSuccess) {
      logApiSuccess(req, 200, { userId: payload.in_UserId, status: payload.in_ddlstatus }, `User status updated successfully`);
    } else {
      logApiError(req, 400, out.out_ErrorMsg, `User status update failed`);
    }

    auditLog({
      action: 'USER_STATUS_UPDATE',
      actor: req.user?.userId || 'system',
      module: 'users',
      entityId: payload.in_UserId,
      status: isSuccess ? 'SUCCESS' : 'FAILED',
      details: { outErrorCode: out.out_ErrorCode, outErrorMsg: out.out_ErrorMsg, nextStatus: payload.in_ddlstatus },
      requestMeta: requestMeta(req),
    });

    return res.ok(out);
  } catch (error) {
    logApiError(req, 500, error.message, 'User status update error');
    return next(error);
  }
}

async function updateRoleHandler(req, res, next) {
  try {
    const payload = {
      ...req.body,
      insBy: req.user?.userId || 'system',
    };
    const out = await updateRole(payload);

    const isSuccess = out.rowsAffected > 0;
    if (isSuccess) {
      logApiSuccess(req, 200, { userId: payload.userId, roleId: payload.roleId }, `User role updated successfully`);
    } else {
      logApiError(req, 400, 'No rows affected', `User role update failed`);
    }

    auditLog({
      action: 'USER_ROLE_UPDATE',
      actor: req.user?.userId || 'system',
      module: 'users',
      entityId: payload.userId,
      status: isSuccess ? 'SUCCESS' : 'FAILED',
      details: {
        roleId: payload.roleId,
        rowsAffected: out.rowsAffected,
        outErrorCode: out.out?.Out_errorCode,
        outErrorMsg: out.out?.Out_ErrorMsg,
      },
      requestMeta: requestMeta(req),
    });

    return res.ok(out);
  } catch (error) {
    logApiError(req, 500, error.message, 'User role update error');
    return next(error);
  }
}

async function searchHandler(req, res, next) {
  try {
    const filters = req.query;
    const rows = await search(filters);
    logApiSuccess(req, 200, { count: rows?.length || 0 }, `User search completed`);
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'User search error');
    return next(error);
  }
}

async function getUserFormOptionsHandler(req, res, next) {
  try {
    console.log("res :", req)
    const rows = await getFormOptions(req.query);
    logApiSuccess(req, 200, { count: rows?.length || 0 }, `User form options loaded`);
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'User form options error');
    return next(error);
  }
}

async function getRegionsHandler(req, res, next) {
  try {
    const rows = await getRegions(req.query.zoneId);
    logApiSuccess(req, 200, { count: rows?.length || 0, zoneId: req.query.zoneId }, `Regions loaded`);
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Region lookup error');
    return next(error);
  }
}

async function getBranchesHandler(req, res, next) {
  try {
    const rows = await getBranches(req.query.regionId);
    logApiSuccess(req, 200, { count: rows?.length || 0, regionId: req.query.regionId }, `Branches loaded`);
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Branch lookup error');
    return next(error);
  }
}

async function branchListHandler(req, res, next) {
  try {
    const filters = req.query;
    const rows = await branchList(filters);
    logApiSuccess(req, 200, { count: rows?.length || 0 }, `Branch list retrieved`);
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Branch list error');
    return next(error);
  }
}

async function agentListHandler(req, res, next) {
  try {
    const { brid } = req.query;  
    const rows = await agentList(brid);
    logApiSuccess(req, 200, { count: rows?.length || 0 }, `Agent list retrieved`);
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Agent list error');
    return next(error);
  }
}

async function mobileUserSubmitHandler(req, res, next) {
  try {
    const payload = req.body;
    const actor = req.user?.userId || payload.insBy || 'system';
    const out = await submitMobileUser(payload, actor);

    const isSuccess = ['-100', '9999'].includes(String(out.Out_errorCode));
    if (isSuccess) {
      logApiSuccess(req, 200, { userId: out.Out_User }, 'Mobile user submitted successfully');
    } else {
      logApiError(req, 400, out.Out_ErrorMsg, 'Mobile user submit failed');
    }

    auditLog({
      action: 'USER_MOBILE_SUBMIT',
      actor,
      module: 'users',
      entityId: out.Out_User,
      status: isSuccess ? 'SUCCESS' : 'FAILED',
      details: { outErrorCode: out.Out_errorCode, outErrorMsg: out.Out_ErrorMsg },
      requestMeta: requestMeta(req),
    });

    return res.ok(out);
  } catch (error) {
    logApiError(req, 500, error.message, 'Mobile user submit error');
    return next(error);
  }
}

async function branchListforInsertHandler(req, res, next) {
  try {
    const filters = req.query;
    const rows = await branchListforInsert(filters);
    logApiSuccess(req, 200, { count: rows?.length || 0 }, `Branch list for insert retrieved`);
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Branch list for insert error');
    return next(error);
  }
}

async function rolesHandler(req, res, next) {
  try {
    const rows = await Roles();
    logApiSuccess(req, 200, { count: rows?.length || 0 }, `Roles list retrieved`);
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Roles list error');
    return next(error);
  }
}

async function userDeviceHandler(req, res, next) {
  try {
    const rows = await UserDevice();
    logApiSuccess(req, 200, { count: rows?.length || 0 }, `User devices list retrieved`);
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'User devices list error');
    return next(error);
  }
}

async function createWebUserHandler(req, res, next) {
  try {
    const payload = req.body;
    const out = await createWebUser(payload);

    const isSuccess = String(out.Out_errorCode) === '9999';
    if (isSuccess) {
      logApiSuccess(req, 200, { userId: out.Out_User }, `Web User created successfully: ${out.Out_User}`);
    } else {
      logApiError(req, 400, out.Out_ErrorMsg, `WebUser creation failed`);
    }

    auditLog({
      action: 'USER_CREATE',
      actor: req.user?.userId || 'system',
 module: 'users',
      entityId: out.Out_User,
      status: isSuccess ? 'SUCCESS' : 'FAILED',
      details: { outErrorCode: out.Out_errorCode, outErrorMsg: out.Out_ErrorMsg },
      requestMeta: requestMeta(req),
    });

    return res.ok(out);
  } catch (error) {
logApiError(req, 500, error.message, 'User create error');
 return next(error);
  }
}

module.exports = {
  createUserHandler,
  updateUserHandler,
  updateUserStatusHandler,
  updateRoleHandler,
  searchHandler,
  getUserFormOptionsHandler,
  getRegionsHandler,
  getBranchesHandler,
  branchListHandler,
  agentListHandler,
  mobileUserSubmitHandler,
   branchListforInsertHandler,
  rolesHandler, userDeviceHandler, createWebUserHandler
};
