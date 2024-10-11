const { Schema, model, Types } = require('../connection');

const MySchema = new Schema({
    companyName: { type: String, required: true, ref: 'companies' },
    Industry: { type: String, required: true, ref: 'companies' },
    jobTitle: { type: String },
    jobType: { type: String, required: true, },
    Experience: { type: String, required: true },
    SkillsRequired: { type: String },
    Location: { type: String },
    InterviewDate: { type: Date, required: true },
    endDate: { type: Date, default: Date.now },
    logo: { type: String, default: '', ref: 'companies' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('interviews', MySchema);