const {
  callUserInsNew,
  callUserIns,
  callUserStatusUpdate,
  searchUsers,
  updateUserRole,
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

module.exports = {
  createUser,
  updateUser,
  updateUserStatus,
  updateRole,
  search,
};
