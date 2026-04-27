const oracledb = require('oracledb');
const { executeQuery } = require('../../db/queryExecutor');
const { executeProcedure } = require('../../db/procedureExecutor');

async function uploadImageRepo({ title, visibility, base64Image, userId }) {
  // Check if image exists
  const checkSql = `SELECT BLB_IMAGE_DATA FROM atbss.AOUP_IMAGE_VISIBILITY_FLAG WHERE VAR_IMAGE_TITLE = :title`;
  const checkResult = await executeQuery(checkSql, { title });
  const imageExists = checkResult.rows && checkResult.rows.length > 0 && checkResult.rows[0].BLB_IMAGE_DATA;

  if (visibility === 'Y' && !base64Image && !imageExists) {
    throw new Error('No image available. Please upload an image before making it visible.');
  }

  // Insert history if updating image
  if (base64Image && imageExists) {
    const historySql = `INSERT INTO atbss.AOUP_IMAGE_VISIBILITY_HISTORY (var_title, blb_imgdata, var_updt_by, dt_updt_dt)
      SELECT VAR_IMAGE_TITLE, BLB_IMAGE_DATA, :updatedBy, SYSDATE FROM atbss.AOUP_IMAGE_VISIBILITY_FLAG WHERE VAR_IMAGE_TITLE = :title`;
    await executeQuery(historySql, { updatedBy: userId, title });
  }

  // Update or insert
  let sql;
  let binds;
  if (base64Image) {
    sql = `UPDATE atbss.AOUP_IMAGE_VISIBILITY_FLAG SET BLB_IMAGE_DATA = :img, VAR_FLAG = :flag WHERE VAR_IMAGE_TITLE = :title`;
    binds = { img: base64Image, flag: visibility, title };
  } else {
    sql = `UPDATE atbss.AOUP_IMAGE_VISIBILITY_FLAG SET VAR_FLAG = :flag WHERE VAR_IMAGE_TITLE = :title`;
    binds = { flag: visibility, title };
  }
  await executeQuery(sql, binds);
  return true;
}

async function getImagesRepo() {
  const sql = `SELECT VAR_IMAGE_TITLE, BLB_IMAGE_DATA, VAR_FLAG FROM atbss.AOUP_IMAGE_VISIBILITY_FLAG`;
  const result = await executeQuery(sql, {});
  return result.rows;
}

async function deleteImageRepo(title, userId) {
  // Get existing image
  const selectSql = `SELECT BLB_IMAGE_DATA FROM ATBSS.AOUP_IMAGE_VISIBILITY_FLAG WHERE VAR_IMAGE_TITLE = :title`;
  const selectResult = await executeQuery(selectSql, { title });
  const base64Image = selectResult.rows && selectResult.rows[0]?.BLB_IMAGE_DATA || '';

  // Insert history
  const historySql = `INSERT INTO ATBSS.AOUP_IMAGE_DELETE_HISTORY (VAR_IMAGE_TITLE, BLB_IMAGE_DATA, DELETED_DATE, DELETED_BY) VALUES (:title, :img, SYSDATE, :deletedBy)`;
  await executeQuery(historySql, { title, img: base64Image, deletedBy: userId });

  // Delete image from main table
  const deleteSql = `UPDATE ATBSS.AOUP_IMAGE_VISIBILITY_FLAG SET BLB_IMAGE_DATA = NULL, VAR_FLAG = 'N' WHERE VAR_IMAGE_TITLE = :title`;
  await executeQuery(deleteSql, { title });
  return true;
}

async function updateVisibilityRepo(title, visibility) {
  const sql = `UPDATE ATBSS.AOUP_IMAGE_VISIBILITY_FLAG SET VAR_FLAG = :flag WHERE VAR_IMAGE_TITLE = :title`;
  await executeQuery(sql, { flag: visibility, title });
  return true;
}

module.exports = {
  uploadImageRepo,
  getImagesRepo,
  deleteImageRepo,
  updateVisibilityRepo
};
