export function calculateRisk(userSymptoms, diseaseData) {
  let totalScore = 0;
  let matchedPatterns = [];

  diseaseData.patterns.forEach(pattern => {
    const matches = pattern.symptoms.filter(symptom =>
      userSymptoms.includes(symptom)
    );

    if (matches.length >= Math.ceil(pattern.symptoms.length / 2)) {
      totalScore += pattern.weight;
      matchedPatterns.push({
        patternId: pattern.id,
        matchedSymptoms: matches,
        weight: pattern.weight
      });
    }
  });

  return {
    riskScore: Math.min(totalScore, 1),
    matchedPatterns
  };
}
