// models/userModel.js
const { db } = require("../db");

exports.createUser = async (userData) => {
  const {
    Username,
    Password,
    EmployeeId,
    RoleId,
    Status,
  } = userData;

  const [result] = await db.query(
    `INSERT INTO User (Username, Password, EmployeeId, RoleId, Status) 
     VALUES (?, ?, ?, ?, ?)`,
    [
      Username,
      Password,
      parseInt(EmployeeId),
      parseInt(RoleId),
      Status,
    ]
  );

  return result.insertId;
};

exports.getAllUser = async () => {
  const [results] = await db.query(`SELECT U.*,E.EmployeeName,R.roleName RoleName FROM User U
Inner Join Employee E ON U.EmployeeId = E.Id
Inner Join Role R ON U.RoleId = R.Id`);
  return results;
};

exports.getUserById = async (id) => {
  const [result] = await db.query("SELECT * FROM User WHERE Id = ?", [id]);
  return result.length > 0 ? result[0] : null;
};

exports.updateUser = async (Id, userData) => {
  const {
    Username,
    Password,
    EmployeeId,
    RoleId,
    Status,
  } = userData;

  await db.query(
    `UPDATE User SET Username = ?, Password = ?, EmployeeId = ?, RoleId = ?, Status = ?
     WHERE Id = ?`,
    [
      Username,
      Password,
      parseInt(EmployeeId),
      parseInt(RoleId),
      Status,
      Id,
    ]
  );
};

exports.deleteUser = async (id) => {
  await db.query("DELETE FROM User WHERE Id = ?", [id]);
};


exports.checkUser = async (userData) => {
  const {
    Username,
    Password,
  } = userData;
  const [result] = await db.query("SELECT * FROM User WHERE Username = ? AND Password= ? AND Status='Active'", [Username, Password]);
  return result.length > 0 ? result[0] : null;
};
