const { executeQuery } = require('../../db/queryExecutor');

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
  return result && result.length > 0 ? result[0] : null;
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
    INSERT INTO Agencies (AgencyName, StateID, DistrictID, VillageName, Address, PRODUCTS, SMA_BUCKET)
    VALUES ('${agencyName}', ${payload.stateId}, ${payload.districtId}, '${city}', '${address}', '${products}', '${smaBucket}')
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
  const query = `SELECT COUNT(*) as total FROM Agencies`;
  const result = await executeQuery(query);
  return result && result.length > 0 ? result[0].TOTAL : 0;
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
  const query = `SELECT COUNT(*) as count FROM Agencies WHERE UPPER(AgencyName) = UPPER('${escapedName}')`;
  const result = await executeQuery(query);
  return result && result.length > 0 ? result[0].COUNT > 0 : false;
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
};
