const mongoose = require('mongoose');

// Define the schema for personal details
const personalDetailsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
    },
    address: {
        type: String,
        required: true
    },
    idType: {
        type: String,
        required: true
    },
    issuingAuthority: {
        type: String,
        required: true
    },
    idNumber: {
        type: String,
        required: true,
        unique: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    occupation: {
        type: String
    },
    employerName: {
        type: String
    },
    employerIdProof: {
        type: String
    },
    monthlyIncome: {
        type: String
    },
    sourceOfIncome: {
        type: String
    },
    incomeProof: {
        type: String
    },
    addressProof:{
        type: String
    },
    accountType: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    bankName: {
        type: String,
        required: true
    },
    branchName: {
        type: String
    },
    ifscCode: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    securityQuestion1: {
        type: String,
        required: true
    },
    securityAnswer1: {
        type: String,
        required: true
    },
    securityQuestion2: {
        type: String,
        required: true
    },
    securityAnswer2: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String
    },
    numberOfDependents: {
        type: Number
    },
    educationLevel: {
        type: String
    },

    termsAccepted: {
        type: Boolean,
        required: true
    },
    idDocumentPath: {
        type: String,  // Store the file path of the uploaded ID document
        required: true
    }
});

// Create a model using the schema
const PersonalDetails = mongoose.model('PersonalDetails', personalDetailsSchema);

module.exports = PersonalDetails;
