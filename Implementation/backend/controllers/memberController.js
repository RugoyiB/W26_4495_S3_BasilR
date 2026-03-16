const Member = require("../models/Member");
const Attendance = require("../models/Attendance");
const logAction = require("../services/auditLogger");

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

// CREATE MEMBER
exports.createMember = async (req, res) => {
  try {
    const member = await Member.create(req.body);

    await logAction(
      req,
      "CREATE",
      "Member",
      "New member created",
      null,
      member,
      member._id
    );

    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ error: "Validation failed", details: error.message });
  }
};

// GET ALL MEMBERS
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// GET MEMBER BY ID
exports.getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });

    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// UPDATE MEMBER
exports.updateMember = async (req, res) => {
  try {
    const oldMember = await Member.findById(req.params.id);
    if (!oldMember) return res.status(404).json({ message: "Member not found" });

    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    const { previous, updated } = getChangedFields(
      oldMember.toObject(),
      updatedMember.toObject()
    );

    await logAction(
      req,
      "UPDATE",
      "Member",
      "Member information updated",
      previous,
      updated,
      req.params.id
    );

    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(400).json({ error: "Validation failed", details: error.message });
  }
};

// DELETE MEMBER
exports.deleteMember = async (req, res) => {
  try {
    const memberId = req.params.id;

    await Attendance.deleteMany({ member: memberId });

    const deletedMember = await Member.findByIdAndDelete(memberId);
    if (!deletedMember)
      return res.status(404).json({ message: "Member not found" });

    await logAction(
      req,
      "DELETE",
      "Member",
      "Member deleted",
      deletedMember,
      null,
      memberId
    );

    res.status(200).json({
      message: "Member and related attendance records deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
