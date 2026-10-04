const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { analyzeATS } = require("../controllers/atsController");
const { compareResumes } = require("../controllers/atsController");

router.post("/analyze", protect, analyzeATS);
router.post("/compare", protect, compareResumes);

module.exports = router;