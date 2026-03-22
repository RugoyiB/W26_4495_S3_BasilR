const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const {
  createAttendance,
  getAllAttendance,
  getAttendanceReport
} = require("../controllers/attendanceController");

// CRUD
router.post("/", auth, createAttendance);
router.get("/", auth, getAllAttendance);

router.get("/report",
  auth,
  authorize("ADMIN", "STAFF", "PASTOR", "TREASURER"),
  getAttendanceReport
);

module.exports = router;