const mongoose = require('mongoose');
const { type } = require('os');

const dataSchema = new mongoose.Schema({
    Group: {
        required: true,
        type: String
    }, 
    Type: {
        required: true,
        type: String
    },
    Data: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Masters', dataSchema)