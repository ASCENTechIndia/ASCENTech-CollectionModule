const express = require("express");
const {
  getPerformaceDashboardDataController,
} = require("./FcoPerformanceTraker.controller");

const router = express.Router();

router.get("/getPerformaceTracker", getPerformaceDashboardDataController);

module.exports = router;
