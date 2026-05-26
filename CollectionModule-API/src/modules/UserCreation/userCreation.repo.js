const oracledb = require('oracledb');
const { executeProcedure } = require('../../db/procedureExecutor');
const { executeQuery } = require('../../db/queryExecutor');

function normalizeNullable(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  return value;
}

/**
 * Get dropdown options for user creation form
 */
async function getFormOptionsRepo(type = '') {
  const queries = {
    workingFor: `SELECT var_working_name as name, num_working_id as id FROM aoup_working_mas ORDER BY var_working_name`,
    designation: `SELECT var_designation_designation as name, num_designation_id as id FROM aoup_designation_def ORDER BY var_designation_designation`,
    collectionTeam: `SELECT var_collectionteam_name as name, num_collectionteam_id as id FROM aoup_collectionteam_mas ORDER BY num_collectionteam_id`,
    productCategory: `SELECT var_productcategory_name as name, num_productcategory_id as id FROM aoup_productcategory_mas ORDER BY num_productcategory_id`,
    companyCode: `SELECT var_companycode_code as name, num_companycode_id as id FROM aoup_companycode_mas ORDER BY var_companycode_code`,
    employer: `SELECT var_employer_name as name, num_employer_id as id, var_employer_code as code FROM aoup_employer_mas ORDER BY var_employer_name`,
    idProof: `SELECT VAR_IDPROOF_NAME as name, NUM_IDPROOF_ID as id FROM aoup_idproof_mas ORDER BY NUM_IDPROOF_ID`,
    assetOwner: `SELECT var_assetowner_name as name, num_assetowner_id as id FROM aoup_assetowner_mas ORDER BY var_assetowner_name`,
    userRole: `SELECT var_userrole_name as name, num_userrole_id as id FROM aoup_userrole_mas ORDER BY num_userrole_id`,
    userDevice: `SELECT var_userdevice_name as name, num_userdevice_id as id FROM aoup_userdevice_mas ORDER BY num_userdevice_id`,
  };

  if (type && queries[type]) {
    return executeQuery(queries[type]);
  }

  // Return all if no specific type requested
  const result = {};
  for (const [key, query] of Object.entries(queries)) {
    result[key] = await executeQuery(query);
  }
  return result;
}

/**
 * Get branches by category and user level
 */
async function getBranchesRepo(branchCategory, userLevel) {
  const whereClause = branchCategory && userLevel ? ` WHERE compid = ${branchCategory}` : '';
  const query = `SELECT branchname as name, brid as id, branchcode as code FROM branchlist${whereClause} ORDER BY branchname`;
  return executeQuery(query);
}

/**
 * Get user details by user ID
 */
async function getUserDetailsByIdRepo(userId) {
  const query = `
    SELECT 
      num_usermst_brid as brid,
      var_usermst_userid as userid,
      num_usermst_usertype as usertype,
      num_usermst_compcode as compcode,
      var_usermst_userfirstname as firstname,
      var_usermst_userlastname as lastname,
      num_usermst_roleid as roleid,
      date_usermst_dob as dob,
      num_usermst_mobileno as mobno,
      num_usermst_email as email,
      num_usermst_idproofno as proofno,
      num_usermst_workingid as workid,
      num_usermst_empid as empid,
      num_usermst_desgid as desgid,
      num_usermst_collectionid as colid,
      num_usermst_categorisation as catid,
      date_usermst_validfrom as validfrom,
      date_usermst_validupto as validupto,
      var_usermst_status as status,
      var_usermst_empcode as empcode,
      num_usermst_userprooftype as userprooftype,
      var_usermst_imagetype as imagetype,
      blob_usermst_proofimage as image,
      var_usermst_imagetype2 as imagetype2,
      blob_usermst_proofimage2 as image2
    FROM aoup_usermst_def
    WHERE var_usermst_userid = '${userId}'
  `;
  
  const result = await executeQuery(query);
  return result && result.length > 0 ? result[0] : null;
}

/**
 * Create new user using stored procedure (aoup_user_ins_New)
 * Maps to .NET Insert method
 */
