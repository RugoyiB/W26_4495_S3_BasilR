require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
const { fetchAllChurchContent } = require("./services/websiteScraper");

const app = express();

global.churchContent = "";

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

(async () => {
  global.churchContent = await fetchAllChurchContent();
})();

// Routes
app.use("/api/members", require("./routes/members"));
app.use("/api/attendance", require("./routes/attendance"));
app.use("/api/chatbot", require("./routes/chatbot"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));

// Default route → welcome.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/welcome.html"));
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend")));

const open = require("open").default;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  open(`http://localhost:${PORT}`);
});