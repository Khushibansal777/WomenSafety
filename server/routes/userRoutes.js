const express = require("express");
const router = express.Router();
const {
  login,
  register,
  updateUserController,
} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.put("/update", updateUserController);
module.exports = router;
