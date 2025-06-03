const { db } = require("../db");

exports.createLeave = async (LeaveData) => {
    const {
        EmployeeId,
        EmployeeName,
        LeaveTypeId,
        FromDate,
        FromDateHalfDay,
        ToDate,
        ToDateHalfDay,
        Reason,
        Status,
        ApprovedBy,
        ApprovedReason, 
        ApprovedDate,
        RejectedBy,
        RejectedReason,
        RejectedDate

    } = LeaveData;

    const [result] = await db.query(
        `INSERT INTO \`Leave\` (EmployeeId, LeaveTypeId, FromDate, FromDateHalfDay, ToDate, ToDateHalfDay, Reason,Status, ApprovedBy,
        ApprovedReason, 
        ApprovedDate,
        RejectedBy,
        RejectedReason,
        RejectedDate) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            EmployeeId,
            LeaveTypeId,
            FromDate,
            FromDateHalfDay,
            ToDate,
            ToDateHalfDay,
            Reason,
            Status,
            ApprovedBy,
            ApprovedReason, 
            ApprovedDate,
            RejectedBy,
            RejectedReason,
            RejectedDate
           
        ]
      );
    
      return result.insertId;
    };
    exports.getAllLeaves = async () => {
        const [results] = await db.query(` SELECT L.*, 
               M.Data LeaveType,
               E.EmployeeName EmployeeNames
        FROM Leave L
        INNER JOIN Masters M ON M.Id = L.LeaveTypeId
        LEFT JOIN Employee E ON L.EmployeeId = E.Id;`);
        return results;
      };
      exports.getLeaveById = async (id) => {
        const [result] = await db.query("SELECT * FROM Leave WHERE Id = ?", [id]);
        return result.length > 0 ? result[0] : null;
      };
      exports.updateLeave = async (id, leaveData) => {
        const {
            EmployeeId,
            EmployeeName,
            LeaveTypeId,
            FromDate,
            FromDateHalfDay,
            ToDate,
            ToDateHalfDay,
            Reason,
            Status,
            ApprovedBy,
            ApprovedReason, 
            ApprovedDate,
            RejectedBy,
            RejectedReason,
            RejectedDate
        } = leaveData;

        const [result] = await db.query(
            `UPDATE  \`Leave\`SET EmployeeId = ?, LeaveTypeId = ?, FromDate = ?, FromDateHalfDay = ?, ToDate = ?, ToDateHalfDay = ?, Reason = ?, Status = ?, ApprovedBy = ?,
            ApprovedReason = ?, 
            ApprovedDate = ?,
            RejectedBy = ?,
            RejectedReason = ?,
            RejectedDate = ? WHERE Id = ?`,
            [
                EmployeeId,
                EmployeeName,
                LeaveTypeId,
                FromDate,
                FromDateHalfDay,
                ToDate,
                ToDateHalfDay,
                Reason,
                Status,
                ApprovedBy,
                ApprovedReason, 
                ApprovedDate,
                RejectedBy,
                RejectedReason,
                RejectedDate,
                id
            ]
        );
    
      };
      
      
      exports.deleteLeave = async (id) => {
        await db.query("DELETE FROM `Leave` WHERE Id = ?", [id]);
        
      };

      exports.getMyLeaves = async (employeeId) => {
        const [result] = await db.query(`SELECT L.*, 
                                              M.Data AS \`LeaveType\`,E.EmployeeName
                                        FROM \`Leave\` L
                                        INNER JOIN \`Masters\` M
                                            ON M.Id = L.LeaveTypeId
                                        INNER JOIN \`Employee\` E
                                            ON E.Id = L.EmployeeId
                                        WHERE L.EmployeeId = ?;`, [employeeId]);
        return result.length>0  ? result: null;
      };

      exports.getReqLeaves = async (mgrId) => {
        const [result] = await db.query(`
           SELECT 
                L.*, 
                M.Data AS LeaveType,
                E.EmployeeName
            FROM \`Leave\` L
            INNER JOIN \`Masters\` M 
                ON M.Id = L.LeaveTypeId
            INNER JOIN Employee E On L.EmployeeId=E.Id
            WHERE E.ReportingTo=?;
        `, [mgrId]);
        return result.length > 0 ? result : null;
    };
