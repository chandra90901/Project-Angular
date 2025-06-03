const InvoiceModel = require("../models/invoiceModel");

exports.createInvoice = async (req, res) => {
    try {
        const id = await InvoiceModel.createInvoice(req.body);
        res.status(201).json({ message: "Invoice record created", id });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getAllInvoices = async (req, res) => {
    try {   
        const records = await InvoiceModel.getAllInvoices();
        res.json(records);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getInvoiceById = async (req, res) => {
    try {
        const record = await InvoiceModel.getInvoiceById(req.params.id);
        if (!record) return res.status(404).json({ message: "Invoice record not found" });
        res.json(record);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.updateInvoice = async (req, res) => {
    try {
        await InvoiceModel.updateInvoice(req.params.id, req.body);
        res.json({ message: "Invoice record updated" });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.deleteInvoice = async (req, res) => {
    try {
        await InvoiceModel.deleteInvoice(req.params.id);
        res.json({ message: "Invoice record deleted" });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};
