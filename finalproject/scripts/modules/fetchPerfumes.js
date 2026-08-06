// Asynchronous fetch module for perfume dataset
export async function fetchPerfumes() {
  try {
    const response = await fetch("data/perfumes.json");
    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to load perfume catalog:", error);
    return [];
  }
}