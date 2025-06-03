const express = require('express');
const Model = require('../models/candidateremark');

const router = express.Router();

// POST method to add remark
router.post('/add-candidateremark', async (req, res) => {
    const data = new Model({
        Date: req.body.Date,
        Remark: req.body.Remark,
        CandidateId: req.body.CandidateId,
        CandidateName: req.body.CandidateName,
    });

    try {
        const savedRemark = await data.save();
        res.status(200).json(savedRemark);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
