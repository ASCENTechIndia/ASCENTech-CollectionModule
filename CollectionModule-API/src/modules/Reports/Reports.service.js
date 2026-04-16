const {
  accAllocationReport, getDailyUploadedReport, getpincodeHistoryReport, getnonvisitdoneSummary,
  overallPerformanceSummary, getvisitdoneSummary, getSMASummary, getUserRouteReport,
  getUserRouteExport, getUnallocatedCases
} = require('./Reports.repo');

async function accAllocationService(filters) {
  return accAllocationReport(filters);
}

async function dailyUploadedReport(filters) {
  return getDailyUploadedReport(filters);
}
async function userRouteService(filters) {
  return getUserRouteReport(filters);
}

async function userRouteExportService(filters) {
  return getUserRouteExport(filters);
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

async function unallocatedCasesService(filters) {
  return getUnallocatedCases(filters);
}

module.exports = {
 accAllocationService, dailyUploadedReport, pincodeHistoryReport, nonVisitDoneService, overallPerfService,
 visitDoneService, smaSummaryService, 
  userRouteService,
  userRouteExportService, unallocatedCasesService
};
