const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const financeController = require("../controllers/financeController");

// Create finance record
router.post("/", auth,
  authorize("ADMIN", "TREASURER"),
  financeController.createFinance);

// Get all finance records
router.get(
  "/",
  auth,
  financeController.getAllFinance
);

// Finance report
router.get(
  "/report",
  auth,
  authorize("ADMIN", "TREASURER"),
  financeController.getFinanceReport
);

// Delete finance record
router.delete("/:id", auth, authorize("ADMIN", "TREASURER"), financeController.deleteFinance);

module.exports = router;