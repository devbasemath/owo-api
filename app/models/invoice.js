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
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);

