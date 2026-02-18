const express = require("express");
const router = express.Router();
const { chatbotReply } = require("../controllers/chatbotController");

router.post("/", chatbotReply);

module.exports = router;
