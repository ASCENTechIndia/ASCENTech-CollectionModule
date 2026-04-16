const {
   zoneDropdown, regionService, branchService, collAssociateService, transDetailsService,
   getImageService
} = require('./TransactionReport.service');
const { auditLog } = require('../../utils/audit-log');
const { logApiSuccess, logApiError } = require('../../utils/log');

function requestMeta(req) {
  return {
    ip: req.ip,
    method: req.method,
    path: req.originalUrl,
  };
}


async function zoneInReportHandler(req, res, next) {
  try {
    const { brid, brcategory } = req.query;
    const data = await zoneDropdown({ brid, brcategory });
    return res.ok({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    return next(error);
  }
}

async function regionsHandler(req, res, next) {
  try {
      const { zoneId, brid, brcategory } = req.query;
    const data = await regionService({ zoneId, brid, brcategory });
    logApiSuccess( req, 200, { count: data.length }, 'Regions received' );
    return res.ok(data);
  } catch (error) {
    logApiError(req, 500, error.message, 'Regions search error');
    return next(error);
  }
}

async function branchHandler(req, res, next) {
  try {
   const { regionId, brid, brcategory } = req.query;
    const data = await branchService({ regionId, brid, brcategory });
    logApiSuccess( req, 200, { count: data.length }, 'Branches received' );
    return res.ok(data);
  } catch (error) {
    logApiError(req, 500, error.message, 'Branches search error');
    return next(error);
  }
}

async function collAssociateHandler(req, res, next) {
  try {
    const { brid } = req.query;
    const data = await collAssociateService({ brid });
    logApiSuccess( req, 200, { count: data.length }, 'Collection Associates received' );
    return res.ok(data);
  } catch (error) {
    logApiError(req, 500, error.message, 'Collection Associates search error');
    return next(error);
  }
}

async function transDetailsHandler(req, res, next) {
  try {
    const {
      fromDate,
      toDate,
      smaType,
      brid,
      userId,
      associateId,
      transtype,
      zoneName,
      regionId, userOf
    } = req.query;

    const data = await transDetailsService({
      fromDate,
      toDate,
      smaType,
      brid,
      userId,
      associateId,
      transtype,
      zoneName,
      regionId, userOf
    });

    logApiSuccess(
      req,
      200,
      { count: Array.isArray(data) ? data.length : 0 },
      'Transaction Details received'
    );

    return res.ok(data);

  } catch (error) {
    logApiError(
      req,
      500,
      error.message,
      'Transaction Details search error'
    );
    return next(error);
  }
}

async function getImageHandler(req, res, next) {
  try {
    const { imageCode } = req.query;
    const data = await getImageService({ imageCode });
    logApiSuccess( req, 200, { count: data.length }, 'Image received' );
    return res.ok(data);
  } catch (error) {
    logApiError(req, 500, error.message, 'Image search error');
    return next(error);
  }
}

module.exports = {
 zoneInReportHandler, regionsHandler, branchHandler, collAssociateHandler, transDetailsHandler,
 getImageHandler
};