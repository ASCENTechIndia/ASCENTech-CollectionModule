const express = require("express")
const { insertRuleController } = require("./allocationRulesController")

const router = express.Router()

router.post("/insert", insertRuleController)

module.exports = router