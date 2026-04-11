const express = require('express');
const { z } = require('zod');
const { dashboardSummary } = require('./master.controller');
const validate = require('../../middleware/validate.middleware');
const { authRequired } = require('../../middleware/auth');

const router = express.Router();

const dashboardSummarySchema = z.object({
	brCategory: z.string().trim().min(1),
	brid: z.string().trim().min(1).optional(),
});

router.get('/dashboard-summary', authRequired, validate(dashboardSummarySchema, { source: 'query' }), dashboardSummary);

module.exports = router;
