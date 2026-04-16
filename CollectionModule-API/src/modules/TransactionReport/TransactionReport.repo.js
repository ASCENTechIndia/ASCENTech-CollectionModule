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
  SELECT *
FROM (
  SELECT 
  dat_banktransdet_transdat AS transdate,
        num_banktransdet_transid srno,
        '''' || var_banktransdet_transidnew transid,
        REPLACE(var_banktransdet_userid, 'E', '') userid,
        var_usermst_userfullname username,
        '''' || var_banktransmast_contrctno contractnum,
        var_visitstatus_type visitststs,
        var_feedbacktype_mst_desc feedback,
        VAR_BANKDATA_BRANCH,
        VAR_BANKDATA_PRODUCTCODE,
        VAR_BANKDATA_PRODUCTNM,
        CASE var_banktransdet_paymode 
            WHEN 'C' THEN 'ONLINE' 
            WHEN 'Q' THEN 'Cheque' 
            WHEN 'R' THEN 'Online' 
            ELSE var_banktransdet_paymode 
        END paymode,
        num_banktransdet_paidamt paidamt,
        num_banktransdet_chqno instrumentno,
        dat_banktransdet_chqdt instrumentdt,
        var_banktransdet_bankname bankname,
        var_banktransdet_billdeskrefno billdeskrefno,
        var_banktransdet_authcode authcode,
        var_banktransdet_billdeskmsg billdeskmsg,
        var_banktransdet_altrphno1 mobileno,
        var_banktransdet_altrphno2 altrphno2,
        var_banktransdet_email1 email1,
        var_banktransdet_altrnatadd address,
        dat_banktransmast_ptpdt ptpdate,
        dat_banktransdet_reshudt reshudt,
        var_banktransdet_visitremark visitremark,
        var_banktransdet_panform panform,
        var_banktransdet_pandetails pandetails,
        var_banktransdet_settleflag settleflag,
        TO_CHAR(dat_banktransdet_transdat, 'dd/mm/yyyy') trans_date,
        TO_CHAR(dat_banktransdet_transdat, 'hh24:mi:ss') trans_time,
        dat_banktransdet_oflntransdate oflntransdate,
        var_banktransdet_golocation golocation,
        var_tmfl_uploadflag uploadflag,
        var_tmfl_response response,
        var_creditlimit_flag authorisationflag,
        var_rfdmst_name rf,
        var_rcstatus_name incomesource,
        CASE WHEN var_banktransdet_rcstatus = 'Y' THEN 'Yes' ELSE 'No' END rcstatus,
        var_banktransdet_image1 imagecode,
        var_btm_tractorablity tractorablity,
        var_btm_thirdpersonname personname,
        var_btm_thirdpesonaddress pesonaddress,
        var_btm_tractoravafseizing tractoravafseizing,
        var_btm_vehicleregisterno vehicleregisterno,
        var_btm_tractormodel tractormodel,
        var_btm_tractormanufactureyear tractormanufactureyear,
        var_btm_occupation occupation,
        NVL(NUM_BANKDATA_COLLECTAMOUNT, 0) COLLECTAMOUNT,
        num_bankdata_mobileno1 custno,
        var_bankdata_customernm custname,
        REPLACE(REPLACE(var_bankdata_cobrowsraddress, CHR(13), ''), CHR(10), '') customeraddress,
        num_usermst_email as MDM_ID,
        bd.VAR_BANKDATA_DPDBUCKET,
        dm.DIST_VAR_BANKDATA_MATRIX_DISTANCE,
        var_bankdata_registrno,

        ROW_NUMBER() OVER (
            PARTITION BY num_banktransdet_transid 
            ORDER BY dat_banktransdet_transdat DESC
        ) rn

    FROM atbss.aoup_etech_banktransdetails
               LEFT OUTER JOIN atbss.aoup_etech_bankingtransmast
               ON num_banktransmast_transid = num_banktransdet_transid
               LEFT JOIN ATBSS.AOUP_ETECH_BANKDATA bd ON var_banktransmast_contrctno = bd.VAR_BANKDATA_CONTRACTNUM
               LEFT OUTER JOIN atbss.aoup_etech_visitstatus_mst
               ON num_visitstatus_id = var_banktransdet_visitststs
               LEFT OUTER JOIN atbss.aoup_etech_feedbacktype_mst
               ON var_feedbacktype_mst_id = var_banktransdet_custfeedbck
               INNER JOIN etech.aoup_usermst_def
               ON var_usermst_userid = var_banktransdet_userid
               LEFT OUTER JOIN etech.view_branchdetails brview 
               ON brview.brid = num_usermst_brid
               LEFT OUTER JOIN etech.aoup_companycode_mas
               ON num_companycode_id = num_usermst_compcode
               LEFT OUTER JOIN atbss.aoup_etech_rfdmaster
               ON num_rfdmst_id = num_banktransdet_rfdid
               LEFT OUTER JOIN atbss.aoup_etech_rcstatusmst
               ON num_rcstatus_id = num_banktransdet_rcid
                left join atbss.aoup_etech_matrix_distince_banktransdetails dm 
               on var_banktransdet_transidnew = dm.DIST_VAR_BANKTRANSDET_TRANSIDNEW
               left outer join atbss.aoup_etech_feedback_mst  on  num_feedback_id=var_banktransdet_custfeedbck
   WHERE dat_banktransdet_transdat >= TO_DATE(:fromDate,'DD/MM/YYYY') AND dat_banktransdet_transdat <  
       TO_DATE(:toDate, 'DD/MM/YYYY') +1
  `;
  const binds = {
    fromDate: filters.fromDate,
    toDate: filters.toDate
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
    sql += ` AND var_usermst_userid = :userId`;
    binds.userId = { val: `E${filters.userId}`, type: oracledb.STRING };
  }
  // ---------------- USERNAME DROPDOWN ----------------
  if (filters.associateId) {
    sql += ` AND var_usermst_userid = :associateId`;
    binds.associateId = { val: filters.associateId, type: oracledb.STRING };
  }
  // ---------------- TRANSACTION TYPE ----------------
  if (filters.transtype === '1') {
    sql += ` AND num_feedback_id IN (17,20)`;
  } else if (filters.transtype === '2') {
    sql += ` AND num_feedback_id NOT IN (17,20)`;
  }
  // ---------------- ZONE ----------------
  if (filters.zoneName) {
    sql += ` AND UPPER(bd.VAR_BANKDATA_PRODUCTNM) = UPPER(:zoneName)`;
    binds.zoneName = { val: filters.zoneName.trim(), type: oracledb.STRING };
  }
  // ---------------- REGION ----------------
  if (filters.regionName) {
    sql += ` AND UPPER(bd.VAR_BANKDATA_PRODUCTCODE) = UPPER(:regionName)`;
    binds.regionName = { val: filters.regionName.trim(), type: oracledb.STRING };
  }
  sql += ` )
