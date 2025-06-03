// controllers/LeaveController.js
const LeaveModel = require("../models/leaveModel");

exports.createLeave = async (req, res) => {
  try {
    const id = await LeaveModel.createLeave(req.body);
    res.status(201).json({ message: "Leave record created", id });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllLeaves = async (req, res) => {
  try {
    const records = await LeaveModel.getAllLeaves();
    res.json(records);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getLeaveById = async (req, res) => {
  try {
    const record = await LeaveModel.getLeaveById(req.params.id);
    if (!record) return res.status(404).json({ message: "Leave record not found" });
    res.json(record);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateLeave = async (req, res) => {
  try {
    await LeaveModel.updateLeave(req.params.id, req.body);
    res.json({ message: "Leave record updated" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteLeave = async (req, res) => {
  try {
    await LeaveModel.deleteLeave(req.params.id);
    res.json({ message: "Leave record deleted" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getMyLeaves = async (req, res) => {
  try {
    const record = await LeaveModel.getMyLeaves(req.params.employeeId);
    if (!record) return res.status(404).json({ message: "Leave record not found" });
    res.json(record);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getReqLeaves = async (req, res) => {
  try {
    const record = await LeaveModel.getReqLeaves(req.params.mgrId);
    if (!record) return res.status(404).json({ message: "Leave record not found" });
    res.json(record);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};