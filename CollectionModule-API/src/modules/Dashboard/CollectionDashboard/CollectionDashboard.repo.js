const oracledb = require('oracledb');
const { executeQuery } = require('../../../db/queryExecutor');
const { executeProcedure } = require('../../../db/procedureExecutor');

function asNumber(value, fallback = 0) {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : fallback;
}

function formatDateDDMonYYYY(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

async function getDashboardSummaryData() {
  const result = await executeQuery(
    `
      SELECT
        TOTAL_LCOS,
        TOTAL_CUSTOMERS,
        TOTAL_TRANSACTIONS,
        TOTAL_COLLECTION,
        AVG_COLLECTION_PER_TRANSACTION,
        AVG_COLLECTION_PER_CUSTOMER
      FROM ATBSS_CM.AOUP_V_DASH_SUMMARY
    `,
    {},
    { dbName: 'db3' }
  );

  const row = result?.rows?.[0] || {};

  return {

    summary: {
      totalLcos: asNumber(row.TOTAL_LCOS, 0),

      totalCustomers: asNumber(
        row.TOTAL_CUSTOMERS,
        0
      ),

      totalTransactions: asNumber(
        row.TOTAL_TRANSACTIONS,
        0
      ),

      totalCollection: Number(
        asNumber(row.TOTAL_COLLECTION, 0).toFixed(2)
      ),

      avgCollectionPerTransaction: Number(
        asNumber(
          row.AVG_COLLECTION_PER_TRANSACTION,
          0
        ).toFixed(2)
      ),

      avgCollectionPerCustomer: Number(
        asNumber(
          row.AVG_COLLECTION_PER_CUSTOMER,
          0
        ).toFixed(2)
      ),
    },
  };
}

async function getDashboardDailyTransactionsData() {

  const result = await executeQuery(`
    SELECT
      TRANSACTION_DATE,
      TOTAL_TRANSACTIONS,
      TOTAL_COLLECTION
    FROM ATBSS_CM.AOUP_V_DAILY_TRANSACTION
    ORDER BY TRANSACTION_DATE
  `,{},{dbName: "db3"});

  const rows = result?.rows || [];

  const transactions = rows.map((row) => ({
    transactionDate: formatDateDDMonYYYY(
      row.TRANSACTION_DATE
    ),

    totalTransactions: asNumber(
      row.TOTAL_TRANSACTIONS,
      0
    ),

    totalCollection: Number(
      asNumber(
        row.TOTAL_COLLECTION,
        0
      ).toFixed(2)
    ),
  }));

  return {

    transactions,
  };
}

async function getDashboardPaymentModeData() {

  const result = await executeQuery(`
    SELECT
      PAYMENT_MODE,
      TOTAL_TRANSACTIONS,
      TOTAL_COLLECTION,
      COLLECTION_PERCENTAGE
    FROM ATBSS_CM.AOUP_V_PAYMENT_MODE
    ORDER BY TOTAL_COLLECTION DESC
  `,{},{dbName: "db3"});

  const rows = result?.rows || [];

  const paymentModes = rows.map((row) => ({
    paymentMode: row.PAYMENT_MODE,

    totalTransactions: asNumber(
      row.TOTAL_TRANSACTIONS,
      0
    ),

    totalCollection: Number(
      asNumber(
        row.TOTAL_COLLECTION,
        0
      ).toFixed(2)
    ),

    collectionPercentage: Number(
      asNumber(
        row.COLLECTION_PERCENTAGE,
        0
      ).toFixed(2)
    ),
  }));

  return {

    paymentModes,
  };
}

module.exports = {
  getDashboardSummaryData,
  getDashboardDailyTransactionsData,
  getDashboardPaymentModeData
};
