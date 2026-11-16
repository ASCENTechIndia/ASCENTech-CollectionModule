const { executeQuery } = require("../../../db/queryExecutor");

function normalizeUserId(userId) {
  const value = String(userId || "").trim();
  if (!value) {
    return value;
  }
  return value.startsWith("E") ? value.substring(1) : value;
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function resolveMonthYear(query = {}) {
  if (query.monthYear) {
    const value = String(query.monthYear).trim();
    const match = value.match(/^(0[1-9]|1[0-2])\s*-\s*(\d{4})$/);
    if (match) {
      return {
        month: Number(match[1]),
        year: Number(match[2]),
        monthYear: `${match[1]}-${match[2]}`,
      };
    }
  }

  const month = Number(query.month) || new Date().getMonth() + 1;
  const year = Number(query.year) || new Date().getFullYear();
  return {
    month,
    year,
    monthYear: `${pad2(month)}-${year}`,
  };
}

function getDaysInMonth(month, year) {
  // month is 1-based; day 0 of next month = last day of this month
  return new Date(year, month, 0).getDate();
}

function dedupeRowsByTransId(rows) {
  const seen = new Set();
  const output = [];

  for (const row of rows || []) {
    const transId = String(
      row.TRANSID ?? row.transid ?? row.TRANS_ID ?? "",
    ).trim();
    const key = transId || JSON.stringify(row);
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    output.push(row);
  }

  return output;
}

function maskValue(value) {
  if (!value) {
    return value;
  }
  const str = String(value);
  if (str.length <= 4) {
    return str;
  }
  return "*".repeat(str.length - 4) + str.slice(-4);
}

function getMonthName(monthNumber) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[monthNumber - 1];
}

function resolveDayFromDate(dateText) {
  const raw = String(dateText || "").trim();
  const match = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) {
    return raw ? raw.slice(0, 2) : "";
  }

  const dd = Number(match[1]);
  const mm = Number(match[2]);

  if (dd >= 1 && dd <= 12) {
    return pad2(mm);
  }

  return pad2(dd);
}

