const express = require('express');
const validate = require('../../middleware/validate.middleware');
const { authRequired } = require('../../middleware/auth');
const {
  createUserSchema,
  updateUserSchema,
  userStatusSchema,
  userRoleSchema,
  userSearchSchema,
  userFormOptionsSchema,
  userRegionLookupSchema,
  userBranchLookupSchema,
} = require('./users.validation');
const {
  createUserHandler,
  updateUserHandler,
  updateUserStatusHandler,
  updateRoleHandler,
  searchHandler,
  getUserFormOptionsHandler,
  getRegionsHandler,
  getBranchesHandler,
} = require('./users.controller');

const router = express.Router();

router.post('/', authRequired, validate(createUserSchema), createUserHandler);
router.put('/', authRequired, validate(updateUserSchema), updateUserHandler);
router.patch('/status', authRequired, validate(userStatusSchema), updateUserStatusHandler);
router.patch('/role', authRequired, validate(userRoleSchema), updateRoleHandler);
router.get('/search', authRequired, validate(userSearchSchema, { source: 'query' }), searchHandler);
router.get('/mobile-form-options', validate(userFormOptionsSchema, { source: 'query' }), getUserFormOptionsHandler);
router.get('/regions', validate(userRegionLookupSchema, { source: 'query' }), getRegionsHandler);
router.get('/branches', validate(userBranchLookupSchema, { source: 'query' }), getBranchesHandler);

module.exports = router;
