const { Schema, model, Types } = require('../connection');

// Defining Company Schema
const SubscriptionSchema = new Schema({
    company: {
        type: Types.ObjectId, required: true, ref: 'companies'
    },
    user: {
        type: Types.ObjectId, required: true, ref: 'users'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'active'
    },
},);

// Exporting the model
module.exports = model('subscription', SubscriptionSchema);


// userid
// companyid
// createdAt
// status : default : active