// models/attendanceModel.js
const { db } = require("../db");

exports.createAttendance = async (attendanceData) => {
  const {
    EmployeeId,
    Date,
    InTime,
    OutTime,
    Status,
    CreatedBy,
    ApprovedDate,
    RejectBy,
    RejectDate,
    ApprovedReason,
    RejectReason,
  } = attendanceData;

  const [result] = await db.query(
    `INSERT INTO Attendance (EmployeeId, Date, InTime, OutTime, Status, CreatedBy, ApprovedDate, RejectBy, RejectDate, ApprovedReason, RejectReason) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      EmployeeId,
      Date,
      InTime,
      OutTime,
      Status,
      CreatedBy,
      ApprovedDate,
      RejectBy,
      RejectDate,
      ApprovedReason,
      RejectReason,
    ]
  );

  return result.insertId;
};

exports.getAllAttendance = async () => {
  const [results] = await db.query(`SELECT A.*,EmployeeName As EmployeeName
     FROM Attendance A
     LEFT JOIN Employee E ON E.Id=A.EmployeeId;`
  );
  return results;
};

exports.getAttendanceById = async (id) => {
  const [result] = await db.query("SELECT * FROM Attendance WHERE Id = ?", [id]);
  return result.length > 0 ? result[0] : null;
};

exports.updateAttendance = async (id, attendanceData) => {
  const {
    EmployeeId,
    Date,
    InTime,
    OutTime,
    Status,
    CreatedBy,
    ApprovedDate,
    RejectBy,
    RejectDate,
    ApprovedReason,
    RejectReason,
  } = attendanceData;

  await db.query(
    `UPDATE Attendance SET EmployeeId = ?, Date = ?, InTime = ?, OutTime = ?, Status = ?, CreatedBy = ?, ApprovedDate = ?, RejectBy = ?, RejectDate = ?, ApprovedReason = ?, RejectReason = ?
     WHERE Id = ?`,
    [
      EmployeeId,
      Date,
      InTime,
      OutTime,
      Status,
      CreatedBy,
      ApprovedDate,
      RejectBy,
      RejectDate,
      ApprovedReason,
      RejectReason,
      id,
    ]
  );
};

exports.deleteAttendance = async (id) => {
  await db.query("DELETE FROM Attendance WHERE Id = ?", [id]);
};

//
exports.getMyAttendance = async (employeeId) => {
  const [result] = await db.query(`SELECT A.*, E.Id AS EmployeeName
    FROM Attendance A
    LEFT JOIN Employee E ON E.Id = A.EmployeeId
    Where A.EmployeeId=?;`, [employeeId]);
  return result.length > 0 ? result : null;
};

exports.getReqAttendance = async (mgrId) => {
  const [result] = await db.query(`SELECT A.*,E.EmployeeName 
    FROM Attendance A 
    LEFT JOIN Employee E ON E.Id=A.EmployeeId 
    WHERE E.ReportingTo= ?`, [mgrId]);
  return result.length > 0 ? result : null;
};
