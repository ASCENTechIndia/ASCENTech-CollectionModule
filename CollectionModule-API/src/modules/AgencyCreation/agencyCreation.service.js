const {
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
} = require('./agencyCreation.repo');
const AppError = require('../../utils/app-error');

/**
 * Get all states
 */
async function getStatesService() {
  try {
    const states = await getStatesRepo();
    return {
      success: true,
      data: (states.rows || []).map(row => ({
        id: row.ID || row.id,
        name: row.NAME || row.name,
      })),
    };
  } catch (error) {
    throw new AppError(`Failed to fetch states: ${error.message}`, 400);
  }
}

/**
 * Get districts by state ID
 */
async function getDistrictsByStateService(stateId) {
  try {
    if (!stateId) {
      throw new AppError('State ID is required', 400);
    }

    // Verify state exists
    const state = await getStateByIdRepo(stateId);
    if (!state) {
      throw new AppError('State not found', 404);
    }

    const districts = await getDistrictsByStateRepo(stateId);
    return {
      success: true,
      data: (districts.rows || []).map(row => ({
        id: row.ID || row.id,
        name: row.NAME || row.name,
        stateId: row.STATEID || row.stateId,
      })),
    };
  } catch (error) {
    throw error instanceof AppError
      ? error
      : new AppError(`Failed to fetch districts: ${error.message}`, 400);
  }
}

/**
 * Get SMA bucket options
 */
function getSMABucketsService() {
  const smaBuckets = [
    { name: 'ALL SMA', id: 'ALL_SMA' },
    { name: 'SMA0', id: 'SMA0' },
    { name: 'SMA1', id: 'SMA1' },
    { name: 'SMA2', id: 'SMA2' },
  ];

  return {
    success: true,
    data: smaBuckets,
  };
}

/**
 * Get product options by main product type
 */
function getProductOptionsService(mainProduct) {
  const productMap = {
    '1': [ // Commercial
      { name: 'Office', value: 'Office' },
      { name: 'Shop', value: 'Shop' },
      { name: 'Mall', value: 'Mall' },
    ],
    '2': [ // Non Commercial
      { name: 'House', value: 'House' },
      { name: 'Flat', value: 'Flat' },
      { name: 'Bungalow', value: 'Bungalow' },
    ],
    '3': [ // Transport
      { name: 'Truck', value: 'Truck' },
      { name: 'Bus', value: 'Bus' },
      { name: 'Taxi', value: 'Taxi' },
    ],
  };

  return {
    success: true,
    data: productMap[String(mainProduct)] || [],
  };
}

/**
 * Validate agency input
 */
async function validateAgencyInputService(payload) {
  const errors = [];

  // Validate agency name
  if (!payload.agencyName || payload.agencyName.trim() === '') {
    errors.push('Agency name is required');
  } else if (payload.agencyName.length < 3) {
    errors.push('Agency name must be at least 3 characters');
  }

  // Validate state
  if (!payload.stateId) {
    errors.push('State is required');
  }

  // Validate district
  if (!payload.districtId) {
    errors.push('District is required');
  }

  // Validate city
  if (!payload.city || payload.city.trim() === '') {
    errors.push('City is required');
  }

  // Validate address
  if (!payload.address || payload.address.trim() === '') {
    errors.push('Address is required');
  } else if (payload.address.length < 10) {
    errors.push('Address must be at least 10 characters');
  }

  // Validate products if provided
  if (payload.products && payload.products.trim() === '') {
    errors.push('Please select at least one product type');
  }

  // Validate SMA bucket if provided
  if (payload.smaBucket && payload.smaBucket.trim() === '') {
    errors.push('Please select at least one SMA bucket');
  }

  if (errors.length > 0) {
    throw new AppError(errors.join('; '), 400);
  }

  return { success: true, message: 'Validation passed' };
}

/**
 * Create new agency
 */
