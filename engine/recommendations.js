export function getRecommendations(riskScore){
    if(riskScore > 0.7){
        return "High risk: Consult doctor immediately. Follow liver-friendly diet, monitor symptoms daily.";
    } else if(riskScore > 0.4){
        return "Moderate risk: Improve sleep, nutrition, stress management. Schedule a checkup.";
    } else {
        return "Low risk: Maintain healthy lifestyle and track symptoms.";
    }
}
