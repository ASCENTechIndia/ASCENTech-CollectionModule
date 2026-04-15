const express = require('express');
const validate = require('../../middleware/validate.middleware');
const { authRequired } = require('../../middleware/auth');
const { accAllocationSchema
} = require('./Reports.validation');
const { accAllocationHandler
} = require('./Reports.controller');

const router = express.Router();

router.get(
  '/AccAllocationReport',
  validate(accAllocationSchema, { source: 'query' }),
  accAllocationHandler
);


module.exports = router;
