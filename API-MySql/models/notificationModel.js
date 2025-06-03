// models/notificationModel.js
const { db } = require("../db");

exports.createNotification = async (notificationData) => {
  const { 
    GroupId,
    EmployeeId, 
    Message,
    Status, 
    FromDate, 
    ToDate,
    
  } = notificationData;

  const [result] = await db.query(
    `INSERT INTO Notification (GroupId, EmployeeId, Message, Status, FromDate, ToDate) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [GroupId, EmployeeId, Message, Status, FromDate, ToDate]
  );
  
  return result.insertId;
};

exports.getAllNotification = async () => {
  const [results] = await db.query(`
    SELECT N.*, E.EmployeeName, G.GroupName 
    FROM Notification N
    INNER JOIN Employee E ON E.Id = N.EmployeeId
    INNER JOIN NotificationGroup G ON G.Id = N.GroupId;
  `);
  return results;
};


exports.getNotificationById = async (id) => {
  const [result] = await db.query("SELECT * FROM Notification WHERE Id = ?", [id]);
  return result.length > 0 ? result[0] : null;
};

exports.updateNotification = async (id, notificationData) => {
  const { GroupId, EmployeeId, Message, Status, FromDate, ToDate } = notificationData;

  await db.query(
    `UPDATE Notification 
     SET GroupId = ?, EmployeeId = ?, Message = ?, Status = ?, FromDate = ?, ToDate = ?
     WHERE Id = ?`,
    [GroupId, EmployeeId, Message, Status, FromDate, ToDate, id]
  );
};


exports.updateNotification = async (id, notificationData) => {  // ✅ Add `async`
  const { GroupId, EmployeeId, Message, Status, FromDate, ToDate } = notificationData;

  await db.query(
    `UPDATE Notification 
     SET GroupId = ?, EmployeeId = ?, Message = ?, Status = ?, FromDate = ?, ToDate = ?
     WHERE Id = ?`,
    [GroupId, EmployeeId, Message, Status, FromDate, ToDate, id]
  );
};



exports.deleteNotification = async (id) => {
  await db.query("DELETE FROM Notification WHERE Id = ?", [id]);
};

//
exports.getMyNotification = async (employeeId) => {
  const [result] = await db.query("SELECT * FROM Notification WHERE EmployeeId = ?", [employeeId]);
  return result.length > 0 ? result : null;
};
