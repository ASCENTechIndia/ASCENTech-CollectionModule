const express = require('express');
const validate = require('../../middleware/validate.middleware');
const { authRequired } = require('../../middleware/auth');
const {userTracLocationSchema} = require('./UserTracking.validation');
const {locationTrackingHandler} = require('./UserTracking.controller');

const router = express.Router();


router.get('/getLocationTracking',  validate(userTracLocationSchema, { source: 'query' }),  locationTrackingHandler);


module.exports = router;

