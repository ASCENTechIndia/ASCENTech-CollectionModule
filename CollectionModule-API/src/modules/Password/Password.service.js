const {
  resetPwd, getusertypeanddesig, changepwdIns
} = require('./Password.repo');


async function resetPassword(userId) {
  return resetPwd(userId);
}

async function desigandUsertype(userId) {
  return getusertypeanddesig(userId);
}

async function changepwd(payload) {
  return changepwdIns(payload);
}

module.exports = {
  resetPassword, desigandUsertype, changepwd}