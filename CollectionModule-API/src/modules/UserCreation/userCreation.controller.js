const { createUser } = require('./userCreation.service');
const { logApiSuccess, logApiError } = require('../../utils/log');

async function createUserHandler(req, res, next) {
  try {
    const result = await createUser(req.body);

    logApiSuccess(req, 201, { userid: req.body.in_userid }, 'FOS User created successfully');

    return res.status(201).json({
      success: true,
      message: result.out_errormsg || 'User created successfully',
      data: result,
    });
  } catch (error) {
    logApiError(req, 500, error.message, 'FOS User creation failed');
    return next(error);
  }
}

module.exports = { createUserHandler };