WHERE rn = 1
ORDER BY transdate DESC`;
console.log(sql)
console.log("Filters:", filters);
console.log("Binds:", binds);
 const result = await executeQuery(sql, binds);
const rows = result.rows || [];

function maskValue(value) {
  if (!value) return value;
  const str = value.toString();
  if (str.length <= 4) return str;
  return '*'.repeat(str.length - 4) + str.slice(-4);
}
const userOf = filters.userOf;
if (userOf === "1") {
  rows.forEach(row => {
    row.CUSTNO = maskValue(row.CUSTNO);
    row.CONTRACTNUM = maskValue(row.CONTRACTNUM);
  });
}
return rows;
}

async function getImage({ imageCode }) {
  const sql = `
    SELECT byte_imagewebserve_image AS image
    FROM atbss.AOUP_IMAGEWEBSERVE_MST
    WHERE num_imagewebserve_refno = :imageCode
  `;
  const binds = {
    imageCode: Number(imageCode)
  };
  const result = await executeQuery(sql, binds);
  if (!result.rows || result.rows.length === 0) {
    return null;
  }
  const lob = result.rows[0].IMAGE;
  if (!lob) return null;
  const chunks = [];
  for await (const chunk of lob) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);
  return buffer.toString("base64");
}

module.exports = {
 getZones, getRegions, getBranches, getCollAssociate, getTransDetailsReport, getImage
};
