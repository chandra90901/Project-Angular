// controllers/mastertypeController.js
const MastertypeModel = require('../models/mastertypeModel');


exports.createMastertype = async (req, res) => {
  try {
    const id = await MastertypeModel.createMastertype(req.body);
    res.status(201).json({ message: "Mastertype record created", id });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllMastertype = async (req, res) => {
  try {
    const records = await MastertypeModel.getAllMastertype();
    res.json(records);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getMastertypeById = async (req, res) => {
  try {
    const record = await MastertypeModel.getMastertypeById(req.params.id);
    if (!record) return res.status(404).json({ message: "Mastertype record not found" });
    res.json(record);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateMastertype = async (req, res) => {
  try {
    await MastertypeModel.updateMastertype(req.params.id, req.body);
    res.json({ message: "Mastertype record updated" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMastertype = async (req, res) => {
  try {
    await MastertypeModel.deleteMastertype(req.params.id);
    res.json({ message: "Mastertype record deleted" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getMyMastertype = async (req, res) => {
  try {
    const record = await MastertypeModel.getMyMastertype(req.params.employeeId);
    if (!record) return res.status(404).json({ message: "Mastertype record not found" });
    res.json(record);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};