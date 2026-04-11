const express = require('express');
const validate = require('../../middleware/validate.middleware');
const {
  createUserSchema,
  updateUserSchema,
  userStatusSchema,
  userRoleSchema,
  userSearchSchema,
} = require('./users.validation');
const {
  createUserHandler,
  updateUserHandler,
  updateUserStatusHandler,
  updateRoleHandler,
  searchHandler,
} = require('./users.controller');

const router = express.Router();

router.post('/', validate(createUserSchema), createUserHandler);
router.put('/', validate(updateUserSchema), updateUserHandler);
router.patch('/status', validate(userStatusSchema), updateUserStatusHandler);
router.patch('/role', validate(userRoleSchema), updateRoleHandler);
router.get('/search', validate(userSearchSchema, { source: 'query' }), searchHandler);

module.exports = router;
