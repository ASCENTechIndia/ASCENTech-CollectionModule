const express = require("express")
const { insertRuleController , updateRuleController, getAllRuleController, getRuleController } = require("./allocationRulesController")

const router = express.Router()

router.post("/insert", insertRuleController)
router.post("/update", updateRuleController)
router.get("/getAll", getAllRuleController)
router.get("/get-rule", getRuleController)

module.exports = router