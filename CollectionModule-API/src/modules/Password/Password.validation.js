const { z } = require('zod');

const nullableString = z.string().trim().optional().nullable();

const resetPasswordSchema = z.object({
  userId: z.string().min(1, "UserId is required"),
});


module.exports = {
  resetPasswordSchema}