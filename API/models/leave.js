const mongoose = require('mongoose');
const { type } = require('os');
const { stringify } = require('querystring');

const dataSchema = new mongoose.Schema({
    EmployeeId: {
        required: true,
        type: String
    },
    LeaveType: {
        type: String
    },
    FromDate: {
        type: String
    },
    FromDateHalfDay: {
        type: String
    },
    Status: {
        type: String
    },
    ToDate: {
        type: String
    },
    ToDateHalfDay: {
        type: String
    },
    Reason: {
        type: String
    },
    ApprovedBy: {
        type: String
    },
    ApprovedReason:{
        type: String
    },
    ApprovedDate:{
        type: String
    },
    RejectedBy:{
        type:String
    },
    RejectedReason:{
        type:String
    },
    RejectedDate: {
        type:String
    }
})

module.exports = mongoose.model('Leave', dataSchema)