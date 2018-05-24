const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

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
  recipients: [
    {
      type: Schema.Types.ObjectId,
      ref: "recipient"
    }
  ]
});

UserSchema.pre("save", async function(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password, salt);
    this.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = mongoose.model("user", UserSchema);
