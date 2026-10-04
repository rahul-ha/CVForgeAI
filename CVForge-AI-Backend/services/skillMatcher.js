function compareSkills(jdSkills, resumeSkills){

const jd = jdSkills.map(s => s.toLowerCase());
const resume = resumeSkills.map(s => s.toLowerCase());

const matched = jd.filter(skill => resume.includes(skill));

const missing = jd.filter(skill => !resume.includes(skill));

return {
matchedSkills: matched,
missingSkills: missing
};

}

module.exports = { compareSkills };