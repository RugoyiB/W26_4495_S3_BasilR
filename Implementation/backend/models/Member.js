const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: String,
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d+$/.test(v); // digits only
      },
      message: "Phone number must contain digits only"
    }
  },
  email: String,
  address: String,
  joinDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Transferred"],
    default: "Active"
  }
});

module.exports = mongoose.model("Member", MemberSchema);
