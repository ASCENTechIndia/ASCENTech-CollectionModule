const {
  getZones, getRegions, getBranches,
  getCollAssociate, getTransDetailsReport
} = require('./TransactionReport.repo');

async function zoneDropdown(filters) {
  return getZones(filters);
}

async function regionService(filters) {
  return getRegions(filters);
}

async function branchService(filters){
  return getBranches(filters);
}

async function collAssociateService({ brid }){
  return getCollAssociate({ brid });
}

async function transDetailsService({ brid }){
  return getTransDetailsReport({ brid });
}

module.exports = {
zoneDropdown, regionService, branchService, collAssociateService, transDetailsService
};