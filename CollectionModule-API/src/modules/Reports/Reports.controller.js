const {
  accAllocationService, dailyUploadedReport, pincodeHistoryReport, nonVisitDoneService, overallPerfService,
  visitDoneService, smaSummaryService ,
  userRouteService,
  userRouteExportService, unallocatedCasesService
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

async function pinCodeHistoryHandler(req, res, next) {
  try {
    const rows = await pincodeHistoryReport(req.query);
    logApiSuccess( req, 200, { count: rows?.length || 0 }, 'Inactive User Pincode History Report completed' );
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Inactive User Pincode History Report search error');
    return next(error);
  }
}

async function dailyUploadedReportHandler(req, res, next) {
  try {
    const rows = await dailyUploadedReport(req.query);
    logApiSuccess( req, 200, { count: rows?.length || 0 }, 'Daily Uploaded Report completed' );
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Daily Uploaded Report search error');
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


async function nonVisitDoneHandler(req, res, next) {
  try {
    const rows = await nonVisitDoneService(req.query);
    logApiSuccess( req, 200, { count: rows?.length || 0 }, 'Non Visit Done Summary Report completed' );
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Non Visit Done Summary Report search error');
    return next(error);
  }
}

async function overallPerformanceHandler(req, res, next) {
  try {
    const rows = await overallPerfService(req.query);
    logApiSuccess( req, 200, { count: rows?.length || 0 }, 'Overall Performance Summary Report completed' );
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Overall Performance Summary Report search error');
    return next(error);
  }
}

async function visitDoneHandler(req, res, next) {
  try {
    const rows = await visitDoneService(req.query);
    logApiSuccess( req, 200, { count: rows?.length || 0 }, 'Visit Done Summary Report completed' );
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Visit Done Summary Report search error');
    return next(error);
  }
}

async function smaSummaryHandler(req, res, next) {
  try {
    const rows = await smaSummaryService(req.query);
    logApiSuccess( req, 200, { count: rows?.length || 0 }, 'SMA Summary Report completed' );
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'SMA Summary Report search error');
    return next(error);
  }
}


async function unallocatedCasesHandler(req, res, next) {
  try {
      const { brid, branchName  } = req.query;
    const rows = await unallocatedCasesService({ brid, branchName });
    logApiSuccess( req, 200, { count: rows?.length || 0 }, 'Unallocated Cases Report completed' );
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, 'Unallocated Cases Report search error');
    return next(error);
  }
}

module.exports = {
  accAllocationHandler, dailyUploadedReportHandler, pinCodeHistoryHandler, nonVisitDoneHandler, overallPerformanceHandler,
  visitDoneHandler, smaSummaryHandler,  userRouteHandler,
  userRouteExportHandler, unallocatedCasesHandler
};
