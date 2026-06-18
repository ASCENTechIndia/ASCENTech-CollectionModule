const express = require('express');
const validate = require('../../middleware/validate.middleware');
const { authRequired } = require('../../middleware/auth');
const {
  getStatesSchema,
  getDistrictsByStateSchema,
  getProductOptionsSchema,
  getSMABucketsSchema,
  createAgencySchema,
  updateAgencySchema,
  validateAgencyNameSchema,
  createAgencySchemaNew
} = require('./agencyCreation.validation');
const {
  getStatesHandler,
  getDistrictsByStateHandler,
  getProductOptionsHandler,
  getSMABucketsHandler,
  validateAgencyHandler,
  createAgencyHandler,
  updateAgencyHandler,
  getAgencyHandler,
  getAgenciesHandler,
  deleteAgencyHandler,
  createAgencyHandlerNew
} = require('./agencyCreation.controller');

const router = express.Router();

// Public endpoints for agency creation
router.get('/states', getStatesHandler);
router.get('/districts', validate(getDistrictsByStateSchema, { source: 'query' }), getDistrictsByStateHandler);
router.get('/product-options', validate(getProductOptionsSchema, { source: 'query' }), getProductOptionsHandler);
router.get('/sma-buckets', getSMABucketsHandler);
router.get('/details', getAgencyHandler);
router.get('/list', getAgenciesHandler);

// Protected endpoints for agency management
router.post('/validate', authRequired, validate(createAgencySchema, { source: 'body' }), validateAgencyHandler);
router.post('/create', authRequired, validate(createAgencySchema, { source: 'body' }), createAgencyHandler);
router.put('/update', authRequired, validate(updateAgencySchema, { source: 'body' }), updateAgencyHandler);
router.delete('/delete', authRequired, deleteAgencyHandler);
router.post('/create-new', authRequired, validate(createAgencySchemaNew, { source: 'body' }), createAgencyHandlerNew);
module.exports = router;
