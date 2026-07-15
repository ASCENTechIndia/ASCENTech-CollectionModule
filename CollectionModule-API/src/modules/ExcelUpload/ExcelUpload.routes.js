const express = require('express');
const { excelUpload } = require('../../middleware/upload.middleware');
const { uploadExcelHandler } = require('./ExcelUpload.controller');

const router = express.Router();

// ──────────────────────────────────────────────────────────────
// POST /api/excel-upload/upload
//
// Middleware chain (runs left to right):
//  1. excelUpload.single('excelFile')
//     → multer reads the uploaded file from request
//     → stores it in memory as req.file.buffer
//     → rejects non-Excel files automatically
//
//  2. uploadExcelHandler
//     → reads req.file.buffer
//     → parses it with xlsx
//     → returns JSON data
//
// NOTE: The field name 'excelFile' must match what the
//       React frontend sends in FormData.append('excelFile', file)
// ──────────────────────────────────────────────────────────────

router.post(
  '/upload',
  excelUpload.single('excelFile'), // 'excelFile' = field name from React FormData
  uploadExcelHandler
);

module.exports = router;
