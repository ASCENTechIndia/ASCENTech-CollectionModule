const {
  getStatesService,
  getDistrictsByStateService,
  getSMABucketsService,
  getProductOptionsService,
  validateAgencyInputService,
  createAgencyService,
  updateAgencyService,
  getAgencyService,
  getAgenciesService,
  deleteAgencyService,
} = require('./agencyCreation.service');
const { auditLog } = require('../../utils/audit-log');
const { logApiSuccess, logApiError } = require('../../utils/log');
const AppError = require('../../utils/app-error');

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

    logApiSuccess(req, 200, result.data, 'States fetched successfully');

    return res.status(200).json(result.data);
  } catch (error) {
    logApiError(req, 400, error.message, 'States fetch failed');
    return next(error);
  }
}

/**
 * Get districts by state
 */
async function getDistrictsByStateHandler(req, res, next) {
  try {
    const { stateId } = req.query;

    const result = await getDistrictsByStateService(stateId);

    logApiSuccess(req, 200, result.data, `Districts fetched for state: ${stateId}`);

    return res.status(200).json(result.data);
  } catch (error) {
    logApiError(req, error.statusCode || 400, error.message, 'Districts fetch failed');
    return next(error);
  }
}

/**
 * Get product options by main product
 */
async function getProductOptionsHandler(req, res, next) {
  try {
    const { mainProduct } = req.query;

    if (!mainProduct) {
      throw new AppError('Main product is required', 400);
    }

    const result = getProductOptionsService(mainProduct);

    logApiSuccess(req, 200, result.data, `Product options fetched for main product: ${mainProduct}`);

    return res.status(200).json(result.data);
  } catch (error) {
    logApiError(req, error.statusCode || 400, error.message, 'Product options fetch failed');
    return next(error);
  }
}

/**
 * Get SMA bucket options
 */
async function getSMABucketsHandler(req, res, next) {
  try {
    const result = getSMABucketsService();

    logApiSuccess(req, 200, result.data, 'SMA buckets fetched successfully');

    return res.status(200).json(result.data);
  } catch (error) {
    logApiError(req, 400, error.message, 'SMA buckets fetch failed');
    return next(error);
  }
}

/**
 * Validate agency input
 */
async function validateAgencyHandler(req, res, next) {
  try {
    const payload = req.body;

    const result = await validateAgencyInputService(payload);

    logApiSuccess(req, 200, result, 'Agency validation successful');

    return res.status(200).json(result);
  } catch (error) {
    logApiError(req, error.statusCode || 400, error.message, 'Agency validation failed');
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

    auditLog({
      action: 'AGENCY_CREATE',
      actor: req.user?.userId || 'system',
      module: 'agencyCreation',
      entityId: payload.agencyName,
      status: 'SUCCESS',
      details: {
        agencyName: payload.agencyName,
        state: payload.stateId,
        district: payload.districtId,
      },
      requestMeta: requestMeta(req),
    });

    logApiSuccess(req, 201, result, `Agency created successfully: ${payload.agencyName}`);

    return res.status(201).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    logApiError(req, error.statusCode || 400, error.message, 'Agency creation failed');

    auditLog({
      action: 'AGENCY_CREATE',
      actor: req.user?.userId || 'system',
      module: 'agencyCreation',
      status: 'FAILED',
      details: { error: error.message },
      requestMeta: requestMeta(req),
    });

    return next(error);
  }
}

/**
 * Update agency
 */
async function updateAgencyHandler(req, res, next) {
  try {
    const payload = req.body;

    const result = await updateAgencyService(payload);

    auditLog({
      action: 'AGENCY_UPDATE',
      actor: req.user?.userId || 'system',
      module: 'agencyCreation',
      entityId: payload.agencyId,
      status: 'SUCCESS',
      details: {
        agencyName: payload.agencyName,
        state: payload.stateId,
        district: payload.districtId,
      },
      requestMeta: requestMeta(req),
    });

    logApiSuccess(req, 200, result, `Agency updated successfully: ${payload.agencyId}`);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    logApiError(req, error.statusCode || 400, error.message, 'Agency update failed');

    auditLog({
      action: 'AGENCY_UPDATE',
      actor: req.user?.userId || 'system',
      module: 'agencyCreation',
      status: 'FAILED',
      details: { error: error.message },
      requestMeta: requestMeta(req),
    });

    return next(error);
  }
}

/**
 * Get agency details
 */
async function getAgencyHandler(req, res, next) {
  try {
    const { agencyId } = req.query;

    const result = await getAgencyService(agencyId);

    logApiSuccess(req, 200, result.data, `Agency details fetched: ${agencyId}`);

    return res.status(200).json(result.data);
  } catch (error) {
    logApiError(req, error.statusCode || 400, error.message, 'Agency details fetch failed');
    return next(error);
  }
}

/**
 * Get all agencies with pagination
 */
async function getAgenciesHandler(req, res, next) {
  try {
    const { pageNumber = 1, pageSize = 10 } = req.query;

    const result = await getAgenciesService(parseInt(pageNumber), parseInt(pageSize));

    logApiSuccess(req, 200, result, `Agencies fetched - Page ${pageNumber}`);

    return res.status(200).json(result);
  } catch (error) {
    logApiError(req, 400, error.message, 'Agencies fetch failed');
    return next(error);
  }
}

/**
 * Delete agency
 */
async function deleteAgencyHandler(req, res, next) {
  try {
    const { agencyId } = req.query;

    const result = await deleteAgencyService(agencyId);

    auditLog({
      action: 'AGENCY_DELETE',
      actor: req.user?.userId || 'system',
      module: 'agencyCreation',
      entityId: agencyId,
      status: 'SUCCESS',
      details: { agencyId },
      requestMeta: requestMeta(req),
    });

    logApiSuccess(req, 200, result, `Agency deleted: ${agencyId}`);

    return res.status(200).json(result);
  } catch (error) {
    logApiError(req, error.statusCode || 400, error.message, 'Agency deletion failed');

    auditLog({
      action: 'AGENCY_DELETE',
      actor: req.user?.userId || 'system',
      module: 'agencyCreation',
      status: 'FAILED',
      details: { error: error.message },
      requestMeta: requestMeta(req),
    });

    return next(error);
  }
}

module.exports = {
  getStatesHandler,
  getDistrictsByStateHandler,
  getProductOptionsHandler,
  getSMABucketsHandler,
  validateAgencyHandler,
  createAgencyHandler,
  updateAgencyHandler,
  getAgencyHandler,
  getAgenciesHandler,
  deleteAgencyHandler,
};
