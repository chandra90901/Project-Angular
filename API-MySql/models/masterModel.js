// models/masterModel.js
const { db } = require("../db");

exports.createMaster = async (masterData) => {
  const {
   GroupId,
   TypeId,
   Data,
  } = masterData;

  const [result] = await db.query(
    `INSERT INTO Masters ( GroupId,TypeId,Data) 
     VALUES (?, ?, ?)`,
    [
        GroupId,
        TypeId,
        Data,
    ]
  );

  return result.insertId;
};

exports.getAllMaster = async () => {
  const [results] = await db.query(`
    SELECT DISTINCT M.*, 
           MT.Data AS \`Type\`, 
           MG.Data AS \`Group\`
    FROM Masters M
    INNER JOIN MasterGroup MG 
        ON M.GroupId = MG.Id
    INNER JOIN MasterType MT 
        ON M.TypeId = MT.Id;
  `);
  return results;
};

exports.getMasterById = async (id) => {
  const [result] = await db.query("SELECT * FROM Masters WHERE Id = ?", [id]);
  return result.length > 0 ? result[0] : null;
};

exports.updateMaster = async (id, masterData) => {
  const {
        GroupId,
        TypeId,
        Data,
  } = masterData;

  await db.query(
    `UPDATE Masters SET GroupId = ?,TypeId = ? , Data = ?
     WHERE Id = ?`,
    [
        GroupId,
        TypeId,
        Data,
        id,
    ]
  );
};

exports.deleteMaster = async (id) => {
  await db.query("DELETE FROM Masters WHERE Id = ?", [id]);
};

// //
// exports.getMyMaster = async (employeeId) => {
//     const [result] = await db.query("SELECT * FROM Master WHERE EmployeeId = ?", [employeeId]);
//     return result.length > 0 ? result : null;
//   };
