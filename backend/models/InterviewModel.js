const { Schema, model, Types } = require('../connection');

const MySchema = new Schema({
    company: { type: Types.ObjectId, required: true, ref: 'companies' },
    jobTitle: { type: String },
    jobType: { type: String, required: true, },
    experience: { type: String, required: true },
    skillsRequired: { type: String },
    location: { type: String },
    interviewDate: { type: Date, required: true },
    endDate: { type: Date, default: Date.now },
   
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('interviews', MySchema);