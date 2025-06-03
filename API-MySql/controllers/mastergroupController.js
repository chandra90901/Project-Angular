
const MastergroupModel = require("../models/mastergroupModel");

exports.createMastergroup = async (req, res) => {
  try {
    const id = await MastergroupModel.createMastergroup(req.body);
    res.status(201).json({ message: "Mastergroup record created", id });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllMastergroup = async (req, res) => {
  try {
    const records = await MastergroupModel.getAllMastergroup();
    res.json(records);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getMastergroupById = async (req, res) => {
  try {
    const record = await MastergroupModel.getMastergroupById(req.params.id);
    if (!record) return res.status(404).json({ message: "Mastergroup record not found" });
    res.json(record);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateMastergroup = async (req, res) => {
  try {
    await MastergroupModel.updateMastergroup(req.params.id, req.body);
    res.json({ message: "Mastergroup record updated" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMastergroup = async (req, res) => {
  try {
    await MastergroupModel.deleteMastergroup(req.params.id);
    res.json({ message: "Mastergroup record deleted" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getMyMastergroup = async (req, res) => {
  try {
    const record = await MastergroupModel.getMyMastergroup(req.params.employeeId);
    if (!record) return res.status(404).json({ message: "Mastergroup record not found" });
    res.json(record);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};