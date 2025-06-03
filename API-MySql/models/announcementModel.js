
const { db } = require("../db");

exports.createAnnouncement = async (announcementData) => {
  const {
    EmployeeId,
    Title,
    Description,
    FromDate,
    ToDate,
    Status,

  } = announcementData;

  const [result] = await db.query(
    `INSERT INTO Announcement (EmployeeId, Title, Description, FromDate, ToDate, Status) VALUES (?, ?, ?, ?, ?, ?)`,
    [
        EmployeeId,
        Title,
        Description,
        FromDate,
        ToDate,
        Status,
    ]
  );

  return result.insertId;
};

exports.getAllAnnouncements = async () => {  
  const [results] = await db.query(`
    SELECT A.*, E.EmployeeName FROM Announcement A
    INNER JOIN Employee E ON E.Id = A.EmployeeId`);
  
       
  return results;
};

exports.getAnnouncementById = async (id) => {
  const [result] = await db.query("SELECT * FROM Announcement WHERE Id = ?", [id]);
  return result.length > 0 ? result[0] : null;
};

exports.updateAnnouncement = async (id, announcementData) => {
  const {
    EmployeeId,
    Title,
    Description,
    FromDate,
    ToDate,
    Status,

  } = announcementData;

  await db.query(
    `UPDATE Announcement SET EmployeeId = ?, Title = ?, Description=?, FromDate = ?, ToDate=?, Status=?
     WHERE Id = ?`,
    [
      EmployeeId,
      Title,
      Description,
      FromDate,
      ToDate,
      Status,
      id
    ]
  );
};

exports.deleteAnnouncement = async (id) => {
  await db.query("DELETE FROM Announcement WHERE Id = ?", [id]);
};


