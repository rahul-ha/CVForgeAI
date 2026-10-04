module.exports = function detectRole(jdText) {
  jdText = jdText.toLowerCase();

  if (jdText.includes("backend")) return "backend";
  if (jdText.includes("frontend")) return "frontend";
  if (jdText.includes("data scientist")) return "data";
  if (jdText.includes("machine learning")) return "data";
  if (jdText.includes("devops")) return "devops";

  return "general";
};