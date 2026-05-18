const oracledb = require('oracledb');
const { executeQuery } = require('../../db/queryExecutor');
const { executeProcedure } = require('../../db/procedureExecutor');

/**
 * Get all states
 */
async function getStates() {
  const sql = `
    SELECT StateID, StateName 
    FROM States 
    ORDER BY StateName
  `;
  
  const result = await executeQuery(sql);
  return result.rows || [];
}

/**
 * Get districts by state ID
 */
async function getDistricts(stateID) {
  const sql = `
    SELECT DistrictID, DistrictName 
    FROM Districts 
    WHERE StateID = :stateID
    ORDER BY DistrictName
  `;
  
  const result = await executeQuery(sql, { stateID });
  return result.rows || [];
}

/**
 * Create new agency
 */
async function createAgency(payload) {
  const sql = `
    INSERT INTO Agencies (AgencyName, StateID, DistrictID, VillageName, Address, PRODUCTS, SMA_BUCKET)
    VALUES (:agencyName, :stateID, :districtID, :villageName, :address, :products, :smaBucket)
  `;

  const binds = {
    agencyName: payload.agencyName,
    stateID: payload.stateID,
    districtID: payload.districtID,
    villageName: payload.villageName,
    address: payload.address,
    products: payload.products,
    smaBucket: payload.smaBucket,
  };

  const result = await executeQuery(sql, binds);
  
  return {
    success: result.rowsAffected > 0,
    rowsAffected: result.rowsAffected,
    message: result.rowsAffected > 0 ? 'Agency created successfully' : 'Failed to create agency',
  };
}

module.exports = {
  getStates,
  getDistricts,
  createAgency,
};
