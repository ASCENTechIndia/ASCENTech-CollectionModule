const queryCatalog = {
  getBrCategoryByUserId: {
    sql: `
      select NUM_USERMST_USERPROOFTYPE
        from etech.aoup_usermst_def
       where VAR_USERMST_USERID = :userId
    `,
    requiredBinds: ['userId'],
  },
  insertUserIpLog: {
    sql: `
      INSERT INTO atbss.Aoup_user_ip_log (userid, ip_address, log_date)
      VALUES (:userId, :ipAddress, SYSDATE)
    `,
    requiredBinds: ['userId', 'ipAddress'],
    write: true,
  },
  getCompIdFromBranch: {
    sql: `
      select compid
        from branchlist
       where brid = :brid
    `,
    requiredBinds: ['brid'],
  },
  getMenuRowsByUserId: {
    sql: `
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
    `,
    requiredBinds: ['userId'],
  },
};

module.exports = {
  queryCatalog,
};
