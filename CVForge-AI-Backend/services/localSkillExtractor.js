const skillDB = require("../utils/skillDB");

function extractSkillsLocal(text) {

  text = text.toLowerCase();

  const allSkills = Object.values(skillDB).flat();

  const found = [];

  allSkills.forEach(skill => {
    if (text.includes(skill)) {
      found.push(skill);
    }
  });

  const uniqueSkills = [...new Set(found)];

  return {
    skills: uniqueSkills,
    confidence: uniqueSkills.length / allSkills.length
  };
}

module.exports = extractSkillsLocal;