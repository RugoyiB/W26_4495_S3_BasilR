const AuditLogs = require("../models/AuditLog");

const logAction = async (
  req,
  action,
  module,
  details = "",
  previousValue = null,
  newValue = null,
  recordId = null
) => {
  try {
    await AuditLogs.create({
      user: req.user?.id || null,
      module,
      action,
      recordId,
      previousValue,
      newValue,
      details,
      ipAddress: req.ip
    });
  } catch (error) {
    console.error("Audit logging failed:", error);
  }
};

module.exports = logAction;
