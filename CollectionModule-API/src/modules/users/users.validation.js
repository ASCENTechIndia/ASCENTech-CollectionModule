const { z } = require('zod');

const nullableString = z.string().trim().optional().nullable();

const userBaseSchema = z.object({
  in_brid: z.number().int(),
  in_userid: nullableString,
  in_username: z.string().trim().min(1),
  in_mobno: z.number().int(),
  in_email: z.string().email(),
  in_usertypeid: z.number().int(),
  in_DOB: nullableString,
  in_proofno: nullableString,
  in_desgid: z.number().int(),
  in_roleid: z.number().int(),
  in_compcode: z.number().int(),
  in_workid: z.number().int(),
  in_empid: z.number().int().optional().nullable(),
  in_collectionid: z.number().int(),
  in_categoryid: z.number().int(),
  in_mode: z.number().int(),
  in_status: z.string().trim().min(1),
  in_Empcode: z.string().trim().min(1),
  in_firstname: nullableString,
  in_lastname: nullableString,
  in_prooftype: z.number().int(),
  in_compid: z.number().int(),
  in_insby: z.string().trim().min(1),
});

const createUserSchema = userBaseSchema.extend({
  in_Requeststatus: z.string().trim().default('A'),
  in_pincode: z.number().int().optional().nullable(),
});

const createWebUserSchema = createUserSchema;

const updateUserSchema = userBaseSchema.extend({
  in_Requeststatus: nullableString,
});

const userStatusSchema = z.object({
  in_UserId: z.string().trim().min(1),
  in_ddlstatus: z.string().trim().min(1),
  in_reason: nullableString,
  in_insby: z.string().trim().min(1),
});

const userRoleSchema = z.object({
  userId: z.string().trim().min(1),
  roleId: z.number().int(),
  mode: z.number().int().optional(),
});

const userSearchSchema = z.object({
  brid: z.string().trim().optional(),
  userId: z.string().trim().optional(),
  empCode: z.string().trim().optional(),
  status: z.string().trim().optional(),
  roleId: z.string().trim().optional(),
});

const userDetailSchema = z.object({
  userId: z.string().trim().min(1),
});

const userFormOptionsSchema = z.object({
  type: z.string().trim().optional(),
  workingForId: z.string().trim().optional(),
  branchId: z.string().trim().optional(),
  zoneId: z.string().trim().optional(),
  regionId: z.string().trim().optional(),
});

const userRegionLookupSchema = z.object({
  zoneId: z.string().trim().min(1),
});

const userBranchLookupSchema = z.object({
  regionId: z.string().trim().min(1),
});

const branchSchema = z.object({
  brcategory:z.string().trim().min(1),
  userLevel : z.string().trim().min(1)
})

const agentSchema = z.object({
  brid:z.string().trim().min(1)
})

const userWebSchema = z.object({
  in_brid: z.number().int(),
  in_userid: z.string().trim().min(1),
  in_username: z.string().trim().min(1),
  in_userpwd: nullableString, 
  in_mobno: z.number().int(),
  in_empid: z.number().int().optional().nullable(),
  in_usertypeid: z.number().int(),
  in_DOB: nullableString,
  in_proofno: nullableString,
  in_desgid: z.number().int(),
  in_roleid: z.number().int(),
  in_compcode: z.number().int(),
  in_workid: z.number().int(),
  in_empid: z.number().int().optional().nullable(),
  in_collectionid: z.number().int(),
  in_categoryid: z.number().int(),
  in_mode: z.number().int(),
  in_status: z.string().trim().min(1),
  in_Empcode: z.string().trim().min(1),
  in_firstname: z.string().trim().min(1),
  in_lastname:z.string().trim().min(1),
  in_prooftype: z.number().int(),
  in_compid: z.number().int(),
  in_insby: z.string().trim().min(1),
});

module.exports = {
  createUserSchema,
  createWebUserSchema,
  updateUserSchema,
  userStatusSchema,
  userRoleSchema,
  userSearchSchema,
  userDetailSchema,
  userFormOptionsSchema,
  userRegionLookupSchema,
  userBranchLookupSchema,
  branchSchema,
  agentSchema, userWebSchema
};
