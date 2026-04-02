const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");

router.post("/login", login);

router.post("/logout", async (req, res) => {
    try {
        const userId = req.user.id; // from auth middleware

        await User.findByIdAndUpdate(userId, {
            isActive: false,
            lastSeen: new Date()
        });

        res.json({ message: "Logged out successfully" });

    } catch (err) {
        res.status(500).json({ message: "Logout failed" });
    }
});

module.exports = router;
