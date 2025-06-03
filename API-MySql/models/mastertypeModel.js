// models/mastertypeModel.js
const { db } = require("../db");

exports.createMastertype = async (mastertypeData) => {
  const {
   GroupId,
   Data,
  } = mastertypeData;

  const [result] = await db.query(
    `INSERT INTO MasterType ( GroupId,Data) 
     VALUES (?,?)`,
    [
        GroupId,
        Data,
    ]
  );

  return result.insertId;
};

exports.getAllMastertype = async () => {
  const [results] = await db.query("SELECT * FROM MasterType");
  return results;
};

exports.getMastertypeById = async (id) => {
  const [result] = await db.query("SELECT * FROM MasterType WHERE Id = ?", [id]);
  return result.length > 0 ? result[0] : null;
};

exports.updateMastertype = async (id, mastertypeData) => {
  const {
        GroupId,
        Data,
  } = mastertypeData;

  await db.query(
    `UPDATE MasterType SET GroupId = ?, Data = ?
     WHERE Id = ?`,
    [
        GroupId,
        Data,
        id,
    ]
  );
};

exports.deleteMastertype = async (id) => {
  await db.query("DELETE FROM MasterType WHERE Id = ?", [id]);
};

// //
// exports.getMyMastertype = async (employeeId) => {
//     const [result] = await db.query("SELECT * FROM Mastertype WHERE EmployeeId = ?", [employeeId]);
//     return result.length > 0 ? result : null;
//   };
