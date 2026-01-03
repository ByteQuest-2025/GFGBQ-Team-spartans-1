// app.js
import { calculateRisk } from './engine/riskEngine.js';
import { getRecommendations } from './engine/recommendations.js';
import alagilleData from './data/alagille.json' assert { type: 'json' };

document.addEventListener("DOMContentLoaded", () => {
    const symptomInput = document.getElementById("symptomInput");
    const checkRiskBtn = document.getElementById("checkRisk");
    const riskResult = document.getElementById("riskResult");
    const riskBar = document.getElementById("riskBar");
    const symptomTags = document.getElementById("symptomTags");

    checkRiskBtn.addEventListener("click", () => {
        // 1️⃣ Get symptoms from input
        const userSymptoms = symptomInput.value.split(",").map(s => s.trim().toLowerCase());

        // 2️⃣ Calculate risk
        const { totalRisk, matchedSymptoms } = calculateRisk(userSymptoms, null, alagilleData);

        // 3️⃣ Update risk bar
        const riskPercent = Math.round(totalRisk * 100);
        riskBar.style.width = riskPercent + "%";
        riskBar.style.background = totalRisk > 0.7 ? "linear-gradient(90deg,#ff512f,#dd2476)"
                                : totalRisk > 0.4 ? "linear-gradient(90deg,#ffb347,#ffcc33)"
                                : "linear-gradient(90deg,#00c6ff,#0072ff)";

        // 4️⃣ Update risk result text
        riskResult.innerHTML = `<strong>Risk Score:</strong> ${riskPercent}%<br>${getRecommendations(totalRisk)}`;

        // 5️⃣ Show matched symptom tags
        symptomTags.innerHTML = "";
        matchedSymptoms.forEach(sym => {
            const tag = document.createElement("span");
            tag.classList.add("tag");
            tag.textContent = sym;
            symptomTags.appendChild(tag);
        });

        // 6️⃣ Clear input
        symptomInput.value = "";
    });
});
