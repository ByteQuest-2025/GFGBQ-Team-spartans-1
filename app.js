document.getElementById("checkRisk").addEventListener("click", function() {
    // Get user input
    const input = document.getElementById("symptomInput").value.toLowerCase();
    const symptoms = input.split(',').map(s => s.trim());

    // Risk engine (example, can expand)
    let riskScore = 0;
    let matchedSymptoms = [];

    const symptomDatabase = {
        jaundice: 0.5,
        itching: 0.3,
        fatigue: 0.2,
        heartDefect: 0.4,
        cholestasis: 0.4
    };

    symptoms.forEach(symptom => {
        if (symptomDatabase[symptom]) {
            riskScore += symptomDatabase[symptom];
            matchedSymptoms.push(symptom);
        }
    });

    // Cap risk score at 1.0
    if (riskScore > 1) riskScore = 1;

    // Show results visually
    const resultDiv = document.getElementById("riskResult");
    resultDiv.innerHTML = `
        <p><strong>Risk Score:</strong> ${(riskScore*100).toFixed(0)}%</p>
        <p><strong>Matched Symptoms:</strong> ${matchedSymptoms.join(", ") || "None"}</p>
    `;

    // Also log to console (keeps your old engine intact)
    console.log("Risk Analysis:", { riskScore, matchedSymptoms });
});
