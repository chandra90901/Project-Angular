// models/roleModel.js
const { db } = require("../db");

exports.createRole = async (roleData) => {
  const {
    roleName,
    roleStatus,
    adminName,
    isAdmin,

  } = roleData.Role;

  const permissions = roleData.Permission;

  const [roleResult] = await db.query(
    `INSERT INTO Role (roleName, roleStatus, adminName, isAdmin) VALUES (?, ?, ?, ?)`,
    [
      roleName,
      roleStatus,
      adminName,
      isAdmin,

    ]
  );

  const roleId = roleResult.insertId;

  for (const perm of permissions) {
    const { ModuleId, View, Modify } = perm;
    await db.query(
      `INSERT INTO Permission (RoleId, ModuleId, View, Modify) VALUES (?, ?, ?, ?)`,
      [roleId, ModuleId, View, Modify]
    );
  }

  return roleResult.insertId;
};

exports.getAllRoles = async () => {  // Change from getAllRole to getAllRoles
  const [results] = await db.query("SELECT * FROM Role");
  return results;
};

exports.getRoleById = async (id) => {
  const [result] = await db.query("SELECT * FROM Role WHERE Id = ?", [id]);
  return result.length > 0 ? result[0] : null;
};

exports.updateRole = async (id, roleData) => {
  const {
    roleName,
    roleStatus,
    adminName,
    isAdmin,

  } = roleData.Role;

  const permissions = roleData.Permission;

  await db.query(
    `UPDATE Role SET roleName = ?, roleStatus = ?, adminName=?, isAdmin = ?
     WHERE Id = ?`,
    [
      roleName,
      roleStatus,
      adminName,
      isAdmin,
      id,

    ]
  );

  await db.query(
    `DELETE FROM Permission WHERE RoleId = ?`,
    [id]
  );

  // Add new permissions
  if (Array.isArray(permissions)) {
    for (const perm of permissions) {
      const { ModuleId, View, Modify } = perm;
      await db.query(
        `INSERT INTO Permission (RoleId, ModuleId, View, Modify) VALUES (?, ?, ?, ?)`,
        [id, ModuleId, View, Modify]
      );
    }
  }
};

exports.deleteRole = async (id) => {
  await db.query("DELETE FROM Role WHERE Id = ?", [id]);
};


// exports.checkRole = async (roleData) => {
//   const {
//     roleName,
//         roleStatus,
//         adminName,
//         isAdmin,
//   } = roleData;
//   const [result] = await db.query("SELECT * FROM Role WHERE Rolename = ? AND Password= ? AND Status='Active'", [Username, Password]);
//   return result.length > 0 ? result[0] : null;
// };
