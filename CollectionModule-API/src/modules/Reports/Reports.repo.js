const oracledb = require('oracledb');
const { executeQuery } = require('../../db/queryExecutor');
const { executeProcedure } = require('../../db/procedureExecutor');

function createError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function normalizeFosId(fosId) {
  const value = String(fosId || '').trim();
  if (!value) {
    return '';
  }

  return value.startsWith('E') ? value : `E${value}`;
}

function parseDateInput(dateText) {
  const input = String(dateText || '').trim();
  if (!input) {
    throw createError('date is required');
  }

  const iso = input.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) {
    return `${iso[3]}-${iso[2]}-${iso[1]}`;
  }

  const dmy = input.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (dmy) {
    return `${dmy[1]}-${dmy[2]}-${dmy[3]}`;
  }

  throw createError('date must be in YYYY-MM-DD or DD-MM-YYYY format');
}

function parseCoordinates(text) {
  const value = String(text || '').trim();
  if (!value || !value.includes(',')) {
    return null;
  }

  const [latRaw, lngRaw] = value.split(',');
  const lat = Number.parseFloat(String(latRaw || '').trim());
  const lng = Number.parseFloat(String(lngRaw || '').trim());

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null;
  }

  return { lat, lng };
}

async function fetchDistanceText(origin, destination, apiKey) {
  if (!apiKey) {
    return '0 km';
  }

  const params = new URLSearchParams({
    origins: `${origin.lat},${origin.lng}`,
    destinations: `${destination.lat},${destination.lng}`,
    key: apiKey,
  });

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?${params.toString()}`;
  const response = await fetch(url, { method: 'GET' });

  if (!response.ok) {
    return 'Invalid';
  }

  const payload = await response.json();
  if (payload?.status !== 'OK') {
    return `Error: ${payload?.status || 'UNKNOWN'}`;
  }

  const element = payload?.rows?.[0]?.elements?.[0];
  if (!element || element.status !== 'OK') {
    return 'Invalid';
  }

  return element?.distance?.text || 'Invalid';
}

async function appendDistances(rows, withDistance) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return rows;
  }

  rows[0].Distance = '0 km';

  const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_DISTANCE_API_KEY || '';
  for (let i = 1; i < rows.length; i += 1) {
    const origin = parseCoordinates(rows[i - 1].GO_Location);
    const destination = parseCoordinates(rows[i].GO_Location);

    if (!origin || !destination) {
      rows[i].Distance = 'Invalid';
      continue;
    }

    // Distance Matrix call per segment to mirror legacy per-row distance behavior.
    rows[i].Distance = await fetchDistanceText(origin, destination, apiKey);
  }

  return rows;
}

function maskAccountNumber(value) {
  const text = String(value || '');
  if (text.length <= 4) {
    return text;
  }

  const tail = text.slice(-4);
  return `${'*'.repeat(text.length - 4)}${tail}`;
}

function maskRowsForRestrictedUser(rows, userof) {
  if (String(userof || '') !== '1') {
    return rows;
  }

  return rows.map((row) => ({
    ...row,
    'Account Number': maskAccountNumber(row['Account Number']),
  }));
}

function toCsv(rows) {
  if (!rows.length) {
    return '';
  }

  const headers = Object.keys(rows[0]);
  const escape = (value) => {
    const text = String(value ?? '');
    if (/[",\r\n]/.test(text)) {
      return `"${text.replace(/"/g, '""')}"`;
    }
    return text;
  };

  const lines = [headers.join(',')];
  for (const row of rows) {
    lines.push(headers.map((header) => escape(row[header])).join(','));
  }

  return lines.join('\r\n');
}


