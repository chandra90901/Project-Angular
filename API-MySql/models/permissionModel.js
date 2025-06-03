const { db } = require("../db");

exports.createPermission = async (permissionData) => {
  const {
    ModuleId,
    View,
    Modify,

  } = permissionData;

  const [result] = await db.query(
    `INSERT INTO Permission (ModuleId, View, Modify) VALUES (?, ?, ?)`,
    [
      ModuleId,
      View,
      Modify,

    ]
  );

  return result.insertId;
};

exports.getAllPermissions = async () => {
  const [results] = await db.query(`SELECT P.*,M.Nmae FROM Permission P 
     INNER JOIN Module M On M.Id=P.ModelId `);
  return results;
};

exports.getPermissionById = async (id) => {
  const [result] = await db.query("SELECT * FROM Permission WHERE Id = ?", [id]);
  return result.length > 0 ? result[0] : null;
};

exports.updatePermission = async (id, permissionData) => {
  const {
    ModuleId,
    View,
    Modify,

  } = permissionData;

  await db.query(
    `UPDATE Permission SET ModuleId = ?, View = ?, Modify=?
     WHERE Id = ?`,
    [
      ModuleId,
      View,
      Modify,

    ]
  );
};

exports.deletePermission = async (id) => {
  await db.query("DELETE FROM Permission WHERE Id = ?", [id]);
};

