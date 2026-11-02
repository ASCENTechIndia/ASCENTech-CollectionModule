const { executeQuery } = require("../../../db/queryExecutor");

function normalizeUserId(userId) {
  const value = String(userId || "").trim();
  if (!value) {
    return value;
  }
  return value.startsWith("E") ? value : `E${value}`;
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
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

console.log(getMonthName(10)); // Output: "Oct"
console.log(getMonthName(1)); // Output: "Jan"

async function getDashboardData({ userId, month, year }) {
  const normalizedUserId = normalizeUserId(userId);
  const selectedMonth = Number(month) || new Date().getMonth() + 1;
  const selectedYear = Number(year) || new Date().getFullYear();
  const monthText = pad2(selectedMonth);
  const firstDate = `01-${monthText}-${selectedYear}`;
  const monthName = getMonthName(month);
  console.log("user Id", userId, month, year);

  const chartSql = `
        SELECT
        TO_CHAR(TRUNC(UC.LOGIN), 'DD') AS DAY,
        COUNT(DISTINCT UC.USERID) AS UNIQUE_USER_COUNT
    FROM AOUP_COMPANY_AGENCY_MAP CAM

    INNER JOIN AOUP_AGENCY_FOS_MAP M
        ON M.NUM_AGENCY_ID = CAM.NUM_TO_ENTITYID
      AND M.VAR_STATUS = 'ACTIVE'

    INNER JOIN ASADMINS_CM.AOUP_USER_COUNT UC
        ON UC.USERID = M.NUM_FOS_ID

    WHERE CAM.NUM_FROM_ENTITYID = 10159
      AND CAM.VAR_STATUS = 'ACTIVE'
    AND LOGIN >= TO_DATE(:p_date, 'MON-YYYY')
    AND LOGIN < ADD_MONTHS(TO_DATE(:p_date, 'MON-YYYY'), 1)

    GROUP BY TRUNC(UC.LOGIN)
    ORDER BY TRUNC(UC.LOGIN)
  `;

  const activeAgentsSql = `
      SELECT
        M.NUM_AGENCY_ID,
        COUNT(M.NUM_FOS_ID) AS TOTAL_FOS
    FROM AOUP_AGENCY_FOS_MAP M
    WHERE M.NUM_AGENCY_ID IN
    (
        SELECT NUM_TO_ENTITYID
        FROM AOUP_COMPANY_AGENCY_MAP
        WHERE NUM_FROM_ENTITYID = :userId
        AND VAR_STATUS = 'ACTIVE'
    )
    AND M.VAR_STATUS = 'ACTIVE'
    GROUP BY M.NUM_AGENCY_ID

    UNION ALL

    SELECT
        NULL AS NUM_AGENCY_ID,
        COUNT(M.NUM_FOS_ID) AS TOTAL_FOS
    FROM AOUP_AGENCY_FOS_MAP M
    WHERE M.NUM_AGENCY_ID IN
    (
        SELECT NUM_TO_ENTITYID
        FROM AOUP_COMPANY_AGENCY_MAP
      WHERE NUM_FROM_ENTITYID = :userId
        AND VAR_STATUS = 'ACTIVE'
    )
    AND M.VAR_STATUS = 'ACTIVE'

  `;

  const uniqueLoginsSql = `
    SELECT
    COUNT(DISTINCT UC.USERID) AS UNIQUE_USER_COUNT
FROM AOUP_COMPANY_AGENCY_MAP CAM

INNER JOIN AOUP_AGENCY_FOS_MAP M
    ON M.NUM_AGENCY_ID = CAM.NUM_TO_ENTITYID
   AND M.VAR_STATUS = 'ACTIVE'

INNER JOIN ASADMINS_CM.AOUP_USER_COUNT UC
    ON UC.USERID = M.NUM_FOS_ID

WHERE CAM.NUM_FROM_ENTITYID = :userId
  AND CAM.VAR_STATUS = 'ACTIVE'
  AND UC.LOGIN >= TO_DATE(:p_date, 'MON-YYYY')
  AND UC.LOGIN < ADD_MONTHS(TO_DATE(:p_date, 'MON-YYYY'), 1)
  `;

  const assignedAccountsSql = `
    SELECT
    COUNT(DISTINCT M.NUM_FOS_ID) AS FOS_ACCOUNT_ASSIGNED_COUNT
 

    FROM AOUP_COMPANY_AGENCY_MAP CAM

    INNER JOIN AOUP_AGENCY_FOS_MAP M
        ON M.NUM_AGENCY_ID = CAM.NUM_TO_ENTITYID
      AND M.VAR_STATUS = 'ACTIVE'

    INNER JOIN ATBSS_CM.AOUP_ETECH_BANKDATA E
        ON 'E' || E.VAR_BANKDATA_USERID =  M.NUM_FOS_ID

    WHERE CAM.NUM_FROM_ENTITYID = :userId
      AND CAM.VAR_STATUS = 'ACTIVE'
  `;

  const gridSql = `
          SELECT
          MS.USERID,
          MS.LOGIN_DATE,
          MIN(MS.MIN_LOGIN) AS MIN_LOGIN,
          MAX(MS.MAX_LOGOUT) AS MAX_LOGOUT,
          UD.NUM_USERMST_EMAIL AS MDM_ID,
          UD.VAR_USERMST_USERFULLNAME

      FROM
      (
          SELECT
              UC.USERID,
              TRUNC(UC.LOGIN) AS LOGIN_DATE,
              MIN(UC.LOGIN) AS MIN_LOGIN,
              MAX(UC.LOGOUT) AS MAX_LOGOUT
          FROM ASADMINS_CM.AOUP_USER_COUNT UC

          WHERE UC.LOGIN >= TO_DATE(:p_date, 'MON-YYYY')
            AND UC.LOGIN < ADD_MONTHS(TO_DATE(:p_date, 'MON-YYYY'), 1)

          GROUP BY UC.USERID, TRUNC(UC.LOGIN)
      ) MS

      INNER JOIN AOUP_AGENCY_FOS_MAP M
          ON M.NUM_FOS_ID = MS.USERID
        AND M.VAR_STATUS = 'ACTIVE'

      INNER JOIN AOUP_COMPANY_AGENCY_MAP CAM
          ON CAM.NUM_TO_ENTITYID = M.NUM_AGENCY_ID
        AND CAM.VAR_STATUS = 'ACTIVE'
        AND CAM.NUM_FROM_ENTITYID = :userId

      INNER JOIN ETECH_CM.AOUP_USERMST_DEF UD
          ON UD.VAR_USERMST_USERID = MS.USERID

      GROUP BY
          MS.USERID,
          MS.LOGIN_DATE,
          UD.NUM_USERMST_EMAIL,
          UD.VAR_USERMST_USERFULLNAME

      ORDER BY
          MS.LOGIN_DATE,
          MS.USERID
  `;

  const [
    chartResult,
    activeAgentsResult,
    uniqueLoginsResult,
    assignedAccountsResult,
    gridResult,
  ] = await Promise.all([
    executeQuery(chartSql, {
      p_date: `${monthName}-${year}`,
    }),
    executeQuery(activeAgentsSql, { userId: Number(userId) }),
    executeQuery(uniqueLoginsSql, {
      userId: Number(userId),
      p_date: `${monthName}-${year}`,
    }),
    executeQuery(assignedAccountsSql, { userId: Number(userId) }),
    executeQuery(gridSql, {
      userId: Number(userId),
      p_date: `${monthName}-${year}`,
    }),
  ]);

  const chartMap = new Map();
  for (const row of chartResult.rows || []) {
    const day = Number(row.DAY ?? row.day);
    chartMap.set(
      day,
      Number(row.UNIQUE_USER_COUNT ?? row.unique_user_count ?? 0),
    );
  }

  const labels = [];
  const data = [];
  const totalDays = daysInMonth(selectedMonth, selectedYear);
  for (let day = 1; day <= totalDays; day += 1) {
    labels.push(String(day));
    data.push(chartMap.get(day) || 0);
  }

  return {
    month: selectedMonth,
    year: selectedYear,
    monthLabel: new Date(selectedYear, selectedMonth - 1, 1).toLocaleString(
      "en-US",
      {
        month: "long",
        year: "numeric",
      },
    ),
    summary: {
      onboardedActiveAssociates: Number(
        activeAgentsResult.rows?.[0]?.TOTAL_FOS ?? 0,
      ),
      accountsAssigned: Number(
        assignedAccountsResult.rows?.[0]?.FOS_ACCOUNT_ASSIGNED_COUNT ?? 0,
      ),
      uniqueLogins: Number(
        uniqueLoginsResult.rows?.[0]?.UNIQUE_USER_COUNT ?? 0,
      ),
    },
    chart: {
      labels,
      data,
    },
    grid: gridResult.rows || [],
  };
}

module.exports = {
  getDashboardData,
};
