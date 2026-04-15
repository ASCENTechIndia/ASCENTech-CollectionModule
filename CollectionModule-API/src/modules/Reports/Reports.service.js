const {
  accAllocationReport, getDailyUploadedReport, getpincodeHistoryReport, getnonvisitdoneSummary,
  overallPerformanceSummary, getvisitdoneSummary, getSMASummary, getZones, getRegions
} = require('./Reports.repo');

async function accAllocationService(filters) {
  return accAllocationReport(filters);
}

async function dailyUploadedReport(filters) {
  return getDailyUploadedReport(filters);
}

async function pincodeHistoryReport(filters) {
  return getpincodeHistoryReport(filters);
}

async function nonVisitDoneService() {
  return getnonvisitdoneSummary();
}

async function overallPerfService() {
  return overallPerformanceSummary();
}

async function visitDoneService() {
  return getvisitdoneSummary();
}

async function smaSummaryService() {
  return getSMASummary();
}

async function zoneDropdown(filters) {
  return getZones(filters);
}

async function regionService({ zoneId }) {
  return getRegions(zoneId);
}

module.exports = {
 accAllocationService, dailyUploadedReport, pincodeHistoryReport, nonVisitDoneService, overallPerfService,
 visitDoneService, smaSummaryService, zoneDropdown, regionService
};
