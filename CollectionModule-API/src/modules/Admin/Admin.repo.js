const oracledb = require('oracledb');
const { executeQuery } = require('../../db/queryExecutor');
const { executeProcedure } = require('../../db/procedureExecutor');

function normalizeNullable(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  return value;
}

async function getUserLocationTracking(userId, cDate) {
  let sql = `
    SELECT userid, location, TO_CHAR(cdate, 'DD/MM/YYYY') AS cdate FROM etech.aoup_userLocation WHERE 
    userid = :userId AND TRUNC(cdate) = TO_DATE(:cDate, 'YYYY-MM-DD')
    order by ROWID DESC FETCH FIRST 1 ROW ONLY
  `;

  const binds = { userId: userId, cDate: cDate };
  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

async function getUserLastLogin(userId) {
  let sql = `
  SELECT * FROM (
        SELECT 
            userid, 
            ip_address, 
            TO_CHAR(log_date, 'DD-MON-YYYY HH:MI:SS AM') AS log_date 
        FROM atbss.Aoup_user_ip_log 
        WHERE userid = :userId
        ORDER BY log_date DESC
    ) 
    WHERE ROWNUM <= 10
  `;

  const binds = { userId: userId};
  const result = await executeQuery(sql, binds);
  return result.rows || [];
}

async function bucketSetter() {
  const statement = `
    BEGIN
      atbss.Aoup_update_typesubcase(
        :p_output,
        :p_updated_count
      );
    END;
  `;

  const binds = {
    p_output: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    p_updated_count: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
  };

  const result = await executeProcedure({ statement, binds, useTx: false });

  const output = result.outBinds.p_output;
  const count = result.outBinds.p_updated_count;

  let message = "";
  if (output === 9999) {
    message = `Mobile Bucket set Successfully. ${count} Rows Updated Successfully`;
  } else {
    message = `Error: Something went wrong`;
  }

  return {
    errorcode: output,
    p_updated_count: count,
    message: message
  };
}

async function fetchUsersWithPincodes() {
  const sql = `
    SELECT
      var_bankdata_userid,
      num_bankdata_pincode
    FROM atbss.aoup_etech_bankdata
    WHERE var_bankdata_userid IS NOT NULL
    GROUP BY var_bankdata_userid, num_bankdata_pincode
    ORDER BY var_bankdata_userid, num_bankdata_pincode
  `;

  const result = await executeQuery(sql);
  const rows = result.rows || [];

  const grouped = {};
  for (const row of rows) {
    const userId = String(row.VAR_BANKDATA_USERID || '').trim();
    const pincode = String(row.NUM_BANKDATA_PINCODE || '').trim();

    if (!userId) continue;
    if (!grouped[userId]) {
      grouped[userId] = [];
    }
    if (pincode && !grouped[userId].includes(pincode)) {
      grouped[userId].push(pincode);
    }
  }

  const users = Object.entries(grouped).map(([userId, pincodes]) => ({
    userId,
    pincodes: pincodes.sort(),
  }));

  return users;
}

async function unassignCases(selections) {
  if (!selections || !Array.isArray(selections) || selections.length === 0) {
    throw new Error('No selections provided');
  }

  let totalRowsUpdated = 0;

  for (const selection of selections) {
    const userId = String(selection.userId || '').trim();
    const pincodes = Array.isArray(selection.pincodes) ? selection.pincodes : [];

    if (!userId || pincodes.length === 0) continue;

    const pincodePlaceholders = pincodes.map((_, i) => `:pincode${i}`).join(',');
    const binds = { userId };

    pincodes.forEach((pincode, i) => {
      binds[`pincode${i}`] = String(pincode).trim();
    });

    const updateSql = `
      UPDATE atbss.aoup_etech_bankdata
      SET VAR_BANKDATA_USERID = NULL
      WHERE VAR_BANKDATA_USERID = :userId
        AND num_bankdata_pincode IN (${pincodePlaceholders})
    `;

    const updateResult = await executeQuery(updateSql, binds);
    totalRowsUpdated += Number(updateResult?.rowsAffected || 0);
  }

  return {
    success: true,
    totalRowsUpdated,
    message: `Cases unassigned successfully! Total rows updated: ${totalRowsUpdated}`,
  };
}

function parseLatLong(text) {
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

async function getLatLongFromAddress(address, apiKey) {
  const cleanAddress = String(address || '').trim();
  if (!cleanAddress || !apiKey) {
    return null;
  }

  const params = new URLSearchParams({
    address: cleanAddress,
    key: apiKey,
  });

  const url = `https://maps.googleapis.com/maps/api/geocode/json?${params.toString()}`;
  const response = await fetch(url, { method: 'GET' });
  if (!response.ok) {
    return null;
  }

  const payload = await response.json();
  if (payload?.status !== 'OK') {
    return null;
  }

  const location = payload?.results?.[0]?.geometry?.location;
  const lat = Number(location?.lat);
  const lng = Number(location?.lng);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null;
  }

  return { lat, lng };
}

async function getDistanceInKm(origin, destination, apiKey) {
  if (!origin || !destination || !apiKey) {
    return 0;
  }

  const params = new URLSearchParams({
    origins: `${origin.lat},${origin.lng}`,
    destinations: `${destination.lat},${destination.lng}`,
    key: apiKey,
  });

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?${params.toString()}`;
  const response = await fetch(url, { method: 'GET' });
  if (!response.ok) {
    return 0;
  }

  const payload = await response.json();
  if (payload?.status !== 'OK') {
    return 0;
  }

  const element = payload?.rows?.[0]?.elements?.[0];
  if (!element || element.status !== 'OK') {
    return 0;
  }

  const meters = Number(element?.distance?.value);
  if (!Number.isFinite(meters)) {
    return 0;
  }

  return Math.round((meters / 1000) * 100) / 100;
}

async function matrixDistanceInsertion() {
  const statement = `
    BEGIN
      atbss.Aoup_INSERT_MATRIX_DISTINCT_BANKTRANS(
        :out_count,
        :out_errorcode
      );
    END;
  `;

  const binds = {
    out_count: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    out_errorcode: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
  };

  const procResult = await executeProcedure({ statement, binds, useTx: false });
  const insertedCount = Number(procResult?.outBinds?.out_count || 0);
  const errorCode = Number(procResult?.outBinds?.out_errorcode || 0);

  let totalRowsAffected = 0;
  let rowsProcessed = 0;

  if (errorCode === 9999) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_DISTANCE_API_KEY || '';

    const selectSql = `
      SELECT
        dist_num_banktransdet_transid,
        dist_var_banktransdet_transidnew,
        dist_var_bankdata_cobrowsraddress,
        dist_var_banktransdet_golocation
      FROM atbss.aoup_etech_matrix_distince_banktransdetails
      WHERE DIST_VAR_BANKDATA_MATRIX_DISTANCE IS NULL
    `;

    const pending = await executeQuery(selectSql);
    const rows = pending.rows || [];

    for (const row of rows) {
      const address = row.DIST_VAR_BANKDATA_COBROWSRADDRESS;
      const destinationText = row.DIST_VAR_BANKTRANSDET_GOLOCATION;
      if (!address || !destinationText) {
        continue;
      }

      const origin = await getLatLongFromAddress(address, apiKey);
      const destination = parseLatLong(destinationText);
      const distanceKm = await getDistanceInKm(origin, destination, apiKey);

      const updateSql = `
        UPDATE atbss.aoup_etech_matrix_distince_banktransdetails
        SET DIST_VAR_BANKDATA_MATRIX_DISTANCE = :distance
        WHERE dist_num_banktransdet_transid = :transId
          AND dist_var_banktransdet_transidnew = :transIdNew
      `;

      const updateBinds = {
        distance: String(distanceKm),
        transId: row.DIST_NUM_BANKTRANSDET_TRANSID,
        transIdNew: row.DIST_VAR_BANKTRANSDET_TRANSIDNEW,
      };

      const updated = await executeQuery(updateSql, updateBinds);
      totalRowsAffected += Number(updated?.rowsAffected || 0);
      rowsProcessed += 1;
    }
  }

  return {
    insertedCount,
    errorCode,
    rowsProcessed,
    totalRowsAffected,
    message:
      errorCode === 9999
        ? `Total updated transactions distance: ${totalRowsAffected}`
        : 'Matrix insertion procedure did not return success code 9999',
  };
}

module.exports = {
  getUserLocationTracking,
  getUserLastLogin,
  bucketSetter,
  fetchUsersWithPincodes,
  unassignCases,
  matrixDistanceInsertion,
} 
