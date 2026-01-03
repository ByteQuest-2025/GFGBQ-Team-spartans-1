export async function loadDiseasePattern() {
  const response = await fetch('./data/alagille.json');
  return await response.json();
}
