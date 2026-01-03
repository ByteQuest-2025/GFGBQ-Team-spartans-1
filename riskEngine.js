// riskEngine.js
import { matchSymptoms } from './patterns.js';
import alagilleData from '../data/alagille.json' assert { type: 'json' };
import userData from '../data/userData.json' assert { type: 'json' };

export function calculateRisk(userSymptoms, userData, diseaseData=alagilleData) {
    // 1️⃣ Symptom match risk
    const matchedSymptoms = matchSymptoms(userSymptoms, diseaseData.symptoms);
    let symptomRisk = matchedSymptoms.reduce((sum, s) => sum + diseaseData.symptoms[s], 0);

    // 2️⃣ Lab trends risk
    let labRisk = 0;
    if(userData.lab.liverEnzymes > 40) labRisk += 0.3;
    if(userData.lab.cholesterol > 200) labRisk += 0.2;

    // 3️⃣ Lifestyle & mental health risk
    let lifestyleRisk = 0;
    if(userData.lifestyle.sleepHours < 7) lifestyleRisk += 0.1;
    if(userData.mentalHealth.stressLevel > 6) lifestyleRisk += 0.2;

    // 4️⃣ Family history
    let familyRisk = 0;
    if(userData.familyHistory.rareDiseases.includes(diseaseData.name)) familyRisk += 0.3;

    // Total risk capped at 1
    let totalRisk = Math.min(1, symptomRisk + labRisk + lifestyleRisk + familyRisk);

    return { totalRisk, matchedSymptoms };
}
