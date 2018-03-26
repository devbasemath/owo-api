var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstname : {
    type: String,
    required: 'Please enter firstname'
  },
  lastname : {
    type: String,
    required: 'Please enter lastname'
  },
  email : {
    type: String,
    required: 'Please enter email'
  },
  password : {
    type: String,
    required: 'Please enter password'
  },
  createddate:{
    type: Date,
    default: Date.now
  },
  invoices: [{
    type: Schema.Types.ObjectId,
    ref: 'invoice'
  }]
});

module.exports = mongoose.model('User', UserSchema);
