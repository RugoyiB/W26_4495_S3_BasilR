const AuditLog = require("../models/AuditLog");

const auditLog = (action, module) => {
  return async (req, res, next) => {
    try {

      const log = new AuditLog({
        user: req.user ? req.user._id : null,
        action: action,
        module: module,
        details: JSON.stringify(req.body),
        ipAddress: req.ip
      });

      await log.save();

      console.log("Audit log created:", action);

    } catch (error) {
      console.error("Audit log error:", error.message);
    }

    next();
  };
};

module.exports = auditLog;
