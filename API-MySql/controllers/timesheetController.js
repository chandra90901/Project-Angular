// controllers/timesheetController.js
const TimesheetModel = require("../models/timesheetModel");

exports.createTimesheet = async (req, res) => {
    try {
        const id = await TimesheetModel.createTimesheet(req.body);
        res.status(201).json({ message: "Timesheet record created", id });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getAllTimesheets = async (req, res) => {
    try {
        const records = await TimesheetModel.getAllTimesheets();
        res.json(records);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getTimesheetById = async (req, res) => {
    try {
        const record = await TimesheetModel.getTimesheetById(req.params.id);
        if (!record) return res.status(404).json({ message: "Timesheet record not found" });
        res.json(record);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.updateTimesheet = async (req, res) => {
    try {
        await TimesheetModel.updateTimesheet(req.params.id, req.body);
        res.json({ message: "Timesheet record updated" });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTimesheet = async (req, res) => {
    try {
        await TimesheetModel.deleteTimesheet(req.params.id);
        res.json({ message: "Timesheet record deleted" });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getMyTimesheets = async (req, res) => {
    try {
        const record = await TimesheetModel.getMyTimesheets(req.params.employeeId);
        if (!record) return res.status(404).json({ message: "Timesheet record not found" });
        res.json(record);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getReqTimesheets = async (req, res) => {
    try {
        const record = await TimesheetModel.getReqTimesheets(req.params.mgrId);
        if (!record) return res.status(404).json({ message: "Req Timesheet record not found" });
        res.json(record);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};