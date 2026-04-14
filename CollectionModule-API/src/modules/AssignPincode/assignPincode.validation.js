const { z } = require('zod');

const nullableString = z.string().trim().optional().nullable();

const userFindSchema = z.object({
  userId: z.string().min(1, "UserId is required"),
});

const pinCodeAssignSchema = z.object({
username: z.number().min(1, "UserId is required"),
  pincode_str: z.string()
    .regex(/^(\d{6})(~\d{6})*$/, "Invalid pincode format")
});

module.exports = {
  userFindSchema, pinCodeAssignSchema}