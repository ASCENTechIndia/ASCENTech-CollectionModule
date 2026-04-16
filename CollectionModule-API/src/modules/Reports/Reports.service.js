const {
  accAllocationReport,
  getUserRouteReport,
  getUserRouteExport,
} = require('./Reports.repo');

async function accAllocationService(filters) {
  return accAllocationReport(filters);
}

async function userRouteService(filters) {
  return getUserRouteReport(filters);
}

async function userRouteExportService(filters) {
  return getUserRouteExport(filters);
}



module.exports = {
  accAllocationService,
  userRouteService,
  userRouteExportService,
};
