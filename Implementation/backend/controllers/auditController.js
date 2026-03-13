const AuditLog = require("../models/AuditLog");

exports.getAuditLogs = async (req, res) => {
  try {

    const logs = await AuditLog.find()
      .populate("user", "username email")
      .sort({ timestamp: -1 });

    res.status(200).json(logs);

  } catch (error) {
    res.status(500).json({
      message: "Error retrieving audit logs",
      error: error.message
    });
  }
};
