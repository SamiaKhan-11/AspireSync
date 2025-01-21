const { Schema, model } = require('../connection');

const mySchema = new Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      profileImage: {
        type: String, // Store the image URL or path
        default: 'https://example.com/default-profile.png',
      },
      contactNumber: {
        type: String,
        // required: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number.'],
      },
      education: {
        type: String,
        enum: ['Undergraduate', 'Graduate', 'Postgraduate', 'Diploma', 'Other'],
        // required: true,
      },
      resumeLink: {
        type: String,
        trim: true,
        match: [/^https?:\/\/[^\s]+$/, 'Please enter a valid URL.'],
      },
      location: {
        type: String,
        // required: true,
        trim: true,
      },
      skills: {
        type: [String], // Array of skills
        default: [],
      },
      experience: {
        type: Number, // Years of experience
        default: 0,
      },
     
      bio: {
        type: String,
        maxlength: 500, // Optional short bio
      },
      socialLinks: {
        linkedin: { type: String, match: [/^https?:\/\/[^\s]+$/, 'Invalid URL.'] },
        github: { type: String, match: [/^https?:\/\/[^\s]+$/, 'Invalid URL.'] },
      },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('users', mySchema);

