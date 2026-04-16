const express = require('express');
const validate = require('../../middleware/validate.middleware');
const { authRequired } = require('../../middleware/auth');
const { accAllocationSchema, dailyUploadSchema,pincodeHistorySchema, regionSchema
} = require('./Reports.validation');
const { accAllocationHandler, dailyUploadedReportHandler, pinCodeHistoryHandler, nonVisitDoneHandler,
    overallPerformanceHandler, visitDoneHandler, smaSummaryHandler, zoneInReportHandler, regionsHandler
} = require('./Reports.controller');

const router = express.Router();

router.get('/AccAllocationReport',validate(accAllocationSchema, { source: 'query' }),accAllocationHandler);
router.get('/dailyUploadedReport',validate(dailyUploadSchema, { source: 'query' }),dailyUploadedReportHandler);
router.get('/inactiveuserPincodeHistory',validate(pincodeHistorySchema, { source: 'query' }),pinCodeHistoryHandler);
router.get('/nonVisitDoneSummary', nonVisitDoneHandler);
router.get('/overallPerformanceSummary', overallPerformanceHandler);
router.get('/visitDoneSummary', visitDoneHandler);
router.get('/smaSummary', smaSummaryHandler);
router.get('/getZones', zoneInReportHandler);
router.get('/getRegions', validate(regionSchema, {source: 'query'}), regionsHandler);

module.exports = router;
