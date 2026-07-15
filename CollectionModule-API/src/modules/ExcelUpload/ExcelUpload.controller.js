const { uploadContractCBIService } = require('./ExcelUpload.service');
const { logApiSuccess, logApiError } = require('../../utils/log');

// ──────────────────────────────────────────────────────────────────────────────
// 📤 CONTROLLER: uploadExcelHandler
//
// FLOW:
//  1. multer middleware → req.file.buffer मध्ये Excel file आहे
//  2. req.body.userName → कोणी upload केले (login user)
//  3. uploadContractCBIService → Excel parse + Oracle procedure call
//  4. Response → total rows, success count, fail count, row-by-row detail
// ──────────────────────────────────────────────────────────────────────────────
async function uploadExcelHandler(req, res, next) {
  try {
    if (!req.file) {
      return res.fail('No file uploaded. Please attach an Excel file.', 400);
    }

    // Who is uploading? (can come from body or JWT token)
    const userName = req.body?.userName || req.user?.userid ;

    // Optional: which sheet to read? default = 0 (first sheet)
    const sheetIndex = parseInt(req.query.sheet || '0', 10);

    // Call service → parse Excel + call Oracle proc for each row
    const result = await uploadContractCBIService(req.file.buffer, userName, sheetIndex);

    logApiSuccess(req, 200, {
      totalRows: result.totalRows,
      successCount: result.successCount,
      failCount: result.failCount,
    }, 'Contract CBI Upload completed');

    return res.ok({
      fileName: req.file.originalname,
      fileSize: req.file.size,
      sheetNames: result.sheetNames,
      activeSheet: result.activeSheet,
      totalRows: result.totalRows,
      successCount: result.successCount,
      failCount: result.failCount,
      results: result.results,  // row-by-row status
    }, 'Contract CBI Upload completed');

  } catch (error) {
    logApiError(req, 500, error.message, 'Excel upload error');
    return next(error);
  }
}

module.exports = { uploadExcelHandler };
