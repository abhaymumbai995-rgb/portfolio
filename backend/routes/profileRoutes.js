const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  getProfile,
  saveProfile,
} = require("../controllers/profileController");

const router = express.Router();

// Public - portfolio profile read
router.get("/", getProfile);

// Admin protected - profile create/update
router.put(
  "/",
  authMiddleware,
  saveProfile
);

module.exports = router;