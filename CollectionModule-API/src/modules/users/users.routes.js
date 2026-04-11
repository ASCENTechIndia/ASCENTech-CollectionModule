const express = require('express');
const validate = require('../../middleware/validate.middleware');
const {
  createUserSchema,
  updateUserSchema,
  userStatusSchema,
  userRoleSchema,
  userSearchSchema, branchSchema,
  agentSchema
} = require('./users.validation');
const {
  createUserHandler,
  updateUserHandler,
  updateUserStatusHandler,
  updateRoleHandler,
  searchHandler, branchListHandler,
  agentListHandler
} = require('./users.controller');

const router = express.Router();

router.post('/', validate(createUserSchema), createUserHandler);
router.put('/', validate(updateUserSchema), updateUserHandler);
router.patch('/status', validate(userStatusSchema), updateUserStatusHandler);
router.patch('/role', validate(userRoleSchema), updateRoleHandler);
router.get('/search', validate(userSearchSchema, { source: 'query' }), searchHandler);
router.get('/getBranches', validate(branchSchema, { source: 'query' }), branchListHandler);
router.get('/getAgents', validate(agentSchema, {source: 'query'}), agentListHandler)

module.exports = router;