async function createAgencyService(payload) {
  try {
    // Validate input
    await validateAgencyInputService(payload);

    // Check if agency name already exists
    const exists = await agencyNameExistsRepo(payload.agencyName);
    if (exists) {
      throw new AppError('Agency with this name already exists', 400);
    }

    // Verify state and district exist
    const state = await getStateByIdRepo(payload.stateId);
    if (!state) {
      throw new AppError('Selected state not found', 404);
    }

    const district = await getDistrictByIdRepo(payload.districtId);
    if (!district) {
      throw new AppError('Selected district not found', 404);
    }

    // Create agency
    const result = await createAgencyRepo(payload);

    return {
      success: true,
      message: 'Agency created successfully',
      data: result,
    };
  } catch (error) {
    throw error instanceof AppError
      ? error
      : new AppError(`Agency creation failed: ${error.message}`, 400);
  }
}

/**
 * Update agency
 */
async function updateAgencyService(payload) {
  try {
    // Validate input
    await validateAgencyInputService(payload);

    if (!payload.agencyId) {
      throw new AppError('Agency ID is required for update', 400);
    }

    // Check if agency exists
    const agency = await getAgencyByIdRepo(payload.agencyId);
    if (!agency) {
      throw new AppError('Agency not found', 404);
    }

    // Check if new agency name already exists (if name is changed)
    if (agency.agencyName !== payload.agencyName) {
      const exists = await agencyNameExistsRepo(payload.agencyName);
      if (exists) {
        throw new AppError('Agency with this name already exists', 400);
      }
    }

    // Verify state and district exist
    const state = await getStateByIdRepo(payload.stateId);
    if (!state) {
      throw new AppError('Selected state not found', 404);
    }

    const district = await getDistrictByIdRepo(payload.districtId);
    if (!district) {
      throw new AppError('Selected district not found', 404);
    }

    // Update agency
    const result = await updateAgencyRepo(payload);

    return {
      success: true,
      message: 'Agency updated successfully',
      data: result,
    };
  } catch (error) {
    throw error instanceof AppError
      ? error
      : new AppError(`Agency update failed: ${error.message}`, 400);
  }
}

/**
 * Get agency details by ID
 */
async function getAgencyService(agencyId) {
  try {
    if (!agencyId) {
      throw new AppError('Agency ID is required', 400);
    }

    const agency = await getAgencyByIdRepo(agencyId);
    if (!agency) {
      throw new AppError('Agency not found', 404);
    }

    return {
      success: true,
      data: agency,
    };
  } catch (error) {
    throw error instanceof AppError
      ? error
      : new AppError(`Failed to fetch agency: ${error.message}`, 400);
  }
}

/**
 * Get all agencies with pagination
 */
async function getAgenciesService(pageNumber = 1, pageSize = 10) {
  try {
    const [agencies, total] = await Promise.all([
      getAgenciesRepo(pageNumber, pageSize),
      getTotalAgenciesRepo(),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return {
      success: true,
      data: (agencies.rows || []).map(row => ({
        id: row.ID || row.id,
        agencyName: row.AGENCYNAME || row.agencyName,
        stateId: row.STATEID || row.stateId,
        districtId: row.DISTRICTID || row.districtId,
        city: row.VILLAGENAME || row.city,
        address: row.ADDRESS || row.address,
        products: row.PRODUCTS || row.products,
        smaBucket: row.SMA_BUCKET || row.smaBucket,
      })),
      pagination: {
        pageNumber,
        pageSize,
        totalRecords: total,
        totalPages,
      },
    };
  } catch (error) {
    throw new AppError(`Failed to fetch agencies: ${error.message}`, 400);
  }
}

/**
 * Delete agency
 */
async function deleteAgencyService(agencyId) {
  try {
    if (!agencyId) {
      throw new AppError('Agency ID is required', 400);
    }

    // Check if agency exists
    const agency = await getAgencyByIdRepo(agencyId);
    if (!agency) {
      throw new AppError('Agency not found', 404);
    }

    // Delete agency
    await deleteAgencyRepo(agencyId);

    return {
      success: true,
      message: 'Agency deleted successfully',
    };
  } catch (error) {
    throw error instanceof AppError
      ? error
      : new AppError(`Agency deletion failed: ${error.message}`, 400);
  }
}

module.exports = {
  getStatesService,
  getDistrictsByStateService,
  getSMABucketsService,
  getProductOptionsService,
  validateAgencyInputService,
  createAgencyService,
  updateAgencyService,
  getAgencyService,
  getAgenciesService,
  deleteAgencyService,
};
