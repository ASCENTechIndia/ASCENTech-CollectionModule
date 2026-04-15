const express = require('express');
const validate = require('../../middleware/validate.middleware');
const { authRequired } = require('../../middleware/auth');
const { accAllocationSchema, dailyUploadSchema
} = require('./Reports.validation');
const { accAllocationHandler, dailyUploadedReportHandler
} = require('./Reports.controller');

const router = express.Router();

router.get('/AccAllocationReport',validate(accAllocationSchema, { source: 'query' }),accAllocationHandler);
router.get('/dailyUploadedReport',validate(dailyUploadSchema, { source: 'query' }),dailyUploadedReportHandler);

module.exports = router;
