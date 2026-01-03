export function calculateRisk(norm) {
    // Weighted sum with sigmoid for probability (0-1)
    let score = 0;
    
    score += norm.family_history * 0.45;          // Strongest genetic factor
    score += norm.bilirubin_trend * 0.20;
    score += norm.cholesterol * 0.15;
    score += norm.ggt * 0.10;
    score += norm.activity * 0.05;
    score += norm.sleep * 0.05;
    score += norm.nutrition * 0.05;
    score += norm.stress * 0.05;
    
    // Sigmoid normalization for smooth probability
    const riskProb = 1 / (1 + Math.exp(-10 * (score - 0.5)));
    return riskProb;
}
