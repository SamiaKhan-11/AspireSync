const { Schema, model } = require('../connection');

// Defining Company Schema
const CompanySchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    Industry: {
        type: String,
        required: true
    },
    companyLocation: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        default: ''
    },
    website: {
        type: String
    },
    description: {
        type: String
    },
    contactEmail: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},);

// Exporting the model
module.exports = model('companies', CompanySchema);
