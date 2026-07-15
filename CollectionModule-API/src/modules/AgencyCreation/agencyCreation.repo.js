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
 * Get all states
 */
async function getStatesRepo() {
  const query = `SELECT StateID as id, StateName as name FROM States ORDER BY StateName`;
  return executeQuery(query);
}

/**
 * Get districts by state ID
 */
async function getDistrictsByStateRepo(stateId) {
  const query = `SELECT DistrictID as id, DistrictName as name, StateID as stateId FROM Districts WHERE StateID = ${stateId} ORDER BY DistrictName`;
  return executeQuery(query);
}

/**
 * Get single district details
 */
async function getDistrictByIdRepo(districtId) {
  const query = `SELECT DistrictID as id, DistrictName as name, StateID as stateId FROM Districts WHERE DistrictID = ${districtId}`;
  const result = await executeQuery(query);
  return result && result.rows && result.rows.length > 0 ? result.rows[0] : null;
}

/**
 * Get single state details
 */
async function getStateByIdRepo(stateId) {
  const query = `SELECT StateID as id, StateName as name FROM states WHERE StateID = ${stateId}`;
  const result = await executeQuery(query);
  return result && result.rows.length > 0 ? result.rows[0] : null;
}

/**
 * Create new agency
 */
async function createAgencyRepo(payload) {
  const agencyName = payload.agencyName.replace(/'/g, "''"); // Escape single quotes
  const city = payload.city.replace(/'/g, "''");
  const address = payload.address.replace(/'/g, "''");
  const products = (payload.products || '').replace(/'/g, "''");
  const smaBucket = (payload.smaBucket || '').replace(/'/g, "''");

  const query = `
    INSERT INTO Agencies (AgencyName, StateID, DistrictID, TAHSILID, VillageName, Address, PRODUCTS, SMA_BUCKET)
    VALUES ('${agencyName}', ${payload.stateId}, ${payload.districtId}, 0, '${city}', '${address}', '${products}', '${smaBucket}')
  `;

  return executeQuery(query);
}

/**
 * Update existing agency
 */
async function updateAgencyRepo(payload) {
  const agencyName = payload.agencyName.replace(/'/g, "''");
  const city = payload.city.replace(/'/g, "''");
  const address = payload.address.replace(/'/g, "''");
  const products = (payload.products || '').replace(/'/g, "''");
  const smaBucket = (payload.smaBucket || '').replace(/'/g, "''");

  const query = `
    UPDATE Agencies 
    SET AgencyName = '${agencyName}', 
        StateID = ${payload.stateId}, 
        DistrictID = ${payload.districtId}, 
        VillageName = '${city}', 
        Address = '${address}', 
        PRODUCTS = '${products}', 
        SMA_BUCKET = '${smaBucket}'
    WHERE AgencyID = ${payload.agencyId}
  `;

  return executeQuery(query);
}

/**
 * Get agency by ID
 */
async function getAgencyByIdRepo(agencyId) {
  const query = `
    SELECT AgencyID as id, 
           AgencyName as agencyName, 
           StateID as stateId, 
           DistrictID as districtId, 
           VillageName as city, 
           Address as address, 
           PRODUCTS as products, 
           SMA_BUCKET as smaBucket
    FROM Agencies 
    WHERE AgencyID = ${agencyId}
  `;  

  const result = await executeQuery(query);
  return result && result.rows.length > 0 ? result.rows[0] : null;
}

/**
 * Get all agencies with pagination
 */
async function getAgenciesRepo(pageNumber = 1, pageSize = 10) {
  const offset = (pageNumber - 1) * pageSize;

  const query = `
    SELECT AgencyID as id, 
           AgencyName as agencyName, 
           StateID as stateId, 
           DistrictID as districtId, 
           VillageName as city, 
           Address as address, 
           PRODUCTS as products, 
           SMA_BUCKET as smaBucket
    FROM Agencies 
    ORDER BY AgencyName
    OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY
  `;

  return executeQuery(query);
}

/**
 * Get total agency count
 */
async function getTotalAgenciesRepo() {
  const query = `SELECT COUNT(*) as TOTAL FROM Agencies`;
  const result = await executeQuery(query);
  return result && result.rows && result.rows.length > 0 ? result.rows[0].TOTAL : 0;
}

/**
 * Delete agency
 */
async function deleteAgencyRepo(agencyId) {
  const query = `DELETE FROM Agencies WHERE AgencyID = ${agencyId}`;
  return executeQuery(query);
}

/**
 * Check if agency name exists
 */
async function agencyNameExistsRepo(agencyName) {
  const escapedName = agencyName.replace(/'/g, "''");
  const query = `SELECT COUNT(*) as COUNT FROM Agencies WHERE UPPER(AgencyName) = UPPER('${escapedName}')`;
  const result = await executeQuery(query);
  return result && result.rows && result.rows.length > 0 ? result.rows[0].COUNT > 0 : false;
}

async function createAgencyRepoNew(payload) {

  const statement = `
    BEGIN
      etech_cm.AOUP_AGENCY_MASTER_INS_UPD(
        :in_num_agencymst_id,
        :in_var_agencymst_code,
        :in_var_agencymst_name,
        :in_var_agencymst_type,
        :in_var_agencymst_status,
        :in_var_agencymst_license_no,
        :in_dat_agencymst_license_expiry,
        :in_var_agencymst_coverage_zones,
        :in_num_agencymst_max_cases,
        :in_num_agencymst_current_cases,
        :in_num_agencymst_max_fos,
        :in_clob_agencymst_sla_config,
        :in_var_agencymst_contact_email,
        :in_num_agencymst_contact_phone,
        :in_var_agencymst_address1,
        :in_var_agencymst_city,
        :in_var_agencymst_state,
        :in_var_agencymst_pincode,
        :in_var_agencymst_country,
        :in_clob_agencymst_config,
        :in_username,
        :out_ErrorCode,
        :out_ErrorMsg
      );
    END;
  `;

  const binds = {
    in_num_agencymst_id: payload.id,

    in_var_agencymst_code: payload.code,

    in_var_agencymst_name: payload.name,

    in_var_agencymst_type:
      normalizeNullable(payload.type),

    in_var_agencymst_status:
      normalizeNullable(payload.status),

    in_var_agencymst_license_no:
      normalizeNullable(payload.licenseNo),

    in_dat_agencymst_license_expiry:
      payload.licenseExpiry ? new Date(payload.licenseExpiry) : null,

    in_var_agencymst_coverage_zones:
      normalizeNullable(payload.coverageZones),

    in_num_agencymst_max_cases:
      normalizeNullable(payload.maxCases),

    in_num_agencymst_current_cases:
      normalizeNullable(payload.currentCases),

    in_num_agencymst_max_fos:
      normalizeNullable(payload.maxFos),

    in_clob_agencymst_sla_config:
      normalizeNullable(payload.slaConfig),

    in_var_agencymst_contact_email:
      normalizeNullable(payload.contactEmail),

    in_num_agencymst_contact_phone:
      normalizeNullable(payload.contactPhone),

    in_var_agencymst_address1:
      normalizeNullable(payload.address1),

    in_var_agencymst_city:
      normalizeNullable(payload.city),

    in_var_agencymst_state:
      normalizeNullable(payload.state),

    in_var_agencymst_pincode:
      normalizeNullable(payload.pincode),

    in_var_agencymst_country:
      normalizeNullable(payload.country),

    in_clob_agencymst_config:
      normalizeNullable(payload.config),

    in_username: payload.username,

    out_ErrorCode: {
      dir: oracledb.BIND_OUT,
      type: oracledb.STRING,
      maxSize: 100,
    },

    out_ErrorMsg: {
      dir: oracledb.BIND_OUT,
      type: oracledb.STRING,
      maxSize: 4000,
    },
  };

  console.log("Agency Bind Payload:", binds);

  const result = await executeProcedure({
    statement,
    binds,
    useTx: false,
  });

  return result.outBinds;
}

module.exports = {
  getStatesRepo,
  getDistrictsByStateRepo,
  getDistrictByIdRepo,
  getStateByIdRepo,
  createAgencyRepo,
  updateAgencyRepo,
  getAgencyByIdRepo,
  getAgenciesRepo,
  getTotalAgenciesRepo,
  deleteAgencyRepo,
  agencyNameExistsRepo,
  createAgencyRepoNew
};
