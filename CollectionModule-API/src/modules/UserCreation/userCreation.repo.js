const oracledb = require('oracledb');
const { getConnection } = require('../../config/db');

/**
 * Converts "YYYY-MM-DD" string to JS Date. Returns null if falsy/invalid.
 */
function toDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

/** Helper — typed null bind for DATE */
const nullDate = { val: null, type: oracledb.DATE };

/** Helper — typed null bind for NUMBER */
const nullNum  = { val: null, type: oracledb.NUMBER };

/** Helper — typed null bind for STRING */
const nullStr  = { val: null, type: oracledb.STRING };

async function createFosUser(body) {
  const joiningDate = toDate(body.in_dat_fosmst_joining_date);
  const exitDate    = toDate(body.in_dat_fosmst_exit_date);
  const dob         = toDate(body.in_DOB);

  const sql = `
    BEGIN
      etech_cm.aoup_user_ins_new(
        in_brid                          => :in_brid,
        in_userid                        => :in_userid,
        in_username                      => :in_username,
        in_userpwd                       => :in_userpwd,
        in_mobno                         => :in_mobno,
        in_email                         => :in_email,
        in_usertypeid                    => :in_usertypeid,
        in_DOB                           => :in_DOB,
        in_proofno                       => :in_proofno,
        in_desgid                        => :in_desgid,
        in_roleid                        => :in_roleid,
        in_compcode                      => :in_compcode,
        in_workid                        => :in_workid,
        in_empid                         => :in_empid,
        in_collectionid                  => :in_collectionid,
        in_categoryid                    => :in_categoryid,
        in_status                        => :in_status,
        in_Empcode                       => :in_Empcode,
        in_firstname                     => :in_firstname,
        in_lastname                      => :in_lastname,
        in_prooftype                     => :in_prooftype,
        in_mode                          => :in_mode,
        in_compid                        => :in_compid,
        in_insby                         => :in_insby,
        in_Requeststatus                 => :in_Requeststatus,
        in_var_user_teamlead             => :in_var_user_teamlead,
        in_num_fosmst_whatsapp           => :in_num_fosmst_whatsapp,
        in_var_fosmst_skills             => :in_var_fosmst_skills,
        in_var_fosmst_geo_zones          => :in_var_fosmst_geo_zones,
        in_num_fosmst_max_cases_day      => :in_num_fosmst_max_cases_day,
        in_num_fosmst_current_open_cases => :in_num_fosmst_current_open_cases,
        in_var_fosmst_aadhar_ref         => :in_var_fosmst_aadhar_ref,
        in_dat_fosmst_joining_date       => :in_dat_fosmst_joining_date,
        in_dat_fosmst_exit_date          => :in_dat_fosmst_exit_date,
        in_dat_fosmst_updated_at         => :in_dat_fosmst_updated_at,
        in_num_fosmst_created_by         => :in_num_fosmst_created_by,
        out_user                         => :out_user,
        out_errorcode                    => :out_errorcode,
        out_errormsg                     => :out_errormsg
      );
    END;
  `;

  const binds = {
    // ----- STRING params -----
    in_userid:                        body.in_userid,
    in_username:                      body.in_username,
    in_userpwd:                       body.in_userpwd,
    in_email:                         body.in_email              ?? null,
    in_proofno:                       body.in_proofno            ?? null,
    in_status:                        body.in_status             ?? 'A',
    in_Empcode:                       body.in_Empcode            ?? null,
    in_firstname:                     body.in_firstname,
    in_lastname:                      body.in_lastname           ?? null,
    in_insby:                         body.in_insby,
    in_Requeststatus:                 body.in_Requeststatus      ?? 'P',
    in_var_user_teamlead:             body.in_var_user_teamlead          ?? null,
    in_var_fosmst_skills:             body.in_var_fosmst_skills          ?? null,
    in_var_fosmst_geo_zones:          body.in_var_fosmst_geo_zones       ?? null,
    in_var_fosmst_aadhar_ref:         body.in_var_fosmst_aadhar_ref      ?? null,

    // ----- NUMBER params (null → explicit NUMBER type to avoid VARCHAR2 confusion) -----
    in_brid:                          { val: body.in_brid,                                  type: oracledb.NUMBER },
    in_mobno:                         { val: body.in_mobno,                                 type: oracledb.NUMBER },
    in_usertypeid:                    { val: body.in_usertypeid,                            type: oracledb.NUMBER },
    in_desgid:                        { val: body.in_desgid,                                type: oracledb.NUMBER },
    in_roleid:                        { val: body.in_roleid,                                type: oracledb.NUMBER },
    in_compcode:                      { val: body.in_compcode,                              type: oracledb.NUMBER },
    in_workid:                        { val: body.in_workid             ?? null,            type: oracledb.NUMBER },
    in_empid:                         { val: body.in_empid              ?? null,            type: oracledb.NUMBER },
    in_collectionid:                  { val: body.in_collectionid       ?? null,            type: oracledb.NUMBER },
    in_categoryid:                    { val: body.in_categoryid         ?? null,            type: oracledb.NUMBER },
    in_prooftype:                     { val: body.in_prooftype          ?? null,            type: oracledb.NUMBER },
    in_mode:                          { val: body.in_mode               ?? 1,               type: oracledb.NUMBER },
    in_compid:                        { val: body.in_compid,                                type: oracledb.NUMBER },
    in_num_fosmst_whatsapp:           { val: body.in_num_fosmst_whatsapp        ?? null,    type: oracledb.NUMBER },
    in_num_fosmst_max_cases_day:      { val: body.in_num_fosmst_max_cases_day   ?? null,    type: oracledb.NUMBER },
    in_num_fosmst_current_open_cases: { val: body.in_num_fosmst_current_open_cases ?? null, type: oracledb.NUMBER },
    in_num_fosmst_created_by:         { val: body.in_num_fosmst_created_by      ?? null,    type: oracledb.NUMBER },

    // ----- DATE params (always explicit type — null DATE must not be sent as VARCHAR2) -----
    in_DOB:                           { val: dob,           type: oracledb.DATE },
    in_dat_fosmst_joining_date:       { val: joiningDate,   type: oracledb.DATE },
    in_dat_fosmst_exit_date:          { val: exitDate,      type: oracledb.DATE },

    // ----- TIMESTAMP param (Oracle implicitly converts DATE → TIMESTAMP) -----
    in_dat_fosmst_updated_at:         { val: new Date(),    type: oracledb.DATE },

    // ----- OUT params -----
    out_user:                         { type: oracledb.STRING, dir: oracledb.BIND_OUT, maxSize: 200 },
    out_errorcode:                    { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    out_errormsg:                     { type: oracledb.STRING, dir: oracledb.BIND_OUT, maxSize: 4000 }
  };

  let connection;
  try {
    connection = await getConnection('db1');
    const result = await connection.execute(sql, binds, { autoCommit: true });
    
    const errCode = result.outBinds.out_errorcode;
    const errMsg = result.outBinds.out_errormsg;
    const outUser = result.outBinds.out_user;

    // In this procedure, 9999 indicates successful creation
    if (errCode !== 0 && errCode !== 9999 && errCode !== null) {
      throw new Error(`DB Error Code: ${errCode}, Message: ${errMsg}`);
    }

    return {
      success: true,
      out_user: outUser,
      out_errorcode: errCode,
      out_errormsg: errMsg,
    };
  } finally {
    if (connection) await connection.close();
  }
}

module.exports = { createFosUser };
