function calculateATSScore(jdSkills, matchedSkills){

  if(!jdSkills.length){
    return {
      overallMatch: 0,
      breakdown:{
        keywordMatch:0,
        technicalSkills:0,
        experience:0,
        bulletStrength:0
      },
      careerReadinessScore:0
    }
  }

  const keywordMatch = Math.round(
    (matchedSkills.length / jdSkills.length) * 100
  );

  const technicalSkills = Math.min(keywordMatch + 10, 100);
  const experience = Math.max(keywordMatch - 5, 0);
  const bulletStrength = Math.max(keywordMatch - 10, 0);

  const overallMatch = Math.round(
    (keywordMatch * 0.35) +
    (technicalSkills * 0.25) +
    (experience * 0.20) +
    (bulletStrength * 0.20)
  );

  const careerReadinessScore = Number(
    ((overallMatch / 100) * 10).toFixed(1)
  );

  return {
    overallMatch,
    breakdown:{
      keywordMatch,
      technicalSkills,
      experience,
      bulletStrength
    },
    careerReadinessScore
  };
}

module.exports = { calculateATSScore };