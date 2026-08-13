const { AppError } = require("../../utils/app-error");
const {
  insertRepo,
  updateRepo,
  getAllRuleRepo,
  getRuleRepo,
  deleteRuleRepo,
  simulationPreviewRepo,
  getRulesNameListRepo,
  assignRuleUserHistoryRepo,
} = require("./allocationRules.repo");

async function insertRuleService(payload) {
  try {
    const result = await insertRepo(payload);

    if (!result) {
      throw new AppError("Failed to insert allocation rule", 400);
    }

    return {
      success: true,
      message: "Success",
      data: result,
    };
  } catch (error) {
    throw new AppError(
      `Failed to insert allocation rule: ${error.message}`,
      400,
    );
  }
}

async function updateRuleService(payload) {
  try {
    const result = await updateRepo(payload);

    if (!result) {
      throw new AppError("Failed to update allocation rule", 400);
    }

    return {
      success: true,
      message: "Success",
      data: result,
    };
  } catch (error) {
    throw new AppError(
      `Failed to update allocation rule: ${error.message}`,
      400,
    );
  }
}

async function getAllRuleService() {
  try {
    const result = await getAllRuleRepo();

    if (!result) {
      throw new AppError("Failed to fetch allocation rules", 400);
    }

    return {
      success: true,
      message: "Success",
      data: result,
    };
  } catch (error) {
    throw new AppError(
      `Failed to fetch allocation rules: ${error.message}`,
      400,
    );
  }
}

async function getRuleService(ruleId) {
  try {
    const result = await getRuleRepo(ruleId);

    if (!result) {
      throw new AppError("Failed to fetch allocation rule", 400);
    }

    return {
      success: true,
      message: "Success",
      data: result,
    };
  } catch (error) {
    throw new AppError(
      `Failed to fetch allocation rule: ${error.message}`,
      400,
    );
  }
}

async function deleteRuleService(ruleId) {
  try {
    const result = await deleteRuleRepo(ruleId);

    if (!result) {
      throw new AppError("Failed to delete allocation rule", 400);
    }

    return {
      success: true,
      message: "Success",
      data: result,
    };
  } catch (error) {
    throw new AppError(
      `Failed to delete allocation rule: ${error.message}`,
      400,
    );
  }
}

async function simulationPreviewService() {
  try {
    const result = await simulationPreviewRepo();

    if (!result) {
      throw new AppError("Failed to fetch simulation preview", 400);
    }

    return {
      success: true,
      message: "Success",
      data: result,
    };
  } catch (error) {
    throw new AppError(
      `Failed to fetch simulation preview: ${error.message}`,
      400,
    );
  }
}

async function getRulesNameListService() {
  try {
    const result = await getRulesNameListRepo();
    if (!result || result?.length <= 0) {
      throw new AppError(`Failed to fetch allocation rules name list`, 400);
    }
    return result;
  } catch (error) {
    throw new AppError(
      `Failed to fetch allocation rules name list: ${error.message}`,
      400,
    );
  }
}

async function assignRuleUserHistoryService(payload) {
  try {
    const result = await assignRuleUserHistoryRepo(payload);
    if (!result) {
      throw new AppError(`Failed to insert rule user history data`, 400);
    }
    return {
      errorCode: result.OUT_ERRORCODE,
      errorMessage: result.OUT_ERRORMSG,
    };
  } catch (error) {
    throw new AppError(
      `Failed to insert rule user history data: ${error.message}`,
      400,
    );
  }
}

module.exports = {
  insertRuleService,
  updateRuleService,
  getAllRuleService,
  getRuleService,
  deleteRuleService,
  simulationPreviewService,
  getRulesNameListService,
  assignRuleUserHistoryService,
};
