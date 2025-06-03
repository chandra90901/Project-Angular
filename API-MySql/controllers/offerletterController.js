const OfferLetterModel = require("../models/offerletterModel");


exports.createOfferLetter = async (req, res) => {
    try {
        const id = await OfferLetterModel.createOfferLetter(req.body);
        res.status(201).json({ message: "OfferLetter record created", id });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getAllOfferLetters = async (req, res) => {
    try {
        const records = await OfferLetterModel.getAllOfferLetters();
        res.json(records);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getOfferLetterById = async (req, res) => {
    try {
        const record = await OfferLetterModel.getOfferLetterById(req.params.id);
        if (!record) return res.status(404).json({ message: "OfferLetter record not found" });
        res.json(record);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.updateOfferLetter = async (req, res) => {
    try {
        await OfferLetterModel.updateOfferLetter(req.params.id, req.body);
        res.json({ message: "OfferLetter record updated" });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.deleteOfferLetter = async (req, res) => {
    try {
        await OfferLetterModel.deleteOfferLetter(req.params.id);
        res.json({ message: "OfferLetter record deleted" });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    }
};

