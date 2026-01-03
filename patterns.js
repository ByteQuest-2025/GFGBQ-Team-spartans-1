// patterns.js
// Advanced matching patterns (can expand later)

function normalizeSymptom(symptom) {
    return symptom.toLowerCase().replace(/\s+/g, '');
}

function matchSymptoms(userSymptoms, diseaseSymptoms) {
    return userSymptoms.map(sym => normalizeSymptom(sym))
        .filter(sym => diseaseSymptoms.hasOwnProperty(sym));
}
