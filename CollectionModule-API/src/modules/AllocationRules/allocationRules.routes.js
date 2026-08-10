const express = require("express")
const { insertRuleController , updateRuleController, getAllRuleController, getRuleController,
    deleteRuleController
 } = require("./allocationRulesController")

const router = express.Router()

router.post("/insert", insertRuleController)
router.post("/update", updateRuleController)
router.get("/getAll", getAllRuleController)
router.get("/get-rule", getRuleController)
router.delete("/delete-rule", deleteRuleController)

module.exports = router