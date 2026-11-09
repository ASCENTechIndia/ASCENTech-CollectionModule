const express = require("express");
const {
  getPTPKeptCountController,
  getPTPFollowUpTrackerController,
  getPTPSortingController
} = require("./PTPFollowUpTracker.controller");

const router = express.Router();

router.get("/getPTPKeptCount", getPTPKeptCountController);

router.get(
  "/getPTPFollowUpTracker",
  getPTPFollowUpTrackerController
);

router.get("/getPTPSorting", getPTPSortingController);

module.exports = router;
