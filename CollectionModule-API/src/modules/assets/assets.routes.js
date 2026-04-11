const express = require('express');
const validate = require('../../middleware/validate.middleware');
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

router.post('/register', validate(assetRegisterSchema), registerHandler);
router.post('/assign', validate(assetAssignSchema), assignHandler);
router.post('/transfer', validate(assetTransferSchema), transferHandler);
router.post('/status', validate(assetStatusSchema), updateStatusHandler);

module.exports = router;
