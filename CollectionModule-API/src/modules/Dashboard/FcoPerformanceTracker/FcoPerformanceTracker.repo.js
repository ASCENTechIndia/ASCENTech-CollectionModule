const oracledb = require("oracledb");
const { executeProcedure } = require("../../../db/procedureExecutor");

async function getPerformaceDashboardData(payload) {
  // 1) Summary cards
  const summaryStatement = `
    BEGIN
      AOUP_FOS_PERFORMANCE_TRACKER(:P_RESULT);
    END;
  `;
  const summaryBinds = {
    P_RESULT: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
  };

  // 2) Activity breakdown by officer
  const activityStatement = `
    BEGIN
      aoup_Activity_breakdown_by_officer(:Out_data);
    END;
  `;
  const activityBinds = {
    Out_data: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
  };

  // 2) Activity breakdown by officer
  const feedbackStatement = `
    BEGIN
      AOUP_GET_FEEDBACK_PERFORMANCE(:P_RESULT);
    END;
  `;
  const feedbackBinds = {
    P_RESULT: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
  };

  const [summaryResult, activityResult, feedbackResult] = await Promise.all([
    executeProcedure({
      statement: summaryStatement, 
      binds: summaryBinds, 
      useTx: false,
      dbName: "db3",
    }),
    executeProcedure({
      statement: activityStatement,
      binds: activityBinds,
      useTx: false,
      dbName: "db3",
    }),
    executeProcedure({
      statement: feedbackStatement,
      binds: feedbackBinds,
      useTx: false,
      dbName: "db3",
    }),
  ]);

  return {
    summaryCards: summaryResult?.outBinds?.P_RESULT || [],
    activityBreakdown: activityResult?.outBinds?.Out_data || [],
    feedbackPerformance: feedbackResult?.outBinds?.P_RESULT || [],
  };
}

module.exports = { getPerformaceDashboardData };
