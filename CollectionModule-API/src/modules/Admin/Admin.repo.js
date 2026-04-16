const oracledb = require('oracledb');
const { executeQuery } = require('../../db/queryExecutor');
const { executeProcedure } = require('../../db/procedureExecutor');

function normalizeNullable(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  return value;
}

async function getUserLocationTracking(userId, cDate) {
  let sql = `
    SELECT userid, location, TO_CHAR(cdate, 'DD/MM/YYYY') AS cdate FROM etech.aoup_userLocation WHERE 
    userid = :userId AND TRUNC(cdate) = TO_DATE(:cDate, 'YYYY-MM-DD')
    order by ROWID DESC FETCH FIRST 1 ROW ONLY
  `;

  const binds = { userId: userId, cDate: cDate };
  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

async function getUserLastLogin(userId) {
  let sql = `
  SELECT * FROM (
        SELECT 
            userid, 
            ip_address, 
            TO_CHAR(log_date, 'DD-MON-YYYY HH:MI:SS AM') AS log_date 
        FROM atbss.Aoup_user_ip_log 
        WHERE userid = :userId
        ORDER BY log_date DESC
    ) 
    WHERE ROWNUM <= 10
  `;

  const binds = { userId: userId};
  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

async function bucketSetter() {
  const statement = `
    BEGIN
      atbss.Aoup_update_typesubcase(
        :p_output,
        :p_updated_count
      );
    END;
  `;

  const binds = {
    p_output: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    p_updated_count: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
  };

  const result = await executeProcedure({ statement, binds, useTx: false });

  const output = result.outBinds.p_output;
  const count = result.outBinds.p_updated_count;

  let message = "";
  if (output === 9999) {
    message = `Mobile Bucket set Successfully. ${count} Rows Updated Successfully`;
  } else {
    message = `Error: Something went wrong`;
  }

  return {
    errorcode: output,
    p_updated_count: count,
    message: message
  };
}

async function fetchUsersWithPincodes() {
  const sql = `
    SELECT
      var_bankdata_userid,
      num_bankdata_pincode
    FROM atbss.aoup_etech_bankdata
    WHERE var_bankdata_userid IS NOT NULL
    GROUP BY var_bankdata_userid, num_bankdata_pincode
    ORDER BY var_bankdata_userid, num_bankdata_pincode
  `;

  const result = await executeQuery(sql);
  const rows = result.rows || [];

  const grouped = {};
  for (const row of rows) {
    const userId = String(row.VAR_BANKDATA_USERID || '').trim();
    const pincode = String(row.NUM_BANKDATA_PINCODE || '').trim();

    if (!userId) continue;
    if (!grouped[userId]) {
      grouped[userId] = [];
    }
    if (pincode && !grouped[userId].includes(pincode)) {
      grouped[userId].push(pincode);
    }
  }

  const users = Object.entries(grouped).map(([userId, pincodes]) => ({
    userId,
    pincodes: pincodes.sort(),
  }));

  return users;
}

async function unassignCases(selections) {
  if (!selections || !Array.isArray(selections) || selections.length === 0) {
    throw new Error('No selections provided');
  }

  let totalRowsUpdated = 0;

  for (const selection of selections) {
    const userId = String(selection.userId || '').trim();
    const pincodes = Array.isArray(selection.pincodes) ? selection.pincodes : [];

    if (!userId || pincodes.length === 0) continue;

    const pincodePlaceholders = pincodes.map((_, i) => `:pincode${i}`).join(',');
    const binds = { userId };

    pincodes.forEach((pincode, i) => {
      binds[`pincode${i}`] = String(pincode).trim();
    });

    const updateSql = `
      UPDATE atbss.aoup_etech_bankdata
      SET VAR_BANKDATA_USERID = NULL
      WHERE VAR_BANKDATA_USERID = :userId
        AND num_bankdata_pincode IN (${pincodePlaceholders})
    `;

    const updateResult = await executeQuery(updateSql, binds);
    totalRowsUpdated += Number(updateResult?.rowsAffected || 0);
  }

  return {
    success: true,
    totalRowsUpdated,
    message: `Cases unassigned successfully! Total rows updated: ${totalRowsUpdated}`,
  };
}

module.exports = {
  getUserLocationTracking,
  getUserLastLogin,
  bucketSetter,
  fetchUsersWithPincodes,
  unassignCases,
} 
