const { z } = require("zod");

const nullableString = z.string().trim().optional().nullable();

const userFindSchema = z.object({
  userId: z.string().min(1, "UserId is required"),
});

const pinCodeAssignSchema = z.object({
  username: z.number().min(1, "UserId is required"),
  pincode_str: z.string().regex(/^(\d{6})(~\d{6})*$/, "Invalid pincode format"),
});

const pincodeMasterInsertSchema = z.object({
  pincode: z
    .string({ required_error: 'Pincode cannot be empty' })
    .trim()
    .min(1, 'Pincode cannot be empty')
    .length(6, 'Pincode must be exactly 6 digits')
    .regex(/^\d+$/, 'Pincode must contain only numeric values')
    .refine((value) => value !== '000000', 'Pincode cannot be 000000'),
});

module.exports = {
  userFindSchema,
  pinCodeAssignSchema,
  pincodeMasterInsertSchema,
}
