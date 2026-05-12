const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: String,
  memberType: {
    type: String,
    enum: ["Adult", "Child"],
    default: "Adult"
  },
  //Child flag
  isChild: {
    type: Boolean,
    default: false
  },
  //Parent / Guardian reference
  parentMember: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    default: null
  },
  //Date of Birth
  dateOfBirth: {
    type: Date,
    default: null
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        // Allow empty phone for children
        if (!v || v.trim() === "") return true;
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
