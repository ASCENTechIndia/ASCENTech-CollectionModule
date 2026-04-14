const {
  getUserLocationTracking
} = require('./UserTracking.repo');



async function locationTrackingService(userId, cDate) {
  return getUserLocationTracking(userId, cDate);
}


module.exports = {
  locationTrackingService
}