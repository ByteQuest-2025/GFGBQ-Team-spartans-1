import { normalizeInputs } from './engine/patterns.js';
import { calculateRisk } from './engine/riskEngine.js';
import { getRecommendations } from './engine/recommendations.js';

// Nutrition Questions
const nutritionQuestions = [
    { q: "How often does the child consume foods rich in fat-soluble vitamins (e.g., fortified dairy, leafy greens, carrots)?", options: ["Daily (4)", "Several times/week (3)", "Occasionally (2)", "Rarely (1)", "Never (0)"] },
    { q: "Is the child achieving expected growth milestones (height/weight)?", options: ["Yes, fully (4)", "Mostly (3)", "Some delay (2)", "Significant delay (1)", "Failure to thrive (0)"] },
    { q: "Any signs of fat malabsorption (pale, bulky, foul-smelling stools)?", options: ["None (4)", "Rare (3)", "Occasional (2)", "Frequent (1)", "Daily (0)"] },
    { q: "Does the child have a varied diet including proteins, fruits, and vegetables?", options: ["Very varied (4)", "Moderately varied (3)", "Limited variety (2)", "Very limited (1)", "Highly restricted (0)"] },
    { q: "Is the child taking any vitamin supplements (A, D, E, K)?", options: ["Yes, regularly (4)", "Sometimes (2)", "No (0)"] },
    { q: "Appetite level:", options: ["Excellent (4)", "Good (3)", "Fair (2)", "Poor (1)", "Very poor (0)"] }
];

// Stress Questions
const stressQuestions = [
    { q: "How often does the child appear irritable or easily upset?", options: ["Never (0)", "Rarely (1)", "Sometimes (2)", "Often (3)", "Always (4)"] },
    { q: "How often does the child have trouble falling or staying asleep?", options: ["Never (0)", "Rarely (1)", "Sometimes (2)", "Often (3)", "Always (4)"] },
    { q: "How often does the caregiver feel overwhelmed managing health concerns?", options: ["Never (0)", "Rarely (1)", "Sometimes (2)", "Often (3)", "Always (4)"] },
    { q: "Frequency of mood swings or emotional outbursts:", options: ["Never (0)", "Rarely (1)", "Sometimes (2)", "Often (3)", "Always (4)"] },
    { q: "How often does the child withdraw from activities or social interaction?", options: ["Never (0)", "Rarely (1)", "Sometimes (2)", "Often (3)", "Always (4)"] }
];

// Function to render questions and attach calculation logic
function openAssessment(questions, modalId, containerId, calculateBtnId, targetFieldId) {
    const modal = document.getElementById(modalId);
    const container = document.getElementById(containerId);
    
    // Clear previous content
    container.innerHTML = '';
    
    // Render questions
    questions.forEach((q, i) => {
        const div = document.createElement('div');
        div.className = 'question';
        div.innerHTML = `
            <p><strong>${i + 1}. ${q.q}</strong></p>
            ${q.options.map(opt => {
                const value = opt.match(/\((\d+)\)/)[1];
                const text = opt.split(' (')[0];
                return `<label><input type="radio" name="q\( {i}" value=" \){value}"> ${text}</label>`;
            }).join('')}
        `;
        container.appendChild(div);
    });
    
    // Remove previous listener to avoid duplicates
    const calculateBtn = document.getElementById(calculateBtnId);
    calculateBtn.replaceWith(calculateBtn.cloneNode(true));
    document.getElementById(calculateBtnId).onclick = () => {
        let total = 0;
        const maxPerQuestion = 4;
        let allAnswered = true;
        
        questions.forEach((_, i) => {
            const selected = document.querySelector(`input[name="q${i}"]:checked`);
            if (selected) {
                total += parseInt(selected.value);
            } else {
                allAnswered = false;
            }
        });
        
        if (!allAnswered) {
            alert("Please answer all questions before calculating.");
            return;
        }
        
        const score = Math.round((total / (questions.length * maxPerQuestion)) * 100);
        document.getElementById(targetFieldId).value = score;
        modal.style.display = 'none';
    };
    
    modal.style.display = 'block';
}

// Event Listeners for Assess Buttons
document.getElementById('assessNutrition').addEventListener('click', () => {
    openAssessment(nutritionQuestions, 'nutritionModal', 'nutritionQuestions', 'calculateNutrition', 'nutrition');
});

document.getElementById('assessStress').addEventListener('click', () => {
    openAssessment(stressQuestions, 'stressModal', 'stressQuestions', 'calculateStress', 'stress');
});

// Close modals
document.querySelectorAll('.close').forEach(span => {
    span.addEventListener('click', () => {
        span.closest('.modal').style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Main Risk Calculation
document.getElementById('riskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nutrition = parseFloat(document.getElementById('nutrition').value);
    const stress = parseFloat(document.getElementById('stress').value);
    
    if (isNaN(nutrition) || isNaN(stress) || nutrition < 0 || nutrition > 100 || stress < 0 || stress > 100) {
        alert("Please provide valid Nutrition and Stress scores (0–100). Use the Assess buttons if needed.");
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
    
    document.getElementById('riskScore').innerHTML = `
        <h3>Estimated Early Risk Probability:</h3>
        <div style="font-size: 2.5rem; font-weight: bold; color: #166534;">${(riskProb * 100).toFixed(1)}%</div>
    `;
    document.getElementById('recommendations').innerHTML = `
        <strong>Preventive Recommendations:</strong>
        <p style="margin-top: 10px; line-height: 1.6;">${recs}</p>
    `;
    document.getElementById('results').style.display = 'block';
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
});
