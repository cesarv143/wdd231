import { getSavedFavorites, toggleFavorite } from "./storage.js";

export function renderPerfumeCards(perfumes, container, openModalCallback) {
  if (!container) return;
  container.innerHTML = "";

  if (perfumes.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No fragrances match your search.</p>`;
    return;
  }

  const savedFavorites = getSavedFavorites();

  perfumes.forEach((item) => {
    const isSaved = savedFavorites.includes(item.id);
    const card = document.createElement("article");
    card.className = "perfume-card";

    card.innerHTML = `
      <button class="favorite-btn ${isSaved ? 'saved' : ''}" data-id="${item.id}" aria-label="Save to favorites">
        ${isSaved ? '★' : '☆'}
      </button>
      <img src="images/${item.id}.jpg" alt="${item.name} bottle" class="card-image" loading="lazy">
      <div>
        <span class="card-brand">${item.brand}</span>
        <h3 class="card-title">${item.name}</h3>
        <p class="card-meta">${item.family} • ${item.concentration}</p>
      </div>
      <div>
        <p class="card-price">$${item.price} USD</p>
        <button class="details-btn" data-id="${item.id}">Inspect Notes</button>
      </div>
    `;

    // Modal Callback Event Listener
    const detailsBtn = card.querySelector(".details-btn");
    detailsBtn.addEventListener("click", () => openModalCallback(item));

    // Favorite Storage Event Listener
    const favoriteBtn = card.querySelector(".favorite-btn");
    favoriteBtn.addEventListener("click", () => {
        
      const active = toggleFavorite(item.id);
      favoriteBtn.classList.toggle("saved", active);
      favoriteBtn.innerHTML = active ? '★' : '☆';
    });

    container.appendChild(card);
  });
}