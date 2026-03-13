const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logAction = require("../services/auditLogger");

exports.login = async (req, res) => {
  console.log("LOGIN BODY:", req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log("USER FOUND:", user);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log("PASSWORD MATCH:", isMatch);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  await logAction(
    req,
    "LOGIN",
    "Auth",
    `${user.firstName} ${user.lastName} logged into the system`,
    user._id
  );

  res.json({
    token,
    role: user.role
    // name: user.name
  });
};
