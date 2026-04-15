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

module.exports = {
  getUserLocationTracking, getUserLastLogin, bucketSetter
} 
