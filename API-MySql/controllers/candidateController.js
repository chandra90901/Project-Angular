const CandidateModel = require("../models/candidateModel");


exports.createCandidate = async (req, res) => {
  try {
    const id = await CandidateModel.createCandidate(req.body);
    res.status(201).json({ message: "Candidate record created", id });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCandidates = async (req, res) => {
  try {
    const records = await CandidateModel.getAllCandidates();
    res.json(records);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getCandidateById = async (req, res) => {
  try {
    const record = await CandidateModel.getCandidateById(req.params.id);
    if (!record) return res.status(404).json({ message: "Candidate record not found" });
    res.json(record);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateCandidate = async (req, res) => {
  try {
    await CandidateModel.updateCandidate(req.params.id, req.body);
    res.json({ message: "Candidate record updated" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCandidate = async (req, res) => {
  try {
    await CandidateModel.deleteCandidate(req.params.id);
    res.json({ message: "Candidate record deleted" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

