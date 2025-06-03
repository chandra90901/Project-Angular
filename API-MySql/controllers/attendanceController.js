// controllers/attendanceController.js
const AttendanceModel = require("../models/attendanceModel");

exports.createAttendance = async (req, res) => {
  try {
    const id = await AttendanceModel.createAttendance(req.body);
    res.status(201).json({ message: "Attendance record created", id });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAttendance = async (req, res) => {
  try {
    const records = await AttendanceModel.getAllAttendance();
    res.json(records);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAttendanceById = async (req, res) => {
  try {
    const record = await AttendanceModel.getAttendanceById(req.params.id);
    if (!record) return res.status(404).json({ message: "Attendance record not found" });
    res.json(record);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    await AttendanceModel.updateAttendance(req.params.id, req.body);
    res.json({ message: "Attendance record updated" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    await AttendanceModel.deleteAttendance(req.params.id);
    res.json({ message: "Attendance record deleted" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getMyAttendance = async (req, res) => {
  try {
    const record = await AttendanceModel.getMyAttendance(req.params.employeeId);
    if (!record) return res.status(404).json({ message: "Attendance record not found" });
    res.json(record);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getReqAttendance = async (req, res) => {
  try {
    const record = await AttendanceModel.getReqAttendance(req.params.mgrId);
    if (!record) return res.status(404).json({ message: "Attendance record not found" });
    res.json(record);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};