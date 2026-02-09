require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI);

(async () => {
  await User.create({
    name: "SysAdmin",
    email: "admin@church.com",
    password: "admin123",
    role: "ADMIN"
  });

  console.log("Admin created");
  process.exit();
})();
