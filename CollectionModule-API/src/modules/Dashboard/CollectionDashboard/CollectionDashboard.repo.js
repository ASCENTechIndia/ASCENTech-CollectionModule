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


async function getDashboardTransactionModeData(payload) {

  const result = await executeQuery(`
    SELECT
      TRANSACTION_MODE,
      TOTAL_TRANSACTIONS,
      TRANSACTION_PERCENTAGE,
      TOTAL_COLLECTION
    FROM ATBSS_CM.AOUP_V_TRANSACTION_MODE
    ORDER BY TOTAL_COLLECTION DESC
  `,{},{dbName: "db3"});

  const rows = result?.rows || [];

  const transactionModes = rows.map((row) => ({
    transactionMode: row.TRANSACTION_MODE,

    totalTransactions: asNumber(
      row.TOTAL_TRANSACTIONS,
      0
    ),

    transactionPercentage: Number(
      asNumber(
        row.TRANSACTION_PERCENTAGE,
        0
      ).toFixed(2)
    ),

    totalCollection: Number(
      asNumber(
        row.TOTAL_COLLECTION,
        0
      ).toFixed(2)
    ),
  }));

  return {
    transactionModes,
  };
}

async function getDashboardTopLcoCollectionData() {


  const result = await executeQuery(`
    SELECT
      RANK_NO,
      LCO_CODE,
      LCO_NAME,
      TOTAL_TRANSACTIONS,
      TOTAL_COLLECTION
    FROM ATBSS_CM.AOUP_V_TOP_LCO_COLLECTION
    FETCH FIRST 5 ROWS ONLY
  `,{},{dbName: "db3"});

  const rows = result?.rows || [];

  const topLcos = rows.map((row) => ({
    rankNo: asNumber(row.RANK_NO, 0),

    lcoCode: row.LCO_CODE ?? "",

    lcoName: row.LCO_NAME ?? "",

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
    topLcos,
  };
}

async function getDashboardStateCollectionData(payload) {

  const result = await executeQuery(`
    SELECT
      STATE_NAME,
      TOTAL_TRANSACTIONS,
      TOTAL_COLLECTION,
      COLLECTION_PERCENTAGE
    FROM ATBSS_CM.AOUP_V_STATE_COLLECTION
    ORDER BY TOTAL_COLLECTION DESC
  `,{},{dbName: "db3"});

  const rows = result?.rows || [];

  const stateCollections = rows.map((row) => ({
    stateName: row.STATE_NAME ?? "",

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
    stateCollections,
  };
}

module.exports = {
  getDashboardSummaryData,
  getDashboardDailyTransactionsData,
  getDashboardPaymentModeData,
  getDashboardTransactionModeData,
  getDashboardTopLcoCollectionData,
  getDashboardStateCollectionData
};
