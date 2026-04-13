const {
  callUserInsNew,
  callUserIns,
  callUserStatusUpdate,
  searchUsers,
  updateUserRole, branchListbyCategory, agentDetailsbyBrid,
  getUserDetails,
  getUserFormOptions,
  getBranchusercreation,
  getRoles,
  getUserDevice,
  callUserWebIns,
} = require('./users.repo');

async function createUser(payload) {
  return callUserInsNew(payload);
}

async function createWebUser(payload) {
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

async function getUserDetailsById(userId) {
  return getUserDetails(userId);
}

async function getFormOptions(payload) {
  return getUserFormOptions(payload);
}

async function getRegions(zoneId) {
  return getUserFormOptions({ type: 'region', zoneId });
}

async function getBranches(regionId) {
  return getUserFormOptions({ type: 'branch', regionId });
}

async function branchList(payload) {
  return branchListbyCategory(payload);
}

async function agentList(payload) {
  return agentDetailsbyBrid(payload);
}

async function branchListforInsert(payload) {
  return getBranchusercreation(payload);
}

async function Roles() {
  return getRoles();
}

async function UserDevice() {
  return getUserDevice();
}

async function createWebUser(payload) {
  return callUserWebIns(payload);
}

module.exports = {
  createUser,
  createWebUser,
  updateUser,
  updateUserStatus,
  updateRole,
  search,
  getUserDetails: getUserDetailsById,
  getFormOptions,
  getRegions,
  getBranches,
  branchList,
  agentList, 
  branchListforInsert, Roles,
  UserDevice
};
