import { normalizeInputs } from './engine/patterns.js';
import { calculateRisk } from './engine/riskEngine.js';
import { getRecommendations } from './engine/recommendations.js';

// Same question sets as before
const nutritionQuestions = [
    { q: "How often does the child consume foods rich in fat-soluble vitamins (e.g., fortified dairy, leafy greens, carrots)?", options: ["Daily (4)", "Several times/week (3)", "Occasionally (2)", "Rarely (1)", "Never (0)"] },
    { q: "Is the child achieving expected growth milestones (height/weight)?", options: ["Yes, fully (4)", "Mostly (3)", "Some delay (2)", "Significant delay (1)", "Failure to thrive (0)"] },
    { q: "Any signs of fat malabsorption (pale, bulky, foul-smelling stools)?", options: ["None (4)", "Rare (3)", "Occasional (2)", "Frequent (1)", "Daily (0)"] },
    { q: "Does the child have a varied diet including proteins, fruits, and vegetables?", options: ["Very varied (4)", "Moderately varied (3)", "Limited variety (2)", "Very limited (1)", "Highly restricted (0)"] },
    { q: "Is the child taking any vitamin supplements (A, D, E, K)?", options: ["Yes, regularly (4)", "Sometimes (2)", "No (0)"] },
    { q: "Appetite level:", options: ["Excellent (4)", "Good (3)", "Fair (2)", "Poor (1)", "Very poor (0)"] }
];

const stressQuestions = [
    { q: "How often does the child appear irritable or easily upset?", options: ["Never (0)", "Rarely (1)", "Sometimes (2)", "Often (3)", "Always (4)"] },
    { q: "How often does the child have trouble falling or staying asleep?", options: ["Never (0)", "Rarely (1)", "Sometimes (2)", "Often (3)", "Always (4)"] },
    { q: "How often does the caregiver feel overwhelmed managing health concerns?", options: ["Never (0)", "Rarely (1)", "Sometimes (2)", "Often (3)", "Always (4)"] },
    { q: "Frequency of mood swings or emotional outbursts:", options: ["Never (0)", "Rarely (1)", "Sometimes (2)", "Often (3)", "Always (4)"] },
    { q: "How often does the child withdraw from activities or social interaction?", options: ["Never (0)", "Rarely (1)", "Sometimes (2)", "Often (3)", "Always (4)"] }
];

function renderQuestions(questions, containerId, calculateBtnId, targetFieldId) {
    const container = document.getElementById(containerId);
    container.innerHTML = questions.map((q, i) => `
        <div class="question">
            <p><strong>${i+1}. ${q.q}</strong></p>
            ${q.options.map(opt => {
                const value = opt.match(/\((\d+)\)/)[1];
                const text = opt.split(' (')[0];
                return `<label><input type="radio" name="q\( {i}" value=" \){value}"> ${text}</label>`;
            }).join('')}
        </div>
    `).join('');

    document.getElementById(calculateBtnId).onclick = () => {
        let total = 0;
        const maxPerQuestion = 4;
        let answered = true;
        questions.forEach((_, i) => {
            const selected = document.querySelector(`input[name="q${i}"]:checked`);
            if (selected) total += parseInt(selected.value);
            else answered = false;
        });
        if (!answered) {
            alert("Please answer all questions.");
            return;
        }
        const score = Math.round((total / (questions.length * maxPerQuestion)) * 100);
        document.getElementById(targetFieldId).value = score;
        document.querySelector(`#${containerId}`).closest('.modal').style.display = 'none';
    };
}

// Modal controls
document.getElementById('assessNutrition').onclick = () => {
    document.getElementById('nutritionModal').style.display = 'block';
    renderQuestions(nutritionQuestions, 'nutritionQuestions', 'calculateNutrition', 'nutrition');
};
document.getElementById('assessStress').onclick = () => {
    document.getElementById('stressModal').style.display = 'block';
    renderQuestions(stressQuestions, 'stressQuestions', 'calculateStress', 'stress');
};

document.querySelectorAll('.close').forEach(span => {
    span.onclick = () => span.closest('.modal').style.display = 'none';
});
window.onclick = (e) => {
    if (e.target.classList.contains('modal')) e.target.style.display = 'none';
};

// Risk calculation
document.getElementById('riskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nutrition = parseFloat(document.getElementById('nutrition').value);
    const stress = parseFloat(document.getElementById('stress').value);
    
    if (isNaN(nutrition) || isNaN(stress)) {
        alert("Please provide values for Nutrition and Stress scores (use Assess buttons if needed).");
        return;
    }
    
    const userData = {
        family_history: parseInt(document.getElementById('family_history').value),
        bilirubin_trend: parseFloat(document.getElementById('bilirubin_trend').value) || 0,
        cholesterol: parseFloat(document.getElementById('cholesterol').value) || 0,
        ggt: parseFloat(document.getElementById('ggt').value) || 0,
        activity: parseFloat(document.getElementById('activity').value) || 0,
        sleep: parseFloat(document.getElementById('sleep').value) || 0,
        nutrition: nutrition,
        stress: stress
    };
    
    const normalized = normalizeInputs(userData);
    const riskProb = calculateRisk(normalized);
    const recs = getRecommendations(riskProb);
    
    document.getElementById('riskScore').innerHTML = `Estimated Early Risk Probability: ${(riskProb * 100).toFixed(1)}%`;
    document.getElementById('recommendations').innerHTML = `<strong>Preventive Recommendations:</strong><p>${recs}</p>`;
    document.getElementById('results').style.display = 'block';
    window.scrollTo({ top: document.getElementById('results').offsetTop, behavior: 'smooth' });
});
