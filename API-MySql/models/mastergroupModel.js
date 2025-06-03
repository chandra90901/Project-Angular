// models/mastergroupModel.js
const { db } = require("../db");

exports.createMastergroup = async (mastergroupData) => {
  const {
 
   Data,
  } = mastergroupData;

  const [result] = await db.query(
    `INSERT INTO MasterGroup ( Data) 
     VALUES (?)`,
    [
       
        Data,
    ]
  );

  return result.insertId;
};

exports.getAllMastergroup = async () => {
  const [results] = await db.query("SELECT * FROM MasterGroup");
  return results;
};

exports.getMastergroupById = async (id) => {
  const [result] = await db.query("SELECT * FROM MasterGroup WHERE Id = ?", [id]);
  return result.length > 0 ? result[0] : null;
};

exports.updateMastergroup = async (id, mastergroupData) => {
  const {
       
        Data,
  } = mastergroupData;

  await db.query(
    `UPDATE MasterGroup SET  Data = ?
     WHERE Id = ?`,
    [
       
        Data,
        id,
    ]
  );
};

exports.deleteMastergroup = async (id) => {
  await db.query("DELETE FROM MasterGroup WHERE Id = ?", [id]);
};

// //
// exports.getMyMastergroup = async (employeeId) => {
//     const [result] = await db.query("SELECT * FROM Mastergroup WHERE EmployeeId = ?", [employeeId]);
//     return result.length > 0 ? result : null;
//   };
