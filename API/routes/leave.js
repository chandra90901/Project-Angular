const express = require('express');
const Model = require('../models/leave');
const EmpModel = require('../models/employee');

const router = express.Router()

//Post Method
router.post('/add-leave', async (req, res) => {
    const data = new Model({
        EmployeeId: req.body.EmployeeId,
        FromDate: req.body.FromDate,
        LeaveType: req.body.LeaveType,
        FromDateHalfDay: req.body.FromDateHalfDay,
        Status: req.body.Status,
        ToDate: req.body.ToDate,
        ToDateHalfDay: req.body.ToDateHalfDay,
        Reason: req.body.Reason,
               
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
router.get('/get-all-leaves', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/get-one-leave/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update-leave/:id', async (req, res) => {
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
router.delete('/delete-leave/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send({ message: `Document has been deleted..`})
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get my leave Method
router.get('/get-myleaves/:empid', async (req, res) => {
    try {
        const empid = req.params.empid;
        const data = await Model.find({ EmployeeId: empid });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get requested leave Method
router.get('/get-requested-leaves/:empid', async (req, res) => {
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
//get-myleaves
module.exports = router;