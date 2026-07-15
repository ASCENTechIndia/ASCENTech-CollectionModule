const xlsx = require('xlsx');
const { uploadContractCBIRepo } = require('./ExcelUpload.repo');

// ──────────────────────────────────────────────────────────────────────────────
// 📖 SERVICE: parseExcelBuffer
//
// Step 1: Excel file चा buffer read करतो → JSON array बनवतो
// (हे फक्त parsing आहे, DB ला अजून काहीच पाठवत नाही)
// ──────────────────────────────────────────────────────────────────────────────
function parseExcelBuffer(buffer, sheetIndex = 0) {
  const workbook = xlsx.read(buffer, { type: 'buffer' });
  const sheetNames = workbook.SheetNames;

  if (sheetNames.length === 0) throw new Error('Excel file has no sheets');

  const targetSheet = sheetNames[sheetIndex] || sheetNames[0];
  const worksheet = workbook.Sheets[targetSheet];

  const data = xlsx.utils.sheet_to_json(worksheet, {
    defval: '',
    raw: false,
  });

  return { sheetNames, activeSheet: targetSheet, totalRows: data.length, data };
}

// ──────────────────────────────────────────────────────────────────────────────
// 🔄 SERVICE: uploadContractCBIService
//
// हे function Excel upload चे पूर्ण काम करते:
//
// STEP 1: Excel buffer parse करतो → rows मिळतात
// STEP 2: प्रत्येक row साठी Oracle procedure call करतो (repo layer)
// STEP 3: प्रत्येक row चा result collect करतो (success/error)
// STEP 4: Summary return करतो
//
// WHY ROW BY ROW?
//  Oracle procedure एका वेळी एकच record insert करते.
//  Excel मध्ये 500 rows असतील तर 500 वेळा procedure call होईल.
//  प्रत्येक call चा result track करतो — कोणते rows failed ते कळते.
// ──────────────────────────────────────────────────────────────────────────────
async function uploadContractCBIService(buffer, userName, sheetIndex = 0) {
  // ── Parse Excel ─────────────────────────────────────────────
  const parsed = parseExcelBuffer(buffer, sheetIndex);
  const rows = parsed.data;

  if (rows.length === 0) {
    throw new Error('Excel file is empty or has no data rows');
  }

  // ── Process each row ─────────────────────────────────────────
  const results = [];
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowNumber = i + 2; // Row 1 = header, Row 2 = first data row

    try {
      // Map Excel columns → Oracle procedure parameter names
      // Excel column name → in_xyz (procedure parameter)
      const payload = {
        in_UserName:             userName || '',
        in_customername:         row['Customer Name'] || '',
        in_custloanaccno:        row['Customer Loan Account Number'] || '',
        in_cifid:                row['CIF ID'] || '',
        in_resipermaddr:         row['Resident Permanent Address'] || '',
        in_offibusaddr:          row['Official Buss. Address'] || '',
        in_city:                 row['City'] || '',
        in_mobileno:             row['Mobile'] || '',
        in_emailid:              row['Email'] || '',
        in_branchname:           row['Branch'] || '',
        in_ifsccode:             row['IFSC Code'] || '',
        in_regionname:           row['Region'] || '',
        in_zonename:             row['Zone'] || '',
        in_loanproductname:      row['Loan Product Name'] || '',

        in_loansanctionedamount:      row['Loan Sanction Amt.'] || null,
        in_loandisbursementamount:    row['Loan Disbursement Amt.'] || null,
        in_loanoutstandingamount:     row['Loan Outstanding Amt.'] || null,
        in_principalinterestoverdue:  row['Principal Interest Overdue'] || null,
        in_chargepenalinterestoverdue:row['Charge Penal Interest Overdue'] || null,
        in_totaloverdueamount:        row['Total Overdue Amt.'] || null,
        in_emiamount:                 row['EMI Amt.'] || null,

        in_arreardate:                row['Arrear Date'] || null,
        in_smastatus:                 row['SMA Status'] || '',
        in_emiduedate:                row['EMI Due Date'] || null,
        in_probablenpadate:           row['Probable NPA Date'] || null,

        in_campaignid:                row['Campaign ID'] || '',
        in_acct_type:                 row['Account Type'] || '',
        in_no_days_overdue:           row['No. of Days Overdue'] || '',

        in_si_date:                   row['SI Date'] || '',
        in_ecs_date:                  row['ECS Date'] || '',
        in_si_amount:                 row['SI Amount'] || '',
        in_ecs_amount:                row['ECS Amount'] || '',

        in_cap_unpd_int:              row['Cap Unpd Amt.'] || '',
        in_diff_in_int_credit:        row['Diff. In Credit'] || '',

        in_pincode:                   row['Pincode'] || '',
        in_paidstatus:                row['Paid Status'] || '',
        in_collected_amt:             row['Collected Amount'] || ''
      };

      // Call Oracle procedure for this row
      const outBinds = await uploadContractCBIRepo(payload);

      if (outBinds.OUT_ERRCODE === 9999) {
        // ✅ Success — Oracle procedure मध्ये 9999 = success code आहे
        successCount++;
        results.push({ row: rowNumber, status: 'success', message: outBinds.OUT_ERRTEXT || 'Inserted' });
      } else {
        // ❌ Oracle returned error code
        failCount++;
        results.push({ row: rowNumber, status: 'error', message: outBinds.OUT_ERRTEXT || 'Unknown error', errCode: outBinds.OUT_ERRCODE });
      }

    } catch (err) {
      // ❌ JS/Network level error
      failCount++;
      results.push({ row: rowNumber, status: 'error', message: err.message });
    }
  }

  // ── Return Summary ───────────────────────────────────────────
  return {
    sheetNames: parsed.sheetNames,
    activeSheet: parsed.activeSheet,
    totalRows: rows.length,
    successCount,
    failCount,
    results,  // row-by-row detail
  };
}

module.exports = { parseExcelBuffer, uploadContractCBIService };
