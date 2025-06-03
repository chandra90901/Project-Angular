const mongoose = require('mongoose');
const { type } = require('os');

const dataSchema = new mongoose.Schema({
    Title: {
        required: true,
        type: String
    },
    CustomerName: {
        required: true,
        type: String
    },
    EntityType: {
        required: true,
        type: String
    },
    Email: {
        required: true,
        type: String
    },
    Mobile_Number: {
        type: String
    },
    Customer_GSTIN: {
        type: String
    },
    Filling_Status: {
        type: String
    },
    BranchName: {
        type: String
    },
    DisplayName: {
        type: String
    },
    PhoneNumber: {
        type: String
    },
    Fax: {
        type: String
    },
    AccountNumber: {
        type: String
    },
    AccountName: {
        type: String
    },
    BankName: {
        type: String
    },
    IfscCode: {
        type: String
    },
    AccountType: {
        type: String
    },
    Branch_Name: {
        type: String
    },
    Address1: {
        type: String
    },
    Address2: {
        type: String
    },
    City: {
        type: String
    },
    Pincode: {
        type: String
    },
    State: {
        type: String
    },
    Country: {
        type: String
    },
    Branch_Name1: {
        type: String
    },
    Gstin: {
        type: String
    },
    E_Mail: {
        type: String
    },
    MNumber: {
        type: String
    },
    Ship_Address1: {
        type: String
    },
    Ship_Address2: {
        type: String
    },
    Ship_City: {
        type: String
    },
    Ship_Pincode: {
        type: String
    },
    Ship_State: {
        type: String
    },
    Ship_Country: {
        type: String
    },
    Ship_Branch_Name1: {
        type: String
    },
    Ship_Gstin: {
        type: String
    },
    Ship_E_Mail: {
        type: String
    },
    Ship_MNumber: {
        type: String
    },
    })

module.exports = mongoose.model('Customers', dataSchema)