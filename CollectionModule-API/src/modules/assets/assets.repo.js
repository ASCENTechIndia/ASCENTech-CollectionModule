const oracledb = require('oracledb');
const { executeProcedure } = require('../../db/procedureExecutor');

function nullable(value) {
  if (value === undefined || value === null || value === '') {
    return null;
  }
  return value;
}

function buildAccessString(properties) {
  return properties
    .map((x) => `${x.Assetid}#${x.Propid}#${x.Category}#${x.Propertyvalue}`)
    .join('$');
}

async function registerAsset(payload) {
  const statement = `
    BEGIN
      aoup_asset_ins(
        :in_UserId,
        :in_brid,
        :in_catgoryid,
        :in_ownerid,
        :in_compid,
        :in_vendorid,
        :in_compname,
        :in_model,
        :in_status,
        :in_Mode,
        :in_AccessString,
        :in_assetuser,
        :in_sourceid,
        :in_remark,
        :out_ErrorCode,
        :Out_ErrorMsg
      );
    END;
  `;

  const binds = {
    in_UserId: payload.in_UserId,
    in_brid: payload.in_brid,
    in_catgoryid: payload.in_catgoryid,
    in_ownerid: payload.in_ownerid,
    in_compid: payload.in_compid,
    in_vendorid: payload.in_vendorid,
    in_compname: payload.in_compname,
    in_model: payload.in_model,
    in_status: payload.in_status,
    in_Mode: payload.in_Mode,
    in_AccessString: buildAccessString(payload.properties),
    in_assetuser: nullable(payload.in_assetuser),
    in_sourceid: payload.in_sourceid ?? null,
    in_remark: nullable(payload.in_remark),
    out_ErrorCode: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    Out_ErrorMsg: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 1000 },
  };

  const result = await executeProcedure({ statement, binds, useTx: false });
  return result.outBinds;
}

async function assignAsset(payload) {
  const statement = `
    BEGIN
      aoup_assetassign_ins(
        :in_UserId,
        :in_brid,
        :in_AssUser,
        :in_AssetString,
        :out_ErrorCode,
        :out_ErrorMsg
      );
    END;
  `;

  const binds = {
    in_UserId: payload.in_UserId,
    in_brid: payload.in_brid,
    in_AssUser: payload.in_AssUser,
    in_AssetString: payload.in_AssetString,
    out_ErrorCode: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    out_ErrorMsg: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 1000 },
  };

  const result = await executeProcedure({ statement, binds, useTx: false });
  return result.outBinds;
}

async function transferAsset(payload) {
  const statement = `
    BEGIN
      aoup_assettransfer_ins(
        :in_UserId,
        :in_brid,
        :in_transbrid,
        :in_assetid,
        :in_remark,
        :out_ErrorCode,
        :Out_ErrorMsg
      );
    END;
  `;

  const binds = {
    in_UserId: payload.in_UserId,
    in_brid: payload.in_brid,
    in_transbrid: payload.in_transbrid,
    in_assetid: payload.in_assetid,
    in_remark: nullable(payload.in_remark),
    out_ErrorCode: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    Out_ErrorMsg: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 1000 },
  };

  const result = await executeProcedure({ statement, binds, useTx: false });
  return result.outBinds;
}

async function updateAssetStatus(payload) {
  const statement = `
    BEGIN
      aoup_assetstatus_Upd_insnew(
        :in_UserId,
        :in_brid,
        :in_AssetString,
        :out_ErrorCode,
        :out_ErrorMsg
      );
    END;
  `;

  const binds = {
    in_UserId: payload.in_UserId,
    in_brid: payload.in_brid,
    in_AssetString: payload.in_AssetString,
    out_ErrorCode: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    out_ErrorMsg: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 1000 },
  };

  const result = await executeProcedure({ statement, binds, useTx: false });
  return result.outBinds;
}

module.exports = {
  registerAsset,
  assignAsset,
  transferAsset,
  updateAssetStatus,
};
