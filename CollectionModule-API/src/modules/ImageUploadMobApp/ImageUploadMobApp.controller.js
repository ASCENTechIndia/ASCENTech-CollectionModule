const {
  uploadImageService,
  getImagesService,
  deleteImageService,
  updateVisibilityService
} = require('./ImageUploadMobApp.service');

// Upload or update image
async function uploadImageHandler(req, res, next) {
  try {
    const { title, visibility } = req.body;
    const file = req.file;
    const userId = req.user?.id || 'SYSTEM';
    if (!file && visibility === 'Y') {
      return res.status(400).json({ message: 'Please upload an image before making it visible.' });
    }
    const result = await uploadImageService({ title, visibility, file, userId });
    return res.json({ message: 'Image uploaded/updated successfully', result });
  } catch (err) {
    next(err);
  }
}

// Get images
async function getImagesHandler(req, res, next) {
  try {
    const images = await getImagesService();
    return res.json(images);
  } catch (err) {
    next(err);
  }
}

// Delete image
async function deleteImageHandler(req, res, next) {
  try {
    const { title } = req.query;
    const userId = req.user?.id || 'SYSTEM';
    await deleteImageService(title, userId);
    return res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    next(err);
  }
}

// Update visibility
async function updateVisibilityHandler(req, res, next) {
  try {
    const { title , visibility } = req.body;
    await updateVisibilityService(title, visibility);
    return res.json({ message: 'Visibility updated successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  uploadImageHandler,
  getImagesHandler,
  deleteImageHandler,
  updateVisibilityHandler
};
