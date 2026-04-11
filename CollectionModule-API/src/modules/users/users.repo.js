const oracledb = require('oracledb');
const { executeQuery } = require('../../db/queryExecutor');
const { executeProcedure } = require('../../db/procedureExecutor');

function normalizeNullable(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  return value;
}

async function callUserInsNew(payload) {
  const statement = `
    BEGIN
      aoup_user_ins_New(
        :in_brid,
        :in_userid,
        :in_username,
        :in_userpwd,
        :in_mobno,
        :in_email,
        :in_usertypeid,
        :in_DOB,
        :in_proofno,
        :in_desgid,
        :in_roleid,
        :in_compcode,
        :in_workid,
        :in_empid,
        :in_collectionid,
        :in_categoryid,
        :in_status,
        :in_Empcode,
        :in_firstname,
        :in_lastname,
        :in_prooftype,
        :in_mode,
        :in_compid,
        :in_insby,
        :in_Requeststatus,
        :in_pincode,
        :Out_User,
        :Out_errorCode,
        :Out_ErrorMsg
      );
    END;
  `;

  const binds = {
    in_brid: payload.in_brid,
    in_userid: normalizeNullable(payload.in_userid),
    in_username: payload.in_username,
    in_userpwd: null,
    in_mobno: payload.in_mobno,
    in_email: payload.in_email,
    in_usertypeid: payload.in_usertypeid,
    in_DOB: normalizeNullable(payload.in_DOB),
    in_proofno: normalizeNullable(payload.in_proofno),
    in_desgid: payload.in_desgid,
    in_roleid: payload.in_roleid,
    in_compcode: payload.in_compcode,
    in_workid: payload.in_workid,
    in_empid: payload.in_empid ?? null,
    in_collectionid: payload.in_collectionid,
    in_categoryid: payload.in_categoryid,
    in_status: payload.in_status,
    in_Empcode: payload.in_Empcode,
    in_firstname: normalizeNullable(payload.in_firstname),
    in_lastname: normalizeNullable(payload.in_lastname),
    in_prooftype: payload.in_prooftype,
    in_mode: payload.in_mode,
    in_compid: payload.in_compid,
    in_insby: payload.in_insby,
    in_Requeststatus: normalizeNullable(payload.in_Requeststatus) || 'A',
    in_pincode: payload.in_pincode ?? null,
    Out_User: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 100 },
    Out_errorCode: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    Out_ErrorMsg: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 10000 },
  };

  const result = await executeProcedure({ statement, binds, useTx: false });
  return result.outBinds;
}

async function callUserIns(payload) {
  const statement = `
    BEGIN
      aoup_user_ins(
        :in_brid,
        :in_Requeststatus,
        :in_userid,
        :in_username,
        :in_userpwd,
        :in_mobno,
        :in_email,
        :in_usertypeid,
        :in_DOB,
        :in_proofno,
        :in_desgid,
        :in_roleid,
        :in_compcode,
        :in_workid,
        :in_empid,
        :in_collectionid,
        :in_categoryid,
        :in_mode,
        :in_status,
        :in_Empcode,
        :in_firstname,
        :in_lastname,
        :in_prooftype,
        :in_compid,
        :in_insby,
        :Out_errorCode,
        :Out_ErrorMsg,
        :Out_User
      );
    END;
  `;

  const binds = {
    in_brid: payload.in_brid,
    in_Requeststatus: normalizeNullable(payload.in_Requeststatus),
    in_userid: normalizeNullable(payload.in_userid),
    in_username: payload.in_username,
    in_userpwd: null,
    in_mobno: payload.in_mobno,
    in_email: payload.in_email,
    in_usertypeid: payload.in_usertypeid,
    in_DOB: normalizeNullable(payload.in_DOB),
    in_proofno: normalizeNullable(payload.in_proofno),
    in_desgid: payload.in_desgid,
    in_roleid: payload.in_roleid,
    in_compcode: payload.in_compcode,
    in_workid: payload.in_workid,
    in_empid: payload.in_empid ?? null,
    in_collectionid: payload.in_collectionid,
    in_categoryid: payload.in_categoryid,
    in_mode: payload.in_mode,
    in_status: payload.in_status,
    in_Empcode: payload.in_Empcode,
    in_firstname: normalizeNullable(payload.in_firstname),
    in_lastname: normalizeNullable(payload.in_lastname),
    in_prooftype: payload.in_prooftype,
    in_compid: payload.in_compid,
    in_insby: payload.in_insby,
    Out_errorCode: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    Out_ErrorMsg: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 1000 },
    Out_User: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 100 },
  };

  const result = await executeProcedure({ statement, binds, useTx: false });
  return result.outBinds;
}

async function callUserStatusUpdate(payload) {
  const statement = `
    BEGIN
      aoup_userstatus_upd(
        :in_UserId,
        :in_ddlstatus,
        :in_reason,
        :in_insby,
        :out_ErrorCode,
        :out_ErrorMsg
      );
    END;
  `;

  const binds = {
    in_UserId: payload.in_UserId,
    in_ddlstatus: payload.in_ddlstatus,
    in_reason: normalizeNullable(payload.in_reason),
    in_insby: payload.in_insby,
    out_ErrorCode: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    out_ErrorMsg: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 1000 },
  };

  const result = await executeProcedure({ statement, binds, useTx: false });
  return result.outBinds;
}

