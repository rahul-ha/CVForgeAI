const { generateAIResponse } = require("./aiService");

async function generateInsights(resumeText, jobDescription){

const prompt = `
You are an ATS resume optimization engine.

Analyze the resume against the job description.

IMPORTANT RULES:
- Return AT LEAST 5 improvements
- Return AT LEAST 5 rewritten bullets
- Suggestions must be practical and specific
- Bullets must be strong, quantified and ATS optimized
- No generic advice
- No markdown
- No explanation

Return STRICT JSON:

{
"missingSkills":[
{"skill":"example","priority":"High"}
],

"improvements":[
"Improvement 1",
"Improvement 2",
"Improvement 3",
"Improvement 4",
"Improvement 5"
],

"rewrittenBullets":[
"Bullet 1",
"Bullet 2",
"Bullet 3",
"Bullet 4",
"Bullet 5"
]
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

try {

let parsed = await generateAIResponse(prompt);

// ✅ HARD SAFETY CHECK
if(!parsed || typeof parsed !== "object"){
throw new Error("Invalid AI JSON");
}

// ✅ ENSURE ARRAYS EXIST
parsed.improvements = parsed.improvements || [];
parsed.rewrittenBullets = parsed.rewrittenBullets || [];
parsed.missingSkills = parsed.missingSkills || [];

// ✅ MINIMUM COUNT GUARANTEE
while(parsed.improvements.length < 5){
parsed.improvements.push("Add more quantified achievements aligned with job requirements.");
}

while(parsed.rewrittenBullets.length < 5){
parsed.rewrittenBullets.push("Developed scalable system components improving performance and reliability.");
}

return parsed;

} catch (err){

console.log("AI parsing failed → fallback");

return {
missingSkills:[],
improvements:[
"Add quantified achievements in experience section.",
"Include more job-specific technical keywords.",
"Strengthen action verbs in bullet points.",
"Show measurable impact in projects.",
"Improve alignment with job description."
],
rewrittenBullets:[
"Designed scalable backend architecture improving API response time by 40%.",
"Implemented CI/CD pipelines reducing deployment time by 60%.",
"Optimized database queries improving system efficiency by 35%.",
"Developed modular microservices supporting high-traffic workloads.",
"Built automated testing workflows improving release reliability."
]
};

}

}

module.exports = { generateInsights };