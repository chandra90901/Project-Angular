const CandidatehistoryModel = require("../models/candidatehistoryModel");


exports.createCandidatehistory = async (req, res) => {
  try {
    const id = await CandidatehistoryModel.createCandidatehistory(req.body);
    res.status(201).json({ message: "Candidate_history record created", id });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCandidateshistory = async (req, res) => {
  try {
    const records = await CandidatehistoryModel.getAllCandidateshistory();
    res.json(records);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getCandidateshistoryByCandidate = async (req, res) => {
  try {
    const records = await CandidatehistoryModel.getCandidateshistoryByCandidate(req.params.id);
    res.json(records);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getCandidatehistoryById = async (req, res) => {
  try {
    const record = await CandidatehistoryModel.getCandidatehistoryById(req.params.id);
    if (!record) return res.status(404).json({ message: "Candidate_history record not found" });
    res.json(record);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateCandidatehistory = async (req, res) => {
  try {
    await CandidatehistoryModel.updateCandidatehistory(req.params.id, req.body);
    res.json({ message: "Candidatehistory record updated" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCandidatehistory = async (req, res) => {
  try {
    await CandidatehistoryModel.deleteCandidatehistory(req.params.id);
    res.json({ message: "Candidatehistory record deleted" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

