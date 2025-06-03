const mongoose = require('mongoose');
const { type } = require('os');

const dataSchema = new mongoose.Schema({
    Data: {
        required: true,
        type: String
    },
    MasterGroup: {
        required: true,
        type: String
    },
   
})

module.exports = mongoose.model('MasterType', dataSchema)