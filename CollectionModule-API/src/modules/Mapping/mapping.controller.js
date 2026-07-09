const {
  getFormOptionsService,
  getBranchesService,
  getUserDetailsService,
  validateUserInputService,
  createUserService,
  updateUserService,
  uploadUserImageService,
  determineUserStatus,
  createUserNewService,
  getCompanyService,
  getAgencyService,
  getFOSService,
  createMappingService
} = require('./mapping.service');
const { auditLog } = require('../../utils/audit-log');
const { logApiSuccess, logApiError } = require('../../utils/log');
const AppError = require('../../utils/app-error');

function requestMeta(req) {
  return {
    ip: req.ip,
    method: req.method,
    path: req.originalUrl,
  };
}

/**
 * Get form options for user creation form
 */
async function getFormOptionsHandler(req, res, next) {
  try {
    const { type } = req.query;
    const result = await getFormOptionsService(type);

    logApiSuccess(req, 200, result.data, 'Form options fetched successfully');

    return res.status(200).json(result.data);
  } catch (error) {
    logApiError(req, 400, error.message, 'Form options fetch failed');
    return next(error);
  }
}

/**
 * Get branches based on category and user level
 */
async function getBranchesHandler(req, res, next) {
  try {
    const { branchCategory, userLevel } = req.query;
    const result = await getBranchesService(branchCategory, userLevel);

    logApiSuccess(req, 200, result.data, 'Branches fetched successfully');

    return res.ok(result.data);
  } catch (error) {
    logApiError(req, 400, error.message, 'Branches fetch failed');
    return next(error);
  }
}

/**
 * Get user details by user ID
 */
async function getUserDetailsHandler(req, res, next) {
  try {
    const { userId } = req.query;

    if (!userId) {
      throw new AppError('User ID is required', 400);
    }

    const result = await getUserDetailsService(userId);

    logApiSuccess(req, 200, result.data, `User details fetched for user: ${userId}`);

    return res.ok(result.data);
  } catch (error) {
    logApiError(req, error.statusCode || 400, error.message, 'User details fetch failed');
    return next(error);
  }
}

/**
 * Validate user input
 */
async function validateUserHandler(req, res, next) {
  try {
    const payload = req.body;
    const result = await validateUserInputService(payload);

    logApiSuccess(req, 200, result, 'User validation successful');

    return res.ok(result);
  } catch (error) {
    logApiError(req, error.statusCode || 400, error.message, 'User validation failed');
    return next(error);
  }
}

/**
 * Create new user
 */
async function createUserHandler(req, res, next) {
  try {
    console.log("running this file")
    let payload = req.body;

    // Add user info from authenticated request
    // payload.insby = req.user?.userId || 'system';
    payload.mode = 1; // New user mode

    console.log("mobile payload :", payload)
    const result = await createUserService(payload);

    const auditData = {
      action: 'USER_CREATION',
      actor: req.user?.userId || 'system',
      module: 'userCreation',
      entityId: result.userId,
      status: result.success ? 'SUCCESS' : 'FAILED',
      details: {
        firstName: payload.firstname,
        lastName: payload.lastname,
        workingFor: payload.workid,
        role: payload.roleid,
        errorCode: result.data?.Out_errorCode,
        errorMsg: result.data?.Out_ErrorMsg,
      },
      requestMeta: requestMeta(req),
    };

    auditLog(auditData);
    logApiSuccess(req, 201, result, `User created successfully: ${result.userId}`);

    return res.status(201).json({
      success: true,
      message: result.message,
      userId: result.userId,
    });
  } catch (error) {
    logApiError(req, error.statusCode || 400, error.message, 'User creation failed');

    auditLog({
      action: 'USER_CREATION',
      actor: req.user?.userId || 'system',
      module: 'userCreation',
      status: 'FAILED',
      details: { error: error.message },
      requestMeta: requestMeta(req),
    });

    return next(error);
  }
}

async function createMappingHandler(req, res, next) {
  try {
    const payload = req.body;
    const result = await createMappingService(payload);

    const auditData = {
      action: 'USER_MAPPING',
      actor: req.user?.userId || 'system',
      module: 'userCreation',
      entityId: payload.createdBy || "",
      status: result.success ? 'SUCCESS' : 'FAILED',
      details: {
        errorCode: result.data?.code || "",
        errorMsg: result.data?.message || "",
      },
      requestMeta: requestMeta(req),
    };

    auditLog(auditData);
    logApiSuccess(req, 201, result, `User mapped successfully: ${payload.userId}`);

    return res.status(201).json({
      success: true,
      message: result.message,
      code: result.code,
    });
  } catch (error) {
    logApiError(req, error.statusCode || 400, error.message, 'User mapped failed');

    auditLog({
      action: 'USER_CREATION',
      actor: req.user?.userId || 'system',
      module: 'userCreation',
      status: 'FAILED',
      details: { error: error.message },
      requestMeta: requestMeta(req),
    });

    return next(error);
  }
}

/**
 * Update existing user
 */
