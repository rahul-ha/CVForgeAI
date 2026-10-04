const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const passport = require("passport");
const jwt = require("jsonwebtoken");


// 🔥 helper to generate token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};


// ================= GOOGLE =================

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {

    const token = generateToken(req.user);

    res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`);
  }
);


// ================= GITHUB =================

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  (req, res) => {

    const token = generateToken(req.user);

    res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`);
  }
);


// ================= NORMAL AUTH =================

router.post("/register", registerUser);
router.post("/login", loginUser);


// 🔐 Protected test route
router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;