const {
  loginWithStoredProcedure,
  loginWithCompanyStoredProcedure,
  loginWithAgencyStoredProcedure,
} = require("./auth.repo");

async function loginUser(userId, password) {
  return loginWithStoredProcedure(userId, password);
}

async function loginCompanyUser(userId, password) {
  return loginWithCompanyStoredProcedure(userId, password);
}

async function agencyLoginUser(userId, password) {
  return loginWithAgencyStoredProcedure(userId, password);
}

module.exports = {
  loginUser,
  loginCompanyUser,
  agencyLoginUser,
};
