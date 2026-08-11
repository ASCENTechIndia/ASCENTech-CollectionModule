/**
 * User Creation Utility Functions
 * Common helper functions for user-related operations
 */

/**
 * Format user name to uppercase
 */
function formatUserName(firstName, lastName) {
  return `${firstName.toUpperCase().trim()} ${lastName.toUpperCase().trim()}`;
}

/**
 * Generate user ID with prefix
 */
function generateUserId(empCode) {
  return `E${empCode}`;
}

/**
 * Remove user ID prefix if exists
 */
function removeUserIdPrefix(userId) {
  return userId.startsWith('E') ? userId.substring(1) : userId;
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  if (!email || email.trim() === '') {
    return true; // Email is optional
  }

  const emailRegex = /^[\w\.\-]+@[\w\.\-]+\.\w+$/;
  return emailRegex.test(email);
}

/**
 * Validate mobile number format (10 digits, cannot start with 0)
 */
function isValidMobileNumber(mobNo) {
  const mobStr = mobNo.toString();
  if (!/^\d{10}$/.test(mobStr)) {
    return false;
  }
  return !mobStr.startsWith('0');
}

/**
 * Calculate age from date of birth
 */
function calculateAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob);

  if (isNaN(birthDate.getTime())) {
    return null;
  }

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

/**
 * Validate PAN format
 */
function isValidPAN(pan) {
  const panRegex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/;
  return panRegex.test(pan);
}

/**
 * Validate Aadhaar format (12 digits)
 */
function isValidAadhaar(aadhaar) {
  const aadhaarStr = aadhaar.toString();
  return /^[0-9]{12}$/.test(aadhaarStr);
}

/**
 * Validate Passport format (1 letter + 7 digits)
 */
function isValidPassport(passport) {
  const passportRegex = /^([a-zA-Z]){1}([0-9]){7}$/;
  return passportRegex.test(passport);
}

/**
 * Validate ID proof based on type
 */
function validateIdProof(proofType, proofNo) {
  if (!proofNo) {
    return { valid: true, message: 'Proof number is optional' };
  }

  switch (parseInt(proofType)) {
    case 1: // PAN
      if (!isValidPAN(proofNo)) {
        return { valid: false, message: 'Invalid PAN format. Expected: ABCDE1234F' };
      }
      break;

    case 2: // Aadhaar
      if (!isValidAadhaar(proofNo)) {
        return { valid: false, message: 'Invalid Aadhaar format. Expected: 12 digits' };
      }
      break;

    case 3: // Passport
      if (!isValidPassport(proofNo)) {
        return { valid: false, message: 'Invalid Passport format. Expected: 1 letter + 7 digits' };
      }
      break;

    default:
      return { valid: false, message: 'Invalid proof type' };
  }

  return { valid: true, message: 'Valid proof format' };
}

/**
 * Format date to DD/MM/YYYY
 */
function formatDate(date) {
  if (!date) return '';

  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}

/**
 * Format date to YYYY-MM-DD
 */
function formatDateISO(date) {
  if (!date) return '';

  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Parse date from DD/MM/YYYY format
 */
function parseDate(dateString) {
  if (!dateString) return null;

  const [day, month, year] = dateString.split('/');
  return new Date(`${year}-${month}-${day}`);
}

/**
 * Determine user status based on role and device
 */
function determineUserStatus(roleId, deviceTypeId) {
  const role = parseInt(roleId);
  const device = parseInt(deviceTypeId);

  // FOS (1): Always Unverified
  if (role === 1) return 'U';

  // Branch Operations (2)
  if (role === 2) {
    // Web: Active
    if (device === 1) return 'A';
    // Mobile: Unverified
    if (device === 2) return 'U';
  }

  // Default: Active
  return 'A';
}

/**
 * Get file type from MIME type
 */
function getFileTypeFromMimeType(mimeType) {
  const mimeMap = {
    'image/jpeg': 'IMAGE',
    'image/png': 'IMAGE',
    'application/pdf': 'PDF',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'WORD',
  };

  return mimeMap[mimeType] || 'IMAGE';
}

/**
 * Get file extension from file name
 */
function getFileExtension(fileName) {
  return fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
}

/**
 * Validate file for upload
 */
function validateFileUpload(file) {
  const errors = [];

  if (!file) {
    errors.push('File is required');
    return { valid: false, errors };
  }

  // Check file size (300 KB max)
  const fileSizeKB = file.size / 1024;
  if (fileSizeKB > 300) {
    errors.push('File size must not exceed 300 KB');
  }

  // Check file type
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    errors.push('Only JPG, PNG, PDF, and Word documents are allowed');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Build user query filter
 */
function buildUserQueryFilter(searchParams) {
  let whereClause = '';
  const conditions = [];

  if (searchParams.userId) {
    conditions.push(`var_usermst_userid LIKE '%${searchParams.userId}%'`);
  }

  if (searchParams.empCode) {
    conditions.push(`var_usermst_empcode = '${searchParams.empCode}'`);
  }

  if (searchParams.status) {
    conditions.push(`var_usermst_status = '${searchParams.status}'`);
  }

  if (searchParams.brid) {
    conditions.push(`num_usermst_brid = ${searchParams.brid}`);
  }

  if (searchParams.roleId) {
    conditions.push(`num_usermst_roleid = ${searchParams.roleId}`);
  }

  if (conditions.length > 0) {
    whereClause = 'WHERE ' + conditions.join(' AND ');
  }

  return whereClause;
}

/**
 * Generate audit log entry
 */
function generateAuditLogEntry(action, actor, entityId, status, details) {
  return {
    action,
    actor,
    module: 'userCreation',
    entityId,
    status,
    details,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Sanitize user input
 */
function sanitizeUserInput(input) {
  if (typeof input === 'string') {
    return input.trim();
  }

  if (typeof input === 'object' && input !== null) {
    const sanitized = {};
    for (const [key, value] of Object.entries(input)) {
      sanitized[key] = sanitizeUserInput(value);
    }
    return sanitized;
  }

  return input;
}

/**
 * Check if user has required role
 */
function hasRole(userRoles, requiredRole) {
  if (!Array.isArray(userRoles)) {
    return userRoles === requiredRole;
  }
  return userRoles.includes(requiredRole);
}

/**
 * Get user role name from ID
 */
function getRoleNameFromId(roleId) {
  const roleMap = {
    1: 'FOS',
    2: 'Branch Operations',
    3: 'Admin',
    4: 'UPass Admin',
  };

  return roleMap[parseInt(roleId)] || 'Unknown';
}

/**
 * Get device type name from ID
 */
function getDeviceNameFromId(deviceId) {
  const deviceMap = {
    1: 'Web',
    2: 'Mobile',
  };

  return deviceMap[parseInt(deviceId)] || 'Unknown';
}

module.exports = {
  formatUserName,
  generateUserId,
  removeUserIdPrefix,
  isValidEmail,
  isValidMobileNumber,
  calculateAge,
  isValidPAN,
  isValidAadhaar,
  isValidPassport,
  validateIdProof,
  formatDate,
  formatDateISO,
  parseDate,
  determineUserStatus,
  getFileTypeFromMimeType,
  getFileExtension,
  validateFileUpload,
  buildUserQueryFilter,
  generateAuditLogEntry,
  sanitizeUserInput,
  hasRole,
  getRoleNameFromId,
  getDeviceNameFromId,
};
