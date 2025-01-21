const { Schema, model, Types } = require('../connection');

const mySchema = new Schema({
    user: { type: Types.ObjectId, ref: 'users' },
    company: { type: Types.ObjectId, ref: 'companies' },
    rating: Number,
    comment: String,
    createdAt: { type: Date, dafault: Date.now }
});

module.exports = model('review', mySchema);