const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = mongoose.model('invoice', InvoiceSchema);

