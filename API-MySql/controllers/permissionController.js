const PermissionModel = require("../models/permissionModel");

exports.createPermission = async (req, res) => {
  try {
    const id = await PermissionModel.createPermission(req.body);
    res.status(201).json({ message: "Permission record created", id });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPermissions = async (req, res) => {
  try {
    const records = await PermissionModel.getAllPermissions();
    res.json(records);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getPermissionById = async (req, res) => {
  try {
    const record = await PermissionModel.getPermissionById(req.params.id);
    if (!record) return res.status(404).json({ message: "Permission record not found" });
    res.json(record);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updatePermission = async (req, res) => {
  try {
    await PermissionModel.updatePermission(req.params.id, req.body);
    res.json({ message: "Permission record updated" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deletePermission = async (req, res) => {
  try {
    console.log("Deleting Permission with ID:", req.params.id);
    await PermissionModel.deletePermission(req.params.id);
    res.json({ message: "Permission record deleted" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
};

