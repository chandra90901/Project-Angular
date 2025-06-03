const MasterModel = require("../models/masterModel");

exports.createMaster = async (req, res) => {
  try {
    const id = await MasterModel.createMaster(req.body);
    res.status(201).json({ message: "Master record created", id });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllMaster = async (req, res) => {
  try {
    const records = await MasterModel.getAllMaster();
    res.json(records);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getMasterById = async (req, res) => {
  try {
    const record = await MasterModel.getMasterById(req.params.id);
    if (!record) return res.status(404).json({ message: "Master record not found" });
    res.json(record);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateMaster = async (req, res) => {
  try {
    await MasterModel.updateMaster(req.params.id, req.body);
    res.json({ message: "Master record updated" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMaster = async (req, res) => {
  try {
    await MasterModel.deleteMaster(req.params.id);
    res.json({ message: "Master record deleted" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getMyMaster = async (req, res) => {
  try {
    const record = await MasterModel.getMyMaster(req.params.employeeId);
    if (!record) return res.status(404).json({ message: "Master record not found" });
    res.json(record);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};