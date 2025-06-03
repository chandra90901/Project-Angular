const { db } = require("../db");

exports.createCandidate = async (candidateData) => {
  const {
    CandidateName, 
    EmailAddress, 
    PhoneNumber, 
    SkillSet, 
    AadharCardNumber, 
    PanCardNumber
  } = candidateData;

  const [result] = await db.query(
    `INSERT INTO Candidate (CandidateName, EmailAddress, PhoneNumber, SkillSet, AadharCardNumber, PanCardNumber) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
        CandidateName, 
        EmailAddress, 
        PhoneNumber, 
        SkillSet, 
        AadharCardNumber, 
        PanCardNumber, 
    ]
  );

  return result.insertId;
};

exports.getAllCandidates = async () => {
  const [results] = await db.query("SELECT * FROM Candidate");
  return results;
};

exports.getCandidateById = async (id) => {
  const [result] = await db.query("SELECT * FROM Candidate WHERE Id = ?", [id]);
  return result.length > 0 ? result[0] : null;
};

exports.updateCandidate = async (id, candidateData) => {
  const {
    CandidateName, 
    EmailAddress, 
    PhoneNumber, 
    SkillSet, 
    AadharCardNumber, 
    PanCardNumber, 
  } = candidateData;

  await db.query(
    `UPDATE Candidate SET CandidateName = ?, EmailAddress = ?, PhoneNumber = ?, SkillSet = ?, AadharCardNumber = ?, PanCardNumber = ?
     WHERE Id = ?`,
    [
        CandidateName, 
        EmailAddress, 
        PhoneNumber, 
        SkillSet, 
        AadharCardNumber, 
        PanCardNumber, 
        id
    ]
  );
};

exports.deleteCandidate = async (id) => {
  await db.query("DELETE FROM Candidate WHERE Id = ?", [id]);
};

//
// exports.getMyCandidate = async (CandidateName) => {
//     const [result] = await db.query("SELECT * FROM Candidate WHERE candidateName = ?", [CandidateName]);
//     return result.length > 0 ? result : null;
//   };
