const { AppError } = require("../../utils/app-error");
const { auditLog } = require("../../utils/audit-log");
const { logApiSuccess, logApiError } = require("../../utils/log");
const {
  insertRuleService,
  updateRuleService,
  getAllRuleService,
  getRuleService,
  deleteRuleService,
  simulationPreviewService,
  getRulesNameListService,
  assignRuleUserHistoryService,
  assignRuleUserWithHistoryPrioritywiseService
} = require("./allocationRules.service");

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
      status: result.message,
      details: {},
      requestMeta: "",
    });

    logApiSuccess(req, 201, result, `Allocation rule inserted successfully`);
    return res.ok(result.data.outBinds);
  } catch (error) {
    logApiError(req, 400, error.message, "Failed to insert allocation rule");
    return next(error);
  }
}

async function updateRuleController(req, res, next) {
  try {
    const payload = req.body;
    const result = await updateRuleService(payload);
    if (!result) {
      throw new AppError("Failed to update allocation rule", 400);
    }
    auditLog({
      action: "ALLOCATION_RULE_UPDATE",
      actor: req.user?.userId || "system",
      module: "allocationRule",
      entityId: payload.ruleId || "",
      status: result.message,
      details: {},
      requestMeta: "",
    });
    logApiSuccess(req, 200, result, "Allocation rule updated successfully");
    return res.ok(result.data.outBinds);
  } catch (error) {
    logApiError(req, 400, error.message, "Failed to update allocation rule");
    return next(error);
  }
}

async function getAllRuleController(req, res, next) {
  try {
    const result = await getAllRuleService();

    if (!result) {
      throw new AppError("Failed to fetch allocation rules", 400);
    }

    logApiSuccess(req, 200, result, "Allocation rules fetched successfully");

    return res.ok(result.data.outBinds);
  } catch (error) {
    logApiError(req, 400, error.message, "Failed to fetch allocation rules");

    return next(error);
  }
}

async function getRuleController(req, res, next) {
  try {
    const { ruleId } = req.query;

    const result = await getRuleService(ruleId);

    if (!result) {
      throw new AppError("Failed to fetch allocation rule", 400);
    }

    logApiSuccess(req, 200, result, "Allocation rule fetched successfully");

    return res.ok(result.data.outBinds);
  } catch (error) {
    logApiError(req, 400, error.message, "Failed to fetch allocation rule");

    return next(error);
  }
}

async function deleteRuleController(req, res, next) {
  try {
    const { ruleId } = req.query;

    const result = await deleteRuleService(ruleId);

    if (!result) {
      throw new AppError("Failed to delete allocation rule", 400);
    }

    auditLog({
      action: "ALLOCATION_RULE_DELETE",
      actor: req.user?.userId || "system",
      module: "allocationRule",
      entityId: ruleId || "",
      status: result.message,
      details: {},
      requestMeta: "",
    });

    logApiSuccess(req, 200, result, "Allocation rule deleted successfully");

    return res.ok(result.data.outBinds);
  } catch (error) {
    logApiError(req, 400, error.message, "Failed to delete allocation rule");

    return next(error);
  }
}

async function simulationPreviewController(req, res, next) {
  try {
    const result = await simulationPreviewService();

    if (!result) {
      throw new AppError("Failed to fetch simulation preview", 400);
    }

    logApiSuccess(req, 200, result, "Simulation preview fetched successfully");

    return res.ok(result.data);
  } catch (error) {
    logApiError(req, 400, error.message, "Failed to fetch simulation preview");

    return next(error);
  }
}

async function getRulesNameListController(req, res, next) {
  try {
    const result = await getRulesNameListService();
    if (!result) {
      throw new AppError("Failed to fetch allocation rules name list", 400);
    }
    logApiSuccess(
      req,
      200,
      result,
      "Allocation rules name list fetch successfully",
    );
    return res.ok(result);
  } catch (error) {
    logApiError(
      req,
      400,
      error.message,
      "Failed to fetch allocation rules name list",
    );
    return next(error);
  }
}

async function assignRuleUserHistoryController(req, res, next) {
  try {
    const payload = req.body;
    const result = await assignRuleUserHistoryService(payload);
    auditLog({
      action: "ASSIGN_RULE_USER_HISTORY",
      actor: req.user?.userId || "system",
      module: "allocationRule",
      entityId: "",
      status: result.message,
      details: {},
      requestMeta: "",
    });

    logApiSuccess(req, 201, result, `Rule user history inserted successfully`);
    return res.ok(result);
  } catch (error) {
    logApiError(
      req,
      400,
      error.message,
      "Failed to insert rule user history data",
    );
    return next(error);
  }
}

async function assignRuleUserWithHistoryPrioritywiseController(
  req,
  res,
  next
) {
  try {
    const { ruleId } = req.body;

    const result =
      await assignRuleUserWithHistoryPrioritywiseService(ruleId);

    auditLog({
      action: "ASSIGN_RULE_USER_HISTORY_PRIORITYWISE",
      actor: req.user?.userId || "system",
      module: "allocationRule",
      entityId: ruleId || "",
      status: result.errorMessage,
      details: {},
      requestMeta: "",
    });

    logApiSuccess(
      req,
      200,
      result,
      "Rule user assigned prioritywise successfully"
    );

    return res.ok(result);
  } catch (error) {
    logApiError(
      req,
      400,
      error.message,
      "Failed to assign rule user prioritywise"
    );

    return next(error);
  }
}

module.exports = {
  insertRuleController,
  updateRuleController,
  getAllRuleController,
  getRuleController,
  deleteRuleController,
  simulationPreviewController,
  getRulesNameListController,
  assignRuleUserHistoryController,
  assignRuleUserWithHistoryPrioritywiseController
};
