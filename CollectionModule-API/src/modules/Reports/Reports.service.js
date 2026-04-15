const {
  accAllocationReport, getDailyUploadedReport
} = require('./Reports.repo');

async function accAllocationService(filters) {
  return accAllocationReport(filters);
}

async function dailyUploadedReport(filters) {
  return getDailyUploadedReport(filters);
}


module.exports = {
 accAllocationService, dailyUploadedReport
};
