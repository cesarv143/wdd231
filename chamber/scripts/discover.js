/* ==========================================================================
   DISCOVER PAGE JAVASCRIPT MODULE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Hamburger Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      const isOpen = navMenu.classList.contains("open");
      hamburger.setAttribute("aria-expanded", isOpen);
    });
  }

  // 2. Footer Dates (Current Year & Last Modified)
  const currentYearSpan = document.getElementById("currentyear");
  const lastModifiedSpan = document.getElementById("lastModified");

  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
  }

  // 3. LocalStorage Visitor Tracking Banner
  const visitMessageContainer = document.getElementById("visit-message");
  
  if (visitMessageContainer) {
    const lastVisit = localStorage.getItem("lastVisitDate");
    const now = Date.now();
    const msInDay = 86400000; // 1000 * 60 * 60 * 24

    if (!lastVisit) {
      // First time visiting
      visitMessageContainer.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const timeDifference = now - parseInt(lastVisit, 10);
      const daysDifference = Math.floor(timeDifference / msInDay);

      if (daysDifference < 1) {
        visitMessageContainer.textContent = "Back so soon! Great to see you!";
      } else if (daysDifference === 1) {
        visitMessageContainer.textContent = "You last visited 1 day ago.";
      } else {
        visitMessageContainer.textContent = `You last visited ${daysDifference} days ago.`;
      }
    }

    // Update the last visit timestamp in LocalStorage
    localStorage.setItem("lastVisitDate", now.toString());
  }
});