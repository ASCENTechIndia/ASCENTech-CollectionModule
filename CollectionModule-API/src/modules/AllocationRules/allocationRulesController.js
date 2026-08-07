const { AppError } = require("../../utils/app-error");
const { auditLog } = require("../../utils/audit-log");
const { logApiError } = require("../../utils/log");
const { insertRuleService } = require("./allocationRules.service");

async function insertRuleController(req, res, next) {
  try {
    const payload = req.body;
    const result = await insertRuleService(payload);
    if (!result) {
      throw new AppError("Failed to insert allocation rule", 400);
    }

    auditLog({
      action: "ALLOCATION_RULE_INSERT",
      actor: req.user?.userId || "system",
      module: "allocationRule",
      entityId: "",
      status: result.errorCode === String("9999") ? "SUCCESS" : "FAILEd",
      details: {},
      requestMeta: requestMeta(req),
    });

    logApiSuccess(req, 201, result, `Allocation rule inserted successfully`);
    return result;
  } catch (error) {
    logApiError(req, 400, error.message, "Failed to insert allocation rule");
    return next(error);
  }
}

module.exports = {
  insertRuleController,
};
