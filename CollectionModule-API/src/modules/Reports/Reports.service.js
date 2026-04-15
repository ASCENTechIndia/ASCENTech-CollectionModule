const {
  accAllocationReport
} = require('./Reports.repo');

async function accAllocationService(filters) {
  return accAllocationReport(filters);
}



module.exports = {
 accAllocationService
};
