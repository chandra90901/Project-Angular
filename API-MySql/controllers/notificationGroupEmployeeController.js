// controllers/notificationGroupEmployeeController.js
const NotificationGroupEmployeeModel = require("../models/notificationGroupEmployeeModel");

exports.createNotificationGroupEmployee = async (req, res) => {
  try {
    const id = await NotificationGroupEmployeeModel.createNotificationGroupEmployee(req.body);
    res.status(201).json({ message: "NotificationGroupEmployee record created", id });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllNotificationGroupEmployees = async (req, res) => {
  try {
    console.log("GET Request Received");
    const records = await NotificationGroupEmployeeModel.getAllNotificationGroupEmployees();
    res.json(records);
  } catch (err) {
    console.error("Database error (GET):", err);
    res.status(500).json({ error: err.message });
  }
};




exports.getNotificationGroupEmployeeById = async (req, res) => {
  try {
    const record = await NotificationGroupEmployeeModel.getNotificationGroupEmployeeById(req.params.id);
    if (!record) return res.status(404).json({ message: "NotificationGroupEmployee record not found" });
    res.json(record);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateNotificationGroupEmployee = async (req, res) => {
  try {
    console.log("Received ID:", req.params.id);
    console.log("Received Data:", req.body);

    await NotificationGroupEmployeeModel.updateNotificationGroupEmployee(req.params.id, req.body);
    res.json({ message: "NotificationGroupEmployee record updated" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteNotificationGroupEmployee = async (req, res) => {
  try {
    await NotificationGroupEmployeeModel.deleteNotificationGroupEmployee(req.params.id);
    res.json({ message: "NotificationGroupEmployee record deleted" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};
