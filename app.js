import { normalizeInputs } from './engine/patterns.js';
import { calculateRisk } from './engine/riskEngine.js';
import { getRecommendations } from './engine/recommendations.js';

document.getElementById('riskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userData = {
        family_history: parseInt(document.getElementById('family_history').value),
        bilirubin_trend: parseFloat(document.getElementById('bilirubin_trend').value) || 0,
        cholesterol: parseFloat(document.getElementById('cholesterol').value) || 0,
        ggt: parseFloat(document.getElementById('ggt').value) || 0,
        activity: parseFloat(document.getElementById('activity').value) || 0,
        sleep: parseFloat(document.getElementById('sleep').value) || 0,
        nutrition: parseFloat(document.getElementById('nutrition').value) || 0,
        stress: parseFloat(document.getElementById('stress').value) || 0
    };
    
    const normalized = normalizeInputs(userData);
    const riskProb = calculateRisk(normalized);
    const recs = getRecommendations(riskProb);
    
    document.getElementById('riskScore').innerHTML = `Estimated Early Risk Probability: ${(riskProb * 100).toFixed(1)}%`;
    document.getElementById('recommendations').innerHTML = `<strong>Preventive Recommendations:</strong><p>${recs}</p>`;
    document.getElementById('results').style.display = 'block';
});
