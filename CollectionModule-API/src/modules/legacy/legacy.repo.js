const oracledb = require('oracledb');
const { executeQuery } = require('../../db/queryExecutor');
const { executeProcedure: runProcedureExec } = require('../../db/procedureExecutor');
const { procedureCatalog } = require('./procedure-catalog');
const { queryCatalog } = require('./query-catalog');

function buildProcedureBinds(definition, inputBinds = {}) {
  const binds = {};

  for (const [bindName, bindConfig] of Object.entries(definition.binds || {})) {
    if (bindConfig.type === 'in') {
      if (!(bindName in inputBinds)) {
        throw new Error(`Missing required input bind: ${bindName}`);
      }
      binds[bindName] = inputBinds[bindName];
    } else if (bindConfig.type === 'out') {
      binds[bindName] = {
        dir: oracledb.BIND_OUT,
        type: bindConfig.dbType,
        maxSize: bindConfig.maxSize,
      };
    }
  }

  return binds;
}

async function executeProcedure(procedureName, inputBinds = {}) {
  const definition = procedureCatalog[procedureName];
  if (!definition || !definition.statement || !definition.binds) {
    throw new Error(`Procedure not configured for execution: ${procedureName}`);
  }

  const binds = buildProcedureBinds(definition, inputBinds);
  const result = await runProcedureExec({ statement: definition.statement, binds, useTx: false });

  return {
    outBinds: result.outBinds || {},
  };
}

async function executeCatalogQuery(queryId, binds = {}) {
  const definition = queryCatalog[queryId];
  if (!definition) {
    throw new Error(`Query is not allowlisted: ${queryId}`);
  }

  for (const bindName of definition.requiredBinds || []) {
    if (!(bindName in binds)) {
      throw new Error(`Missing required bind: ${bindName}`);
    }
  }

  if (definition.write) {
    const result = await executeQuery(definition.sql, binds, { autoCommit: true });
    return { rowsAffected: result.rowsAffected || 0 };
  }

  const result = await executeQuery(definition.sql, binds);
  return { rows: result.rows || [] };
}

module.exports = {
  executeProcedure,
  executeCatalogQuery,
};
