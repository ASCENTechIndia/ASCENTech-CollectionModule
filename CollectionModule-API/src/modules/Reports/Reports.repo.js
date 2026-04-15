const oracledb = require('oracledb');
const { executeQuery } = require('../../db/queryExecutor');
const { executeProcedure } = require('../../db/procedureExecutor');


async function accAllocationReport(filters) {
  let sql = `
    WITH cte_amt AS (
      SELECT contractnumber,
             MAX(collectableAmount) AS collectableAmount
      FROM (
        SELECT contractnumber,
               ACCOUNTTYPE,
               DIFF_IN_INT_CREDIT,
               CAP_UNPD_INT,
               EMI,
               VAR_BANKDATA_DPDBUCKET,
               CASE
                 WHEN ACCOUNTTYPE = 'DLTL' THEN EMI
                 WHEN ACCOUNTTYPE = 'CCOD' AND diff_in_int_credit > cap_unpd_int THEN diff_in_int_credit
                 WHEN ACCOUNTTYPE = 'CCOD' AND diff_in_int_credit <= cap_unpd_int THEN cap_unpd_int
                 ELSE 0
               END AS collectableAmount
        FROM atbss.aoup_etech_contractUploadAllocationDetails a
        INNER JOIN atbss.aoup_etech_bankdata bd  
          ON a.contractnumber = bd.var_bankdata_contractnum
      )
      GROUP BY contractnumber
    )

    SELECT 
      MIN(a.CONTRACTALLOCATIONDATE) AS CONTRACTALLOCATIONDATE,
      a.CONTRACTNUMBER,
      a.assignedfos,
      f.collectableAmount,
      b.VAR_BANKDATA_PRODUCTNM,
      b.VAR_BANKDATA_PRODUCTCODE,
      b.VAR_BANKDATA_BRANCH,
      b.VAR_BANKDATA_CUSTOMERNM,
      b.VAR_BANKDATA_REGISTRNO,
      u.var_usermst_userfullname AS ASSIGNEDFOS_USERFULLNAME,
      MAX(bt.DAT_BANKTRANSMAST_TRANSDATETIM) AS transdat,
      b.VAR_BANKDATA_DPDBUCKET
    FROM atbss.aoup_etech_contractUploadAllocationDetails a

    LEFT JOIN atbss.aoup_etech_BANKDATA b
      ON a.contractnumber = b.var_bankdata_contractnum
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

  // ---------------- USER ID FILTER ----------------
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

  // ---------------- SMA TYPE ----------------
  if (filters.smaType) {
    sql += ` AND UPPER(b.VAR_BANKDATA_DPDBUCKET) = UPPER(:smaType)`;
    binds.smaType = filters.smaType;
  }

  // ---------------- BRANCH FILTER ----------------
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

  // ---------------- GROUP BY ----------------
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

module.exports = {
  accAllocationReport
};
