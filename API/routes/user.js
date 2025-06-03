const express = require('express');
const Model = require('../models/user');

const router = express.Router()

//Post Method
router.post('/add-user', async (req, res) => {
    const data = new Model({
        Username: req.body.Username,
        Password: req.body.Password,
        EmployeeId: req.body.EmployeeId,
        RoleId: req.body.RoleId,
        Status: req.body.Status,

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
router.get('/get-all-users', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/get-one-user/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update-user/:id', async (req, res) => {
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
router.delete('/delete-user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send({ message: `Document has been deleted..`})
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post('/check-user', async (req, res) => {
    
    try {
            const state = req.params.state;
            const data = await Model.find({ Username: req.body.Username,Password: req.body.Password });
            if(data.length>0){
                res.status(200).json(data)
            } else {
                res.status(500).json({ message: 'User Not Present' })
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }

    // const data = new Model({
    //     Username: req.body.Username,
    //     Password: req.body.Password,
    //     EmployeeId: req.body.EmployeeId,
    //     RoleId: req.body.RoleId,
    //     Status: req.body.Status,

    // })
    // try {
    //     const dataToSave = await data.save();
    //     res.status(200).json(dataToSave)
    // }
    // catch (error) {
    //     res.status(400).json({ message: error.message })
    // }
})
module.exports = router;