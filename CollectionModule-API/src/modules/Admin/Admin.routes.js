const express = require('express');
const validate = require('../../middleware/validate.middleware');
const { authRequired } = require('../../middleware/auth');
const {userTracLocationSchema, lastLoginSchema} = require('./Admin.validation');
const {locationTrackingHandler, lastLoginHandler, bucketSetterHandler} = require('./Admin.controller');

const router = express.Router();


router.get('/getLocationTracking',  validate(userTracLocationSchema, { source: 'query' }),  locationTrackingHandler);
router.get('/getLastLogin',  validate(lastLoginSchema, { source: 'query' }),  lastLoginHandler);
router.post('/bucketsetter',  bucketSetterHandler);

module.exports = router;

