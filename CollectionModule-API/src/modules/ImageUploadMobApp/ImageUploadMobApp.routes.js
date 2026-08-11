const express = require('express');
const { authRequired } = require('../../middleware/auth');
const multer = require('multer');
const {
  uploadImageHandler,
  getImagesHandler,
  deleteImageHandler,
  updateVisibilityHandler
} = require('./ImageUploadMobApp.controller');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload or update image
router.post('/upload', upload.single('image'), uploadImageHandler);

// Get images
router.get('/', getImagesHandler);

// Delete image
router.delete('/delete-image', deleteImageHandler);

// Update visibility
router.patch('/update-visibility', updateVisibilityHandler);

module.exports = router;
