export function getRecommendations(riskProb) {
    if (riskProb < 0.2) {
        return "Low estimated early risk. Maintain balanced nutrition rich in fat-soluble vitamins (A, D, E, K), regular physical activity, adequate sleep, and routine pediatric monitoring of growth and liver function.";
    } else if (riskProb < 0.5) {
        return "Moderate estimated risk. Recommend consultation with a pediatric gastroenterologist for serial liver enzyme and bilirubin monitoring. Consider genetic counseling if family history is positive. Optimize lifestyle: ensure high-calorie nutrition, vitamin supplementation, and stress reduction techniques.";
    } else {
        return "High estimated early risk. Urgent specialist evaluation advised, including genetic testing (JAG1/NOTCH2), echocardiography for cardiac involvement, spinal imaging for vertebral anomalies, and ophthalmologic exam. Preventive measures: fat-soluble vitamin supplementation, potential pruritus management, nutritional support for malabsorption, and avoidance of contact sports if vascular concerns arise.";
    }
}
