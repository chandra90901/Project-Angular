const express = require('express');
const Model = require('../models/customer');

const router = express.Router()

//Post Method
router.post('/add-customer', async (req, res) => {
    // debugger;
    const data = new Model({
        Title: req.body.Title,
        CustomerName: req.body.CustomerName,
        EntityType: req.body.EntityType,
        Email:req.body.Email,
        Mobile_Number:req.body.Mobile_Number,
        Customer_GSTINustomer_GSTIN:req.body.customer_GSTIN,
        Filling_Status:req.body.Filling_Status,
        BranchName:req.body.BranchName,
        DisplayName:req.body.DisplayName,
        PhoneNumber:req.body.PhoneNumber,
        Fax:req.body.Fax,
        AccountNumber:req.body.AccountNumber,
        AccountName:req.body.AccountName,
        BankName:req.body.BankName,
        IfscCode:req.body.IfscCode,
        AccountType:req.body.AccountType,
        Branch_Name:req.body.Branch_Name,
        Address1:req.body.Address1,
        Address2:req.body.Address2,
        City:req.body.City,
        Pincode:req.body.Pincode,
        State:req.body.State,
        Country:req.body.Country,
        Branch_Name1:req.body.Branch_Name1,
        Gstin:req.body.Gstin,
        E_Mail:req.body.E_Mail,
        MNumber:req.body.MNumber,
        Ship_Address1:req.body.Ship_Address1,
        Ship_Address2:req.body.Ship_Address2,
        Ship_City:req.body.Ship_City,
        Ship_Pincode:req.body.Ship_Pincode,
        Ship_State:req.body.Ship_State,
        Ship_Country:req.body.Ship_Country,
        Ship_Branch_Name1:req.body.Ship_Branch_Name1,
        Ship_Gstin:req.body.Ship_Gstin,
        Ship_E_Mail:req.body.Ship_E_Mail,
        Ship_MNumber:req.body.Ship_MNumber,

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
router.get('/get-all-customers', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/get-one-customer/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update-customer/:id', async (req, res) => {
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
router.delete('/delete-customer/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send({ message: `Document has been deleted..`})
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get Customer by Entity Type Method
router.get('/get-customers-entity-type/:entityType', async (req, res) => {
    try {
        const entityType = req.params.entityType;
        const data = await Model.find({ EntityType: entityType });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//Get Customer by State Method
router.get('/get-customers-state-type/:state', async (req, res) => {
    try {
        const state = req.params.state;
        const data = await Model.find({ State: state });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router;