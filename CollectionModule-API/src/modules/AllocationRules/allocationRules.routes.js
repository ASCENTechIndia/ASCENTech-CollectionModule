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
} = require("./allocationRulesController");
const { authRequired } = require("../../middleware/auth");

const router = express.Router();

router.post("/insert", authRequired, insertRuleController);
router.post("/update", authRequired, updateRuleController);
router.get("/getAll", authRequired, getAllRuleController);
router.get("/get-rule", authRequired, getRuleController);
router.delete("/delete-rule", authRequired, authRequired, deleteRuleController);
router.get("/allocation-rules/simulation-preview", authRequired, simulationPreviewController);
router.get("/rules-name-list", authRequired, getRulesNameListController);
router.post("/insert-rule-history", assignRuleUserHistoryController);

module.exports = router;
