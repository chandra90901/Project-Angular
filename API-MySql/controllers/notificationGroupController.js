// controllers/notificationGroupController.js
const NotificationGroupModel = require("../models/notificationGroupModel");

exports.createNotificationGroup = async (req, res) => {
  try {
    const id = await NotificationGroupModel.createNotificationGroup(req.body);
    res.status(201).json({ message: "NotificationGroup record created", id });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllNotificationGroup = async (req, res) => {
  try {
    const records = await NotificationGroupModel.getAllNotificationGroup();
    res.json(records);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getNotificationGroupById = async (req, res) => {
  try {
    const record = await NotificationGroupModel.getNotificationGroupById(req.params.id);
    if (!record) return res.status(404).json({ message: "NotificationGroup record not found" });
    res.json(record);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateNotificationGroup = async (req, res) => {
  try {
    await NotificationGroupModel.updateNotificationGroup(req.params.id, req.body);
    res.json({ message: "NotificationGroup record updated" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteNotificationGroup = async (req, res) => {
  try {
    await NotificationGroupModel.deleteNotificationGroup(req.params.id);
    res.json({ message: "NotificationGroup record deleted" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};
