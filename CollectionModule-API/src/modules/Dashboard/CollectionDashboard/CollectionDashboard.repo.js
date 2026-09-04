const oracledb = require('oracledb');
const { executeQuery } = require('../../../db/queryExecutor');
const { executeProcedure } = require('../../../db/procedureExecutor');

function parseDDMMYYYY(dateString) {
  const [day, month, year] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day);
}

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

async function getDashboardSummaryData(payload) {
  const statement = `
    BEGIN
      ATBSS_CM.SP_COLLECTION_DASHBOARD_SUMMARY(
        :P_FROM_DATE,
        :P_TO_DATE,
        :P_RESULT
      );
    END;
  `;

  const binds = {
    P_FROM_DATE: parseDDMMYYYY(payload.fromDate),
    P_TO_DATE: parseDDMMYYYY(payload.toDate),

    P_RESULT: {
      dir: oracledb.BIND_OUT,
      type: oracledb.CURSOR,
    },
  };

  const result = await executeProcedure({
    statement,
    binds,
    useTx: false,
    dbName: "db3",
  });

  const cursor = result?.outBinds?.P_RESULT;

  if (!cursor || cursor.length === 0) {
    return {
      summary: {
        totalLcos: 0,
        totalCustomers: 0,
        totalTransactions: 0,
        totalCollection: 0,
        avgCollectionPerTransaction: 0,
        avgCollectionPerCustomer: 0,
      },
    };
  }

  const row = cursor[0];

  return {
    summary: {
      totalLcos: asNumber(
        row.TOTAL_LCOS,
        0
      ),

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

async function getDashboardDailyTransactionsData(payload) {
  const { fromDate, toDate } = payload;

  const result = await executeQuery(
    `
      SELECT
        TRANSACTION_DATE,
        TOTAL_TRANSACTIONS,
        TOTAL_COLLECTION
      FROM ATBSS_CM.VW_COLLECTION_DAILY_SUMMARY
      WHERE TRANSACTION_DATE >= TO_DATE(:fromDate, 'DD-MM-YYYY')
        AND TRANSACTION_DATE <  TO_DATE(:toDate, 'DD-MM-YYYY')
      ORDER BY TRANSACTION_DATE
    `,
    {
      fromDate,
      toDate,
    },
    { dbName: "db3" }
  );

  const rows = result?.rows || [];

  const transactions = rows.map((row) => ({
    transactionDate: formatDateDDMonYYYY(row.TRANSACTION_DATE),

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

async function getDashboardPaymentModeData(payload) {
  const statement = `
    BEGIN
      ATBSS_CM.SP_COLLECTION_PAYMENT_MODE(
        :P_FROM_DATE,
        :P_TO_DATE,
        :P_RESULT
      );
    END;
  `;

  const binds = {
    P_FROM_DATE: parseDDMMYYYY(payload.fromDate),
    P_TO_DATE: parseDDMMYYYY(payload.toDate),

    P_RESULT: {
      dir: oracledb.BIND_OUT,
      type: oracledb.CURSOR,
    },
  };

  const result = await executeProcedure({
    statement,
    binds,
    useTx: false,
    dbName: "db3",
  });

  const cursor = result?.outBinds?.P_RESULT;

  if (!cursor) {
    return {
      paymentModes: [],
    };
  }

  const paymentModes = cursor.map((row) => ({
    paymentMode: row.PAYMENT_GROUP ?? "",

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
  const statement = `
    BEGIN
      ATBSS_CM.SP_COLLECTION_TRANSACTION_MODE(
        :P_FROM_DATE,
        :P_TO_DATE,
        :P_RESULT
      );
    END;
  `;

  const binds = {
    P_FROM_DATE: parseDDMMYYYY(payload.fromDate),
    P_TO_DATE: parseDDMMYYYY(payload.toDate),

    P_RESULT: {
      dir: oracledb.BIND_OUT,
      type: oracledb.CURSOR,
    },
  };

  const result = await executeProcedure({
    statement,
    binds,
    useTx: false,
    dbName: "db3",
  });

  const cursor = result?.outBinds?.P_RESULT;

  if (!cursor) {
    return {
      transactionModes: [],
    };
  }

  const transactionModes = cursor.map((row) => ({
    transactionMode: row.ONLINE_GROUP ?? "",

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

async function getDashboardTopLcoCollectionData(payload) {
  const statement = `
    BEGIN
      ATBSS_CM.SP_COLLECTION_TOP5_LCO(
        :P_FROM_DATE,
        :P_TO_DATE,
        :P_RESULT
      );
    END;
  `;

  const binds = {
    P_FROM_DATE: parseDDMMYYYY(payload.fromDate),
    P_TO_DATE: parseDDMMYYYY(payload.toDate),

    P_RESULT: {
      dir: oracledb.BIND_OUT,
      type: oracledb.CURSOR,
    },
  };

  const result = await executeProcedure({
    statement,
    binds,
    useTx: false,
    dbName: "db3",
  });

  const cursor = result?.outBinds?.P_RESULT;

  if (!cursor) {
    return {
      topLcos: [],
    };
  }

  const topLcos = cursor.map((row) => ({
    rankNo: asNumber(row.RANK_NO, 0),
    lcoCode: row.LCOCODE ?? "",
    lcoName: row.LCO_NAME ?? "",
    totalTransactions: asNumber(row.TOTAL_TRANSACTIONS, 0),
    totalCollection: Number(
      asNumber(row.TOTAL_COLLECTION, 0).toFixed(2)
    ),
  }));

  return {
    topLcos,
  };
}

async function getDashboardStateCollectionData(payload) {
  const statement = `
    BEGIN
      ATBSS_CM.SP_COLLECTION_STATE_SUMMARY(
        :P_FROM_DATE,
        :P_TO_DATE,
        :P_RESULT
      );
    END;
  `;

  const binds = {
    P_FROM_DATE: parseDDMMYYYY(payload.fromDate),
    P_TO_DATE: parseDDMMYYYY(payload.toDate),

    P_RESULT: {
      dir: oracledb.BIND_OUT,
      type: oracledb.CURSOR,
    },
  };

  const result = await executeProcedure({
    statement,
    binds,
    useTx: false,
    dbName: "db3",
  });

  const cursor = result?.outBinds?.P_RESULT;

  if (!cursor) {
    return {
      stateCollections: [],
    };
  }

  const stateCollections = cursor.map((row) => ({
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
        row.SHARE_PERCENT,
        0
      ).toFixed(2)
    ),
  }));

  return {
    stateCollections,
  };
}

async function getDashboardCityCollectionData(payload) {
  const statement = `
    BEGIN
      ATBSS_CM.SP_COLLECTION_TOP5_CITY(
        :P_FROM_DATE,
        :P_TO_DATE,
        :P_RESULT
      );
    END;
  `;

  const binds = {
    P_FROM_DATE: parseDDMMYYYY(payload.fromDate),
    P_TO_DATE: parseDDMMYYYY(payload.toDate),

    P_RESULT: {
      dir: oracledb.BIND_OUT,
      type: oracledb.CURSOR,
    },
  };

  const result = await executeProcedure({
    statement,
    binds,
    useTx: false,
    dbName: "db3",
  });

  const cursor = result?.outBinds?.P_RESULT;

  if (!cursor) {
    return {
      cityCollections: [],
    };
  }

  const cityCollections = cursor.map((row, index) => ({
    rankNo: index + 1,

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
