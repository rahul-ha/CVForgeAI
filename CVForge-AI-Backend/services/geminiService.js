const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateGeminiJSON(prompt) {
  try {

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    let text = response.text();

    text = text.replace(/```json/g, "")
               .replace(/```/g, "")
               .trim();

    return JSON.parse(text);

  } catch (error) {

    console.error("Gemini Error:", error);

    return null;
  }
}

module.exports = { generateGeminiJSON };