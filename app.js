import { calculateRisk } from './engine/riskEngine.js';
import { getRecommendations } from './engine/recommendations.js';

async function loadJSON(path){
    const res = await fetch(path);
    return await res.json();
}

document.addEventListener("DOMContentLoaded", async () => {
    const alagilleData = await loadJSON('./data/alagille.json');
    const userData = await loadJSON('./data/userData.json');

    const symptomInput = document.getElementById("symptomInput");
    const checkRiskBtn = document.getElementById("checkRisk");
    const riskResult = document.getElementById("riskResult");
    const riskBar = document.getElementById("riskBar");
    const symptomTags = document.getElementById("symptomTags");

    checkRiskBtn.addEventListener("click", () => {
        const userSymptoms = symptomInput.value.split(",").map(s => s.trim().toLowerCase());

        const { totalRisk, matchedSymptoms } = calculateRisk(userSymptoms, userData, alagilleData);

        const riskPercent = Math.round(totalRisk*100);
        riskBar.style.width = riskPercent + "%";
        riskBar.style.background = totalRisk > 0.7 ? "linear-gradient(90deg,#ff512f,#dd2476)" :
                              totalRisk > 0.4 ? "linear-gradient(90deg,#ffb347,#ffcc33)" :
                              "linear-gradient(90deg,#00c6ff,#0072ff)";

        riskResult.innerHTML = `<strong>Risk Score:</strong> ${riskPercent}%<br>${getRecommendations(totalRisk)}`;

        symptomTags.innerHTML = "";
        matchedSymptoms.forEach(sym => {
            const tag = document.createElement("span");
            tag.classList.add("tag");
            tag.textContent = sym;
            symptomTags.appendChild(tag);
        });

        symptomInput.value = "";
    });
});
