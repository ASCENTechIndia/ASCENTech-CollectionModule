const oracledb = require('oracledb');
const { executeQuery } = require('../../db/queryExecutor');
const { executeProcedure } = require('../../db/procedureExecutor');

function normalizeNullable(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  return value;
}


async function getPincodes() {
  let sql = `
 select var_pincode_no from 
 atbss.aoup_pincode_master where 
 var_pincode_active='Y' order by var_pincode_no
  `;

  const binds = {};
  const result = await executeQuery(sql, binds);
  return result.rows || [];
}


async function getUsernamebyId(userId) {
  let sql = `
   select a.var_usermst_userfullname,b.var_userlevelmst_status,a.VAR_USERMST_USERID from etech.aoup_usermst_def a
                left outer join etech.aoup_userlevelmst_def b on b.var_userlevelmst_id=a.var_usermst_status  
                inner join etech.branchlist c on c.brid=a.num_usermst_brid  
                 where a.var_usermst_userid=   'E' ||  :userId and  VAR_USERMST_STATUS != 'I'
  `;

  const binds = { userId: Number(userId) };
  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

async function getPincodebyId(userId) {
  let sql = `
  select var_user_pincode from atbss.aoup_user_pincode_map where var_user_userid= :userId 
  `;

  const binds = { userId: userId };
  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

async function assignPincodeIns(payload) {
  const statement = `
    BEGIN
      atbss.aoup_user_pincode_map_ins(
        :in_UserName,
        :in_pincode_str,
        :out_data,
        :out_errcode
      );
    END;
  `;

  const binds = {
    in_UserName: Number(payload.username),
    in_pincode_str: payload.pincode_str ?? null,

    out_data: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 10000 },
    out_errcode: {dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
  };

  const result = await executeProcedure({ statement, binds, useTx: false });
  return result.outBinds;
}

module.exports = {
  getPincodes, getUsernamebyId, getPincodebyId, assignPincodeIns } 