async function createUserRepo(payload) {
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
        :Out_User,
        :Out_errorCode,
        :Out_ErrorMsg
      );
    END;
  `;

  const binds = {
    in_brid: payload.brid,
    in_userid: normalizeNullable(payload.userid),
    in_username: `${payload.firstname} ${payload.lastname}`.toUpperCase(),
    in_userpwd: null,
    in_mobno: payload.mobno,
    in_email: normalizeNullable(payload.email),
    in_usertypeid: payload.usertypeid,
    in_DOB: normalizeNullable(payload.dob),
    in_proofno: normalizeNullable(payload.proofno),
    in_desgid: payload.desgid,
    in_roleid: payload.roleid,
    in_compcode: payload.compcode,
    in_workid: payload.workid,
    in_empid: normalizeNullable(payload.empid),
    in_collectionid: payload.collectionid,
    in_categoryid: payload.categoryid,
    in_status: payload.status,
    in_Empcode: payload.empcode,
    in_firstname: normalizeNullable(payload.firstname),
    in_lastname: normalizeNullable(payload.lastname),
    in_prooftype: payload.prooftype,
    in_mode: payload.mode,
    in_compid: payload.compid,
    in_insby: payload.insby,
    in_Requeststatus: normalizeNullable(payload.requeststatus) || 'A',
    Out_User: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 100 },
    Out_errorCode: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    Out_ErrorMsg: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 10000 },
  };

  const result = await executeProcedure({ statement, binds, useTx: false });
  return result.outBinds;
}

/**
 * Update user using stored procedure
 */
async function updateUserRepo(payload) {
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
        :in_status,
        :in_Empcode,
        :in_firstname,
        :in_lastname,
        :in_prooftype,
        :in_mode,
        :in_compid,
        :in_insby,
        :Out_User,
        :Out_errorCode,
        :Out_ErrorMsg
      );
    END;
  `;

  const binds = {
    in_brid: payload.brid,
    in_Requeststatus: normalizeNullable(payload.requeststatus),
    in_userid: normalizeNullable(payload.userid),
    in_username: `${payload.firstname} ${payload.lastname}`.toUpperCase(),
    in_userpwd: null,
    in_mobno: payload.mobno,
    in_email: normalizeNullable(payload.email),
    in_usertypeid: payload.usertypeid,
    in_DOB: normalizeNullable(payload.dob),
    in_proofno: normalizeNullable(payload.proofno),
    in_desgid: payload.desgid,
    in_roleid: payload.roleid,
    in_compcode: payload.compcode,
    in_workid: payload.workid,
    in_empid: normalizeNullable(payload.empid),
    in_collectionid: payload.collectionid,
    in_categoryid: payload.categoryid,
    in_status: payload.status,
    in_Empcode: payload.empcode,
    in_firstname: normalizeNullable(payload.firstname),
    in_lastname: normalizeNullable(payload.lastname),
    in_prooftype: payload.prooftype,
    in_mode: payload.mode,
    in_compid: payload.compid,
    in_insby: payload.insby,
    Out_User: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 100 },
    Out_errorCode: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    Out_ErrorMsg: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 10000 },
  };

  const result = await executeProcedure({ statement, binds, useTx: false });
  return result.outBinds;
}

/**
 * Upload user image blob
 */
async function uploadUserImageRepo(userId, imageData, imageType, imagePosition = 1) {
  const statement = `
    BEGIN
      UPDATE aoup_usermst_def
      SET ${imagePosition === 1 ? 'blob_usermst_proofimage, var_usermst_imagetype' : imagePosition === 2 ? 'blob_usermst_proofimage2, var_usermst_imagetype2' : 'blob_usermst_proofimage3, var_usermst_imagetype3'} = :imageData, :imageType
      WHERE var_usermst_userid = :userId;
    END;
  `;

  const binds = {
    userId: userId,
    imageData: imageData,
    imageType: imageType,
  };

  return executeProcedure({ statement, binds, useTx: false });
}

/**
 * Validate ID proof format based on type
 */
function validateIdProofFormat(proofType, proofNo) {
  const idProofTypes = {
    1: { name: 'PAN', regex: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/ },
    2: { name: 'Aadhaar', regex: /^[0-9]{12}$/ },
    3: { name: 'Passport', regex: /^([a-zA-Z]){1}([0-9]){7}$/ },
  };

  if (!idProofTypes[proofType]) {
    return { valid: false, message: 'Invalid proof type' };
  }

  const type = idProofTypes[proofType];
  if (!type.regex.test(proofNo)) {
    return { valid: false, message: `Invalid ${type.name} format` };
  }

  return { valid: true, message: 'Valid proof format' };
}

/**
 * Calculate age from DOB
 */
function calculateAge(dob) {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const month = today.getMonth() - dob.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

/**
 * Check if user can create another user (authorization check)
 */
async function checkUserAuthorizationRepo(creatorEmpCode, targetEmpCode) {
  const query = `
    SELECT var_usermst_empcode as empcode
    FROM aoup_usermst_def
    WHERE UPPER(var_usermst_userid) = UPPER('${creatorEmpCode}')
  `;

  const result = await executeQuery(query);
  if (!result || result.length === 0) {
    return false;
  }

  // Add logic to check manager hierarchy if needed
  return true;
}

module.exports = {
  getFormOptionsRepo,
  getBranchesRepo,
  getUserDetailsByIdRepo,
  createUserRepo,
  updateUserRepo,
  uploadUserImageRepo,
  validateIdProofFormat,
  calculateAge,
  checkUserAuthorizationRepo,
};
