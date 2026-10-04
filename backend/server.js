const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const adminRoutes = require("./routes/adminRoutes");
const projectRoutes = require("./routes/projectRoutes");
const profileRoutes = require("./routes/profileRoutes");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();

const app = express();

// =========================
// MIDDLEWARE
// =========================

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
].filter(Boolean);

app.use(
  cors({
    origin: (o, cb) => cb(null, !o || allowedOrigins.includes(o) || /\.vercel\.app$/.test(o)),
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// =========================
// ROUTES
// =========================

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/profile",
  profileRoutes
);

app.use(
  "/api/contact",
  contactRoutes
);

// =========================
// HOME ROUTE
// =========================

app.get("/", (req, res) => {
  res.json({
    message:
      "Portfolio Backend API is running 🚀",
  });
});

// =========================
// DATABASE CONNECTION
// =========================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(
      "MongoDB Connected ✅"
    );

    const PORT =
      process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "MongoDB Connection Failed ❌"
    );

    console.error(
      error.message
    );
  });
  