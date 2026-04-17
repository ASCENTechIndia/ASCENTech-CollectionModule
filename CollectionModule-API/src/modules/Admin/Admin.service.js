const {
  getUserLocationTracking,
  getUserLastLogin,
  bucketSetter,
  fetchUsersWithPincodes,
  unassignCases, getaccCount, accountAllocation
} = require('./Admin.repo');

async function locationTrackingService(userId, cDate) {
  return getUserLocationTracking(userId, cDate);
}

async function lastLoginService(userId) {
  return getUserLastLogin(userId);
}

async function bucketSetterService() {
  return bucketSetter();
}

async function getUsersWithPincodesService() {
  return fetchUsersWithPincodes();
}

async function unassignCasesService(selections) {
  return unassignCases(selections);
}

async function accCountService() {
  return getaccCount();
}

async function allocateAccService(payload) {
  return accountAllocation(payload);
}

module.exports = {
  locationTrackingService,
  lastLoginService,
  bucketSetterService,
  getUsersWithPincodesService,
  unassignCasesService, accCountService, allocateAccService
}