const mongoose = require('mongoose');
const { type } = require('os');

const dataSchema = new mongoose.Schema({
    Date: {
        type: String
    },
    CandidateName: {
        required: true,
        type: String
    },
    JobTitle: {
        
        type: String
    },
    Department: {
        required: true,
        type: String
    },
    ReportingManager:{
       
        type:String
    },
    EmploymentType:{
       
        type:String
    },
    WorkLocation:{
       
        type:String
    },
    ProbationPeriod:{
      
        type:String
    },
    Deadline:{

        type:String
    },
    EmployeeId:{
        type:String
    },
})

module.exports = mongoose.model('Offerletters', dataSchema)