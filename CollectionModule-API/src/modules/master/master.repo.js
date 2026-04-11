const { executeQuery } = require('../../db/queryExecutor');

async function getDashboardSummary(brCategory, brid) {
  const userQuery = `
    SELECT count(1) total
      FROM (
        select * from aoup_usermst_def ORDER BY date_usermst_insdate DESC
      ) userid
      inner join branchlist on brid = num_usermst_brid
     WHERE rownum <= 5 and var_usermst_status = 'U'
  `;

  let assetQuery = `
    select count(1) total
      from (
        select * from aoup_asset_mas ORDER BY date_assetmast_insdate DESC
      ) a
      left outer join aoup_assetstatus_mst f on f.num_assetstatus_id = a.num_assetmas_status
     WHERE rownum <= 5 and var_assetstatus_status = 'In Stock'
  `;

  if (['3', '4', '5'].includes(String(brCategory))) {
    assetQuery += ` and num_assetmast_brid = :brid`;
  }

  const userRes = await executeQuery(userQuery);
  const assetRes = await executeQuery(assetQuery, ['3', '4', '5'].includes(String(brCategory)) ? { brid } : {});

  return {
    unassignedUsers: Number(userRes.rows?.[0]?.TOTAL || 0),
    inStockAssets: Number(assetRes.rows?.[0]?.TOTAL || 0),
  };
}

module.exports = {
  getDashboardSummary,
};
