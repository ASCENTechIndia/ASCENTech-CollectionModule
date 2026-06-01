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
} = require('./userCreation.validation');
const {
  getFormOptionsHandler,
  getBranchesHandler,
  getUserDetailsHandler,
  validateUserHandler,
  createUserHandler,
  updateUserHandler,
  uploadUserImageHandler,
  getUserStatusHandler,
} = require('./userCreation.controller');

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
router.get('/branches', getBranchesHandler);
router.get('/user-details', validate(getUserDetailsByIdSchema, { source: 'query' }), getUserDetailsHandler);
router.get('/user-status', getUserStatusHandler);

// Protected routes (auth required)
router.post('/validate', authRequired, validate(createUserSchema), validateUserHandler);
router.post('/create', authRequired, validate(createUserSchema), createUserHandler);
router.put('/update', authRequired, validate(updateUserSchema), updateUserHandler);
router.post('/upload-image', authRequired, upload.single('file'), uploadUserImageHandler);

module.exports = router;
