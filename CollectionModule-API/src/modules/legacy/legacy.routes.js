const express = require('express');
const { z } = require('zod');
const { executeProcedureController, executeQueryController } = require('./legacy.controller');
const validate = require('../../middleware/validate.middleware');

const router = express.Router();

const procedureSchema = z.object({
	procedureName: z.string().trim().min(1),
	binds: z.record(z.any()).default({}),
});

const querySchema = z.object({
	queryId: z.string().trim().min(1),
	binds: z.record(z.any()).default({}),
});

router.post('/execute-procedure', validate(procedureSchema), executeProcedureController);
router.post('/execute-query', validate(querySchema), executeQueryController);

module.exports = router;
