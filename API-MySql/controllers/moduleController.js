// controllers/moduleController.js
const ModuleModel = require("../models/moduleModel");

exports.createModule = async (req, res) => {
    try {
        const id = await ModuleModel.createModule(req.body);
        res.status(201).json({ message: "Module record created", id });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getAllModules = async (req, res) => {
    try {
        const records = await ModuleModel.getAllModules();
        res.json(records);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getModuleById = async (req, res) => {
    try {
        const record = await ModuleModel.getModuleById(req.params.id);
        if (!record) return res.status(404).json({ message: "Module record not found" });
        res.json(record);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.updateModule = async (req, res) => {
    try {
        await ModuleModel.updateModule(req.params.id, req.body);
        res.json({ message: "Module record updated" });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};


exports.deleteModule = async (req, res) => {
    try {
        console.log("Deleting Module with ID:", req.params.id);
        await ModuleModel.deleteModule(req.params.id);
        res.json({ message: "Module record deleted" });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

