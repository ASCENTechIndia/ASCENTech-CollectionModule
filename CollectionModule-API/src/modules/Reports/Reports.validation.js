const { z } = require('zod');

const dateText = z
  .string({ required_error: 'Date is required' })
  .trim()
  .regex(/^\d{2}-[A-Za-z]{3}-\d{4}$/, 'Date must be in DD-Mon-YYYY format');

const accAllocationSchema = z.object({
  startDate: dateText,
  endDate: dateText,
  userId: z.string().optional().or(z.literal('')).nullable(),
  smaType: z.string().optional().or(z.literal('')).nullable(),
  branchName: z.string().optional().or(z.literal('')).nullable(),
  brid: z.string().optional().or(z.literal('')).nullable()
});


module.exports = {accAllocationSchema};