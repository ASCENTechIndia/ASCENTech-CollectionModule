const { executeQuery } = require('../../../db/queryExecutor');

/**
 * Get collection data by payment method for last 7 days
 * Returns: REC_DATE, OFFLINE_AMT, ONLINE_AMT
 */
async function getTotalCollectionPaywiseLast7DaysRepo() {
  const query = `
    SELECT * FROM vw_totalcolln_paywise_last7dys
    ORDER BY REC_DATE DESC
  `;
  return executeQuery(query);
}

/**
 * Get collection trend for last 7 days
 * Returns: REC_DATE, TOTAL_AMT
 */
async function getTotalCollectionTrendLast7DaysRepo() {
  const query = `
    SELECT * FROM vw_totalcolln_trend_last7dys
    ORDER BY REC_DATE DESC
  `;
  return executeQuery(query);
}

/**
 * Get receipt count for last 7 days
 * Returns: REC_DATE, REC_COUNT
 */
async function getReceiptCountLast7DaysRepo() {
  const query = `
    SELECT * FROM vw_reccnt_last7dys
    ORDER BY REC_DATE DESC
  `;
  return executeQuery(query);
}

/**
 * Get summary by Prabhag (Zone/Circle)
 * Returns: PRABHAG, OUTSTANDING, DEMAND, COLLECTION, PERCENTAGE
 */
async function getPrabhagwiseSummaryRepo() {
  const query = `
    SELECT * FROM vw_prabhagwise_summary
    ORDER BY PERCENTAGE DESC
  `;
  return executeQuery(query);
}

/**
 * Get year-wise comparison data
 * Returns: PRBHAG, CURRENT_YEAR_AMT, AMT_25_26, AMT_24_25, AMT_23_24, AMT_22_23
 */
async function getYearwiseComparisonRepo() {
  const query = `
    SELECT * FROM yearwise_comparison
    ORDER BY PRBHAG
  `;
  return executeQuery(query);
}

/**
 * Get today's total collection
 * Returns: todays_total
 */
async function getTodaysTotalRepo() {
  const query = `
    SELECT SUM(num_rec_amount) as todays_total 
    FROM aoms_rec_mas 
    WHERE TRUNC(date_rec_receiptdt) = TRUNC(SYSDATE)
  `;
  const result = await executeQuery(query);
  return result && result.length > 0 ? result[0] : { todays_total: 0 };
}

/**
 * Get total offline amount
 * Returns: offline_amt
 */
async function getOfflineAmountRepo() {
  const query = `
    SELECT SUM(NVL(num_rec_amount, 0)) as offline_amt
    FROM aoms_rec_mas
    WHERE num_rec_amttype IN (0, 1, 3)
  `;
  const result = await executeQuery(query);
  return result && result.length > 0 ? result[0] : { offline_amt: 0 };
}

/**
 * Get total online amount
 * Returns: online_amt
 */
async function getOnlineAmountRepo() {
  const query = `
    SELECT SUM(num_rec_amount) as online_amt
    FROM aoms_rec_mas
    WHERE num_rec_amttype IN (6, 5, 2, 9)
  `;
  const result = await executeQuery(query);
  return result && result.length > 0 ? result[0] : { online_amt: 0 };
}

/**
 * Get total collection amount
 * Returns: total_amt
 */
async function getTotalAmountRepo() {
  const query = `
    SELECT SUM(NVL(num_rec_amount, 0)) as total_amt
    FROM aoms_rec_mas
  `;
  const result = await executeQuery(query);
  return result && result.length > 0 ? result[0] : { total_amt: 0 };
}

/**
 * Get total receipt count
 * Returns: total_receipt
 */
async function getTotalReceiptCountRepo() {
  const query = `
    SELECT COUNT(var_rec_recno) as total_receipt
    FROM aoms_rec_mas
  `;
  const result = await executeQuery(query);
  return result && result.length > 0 ? result[0] : { total_receipt: 0 };
}

module.exports = {
  getTotalCollectionPaywiseLast7DaysRepo,
  getTotalCollectionTrendLast7DaysRepo,
  getReceiptCountLast7DaysRepo,
  getPrabhagwiseSummaryRepo,
  getYearwiseComparisonRepo,
  getTodaysTotalRepo,
  getOfflineAmountRepo,
  getOnlineAmountRepo,
  getTotalAmountRepo,
  getTotalReceiptCountRepo,
};
