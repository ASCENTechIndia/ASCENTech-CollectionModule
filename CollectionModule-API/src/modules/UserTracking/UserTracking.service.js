const {
  getUserLocationTracking, getUserLastLogin
} = require('./UserTracking.repo');

async function locationTrackingService(userId, cDate) {
  return getUserLocationTracking(userId, cDate);
}

async function lastLoginService(userId) {
  return getUserLastLogin(userId);
}


module.exports = {
  locationTrackingService,
  lastLoginService
}