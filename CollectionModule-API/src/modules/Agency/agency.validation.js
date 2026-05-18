const { z } = require('zod');

const nullableString = z.string().trim().optional().nullable();

const agencyBaseSchema = z.object({
  agencyName: z.string().trim().min(1, 'Agency Name is required'),
  stateID: z.number().int().min(1, 'State ID is required'),
  districtID: z.number().int().min(1, 'District ID is required'),
  villageName: z.string().trim().min(1, 'Village/City Name is required'),
  address: z.string().trim().min(1, 'Address is required'),
  products: z.string().trim().min(1, 'Products are required'),
  smaBucket: z.string().trim().min(1, 'SMA Bucket is required'),
});

const createAgencySchema = agencyBaseSchema.extend({
  createdBy: z.string().trim().optional().default('system'),
});

const getStatesSchema = z.object({
  // No required parameters
});

const getDistrictsSchema = z.object({
  stateID: z.number().int().min(1, 'State ID is required'),
});

module.exports = {
  agencyBaseSchema,
  createAgencySchema,
  getStatesSchema,
  getDistrictsSchema,
};
