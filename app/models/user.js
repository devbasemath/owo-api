const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String,
    required: "Please enter email",
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: "Please enter password"
  },
  createddate: {
    type: Date,
    default: Date.now
  },
  invoices: [
    {
      type: Schema.Types.ObjectId,
      ref: "invoice"
    }
  ]
});

module.exports = mongoose.model("user", UserSchema);
