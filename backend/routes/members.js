const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

// Create member
router.post("/", auth, memberController.createMember);

// Get all members
router.get("/", auth, memberController.getAllMembers);

// Get single member
router.get("/:id", auth, memberController.getMemberById);

// Update member
router.put("/:id", auth, memberController.updateMember);

// Delete member
router.delete("/:id", auth, memberController.deleteMember);

module.exports = router;
