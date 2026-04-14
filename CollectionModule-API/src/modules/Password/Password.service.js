const {
  resetPwd, getusertypeanddesig
} = require('./Password.repo');


async function resetPassword(userId) {
  return resetPwd(userId);
}

async function desigandUsertype(userId) {
  return getusertypeanddesig(userId);
}

module.exports = {
  resetPassword, desigandUsertype}