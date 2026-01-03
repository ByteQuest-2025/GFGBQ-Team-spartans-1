import { matchSymptoms } from './patterns.js';

export function calculateRisk(userSymptoms, userData, diseaseData){
    const matchedSymptoms = matchSymptoms(userSymptoms, diseaseData.symptoms);
    let symptomRisk = matchedSymptoms.reduce((sum, s) => sum + diseaseData.symptoms[s], 0);

    // Lab-based risk
    let labRisk = 0;
    if(userData.lab.liverEnzymes > 40) labRisk += 0.3;
    if(userData.lab.cholesterol > 200) labRisk += 0.2;

    // Lifestyle & mental health
    let lifestyleRisk = 0;
    if(userData.lifestyle.sleepHours < 7) lifestyleRisk += 0.1;
    if(userData.mentalHealth.stressLevel > 6) lifestyleRisk += 0.2;

    // Family history
    let familyRisk = 0;
    if(userData.familyHistory.rareDiseases.includes(diseaseData.name)) familyRisk += 0.3;

    // Total capped at 1
    let totalRisk = Math.min(1, symptomRisk + labRisk + lifestyleRisk + familyRisk);

    return { totalRisk, matchedSymptoms };
}
