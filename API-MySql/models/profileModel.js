// models/userModel.js
const { db } = require("../db");

exports.getProfileById = async (id) => {
  const [result] = await db.query(`select E.*,U.UserName,MG.Data Gender,RT.EmployeeName ReportingToMgr from Employee E
Inner join User U ON E.Id = U.EmployeeId
Left Join Masters MG ON MG.Id = E.GenderId
Left Join Employee RT ON RT.Id = E.ReportingTo
Where U.Id= ?`, [id]);
  return result.length > 0 ? result[0] : null;
};
 

exports.getAllMaster = async () => {
  const [results] = await db.query(`
    SELECT DISTINCT M.*, 
           MT.Data AS \`Type\`, 
           MG.Data AS \`Group\`
    FROM Masters M
    LEFT JOIN MasterGroup MG 
        ON M.GroupId = MG.Id
    LEFT JOIN MasterType MT 
        ON M.TypeId = MT.Id;
  `);
  return results;
};
