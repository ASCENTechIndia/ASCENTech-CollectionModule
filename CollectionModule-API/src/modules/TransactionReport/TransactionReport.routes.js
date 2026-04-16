const express = require('express');
const validate = require('../../middleware/validate.middleware');
const { authRequired } = require('../../middleware/auth');
const { regionSchema, branchSchema, collAssociateSchema, transDetailsSchema } = require('./TransactionReport.validation');
const { zoneInReportHandler, regionsHandler, branchHandler, collAssociateHandler, transDetailsHandler
} = require('./TransactionReport.controller');


const router = express.Router();

router.get('/getZones', zoneInReportHandler);
router.get('/getRegions', validate(regionSchema, {source: 'query'}), regionsHandler);
router.get('/getBranches', validate(branchSchema, {source: 'query'}), branchHandler);
router.get('/getCollAssociate', validate(collAssociateSchema, {source: 'query'}), collAssociateHandler);
router.get('/getTransDetails', validate(transDetailsSchema, {source: 'query'}), transDetailsHandler);

module.exports = router;