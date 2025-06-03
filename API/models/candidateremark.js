const mongoose = require('mongoose');
const { type } = require('os');
const bodyParser = require('body-parser');

const dataSchema = new mongoose.Schema({
    Date: { type: String },
    Remark: { type: String },
    CandidateId: { type: String },
    CandidateName: { type: String },
})


module.exports = mongoose.model('Candidateremark', dataSchema)



