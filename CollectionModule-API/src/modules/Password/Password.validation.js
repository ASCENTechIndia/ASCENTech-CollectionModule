const { z } = require('zod');

const nullableString = z.string().trim().optional().nullable();

const resetPasswordSchema = z.object({
  userId: z.string().min(1, "UserId is required"),
});

const changePasswordSchema = z.object({
  userId: z.string().min(1, "UserId is required"),

  oldPassword: z.string().min(1, "Old password is required"),

  newPassword: z.string()
    .min(6, "Minimum 6 characters required")
    .refine((val) => !/[@#$%&~\-\^\*]/.test(val), {
      message: "Password should not contain @,#,$,%,&,~,-,^,* special characters",
    }),
});

module.exports = {
  resetPasswordSchema, changePasswordSchema}