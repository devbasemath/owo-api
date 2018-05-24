const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipientSchema = new Schema({
  recipientReference: {
    type: String,
    required: "Please enter recipient reference"
  },
  firstName: {
    type: String,
    required: "Please enter first name"
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

module.exports = mongoose.model("recipient", RecipientSchema);
