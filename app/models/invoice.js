var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InvoiceSchema = new Schema({
  invoiceid : {
    type: Number,
    required: 'Please enter invoiceid'
  },
  clientname : {
    type: String,
    required: 'Please enter clientname'
  },
  createddate:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);

