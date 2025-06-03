
const HolidayModel = require("../models/holidayModel");

exports.createHoliday = async (req, res) => {
  try {
    const id = await HolidayModel.createHoliday(req.body);
    res.status(201).json({ message: "Holiday created successfully", id });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllHolidays = async (req, res) => {
  try {
    const holiday = await HolidayModel.getAllHolidays();
    res.json(holiday);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getHolidayById = async (req, res) => {
  try {
    const holiday = await HolidayModel.getHolidayById(req.params.id);
    if (!holiday) return res.status(404).json({ message: "Holiday not found" });
    res.json(holiday);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateHoliday = async (req, res) => {
  try {
    await HolidayModel.updateHoliday(req.params.id, req.body);
    res.json({ message: "Holiday updated successfully" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.addHoliday = (req, res) => {
    try {
      const { HolidayName, Status } = req.body;
  
      if (!HolidayName || !Status) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      // Simulating saving to MySQL (replace this with actual DB logic)
      res.status(201).json({ message: "Holiday saved successfully", data: req.body });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

exports.deleteHoliday = async (req, res) => {
  try {
    await HolidayModel.deleteHoliday(req.params.id);
    res.json({ message: "Holiday deleted successfully" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};


