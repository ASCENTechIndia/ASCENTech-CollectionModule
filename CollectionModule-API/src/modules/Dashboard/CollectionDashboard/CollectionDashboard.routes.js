const express = require('express');
const { dashboardSummaryHandler,dashboardDailyTransactionHandler , dashboardPaymentModeHandler} = require('./CollectionDashboard.controller');

const router = express.Router();

router.get(
  '/summary',
  dashboardSummaryHandler
);

router.get(
  "/daily-transactions",
  dashboardDailyTransactionHandler
);

router.get(
  "/payment-mode",
  dashboardPaymentModeHandler
);

module.exports = router;
