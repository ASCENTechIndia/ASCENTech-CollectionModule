const { z } = require('zod');

const dateText = z
  .string({ required_error: 'Date is required' })
  .trim()
  .regex(/^\d{2}-[A-Za-z]{3}-\d{4}$/, 'Date must be in DD-Mon-YYYY format');

const inactiveUserAccountsSearchSchema = z.object({
  startDate: dateText,
  endDate: dateText,
  userType: z.enum(['1', '2', 'Inactive', 'All'], {
    errorMap: () => ({ message: 'userType must be Inactive/All or 1/2' }),
  }),
  userId: z.string().trim().optional(),
});

const unallocateAllAccountsSchema = z.object({}).passthrough();

module.exports = {
  inactiveUserAccountsSearchSchema,
  unallocateAllAccountsSchema,
};
