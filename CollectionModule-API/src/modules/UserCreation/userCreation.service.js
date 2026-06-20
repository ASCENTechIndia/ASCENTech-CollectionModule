const { createFosUser } = require('./userCreation.repo');

async function createUser(body) {
  return createFosUser(body);
}

module.exports = { createUser };
