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

const createMappingSchema = z.object({
  companyId: z.preprocess(
    (val) => (val === "" ? null : val),
    z.number({ invalid_type_error: "Company Id is required" })
  ),
  agencyId: z.preprocess(
    (val) => (val === "" ? null : val),
    z.number({ invalid_type_error: "Agency Id is required" })
  ),
  createdBy: z.string().trim().min(1, "Created by is required"),
  remark: z.string().optional(),
  relationship: z.string().trim().min(1, "Relationship is required"),
  context: z.string().trim().min(1, "Context is required"),
  effectiveFrom: z.string().optional(),
  effectiveTo: z.string().optional(),
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
  userId: z.string().trim().min(1, 'User ID is required'),
  imagePosition: z.coerce.number().int().min(1).max(3).optional(),
  imageType: z.enum(['IMAGE', 'PDF', 'WORD']).optional(),
  documentType: z.enum(['IDPROOF', 'UNDERTAKING']).optional(),
});

// Branch query validation
const getBranchesSchema = z.object({
  branchCategory: z.coerce.number().int('Branch category must be a number').optional(),
  userLevel: z.coerce.number().int('User level must be a number').optional(),
});

// User status query validation
const getUserStatusSchema = z.object({
  roleId: z.coerce.number().int('Role ID must be a number'),
  deviceTypeId: z.coerce.number().int('Device Type ID must be a number'),
});

// FOS User creation schema (Jayesh's parameters)
const createUserSchemaNew = z.object({
  in_brid: z.coerce.number({ required_error: 'in_brid is required' }),
  in_userid: z.string().optional().nullable(),
  in_username: z.string({ required_error: 'in_username is required' }).min(1),
  in_userpwd: z.string().optional().nullable(),
  in_mobno: z.coerce.number({ required_error: 'in_mobno is required' }),
  in_email: z.string().email().optional().nullable(),
  in_usertypeid: z.coerce.number({ required_error: 'in_usertypeid is required' }),
  in_DOB: z.string().optional().nullable(),
  in_proofno: z.string().optional().nullable(),
  in_desgid: z.coerce.number({ required_error: 'in_desgid is required' }),
  in_roleid: z.coerce.number({ required_error: 'in_roleid is required' }),
  in_compcode: z.coerce.number({ required_error: 'in_compcode is required' }),
  in_workid: z.coerce.number().optional().nullable(),
  in_empid: z.coerce.number().optional().nullable(),
  in_collectionid: z.coerce.number().optional().nullable(),
  in_categoryid: z.coerce.number().optional().nullable(),
  in_status: z.string().default('A'),
  in_Empcode: z.string().optional().nullable(),
  in_firstname: z.string({ required_error: 'in_firstname is required' }).min(1),
  in_lastname: z.string().optional().nullable(),
  in_prooftype: z.coerce.number().optional().nullable(),
  in_mode: z.coerce.number().default(1),
  in_compid: z.coerce.number({ required_error: 'in_compid is required' }),
  in_insby: z.string({ required_error: 'in_insby is required' }).min(1),
  in_Requeststatus: z.string().default('P'),
  in_var_user_teamlead: z.string().optional().nullable(),
  in_num_fosmst_whatsapp: z.coerce.number().optional().nullable(),
  in_var_fosmst_skills: z.string().optional().nullable(),
  in_var_fosmst_geo_zones: z.string().optional().nullable(),
  in_num_fosmst_max_cases_day: z.coerce.number().optional().nullable(),
  in_num_fosmst_current_open_cases: z.coerce.number().optional().nullable(),
  in_var_fosmst_aadhar_ref: z.string().optional().nullable(),
  in_dat_fosmst_joining_date: z.string().optional().nullable(),
  in_dat_fosmst_exit_date: z.string().optional().nullable(),
  in_num_fosmst_created_by: z.coerce.number().optional().nullable(),
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
  getBranchesSchema,
  getUserStatusSchema,
  createUserSchemaNew,
  createMappingSchema
};
