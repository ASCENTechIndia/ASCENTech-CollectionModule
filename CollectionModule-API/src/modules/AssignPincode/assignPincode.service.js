const {
  getPincodes, getUsernamebyId, getPincodebyId, assignPincodeIns, insertPincodeMasterIns,
  getAllPincodes, deletePincodeIns
} = require('./assignPincode.repo');
async function deletePincode(pincode) {
  const out = await deletePincodeIns(pincode);
  const errorCode = String(out.out_ErrorCode ?? out.OUT_ERRORCODE ?? out.out_errorcode ?? '');
  const errorMessage = String(out.out_ErrorMsg ?? out.OUT_ERRORMSG ?? out.out_errormsg ?? '');
  const isSuccess = errorCode === '9999';
  return {
    isSuccess,
    message: isSuccess ? 'Pincode deleted successfully' : errorMessage,
    out,
  };
}


async function pincodes() {
  return getPincodes();
}

async function fetchUsername(userId) {
  return getUsernamebyId(userId);
}

async function fetchUserPincodes(userId) {
  return getPincodebyId(userId);
}

async function assignPincode(payload) {
  return assignPincodeIns(payload);
}

async function insertPincodeMaster(payload) {
  const out = await insertPincodeMasterIns(payload.pincode);
  const errorCode = String(out.out_ErrorCode ?? out.OUT_ERRORCODE ?? out.out_errorcode ?? '');
  const errorMessage = String(out.out_ErrorMsg ?? out.OUT_ERRORMSG ?? out.out_errormsg ?? '');
  const isSuccess = errorCode === '9999';

  return {
    isSuccess,
    message: isSuccess ? 'Pincode Inserted Successfully' : errorMessage,
    out,
  };
}

async function fetchAllPincodes() {
  return getAllPincodes();
}

module.exports = {
  pincodes,
  fetchUsername,
  fetchUserPincodes,
  assignPincode,
  insertPincodeMaster,
  fetchAllPincodes,
  deletePincode
}