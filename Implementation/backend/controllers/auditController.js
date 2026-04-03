const AuditLog = require("../models/AuditLog");

exports.getAuditLogs = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let filter = {};

    if (startDate && endDate) {
      filter.timestamp = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const logs = await AuditLog.find(filter)
      .populate("newValue.member", "firstName lastName")
      .populate("previousValue.member", "firstName lastName")
      .populate("user", "name")
      .sort({ timestamp: -1 });

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving audit logs",
      error: error.message
    });
  }
};
