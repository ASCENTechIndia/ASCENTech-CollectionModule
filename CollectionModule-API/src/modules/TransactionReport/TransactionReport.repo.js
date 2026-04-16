const oracledb = require('oracledb');
const { executeQuery } = require('../../db/queryExecutor');
const { executeProcedure } = require('../../db/procedureExecutor');

async function getZones(filters) {
  let sql = `
    SELECT 
      a.var_companymst_branchname brname,
      a.num_companymst_compid brid
    FROM etech.aoup_companymst_def a
    LEFT JOIN etech.aoup_companymst_def c 
      ON c.num_companymst_compid = a.num_companymst_parentid
    WHERE 1=1 `;
  const binds = {};
  const brcategory = Number(filters?.brcategory);
  const brid = Number(filters?.brid);
  if (brcategory === 0 || brcategory === 1) {
    sql += ` AND a.num_companymst_brcategory = 3`;
  }
  else if (brcategory === 2) {
    sql += `
      AND a.num_companymst_brcategory = 3
      AND a.num_companymst_compid = :brid`;
    binds.brid = brid;
  }
  else if (brcategory === 4) {
    sql += `
      AND c.num_companymst_brcategory = 3
      AND a.num_companymst_compid = :brid`;
    binds.brid = brid;
  }
  else {
    sql += ` AND a.num_companymst_brcategory = 3`;
  }
  sql += ` ORDER BY a.var_companymst_branchname`;
  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

async function getRegions(filters) {
  let sql = `
    SELECT 
      var_companymst_branchname,
      num_companymst_compid
    FROM etech.aoup_companymst_def
    WHERE num_companymst_brcategory = 4
  `;

  const binds = {};

  const brcategory = Number(filters?.brcategory);
  const zoneId = Number(filters?.zoneId);
  const brid = Number(filters?.brid);

  // ---------------- HO / ADMIN ----------------
  if (brcategory === 0 || brcategory === 1) {
    sql += ` AND num_companymst_parentid = :zoneId`;
    binds.zoneId = { val: Number(zoneId), type: oracledb.NUMBER };
  }

  // ---------------- REGION ----------------
  else if (brcategory === 2) {
    sql += ` AND num_companymst_compid = :brid`;
    binds.brid = { val: Number(brid), type: oracledb.NUMBER };
  }

  // ---------------- STATE ----------------
  else if (brcategory === 3) {
    sql += ` AND num_companymst_compid = :brid`;
    binds.brid = { val: Number(brid), type: oracledb.NUMBER };
  }

  // ---------------- ZONE / NEW REGION ----------------
  else if (brcategory === 4) {
    sql += ` AND num_companymst_parentid = :zoneId`;
    binds.zoneId = { val: Number(zoneId), type: oracledb.NUMBER };
  }

  else {
    sql += ` AND num_companymst_parentid = :zoneId`;
    binds.zoneId = { val: Number(zoneId), type: oracledb.NUMBER };
  }

  sql += ` ORDER BY var_companymst_branchname`;

  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

async function getBranches(filters) {
  let sql = `
    SELECT 
      var_companymst_branchname,
      num_companymst_compid
    FROM etech.aoup_companymst_def
    WHERE num_companymst_brcategory = 5
  `;

  const binds = {};

  const brcategory = Number(filters?.brcategory);
  const regionId = Number(filters?.regionId);
  const brid = Number(filters?.brid);

  // ---------------- HO / ADMIN ----------------
  if (brcategory === 0 || brcategory === 1) {
    sql += ` AND num_companymst_parentid = :regionId`;
    binds.regionId = { val: Number(regionId), type: oracledb.NUMBER };
  }

  // ---------------- REGION ----------------
  else if (brcategory === 2) {
    sql += ` AND num_companymst_parentid = :regionId`;
    binds.regionId = { val: Number(regionId), type: oracledb.NUMBER };
  }

  // ---------------- STATE ----------------
  else if (brcategory === 3) {
    sql += ` AND num_companymst_compid = :brid`;
    binds.brid = { val: Number(brid), type: oracledb.NUMBER };
  }

  // ---------------- BRANCH ----------------
  else if (brcategory === 5) {
    sql += ` AND num_companymst_compid = :brid`;
    binds.brid = { val: Number(brid), type: oracledb.NUMBER };
  }

  // ---------------- DEFAULT ----------------
  else {
    sql += ` AND num_companymst_parentid = :regionId`;
    binds.regionId = { val: Number(regionId), type: oracledb.NUMBER };
  }

  sql += ` ORDER BY var_companymst_branchname`;

  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

async function getCollAssociate({brid}) {
  let sql = `
   SELECT REPLACE(var_usermst_userid, 'E', '') || '-' || var_usermst_userfullname AS var_usermst_userid,
var_usermst_userid AS user_id FROM etech.aoup_usermst_def WHERE num_usermst_brid =:brid ORDER BY var_usermst_userfullname `;
   const binds = {
    brid: { val: Number(brid), type: oracledb.NUMBER }
  };
  const result = await executeQuery(sql, binds);
  return result.rows || [];
}



async function getTransDetailsReport(filters) {
  let sql = `
    SELECT  
      num_banktransdet_transid AS srno,
      '''' || var_banktransdet_transidnew AS transid,
      REPLACE(var_banktransdet_userid, 'E', '') AS userid,
      var_usermst_userfullname AS username,
      '''' || var_banktransmast_contrctno AS contractnum,
      v.var_visitstatus_type AS visitststs,
      ft.var_feedbacktype_mst_desc AS feedback,
      bd.VAR_BANKDATA_BRANCH,
      bd.VAR_BANKDATA_PRODUCTCODE,
      bd.VAR_BANKDATA_PRODUCTNM,
      CASE var_banktransdet_paymode 
        WHEN 'C' THEN 'ONLINE' 
        WHEN 'Q' THEN 'Cheque' 
        WHEN 'R' THEN 'Online' 
        ELSE var_banktransdet_paymode 
      END AS paymode,
      num_banktransdet_paidamt AS paidamt, num_banktransdet_chqno instrumentno,
      TO_CHAR(dat_banktransdet_chqdt, 'DD/MM/YYYY') AS instrumentdt, var_banktransdet_bankname as bankname,
      var_banktransdet_authcode authcode,var_banktransdet_billdeskmsg billdeskmsg, var_banktransdet_altrphno1 mobileno, 
      var_banktransdet_altrphno2 altrphno2, var_banktransdet_email1 email1, 
      var_banktransdet_altrnatadd address, TO_CHAR(dat_banktransmast_ptpdt, 'DD/MM/YYYY') AS ptpdate,  TO_CHAR(dat_banktransdet_reshudt, 'DD/MM/YYYY') AS reshudt,
      var_banktransdet_visitremark visitremark, var_banktransdet_panform panform, var_banktransdet_pandetails pandetails, var_banktransdet_settleflag settleflag,
      TO_CHAR(dat_banktransdet_transdat, 'DD/MM/YYYY') AS trans_date, TO_CHAR(dat_banktransdet_transdat, 'HH24:MI:SS') AS trans_time, 
    TO_CHAR(dat_banktransdet_oflntransdate, 'DD/MM/YYYY') AS oflntransdate, var_banktransdet_golocation golocation,
   '=HYPERLINK("https://www.google.com/maps/dir/' 
    || REPLACE(var_bankdata_cobrowsraddress, ' ', '+') 
    || '/' 
    || REPLACE(var_banktransdet_golocation, ';', ',') 
    || '","View Distance")' AS Distance_URL,
    var_tmfl_uploadflag uploadflag, var_tmfl_response response, var_creditlimit_flag authorisationflag, var_rfdmst_name rf, var_rcstatus_name incomesource,
    CASE WHEN var_banktransdet_rcstatus = 'Y' THEN 'Yes' ELSE 'No' END rcstatus, 
    var_banktransdet_image1 imagecode, var_btm_tractorablity tractorablity, 
    var_btm_thirdpersonname personname, var_btm_thirdpesonaddress pesonaddress, var_btm_tractoravafseizing tractoravafseizing, var_btm_vehicleregisterno vehicleregisterno, var_btm_tractormodel tractormodel,
    var_btm_tractormanufactureyear tractormanufactureyear, var_btm_occupation occupation, nvl(NUM_BANKDATA_COLLECTAMOUNT, 0) COLLECTAMOUNT,num_bankdata_mobileno1 custno,var_bankdata_customernm custname, replace(replace(var_bankdata_cobrowsraddress, CHR(13), ''), CHR(10), '')  customeraddress, num_usermst_email as MDM_ID,bd.VAR_BANKDATA_DPDBUCKET,
     CASE WHEN ROW_NUMBER() OVER (PARTITION BY var_banktransmast_contrctno, TRUNC(dat_banktransdet_transdat, 'MM') ORDER BY dat_banktransdet_transdat) = 1 THEN 'Unique Transaction' ELSE 'Duplicate Transaction' END AS transaction_status,dm.DIST_VAR_BANKDATA_MATRIX_DISTANCE,var_bankdata_registrno  
    FROM atbss.aoup_etech_banktransdetails a
    LEFT JOIN atbss.aoup_etech_bankingtransmast b
      ON b.num_banktransmast_transid = a.num_banktransdet_transid
    LEFT JOIN atbss.aoup_etech_bankdata bd
      ON b.var_banktransmast_contrctno = bd.VAR_BANKDATA_CONTRACTNUM
    LEFT OUTER JOIN atbss.aoup_etech_visitstatus_mst v ON num_visitstatus_id = var_banktransdet_visitststs
      LEFT OUTER JOIN atbss.aoup_etech_feedbacktype_mst ON var_feedbacktype_mst_id = var_banktransdet_custfeedbck 
    INNER JOIN etech.aoup_usermst_def u
      ON u.var_usermst_userid = a.var_banktransdet_userid
    LEFT JOIN etech.view_branchdetails brview
      ON brview.brid = u.num_usermst_brid
      LEFT OUTER JOIN etech.aoup_companycode_mas
      ON num_companycode_id = num_usermst_compcode
      LEFT OUTER JOIN atbss.aoup_etech_rfdmaster 
      ON num_rfdmst_id = num_banktransdet_rfdid
      LEFT OUTER JOIN atbss.aoup_etech_rcstatusmst ON num_rcstatus_id = num_banktransdet_rcid
      left join atbss.aoup_etech_matrix_distince_banktransdetails dm on var_banktransdet_transidnew = dm.DIST_VAR_BANKTRANSDET_TRANSIDNEW
     LEFT JOIN atbss.aoup_etech_feedbacktype_mst ft
  ON ft.var_feedbacktype_mst_id = a.var_banktransdet_custfeedbck
    WHERE TRUNC(a.dat_banktransdet_transdat) BETWEEN 
          TO_DATE(:fromDate, 'DD/MM/YYYY') 
      AND TO_DATE(:toDate, 'DD/MM/YYYY')
  `;
  const binds = {
    fromDate: { val: filters.fromDate, type: oracledb.STRING },
    toDate: { val: filters.toDate, type: oracledb.STRING }
  };
  // ---------------- SMA TYPE ----------------
  if (filters.smaType) {
    sql += ` AND UPPER(bd.VAR_BANKDATA_DPDBUCKET) = UPPER(:smaType)`;
    binds.smaType = { val: filters.smaType, type: oracledb.STRING };
  }
  // ---------------- BRANCH ----------------
  if (filters.brid) {
    sql += ` AND brview.brid = :brid`;
    binds.brid = { val: Number(filters.brid), type: oracledb.NUMBER };
  }
  // ---------------- USER ID ----------------
  if (filters.userId) {
    sql += ` AND u.var_usermst_userid = :userId`;
    binds.userId = { val: `E${filters.userId}`, type: oracledb.STRING };
  }
  // ---------------- USERNAME DROPDOWN ----------------
  if (filters.associateId) {
    sql += ` AND u.var_usermst_userid = :associateId`;
    binds.associateId = { val: filters.associateId, type: oracledb.STRING };
  }
  // ---------------- TRANSACTION TYPE ----------------
  if (filters.transtype === '1') {
    sql += ` AND num_feedback_id IN (17,20)`;
  } else if (filters.transtype === '2') {
    sql += ` AND num_feedback_id NOT IN (17,20)`;
  }
  // ---------------- ZONE ----------------
  if (filters.zoneId) {
    sql += ` AND UPPER(bd.VAR_BANKDATA_PRODUCTNM) = UPPER(:zoneId)`;
    binds.zoneId = { val: filters.zoneId.trim(), type: oracledb.STRING };
  }
  // ---------------- REGION ----------------
  if (filters.regionId) {
    sql += ` AND UPPER(bd.VAR_BANKDATA_PRODUCTCODE) = UPPER(:regionId)`;
    binds.regionId = { val: filters.regionId.trim(), type: oracledb.STRING };
  }
  sql += ` ORDER BY a.dat_banktransdet_transdat DESC`;
  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

module.exports = {
 getZones, getRegions, getBranches, getCollAssociate, getTransDetailsReport
};
