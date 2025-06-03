// controllers/customerController.js
const CustomerModel = require("../models/customerModel");

exports.createCustomer = async (req, res) => {
    try {
        const id = await CustomerModel.createCustomer(req.body);
        res.status(201).json({ message: "Customer record created", id });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getAllCustomers = async (req, res) => {
    try {
        const records = await CustomerModel.getAllCustomers();
        res.json(records);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customerId = req.params.id;
        console.log('✅ Received ID in backend:', customerId); // Debugging line
        const record = await CustomerModel.getCustomerById(customerId);
        if (!record) return res.status(404).json({ message: "Customer record not found" });
        res.json(record);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        await CustomerModel.updateCustomer(req.params.id, req.body);
        res.json({ message: "Customer record updated" });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        await CustomerModel.deleteCustomer(req.params.id);
        res.json({ message: "Customer record deleted" });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};