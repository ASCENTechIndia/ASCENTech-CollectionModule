const { getMenuForUser } = require('./menu.repo');

async function fetchMenu(compId, userId) {
  return getMenuForUser(compId, userId);
}

module.exports = {
  fetchMenu,
};
