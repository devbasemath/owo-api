const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
  invoiceReference: {
    type: String,
    required: "Please enter invoice reference"
  },
  clientName: {
    type: String,
    required: "Please enter client name"
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user"
  }
});

module.exports = mongoose.model("invoice", InvoiceSchema);
