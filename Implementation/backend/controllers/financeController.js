const Finance = require("../models/Finance");
const logAction = require("../services/auditLogger");

// Helper to detect changed fields
function getChangedFields(oldData, newData) {
  const previous = {};
  const updated = {};

  Object.keys(newData).forEach(key => {
    if (JSON.stringify(oldData[key]) !== JSON.stringify(newData[key])) {
      previous[key] = oldData[key];
      updated[key] = newData[key];
    }
  });

  return { previous, updated };
}

// CREATE FINANCIAL RECORD
exports.createFinance = async (req, res) => {
  try {
    const date = new Date(req.body.date);
    date.setHours(12, 0, 0, 0);

    const record = new Finance({ ...req.body, date });
    await record.save();

    await logAction(
      req,
      "CREATE",
      "Finance",
      "New finance record created",
      null,
      record,
      record._id
    );

    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL FINANCIAL RECORDS
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

// FINANCE REPORT (FILTER BY DATE)
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

// UPDATE FINANCIAL RECORD
exports.updateFinance = async (req, res) => {
  try {
    const oldRecord = await Finance.findById(req.params.id);
    if (!oldRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    const updatedRecord = await Finance.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    const { previous, updated } = getChangedFields(
      oldRecord.toObject(),
      updatedRecord.toObject()
    );

    await logAction(
      req,
      "UPDATE",
      "Finance",
      "Finance record updated",
      previous,
      updated,
      req.params.id
    );

    res.json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE FINANCIAL RECORD
exports.deleteFinance = async (req, res) => {
  try {
    const record = await Finance.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    await logAction(
      req,
      "DELETE",
      "Finance",
      "Finance record deleted",
      record,
      null,
      req.params.id
    );

    res.json({ message: "Finance record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
