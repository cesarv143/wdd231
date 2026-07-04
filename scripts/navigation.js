document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu-button");
    const navMenu = document.getElementById("nav-menu");

    menuButton.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        
        // Cambia el icono de hamburguesa a una X al abrirse
        if (navMenu.classList.contains("open")) {
            menuButton.textContent = "▲";
            menuButton.setAttribute("aria-label", "Close menu");
        } else {
            menuButton.textContent = "☰";
            menuButton.setAttribute("aria-label", "Open menu");
        }
    });
});