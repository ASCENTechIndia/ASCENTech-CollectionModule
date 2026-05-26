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

module.exports = {
  getStatesSchema,
  getDistrictsByStateSchema,
  getProductOptionsSchema,
  getSMABucketsSchema,
  createAgencySchema,
  updateAgencySchema,
  validateAgencyNameSchema,
};
