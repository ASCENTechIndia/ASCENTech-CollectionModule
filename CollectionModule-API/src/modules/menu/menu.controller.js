const { fetchMenu } = require('./menu.service');
const { logApiSuccess, logApiError } = require('../../utils/log');

async function getMenu(req, res, next) {
  try {
    const { compId, userId } = req.query;
    const rows = await fetchMenu(compId, userId);
    logApiSuccess(req, 200, { count: rows?.length || 0 }, `Menu fetched successfully for user: ${userId}`);
    return res.ok(rows);
  } catch (error) {
    logApiError(req, 500, error.message, `Menu fetch error for user: ${req.query?.userId}`);
    return next(error);
  }
}

module.exports = {
  getMenu,
};
