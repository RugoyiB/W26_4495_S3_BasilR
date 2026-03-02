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
// router.post("/", createAttendance);
// router.get("/", getAllAttendance);
router.post("/", auth, createAttendance);
router.get("/", auth, getAllAttendance);


// Report
// router.get("/report", getAttendanceReport);

router.get("/report",
  auth,
  authorize("ADMIN", "TREASURER"),
  getAttendanceReport
);

module.exports = router;




// const express = require("express");
// const Attendance = require("../models/Attendance");
// const router = express.Router();

// // Record attendance
// router.post("/", async (req, res) => {
//   const record = new Attendance(req.body);
//   await record.save();
//   res.json(record);
// });


// // Get attendance records for a member
// router.get("/:memberId", async (req, res) => {
//   const records = await Attendance.find({ memberId: req.params.memberId });
//   res.json(records);
// });

// module.exports = router;