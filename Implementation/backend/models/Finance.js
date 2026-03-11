const mongoose = require("mongoose");

const financeSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ["Tithe", "Offering", "Donation"],
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Bank Transfer", "Mobile Money"],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  notes: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Finance", financeSchema);