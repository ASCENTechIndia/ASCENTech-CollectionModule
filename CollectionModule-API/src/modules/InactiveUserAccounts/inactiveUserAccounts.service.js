const {
  searchUnallocatedAccounts,
  unallocateAllUsersAccounts,
} = require('./inactiveUserAccounts.repo');

async function searchAccounts(filters) {
  return searchUnallocatedAccounts(filters);
}

async function unallocateAllAccounts() {
  const out = await unallocateAllUsersAccounts();
  const errorCode = String(out.out_ErrorCode ?? out.OUT_ERRORCODE ?? out.out_errorcode ?? '');
  const errorMessage = String(out.out_ErrorMsg ?? out.OUT_ERRORMSG ?? out.out_errormsg ?? '');
  const isSuccess = errorCode === '9999';

  return {
    isSuccess,
    message: isSuccess ? 'Unallocation Successful for All Users' : errorMessage,
    out,
  };
}

module.exports = {
  searchAccounts,
  unallocateAllAccounts,
};
