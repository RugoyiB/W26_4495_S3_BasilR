const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: String,
  phone: String,
  email: String,
  address: String,
  joinDate: { type: Date, default: Date.now },
  status: { type: String, default: "Active" }
});

module.exports = mongoose.model("Member", MemberSchema);
