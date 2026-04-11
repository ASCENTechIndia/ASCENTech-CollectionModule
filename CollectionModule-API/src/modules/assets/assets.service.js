const {
  registerAsset,
  assignAsset,
  transferAsset,
  updateAssetStatus,
} = require('./assets.repo');

async function register(payload) {
  return registerAsset(payload);
}

async function assign(payload) {
  return assignAsset(payload);
}

async function transfer(payload) {
  return transferAsset(payload);
}

async function updateStatus(payload) {
  return updateAssetStatus(payload);
}

module.exports = {
  register,
  assign,
  transfer,
  updateStatus,
};
