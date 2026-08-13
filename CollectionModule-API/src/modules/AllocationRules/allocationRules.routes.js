const express = require("express");
const {
  insertRuleController,
  updateRuleController,
  getAllRuleController,
  getRuleController,
  deleteRuleController,
  simulationPreviewController,
  getRulesNameListController,
} = require("./allocationRulesController");

const router = express.Router();

router.post("/insert", insertRuleController);
router.post("/update", updateRuleController);
router.get("/getAll", getAllRuleController);
router.get("/get-rule", getRuleController);
router.delete("/delete-rule", deleteRuleController);
router.get("/allocation-rules/simulation-preview", simulationPreviewController);
router.get("/rules-name-list", getRulesNameListController);

module.exports = router;
