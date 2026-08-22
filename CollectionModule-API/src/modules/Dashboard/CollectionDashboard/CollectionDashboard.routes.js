const express = require('express');
const { dashboardSummaryHandler,dashboardDailyTransactionHandler , dashboardPaymentModeHandler,
  dashboardTransactionModeHandler,dashboardTopLcoCollectionHandler, dashboardStateCollectionHandler, dashboardCityCollectionHandler
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

router.get(
  "/top-lco-collection",
  dashboardTopLcoCollectionHandler
);

router.get(
  "/state-collection",
  dashboardStateCollectionHandler
);

router.get(
  "/city-collection",
  dashboardCityCollectionHandler
);



module.exports = router;
