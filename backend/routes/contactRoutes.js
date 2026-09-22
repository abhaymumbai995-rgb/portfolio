const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
// =========================
// CREATE CONTACT MESSAGE
// =========================

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      message,
    } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message:
          "Name, email and message are required.",
      });
    }
const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({
    message: "Please provide a valid email address.",
  });
}
if (name.length > 100) {
  return res.status(400).json({
    message: "Name is too long.",
  });
}

if (email.length > 254) {
  return res.status(400).json({
    message: "Email is too long.",
  });
}

if (message.length > 2000) {
  return res.status(400).json({
    message:
      "Message must be 2000 characters or less.",
  });
}
    const contact = await Contact.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      message:
        "Message sent successfully.",
      contact,
    });

  } catch (error) {
    console.error(
      "Contact create error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to send message.",
    });
  }
});

// =========================
// GET CONTACT MESSAGES
// =========================

router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const messages =
        await Contact.find().sort({
          createdAt: -1,
        });

      res.json({
        messages,
      });

    } catch (error) {
      console.error(
        "Contact fetch error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to fetch messages.",
      });
    }
  }
);

// =========================
// DELETE CONTACT MESSAGE
// =========================
// DELETE CONTACT MESSAGE - ADMIN ONLY
router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      if (
        !mongoose.Types.ObjectId.isValid(
          req.params.id
        )
      ) {
        return res.status(400).json({
          message: "Invalid message ID.",
        });
      }

      const message =
        await Contact.findByIdAndDelete(
          req.params.id
        );

      if (!message) {
        return res.status(404).json({
          message:
            "Message not found.",
        });
      }

      res.json({
        message:
          "Message deleted successfully.",
      });

    } catch (error) {
      console.error(
        "Contact delete error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to delete message.",
      });
    }
  }
);

module.exports = router;