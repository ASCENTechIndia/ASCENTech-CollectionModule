const oracledb = require('oracledb');
const { executeQuery } = require('../../db/queryExecutor');
const { executeProcedure } = require('../../db/procedureExecutor');


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


module.exports = {
  accAllocationReport, getDailyUploadedReport, getpincodeHistoryReport, getnonvisitdoneSummary, overallPerformanceSummary,
  getvisitdoneSummary, getSMASummary
};
