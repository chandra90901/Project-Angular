// controllers/userController.js
const UserModel = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    const id = await UserModel.createUser(req.body);
    res.status(201).json({ message: "User record created", id });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const records = await UserModel.getAllUser();
    res.json(records);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const record = await UserModel.getUserById(req.params.id);
    if (!record) return res.status(404).json({ message: "User record not found" });
    res.json(record);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    await UserModel.updateUser(req.params.id, req.body);
    res.json({ message: "User record updated" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await UserModel.deleteUser(req.params.id);
    res.json({ message: "User record deleted" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.checkUser = async (req, res) => {
  try {
    const record = await UserModel.checkUser(req.body);
    if (!record) return res.status(404).json({ message: "User record not found" });
    res.json(record);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};