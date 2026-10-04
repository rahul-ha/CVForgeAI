const fs = require("fs");
const pdfParse = require("pdf-parse");
const Resume = require("../models/Resume");

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Read PDF file
    const dataBuffer = fs.readFileSync(req.file.path);

    // Extract text
    const data = await pdfParse(dataBuffer);
    const extractedText = data.text;

    // Save to DB
    const resume = await Resume.create({
      user: req.user._id,
      fileName: req.file.filename,
      extractedText,
    });
    
    //delete uploaded file after parsing
    fs.unlinkSync(req.file.path);

    
    res.status(201).json({
  message: "Resume uploaded successfully",
  resume,
  preview: extractedText.substring(0, 500),
});

  } catch (error) {
  console.error("Upload Error:", error);
  res.status(500).json({ 
    message: "Resume upload failed",
    error: error.message 
  });
}
};