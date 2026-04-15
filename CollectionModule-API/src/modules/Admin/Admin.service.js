const {
  getUserLocationTracking, getUserLastLogin, bucketSetter
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


module.exports = {
  locationTrackingService,
  lastLoginService,
  bucketSetterService
}