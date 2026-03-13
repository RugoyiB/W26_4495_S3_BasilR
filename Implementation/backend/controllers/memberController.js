const Member = require("../models/Member");
const Attendance = require("../models/Attendance");
const logAction = require("../services/auditLogger");

// Create a new member
exports.createMember = async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    await logAction(req, "CREATE", "Members", `Created member ${member.firstName}`);
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({
      error: "Validation failed",
      details: error.message
    });
  }
};

// Get all members
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({
      error: "Validation failed",
      details: error.message
    });
  }
};

// Get a single member by ID
exports.getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({
      error: "Validation failed",
      details: error.message
    });
  }
};

// Update a member
exports.updateMember = async (req, res) => {
  try {
    console.log("UPDATE PAYLOAD:", req.body);
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true
      }
    );

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    await logAction(req, "UPDATE", "Members", `Updated member ${member.firstName}`);

    res.status(200).json(member);
  } catch (error) {
    res.status(400).json({
      error: "Validation failed",
      details: error.message
    });
  }
};

// Delete a member
exports.deleteMember = async (req, res) => {
  try {
    const memberId = req.params.id;

    // Delete attendance records for this member
    await Attendance.deleteMany({ member: memberId });

    // Delete the member
    const deletedMember = await Member.findByIdAndDelete(memberId);

    if (!deletedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    await logAction(req, "DELETE", "Members", `Deleted member ${deletedMember.firstName}`);

    res.status(200).json({
      message: "Member and related attendance records deleted successfully"
    });
  } catch (error) {
    console.error("DELETE MEMBER ERROR:", error);
    res.status(500).json({
      error: "Validation failed",
      details: error.message
    });
  }
};