async function accAllocationReport(filters) {
  let sql = `
    WITH cte_amt AS ( SELECT contractnumber, MAX(collectableAmount) AS collectableAmount FROM (
     SELECT contractnumber, ACCOUNTTYPE, DIFF_IN_INT_CREDIT, CAP_UNPD_INT, EMI, VAR_BANKDATA_DPDBUCKET,
   CASE WHEN ACCOUNTTYPE = 'DLTL' THEN EMI
     WHEN ACCOUNTTYPE = 'CCOD' AND diff_in_int_credit > cap_unpd_int THEN diff_in_int_credit
     WHEN ACCOUNTTYPE = 'CCOD' AND diff_in_int_credit <= cap_unpd_int THEN cap_unpd_int
     ELSE 0
     END AS collectableAmount
        FROM atbss.aoup_etech_contractUploadAllocationDetails a
        INNER JOIN atbss.aoup_etech_bankdata bd  
         ON a.contractnumber = bd.var_bankdata_contractnum) GROUP BY contractnumber )
    SELECT 
  TO_CHAR(MIN(a.CONTRACTALLOCATIONDATE), 'DD/MM/YYYY') AS CONTRACTALLOCATIONDATE,
      a.CONTRACTNUMBER, a.assignedfos, f.collectableAmount, b.VAR_BANKDATA_PRODUCTNM, b.VAR_BANKDATA_PRODUCTCODE,
      b.VAR_BANKDATA_BRANCH, b.VAR_BANKDATA_CUSTOMERNM, b.VAR_BANKDATA_REGISTRNO, u.var_usermst_userfullname AS ASSIGNEDFOS_USERFULLNAME,
      MAX(bt.DAT_BANKTRANSMAST_TRANSDATETIM) AS transdat, b.VAR_BANKDATA_DPDBUCKET
    FROM atbss.aoup_etech_contractUploadAllocationDetails a
    LEFT JOIN atbss.aoup_etech_BANKDATA b ON a.contractnumber = b.var_bankdata_contractnum
 AND a.assignedfos IS NOT NULL
    LEFT JOIN cte_amt f
      ON a.CONTRACTNUMBER = f.contractnumber
    LEFT JOIN etech.aoup_usermst_def u
      ON u.VAR_USERMST_USERID = 'E' || a.assignedfos
    LEFT JOIN atbss.aoup_etech_bankingtransmast bt
      ON a.CONTRACTNUMBER = bt.VAR_BANKTRANSMAST_CONTRCTNO
    WHERE TRUNC(a.contractallocationdate) BETWEEN 
          TO_DATE(:startDate, 'DD-Mon-YYYY') 
      AND TO_DATE(:endDate, 'DD-Mon-YYYY')
      AND a.assignedfos IS NOT NULL
  `;
  const binds = {
    startDate: filters.startDate,
    endDate: filters.endDate
  };
  let userId = String(filters.userId || '').trim();
  if (userId && !userId.startsWith('E')) {
    userId = 'E' + userId;
  }
  if (userId === 'E') {
    userId = '';
  }
  if (userId) {
    sql += ` AND u.VAR_USERMST_USERID = :userId`;
    binds.userId = userId;
  }
  if (filters.smaType) {
    sql += ` AND UPPER(b.VAR_BANKDATA_DPDBUCKET) = UPPER(:smaType)`;
    binds.smaType = filters.smaType;
  }
  let branchName = String(filters.branchName || '').trim();
  let brid = String(filters.brid || '').trim();
  if (branchName && brid && brid !== '10001') {
    sql += `
      AND (
        UPPER(b.VAR_BANKDATA_PRODUCTCODE) = UPPER(:branchName)
        OR UPPER(b.VAR_BANKDATA_BRANCH) = UPPER(:branchName)
        OR UPPER(b.VAR_BANKDATA_PRODUCTNM) = UPPER(:branchName)
      )
    `;
    binds.branchName = branchName;
  }
  sql += `
    GROUP BY
      a.CONTRACTNUMBER,
      f.collectableAmount,
      b.VAR_BANKDATA_PRODUCTNM,
      b.VAR_BANKDATA_PRODUCTCODE,
      b.VAR_BANKDATA_BRANCH,
      b.VAR_BANKDATA_CUSTOMERNM,
      b.VAR_BANKDATA_REGISTRNO,
      u.var_usermst_userfullname,
      a.assignedfos,
      b.VAR_BANKDATA_DPDBUCKET
  `;
  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

async function getDailyUploadedReport(filters) {
  let sql = `
    WITH cte_amt AS (
      SELECT contractnumber, ACCOUNTTYPE, DIFF_IN_INT_CREDIT, CAP_UNPD_INT, EMI,
     VAR_BANKDATA_DPDBUCKET,
     CASE
   WHEN ACCOUNTTYPE = 'DLTL' THEN EMI
  WHEN ACCOUNTTYPE = 'CCOD' AND diff_in_int_credit > cap_unpd_int THEN diff_in_int_credit
     WHEN ACCOUNTTYPE = 'CCOD' AND diff_in_int_credit <= cap_unpd_int THEN cap_unpd_int
     ELSE 0
    END AS collectableAmount
      FROM atbss.aoup_etech_contractUploadAllocationDetails a
      INNER JOIN atbss.aoup_etech_bankdata bd  
        ON a.contractnumber = bd.var_bankdata_contractnum WHERE 1=1
    ),
    cte_with_rownum AS (
      SELECT 
       TO_CHAR(a.contractuploaddate, 'DD/MM/YYYY') AS contractuploaddate,
        a.CONTRACTNUMBER, a.EMI, a.diff_in_int_credit, a.cap_unpd_int, f.collectableAmount,
        f.ACCOUNTTYPE, f.VAR_BANKDATA_DPDBUCKET,
        ROW_NUMBER() OVER (
          PARTITION BY a.CONTRACTNUMBER 
          ORDER BY a.contractuploaddate DESC
        ) AS rn
      FROM atbss.aoup_etech_contractUploadAllocationDetails a
      LEFT JOIN cte_amt f
        ON a.CONTRACTNUMBER = f.contractnumber
      INNER JOIN atbss.aoup_etech_bankdata bd  
        ON a.contractnumber = bd.var_bankdata_contractnum
      WHERE TRUNC(a.CONTRACTUPLOADDATE) BETWEEN 
            TO_DATE(:startDate, 'DD-Mon-YYYY') 
        AND TO_DATE(:endDate, 'DD-Mon-YYYY')
  `;

  const binds = {
    startDate: filters.startDate,
    endDate: filters.endDate
  };
  let userId = String(filters.userId || '').trim();
  if (userId === 'E') {
    userId = '';
  }
  if (userId) {
    sql += ` AND a.CONTRACTNUMBER = :contractNumber`;
    binds.contractNumber = userId;
  }
  if (filters.smaType) {
    sql += ` AND UPPER(bd.VAR_BANKDATA_DPDBUCKET) = UPPER(:smaType)`;
    binds.smaType = filters.smaType;
  }
  sql += `
    )
    SELECT contractuploaddate, CONTRACTNUMBER, EMI, diff_in_int_credit, cap_unpd_int, collectableAmount,
      ACCOUNTTYPE, VAR_BANKDATA_DPDBUCKET FROM cte_with_rownum WHERE rn = 1 ORDER BY CONTRACTNUMBER
  `;

  const result = await executeQuery(sql, binds);
  return result.rows || [];
}
async function getpincodeHistoryReport(filters) {
  let sql = `
  select var_user_userid, var_user_pincode, TO_CHAR(inactive_date, 'DD-MM-YYYY') as inactive_date from atbss.aoup_user_pincode_map_history_maintain a 
    WHERE TRUNC(a.INACTIVE_DATE) BETWEEN TO_DATE(:startDate, 'DD-Mon-YYYY') 
         AND TO_DATE(:endDate, 'DD-Mon-YYYY')
  `;
  const binds = {
    startDate: filters.startDate,
    endDate: filters.endDate
  };
  let userId = String(filters.userId || '').trim();
  if (userId === 'E') {
    userId = '';
  }
  if (userId) {
    sql += ` AND a.VAR_USER_USERID = :userId`;
    binds.userId = userId;
  }
  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

async function getnonvisitdoneSummary() {
  let sql = `
    SELECT * FROM atbss.view_nonvisit_summary
  `;
  const binds = {};
  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

async function overallPerformanceSummary() {
  let sql = `
   select * from atbss.view_overall_performance
  `;
  const binds = {};
  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

async function getvisitdoneSummary() {
  let sql = `
   select * from atbss.view_visitdone_summary2`;
  const binds = {};
  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

async function getSMASummary() {
  let sql = `
   select * from atbss.vw_combined_sma_summary `;
  const binds = {};
  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

async function fetchUserRouteRows(filters) {
  const fosId = normalizeFosId(filters.fosId);
  const selectedDate = parseDateInput(filters.date);

  if (!fosId) {
    throw createError('fosId is required');
  }

  const sql = `
    SELECT
      ROWNUM AS "Sr No",
      sub."Collection Associate",
      sub."Account Number",
      sub."Transaction Date",
      sub."GO_Location",
      sub."Disposition Type",
      sub."Visit Remark"
    FROM (
      SELECT
        SUBSTR(VAR_BANKTRANSDET_USERID, 2) AS "Collection Associate",
        b.VAR_BANKDATA_CONTRACTNUM AS "Account Number",
        DAT_BANKTRANSDET_OFLNTRANSDATE AS "Transaction Date",
        VAR_BANKTRANSDET_GOLOCATION AS "GO_Location",
        VAR_FEEDBACK_NAME AS "Disposition Type",
        VAR_BANKTRANSDET_VISITREMARK AS "Visit Remark"
      FROM atbss.aoup_etech_banktransdetails a
      INNER JOIN atbss.aoup_etech_bankdata b
        ON a.num_banktransdet_upassid = b.num_bankdata_upassid
      INNER JOIN atbss.aoup_etech_feedback_mst c
        ON c.NUM_FEEDBACK_ID = VAR_BANKTRANSDET_CUSTFEEDBCK
      WHERE VAR_BANKTRANSDET_USERID = :fosId
        AND TRUNC(TO_DATE(DAT_BANKTRANSDET_OFLNTRANSDATE, 'DD-MM-YYYY HH24:MI:SS')) = TO_DATE(:selectedDate, 'DD-MM-YYYY')
      ORDER BY TO_DATE(DAT_BANKTRANSDET_OFLNTRANSDATE, 'DD-MM-YYYY HH24:MI:SS')
    ) sub
  `;

  const result = await executeQuery(sql, { fosId, selectedDate });
  return result.rows || [];
}

async function getUserRouteReport(filters) {
  const withDistance = String(filters.withDistance || '').toLowerCase() === 'true' || filters.withDistance === true || filters.withDistance === '1';
  const rows = await fetchUserRouteRows(filters);

  if (!rows.length) {
    return {
      rows: [],
      coordinates: [],
      coordinatesText: '',
    };
  }

  if (withDistance) {
    await appendDistances(rows, withDistance);
  } else {
    rows[0].Distance = '0km';
    for (let i = 1; i < rows.length; i += 1) {
      rows[i].Distance = '0km';
    }
  }
  const securedRows = maskRowsForRestrictedUser(rows, filters.userof);

  const coordinates = securedRows
    .map((row) => String(row.GO_Location || '').trim())
    .filter(Boolean);

  return {
    rows: securedRows,
    coordinates,
    coordinatesText: coordinates.join('|'),
  };
}

async function getUserRouteExport(filters) {
  const report = await getUserRouteReport(filters);
  const exportRows = report.rows.map((row) => {
    const cloned = { ...row };
    delete cloned.GO_Location;
    return cloned;
  });

  return {
    fileName: `User_route_${String(filters.fosId || '').trim()}_${String(filters.date || '').trim()}.csv`,
    csv: toCsv(exportRows),
    rowCount: exportRows.length,
  };
}

async function getUnallocatedCases(filters) {
  const { brid, branchName } = filters;
  // ---------------- CASE 1 ----------------
  if (brid === "10001") {
    const sql = `
      SELECT
        a.var_bankdata_contractnum,
        a.num_bankdata_pincode,
        CASE
            WHEN pm.var_pincode_no IS NULL THEN 'Pincode not exists in master'
            WHEN upm.VAR_USER_PINCODE IS NULL THEN 'Pincode not mapped to any FOS agent'
            WHEN (SELECT COUNT(*) FROM atbss.aoup_user_pincode_map 
                  WHERE VAR_USER_PINCODE = a.num_bankdata_pincode) > 1
                THEN 'Pincode mapped to multiple users'
            ELSE ''
        END AS reason
      FROM atbss.aoup_etech_bankdata a
      INNER JOIN atbss.aoup_etech_contractuploadallocationdetails b
        ON a.var_bankdata_contractnum = b.contractnumber
      LEFT JOIN atbss.aoup_pincode_master pm
        ON a.num_bankdata_pincode = pm.var_pincode_no
      LEFT JOIN atbss.aoup_user_pincode_map upm
        ON a.num_bankdata_pincode = upm.VAR_USER_PINCODE
      WHERE TRUNC(b.CONTRACTUPLOADDATE) BETWEEN TRUNC(SYSDATE, 'MM') AND LAST_DAY(SYSDATE)
      AND a.var_bankdata_userid IS NULL
    `;
    const result = await executeQuery(sql);
    return result.rows || [];
  }
  // ---------------- CASE 2 ----------------
  else {
    const plsql = `
      BEGIN
        atbss.aoup_current_month_unallocated_cases(
          :in_zone_Regn_Branch,
          :p_result
        );
      END;
    `;
    const binds = {
      in_zone_Regn_Branch: { val: branchName, type: oracledb.STRING },
      p_result: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
    };
    const result = await executeProcedure({
      statement: plsql,
      binds
    });
    const rows = result.outBinds.p_result || [];
    return rows;
  }
}

module.exports = {
  accAllocationReport, getDailyUploadedReport, getpincodeHistoryReport, getnonvisitdoneSummary, overallPerformanceSummary,
  getvisitdoneSummary, getSMASummary ,
  getUserRouteReport,
  getUserRouteExport, getUnallocatedCases
};
