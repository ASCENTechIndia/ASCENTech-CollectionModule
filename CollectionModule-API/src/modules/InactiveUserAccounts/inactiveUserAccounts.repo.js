const oracledb = require('oracledb');
const { executeQuery } = require('../../db/queryExecutor');
const { executeProcedure } = require('../../db/procedureExecutor');

function resolveSourceTable(userType) {
  const normalized = String(userType || '').toLowerCase();
  if (normalized === '1' || normalized === 'inactive') {
    return 'atbss.aoup_history_unassigned_accounts';
  }
  return 'atbss.aoup_history_allunassigned_accounts';
}

async function searchUnallocatedAccounts(filters) {
  const tableName = resolveSourceTable(filters.userType);

  let sql = `
    select *
      from ${tableName} a
     where trunc(a.unallocate_date) between to_date(:startDate, 'DD-Mon-YYYY') and to_date(:endDate, 'DD-Mon-YYYY')
  `;

  const binds = {
    startDate: filters.startDate,
    endDate: filters.endDate,
  };

  const normalizedUserId = String(filters.userId || '').trim();
  if (normalizedUserId && normalizedUserId !== 'E') {
    sql += ' and a.var_bankdata_userid = :userId';
    binds.userId = normalizedUserId;
  }

  sql += ' order by a.unallocate_date desc';

  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

async function unallocateAllUsersAccounts() {
  const statement = `
    BEGIN
      atbss.AOUP_ALLUNASSIGN_ACCOUNTS(
        :out_ErrorCode,
        :out_ErrorMsg
      );
    END;
  `;

  const binds = {
    out_ErrorCode: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    out_ErrorMsg: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 1000 },
  };

  const result = await executeProcedure({ statement, binds, useTx: false });
  return result.outBinds;
}

module.exports = {
  searchUnallocatedAccounts,
  unallocateAllUsersAccounts,
};
