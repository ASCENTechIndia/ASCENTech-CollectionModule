const express = require('express');
const validate = require('../../middleware/validate.middleware');
const { authRequired } = require('../../middleware/auth');
const {
  userTracLocationSchema,
  lastLoginSchema,
  unassignCasesSchema,
} = require('./Admin.validation');
const {
  locationTrackingHandler,
  lastLoginHandler,
  bucketSetterHandler,
  getUsersWithPincodesHandler,
  unassignCasesHandler,
} = require('./Admin.controller');

const router = express.Router();

router.get(
  '/getLocationTracking',
  validate(userTracLocationSchema, { source: 'query' }),
  locationTrackingHandler
);
router.get(
  '/getLastLogin',
  validate(lastLoginSchema, { source: 'query' }),
  lastLoginHandler
);
router.post('/bucketsetter', bucketSetterHandler);
router.get('/unassign-cases/users', getUsersWithPincodesHandler);
router.post(
  '/unassign-cases',
  validate(unassignCasesSchema, { source: 'body' }),
  unassignCasesHandler
);

module.exports = router;

