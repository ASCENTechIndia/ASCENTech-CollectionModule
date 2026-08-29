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
      FROM ATBSS_CM.VW_DASHBOARD_SUMMARY_MTD
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
    FROM ATBSS_CM.VW_COLLECTION_DAILY_SUMMARY
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

  const result = await executeQuery(`SELECT PAYMENT_GROUP ,TRANSACTION_COUNT, TOTAL_PAID_AMOUNT , AMOUNT_PERCENTAGE
FROM ATBSS_CM.VW_COLLECTION_BY_PAYMENT_MODE
ORDER BY
    CASE
        WHEN PAYMENT_GROUP = 'Cheque' THEN 1
        WHEN PAYMENT_GROUP = 'Cash' THEN 2
        WHEN PAYMENT_GROUP = 'Online' THEN 3
        WHEN PAYMENT_GROUP = 'Total' THEN 4
    END`,{},{dbName: "db3"});

  const rows = result?.rows || [];

  const paymentModes = rows.map((row) => ({
    paymentMode: row.PAYMENT_GROUP,

    totalTransactions: asNumber(
      row.TRANSACTION_COUNT,
      0
    ),

    totalCollection: Number(
      asNumber(
        row.TOTAL_PAID_AMOUNT,
        0
      ).toFixed(2)
    ),

    collectionPercentage: Number(
      asNumber(
        row.AMOUNT_PERCENTAGE,
        0
      ).toFixed(2)
    ),
  }));

  return {

    paymentModes,
  };
}


async function getDashboardTransactionModeData(payload) {

  const result = await executeQuery(`SELECT ONLINE_GROUP , TRANSACTION_COUNT , TOTAL_PAID_AMOUNT , AMOUNT_PERCENTAGE
FROM ATBSS_CM.VW_COLLECTION_BY_TRANSACTION_MODE
ORDER BY
    CASE
        WHEN ONLINE_GROUP = 'Static QR' THEN 1
        WHEN ONLINE_GROUP = 'Dynamic QR' THEN 2
        WHEN ONLINE_GROUP = 'BBPS' THEN 3
        WHEN ONLINE_GROUP = 'Other' THEN 4
        WHEN ONLINE_GROUP = 'Total' THEN 5
    END`,{},{dbName: "db3"});

  const rows = result?.rows || [];

  const transactionModes = rows.map((row) => ({
    transactionMode: row.ONLINE_GROUP,

    totalTransactions: asNumber(
      row.TRANSACTION_COUNT,
      0
    ),

    transactionPercentage: Number(
      asNumber(
        row.AMOUNT_PERCENTAGE,
        0
      ).toFixed(2)
    ),

    totalCollection: Number(
      asNumber(
        row.TOTAL_PAID_AMOUNT,
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

async function getDashboardCityCollectionData() {

  const result = await executeQuery(`
    SELECT
      RANK_NO,
      CITY_NAME,
      TOTAL_CUSTOMERS,
      TOTAL_TRANSACTIONS,
      TOTAL_COLLECTION
    FROM ATBSS_CM.AOUP_V_CITY_COLLECTION
    ORDER BY RANK_NO
  `,{},{dbName: "db3"});

  const rows = result?.rows || [];

  const cityCollections = rows.map((row) => ({
    rankNo: asNumber(row.RANK_NO, 0),

    cityName: row.CITY_NAME ?? "",

    totalCustomers: asNumber(
      row.TOTAL_CUSTOMERS,
      0
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
    cityCollections,
  };
}

async function getDashboardCollectionCountData() {
  const [averageResult, paymentModeResult] = await Promise.all([
    executeQuery(
      `
        SELECT
          AVG_COLLECTION_PER_TRANSACTION,
          AVG_COLLECTION_PER_CUSTOMER
        FROM ATBSS_CM.VW_DASHBOARD_SUMMARY_MTD
      `,
      {},
      { dbName: "db3" }
    ),

    executeQuery(
      `
        SELECT
          PAYMENT_GROUP,
          TOTAL_PAID_AMOUNT,
          AMOUNT_PERCENTAGE
        FROM ATBSS_CM.VW_COLLECTION_BY_PAYMENT_MODE
        ORDER BY
          CASE
            WHEN PAYMENT_GROUP = 'Cheque' THEN 1
            WHEN PAYMENT_GROUP = 'Cash' THEN 2
            WHEN PAYMENT_GROUP = 'Digital' THEN 3
            WHEN PAYMENT_GROUP = 'Total' THEN 4
          END
      `,
      {},
      { dbName: "db3" }
    ),
  ]);

  const average = averageResult?.rows?.[0] || {};
  const paymentModeRows = paymentModeResult?.rows || [];

  // Find individual payment modes
  const chequeRow = paymentModeRows.find(
    (row) => row.PAYMENT_GROUP === "Cheque"
  );

  const cashRow = paymentModeRows.find(
    (row) => row.PAYMENT_GROUP === "Cash"
  );

  const digitalRow = paymentModeRows.find(
    (row) => row.PAYMENT_GROUP === "Digital"
  );

  // -----------------------------
  // Payment Mode Data
  // -----------------------------

  const chequeCollection = {
    totalTransactions: 0,

    chequeCollection: Number(
      asNumber(chequeRow?.TOTAL_PAID_AMOUNT, 0).toFixed(2)
    ),

    chequeCollectionPercentage: Number(
      asNumber(chequeRow?.AMOUNT_PERCENTAGE, 0).toFixed(2)
    ),
  };

  const cashCollection = {
    totalTransactions: 0,

    cashCollection: Number(
      asNumber(cashRow?.TOTAL_PAID_AMOUNT, 0).toFixed(2)
    ),

    cashCollectionPercentage: Number(
      asNumber(cashRow?.AMOUNT_PERCENTAGE, 0).toFixed(2)
    ),
  };

  const digitalCollection = {
    totalTransactions: 0,

    digitalCollection: Number(
      asNumber(digitalRow?.TOTAL_PAID_AMOUNT, 0).toFixed(2)
    ),

    digitalCollectionPercentage: Number(
      asNumber(digitalRow?.AMOUNT_PERCENTAGE, 0).toFixed(2)
    ),
  };

  return {
    collectionCount: {
      avgCollectionPerTransaction: Number(
        asNumber(
          average.AVG_COLLECTION_PER_TRANSACTION,
          0
        ).toFixed(2)
      ),

      avgCollectionPerCustomer: Number(
        asNumber(
          average.AVG_COLLECTION_PER_CUSTOMER,
          0
        ).toFixed(2)
      ),

      cashCollection,

      digitalCollection,

      chequeCollection,
    },
  };
}

module.exports = {
  getDashboardSummaryData,
  getDashboardDailyTransactionsData,
  getDashboardPaymentModeData,
  getDashboardTransactionModeData,
  getDashboardTopLcoCollectionData,
  getDashboardStateCollectionData,
  getDashboardCityCollectionData,
  getDashboardCollectionCountData
};
