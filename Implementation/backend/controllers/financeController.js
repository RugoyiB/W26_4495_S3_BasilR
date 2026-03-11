const Finance = require("../models/Finance");

// Create financial record
exports.createFinance = async (req, res) => {
  try {
    const date = new Date(req.body.date);
    date.setHours(12, 0, 0, 0);

    const record = new Finance(req.body);
    record.date = date;

    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all financial records
exports.getAllFinance = async (req, res) => {
  try {
    const records = await Finance.find()
      .populate("member", "firstName lastName")
      .sort({ date: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Finance report (filter by date)
exports.getFinanceReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let filter = {};

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate + "T00:00:00"),
        $lte: new Date(endDate + "T23:59:59")
      };
    }

    const records = await Finance.find(filter)
      .populate("member", "firstName lastName")
      .sort({ date: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
