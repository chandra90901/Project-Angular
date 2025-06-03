const express = require('express');
const Model = require('../models/timesheet');
const EmpModel = require('../models/employee');

const router = express.Router()

//Post Method
router.post('/add-timesheet', async (req, res) => {
    const data = new Model({
        EmployeeId: req.body.EmployeeId,
        Date: req.body.Date,
        WorkDetails: req.body.WorkDetails,
        Hours: req.body.Hours,
        Status: req.body.Status,
        Reason: req.body.Reason,
        ApprovedReason: req.body.ApprovedReason,
        ApprovedDate: req.body.ApprovedDate,
        ApprovedBy: req.body.ApprovedBy,
        RejectBy: req.body.RejectBy,
        RejectDate: req.body.RejectDate,
        RejectReason: req.body.RejectReason,

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
router.get('/get-all-timesheets', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/get-one-timesheet/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update-timesheet/:id', async (req, res) => {
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
router.delete('/delete-timesheet/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send({ message: `Document has been deleted..` })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get my timesheet Method
router.get('/get-mytimesheets/:empid', async (req, res) => {
    try {
        const empid = req.params.empid;
        const data = await Model.find({ EmployeeId: empid });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get requested timesheet Method
router.get('/get-requested-timesheets/:empid', async (req, res) => {
    try {
        const empid = req.params.empid;
        const emp = await EmpModel.find({ ReportingTo: empid });
        const data = await Model.find({ EmployeeId: emp[0].EmployeeName });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;