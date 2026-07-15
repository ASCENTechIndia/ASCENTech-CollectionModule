const oracledb = require('oracledb');
const { executeProcedure } = require('../../db/procedureExecutor');

// ──────────────────────────────────────────────────────────────────────────────
// 🔧 HELPER: normalizeNullable
//
// Oracle procedure मध्ये empty string "" पाठवला तर error येतो.
// म्हणून empty/null values ला null पाठवतो — Oracle ला null handle करता येतो.
// ──────────────────────────────────────────────────────────────────────────────
function normalizeNullable(value) {
  if (value === null || value === undefined || value === '') return null;
  return value;
}

// ──────────────────────────────────────────────────────────────────────────────
// 🔧 HELPER: safeNumber
//
// parseFloat('') → NaN → Oracle ला NaN पाठवला तर ORA-01722 error येतो.
// म्हणून NaN असेल तर null return करतो.
// ──────────────────────────────────────────────────────────────────────────────
function safeNumber(value) {
  if (value === null || value === undefined || value === '') return null;
  const n = parseFloat(value);
  return isNaN(n) ? null : n;
}

// ──────────────────────────────────────────────────────────────────────────────
// 🔧 HELPER: safeDate
//
// new Date('invalid') → Invalid Date → Oracle ला पाठवला तर ORA-01858 error येतो.
// म्हणून invalid date असेल तर null return करतो.
// ──────────────────────────────────────────────────────────────────────────────
function safeDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

