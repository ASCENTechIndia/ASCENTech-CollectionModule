const express = require('express');
const { authRequired } = require('../../../middleware/auth');
const { getPropertySummaryDashboardHandler } = require('./propertySummary.controller');

const router = express.Router();

/**
 * GET /property-summary/dashboard
 * Get complete property summary dashboard with all data
 */
router.get('/dashboard', authRequired, getPropertySummaryDashboardHandler);

module.exports = router;
