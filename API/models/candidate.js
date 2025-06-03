const mongoose = require('mongoose');
const { type } = require('os');

const dataSchema = new mongoose.Schema({
    CandidateName: {
        type: String
    },
    EmailAddress: {
        required: true,
        type: String
    },
    PhoneNumber: {

        type: String
    },
    SkillSet: {

        type: String
    },
    AadharCardNumber: {

        type: String
    },
    PanCardNumber: {

        type: String
    },
    Candidateid: { type: String },
    Date: { type: String },
    Remark: { type: String },
})

module.exports = mongoose.model('Candidate', dataSchema)