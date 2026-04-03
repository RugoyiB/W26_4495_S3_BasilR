const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logAction = require("../services/auditLogger");

exports.login = async (req, res) => {
  console.log("LOGIN BODY:", req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email });
    wpfi
  console.log("USER FOUND:", user);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log("PASSWORD MATCH:", isMatch);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  // Log login action
  await logAction(
    { user: { id: user._id }, ip: req.ip },
    "LOGIN",
    "Auth",
    `${user.name} logged into the system`,
    null,
    null,
    user._id
  );
  //Mark user as active
  user.isActive = true;
  user.lastSeen = new Date();
  await user.save();

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.json({
    token,
    role: user.role
  });
};
