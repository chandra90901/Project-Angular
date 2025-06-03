const EmployeeModel = require("../models/employeeModel");


exports.createEmployee = async (req, res) => {
    try {
        const id = await EmployeeModel.createEmployee(req.body);
        res.status(201).json({ message: "Employee record created", id });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getAllEmployees = async (req, res) => {
    try {
        const records = await EmployeeModel.getAllEmployees();
        res.json(records);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const record = await EmployeeModel.getEmployeeById(req.params.id);
        if (!record) return res.status(404).json({ message: "Employee record not found" });
        res.json(record);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        await EmployeeModel.updateEmployee(req.params.id, req.body);
        res.json({ message: "Employee record updated" });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        await EmployeeModel.deleteEmployee(req.params.id);
        res.json({ message: "Employee record deleted" });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};
