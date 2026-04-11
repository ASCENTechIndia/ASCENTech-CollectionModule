const {
  register,
  assign,
  transfer,
  updateStatus,
} = require('./assets.service');
const { auditLog } = require('../../utils/audit-log');
const { logApiSuccess, logApiError } = require('../../utils/log');

function requestMeta(req) {
  return {
    ip: req.ip,
    method: req.method,
    path: req.originalUrl,
  };
}

async function registerHandler(req, res, next) {
  try {
    const payload = req.body;
    const out = await register(payload);

    const isSuccess = String(out.out_ErrorCode) === '-100';
    if (isSuccess) {
      logApiSuccess(req, 200, { assetId: payload.properties[0]?.Assetid }, `Asset registered successfully`);
    } else {
      logApiError(req, 400, out.Out_ErrorMsg, `Asset registration failed`);
    }

    auditLog({
      action: 'ASSET_REGISTER',
      actor: req.user?.userId || payload.in_UserId,
      module: 'assets',
      entityId: payload.properties[0]?.Assetid,
      status: isSuccess ? 'SUCCESS' : 'FAILED',
      details: { outErrorCode: out.out_ErrorCode, outErrorMsg: out.Out_ErrorMsg },
      requestMeta: requestMeta(req),
    });

    return res.ok(out);
  } catch (error) {
    logApiError(req, 500, error.message, 'Asset register error');
    return next(error);
  }
}

async function assignHandler(req, res, next) {
  try {
    const payload = req.body;
    const out = await assign(payload);

    const isSuccess = String(out.out_ErrorCode) === '-100';
    if (isSuccess) {
      logApiSuccess(req, 200, { assetId: payload.in_AssetString, assignee: payload.in_AssUser }, `Asset assigned successfully`);
    } else {
      logApiError(req, 400, out.out_ErrorMsg, `Asset assignment failed`);
    }

    auditLog({
      action: 'ASSET_ASSIGN',
      actor: req.user?.userId || payload.in_UserId,
      module: 'assets',
      entityId: payload.in_AssetString,
      status: isSuccess ? 'SUCCESS' : 'FAILED',
      details: { outErrorCode: out.out_ErrorCode, outErrorMsg: out.out_ErrorMsg, assignee: payload.in_AssUser },
      requestMeta: requestMeta(req),
    });

    return res.ok(out);
  } catch (error) {
    logApiError(req, 500, error.message, 'Asset assign error');
    return next(error);
  }
}

async function transferHandler(req, res, next) {
  try {
    const payload = req.body;
    const out = await transfer(payload);

    const isSuccess = String(out.out_ErrorCode) === '-100';
    if (isSuccess) {
      logApiSuccess(req, 200, { assetId: payload.in_assetid, targetBranch: payload.in_transbrid }, `Asset transferred successfully`);
    } else {
      logApiError(req, 400, out.Out_ErrorMsg, `Asset transfer failed`);
    }

    auditLog({
      action: 'ASSET_TRANSFER',
      actor: req.user?.userId || payload.in_UserId,
      module: 'assets',
      entityId: payload.in_assetid,
      status: isSuccess ? 'SUCCESS' : 'FAILED',
      details: { outErrorCode: out.out_ErrorCode, outErrorMsg: out.Out_ErrorMsg, targetBranch: payload.in_transbrid },
      requestMeta: requestMeta(req),
    });

    return res.ok(out);
  } catch (error) {
    logApiError(req, 500, error.message, 'Asset transfer error');
    return next(error);
  }
}

async function updateStatusHandler(req, res, next) {
  try {
    const payload = req.body;
    const out = await updateStatus(payload);

    const isSuccess = String(out.out_ErrorCode) === '-100';
    if (isSuccess) {
      logApiSuccess(req, 200, { assetId: payload.in_AssetString }, `Asset status updated successfully`);
    } else {
      logApiError(req, 400, out.out_ErrorMsg, `Asset status update failed`);
    }

    auditLog({
      action: 'ASSET_STATUS_UPDATE',
      actor: req.user?.userId || payload.in_UserId,
      module: 'assets',
      entityId: payload.in_AssetString,
      status: isSuccess ? 'SUCCESS' : 'FAILED',
      details: { outErrorCode: out.out_ErrorCode, outErrorMsg: out.out_ErrorMsg },
      requestMeta: requestMeta(req),
    });

    return res.ok(out);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  registerHandler,
  assignHandler,
  transferHandler,
  updateStatusHandler,
};
