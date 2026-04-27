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
                 where a.var_usermst_userid= :userId and  VAR_USERMST_STATUS != 'I'
  `;

  const binds = { userId: userId };
  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

async function getPincodebyId(userId) {

  let sql = `
  select var_user_pincode from atbss.aoup_user_pincode_map where var_user_userid= :userId 
  `;

  const binds = { userId: cleanUserId };
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

async function insertPincodeMasterIns(pincode) {
  const statement = `
    BEGIN
      atbss.AOUP_Pincode_Master_Insertion(
        :in_pincode,
        :out_ErrorCode,
        :out_ErrorMsg
      );
    END;
  `;

  const binds = {
    in_pincode: Number(pincode),
    out_ErrorCode: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    out_ErrorMsg: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 1000 },
  };

  const result = await executeProcedure({ statement, binds, useTx: false });
  return result.outBinds;
}

async function getAllPincodes() {

  const listSql = `
    SELECT 
        pm.VAR_PINCODE_NO,
        pm.VAR_PINCODE_ACTIVE,
        COUNT(bd.NUM_BANKDATA_PINCODE) AS ASSIGNED_COUNT
    FROM atbss.aoup_pincode_master pm
    LEFT JOIN atbss.aoup_etech_bankdata bd
        ON pm.VAR_PINCODE_NO = bd.NUM_BANKDATA_PINCODE
    GROUP BY 
        pm.VAR_PINCODE_NO,
        pm.VAR_PINCODE_ACTIVE
    ORDER BY pm.VAR_PINCODE_NO
  `;

  const summarySql = `
    SELECT 
        COUNT(*) AS TOTAL_PINCODES,

        COUNT(CASE 
            WHEN bd.NUM_BANKDATA_PINCODE IS NOT NULL THEN 1 
        END) AS TOTAL_ASSIGNED,

        COUNT(CASE 
            WHEN bd.NUM_BANKDATA_PINCODE IS NULL THEN 1 
        END) AS TOTAL_UNASSIGNED

    FROM atbss.aoup_pincode_master pm
    LEFT JOIN atbss.aoup_etech_bankdata bd
        ON pm.VAR_PINCODE_NO = bd.NUM_BANKDATA_PINCODE
  `;

  const listResult = await executeQuery(listSql);
  const summaryResult = await executeQuery(summarySql);

  return {
    pincodes: listResult.rows || [],
    summary: summaryResult.rows[0] || {}
  };
}

async function deletePincodeIns(pincode) {
  const statement = `
    BEGIN
      atbss.AOUP_Pincode_master_Manager(
        :in_pincode,
        :out_ErrorCode,
        :out_ErrorMsg
      );
    END;
  `;
  const binds = {
    in_pincode: String(pincode),
    out_ErrorCode: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 100 },
    out_ErrorMsg: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 1000 },
  };
  const result = await executeProcedure({ statement, binds, useTx: false });
  return result.outBinds;
}

module.exports = {
  getPincodes,
  getUsernamebyId,
  getPincodebyId,
  assignPincodeIns,
  insertPincodeMasterIns,
  getAllPincodes,
  deletePincodeIns
}
