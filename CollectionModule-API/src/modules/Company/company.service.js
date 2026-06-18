const {
  getFormOptionsRepo,
  getBranchesRepo,
  getUserDetailsByIdRepo,
  createCompanyRepo,
  updateUserRepo,
  uploadUserImageRepo,
  validateIdProofFormat,
  calculateAge,
  checkUserAuthorizationRepo,
} = require('./company.repo');
const {AppError} = require('../../utils/app-error');

/**
 * Get all form options for user creation
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
 * Get branches based on category and user level
 */
async function getBranchesService(branchCategory, userLevel) {
  try {
    const branches = await getBranchesRepo(branchCategory, userLevel);
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
 * Get user details by ID
 */
async function getUserDetailsService(userId) {
  try {
    if (!userId) {
      throw new AppError('User ID is required', 400);
    }

    // Add prefix if not present
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
 * Validate user input for creation
 */
async function validateUserInputService(payload) {
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

  // Validate employer
  if (!payload.empid) {
    errors.push('Employer is required');
  }

  // Validate working for
  if (!payload.workid) {
    errors.push('Working for is required');
  }

  if (errors.length > 0) {
    throw new AppError(errors.join('; '), 400);
  }

  return { success: true, message: 'Validation passed' };
}

/**
 * Create new user
 */
async function createCompanyService(payload) {
  try {
    const result = await createCompanyRepo(payload);

    if (!result) {
      throw new AppError("Failed to create company", 400);
    }

    const isSuccess =
      String(result.out_ErrorCode) === "-100" ||
      String(result.out_ErrorCode) === "0";

    if (!isSuccess) {
      throw new AppError(
        result.out_ErrorMsg || "Company creation failed",
        400
      );
    }

    return {
      success: true,
      message: result.out_ErrorMsg,
      data: result,
    };
  } catch (error) {
    throw new AppError(
      `Company creation failed: ${error.message}`,
      400
    );
  }
}
/**
 * Update existing user
 */
async function updateUserService(payload) {
  try {
    // Validate input
    await validateUserInputService(payload);

    if (!payload.userid) {
      throw new AppError('User ID is required for update', 400);
    }

    // Update user via stored procedure
    const result = await updateUserRepo(payload);

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
 * Upload user image
 */
async function uploadUserImageService(userId, imageBuffer, imageType, imagePosition = 1) {
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

    await uploadUserImageRepo(userId, imageBuffer, imageType, imagePosition);

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
 * Determine user status based on role and device type
 */
function determineUserStatus(roleId, deviceTypeId) {
  // FOS (Field Operating Staff) = 1 -> Status: U (Unverified)
  if (roleId === 1) {
    return 'U';
  }

  // Branch Operations = 2 with Web device = A (Active)
  if (roleId === 2 && deviceTypeId === 1) {
    return 'A';
  }

  // Branch Operations with Mobile = U (Unverified)
  if (roleId === 2 && deviceTypeId === 2) {
    return 'U';
  }

  // Default status
  return 'A';
}

module.exports = {
  getFormOptionsService,
  getBranchesService,
  getUserDetailsService,
  validateUserInputService,
  createCompanyService,
  updateUserService,
  uploadUserImageService,
  determineUserStatus,
};
