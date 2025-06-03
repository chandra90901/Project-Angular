const { db } = require("../db");

exports.createOfferLetter = async (offerletterData) => {
    const {
        Date,
        CandidateName,
        JobTitle,
        Department,
        ReportingManager,
        EmploymentType,
        WorkLocation,
        ProbationPeriod,
        Deadline,
    } = offerletterData;

    const [result] = await db.query(
        `INSERT INTO OfferLetter (  
            Date,
            CandidateName,
            JobTitle,
            Department,
            ReportingManager,
            EmploymentType,
            WorkLocation,
            ProbationPeriod,
            Deadline
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            Date,
            CandidateName,
            JobTitle,
            Department,
            ReportingManager,
            EmploymentType,
            WorkLocation,
            ProbationPeriod,
            Deadline
        ]
    );

    return result.insertId;
};

exports.getAllOfferLetters = async () => {
    const [results] = await db.query("SELECT * FROM OfferLetter");
    return results;
};


exports.getOfferLetterById = async (id) => {
    const [result] = await db.query("SELECT * FROM OfferLetter WHERE Id = ?", [id]);
    return result.length > 0 ? result[0] : null;
};


exports.updateOfferLetter = async (id, offerletterData) => {
    const {
        Date,
        CandidateName,
        JobTitle,
        Department,
        ReportingManager,
        EmploymentType,
        WorkLocation,
        ProbationPeriod,
        Deadline,
    } = offerletterData;

    await db.query(
        `UPDATE OfferLetter 
         SET Date=?, 
             CandidateName=?, 
             JobTitle=?, 
             Department=?, 
             ReportingManager=?, 
             EmploymentType=?, 
             WorkLocation=?, 
             ProbationPeriod=?, 
             Deadline=? 
         WHERE Id = ?`,
        [
            Date,
            CandidateName,
            JobTitle,
            Department,
            ReportingManager,
            EmploymentType,
            WorkLocation,
            ProbationPeriod,
            Deadline,
            id
        ]
    );
};


exports.deleteOfferLetter = async (id) => {
    await db.query("DELETE FROM OfferLetter WHERE Id = ?", [id]);
};



// exports.getAllOfferLettersByEmployeeId = async (employeeId) => {
//     const [result] = await db.query("SELECT * FROM OfferLetter WHERE EmployeeId = ?", [employeeId]);
//     return result.length > 0 ? result : null;
// };
