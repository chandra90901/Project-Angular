const express = require('express');
const Model = require('../models/offerletter');

const router = express.Router()

//Post Method
router.post('/add-offerletter', async (req, res) => {
    const data = new Model({
        Date: req.body.Date,
        CandidateName: req.body.CandidateName,
        JobTitle: req.body.JobTitle,
        Department: req.body.Department,
        ReportingManager: req.body.ReportingManager,
        EmploymentType: req.body.Employmentype,
        WorkLocation: req.body.WorkLocation,
        ProbationPeriod: req.body.ProbationPeriod,
        Deadline: req.body.Deadline,
        EmployeeId:req.body.EmployeeId,

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
router.get('/get-all-offerletters', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/get-one-offerletter/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update-offerletter/:id', async (req, res) => {
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
router.delete('/delete-offerletter/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send({ message: `Document has been deleted..`})
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
module.exports = router;