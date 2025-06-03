// createTimesheetTable.js
const db = require("../../db");

const createTableQuery = `
CREATE TABLE IF NOT EXISTS Timesheet (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    EmployeeId INT NOT NULL,
    Date DATE NOT NULL,
    Hours VARCHAR(50) NULL,
    WrokDetails VARCHAR(50) NULL,
    Status VARCHAR(50) NOT NULL,
    CreatedBy VARCHAR(255) NULL,
    ApprovedBy VARCHAR(255) NULL,
    ApprovedDate DATE NULL,
    ApprovedReason TEXT NULL,
    RejectBy VARCHAR(255) NULL,
    RejectDate DATE NULL,
    RejectReason TEXT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`;

(async () => {
    try {
        await db.query(createTableQuery);
        console.log("✅ Timesheet table created or already exists.");
    } catch (err) {
        console.error("❌ Error creating Timesheet table:", err);
    } finally {
        //db.end(); // Close the database connection after execution
    }
})();