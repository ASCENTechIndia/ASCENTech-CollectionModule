const express = require('express');
const validate = require('../../middleware/validate.middleware');
const { authRequired } = require('../../middleware/auth');
const {resetPasswordSchema} = require('./Password.validation');
const {resetPwdHandler, designationandusertypeHandler} = require('./Password.controller');

const router = express.Router();

router.post('/resetPassword', authRequired, validate(resetPasswordSchema), resetPwdHandler);
router.get('/desgidandusertype',  validate(resetPasswordSchema, { source: 'query' }), designationandusertypeHandler);

module.exports = router;

