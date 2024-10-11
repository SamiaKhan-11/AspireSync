const {Schema, model, Types} = require('../connection')

const CompanyAuthSchema = new Schema({
     companyName:{type:String, required: true, ref:'companies'},
     contactEmail: {type: String, required:true, ref:'companies'},
     password:{type:String, required:true},
     createdAt: { type: Date, default: Date.now }
});
module.exports = model('companyauth',CompanyAuthSchema);