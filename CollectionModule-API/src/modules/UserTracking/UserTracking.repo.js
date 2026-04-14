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



module.exports = {
  getUserLocationTracking
} 
