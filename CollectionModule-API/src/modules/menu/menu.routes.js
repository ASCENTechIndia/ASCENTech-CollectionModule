const express = require('express');
const { z } = require('zod');
const { getMenu } = require('./menu.controller');
const validate = require('../../middleware/validate.middleware');
const { authRequired } = require('../../middleware/auth');

const router = express.Router();

const getMenuSchema = z.object({
	compId: z.string().trim().min(1),
	userId: z.string().trim().min(1),
});

router.get('/menu', authRequired, validate(getMenuSchema, { source: 'query' }), getMenu);

module.exports = router;
