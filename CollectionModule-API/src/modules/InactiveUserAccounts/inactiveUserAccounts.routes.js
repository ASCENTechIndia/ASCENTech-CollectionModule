const express = require('express');
const validate = require('../../middleware/validate.middleware');
const { authRequired } = require('../../middleware/auth');
const {
  inactiveUserAccountsSearchSchema,
  unallocateAllAccountsSchema,
} = require('./inactiveUserAccounts.validation');
const {
  searchInactiveUserAccountsHandler,
  unallocateAllAccountsHandler,
} = require('./inactiveUserAccounts.controller');

const router = express.Router();

router.get(
  '/search',
  validate(inactiveUserAccountsSearchSchema, { source: 'query' }),
  searchInactiveUserAccountsHandler
);

router.post(
  '/unallocate-all',
  validate(unallocateAllAccountsSchema),
  unallocateAllAccountsHandler
);

module.exports = router;
