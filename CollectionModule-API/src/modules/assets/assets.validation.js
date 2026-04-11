const { z } = require('zod');

const assetPropertySchema = z.object({
  Assetid: z.string().trim().min(1),
  Propid: z.number().int(),
  Category: z.string().trim().min(1),
  Propertyvalue: z.string().trim().min(1),
});

const assetRegisterSchema = z.object({
  in_UserId: z.string().trim().min(1),
  in_brid: z.number().int(),
  in_catgoryid: z.number().int(),
  in_ownerid: z.number().int(),
  in_compid: z.number().int(),
  in_vendorid: z.number().int(),
  in_compname: z.string().trim().min(1),
  in_model: z.string().trim().min(1),
  in_status: z.number().int(),
  in_Mode: z.number().int(),
  in_assetuser: z.string().trim().optional().nullable(),
  in_sourceid: z.number().int().optional().nullable(),
  in_remark: z.string().trim().optional().nullable(),
  properties: z.array(assetPropertySchema).min(1),
});

const assetAssignSchema = z.object({
  in_UserId: z.string().trim().min(1),
  in_brid: z.number().int(),
  in_AssUser: z.string().trim().min(1),
  in_AssetString: z.string().trim().min(1),
});

const assetTransferSchema = z.object({
  in_UserId: z.string().trim().min(1),
  in_brid: z.number().int(),
  in_transbrid: z.number().int(),
  in_assetid: z.string().trim().min(1),
  in_remark: z.string().trim().optional().nullable(),
});

const assetStatusSchema = z.object({
  in_UserId: z.string().trim().min(1),
  in_brid: z.number().int(),
  in_AssetString: z.string().trim().min(1),
});

module.exports = {
  assetRegisterSchema,
  assetAssignSchema,
  assetTransferSchema,
  assetStatusSchema,
};
