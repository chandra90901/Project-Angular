// controllers/roleController.js
const RoleModel = require("../models/roleModel");

exports.createRole = async (req, res) => {
  try {
    const id = await RoleModel.createRole(req.body);
    res.status(201).json({ message: "Role record created", id });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const records = await RoleModel.getAllRoles();
    res.json(records);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const record = await RoleModel.getRoleById(req.params.id);
    if (!record) return res.status(404).json({ message: "Role record not found" });
    res.json(record);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    await RoleModel.updateRole(req.params.id, req.body);
    res.json({ message: "Role record updated" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    console.log("Deleting role with ID:", req.params.id);
    await RoleModel.deleteRole(req.params.id);
    res.json({ message: "Role record deleted" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

