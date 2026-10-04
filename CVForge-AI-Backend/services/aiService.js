const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateAIResponse = async (prompt) => {
  try {
    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL,
      temperature: 0.2,

      response_format: { type: "json_object" }, // ⭐ CRITICAL FIX

      messages: [
        {
          role: "system",
          content:
            "You are an ATS resume optimization engine. Output ONLY valid JSON. No markdown. No explanation.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content;

    return JSON.parse(raw);

  } catch (error) {
    console.error("GROQ AI ERROR:", error);
    return null;
  }
};

module.exports = { generateAIResponse };