const {
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
} = require('./webUserCreation.service');
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
 * Get form options for web user creation form
 */
async function getFormOptionsHandler(req, res, next) {
  try {
    const { type } = req.query;
    const result = await getFormOptionsService(type);

    logApiSuccess(req, 200, result.data, 'Web form options fetched successfully');

    return res.status(200).json(result.data);
  } catch (error) {
    logApiError(req, 400, error.message, 'Web form options fetch failed');
    return next(error);
  }
}

/**
 * Get branches for web user creation
 */
async function getBranchesWebHandler(req, res, next) {
  try {
    const { branchCategory, userLevel } = req.query;
    const result = await getBranchesWebService(branchCategory, userLevel);

    logApiSuccess(req, 200, result.data, 'Web branches fetched successfully');

    return res.ok(result.data);
  } catch (error) {
    logApiError(req, 400, error.message, 'Web branches fetch failed');
    return next(error);
  }
}

/**
 * Get single branch by ID
 */
async function getBranchByIdHandler(req, res, next) {
  try {
    const { branchId } = req.query;

    if (!branchId) {
      throw new AppError('Branch ID is required', 400);
    }

    const result = await getBranchByIdService(branchId);

    logApiSuccess(req, 200, result.data, `Branch fetched for ID: ${branchId}`);

    return res.ok(result.data);
  } catch (error) {
    logApiError(req, error.statusCode || 400, error.message, 'Branch fetch failed');
    return next(error);
  }
}

/**
 * Get roles for web user creation (with role-based filtering)
 */
async function getRolesWebHandler(req, res, next) {
  try {
    const { branchCategory } = req.query;

    if (!branchCategory) {
      throw new AppError('Branch category is required', 400);
    }

    const result = await getRolesWebService(branchCategory);

    logApiSuccess(req, 200, result.data, 'Web roles fetched successfully');

    return res.ok(result.data);
  } catch (error) {
    logApiError(req, error.statusCode || 400, error.message, 'Web roles fetch failed');
    return next(error);
  }
}

/**
 * Get employer list
 */
async function getEmployerListHandler(req, res, next) {
  try {
    const result = await getEmployerListService();

    logApiSuccess(req, 200, result.data, 'Employer list fetched successfully');

    return res.ok(result.data);
  } catch (error) {
    logApiError(req, 400, error.message, 'Employer list fetch failed');
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
 * Validate web user input
 */
async function validateWebUserHandler(req, res, next) {
  try {
    const payload = req.body;
    const result = await validateWebUserInputService(payload);

    logApiSuccess(req, 200, result, 'Web user validation successful');

    return res.ok(result);
  } catch (error) {
    logApiError(req, error.statusCode || 400, error.message, 'Web user validation failed');
    return next(error);
  }
}

/**
 * Create new web user
 */
async function createWebUserHandler(req, res, next) {
  try {
    const payload = req.body;

    // Add user info from authenticated request
    payload.mode = 1; // New user mode

    const result = await createWebUserService(payload);

    const auditData = {
      action: 'WEB_USER_CREATE',
      actor: req.user?.userId || 'system',
      module: 'webUserCreation',
      entityId: result.userId,
      status: result.success ? 'SUCCESS' : 'FAILED',
      details: {
        firstName: payload.firstname,
        lastName: payload.lastname,
        role: payload.roleid,
        errorCode: result.data?.Out_errorCode,
        errorMsg: result.data?.Out_ErrorMsg,
      },
      requestMeta: requestMeta(req),
    };

    auditLog(auditData);
    logApiSuccess(req, 201, result, `Web user created successfully: ${result.userId}`);

    return res.status(201).json({
      success: true,
      message: result.message,
      userId: result.userId,
    });
  } catch (error) {
    logApiError(req, error.statusCode || 400, error.message, 'Web user creation failed');

    auditLog({
      action: 'WEB_USER_CREATE',
      actor: req.user?.userId || 'system',
      module: 'webUserCreation',
      status: 'FAILED',
      details: { error: error.message },
      requestMeta: requestMeta(req),
    });

    return next(error);
  }
}

/**
 * Update web user
 */
async function updateWebUserHandler(req, res, next) {
  try {
    const payload = req.body;

    if (!payload.userid) {
      throw new AppError('User ID is required for update', 400);
    }

    // Add user info from authenticated request
    payload.insby = req.user?.userId || 'system';
    payload.mode = 2; // Update mode

    const result = await updateWebUserService(payload);

    auditLog({
      action: 'WEB_USER_UPDATE',
      actor: req.user?.userId || 'system',
      module: 'webUserCreation',
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

    logApiSuccess(req, 200, result, `Web user updated successfully: ${result.userId}`);

    return res.ok({
      success: true,
      message: result.message,
      userId: result.userId,
    });
  } catch (error) {
    logApiError(req, error.statusCode || 400, error.message, 'Web user update failed');

    auditLog({
      action: 'WEB_USER_UPDATE',
      actor: req.user?.userId || 'system',
      module: 'webUserCreation',
      status: 'FAILED',
      details: { error: error.message },
      requestMeta: requestMeta(req),
    });

    return next(error);
  }
}

/**
 * Upload web user image/document
 */
async function uploadWebUserImageHandler(req, res, next) {
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

    const result = await uploadWebUserImageService(userId, req.file.buffer, imageType, parseInt(imagePosition));

    auditLog({
      action: 'WEB_IMAGE_UPLOAD',
      actor: req.user?.userId || 'system',
      module: 'webUserCreation',
      entityId: userId,
      status: 'SUCCESS',
      details: {
        fileName: req.file.originalname,
        fileSize: req.file.size,
        imageType: imageType,
      },
      requestMeta: requestMeta(req),
    });

    logApiSuccess(req, 200, result, `Image uploaded for web user: ${userId}`);

    return res.ok(result);
  } catch (error) {
    logApiError(req, error.statusCode || 400, error.message, 'Web image upload failed');

    auditLog({
      action: 'WEB_IMAGE_UPLOAD',
      actor: req.user?.userId || 'system',
      module: 'webUserCreation',
      status: 'FAILED',
      details: { error: error.message },
      requestMeta: requestMeta(req),
    });

    return next(error);
  }
}

/**
 * Get web user status based on role and device type
 */
async function getWebUserStatusHandler(req, res, next) {
  try {
    const { roleId, deviceTypeId } = req.query;

    if (!roleId || !deviceTypeId) {
      throw new AppError('Role ID and Device Type ID are required', 400);
    }

    const status = determineWebUserStatus(parseInt(roleId), parseInt(deviceTypeId));

    logApiSuccess(req, 200, { status }, 'Web user status determined');

    return res.ok({ status });
  } catch (error) {
    logApiError(req, error.statusCode || 400, error.message, 'Web user status determination failed');
    return next(error);
  }
}

module.exports = {
  getFormOptionsHandler,
  getBranchesWebHandler,
  getBranchByIdHandler,
  getRolesWebHandler,
  getEmployerListHandler,
  getUserDetailsHandler,
  validateWebUserHandler,
  createWebUserHandler,
  updateWebUserHandler,
  uploadWebUserImageHandler,
  getWebUserStatusHandler,
};
