const {
  getPincodes, getUsernamebyId, getPincodebyId, assignPincodeIns
} = require('./assignPincode.repo');


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

module.exports = {
  pincodes, fetchUsername, fetchUserPincodes, assignPincode}