async function getDashboardData({ userId, brCategory, query }) {
  const normalizedUserId = normalizeUserId(userId);
  const scope = resolveMonthYear(query);
  const monthText = pad2(scope.month);
  const selectedMonthYear = scope.monthYear;
  const selectedMonthYearWithSpaces = `${monthText} - ${scope.year}`;
  const totalDays = getDaysInMonth(scope.month, scope.year);
  const isBranchCategory = String(brCategory) === "5";

  const monthName = getMonthName(scope.month);
  const lastDay = getDaysInMonth(scope.month, scope.year);
  const firstDateToken = `01-${monthName}-${scope.year}`;
  const lastDateToken = `${pad2(lastDay)}-${monthName}-${scope.year}`;

  const chart1Sql = `
      SELECT
        TO_CHAR(TRUNC(BT.DAT_BANKTRANSDET_TRANSDAT), 'DD/MM/YYYY') AS TRANS_DATE,
        COUNT(DISTINCT BT.NUM_BANKTRANSDET_TRANSID) AS TOTAL_TRANSACTIONS
        FROM ATBSS_CM.AOUP_ETECH_BANKTRANSDETAILS BT
        LEFT JOIN ATBSS_CM.AOUP_ETECH_BANKINGTRANSMAST BM
          ON BM.NUM_BANKTRANSMAST_TRANSID = BT.NUM_BANKTRANSDET_TRANSID
        LEFT JOIN ATBSS_CM.AOUP_ETECH_BANKDATA BD
          ON BD.VAR_BANKDATA_CONTRACTNUM = BM.VAR_BANKTRANSMAST_CONTRCTNO
        INNER JOIN ETECH_CM.AOUP_USERMST_DEF C
          ON C.VAR_USERMST_USERID = BT.VAR_BANKTRANSDET_USERID
        INNER JOIN AOUP_AGENCY_FOS_MAP AF
          ON AF.NUM_FOS_ID = BT.VAR_BANKTRANSDET_USERID
         AND AF.VAR_STATUS = 'ACTIVE'
        INNER JOIN AOUP_COMPANY_AGENCY_MAP CAM
          ON CAM.NUM_TO_ENTITYID = AF.NUM_AGENCY_ID
         AND CAM.VAR_STATUS = 'ACTIVE'
       WHERE CAM.NUM_FROM_ENTITYID = :userId
         AND BT.DAT_BANKTRANSDET_TRANSDAT >= TO_DATE(:p_from, 'DD-MON-YYYY')
         AND BT.DAT_BANKTRANSDET_TRANSDAT <  TO_DATE(:p_to,   'DD-MON-YYYY') + 1
       GROUP BY TRUNC(BT.DAT_BANKTRANSDET_TRANSDAT)
       ORDER BY TRUNC(BT.DAT_BANKTRANSDET_TRANSDAT)
  `;

  const chart2Sql = `
      SELECT
        TO_CHAR(TRUNC(BT.DAT_BANKTRANSDET_TRANSDAT), 'DD/MM/YYYY') AS TRANS_DATE,
        COUNT(DISTINCT BT.VAR_BANKTRANSDET_USERID) AS UNIQUE_FOS_COUNT
        FROM ATBSS_CM.AOUP_ETECH_BANKTRANSDETAILS BT
        LEFT JOIN ATBSS_CM.AOUP_ETECH_BANKINGTRANSMAST BM
          ON BM.NUM_BANKTRANSMAST_TRANSID = BT.NUM_BANKTRANSDET_TRANSID
        LEFT JOIN ATBSS_CM.AOUP_ETECH_BANKDATA BD
          ON BD.VAR_BANKDATA_CONTRACTNUM = BM.VAR_BANKTRANSMAST_CONTRCTNO
        INNER JOIN ETECH_CM.AOUP_USERMST_DEF C
          ON C.VAR_USERMST_USERID = BT.VAR_BANKTRANSDET_USERID
        INNER JOIN ETECH_CM.AOUP_AGENCY_FOS_MAP AF
          ON AF.NUM_FOS_ID = BT.VAR_BANKTRANSDET_USERID
         AND AF.VAR_STATUS = 'ACTIVE'
        INNER JOIN ETECH_CM.AOUP_COMPANY_AGENCY_MAP CAM
          ON CAM.NUM_TO_ENTITYID = AF.NUM_AGENCY_ID
         AND CAM.VAR_STATUS = 'ACTIVE'
       WHERE CAM.NUM_FROM_ENTITYID = :userId
         AND BT.DAT_BANKTRANSDET_TRANSDAT >= TO_DATE(:p_from, 'DD-MON-YYYY')
         AND BT.DAT_BANKTRANSDET_TRANSDAT <  TO_DATE(:p_to,   'DD-MON-YYYY') + 1
       GROUP BY TRUNC(BT.DAT_BANKTRANSDET_TRANSDAT)
       ORDER BY TRUNC(BT.DAT_BANKTRANSDET_TRANSDAT)
  `;

  const gridSql = `
    SELECT
      BT.NUM_BANKTRANSDET_TRANSID AS SRNO,
      BT.VAR_BANKTRANSDET_TRANSIDNEW AS TRANSID,

      C.NUM_USERMST_EMAIL AS MDM_ID,
      REPLACE(BT.VAR_BANKTRANSDET_USERID, 'E', '') AS USERID,
      C.VAR_USERMST_USERFULLNAME AS USERNAME,

      BM.VAR_BANKTRANSMAST_CONTRCTNO AS CONTRACTNUM,

      VS.VAR_VISITSTATUS_TYPE AS VISITSTSTS,
      FB.VAR_FEEDBACKTYPE_MST_DESC AS FEEDBACK,

      BD.VAR_BANKDATA_BRANCH,
      BD.VAR_BANKDATA_PRODUCTCODE,
      BD.VAR_BANKDATA_PRODUCTNM,
      BD.VAR_BANKDATA_REGISTRNO,

      CASE BT.VAR_BANKTRANSDET_PAYMODE
        WHEN 'C' THEN 'Online'
        WHEN 'Q' THEN 'Cheque'
        WHEN 'R' THEN 'Online'
        ELSE BT.VAR_BANKTRANSDET_PAYMODE
      END AS PAYMODE,

      BT.NUM_BANKTRANSDET_PAIDAMT AS PAIDAMT,
      BT.NUM_BANKTRANSDET_CHQNO AS INSTRUMENTNO,
      BT.DAT_BANKTRANSDET_CHQDT AS INSTRUMENTDT,

      BT.VAR_BANKTRANSDET_BANKNAME AS BANKNAME,
      BT.VAR_BANKTRANSDET_BILLDESKREFNO AS BILLDESKREFNO,
      BT.VAR_BANKTRANSDET_AUTHCODE AS AUTHCODE,
      BT.VAR_BANKTRANSDET_BILLDESKMSG AS BILLDESKMSG,

      BT.VAR_BANKTRANSDET_ALTRPHNO1 AS MOBILENO,
      BT.VAR_BANKTRANSDET_ALTRPHNO2 AS ALTRPHNO2,
      BT.VAR_BANKTRANSDET_EMAIL1 AS EMAIL1,
      BT.VAR_BANKTRANSDET_ALTRNATADD AS ADDRESS,

      BM.DAT_BANKTRANSMAST_PTPDT AS PTPDATE,
      BT.DAT_BANKTRANSDET_RESHUDT AS RESHUDT,

      BT.VAR_BANKTRANSDET_VISITREMARK AS VISITREMARK,
      BT.VAR_BANKTRANSDET_PANFORM AS PANFORM,
      BT.VAR_BANKTRANSDET_PANDETAILS AS PANDETAILS,
      BT.VAR_BANKTRANSDET_SETTLEFLAG AS SETTLEFLAG,

      TO_CHAR(BT.DAT_BANKTRANSDET_TRANSDAT, 'DD/MM/YYYY') AS TRANS_DATE,
      TO_CHAR(BT.DAT_BANKTRANSDET_TRANSDAT, 'HH24:MI:SS') AS TRANS_TIME,

      BT.DAT_BANKTRANSDET_OFLNTRANSDATE AS OFLNTRANSDATE,
      BT.VAR_BANKTRANSDET_GOLOCATION AS GOLOCATION,

      BT.VAR_TMFL_UPLOADFLAG AS UPLOADFLAG,
      BT.VAR_TMFL_RESPONSE AS RESPONSE,
      BT.VAR_CREDITLIMIT_FLAG AS AUTHORISATIONFLAG,

      BD.VAR_BANKDATA_COBROWSRADDRESS AS CUSTOMERADDRESS,
      BD.VAR_BANKDATA_BRANCH AS LENDERLOCATIONNAME,
      BD.VAR_BANKDATA_REGISTRNO AS PRODUCT_TYPE,
      BD.VAR_BANKDATA_CUSTOMERNM AS CUSTOMERNAME,

      C.VAR_USERMST_EMPCODE AS EMPLOYEECODE,

      SUBSTR(
        BT.VAR_BANKTRANSDET_GOLOCATION,
        1,
        INSTR(BT.VAR_BANKTRANSDET_GOLOCATION, ',') - 1
      ) AS LATITUDE,

      SUBSTR(
        BT.VAR_BANKTRANSDET_GOLOCATION,
        INSTR(BT.VAR_BANKTRANSDET_GOLOCATION, ',') + 1
      ) AS LONGITUDE

    FROM ATBSS_CM.AOUP_ETECH_BANKTRANSDETAILS BT

    LEFT JOIN ATBSS_CM.AOUP_ETECH_BANKINGTRANSMAST BM
      ON BM.NUM_BANKTRANSMAST_TRANSID = BT.NUM_BANKTRANSDET_TRANSID

    LEFT JOIN ATBSS_CM.AOUP_ETECH_BANKDATA BD
      ON BD.VAR_BANKDATA_CONTRACTNUM = BM.VAR_BANKTRANSMAST_CONTRCTNO

    LEFT JOIN ATBSS_CM.AOUP_ETECH_VISITSTATUS_MST VS
      ON VS.NUM_VISITSTATUS_ID = BT.VAR_BANKTRANSDET_VISITSTSTS

    LEFT JOIN ATBSS_CM.AOUP_ETECH_FEEDBACKTYPE_MST FB
      ON FB.VAR_FEEDBACKTYPE_MST_ID = BT.VAR_BANKTRANSDET_CUSTFEEDBCK

    INNER JOIN ETECH_CM.AOUP_USERMST_DEF C
      ON C.VAR_USERMST_USERID = BT.VAR_BANKTRANSDET_USERID

    INNER JOIN ETECH_CM.AOUP_AGENCY_FOS_MAP AF
      ON AF.NUM_FOS_ID = BT.VAR_BANKTRANSDET_USERID
     AND AF.VAR_STATUS = 'ACTIVE'

    INNER JOIN ETECH_CM.AOUP_COMPANY_AGENCY_MAP CAM
      ON CAM.NUM_TO_ENTITYID = AF.NUM_AGENCY_ID
     AND CAM.VAR_STATUS = 'ACTIVE'

    WHERE CAM.NUM_FROM_ENTITYID = :userId
      AND BT.DAT_BANKTRANSDET_TRANSDAT >= TO_DATE(:p_from, 'DD-MON-YYYY')
      AND BT.DAT_BANKTRANSDET_TRANSDAT <  TO_DATE(:p_to,   'DD-MON-YYYY') + 1

    ORDER BY BT.DAT_BANKTRANSDET_TRANSDAT
  `;

  const [chart1Result, chart2Result, gridResult] = await Promise.all([
    executeQuery(chart1Sql, {
      userId: normalizedUserId,
      p_from: firstDateToken,
      p_to: lastDateToken,
    }),
    executeQuery(chart2Sql, {
      userId: normalizedUserId,
      p_from: firstDateToken,
      p_to: lastDateToken,
    }),
    executeQuery(gridSql, {
      userId: normalizedUserId,
      p_from: firstDateToken,
      p_to: lastDateToken,
    }),
  ]);

  const labels = Array.from({ length: totalDays }, (_, i) => pad2(i + 1));

  const buildDaySeries = (rows, countResolver) => {
    const map = new Map();
    for (const row of rows || []) {
      const day = String(
        resolveDayFromDate(row.TRANS_DATE ?? row.trans_date ?? ""),
      ).padStart(2, "0");
      if (!day) {
        continue;
      }
      map.set(day, Number(countResolver(row) ?? 0));
    }
    return labels.map((day) => map.get(day) ?? 0);
  };

  const dispositionsSeries = buildDaySeries(
    chart1Result.rows,
    (r) =>
      r.TOTAL_TRANSACTIONS ??
      r.total_transactions ??
      r.NUM_TRANSACTIONS ??
      r.num_transactions ??
      0,
  );

  const uniqueAgentsSeries = buildDaySeries(
    chart2Result.rows,
    (r) =>
      r.UNIQUE_FOS_COUNT ??
      r.unique_fos_count ??
      r.TRANSACTION_COUNT ??
      r.transaction_count ??
      0,
  );

  const grid = gridResult.rows || [];

  return {
    monthYear: selectedMonthYear,
    month: scope.month,
    year: scope.year,
    monthLabel: new Date(scope.year, scope.month - 1, 1).toLocaleString(
      "en-US",
      { month: "long", year: "numeric" },
    ),
    chart: {
      labels,
      datasets: [
        {
          key: "uniqueAgents",
          label: "Unique Agents adding Disposition",
          data: uniqueAgentsSeries,
        },
        {
          key: "dispositions",
          label: "Disposition Added in a Day",
          data: dispositionsSeries,
        },
      ],
    },
    grid,
    totalRows: grid.length,
  };
}

module.exports = {
  getDashboardData,
};
