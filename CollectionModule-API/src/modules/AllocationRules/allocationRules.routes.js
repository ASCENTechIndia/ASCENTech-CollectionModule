const express = require("express");
const {
  insertRuleController,
  updateRuleController,
  getAllRuleController,
  getRuleController,
  deleteRuleController,
  simulationPreviewController,
  getRulesNameListController,
  assignRuleUserHistoryController,
  assignRuleUserWithHistoryPrioritywiseController
} = require("./allocationRulesController");

const router = express.Router();

router.post("/insert", insertRuleController);
router.post("/update", updateRuleController);
router.get("/getAll", getAllRuleController);
router.get("/get-rule", getRuleController);
router.delete("/delete-rule", deleteRuleController);
router.get("/allocation-rules/simulation-preview", simulationPreviewController);
router.get("/rules-name-list", getRulesNameListController);
router.post("/insert-rule-history", assignRuleUserHistoryController);
router.post(
  "/assign-rule-user-prioritywise",
  assignRuleUserWithHistoryPrioritywiseController
);

module.exports = router;
