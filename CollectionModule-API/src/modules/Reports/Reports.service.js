const {
  accAllocationReport, getDailyUploadedReport, getpincodeHistoryReport, getnonvisitdoneSummary
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

module.exports = {
 accAllocationService, dailyUploadedReport, pincodeHistoryReport, nonVisitDoneService
};
