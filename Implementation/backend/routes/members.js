const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

// CREATE
router.post("/", auth, memberController.createMember);

// READ ALL
router.get("/", auth, memberController.getAllMembers);

// READ ONE
router.get("/:id", auth, memberController.getMemberById);

// UPDATE
router.put("/:id", auth, memberController.updateMember);

// DELETE
router.delete("/:id", auth, authorize("ADMIN"), memberController.deleteMember);

module.exports = router;
