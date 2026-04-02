const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { createUser } = require("../controllers/userController");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const User = require("../models/User");

router.get("/active", async (req, res) => {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const count = await User.countDocuments({ isActive: true, lastSeen: { $gte: fiveMinutesAgo } });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Error fetching active users" });
  }
});

router.get("/active-users", async (req, res) => {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const users = await User.find({
      lastSeen: { $gte: fiveMinutesAgo }
    });

    res.json(users);

  } catch (err) {
    res.status(500).json({ message: "Error fetching active users" });
  }
});

router.post(
  "/",
  auth,
  authorize("ADMIN"),
  createUser
);
// ADMIN ONLY
router.get("/", auth, authorize("ADMIN"), userController.getAllUsers);
router.get("/:id", auth, authorize("ADMIN"), userController.getUserById);
router.put("/:id", auth, authorize("ADMIN"), userController.updateUser);
router.delete("/:id", auth, authorize("ADMIN"), userController.deleteUser);

module.exports = router;
