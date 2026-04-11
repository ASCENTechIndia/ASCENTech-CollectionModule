const { loginUser } = require('./auth.service');
const { logApiSuccess, logApiError } = require('../../utils/log');

async function login(req, res, next) {
  try {
    const payload = req.body;

    const normalizedUserId = payload.userId.startsWith('E')
      ? payload.userId
      : `E${payload.userId}`;

    const result = await loginUser(normalizedUserId, payload.password);

    if (!result.success) {
      logApiError(req, 401, result.message, `Login failed for user: ${normalizedUserId}`);
      return res.fail(result.message, 401, { errorCode: result.errorCode });
    }

    logApiSuccess(req, 200, { userId: result.user.userId, userName: result.user.userName }, `Login successful for user: ${result.user.userName}`);

    return res.ok({ token: result.token, user: result.user });
  } catch (error) {
    logApiError(req, 500, error.message, 'Login controller error');
    return next(error);
  }
}

module.exports = {
  login,
};
