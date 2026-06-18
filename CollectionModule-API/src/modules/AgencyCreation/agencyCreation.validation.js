const { z } = require('zod');

const nullableString = z.string().trim().optional().nullable();
const nullableNumber = z.number().optional().nullable();

// Get states
const getStatesSchema = z.object({});

// Get districts by state
const getDistrictsByStateSchema = z.object({
  stateId: z.coerce.number().int('State ID must be a number').min(1, 'State ID is required'),
});

// Get product options by main product
const getProductOptionsSchema = z.object({
  mainProduct: z.coerce.number().int('Main product must be a number'),
});

// Get SMA buckets
const getSMABucketsSchema = z.object({});

// Create agency schema
const createAgencySchema = z.object({
  agencyName: z.string().trim().min(1, 'Agency name is required').min(3, 'Agency name must be at least 3 characters'),
  stateId: z.coerce.number().int('State ID must be a number').min(1, 'State is required'),
  districtId: z.coerce.number().int('District ID must be a number').min(1, 'District is required'),
  city: z.string().trim().min(1, 'City is required'),
  address: z.string().trim().min(1, 'Address is required'),
  products: z.string().trim().optional().nullable(),
  smaBucket: z.string().trim().optional().nullable(),
});

// Update agency schema
const updateAgencySchema = createAgencySchema.extend({
  agencyId: z.coerce.number().int('Agency ID must be a number').min(1, 'Agency ID is required'),
});

// Validate agency name
const validateAgencyNameSchema = z.object({
  agencyName: z.string().trim().min(3, 'Agency name must be at least 3 characters'),
});

const agencyBaseSchema = z.object({
  id: z.coerce.number().int("Agency ID must be a number"),

  code: z.string().trim().min(1, "Agency code is required"),

  name: z.string().trim().min(1, "Agency name is required"),

  type: nullableString,

  status: nullableString,

  licenseNo: nullableString,

  licenseExpiry: nullableString,

  coverageZones: nullableString,

  maxCases: nullableNumber,

  currentCases: nullableNumber,

  maxFos: nullableNumber,

  slaConfig: nullableString,

  contactEmail: nullableString,

  contactPhone: nullableNumber,

  address1: nullableString,

  city: nullableString,

  state: nullableString,

  pincode: nullableString,

  country: nullableString,

  config: nullableString,

  username: z.string().trim().min(1, "Username is required"),
});

const createAgencySchemaNew = agencyBaseSchema;

module.exports = {
  getStatesSchema,
  getDistrictsByStateSchema,
  getProductOptionsSchema,
  getSMABucketsSchema,
  createAgencySchema,
  updateAgencySchema,
  validateAgencyNameSchema,
  createAgencySchemaNew
};
