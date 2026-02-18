const Member = require("../models/Member");

// Create a new member
exports.createMember = async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
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
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
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
    await Member.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Validation failed",
      details: error.message
    });
  }
};
