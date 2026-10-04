const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
const connectDB = require("./config/db");
const session = require("express-session");
const passport = require("./config/passport");



const app = express();

// Connect Database
connectDB();


// ✅ CORS (VERY IMPORTANT for OAuth + Vercel)
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);


// ✅ Body parser
app.use(express.json());


// ✅ SESSION (MUST BE BEFORE PASSPORT)
app.use(
  session({
    secret: "oauthsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // change to true after deployment
      httpOnly: true,
    },
  })
);


// ✅ PASSPORT
app.use(passport.initialize());
app.use(passport.session());


// ✅ ROUTES (MUST BE AFTER PASSPORT)
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/resume", require("./routes/resumeRoutes"));
app.use("/api/ats", require("./routes/atsRoutes"));


// ✅ Health route
app.get("/", (req, res) => {
  res.send("ATS Backend Running 🚀");
});

// ✅ ADD THIS (for uptime robot)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log("ENV CHECK:", process.env.GROQ_API_KEY ? "LOADED" : "NOT LOADED");