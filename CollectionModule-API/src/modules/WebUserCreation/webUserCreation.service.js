const {
  getFormOptionsRepo,
  getBranchesWebRepo,
  getBranchByIdRepo,
  getRolesWebRepo,
  getUserDetailsByIdRepo,
  createWebUserRepo,
  updateWebUserRepo,
  uploadWebUserImageRepo,
  getEmployerListRepo,
  validateIdProofFormat,
  calculateAge,
} = require('./webUserCreation.repo');
const { AppError } = require("../../utils/app-error.js")

/**
 * Get all form options for web user creation
 */
async function getFormOptionsService(type = '') {
  try {
    const options = await getFormOptionsRepo(type);
    
    // Extract only rows and normalize field names to lowercase
    const cleanedOptions = {};
    for (const [key, value] of Object.entries(options)) {
      cleanedOptions[key] = (value.rows || []).map(row => ({
        name: row.NAME || row.name,
        id: row.ID || row.id,
        ...(row.CODE && { code: row.CODE }),
      }));
    }
    
    return {
      success: true,
      data: cleanedOptions,
    };
  } catch (error) {
    throw new AppError(`Failed to fetch form options: ${error.message}`, 400);
  }
}

/**
 * Get branches for web user creation
 */
async function getBranchesWebService(branchCategory, userLevel) {
  try {
    const branches = await getBranchesWebRepo(branchCategory, userLevel);
    return {
      success: true,
      data: (branches.rows || []).map(row => ({
        name: row.NAME || row.name,
        id: row.ID || row.id,
        code: row.CODE || row.code,
      })),
    };
  } catch (error) {
    throw new AppError(`Failed to fetch branches: ${error.message}`, 400);
  }
}

/**
 * Get single branch by ID
 */
async function getBranchByIdService(branchId) {
  try {
    const branches = await getBranchByIdRepo(branchId);
    if (!branches || branches.length === 0) {
      throw new AppError('Branch not found', 404);
    }
    return {
      success: true,
      data: branches[0],
    };
  } catch (error) {
    throw error instanceof AppError
      ? error
      : new AppError(`Failed to fetch branch: ${error.message}`, 400);
  }
}

/**
 * Get roles for web user creation (with role-based filtering)
 */
async function getRolesWebService(branchCategory) {
  try {
    const roles = await getRolesWebRepo(branchCategory);
    return {
      success: true,
      data: (roles.rows || []).map(row => ({
        name: row.NAME || row.name,
        id: row.ID || row.id,
      })),
    };
  } catch (error) {
    throw new AppError(`Failed to fetch roles: ${error.message}`, 400);
  }
}

/**
 * Get employer list
 */
async function getEmployerListService() {
  try {
    const employers = await getEmployerListRepo();
    return {
      success: true,
      data: (employers.rows || []).map(row => ({
        name: row.NAME || row.name,
        id: row.ID || row.id,
        code: row.CODE || row.code,
      })),
    };
  } catch (error) {
    throw new AppError(`Failed to fetch employers: ${error.message}`, 400);
  }
}

/**
 * Get user details by ID
 */
async function getUserDetailsService(userId) {
  try {
    if (!userId) {
      throw new AppError('User ID is required', 400);
    }

    const formattedUserId = userId.startsWith('E') ? userId : `E${userId}`;
    const userDetails = await getUserDetailsByIdRepo(formattedUserId);

    if (!userDetails) {
      throw new AppError('User details not found', 404);
    }

    return {
      success: true,
      data: userDetails,
    };
  } catch (error) {
    throw error instanceof AppError
      ? error
      : new AppError(`Failed to fetch user details: ${error.message}`, 400);
  }
}

/**
 * Validate web user input
 */
