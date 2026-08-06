import { fetchPerfumes } from "./modules/fetchPerfumes.js";
import { renderPerfumeCards } from "./modules/renderCards.js";
import { initModal } from "./modules/modal.js";
import { trackVisits } from "./modules/storage.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Navigation Menu
  const menuBtn = document.querySelector("#menu-toggle");
  const navMenu = document.querySelector("#main-nav");

  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
  }

  // Footer Year Setup
  const yearSpan = document.querySelector("#current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Visit
  const visitCounter = document.querySelector("#visit-counter");
  if (visitCounter) {
    trackVisits(visitCounter);
  }

  
  const openModal = initModal();

  
  const container = document.querySelector("#perfume-grid");
  const perfumes = await fetchPerfumes();

  if (container) {
    renderPerfumeCards(perfumes, container, openModal);
  }

  // Filter Buttons
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const family = button.getAttribute("data-family");
      filterAndRender();
    });
  });

  // Search
  const searchInput = document.querySelector("#search-input");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      filterAndRender();
    });
  }

  function filterAndRender() {
    const activeBtn = document.querySelector(".filter-btn.active");
    const family = activeBtn ? activeBtn.getAttribute("data-family") : "all";
    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

    let filtered = perfumes;

    if (family !== "all") {
      filtered = filtered.filter((item) => item.family === family);
    }

    if (query !== "") {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.brand.toLowerCase().includes(query) ||
          item.topNotes.toLowerCase().includes(query)
      );
    }

    renderPerfumeCards(filtered, container, openModal);
  }
});