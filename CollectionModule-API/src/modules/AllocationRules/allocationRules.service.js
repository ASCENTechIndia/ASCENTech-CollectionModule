const { AppError } = require("../../utils/app-error");
const { insertRepo } = require("./allocationRules.repo");

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

module.exports = {
  insertRuleService,
};
