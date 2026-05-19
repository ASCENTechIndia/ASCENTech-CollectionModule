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

// Search employee by code and working for
const searchEmployeeSchema = z.object({
  workingForId: z.coerce.number().int('Working For ID must be a number'),
  empCode: z.string().trim().min(1, 'Employee code is required'),
});

// Create/Update user schema
const userCreationBaseSchema = z.object({
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

const createUserSchema = userCreationBaseSchema.extend({
  requeststatus: z.string().trim().default('A'),
  pincode: nullableNumber,
});

const updateUserSchema = userCreationBaseSchema.extend({
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
  documentType: z.enum(['IDPROOF', 'UNDERTAKING']), // Which image to replace
});

module.exports = {
  formOptionsSchema,
  getUserDetailsByIdSchema,
  searchEmployeeSchema,
  createUserSchema,
  updateUserSchema,
  validateMobileSchema,
  validateEmailSchema,
  validateIdProofSchema,
  fileUploadSchema,
};
