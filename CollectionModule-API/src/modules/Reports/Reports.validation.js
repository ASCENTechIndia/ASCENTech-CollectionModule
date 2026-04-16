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

const dailyUploadSchema = z.object({
  startDate: dateText,
  endDate: dateText,
  userId: z.string().optional().or(z.literal('')).nullable(),
  smaType: z.string().optional().or(z.literal('')).nullable()
});

const pincodeHistorySchema = z.object({
  startDate: dateText,
  endDate: dateText,
  userId: z.string().optional().or(z.literal('')).nullable()
});

const boolFromQuery = z.preprocess((value) => {
  if (typeof value === 'boolean') {
    return value;
  }

  const text = String(value ?? '').trim().toLowerCase();
  if (!text) {
    return false;
  }

  return text === 'true' || text === '1' || text === 'yes';
}, z.boolean());

const userRouteSchema = z.object({
  fosId: z.string({ required_error: 'fosId is required' }).trim().min(1, 'fosId is required'),
  date: z.string({ required_error: 'date is required' }).trim().min(1, 'date is required'),
  withDistance: boolFromQuery.optional().default(false),
  userof: z.string().trim().optional().or(z.literal('')).nullable(),
});


module.exports = {accAllocationSchema, dailyUploadSchema, pincodeHistorySchema, accAllocationSchema, userRouteSchema};
