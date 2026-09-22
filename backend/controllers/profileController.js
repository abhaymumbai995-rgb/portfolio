const Profile = require("../models/Profile");

// =========================
// GET PROFILE
// =========================

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found.",
      });
    }

    res.json({
      profile,
    });
  } catch (error) {
    console.error(
      "Get Profile Error:",
      error
    );

    res.status(500).json({
      message: "Server error.",
    });
  }
};

// =========================
// CREATE / UPDATE PROFILE
// =========================

const saveProfile = async (req, res) => {
  try {
    const {
      name,
      role,
      about,
      email,
      github,
      linkedin,
      profileImage,
    } = req.body;

    if (
      !name ||
      !role ||
      !about ||
      !email
    ) {
      return res.status(400).json({
        message:
          "Name, role, about and email are required.",
      });
    }

    let profile = await Profile.findOne();

    if (profile) {
      profile.name = name;
      profile.role = role;
      profile.about = about;
      profile.email = email;
      profile.github = github || "";
      profile.linkedin = linkedin || "";
      profile.profileImage =
        profileImage || "";

      await profile.save();

      return res.json({
        message:
          "Profile updated successfully.",
        profile,
      });
    }

    profile = await Profile.create({
      name,
      role,
      about,
      email,
      github: github || "",
      linkedin: linkedin || "",
      profileImage:
        profileImage || "",
    });

    res.status(201).json({
      message:
        "Profile created successfully.",
      profile,
    });
  } catch (error) {
    console.error(
      "Save Profile Error:",
      error
    );

    res.status(500).json({
      message: "Server error.",
    });
  }
};

module.exports = {
  getProfile,
  saveProfile,
};