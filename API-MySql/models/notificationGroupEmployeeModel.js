// models/notificationGroupEmployeeModel.js
const { db } = require("../db");

// Create a new Notification Group Employee
exports.createNotificationGroupEmployee = async (notificationGroupEmployeeData) => {
  const {
    EmployeeId,
    GroupId,
    Status,
  } = notificationGroupEmployeeData;

  const [result] = await db.query(
    `INSERT INTO NotificationGroupEmployee (EmployeeId, GroupId, Status) VALUES (?, ?, ?)`,
    [EmployeeId,
      GroupId,
      Status,]
  );
  return result.insertId;
};

exports.getAllNotificationGroupEmployees = async () => {
  const [results] = await db.query(`
     SELECT N.*,E.EmployeeName AS EmployeeName,G.GroupName FROM NotificationGroupEmployee N 
     INNER JOIN Employee E On E.Id=N.EmployeeId
     INNER JOIN NotificationGroup G On G.Id=N.GroupId ; `);
  return results;
};

exports.getNotificationGroupEmployeeById = async (id) => {
  const [result] = await db.query("SELECT * FROM NotificationGroupEmployee WHERE Id = ?", [id]);
  return result.length > 0 ? result[0] : null;
};

exports.updateNotificationGroupEmployee = async (id, notificationGroupEmployeeData) => {
  const {
    EmployeeId,
    GroupId,
    Status,
  } = notificationGroupEmployeeData;
  await db.query(
    `UPDATE NotificationGroupEmployee SET EmployeeId = ?, GroupId = ?, Status = ? WHERE Id = ?`,
    [EmployeeId,
      GroupId,
      Status,
      id,
    ]
  );
};
exports.deleteNotificationGroupEmployee = async (id) => {
  await db.query("DELETE FROM NotificationGroupEmployee WHERE Id = ?", [id]);
};
