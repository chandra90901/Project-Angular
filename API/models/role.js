const mongoose = require('mongoose');
const { type } = require('os');

const dataSchema = new mongoose.Schema({
    roleName: {
        required: true,
        type: String
    },
    roleStatus: {
        required: true,
        type: String
    },
    isAdmin: {
        required: true,
        type: String
    },

})

module.exports = mongoose.model('Roles', dataSchema)