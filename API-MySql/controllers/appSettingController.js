const { sendEmail } = require('../emailService');
// controllers/appSettingController.js
const AppSettingModel = require("../models/appsettingModel");

// exports.createSetting = async (req, res) => {
//   try {
//     const id = await AppSettingModel.createSetting(req.body);
//     res.status(201).json({ message: "Setting created successfully", id });
//   } catch (err) {
//     console.error("Database error:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

exports.createSetting = async (req, res) => {
  try {
    const id = await AppSettingModel.createSetting(req.body);    

    await sendEmail('yogeshrajput335@gmail.com', 'New Appsetting added', 'App setting created successfully.')
      .then(response => {
        res.status(201).json({ message: "Setting created successfully", id });
      })
      .catch(error => {
        res.status(500).json({ message: "Error Sending mail", id });
      });

  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllSettings = async (req, res) => {
  try {
    const settings = await AppSettingModel.getAllSettings();
    res.json(settings);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getSettingById = async (req, res) => {
  try {
    const setting = await AppSettingModel.getSettingById(req.params.id);
    if (!setting) return res.status(404).json({ message: "Setting not found" });
    res.json(setting);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateSetting = async (req, res) => {
  try {
    await AppSettingModel.updateSetting(req.params.id, req.body);
    res.json({ message: "Setting updated successfully" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.addSetting = (req, res) => {
    try {
      const { Property, Value } = req.body;
  
      if (!Property || !Value) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      // Simulating saving to MySQL (replace this with actual DB logic)
      res.status(201).json({ message: "App setting saved successfully", data: req.body });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

exports.deleteSetting = async (req, res) => {
  try {
    await AppSettingModel.deleteSetting(req.params.id);
    res.json({ message: "Setting deleted successfully" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};
