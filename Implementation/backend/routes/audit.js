const express = require("express");
const router = express.Router();
const AuditLog = require("../models/AuditLog");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const auditController = require("../controllers/auditController");

router.get("/", auth, authorize("ADMIN"), auditController.getAuditLogs);

module.exports = router;
