const express = require('express');
const multer = require('multer');
const validate = require('../../middleware/validate.middleware');
const { authRequired } = require('../../middleware/auth');
const {
  formOptionsSchema,
  getUserDetailsByIdSchema,
  getBranchesWebSchema,
  getRolesWebSchema,
  createWebUserSchema,
  updateWebUserSchema,
  validateIdProofSchema,
  fileUploadSchema,
} = require('./webUserCreation.validation');
const {
  getFormOptionsHandler,
  getBranchesWebHandler,
  getBranchByIdHandler,
  getRolesWebHandler,
  getEmployerListHandler,
  getUserDetailsHandler,
  validateWebUserHandler,
  createWebUserHandler,
  updateWebUserHandler,
  uploadWebUserImageHandler,
  getWebUserStatusHandler,
} = require('./webUserCreation.controller');

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 300 * 1024 }, // 300 KB
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/png',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type not allowed. Supported types: ${allowedMimes.join(', ')}`), false);
    }
  },
});

// Public endpoints for web user creation
router.get('/form-options', getFormOptionsHandler);
router.get('/branches', validate(getBranchesWebSchema, { source: 'query' }), getBranchesWebHandler);
router.get('/branch-by-id', validate(getUserDetailsByIdSchema, { source: 'query' }), getBranchByIdHandler);
router.get('/roles', validate(getRolesWebSchema, { source: 'query' }), getRolesWebHandler);
router.get('/employers', getEmployerListHandler);
router.get('/user-details', validate(getUserDetailsByIdSchema, { source: 'query' }), getUserDetailsHandler);
router.get('/user-status', getWebUserStatusHandler);

// Protected endpoints for web user creation
router.post('/validate', authRequired, validate(createWebUserSchema, { source: 'body' }), validateWebUserHandler);
router.post('/create', authRequired, validate(createWebUserSchema, { source: 'body' }), createWebUserHandler);
router.put('/update', authRequired, validate(updateWebUserSchema, { source: 'body' }), updateWebUserHandler);
router.post(
  '/upload-image',
  authRequired,
  upload.single('file'),
  validate(fileUploadSchema, { source: 'body' }),
  uploadWebUserImageHandler
);

module.exports = router;
