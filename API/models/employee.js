const mongoose = require('mongoose');
const { type } = require('os');

const dataSchema = new mongoose.Schema({
    Title: {
        type: String
    },
    EmployeeName: {
        required: true,
        type: String
    },
    EmployeeStatus: {
        
        type: String
    },
    ReportingTo: {
  
        type: String
    },
    EmployementType:{
       
        type:String
    },
    Gender:{
       
        type:String
    },
    MaritalStatus:{
       
        type:String
    },
    Branch:{
      
        type:String
    },
    OfficeEmail:{
        required:true,
        type:String
    },
    OfficeMobileNumber:{
       
        type:String
    },
    EmployeeId:{
      
        type:String
    },
    PersonalMobileNumber:{
       
        type:String
    },
    PersonalEmail:{
      
        type:String
    },
    DateOfBirth:{
        required:true,
        type:String
    },
    Designation:{
     
        type:String
    },
    Department:{
      
        type:String
    },
    FathersName:{
       
        type:String
    },
    Aadhar:{
       
        type:String
    },
    PAN:{
     
        type:String
    },
    Religion:{
     
        type:String
    },
    BloodGroup:{
       
        type:String
    },
    EmergencyContact:{
       
        type:String
    },
    UAN:{
       
        type:String
    },
    ESI:{
       
        type:String
    },
    DateOfJoining:{
       
        type:String
    },
    CheckInTime:{
      
        type:String
    },
    CheckOutTime:{
     
        type:String
    },
    DateOfExit:{
       
        type:String
    },
    AccountName:{

        type:String
    },
    Address:{
        type:String
    },
       
})

module.exports = mongoose.model('Employees', dataSchema)