const express = require('express');
const Model = require('../models/employee');

const router = express.Router()

//Post Method
router.post('/add-employee', async (req, res) => {
    const data = new Model({
        Title: req.body.Title,
        EmployeeName: req.body.EmployeeName,
        EmployeeStatus: req.body.EmployeeStatus,
        ReportingTo: req.body.ReportingTo,
        EmployementType:req.body.EmployementType,
        Gender:req.body.Gender,
        MaritalStatus:req.body.MaritalStatus,
        Branch:req.body.Branch,
        OfficeEmail:req.body.OfficeEmail,
        OfficeMobileNumber:req.body.OfficeMobileNumber,
        EmployeeId:req.body.EmployeeId,
        PersonalMobileNumber:req.body.PersonalMobileNumber,
        PersonalEmail:req.body.PersonalEmail,
        DateOfBirth:req.body.DateOfBirth,
        Designation:req.body.Designation,
        Department:req.body.Department,
        FathersName:req.body.FathersName,
        Aadhar:req.body.Aadhar,
        PAN:req.body.PAN,
        Religion:req.body.Religion,
        BloodGroup:req.body.BloodGroup,
        EmergencyContact:req.body.EmergencyContact,
        UAN:req.body.UAN,
        ESI:req.body.ESI,
        DateOfJoining:req.body.DateOfJoining,
        CheckInTime:req.body.CheckInTime,
        CheckOutTime:req.body.CheckOutTime,
        DateOfExit:req.body.DateOfExit, 
        AccountName:req.body.AccountName,
        Address:req.body.Address,

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
router.get('/get-all-employees', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/get-one-employee/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update-employee/:id', async (req, res) => {
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
router.delete('/delete-employee/:id', async (req, res) => {
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