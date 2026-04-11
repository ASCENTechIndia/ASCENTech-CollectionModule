const express = require('express');
const validate = require('../../middleware/validate.middleware');
const { authRequired } = require('../../middleware/auth');
const {
  createUserSchema,
  updateUserSchema,
  userStatusSchema,
  userRoleSchema,
  userSearchSchema, branchSchema,
  agentSchema,
  userFormOptionsSchema,
  userRegionLookupSchema,
  userBranchLookupSchema,
  mobileUserSubmitSchema,
} = require('./users.validation');
const {
  createUserHandler,
  updateUserHandler,
  updateUserStatusHandler,
  updateRoleHandler,
  searchHandler, branchListHandler,
  agentListHandler,
  getUserFormOptionsHandler,
  getRegionsHandler,
  getBranchesHandler,
  mobileUserSubmitHandler,
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
router.get('/getBranches', validate(branchSchema, { source: 'query' }), branchListHandler);
router.get('/getAgents', validate(agentSchema, {source: 'query'}), agentListHandler);
router.post('/add-mobile-user', authRequired, validate(mobileUserSubmitSchema), mobileUserSubmitHandler);

module.exports = router;
