const { executeProcedure, executeCatalogQuery } = require('./legacy.repo');

async function runProcedure(procedureName, binds = {}) {
  return executeProcedure(procedureName, binds);
}

async function runCatalogQuery(queryId, binds = {}) {
  return executeCatalogQuery(queryId, binds);
}

module.exports = {
  runProcedure,
  runCatalogQuery,
};
