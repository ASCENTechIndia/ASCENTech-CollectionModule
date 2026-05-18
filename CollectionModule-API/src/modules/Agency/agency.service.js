const { getStates, getDistricts, createAgency } = require('./agency.repo');

/**
 * Get all states
 */
async function getStatesService() {
  try {
    const states = await getStates();
    return {
      success: true,
      data: states,
    };
  } catch (error) {
    throw error;
  }
}

/**
 * Get districts by state
 */
async function getDistrictsService(stateID) {
  try {
    const districts = await getDistricts(stateID);
    return {
      success: true,
      data: districts,
    };
  } catch (error) {
    throw error;
  }
}

/**
 * Create new agency
 */
async function createAgencyService(payload) {
  try {
    const result = await createAgency(payload);
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getStatesService,
  getDistrictsService,
  createAgencyService,
};
