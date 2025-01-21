const { Schema, model } = require('../connection');

// Defining Company Schema
const CompanySchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String
    },
    password:{type:String, required:true},
    industry: {
        type: String,
        // required: true
    },
    companyLocation: {
        type: String,
        // required: true
    },
    logo: {
        type: String,
        default: ''
    },
    website: {
        type: String
    },
    linkToApply : {
        type: String

    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},);

// Exporting the model
module.exports = model('companies', CompanySchema);
