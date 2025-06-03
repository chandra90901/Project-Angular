const { db } = require("../db");

exports.createTimesheet = async (timesheetData) => {
    const {
        EmployeeId,
        Date,
        Hours,
        WorkDetails,
        Reason,
        Status,
        CreatedBy,
        ApprovedBy,
        ApprovedDate,
        ApprovedReason,
        RejectBy,
        RejectDate,
        RejectReason,
    } = timesheetData;

    const [result] = await db.query(
        `INSERT INTO Timesheet (EmployeeId, Date, Hours, WorkDetails,Reason, Status, CreatedBy, ApprovedBy, ApprovedDate, ApprovedReason, RejectBy, RejectDate, RejectReason) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            EmployeeId,
            Date,
            Hours,
            WorkDetails,
            Reason,
            Status,
            CreatedBy,
            ApprovedBy,
            ApprovedDate,
            ApprovedReason,
            RejectBy,
            RejectDate,
            RejectReason,
        ]
    );

    return result.insertId;
};

exports.getAllTimesheets = async () => {
    const [results] = await db.query(`   SELECT T.*, E.EmployeeName AS EmployeeName
        FROM Timesheet T
        LEFT JOIN Employee E ON E.Id=T.EmployeeId ;
    `);
    return results;
};

exports.getTimesheetById = async (id) => {
    const [result] = await db.query("SELECT * FROM Timesheet WHERE Id = ?", [id]);
    return result.length > 0 ? result[0] : null;
};

exports.updateTimesheet = async (id, timesheetData) => {
    const {
        EmployeeId,
        Date,
        Hours,
        WorkDetails,
        Reason,
        Status,
        CreatedBy,
        ApprovedBy,
        ApprovedDate,
        ApprovedReason,
        RejectBy,
        RejectDate,
        RejectReason,
    } = timesheetData;

    await db.query(
        `UPDATE Timesheet 
         SET EmployeeId = ?, Date = ?, Hours = ?, WorkDetails = ?, Reason =?, Status = ?,
             CreatedBy = ?, ApprovedBy = ?, ApprovedDate = ?, ApprovedReason = ?, 
             RejectBy = ?, RejectDate = ?, RejectReason = ?
         WHERE Id = ?`,
        [
            EmployeeId,
            Date,
            Hours,
            WorkDetails,
            Reason,
            Status,
            CreatedBy,
            ApprovedBy,
            ApprovedDate,
            ApprovedReason,
            RejectBy,
            RejectDate,
            RejectReason,
            id,
        ]
    );
};

exports.deleteTimesheet = async (id) => {
    await db.query("DELETE FROM Timesheet WHERE Id = ?", [id]);

};

exports.getMyTimesheets = async (employeeId) => {
    const [result] = await db.query(`SELECT T.*, E.Id AS EmployeeName
                FROM Timesheet T
                LEFT JOIN Employee E ON E.Id = T.EmployeeId
                Where T.EmployeeId=?;`, [employeeId]);
    return result.length > 0 ? result : null;
};

// Fetch timesheets for a manager (showing employee name and ID)
exports.getReqTimesheets = async (mgrId) => {
    const [result] = await db.query(`
         SELECT 
                T.*, 
                E.EmployeeName
            FROM Timesheet T
              INNER JOIN Employee E On E.Id=T.EmployeeId
            WHERE E.ReportingTo=?;
        `, [mgrId]);
    return result.length > 0 ? result : null;
};