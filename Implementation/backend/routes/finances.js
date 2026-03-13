const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const auditLog = require("../middleware/auditMiddleware");

const {
  createFinance,
  getAllFinance,
  getFinanceReport
} = require("../controllers/financeController");

router.post("/", auth, createFinance);
router.get("/", auth, getAllFinance);
router.get("/report", getFinanceReport);

router.get("/report",
  auth,
  authorize("ADMIN", "TREASURER"),
  getFinanceReport
);

router.post(
  "/",
  auditLog("Create Finance Record", "Finance"),
  financeController.createFinance
);

router.delete(
  "/:id",
  auditLog("Delete Finance Record", "Finance"),
  financeController.deleteFinance
);

module.exports = router;
