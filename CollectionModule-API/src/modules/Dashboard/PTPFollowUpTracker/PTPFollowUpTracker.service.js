const { getPTPKeptCount,
  getPTPFollowUpTracker,
  getPTPSorting
 } = require("./PTPFollowUpTracker.repo");

async function getPTPKeptCountService() {
  return await getPTPKeptCount();
}

async function getPTPFollowUpTrackerService() {
  return await getPTPFollowUpTracker();
}

async function getPTPSortingService() {
  return await getPTPSorting();
}

module.exports = {getPTPKeptCountService,
  getPTPFollowUpTrackerService,
  getPTPSortingService
};