async function updateUserHandler(req, res, next) {
  try {
    const payload = req.body;

    if (!payload.userid) {
      throw new AppError('User ID is required for update', 400);
    }

    // Add user info from authenticated request
    payload.insby = req.user?.userId || 'system';
    payload.mode = 2; // Update mode

    const result = await updateUserService(payload);

    auditLog({
      action: 'USER_UPDATE',
      actor: req.user?.userId || 'system',
      module: 'userCreation',
      entityId: result.userId,
      status: result.success ? 'SUCCESS' : 'FAILED',
      details: {
        firstName: payload.firstname,
        lastName: payload.lastname,
        errorCode: result.data?.Out_errorCode,
        errorMsg: result.data?.Out_ErrorMsg,
      },
      requestMeta: requestMeta(req),
    });

    logApiSuccess(req, 200, result, `User updated successfully: ${result.userId}`);

    return res.ok({
      success: true,
      message: result.message,
      userId: result.userId,
    });
  } catch (error) {
    logApiError(req, error.statusCode || 400, error.message, 'User update failed');

    auditLog({
      action: 'USER_UPDATE',
      actor: req.user?.userId || 'system',
      module: 'userCreation',
      status: 'FAILED',
      details: { error: error.message },
      requestMeta: requestMeta(req),
    });

    return next(error);
  }
}

/**
 * Upload user image/document
 */
async function uploadUserImageHandler(req, res, next) {
  try {
    if (!req.file) {
      throw new AppError('File is required', 400);
    }

    const { userId, imagePosition = 1 } = req.body;

    if (!userId) {
      throw new AppError('User ID is required', 400);
    }

    // Determine image type based on MIME type
    let imageType = 'IMAGE';
    if (req.file.mimetype === 'application/pdf') {
      imageType = 'PDF';
    } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      imageType = 'WORD';
    }

    const result = await uploadUserImageService(userId, req.file.buffer, imageType, parseInt(imagePosition));

    auditLog({
      action: 'IMAGE_UPLOAD',
      actor: req.user?.userId || 'system',
      module: 'userCreation',
      entityId: userId,
      status: 'SUCCESS',
      details: {
        fileName: req.file.originalname,
        fileSize: req.file.size,
        imageType: imageType,
      },
      requestMeta: requestMeta(req),
    });

    logApiSuccess(req, 200, result, `Image uploaded for user: ${userId}`);

    return res.ok(result);
  } catch (error) {
    logApiError(req, error.statusCode || 400, error.message, 'Image upload failed');

    auditLog({
      action: 'IMAGE_UPLOAD',
      actor: req.user?.userId || 'system',
      module: 'userCreation',
      status: 'FAILED',
      details: { error: error.message },
      requestMeta: requestMeta(req),
    });

    return next(error);
  }
}

/**
 * Get user status based on role and device type
 */
async function getUserStatusHandler(req, res, next) {
  try {
    const { roleId, deviceTypeId } = req.query;

    if (!roleId || !deviceTypeId) {
      throw new AppError('Role ID and Device Type ID are required', 400);
    }

    const status = determineUserStatus(parseInt(roleId), parseInt(deviceTypeId));

    logApiSuccess(req, 200, { status }, 'User status determined');

    return res.ok({ status });
  } catch (error) {
    logApiError(req, error.statusCode || 400, error.message, 'User status determination failed');
    return next(error);
  }
}

/**
 * Create new FOS user using stored procedure (Jayesh's layout)
 */
async function createUserNewHandler(req, res, next) {
  try {
    const payload = req.body;
    const result = await createUserNewService(payload);

    const auditData = {
      action: 'USER_CREATION_FOS',
      actor: req.user?.userId || 'system',
      module: 'userCreation',
      entityId: result.out_user,
      status: result.success ? 'SUCCESS' : 'FAILED',
      details: {
        firstName: payload.in_firstname,
        lastName: payload.in_lastname,
        workingFor: payload.in_workid,
        role: payload.in_roleid,
        errorCode: result.out_errorcode,
        errorMsg: result.out_errormsg,
      },
      requestMeta: requestMeta(req),
    };

    auditLog(auditData);
    logApiSuccess(req, 201, { userid: payload.in_userid }, 'FOS User created successfully');

    return res.status(201).json({
      success: true,
      message: result.out_errormsg || 'User created successfully',
      userId: result.out_user,
      data: result,
    });
  } catch (error) {
    logApiError(req, 500, error.message, 'FOS User creation failed');
    auditLog({
      action: 'USER_CREATION_FOS',
      actor: req.user?.userId || 'system',
      module: 'userCreation',
      status: 'FAILED',
      details: { error: error.message },
      requestMeta: requestMeta(req),
    });
    return next(error);
  }
}

async function getCompanyHandler(req, res, next) {
  try {
    const result = await getCompanyService();

    logApiSuccess(req, 200, result.data, 'Company fetched successfully');

    return res.ok(result.data);
  } catch (error) {
    logApiError(req, 400, error.message, 'Company fetch failed');
    return next(error);
  }
}

async function getAgencyHandler(req, res, next) {
  try {
    const result = await getAgencyService();

    logApiSuccess(req, 200, result.data, 'Agency fetched successfully');

    return res.ok(result.data);
  } catch (error) {
    logApiError(req, 400, error.message, 'Agency fetch failed');
    return next(error);
  }
}

async function getFOSHandler(req, res, next) {
  try {
    const result = await getFOSService();

    logApiSuccess(req, 200, result.data, 'FOS fetched successfully');

    return res.ok(result.data);
  } catch (error) {
    logApiError(req, 400, error.message, 'Agency fetch failed');
    return next(error);
  }
}

module.exports = {
  getFormOptionsHandler,
  getBranchesHandler,
  getUserDetailsHandler,
  validateUserHandler,
  createUserHandler,
  updateUserHandler,
  uploadUserImageHandler,
  getUserStatusHandler,
  createUserNewHandler,
  getCompanyHandler,
  getAgencyHandler,
  getFOSHandler,
  createMappingHandler
};
