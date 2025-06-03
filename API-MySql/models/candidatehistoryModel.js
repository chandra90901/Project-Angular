const { db } = require("../db");

exports.createCandidatehistory = async (candidatehistoryData) => {
  try {
    const { CandidateId, Remark, Date, CreatedBy } = candidatehistoryData;

    const [result] = await db.query(
      `INSERT INTO CandidateHistory (CandidateId, Remark, \`Date\`, CreatedBy) VALUES (?, ?, ?, ?)`,
      [CandidateId, Remark, Date, CreatedBy]
    );

    return result.insertId;
  } catch (error) {
    console.error("Database Insert Error:", error);
    throw error;
  }
};

exports.getAllCandidateshistory = async () => {
  const [results] = await db.query("SELECT * FROM CandidateHistory");
  return results;
};

exports.getCandidateshistoryByCandidate = async (id) => {
  const [results] = await db.query("SELECT * FROM CandidateHistory WHERE CandidateId=?",[id]);
  return results;
};

exports.getCandidatehistoryById = async (id) => {
  const [result] = await db.query("SELECT * FROM CandidateHistory WHERE Id = ?", [id]);
  return result.length > 0 ? result[0] : null;
};

exports.updateCandidatehistory = async (id, candidatehistoryData) => {
  const {
    CandidateId, 
    Remark, 
    Date, 
    CreatedBy, 
  } = candidatehistoryData;

  await db.query(
    `UPDATE CandidateHistory 
     SET CandidateId = ?, Remark = ?, \`Date\` = ?, CreatedBy = ?
     WHERE Id = ?`,
    [CandidateId, Remark, Date, CreatedBy, id]
  );  
};

exports.deleteCandidatehistory = async (id) => {
    await db.query("DELETE FROM CandidateHistory WHERE Id = ?", [id]);
};

//
// exports.getMyCandidate = async (CandidateName) => {
//     const [result] = await db.query("SELECT * FROM Candidate WHERE candidateName = ?", [CandidateName]);
//     return result.length > 0 ? result : null;
//   };
