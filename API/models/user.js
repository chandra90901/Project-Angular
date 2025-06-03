const mongoose = require('mongoose');
const { type } = require('os');

const dataSchema = new mongoose.Schema({
    Username: {
        required: true,
        type: String
    },
    Password: {
        required: true,
        type: String
    },
    EmployeeId: {
        required: true,
        type: String
    },
    RoleId: {
        required: true,
        type: String
    },
    Status: {
        
        type: String
    },

})

module.exports = mongoose.model('User', dataSchema)