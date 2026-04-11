const express = require('express');
const { z } = require('zod');
const { getMenu } = require('./menu.controller');
const validate = require('../../middleware/validate.middleware');

const router = express.Router();

const getMenuSchema = z.object({
	compId: z.string().trim().min(1),
	userId: z.string().trim().min(1),
});

router.get('/menu', validate(getMenuSchema, { source: 'query' }), getMenu);

module.exports = router;
