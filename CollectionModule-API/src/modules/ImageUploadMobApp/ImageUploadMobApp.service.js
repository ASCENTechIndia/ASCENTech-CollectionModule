const { 
  uploadImageRepo, 
  getImagesRepo, 
  deleteImageRepo, 
  updateVisibilityRepo 
} = require('./ImageUploadMobApp.repo');
const sharp = require('sharp');

async function uploadImageService({ title, visibility, file, userId }) {
  let base64Image = null;
  if (file) {
    // Resize and compress image
    const buffer = await sharp(file.buffer)
      .resize({ height: 500 })
      .jpeg({ quality: 25 })
      .toBuffer();
    base64Image = buffer.toString('base64');
  }
  return uploadImageRepo({ title, visibility, base64Image, userId });
}

async function getImagesService() {
  return getImagesRepo();
}

async function deleteImageService(title, userId) {
  return deleteImageRepo(title, userId);
}

async function updateVisibilityService(title, visibility) {
  return updateVisibilityRepo(title, visibility);
}

module.exports = {
  uploadImageService,
  getImagesService,
  deleteImageService,
  updateVisibilityService
};
