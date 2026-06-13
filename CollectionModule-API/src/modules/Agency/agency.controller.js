const {
  getStatesService,
  getDistrictsService,
  createAgencyService,
} = require('./agency.service');
const { auditLog } = require('../../utils/audit-log');
const { logApiSuccess, logApiError } = require('../../utils/log');

function requestMeta(req) {
  return {
    ip: req.ip,
    method: req.method,
    path: req.originalUrl,
  };
}

/**
 * Get all states
 */
async function getStatesHandler(req, res, next) {
  try {
    const result = await getStatesService();

    if (result.success) {
      logApiSuccess(req, 200, result.data, 'States retrieved successfully');
    } else {
      logApiError(req, 400, 'Failed to retrieve states', 'Get states error');
    }

    return res.ok(result);
  } catch (error) {
    logApiError(req, 500, error.message, 'Get states error');
    return next(error);
  }
}

/**
 * Get districts by state
 */
async function getDistrictsHandler(req, res, next) {
  try {
    const { stateID } = req.query;

    if (!stateID) {
      return res.badRequest({ message: 'State ID is required' });
    }

    const result = await getDistrictsService(parseInt(stateID));

    if (result.success) {
      logApiSuccess(req, 200, result.data, `Districts retrieved for state ${stateID}`);
    } else {
      logApiError(req, 400, 'Failed to retrieve districts', 'Get districts error');
    }

    return res.ok(result);
  } catch (error) {
    logApiError(req, 500, error.message, 'Get districts error');
    return next(error);
  }
}

/**
 * Create new agency
 */
async function createAgencyHandler(req, res, next) {
  try {
    const payload = req.body;
    const result = await createAgencyService(payload);

    const isSuccess = result.success && result.rowsAffected > 0;
    
    if (isSuccess) {
      logApiSuccess(req, 201, { agencyName: payload.agencyName }, 'Agency created successfully');
      
      auditLog({
        action: 'AGENCY_CREATE',
        actor: req.user?.userId || 'system',
        module: 'agency',
        entityId: payload.agencyName,
        status: 'SUCCESS',
        details: { rowsAffected: result.rowsAffected },
        requestMeta: requestMeta(req),
      });
    } else {
      logApiError(req, 400, result.message, 'Agency creation failed');
      
      auditLog({
        action: 'AGENCY_CREATE',
        actor: req.user?.userId || 'system',
        module: 'agency',
        entityId: payload.agencyName,
        status: 'FAILED',
        details: { message: result.message },
        requestMeta: requestMeta(req),
      });
    }

    return res.ok(result);
  } catch (error) {
    logApiError(req, 500, error.message, 'Agency creation error');
    
    auditLog({
      action: 'AGENCY_CREATE',
      actor: req.user?.userId || 'system',
      module: 'agency',
      status: 'ERROR',
      details: { error: error.message },
      requestMeta: requestMeta(req),
    });

    return next(error);
  }
}

module.exports = {
  getStatesHandler,
  getDistrictsHandler,
  createAgencyHandler,
};
