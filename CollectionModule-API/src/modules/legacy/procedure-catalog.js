const { oracledb } = require('../../db/oracle');

const procedureCatalog = {
  aoup_login_fetch: {
    statement: `
      BEGIN
        aoup_login_fetch(
          :in_UserId,
          :in_password,
          :Out_CompId,
          :Out_UserName,
          :Out_LastLogin,
          :Out_LastLogOut,
          :Out_LastChangePwd,
          :Out_IsBlock,
          :Out_Type,
          :Out_DesgId,
          :Out_brid,
          :Out_branchname,
          :Out_brcompid,
          :Out_compname,
          :Out_typename,
          :Out_desgname,
          :Out_brcategory,
          :Out_role,
          :out_ErrorCode,
          :Out_ErrorMsg
        );
      END;
    `,
    binds: {
      in_UserId: { type: 'in' },
      in_password: { type: 'in' },
      Out_CompId: { type: 'out', dbType: oracledb.NUMBER },
      Out_UserName: { type: 'out', dbType: oracledb.STRING, maxSize: 200 },
      Out_LastLogin: { type: 'out', dbType: oracledb.DATE },
      Out_LastLogOut: { type: 'out', dbType: oracledb.DATE },
      Out_LastChangePwd: { type: 'out', dbType: oracledb.DATE },
      Out_IsBlock: { type: 'out', dbType: oracledb.STRING, maxSize: 20 },
      Out_Type: { type: 'out', dbType: oracledb.NUMBER },
      Out_DesgId: { type: 'out', dbType: oracledb.NUMBER },
      Out_brid: { type: 'out', dbType: oracledb.NUMBER },
      Out_branchname: { type: 'out', dbType: oracledb.STRING, maxSize: 200 },
      Out_brcompid: { type: 'out', dbType: oracledb.NUMBER },
      Out_compname: { type: 'out', dbType: oracledb.STRING, maxSize: 200 },
      Out_typename: { type: 'out', dbType: oracledb.STRING, maxSize: 100 },
      Out_desgname: { type: 'out', dbType: oracledb.STRING, maxSize: 200 },
      Out_brcategory: { type: 'out', dbType: oracledb.NUMBER },
      Out_role: { type: 'out', dbType: oracledb.STRING, maxSize: 100 },
      out_ErrorCode: { type: 'out', dbType: oracledb.NUMBER },
      Out_ErrorMsg: { type: 'out', dbType: oracledb.STRING, maxSize: 4000 },
    },
  },
  aoup_asset_ins: {
    note: 'Register all in/out bind names before enabling this procedure.',
  },
  aoup_assetassignupd_ins_new: {
    note: 'Register all in/out bind names before enabling this procedure.',
  },
  aoup_assetstatus_Upd_insnew: {
    note: 'Register all in/out bind names before enabling this procedure.',
  },
  aoup_user_ins_New: {
    note: 'Register all in/out bind names before enabling this procedure.',
  },
};

module.exports = {
  procedureCatalog,
};
