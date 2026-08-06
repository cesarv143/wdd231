const VISIT_KEY = "aura_essence_last_visit";
const FAVORITES_KEY = "aura_essence_favorites";

export function trackVisits(element) {
  if (!element) return;
  const lastVisit = localStorage.getItem(VISIT_KEY);
  const now = Date.now();

  if (!lastVisit) {
    element.textContent = "Welcome! This is your first visit to Aura & Essence.";
  } else {
    const days = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
    element.textContent = days < 1 
      ? "Welcome back! You last visited today." 
      : `Welcome back! It has been ${days} day(s) since your last visit.`;
  }

  localStorage.setItem(VISIT_KEY, now.toString());
}

export function getSavedFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

export function toggleFavorite(id) {
  let favorites = getSavedFavorites();
  const index = favorites.indexOf(id);

  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(id);
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return index === -1;
}