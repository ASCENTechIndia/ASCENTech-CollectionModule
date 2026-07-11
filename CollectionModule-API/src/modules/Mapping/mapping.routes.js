const express = require('express');
const multer = require('multer');
const validate = require('../../middleware/validate.middleware');
const { authRequired } = require('../../middleware/auth');
const {
  formOptionsSchema,
  getUserDetailsByIdSchema,
  searchEmployeeSchema,
  createUserSchema,
  updateUserSchema,
  fileUploadSchema,
  getBranchesSchema,
  getUserStatusSchema,
  createUserSchemaNew,
  createMappingSchema,
} = require('./mapping.validation');
const {
  getFormOptionsHandler,
  getBranchesHandler,
  getUserDetailsHandler,
  validateUserHandler,
  createUserHandler,
  updateUserHandler,
  uploadUserImageHandler,
  getUserStatusHandler,
  createUserNewHandler,
  getCompanyHandler,
  getAgencyHandler,
  getFOSHandler,
  createMappingHandler,
  getViewMappingHandler
} = require('./mapping.controller');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
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
      cb(new Error('Invalid file type. Only JPG, PNG, PDF, and Word documents are allowed.'));
    }
  },
  limits: {
    fileSize: 300 * 1024, // 300 KB
  },
});

// Public routes (no auth required)
router.get('/form-options', validate(formOptionsSchema, { source: 'query' }), getFormOptionsHandler);
router.get('/branches', validate(getBranchesSchema, { source: 'query' }), getBranchesHandler);
router.get('/user-details', validate(getUserDetailsByIdSchema, { source: 'query' }), getUserDetailsHandler);
router.get('/user-status', validate(getUserStatusSchema, { source: 'query' }), getUserStatusHandler);

// Protected routes (auth required)
router.post('/validate', authRequired, validate(createUserSchema, { source: 'body' }), validateUserHandler);
router.post('/create', authRequired, validate(createUserSchema, { source: 'body' }), createUserHandler);
router.post('/create-new', validate(createUserSchemaNew, { source: 'body' }), createUserNewHandler);
router.put('/update', authRequired, validate(updateUserSchema, { source: 'body' }), updateUserHandler);
router.post(
  '/upload-image',
  authRequired,
  upload.single('file'),
  validate(fileUploadSchema, { source: 'body' }),
  uploadUserImageHandler
);
router.get('/company-list', getCompanyHandler);
router.get('/agency-list', getAgencyHandler);
router.get('/fos-list', getFOSHandler);
router.post("/create-mapping",authRequired, validate(createMappingSchema), createMappingHandler)
router.get('/view-mapping', getViewMappingHandler);


module.exports = router;
