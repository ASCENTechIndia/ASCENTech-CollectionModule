const { executeQuery } = require('../../db/queryExecutor');

function buildTree(rows) {
  const byId = new Map();
  const roots = [];

  for (const row of rows) {
    byId.set(Number(row.MENUID), {
      menuId: Number(row.MENUID),
      title: row.MENUTITLE,
      parentId: Number(row.PARENTID),
      pagePath: row.PAGEPATH,
      orderBy: Number(row.ORDERBY),
      children: [],
    });
  }

  for (const node of byId.values()) {
    if (node.parentId === 0) {
      roots.push(node);
    } else {
      const parent = byId.get(node.parentId);
      if (parent) {
        parent.children.push(node);
      }
    }
  }

  roots.sort((a, b) => a.orderBy - b.orderBy);
  for (const node of byId.values()) {
    node.children.sort((a, b) => a.orderBy - b.orderBy);
  }

  return roots;
}

async function getMenuForUser(compId, userId) {
  const compQuery = `select compid from branchlist where brid = :brid`;
  const compRes = await executeQuery(compQuery, { brid: compId });

  if (!compRes.rows || compRes.rows.length === 0) {
    return [];
  }

  const menuQuery = `
    select num_menumst_menuid menuid,
           var_menumst_menuname menutitle,
           num_menumst_parentid parentid,
           var_menumst_pagepath pagepath,
           num_menumst_orderby orderby
      from aoup_menumst_def
     where num_menumst_parentid = 0
    UNION
    select m.num_menumst_menuid menuid,
           m.var_menumst_menuname menutitle,
           m.num_menumst_parentid parentid,
           m.var_menumst_pagepath pagepath,
           m.num_menumst_orderby orderby
      from aoup_menumst_def m
      inner join aoup_MenuCompMst_def c on c.num_menucompmst_menuid = m.num_menumst_menuid
      inner join aoup_MenuUsersMst_def u on u.num_menuusersmst_menuid = m.num_menumst_menuid
     where u.var_menuusersmst_userid = :userId
     order by orderby
  `;

  const menuRes = await executeQuery(menuQuery, { userId });
  return buildTree(menuRes.rows || []);
}

module.exports = {
  getMenuForUser,
};
