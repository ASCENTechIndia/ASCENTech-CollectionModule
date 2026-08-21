const express = require('express');
const { dashboardSummaryHandler,dashboardDailyTransactionHandler , dashboardPaymentModeHandler,
  dashboardTransactionModeHandler
} = require('./CollectionDashboard.controller');

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

router.get(
  "/transaction-mode",
  dashboardTransactionModeHandler
);

module.exports = router;