async function validateWebUserInputService(payload) {
  const errors = [];

  // Validate first name
  if (!payload.firstname || payload.firstname.trim() === '') {
    errors.push('First name is required');
  }

  // Validate last name
  if (!payload.lastname || payload.lastname.trim() === '') {
    errors.push('Last name is required');
  }

  // Validate mobile number
  if (!payload.mobno || !/^\d{10}$/.test(payload.mobno.toString())) {
    errors.push('Mobile number must be 10 digits');
  } else if (payload.mobno.toString().startsWith('0')) {
    errors.push('Mobile number cannot start with 0');
  }

  // Validate email if provided
  if (payload.email && payload.email.trim() !== '') {
    const emailRegex = /^[\w\.\-]+@[\w\.\-]+\.\w+$/;
    if (!emailRegex.test(payload.email)) {
      errors.push('Invalid email format');
    }
  }

  // Validate DOB if provided
  if (payload.dob && payload.dob.trim() !== '') {
    const dob = new Date(payload.dob);
    if (isNaN(dob.getTime())) {
      errors.push('Invalid date of birth format');
    } else {
      const age = calculateAge(dob);
      if (age < 18) {
        errors.push('User must be at least 18 years old');
      }
    }
  }

  // Validate ID proof if provided
  if (payload.proofno && payload.proofno.trim() !== '' && payload.prooftype) {
    const validation = validateIdProofFormat(payload.prooftype, payload.proofno);
    if (!validation.valid) {
      errors.push(validation.message);
    }
  }

  // Validate branch selection
  if (!payload.brid) {
    errors.push('Branch is required');
  }

  // Validate designation
  if (!payload.desgid) {
    errors.push('Designation is required');
  }

  // Validate role
  if (!payload.roleid) {
    errors.push('Role is required');
  }

  // Validate device type
  if (!payload.usertypeid) {
    errors.push('Device type is required');
  }

  // Validate working for
  if (!payload.workid) {
    errors.push('Working for is required');
  }

  // For FOS role, collection team is required
  if (payload.roleid === 1 && !payload.collectionid) {
    errors.push('Collection team is required for FOS role');
  }

  if (errors.length > 0) {
    throw new AppError(errors.join('; '), 400);
  }

  return { success: true, message: 'Validation passed' };
}

/**
 * Create web user
 */
async function createWebUserService(payload) {
  try {
    // Validate input
    console.log("payloadd :", payload)
    await validateWebUserInputService(payload);

    // Create user via stored procedure
    const result = await createWebUserRepo(payload);

    console.log("service file result :", result)

    if (!result) {
      throw new AppError('Failed to create user', 400);
    }

    const isSuccess = String(result.Out_errorCode) === '-100';
    if (!isSuccess) {
      return new AppError(result.Out_ErrorMsg || 'User creation failed', 400);
    }

    return {
      success: true,
      message: result.Out_ErrorMsg,
      userId: result.Out_User,
      data: result,
    };
  } catch (error) {
    console.log("errur :", error)
    throw new AppError(`User creation failed: ${error.message}`, 400);
    // throw error instanceof AppError
    //   ? error
    //   : new AppError(`User creation failed: ${error.message}`, 400);
  }
}

/**
 * Update web user
 */
async function updateWebUserService(payload) {
  try {
    // Validate input
    await validateWebUserInputService(payload);

    if (!payload.userid) {
      throw new AppError('User ID is required for update', 400);
    }

    // Update user via stored procedure
    const result = await updateWebUserRepo(payload);

    if (!result) {
      throw new AppError('Failed to update user', 400);
    }

    const isSuccess = String(result.Out_errorCode) === '-100';
    if (!isSuccess) {
      throw new AppError(result.Out_ErrorMsg || 'User update failed', 400);
    }

    return {
      success: true,
      message: result.Out_ErrorMsg,
      userId: result.Out_User,
      data: result,
    };
  } catch (error) {
    throw error instanceof AppError
      ? error
      : new AppError(`User update failed: ${error.message}`, 400);
  }
}

/**
 * Upload web user image
 */
async function uploadWebUserImageService(userId, imageBuffer, imageType, imagePosition = 1) {
  try {
    if (!userId) {
      throw new AppError('User ID is required', 400);
    }

    if (!imageBuffer || imageBuffer.length === 0) {
      throw new AppError('Image data is required', 400);
    }

    const fileSizeKB = imageBuffer.length / 1024;
    if (fileSizeKB > 300) {
      throw new AppError('Image size cannot exceed 300 KB', 400);
    }

    const validImageTypes = ['IMAGE', 'PDF', 'WORD'];
    if (!validImageTypes.includes(imageType)) {
      throw new AppError(`Invalid image type. Allowed: ${validImageTypes.join(', ')}`, 400);
    }

    await uploadWebUserImageRepo(userId, imageBuffer, imageType, imagePosition);

    return {
      success: true,
      message: 'Image uploaded successfully',
      userId: userId,
    };
  } catch (error) {
    throw error instanceof AppError
      ? error
      : new AppError(`Image upload failed: ${error.message}`, 400);
  }
}

/**
 * Determine web user status based on role and device type
 */
function determineWebUserStatus(roleId, deviceTypeId) {
  // FOS (1): Always Unverified
  if (roleId === 1) {
    return 'U';
  }

  // Branch Operations (2)
  if (roleId === 2) {
    // Web: Active
    if (deviceTypeId === 1) return 'A';
    // Mobile: Unverified
    if (deviceTypeId === 2) return 'U';
  }

  // Default: Active
  return 'A';
}

module.exports = {
  getFormOptionsService,
  getBranchesWebService,
  getBranchByIdService,
  getRolesWebService,
  getEmployerListService,
  getUserDetailsService,
  validateWebUserInputService,
  createWebUserService,
  updateWebUserService,
  uploadWebUserImageService,
  determineWebUserStatus,
};
