// recommendations.js
export function getRecommendations(riskScore){
    if(riskScore > 0.7){
        return "High risk: Consult your doctor immediately. Follow liver-friendly diet, monitor symptoms daily.";
    } else if(riskScore > 0.4){
        return "Moderate risk: Improve sleep, nutrition, and stress management. Schedule a checkup.";
    } else {
        return "Low risk: Maintain healthy lifestyle. Track any new symptoms.";
    }
}
