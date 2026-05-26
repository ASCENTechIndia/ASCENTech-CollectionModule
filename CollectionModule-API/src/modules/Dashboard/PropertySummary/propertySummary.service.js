const {
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
} = require('./propertySummary.repo');
const AppError = require('../../../utils/app-error');

/**
 * Get complete property summary dashboard data
 */
async function getPropertySummaryDashboardService() {
  try {
    // Execute all queries in parallel
    const [
      payWiseData,
      trendData,
      receiptCountData,
      prabhagSummary,
      yearComparison,
      todaysTotal,
      offlineAmount,
      onlineAmount,
      totalAmount,
      totalReceipt,
    ] = await Promise.all([
      getTotalCollectionPaywiseLast7DaysRepo(),
      getTotalCollectionTrendLast7DaysRepo(),
      getReceiptCountLast7DaysRepo(),
      getPrabhagwiseSummaryRepo(),
      getYearwiseComparisonRepo(),
      getTodaysTotalRepo(),
      getOfflineAmountRepo(),
      getOnlineAmountRepo(),
      getTotalAmountRepo(),
      getTotalReceiptCountRepo(),
    ]);

    // Normalize results from query executor
    const normalizeResult = (result) => {
      if (!result) return [];
      return result.rows || result.recordset || result || [];
    };

    return {
      success: true,
      data: {
        // Last 7 days data
        last7DaysPaywise: normalizeResult(payWiseData),
        last7DaysTrend: normalizeResult(trendData),
        last7DaysReceiptCount: normalizeResult(receiptCountData),
        
        // Summary data
        prabhagwiseSummary: normalizeResult(prabhagSummary),
        yearwiseComparison: normalizeResult(yearComparison),
        
        // Count summaries
        counts: {
          todaysTotal: todaysTotal?.todays_total || 0,
          offlineAmount: offlineAmount?.offline_amt || 0,
          onlineAmount: onlineAmount?.online_amt || 0,
          totalAmount: totalAmount?.total_amt || 0,
          totalReceipt: totalReceipt?.total_receipt || 0,
        },
      },
    };
  } catch (error) {
    throw new AppError(
      `Failed to fetch property summary dashboard: ${error.message}`,
      400
    );
  }
}

module.exports = {
  getPropertySummaryDashboardService,
};
