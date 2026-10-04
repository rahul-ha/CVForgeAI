const { generateGeminiJSON } = require("./geminiService");

async function extractSkillsFromJD(jobDescription) {

const prompt = `
You are an ATS skill extractor.

Extract ONLY the important technical skills from this job description.

Rules:
- Return only individual skills
- No explanations
- No long phrases
- No sentences
- Skills should be 1-3 words maximum

Examples of correct skills:
["Java","Spring Boot","React","Docker","AWS","CI/CD","MongoDB","REST API"]

Return strictly JSON:

{
 "skills": []
}

Job Description:
${jobDescription}
`;

return await generateGeminiJSON(prompt);
}

async function extractSkillsFromResume(resumeText){

const prompt = `
Extract all relevant professional and technical skills
from this resume.

Return ONLY JSON.

{
 "skills":[]
}

Resume:
${resumeText}
`;

return await generateGeminiJSON(prompt);

}

module.exports = {
extractSkillsFromJD,
extractSkillsFromResume
};