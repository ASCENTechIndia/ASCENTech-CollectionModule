const express = require('express');
const validate = require('../../middleware/validate.middleware');
const { authRequired } = require('../../middleware/auth');
const {userFindSchema, pinCodeAssignSchema, pincodeMasterInsertSchema , pinCodeDeleteSchema} = require('./assignPincode.validation');
const {pincodeListHandler, usernameHandler, userPincodeHandler, pincodeAssignHandler, pincodeMasterInsertHandler, PincodeHandler, deletePincodeHandler} = require('./assignPincode.controller');


const router = express.Router();


router.get('/getPincodeList',  pincodeListHandler);
router.get('/fetchUsername', validate(userFindSchema, {source: 'query'}), usernameHandler);
router.get('/fetchUserPincodes', validate(userFindSchema, {source: 'query'}), userPincodeHandler);
router.post('/assignPinCode', validate(pinCodeAssignSchema), pincodeAssignHandler);
router.post('/insertPincodeMaster', validate(pincodeMasterInsertSchema), pincodeMasterInsertHandler);
router.get('/fetchAllPincodesList', PincodeHandler);
router.delete('/deletePincode', validate(pinCodeDeleteSchema), deletePincodeHandler);

module.exports = router;

