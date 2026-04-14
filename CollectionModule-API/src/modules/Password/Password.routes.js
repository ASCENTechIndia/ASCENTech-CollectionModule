const express = require('express');
const validate = require('../../middleware/validate.middleware');
const { authRequired } = require('../../middleware/auth');
const {resetPasswordSchema, changePasswordSchema} = require('./Password.validation');
const {resetPwdHandler, designationandusertypeHandler, changePwdHandler} = require('./Password.controller');

const router = express.Router();

router.post('/resetPassword', validate(resetPasswordSchema), resetPwdHandler);
router.get('/desgidandusertype',  validate(resetPasswordSchema, { source: 'query' }), designationandusertypeHandler);
router.post('/changePassword', validate(changePasswordSchema), changePwdHandler);


module.exports = router;

