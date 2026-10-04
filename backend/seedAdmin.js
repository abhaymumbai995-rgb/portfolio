require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Admin.deleteMany({});
  await Admin.create({
    name: "Abhay",
    email: "tumhara@email.com",
    password: await bcrypt.hash("STRONG_PASSWORD", 12),
  });
  console.log("Admin created");
  process.exit();
})();