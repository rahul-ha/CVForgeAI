const Resume = require("../models/Resume");

// ✅ NEW HYBRID EXTRACTOR
const extractSkills = require("../services/hybridSkillExtractor");

const { compareSkills } = require("../services/skillMatcher");
const { calculateATSScore } = require("../services/atsScorer");
const { generateInsights } = require("../services/aiInsights");


// =============================
// ATS ANALYSIS
// =============================

exports.analyzeATS = async (req, res) => {
  try {

    const { resumeId, jobDescription } = req.body;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const resumeText = resume.extractedText;

    // ✅ HYBRID EXTRACTION (LOCAL + AI FALLBACK)
    const jdSkills = await extractSkills(jobDescription);
    const resumeSkills = await extractSkills(resumeText);

    // 🔹 Compare skills
    const { matchedSkills, missingSkills } = compareSkills(jdSkills, resumeSkills);

    // 🔹 Calculate ATS score
    const scoring = calculateATSScore(jdSkills, matchedSkills);

    // 🔹 Generate AI insights (ONLY AI CALL NOW)
    const aiInsights = await generateInsights(resumeText, jobDescription);

    res.json({
      overallMatch: scoring.overallMatch,
      breakdown: scoring.breakdown,
      careerReadinessScore: scoring.careerReadinessScore,
      missingKeywords: missingSkills,
      aiInsights
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "ATS analysis failed" });

  }
};


// =============================
// RESUME COMPARISON (kept for future use)
// =============================

exports.compareResumes = async (req, res) => {
  try {

    const { resumeIdA, resumeIdB, jobDescription } = req.body;

    const resumeA = await Resume.findById(resumeIdA);
    const resumeB = await Resume.findById(resumeIdB);

    if (!resumeA || !resumeB) {
      return res.status(404).json({ message: "One or both resumes not found" });
    }

    if (
      resumeA.user.toString() !== req.user._id.toString() ||
      resumeB.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const resumeTextA = resumeA.extractedText;
    const resumeTextB = resumeB.extractedText;

    // ✅ HYBRID JD SKILLS
    const jdSkills = await extractSkills(jobDescription);

    // 🔹 Resume A
    const skillsA = await extractSkills(resumeTextA);
    const { matchedSkills: matchedA } = compareSkills(jdSkills, skillsA);
    const scoreA = calculateATSScore(jdSkills, matchedA);

    // 🔹 Resume B
    const skillsB = await extractSkills(resumeTextB);
    const { matchedSkills: matchedB } = compareSkills(jdSkills, skillsB);
    const scoreB = calculateATSScore(jdSkills, matchedB);

    res.json({

      resumeA: {
        overallMatch: scoreA.overallMatch,
        careerReadinessScore: scoreA.careerReadinessScore
      },

      resumeB: {
        overallMatch: scoreB.overallMatch,
        careerReadinessScore: scoreB.careerReadinessScore
      },

      improvement: {
        matchImprovement:
          scoreB.overallMatch - scoreA.overallMatch,

        readinessImprovement:
          scoreB.careerReadinessScore - scoreA.careerReadinessScore
      }

    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Comparison failed" });

  }
};