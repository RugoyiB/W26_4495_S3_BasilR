const mongoose = require("mongoose");

const AuditLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
  },
  module: {
    type: String,
    required: true
  },
  action: {
    type: String,
    enum: ["CREATE", "UPDATE", "DELETE", "LOGIN"],
    required: true
  },
  recordId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  previousValue: {
    type: Object,
    default: null
  },
  newValue: {
    type: Object,
    default: null
  },
  details: {
    type: String,
    default: ""
  },
  ipAddress: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("AuditLog", AuditLogSchema);
