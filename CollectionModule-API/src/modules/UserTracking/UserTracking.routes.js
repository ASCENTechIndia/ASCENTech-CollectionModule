const express = require('express');
const validate = require('../../middleware/validate.middleware');
const { authRequired } = require('../../middleware/auth');
const {userTracLocationSchema, lastLoginSchema} = require('./UserTracking.validation');
const {locationTrackingHandler, lastLoginHandler} = require('./UserTracking.controller');

const router = express.Router();


router.get('/getLocationTracking',  validate(userTracLocationSchema, { source: 'query' }),  locationTrackingHandler);
router.get('/getLastLogin',  validate(lastLoginSchema, { source: 'query' }),  lastLoginHandler);


module.exports = router;

