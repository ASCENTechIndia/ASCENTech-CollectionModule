const express = require('express');
const validate = require('../../middleware/validate.middleware');
const { createUserSchema } = require('./userCreation.validation');
const { createUserHandler } = require('./userCreation.controller');

const router = express.Router();

// POST /api/user-creation/create
router.post(
  '/create',
  validate(createUserSchema, { source: 'body' }),
  createUserHandler
);

module.exports = router;
