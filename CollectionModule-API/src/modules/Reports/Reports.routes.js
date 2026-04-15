const express = require('express');
const validate = require('../../middleware/validate.middleware');
const { authRequired } = require('../../middleware/auth');
const { accAllocationSchema, dailyUploadSchema,pincodeHistorySchema
} = require('./Reports.validation');
const { accAllocationHandler, dailyUploadedReportHandler, pinCodeHistoryHandler, nonVisitDoneHandler
} = require('./Reports.controller');

const router = express.Router();

router.get('/AccAllocationReport',validate(accAllocationSchema, { source: 'query' }),accAllocationHandler);
router.get('/dailyUploadedReport',validate(dailyUploadSchema, { source: 'query' }),dailyUploadedReportHandler);
router.get('/inactiveuserPincodeHistory',validate(pincodeHistorySchema, { source: 'query' }),pinCodeHistoryHandler);
router.get('/nonVisitDoneSummary', nonVisitDoneHandler);

module.exports = router;
