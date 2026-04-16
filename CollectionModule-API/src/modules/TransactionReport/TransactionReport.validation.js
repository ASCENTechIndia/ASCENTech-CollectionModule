const { z } = require('zod');

const regionSchema = z.object({
  zoneId: z.string().min(1, "zoneId is required"),
  brid: z.string().optional(),
  brcategory: z.string().optional()
});

const branchSchema = z.object({
  regionId: z.string().min(1, "regionId is required"),
  brid: z.string().optional(),
  brcategory: z.string().optional()
});

const collAssociateSchema = z.object({  
  brid: z.string().min(1, "brid is required"),
});

const transDetailsSchema = z.object({
  fromDate: z.string(),
  toDate: z.string(),
  smaType: z.string().optional(),
  brid: z.string().optional(),
  userId: z.string().optional(),
  associateId: z.string().optional(),
  transtype: z.string().optional(),
  zoneName: z.string().optional(),
  regionName: z.string().optional(),
  userOf : z.string()
});

const imageSchema = z.object({
  imageCode: z.string().min(1, "imageCode is required")
});


module.exports = { regionSchema, branchSchema, collAssociateSchema, transDetailsSchema, imageSchema};
