// createAttendanceTable.js
const db = require("../../db");

const createTableQuery = `
CREATE TABLE IF NOT EXISTS Attendance (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    EmployeeId INT NOT NULL,
    Date DATE NOT NULL,
    InTime VARCHAR(50) NULL,
    OutTime VARCHAR(50) NULL,
    Status VARCHAR(50) NOT NULL,
    CreatedBy VARCHAR(255) NULL,
    ApprovedDate DATE NULL,
    RejectBy VARCHAR(255) NULL,
    RejectDate DATE NULL,
    ApprovedReason TEXT NULL,
    RejectReason TEXT NULL,
    Reason TEXT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`;

(async () => {
  try {
    await db.query(createTableQuery);
    console.log("✅ Attendance table created or already exists.");
  } catch (err) {
    console.error("❌ Error creating Attendance table:", err);
  } finally {
    //db.end(); // Close the database connection after execution
  }
})();