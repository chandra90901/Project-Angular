const express = require('express');
const Model = require('../models/salary');

const router = express.Router()

//Post Method
router.post('/add-Salary', async (req, res) => {
    const data = new Model({
        Basic_info: req.body.Basic_info,
        Dateofjoining: req.body.Dateofjoining,
        Reportinginfo: req.body.Reportinginfo,
        Contact: req.body.Contact,
        Salarysetup: req.body.Salarysetup,

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
router.get('/get-all-Salaries', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/get-one-Salary/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update-Salary/:id', async (req, res) => {
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
router.delete('/delete-Salary/:id', async (req, res) => {
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