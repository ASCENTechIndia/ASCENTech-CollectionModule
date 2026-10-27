const { loginWithStoredProcedure, loginWithCompanyStoredProcedure } = require("./auth.repo");

async function loginUser(userId, password) {
  return loginWithStoredProcedure(userId, password);
}

async function loginCompanyUser(userId, password) {
  return loginWithCompanyStoredProcedure(userId, password);
}

module.exports = {
  loginUser,
  loginCompanyUser,
};
