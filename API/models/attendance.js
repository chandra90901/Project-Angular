const mongoose = require('mongoose');
const { type } = require('os');

const dataSchema = new mongoose.Schema({
    EmployeeId: {
        required: true,
        type: String
    },
    Date: {

        type: String
    },
    InTime: {

        type: String
    },
    OutTime: {

        type: String
    },
    Status: {
        type:String
    },
    CreatedBy: {

        type: String
    },
    ApprovedDate: {
        type:String
    },
    RejectBy: {
       type: String
    },
    RejectDate: {
       type: String
    },
    ApprovedReason:{
        type:String
    },
    RejectReason:{
       type: String
    },
   Reason:{
    type:String
   },
})

module.exports = mongoose.model('Attendance', dataSchema)