const express = require('express');
const validate = require('../../middleware/validate.middleware');
const { authRequired } = require('../../middleware/auth');
const {
  assetRegisterSchema,
  assetAssignSchema,
  assetTransferSchema,
  assetStatusSchema,
} = require('./assets.validation');
const {
  registerHandler,
  assignHandler,
  transferHandler,
  updateStatusHandler,
} = require('./assets.controller');

const router = express.Router();

router.post('/register', authRequired, validate(assetRegisterSchema), registerHandler);
router.post('/assign', authRequired, validate(assetAssignSchema), assignHandler);
router.post('/transfer', authRequired, validate(assetTransferSchema), transferHandler);
router.post('/status', authRequired, validate(assetStatusSchema), updateStatusHandler);

module.exports = router;
