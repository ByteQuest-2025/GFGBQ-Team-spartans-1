import { loadDiseasePattern } from './engine/patterns.js';
import { calculateRisk } from './engine/riskEngine.js';

async function runDemo() {
  const diseaseData = await loadDiseasePattern();

  // Demo input (will become UI later)
  const userSymptoms = [
    "jaundice",
    "itching",
    "heart_murmur",
    "poor_growth"
  ];

  const result = calculateRisk(userSymptoms, diseaseData);
  console.log("Risk Analysis:", result);
}

runDemo();
