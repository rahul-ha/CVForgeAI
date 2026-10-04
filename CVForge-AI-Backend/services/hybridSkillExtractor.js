const extractSkillsLocal = require("./localSkillExtractor");

async function extractSkillsHybrid(text) {
  const localResult = extractSkillsLocal(text);
  return localResult.skills;
}

module.exports = extractSkillsHybrid;