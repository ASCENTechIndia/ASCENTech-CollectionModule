const { z } = require('zod');


const userTracLocationSchema = z.object({
  userId: z.string().min(1, "UserId is required"),
  cDate: z.string().min(1, "Date is required"),
});

const lastLoginSchema = z.object({
  userId: z.string().min(1, "UserId is required"),
});

module.exports = {
  userTracLocationSchema, lastLoginSchema }