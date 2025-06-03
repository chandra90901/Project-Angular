
const AnnouncementModel = require("../models/announcementModel");

exports.createAnnouncement = async (req, res) => {
  try {
    const id = await AnnouncementModel.createAnnouncement(req.body);
    res.status(201).json({ message: "Announcement record created", id });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAnnouncements = async (req, res) => {
  try {
    const records = await AnnouncementModel.getAllAnnouncements();
    res.json(records);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAnnouncementById = async (req, res) => {
  try {
    const record = await AnnouncementModel.getAnnouncementById(req.params.id);
    if (!record) return res.status(404).json({ message: "Announcement record not found" });
    res.json(record);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateAnnouncement = async (req, res) => {
  try {
    await AnnouncementModel.updateAnnouncement(req.params.id, req.body);
    res.json({ message: "Announcement record updated" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    console.log("Deleting Announcement with ID:", req.params.id);
    await AnnouncementModel.deleteAnnouncement(req.params.id);
    res.json({ message: "Announcement record deleted" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

