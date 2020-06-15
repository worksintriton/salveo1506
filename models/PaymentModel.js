var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var timestamps = require('timestamp-mongoose');

var Payment_detailsSchema = new mongoose.Schema({  
  
  Doctor_name: String,

  Doctor_email_id: String,

  Doctor_image: String,

  Payment_id: String,

  Payment_type: String,

  Payment_Amount_Doctor: Number,

  Payment_Amount_Patient: Number,

  Salveo_Amount:Number,

  Pay_by_email_id: String,

  Pay_by_name: String,

  Pay_by_Image: String,

  Appointment_id: String,

});
Payment_detailsSchema.plugin(timestamps);

mongoose.model('Payment', Payment_detailsSchema);

module.exports = mongoose.model('Payment');