// controllers/userController.js
const profileModel = require("../models/profileModel");

exports.getProfileById = async (req, res) => {
  try {
    const record = await profileModel.getProfileById(req.params.id);
    if (!record) return res.status(404).json({ message: "Profile record not found" });
    res.json(record);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};