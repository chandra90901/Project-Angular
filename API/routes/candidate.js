
const express = require('express');
const Model = require('../models/candidate');

const router = express.Router()

//Post Method
router.post('/add-candidate', async (req, res) => {
    const data = new Model({
        CandidateName: req.body.CandidateName,
        EmailAddress: req.body.EmailAddress,
        PhoneNumber: req.body.PhoneNumber,
        SkillSet: req.body.SkillSet,
        AadharCardNumber: req.body.AadharCardNumber,
        PanCardNumber: req.body.PanCardNumber,
        Candidateid: req.body.Candidateid,
        Date: req.body.Date,
        Remark: req.body.Remark,
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
router.get('/get-all-candidate', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/get-one-candidate/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update-candidate/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete-candidate/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send({ message: `Document has been deleted..` })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
module.exports = router;