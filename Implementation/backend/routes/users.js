const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController"); 
const { createUser } = require("../controllers/userController");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

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
