const { runProcedure, runCatalogQuery } = require('./legacy.service');
const { logApiSuccess, logApiError } = require('../../utils/log');

async function executeProcedureController(req, res, next) {
  try {
    const payload = req.body;
    logApiSuccess(req, 200, { procedure: payload.procedureName }, `Executing legacy procedure: ${payload.procedureName}`);
    const result = await runProcedure(payload.procedureName, payload.binds);

    return res.ok(result);
  } catch (error) {
    logApiError(req, 500, error.message, `Legacy procedure execution error: ${req.body?.procedureName}`);
    return next(error);
  }
}

async function executeQueryController(req, res, next) {
  try {
    const payload = req.body;
    logApiSuccess(req, 200, { query: payload.queryId }, `Executing legacy query: ${payload.queryId}`);
    const result = await runCatalogQuery(payload.queryId, payload.binds);

    return res.ok(result);
  } catch (error) {
    logApiError(req, 500, error.message, `Legacy query execution error: ${req.body?.queryId}`);
    return next(error);
  }
}

module.exports = {
  executeProcedureController,
  executeQueryController,
};
