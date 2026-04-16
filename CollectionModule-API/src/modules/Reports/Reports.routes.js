const express = require('express');
const validate = require('../../middleware/validate.middleware');
const { authRequired } = require('../../middleware/auth');
const { accAllocationSchema
  , userRouteSchema
} = require('./Reports.validation');
const { accAllocationHandler
  , userRouteHandler
  , userRouteExportHandler
} = require('./Reports.controller');

const router = express.Router();

router.get(
  '/AccAllocationReport',
  validate(accAllocationSchema, { source: 'query' }),
  accAllocationHandler
);

router.get(
  '/user-route',
  validate(userRouteSchema, { source: 'query' }),
  userRouteHandler
);

router.get(
  '/user-route/export',
  validate(userRouteSchema, { source: 'query' }),
  userRouteExportHandler
);


module.exports = router;
