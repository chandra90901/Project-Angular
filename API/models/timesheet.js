const mongoose = require('mongoose');
const { type } = require('os');

const dataSchema = new mongoose.Schema({
    EmployeeId: {
        type: String
    },
    Date: {
        type: String
    },
    WorkDetails: {
        type: String
    },
    Hours: {
        type: String
    },
    Reason: {
        type: String
    },
    Status: {
        type: String
    },
    ApprovedBy: {
        type: String
    },
    ApprovedReason: {
        type: String
    },
    ApprovedDate: {
        type: String
    },
    RejectBy: {
        type: String
    },
    RejectDate: {
        type: String
    },
    RejectReason: {
        type: String
    },
})

module.exports = mongoose.model('Timesheet', dataSchema)