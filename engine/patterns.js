export function normalizeSymptom(symptom){
    return symptom.toLowerCase().replace(/\s+/g,'');
}

export function matchSymptoms(userSymptoms, diseaseSymptoms){
    return userSymptoms.map(normalizeSymptom)
                       .filter(sym => diseaseSymptoms.hasOwnProperty(sym));
}