// ──────────────────────────────────────────────────────────────────────────────
// 📦 REPO: uploadContractCBIRepo
//
// Oracle Procedure: atbss.aoup_ContractCBI_upload_inv
//
// हे function Excel मधला एक row (record) Oracle procedure ला पाठवते.
// Excel upload झाल्यावर Service layer प्रत्येक row साठी हे call करते.
//
// PARAMETERS:
//  payload → एक row object (Excel च्या एका line चा data)
//
// RETURNS:
//  { OUT_ERRCODE, OUT_ERRTEXT }
//   OUT_ERRCODE = 9999 → Success
//   OUT_ERRCODE = other → Error (OUT_ERRTEXT मध्ये error message असतो)
// ──────────────────────────────────────────────────────────────────────────────
async function uploadContractCBIRepo(payload) {

  // ────────────────────────────────────────────────────────────
  // STEP 1: SQL Statement
  //
  // BEGIN...END; block म्हणजे Oracle PL/SQL anonymous block.
  // प्रत्येक parameter `:in_xyz` या format मध्ये लिहितो — हे "bind variables".
  // Bind variables म्हणजे SQL Injection पासून संरक्षण + performance चांगली.
  // ────────────────────────────────────────────────────────────
  const statement = `
    BEGIN
      atbss_cm.aoup_ContractCBI_upload_inv(
        :in_UserName,
        :in_customername,
        :in_custloanaccno,
        :in_cifid,
        :in_resipermaddr,
        :in_offibusaddr,
        :in_city,
        :in_mobileno,
        :in_emailid,
        :in_branchname,
        :in_ifsccode,
        :in_regionname,
        :in_zonename,
        :in_loanproductname,
        :in_loansanctionedamount,
        :in_loandisbursementamount,
        :in_loanoutstandingamount,
        :in_principalinterestoverdue,
        :in_chargepenalinterestoverdue,
        :in_totaloverdueamount,
        :in_emiamount,
        :in_arreardate,
        :in_smastatus,
        :in_emiduedate,
        :in_probablenpadate,
        :in_campaignid,
        :in_acct_type,
        :in_no_days_overdue,
        :in_si_date,
        :in_ecs_date,
        :in_si_amount,
        :in_ecs_amount,
        :in_cap_unpd_int,
        :in_diff_in_int_credit,
        :in_pincode,
        :in_paidstatus,
        :in_collected_amt,
        :OUT_ERRCODE,
        :OUT_ERRTEXT
      );
    END;
  `;

  // ────────────────────────────────────────────────────────────
  // STEP 2: Bind Variables
  //
  // प्रत्येक :parameter_name साठी actual value द्यायची असते.
  //
  // IN parameters  → फक्त value द्यायची (oracledb आपोआप BIND_IN समजतो)
  // OUT parameters → { dir: BIND_OUT, type: ..., maxSize: ... } हा format वापरतो
  //
  // Date fields → JavaScript Date object द्यायचा (string नाही!)
  // NUMBER fields → parseInt/parseFloat करायचा
  // VARCHAR fields → string द्यायची, null allowed
  // ────────────────────────────────────────────────────────────
  const binds = {

    // ── VARCHAR2 IN parameters ──────────────────────────────────
    in_UserName:                  normalizeNullable(payload.in_UserName),
    in_customername:              normalizeNullable(payload.in_customername),
    in_custloanaccno:             normalizeNullable(payload.in_custloanaccno),
    in_cifid:                     normalizeNullable(payload.in_cifid),
    in_resipermaddr:              normalizeNullable(payload.in_resipermaddr),
    in_offibusaddr:               normalizeNullable(payload.in_offibusaddr),
    in_city:                      normalizeNullable(payload.in_city),
    in_mobileno:                  normalizeNullable(payload.in_mobileno),
    in_emailid:                   normalizeNullable(payload.in_emailid),
    in_branchname:                normalizeNullable(payload.in_branchname),
    in_ifsccode:                  normalizeNullable(payload.in_ifsccode),
    in_regionname:                normalizeNullable(payload.in_regionname),
    in_zonename:                  normalizeNullable(payload.in_zonename),
    in_loanproductname:           normalizeNullable(payload.in_loanproductname),
    in_loandisbursementamount:    normalizeNullable(payload.in_loandisbursementamount),
    in_smastatus:                 normalizeNullable(payload.in_smastatus),
    in_campaignid:                normalizeNullable(payload.in_campaignid),
    in_acct_type:                 normalizeNullable(payload.in_acct_type),
    in_no_days_overdue:           normalizeNullable(payload.in_no_days_overdue),
    in_si_date:                   normalizeNullable(payload.in_si_date),
    in_ecs_date:                  normalizeNullable(payload.in_ecs_date),
    in_si_amount:                 normalizeNullable(payload.in_si_amount),
    in_ecs_amount:                normalizeNullable(payload.in_ecs_amount),
    in_cap_unpd_int:              normalizeNullable(payload.in_cap_unpd_int),
    in_diff_in_int_credit:        normalizeNullable(payload.in_diff_in_int_credit),
    in_pincode:                   normalizeNullable(payload.in_pincode),
    in_paidstatus:                normalizeNullable(payload.in_paidstatus),
    in_collected_amt:             normalizeNullable(payload.in_collected_amt),

    // ── NUMBER IN parameters ────────────────────────────────────
    // safeNumber वापरतो — parseFloat('') = NaN → null केला तर Oracle error टळतो
    in_loansanctionedamount:       safeNumber(payload.in_loansanctionedamount),
    in_loanoutstandingamount:      safeNumber(payload.in_loanoutstandingamount),
    in_principalinterestoverdue:   safeNumber(payload.in_principalinterestoverdue),
    in_chargepenalinterestoverdue: safeNumber(payload.in_chargepenalinterestoverdue),
    in_totaloverdueamount:         safeNumber(payload.in_totaloverdueamount),
    in_emiamount:                  safeNumber(payload.in_emiamount),

    // ── DATE IN parameters ──────────────────────────────────────
    // safeDate वापरतो — new Date('invalid') = Invalid Date → null केला तर Oracle error टळतो
    in_arreardate:      safeDate(payload.in_arreardate),
    in_emiduedate:      safeDate(payload.in_emiduedate),
    in_probablenpadate: safeDate(payload.in_probablenpadate),

    // ── OUT parameters ──────────────────────────────────────────
    // dir: BIND_OUT  → Oracle procedure चा output घेतो
    // type: NUMBER   → OUT_ERRCODE हा number आहे
    // type: STRING   → OUT_ERRTEXT हा varchar2 आहे
    // maxSize        → Oracle STRING साठी maximum length द्यायची (required!)
    OUT_ERRCODE: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    OUT_ERRTEXT: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 4000 },
  };

  // ────────────────────────────────────────────────────────────
  // STEP 3: Execute the procedure
  //
  // executeProcedure → db/procedureExecutor.js मधला helper
  // useTx: true → transaction use करतो (INSERT/UPDATE साठी)
  // dbName: 'db1' → .env मधला db1 pool वापरतो (atbss schema)
  // ────────────────────────────────────────────────────────────
  const result = await executeProcedure({ statement, binds, useTx: true, dbName: 'db1' });

  // result.outBinds → Oracle ने return केलेले OUT parameters
  // { OUT_ERRCODE: 9999, OUT_ERRTEXT: 'SUCCESS' }
  return result.outBinds;
}

module.exports = { uploadContractCBIRepo };
