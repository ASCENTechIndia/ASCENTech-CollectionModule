const express = require('express');
const validate = require('../../middleware/validate.middleware');
const { authRequired } = require('../../middleware/auth');
const {userFindSchema, pinCodeAssignSchema, pincodeMasterInsertSchema} = require('./assignPincode.validation');
const {pincodeListHandler, usernameHandler, userPincodeHandler, pincodeAssignHandler, pincodeMasterInsertHandler} = require('./assignPincode.controller');

const router = express.Router();


router.get('/getPincodeList',  pincodeListHandler);
router.get('/fetchUsername', validate(userFindSchema, {source: 'query'}), usernameHandler);
router.get('/fetchUserPincodes', validate(userFindSchema, {source: 'query'}), userPincodeHandler);
router.post('/assignPinCode', authRequired, validate(pinCodeAssignSchema), pincodeAssignHandler);
router.post('/insertPincodeMaster', validate(pincodeMasterInsertSchema), pincodeMasterInsertHandler);


module.exports = router;

