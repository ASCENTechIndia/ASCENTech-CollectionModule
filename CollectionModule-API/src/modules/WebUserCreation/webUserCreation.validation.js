const { z } = require('zod');

const nullableString = z.string().trim().optional().nullable();
const nullableNumber = z.number().optional().nullable();

// Form options validation
const formOptionsSchema = z.object({
  type: z.string().trim().optional(),
});

// Get user details by ID
const getUserDetailsByIdSchema = z.object({
  userId: z.string().trim().min(1, 'User ID is required'),
});

// Get branches for web user creation (role-based filtering)
const getBranchesWebSchema = z.object({
  branchCategory: z.coerce.number().int('Branch category must be a number'),
  userLevel: z.coerce.number().int('User level must be a number'),
});

// Get roles for web user creation
const getRolesWebSchema = z.object({
  branchCategory: z.coerce.number().int('Branch category must be a number'),
});

// Create/Update web user schema
const webUserBaseSchema = z.object({
  brid: z.coerce.number().int('Branch ID must be a number'),
  firstname: z.string().trim().min(1, 'First name is required'),
  lastname: z.string().trim().min(1, 'Last name is required'),
  dob: nullableString,
  mobno: z.coerce.number().int('Mobile number must be numeric'),
  email: nullableString,
  usertypeid: z.coerce.number().int('User type ID must be a number'),
  desgid: z.coerce.number().int('Designation ID must be a number'),
  roleid: z.coerce.number().int('Role ID must be a number'),
  compcode: z.coerce.number().int('Company code must be a number'),
  workid: z.coerce.number().int('Working for ID must be a number'),
  empid: nullableNumber,
  collectionid: z.coerce.number().int('Collection team ID must be a number'),
  categoryid: z.coerce.number().int('Category ID must be a number'),
  status: z.string().trim().min(1, 'Status is required'),
  empcode: z.string().trim().min(1, 'Employee code is required'),
  prooftype: z.coerce.number().int('Proof type must be a number'),
  proofno: nullableString,
  compid: z.coerce.number().int('Company ID must be a number'),
  insby: z.string().trim().min(1, 'Inserted by is required'),
  mode: z.coerce.number().int('Mode must be a number'),
  userid: nullableString,
});

const createWebUserSchema = webUserBaseSchema.extend({
  requeststatus: z.string().trim().default('A'),
});

const updateWebUserSchema = webUserBaseSchema.extend({
  requeststatus: nullableString,
});

// Validate mobile number
const validateMobileSchema = z.object({
  mobno: z.string().trim().regex(/^\d{10}$/, 'Mobile number must be 10 digits'),
});

// Validate email
const validateEmailSchema = z.object({
  email: z.string().email('Invalid email format'),
});

// Validate ID proof
const validateIdProofSchema = z.object({
  proofType: z.coerce.number().int(),
  proofNo: z.string().trim().min(1),
});

// File upload validation
const fileUploadSchema = z.object({
  userId: z.string().trim().min(1),
  imageType: z.enum(['IMAGE', 'PDF', 'WORD']),
  documentType: z.enum(['IDPROOF', 'UNDERTAKING']),
});

module.exports = {
  formOptionsSchema,
  getUserDetailsByIdSchema,
  getBranchesWebSchema,
  getRolesWebSchema,
  createWebUserSchema,
  updateWebUserSchema,
  validateMobileSchema,
  validateEmailSchema,
  validateIdProofSchema,
  fileUploadSchema,
};
