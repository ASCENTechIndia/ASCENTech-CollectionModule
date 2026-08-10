const oracledb = require("oracledb");
const { executeProcedure } = require("../../db/procedureExecutor");

async function insertRepo(payload) {
  const statement = `
  BEGIN
    atbss_cm.aoup_allocation_rules_manager (
      :P_ACTION,
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
      :OUT_ERRORMSG
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

  const result = await executeProcedure({ statement, binds, useTx: false, dbName: "db3" });
  console.log("result :", result)
  return result;
}

async function updateRepo(payload) {
  const statement = `
    BEGIN
      atbss_cm.aoup_allocation_rules_manager(
        :P_ACTION,
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
        :OUT_ERRORMSG
      );
    END;
  `;

  const binds = {
    // UPDATE action
    P_ACTION: "UPDATE",

    // Existing rule ID - must be provided
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

    P_NUM_MIN_COLLECTOR_SUCCESS_RATE:
      payload.minCollectorSuccessRate,

    P_NUM_MIN_COLLECTOR_EXPERIENCE:
      payload.minCollectorExperience,

    P_NUM_ASSIGNED_TO: payload.assignedTo,

    P_VAR_USER: payload.user,

    OUT_CURSOR: {
      dir: oracledb.BIND_OUT,
      type: oracledb.CURSOR,
    },

    OUT_ERRORCODE: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER,
    },

    OUT_ERRORMSG: {
      dir: oracledb.BIND_OUT,
      type: oracledb.STRING,
      maxSize: 4000,
    },
  };

  const result = await executeProcedure({
    statement,
    binds,
    useTx: false,
    dbName: "db3",
  });

  console.log("Update result:", result);

  return result;
}

async function getAllRuleRepo() {
  const statement = `
    BEGIN
      atbss_cm.aoup_allocation_rules_manager(
        :P_ACTION,
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
        :OUT_ERRORMSG
      );
    END;
  `;

  const binds = {
    P_ACTION: "GETALL",

    P_NUM_RULE_ID: null,
    P_VAR_RULE_NAME: null,
    P_VAR_PRIORITY: null,
    P_VAR_STATUS: null,
    P_NUM_MIN_DEBT_AMOUNT: null,
    P_NUM_MAX_DEBT_AMOUNT: null,
    P_NUM_MIN_DEBT_AGE_DAYS: null,
    P_NUM_MAX_DEBT_AGE_DAYS: null,
    P_VAR_ACCOUNT_TYPE: null,
    P_VAR_REGION: null,
    P_NUM_MIN_COLLECTOR_SUCCESS_RATE: null,
    P_NUM_MIN_COLLECTOR_EXPERIENCE: null,
    P_NUM_ASSIGNED_TO: null,
    P_VAR_USER: null,

    OUT_CURSOR: {
      dir: oracledb.BIND_OUT,
      type: oracledb.CURSOR,
    },

    OUT_ERRORCODE: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER,
    },

    OUT_ERRORMSG: {
      dir: oracledb.BIND_OUT,
      type: oracledb.STRING,
      maxSize: 4000,
    },
  };

  const result = await executeProcedure({
    statement,
    binds,
    useTx: false,
    dbName: "db3",
  });

  console.log("Get All result:", result);

  return result;
}

async function getRuleRepo(ruleId) {
  const statement = `
    BEGIN
      atbss_cm.aoup_allocation_rules_manager(
        :P_ACTION,
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
        :OUT_ERRORMSG
      );
    END;
  `;

  const binds = {
    P_ACTION: "GET",

    P_NUM_RULE_ID: Number(ruleId),

    P_VAR_RULE_NAME: null,
    P_VAR_PRIORITY: null,
    P_VAR_STATUS: null,
    P_NUM_MIN_DEBT_AMOUNT: null,
    P_NUM_MAX_DEBT_AMOUNT: null,
    P_NUM_MIN_DEBT_AGE_DAYS: null,
    P_NUM_MAX_DEBT_AGE_DAYS: null,
    P_VAR_ACCOUNT_TYPE: null,
    P_VAR_REGION: null,
    P_NUM_MIN_COLLECTOR_SUCCESS_RATE: null,
    P_NUM_MIN_COLLECTOR_EXPERIENCE: null,
    P_NUM_ASSIGNED_TO: null,
    P_VAR_USER: null,

    OUT_CURSOR: {
      dir: oracledb.BIND_OUT,
      type: oracledb.CURSOR,
    },

    OUT_ERRORCODE: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER,
    },

    OUT_ERRORMSG: {
      dir: oracledb.BIND_OUT,
      type: oracledb.STRING,
      maxSize: 4000,
    },
  };

  const result = await executeProcedure({
    statement,
    binds,
    useTx: false,
    dbName: "db3",
  });

  console.log("Get single result:", result);

  return result;
}



module.exports = {
  insertRepo,
  updateRepo,
  getAllRuleRepo,
  getRuleRepo
};
