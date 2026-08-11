const express = require('express');
const validate = require('../../middleware/validate.middleware');
const { authRequired } = require('../../middleware/auth');
const {
  createAgencySchema,
  getDistrictsSchema,
} = require('./agency.validation');
const {
  getStatesHandler,
  getDistrictsHandler,
  createAgencyHandler,
} = require('./agency.controller');

const router = express.Router();

// Get all states (no auth required for dropdown data)
router.get('/states', getStatesHandler);

// Get districts by state (no auth required for dropdown data)
router.get('/districts', validate(getDistrictsSchema), getDistrictsHandler);

// Create new agency (requires auth)
router.post('/', authRequired, validate(createAgencySchema), createAgencyHandler);

module.exports = router;