async function searchUsers(filters) {
  let sql = `
    select replace(var_usermst_userid,'E','') username,
           var_usermst_userid userid,
           var_usermst_userfullname empname,
           var_usermst_empcode empcode,
           num_usermst_mobileno mobno,
           num_usermst_email email,
           var_designation_designation desg,
           var_userrole_name role_name,
           num_usermst_roleid role_id,
           var_usermst_status status,
           num_usermst_brid brid
      from aoup_usermst_def a
      left outer join aoup_designation_def d on d.num_designation_id = a.num_usermst_desgid
      left outer join aoup_userrole_mas r on r.num_userrole_id = a.num_usermst_roleid
     where 1 = 1
  `;

  const binds = {};

  if (filters.brid) {
    sql += ' and num_usermst_brid = :brid';
    binds.brid = Number(filters.brid);
  }
  if (filters.userId) {
    sql += ' and var_usermst_userid = :userId';
    binds.userId = filters.userId.startsWith('E') ? filters.userId : `E${filters.userId}`;
  }
  if (filters.empCode) {
    sql += ' and var_usermst_empcode = :empCode';
    binds.empCode = filters.empCode;
  }
  if (filters.status) {
    sql += ' and var_usermst_status = :status';
    binds.status = filters.status;
  }
  if (filters.roleId) {
    sql += ' and num_usermst_roleid = :roleId';
    binds.roleId = Number(filters.roleId);
  }

  sql += ' order by var_usermst_userid';

  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

async function updateUserRole(payload) {
  const normalizedUserId = payload.userId.startsWith('E') ? payload.userId : `E${payload.userId}`;

  const detailSql = `
    select num_usermst_brid in_brid,
           var_usermst_userid in_userid,
           var_usermst_userfullname in_username,
           num_usermst_mobileno in_mobno,
           num_usermst_email in_email,
           num_usermst_usertype in_usertypeid,
           to_char(date_usermst_dob, 'YYYY-MM-DD"T"HH24:MI:SS') in_DOB,
           num_usermst_idproofno in_proofno,
           num_usermst_desgid in_desgid,
           num_usermst_compcode in_compcode,
           num_usermst_workingid in_workid,
           num_usermst_empid in_empid,
           num_usermst_collectionid in_collectionid,
           num_usermst_categorisation in_categoryid,
           var_usermst_status in_status,
           var_usermst_empcode in_Empcode,
           var_usermst_userfirstname in_firstname,
           var_usermst_userlastname in_lastname,
           num_usermst_userprooftype in_prooftype,
           num_usermst_compid in_compid
      from aoup_usermst_def
     where var_usermst_userid = :userId
  `;

  const detailResult = await executeQuery(detailSql, { userId: normalizedUserId });
  if (!detailResult.rows || detailResult.rows.length === 0) {
    return { rowsAffected: 0, reason: 'USER_NOT_FOUND' };
  }

  const current = detailResult.rows[0];
  const out = await callUserIns({
    in_brid: Number(current.IN_BRID),
    in_Requeststatus: 'A',
    in_userid: String(current.IN_USERID),
    in_username: String(current.IN_USERNAME),
    in_mobno: Number(current.IN_MOBNO),
    in_email: String(current.IN_EMAIL),
    in_usertypeid: Number(current.IN_USERTYPEID),
    in_DOB: current.IN_DOB || null,
    in_proofno: current.IN_PROOFNO ? String(current.IN_PROOFNO) : null,
    in_desgid: Number(current.IN_DESGID),
    in_roleid: payload.roleId,
    in_compcode: Number(current.IN_COMPCODE),
    in_workid: Number(current.IN_WORKID),
    in_empid: current.IN_EMPID ? Number(current.IN_EMPID) : null,
    in_collectionid: Number(current.IN_COLLECTIONID),
    in_categoryid: Number(current.IN_CATEGORYID),
    in_mode: payload.mode ?? 2,
    in_status: String(current.IN_STATUS),
    in_Empcode: String(current.IN_EMPCODE),
    in_firstname: current.IN_FIRSTNAME ? String(current.IN_FIRSTNAME) : null,
    in_lastname: current.IN_LASTNAME ? String(current.IN_LASTNAME) : null,
    in_prooftype: Number(current.IN_PROOFTYPE),
    in_compid: Number(current.IN_COMPID),
    in_insby: payload.insBy,
  });

  return {
    rowsAffected: String(out.Out_errorCode) === '-100' ? 1 : 0,
    out,
  };
}

async function branchListbyCategory(filters) {
  let sql = `select * from etech.branchlist`;
  const binds = {};

  let conditions = [];

  let column = "";
  if (filters.brcategory == 5) {
    column = "brid";
  } else {
    column = "compid";
  }

  if (filters.userLevel === "Zone") {
    conditions.push(`${column} = :val`);
    binds.val = 10001;
  } 
  else if (filters.userLevel === "Branch") {
    conditions.push(`${column} = :val`);
    binds.val = 10002;
  } 
  else if (filters.userLevel === "Region") {
    conditions.push(`(${column} = :val OR brcategory = 4)`);
    binds.val = 10017;
  }

  // ✅ condition नसेल तर error throw कर
  if (conditions.length === 0) {
    throw new Error("Invalid or missing userLevel");
  }

  sql += " WHERE " + conditions.join(" AND ");

  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

async function agentDetailsbyBrid(brid) {
  let sql = `
  select replace(var_usermst_userid,'E','') username,var_usermst_userid userid,var_usermst_userfullname empname,var_usermst_empcode empcode,
   num_usermst_mobileno mobno,num_usermst_email email,var_designation_designation desg,var_userrole_name  from etech.aoup_usermst_def a 
             left outer join etech.aoup_designation_def on num_designation_id = num_usermst_desgid 
             left outer join etech.aoup_userrole_mas on num_userrole_id = num_usermst_roleid 
            where num_usermst_brid = :brid order by var_usermst_userid 
  `;

  const binds = { brid: Number(brid) };
  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

module.exports = {
  callUserInsNew,
  callUserIns,
  callUserStatusUpdate,
  searchUsers,
  updateUserRole, branchListbyCategory, agentDetailsbyBrid
};
