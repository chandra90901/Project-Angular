// controllers/notificationController.js
const NotificationModel = require("../models/notificationModel");

exports.createNotification = async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Debug input data
    const id = await NotificationModel.createNotification(req.body);
    if (req.body.Message && req.body.Message.length > 255) {
      return res
        .status(400)
        .json({ error: "Message cannot exceed 255 characters." });
    }
    res.status(201).json({ message: "Notification created", id });
  } catch (err) {
    console.error("Database error in createNotification:", err);
    res.status(500).json({ error: err.sqlMessage || err.message });
  }
};

exports.getAllNotification = async (req, res) => {
  try {
    const records = await NotificationModel.getAllNotification();
    res.json(records);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getNotificationById = async (req, res) => {
  try {
    const record = await NotificationModel.getNotificationById(req.params.id);
    if (!record)
      return res.status(404).json({ message: "Notification record not found" });
    res.json(record);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateNotification = async (req, res) => {
  try {
    await NotificationModel.updateNotification(req.params.id, req.body);
    res.json({ message: "Notification record updated" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    await NotificationModel.deleteNotification(req.params.id);
    res.json({ message: "Notification record deleted" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};
