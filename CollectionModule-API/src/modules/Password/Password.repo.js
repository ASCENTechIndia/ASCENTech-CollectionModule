const oracledb = require('oracledb');
const { executeQuery } = require('../../db/queryExecutor');
const { executeProcedure } = require('../../db/procedureExecutor');
 
async function resetPwd(userId) {

  const fullUserId = "E" + String(userId).trim();  
  const password = "Cbi2024!";

  await executeQuery(
    `UPDATE etech.aoup_usermst_def
     SET var_usermst_password1 = :password
     WHERE var_usermst_userid = :userId`,
    { userId: fullUserId, password },
    { autoCommit: true }
  );

  await executeQuery(
    `UPDATE asadmins.aoup_user_def
     SET var_user_password1 = :password
     WHERE var_user_username = :userId`,
    { userId: fullUserId, password },
    { autoCommit: true }
  );

  return {password };
}

async function getusertypeanddesig(userId) {
  let sql = `
    select 
        a.var_usermst_userid,
        a.NUM_USERMST_DESGID,
        a.NUM_USERMST_USERTYPE
    from etech.aoup_usermst_def a
    left outer join etech.aoup_userlevelmst_def b 
        on b.var_userlevelmst_id = a.var_usermst_status  
    inner join etech.branchlist c 
        on c.brid = a.num_usermst_brid  
    where a.var_usermst_userid = 'E' || :userId
    and a.VAR_USERMST_STATUS != 'I'
  `;

  const binds = { userId: String(userId).trim() };

  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

async function changepwdIns(payload) {
  const statement = `
    BEGIN
      etech.aoup_changepassword_ins(
        :in_UserId,
        :in_OldPassword,
        :in_NewPassword, 
        :out_ErrorCode,
        :out_ErrorMsg
      );
    END;
  `;

   const cleanUserId = String(payload.userId).trim();
  const fullUserId = cleanUserId.startsWith("E")
    ? cleanUserId
    : "E" + cleanUserId;

  const binds = {
    in_UserId: fullUserId,
    in_OldPassword: payload.oldPassword,
    in_NewPassword: payload.newPassword,
    out_ErrorCode: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    out_ErrorMsg: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 10000 },
  };

  const result = await executeProcedure({ statement, binds, useTx: false });
  return result.outBinds;
}

module.exports = {
  resetPwd, getusertypeanddesig, changepwdIns } 
