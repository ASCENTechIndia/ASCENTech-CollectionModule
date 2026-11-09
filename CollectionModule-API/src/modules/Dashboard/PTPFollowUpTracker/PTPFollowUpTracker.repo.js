const oracledb = require("oracledb");
const { executeProcedure } = require("../../../db/procedureExecutor");

async function getPTPKeptCount() {
  const statement = `
    BEGIN
      AOUP_PTP_KEPT_COUNT(
        :P_RESULT
      );
    END;
  `;

  const binds = {
    P_RESULT: {
      dir: oracledb.BIND_OUT,
      type: oracledb.CURSOR,
    },
  };

  const result = await executeProcedure({
    statement,
    binds,
    useTx: false,
    dbName: "db3",
  });

  return {
    ptpKeptCount: result?.outBinds?.P_RESULT || [],
  };
}

async function getPTPFollowUpTracker() {
  const statement = `
    BEGIN
      AOUP_PTP_FOLLOW_UP_TRACKER(
        :P_RESULT
      );
    END;
  `;

  const binds = {
    P_RESULT: {
      dir: oracledb.BIND_OUT,
      type: oracledb.CURSOR,
    },
  };

  const result = await executeProcedure({
    statement,
    binds,
    useTx: false,
    dbName: "db3",
  });

  return {
    ptpFollowUpTracker: result?.outBinds?.P_RESULT || [],
  };
}

async function getPTPSorting() {
  const statement = `
    BEGIN
      AOUP_PTP_SORTING(
        :P_RESULT
      );
    END;
  `;

  const binds = {
    P_RESULT: {
      dir: oracledb.BIND_OUT,
      type: oracledb.CURSOR,
    },
  };

  const result = await executeProcedure({
    statement,
    binds,
    useTx: false,
    dbName: "db3",
  });

  return {
    ptpSorting: result?.outBinds?.P_RESULT || [],
  };
}

module.exports = { getPTPKeptCount ,
  getPTPFollowUpTracker,
  getPTPSorting
};
