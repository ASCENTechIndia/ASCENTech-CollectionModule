const {
  accAllocationService,
  userRouteService,
  userRouteExportService,
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

async function userRouteHandler(req, res, next) {
  try {
    const payload = {
      ...req.query,
      userof: req.query.userof || req.user?.userof,
    };

    const data = await userRouteService(payload);
    logApiSuccess(req, 200, { count: data?.rows?.length || 0 }, 'User route report completed');
    return res.ok(data);
  } catch (error) {
    const status = error?.statusCode || 500;
    if (status < 500) {
      return res.fail(error.message, status);
    }

    logApiError(req, 500, error.message, 'User route report error');
    return next(error);
  }
}

async function userRouteExportHandler(req, res, next) {
  try {
    const payload = {
      ...req.query,
      userof: req.query.userof || req.user?.userof,
    };

    const file = await userRouteExportService(payload);
    logApiSuccess(req, 200, { count: file?.rowCount || 0 }, 'User route export completed');

    res.setHeader('Content-Disposition', `attachment; filename=${file.fileName}`);
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    return res.status(200).send(file.csv);
  } catch (error) {
    const status = error?.statusCode || 500;
    if (status < 500) {
      return res.fail(error.message, status);
    }

    logApiError(req, 500, error.message, 'User route export error');
    return next(error);
  }
}


module.exports = {
  accAllocationHandler,
  userRouteHandler,
  userRouteExportHandler,
};
