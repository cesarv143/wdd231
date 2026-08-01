// scripts/discover.js
import { places } from '../data/discover.mjs';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Manejo del menú Responsive
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  // 2. Renderizar Tarjetas de Interés
  const container = document.getElementById('cards-container');

  if (container) {
    places.forEach((place, index) => {
      const card = document.createElement('article');
      // Asignamos una clase específica para mapearla a grid-area (card-1, card-2, ...)
      card.className = `discover-card card-${index + 1}`;

      card.innerHTML = `
        <h2>${place.title}</h2>
        <figure>
          <img src="${place.photo}" alt="${place.alt}" width="300" height="200" loading="lazy">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button class="learn-more-btn">Aprender Más</button>
      `;

      container.appendChild(card);
    });
  }

  // 3. LocalStorage: Mensaje de Visita
  handleVisitMessage();

  // 4. Footer Dates
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = `Última modificación: ${document.lastModified}`;
});

function handleVisitMessage() {
  const messageElement = document.getElementById('visit-message');
  if (!messageElement) return;

  const msInDay = 86400000; // 1000 * 60 * 60 * 24
  const currentVisit = Date.now();
  const lastVisit = localStorage.getItem('lastVisitDate');

  if (!lastVisit) {
    messageElement.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const timeDifference = currentVisit - parseInt(lastVisit, 10);
    const daysDifference = Math.floor(timeDifference / msInDay);

    if (timeDifference < msInDay) {
      messageElement.textContent = "Back so soon! Awesome!";
    } else {
      if (daysDifference === 1) {
        messageElement.textContent = "You last visited 1 day ago.";
      } else {
        messageElement.textContent = `You last visited ${daysDifference} days ago.`;
      }
    }
  }

  // Guardar la fecha actual de la visita
  localStorage.setItem('lastVisitDate', currentVisit.toString());
}