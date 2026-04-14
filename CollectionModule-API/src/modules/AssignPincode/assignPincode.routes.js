const express = require('express');
const validate = require('../../middleware/validate.middleware');
const { authRequired } = require('../../middleware/auth');
const {userFindSchema, pinCodeAssignSchema} = require('./assignPincode.validation');
const {pincodeListHandler, usernameHandler, userPincodeHandler, pincodeAssignHandler} = require('./assignPincode.controller');

const router = express.Router();


router.get('/getPincodeList',  pincodeListHandler);
router.get('/fetchUsername', validate(userFindSchema, {source: 'query'}), usernameHandler);
router.get('/fetchUserPincodes', validate(userFindSchema, {source: 'query'}), userPincodeHandler);
router.post('/assignPinCode', authRequired, validate(pinCodeAssignSchema), pincodeAssignHandler);


module.exports = router;

