const {
  callUserInsNew,
  callUserIns,
  callUserStatusUpdate,
  searchUsers,
  updateUserRole, branchListbyCategory, agentDetailsbyBrid
} = require('./users.repo');

async function createUser(payload) {
  return callUserInsNew(payload);
}

async function updateUser(payload) {
  return callUserIns(payload);
}

async function updateUserStatus(payload) {
  return callUserStatusUpdate(payload);
}

async function updateRole(payload) {
  return updateUserRole(payload);
}

async function search(payload) {
  return searchUsers(payload);
}

async function branchList(payload) {
  return branchListbyCategory(payload);
}

async function agentList(payload) {
  return agentDetailsbyBrid(payload);
}

module.exports = {
  createUser,
  updateUser,
  updateUserStatus,
  updateRole,
  search,
  branchList,
  agentList
};
