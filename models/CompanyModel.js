var mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const shortid = require('shortid');
var CompanySchema = new mongoose.Schema({  

  CompanyName: String,
  
  Corporatecode: String,
  
  Employees : Number,

  Location : String,

  Coverage_Self: Number,
  
  Coverage_Family: Number,
  
  Coverage_Parents: Number,

  ConsultantDoctorsRange_ALL: Boolean,

  ConsultantDoctorsRange_Below: Number,

  Prepaid_Amount: Number,

  Used_Amount: Number,

  Balance_Amount: Number,

  DiscountOffered: Number,
  
});
mongoose.model('Company', CompanySchema);

module.exports = mongoose.model('Company');