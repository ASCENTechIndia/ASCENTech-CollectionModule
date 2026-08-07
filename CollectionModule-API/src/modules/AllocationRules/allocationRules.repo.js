const oracledb = require("oracledb");
const { executeProcedure } = require("../../db/procedureExecutor");

async function insertRepo(payload) {
  const statement = `
    BEGIN etech_cm.aoup_allocation_rules_manager(
        :P_ACTION,,
        :P_NUM_RULE_ID,
        :P_VAR_RULE_NAME,
        :P_VAR_PRIORITY,
        :P_VAR_STATUS,
        :P_NUM_MIN_DEBT_AMOUNT,
        :P_NUM_MAX_DEBT_AMOUNT,
        :P_NUM_MIN_DEBT_AGE_DAYS,
        :P_NUM_MAX_DEBT_AGE_DAYS,
        :P_VAR_ACCOUNT_TYPE,
        :P_VAR_REGION,
        :P_NUM_MIN_COLLECTOR_SUCCESS_RATE,
        :P_NUM_MIN_COLLECTOR_EXPERIENCE,
        :P_NUM_ASSIGNED_TO,
        :P_VAR_USER,
        :OUT_CURSOR,
        :OUT_ERRORCODE,
        :OUT_ERRORMSG,
    );
    END;
    `;
  const binds = {
    P_ACTION: payload.action,
    P_NUM_RULE_ID: Number(payload.ruleId),
    P_VAR_RULE_NAME: payload.ruleName,
    P_VAR_PRIORITY: payload.priority,
    P_VAR_STATUS: payload.status,
    P_NUM_MIN_DEBT_AMOUNT: Number(payload.minDebtAmount),
    P_NUM_MAX_DEBT_AMOUNT: Number(payload.maxDebtAmount),
    P_NUM_MIN_DEBT_AGE_DAYS: Number(payload.minDebtAgeDays),
    P_NUM_MAX_DEBT_AGE_DAYS: Number(payload.maxDebtAgeDays),
    P_VAR_ACCOUNT_TYPE: payload.accountType,
    P_VAR_REGION: payload.region,
    P_NUM_MIN_COLLECTOR_SUCCESS_RATE: payload.minCollectorSuccessRate,
    P_NUM_MIN_COLLECTOR_EXPERIENCE: payload.minCollectorExperience,
    P_NUM_ASSIGNED_TO: payload.assignedTo,
    P_VAR_USER: payload.user,
    OUT_CURSOR: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
    OUT_ERRORCODE: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER,
      maxSize: 100,
    },
    OUT_ERRORMSG: {
      dir: oracledb.BIND_OUT,
      type: oracledb.STRING,
      maxSize: 4000,
    },
  };

  const result = await executeProcedure({ statement, binds, useTx: false });
  console.log("result :", result)
  return result;
}

module.exports = {
  insertRepo,
};
