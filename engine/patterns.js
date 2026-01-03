export function normalizeInputs(data) {
    // Normalize each feature to 0-1 contribution (higher = higher risk)
    return {
        family_history: data.family_history,  // 0 or 1
        
        bilirubin_trend: Math.min((data.bilirubin_trend || 0) / 2, 1),  // >1-2 indicates strong elevation trend
        
        cholesterol: data.cholesterol > 250 ? 1 : (data.cholesterol - 150) / 100,  // Clamped 0-1
        
        ggt: data.ggt > 100 ? 1 : (data.ggt / 100),
        
        activity: data.activity < 5 ? (5 - data.activity) / 5 : 0,
        
        sleep: data.sleep < 8 ? (8 - data.sleep) / 8 : 0,
        
        nutrition: data.nutrition < 70 ? (70 - data.nutrition) / 70 : 0,
        
        stress: data.stress > 50 ? (data.stress - 50) / 50 : 0
    };
}
