const mongoose = require('mongoose');
const { type } = require('os');

const dataSchema = new mongoose.Schema({
    Basic_info: {
        required: true,
        type: String
    },
    Dateofjoining: {
        required: true,
        type: String
    },
    Reportinginfo: {
        required: true,
        type: String
    },
    Contact: {
        required: true,
        type: String
    },
    Salarysetup: {
        required: true,
        type: String
    },

})

module.exports = mongoose.model('Salary', dataSchema)