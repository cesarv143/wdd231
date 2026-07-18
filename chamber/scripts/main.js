document.addEventListener("DOMContentLoaded", () => {
    // 1. Weather Logic
    const apiKey = 'YOUR_OPENWEATHER_API_KEY'; // Replace with your actual key
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=16.76&lon=-3.00&units=imperial&appid=${apiKey}`;
    const membersUrl = 'data/members.json';

    async function fetchHomeData() {
        // Fetch Weather
        try {
            const response = await fetch(weatherUrl);
            const data = await response.json();
            const current = data.list[0];
            document.querySelector('#weather-info').innerHTML = 
                `<p>${Math.round(current.main.temp)}°F - ${current.weather[0].description}</p>`;
        } catch (error) { console.error("Weather fetch failed:", error); }

        // Fetch Spotlights
        try {
            const response = await fetch(membersUrl);
            const data = await response.json();
            const qualified = data.filter(m => m.membershipLevel >= 2);
            const random = qualified.sort(() => 0.5 - Math.random()).slice(0, 3);
            
            const container = document.getElementById('spotlights');
            random.forEach(m => {
                container.innerHTML += `
                    <div class="spotlight-card">
                        <h3>${m.name}</h3>
                        <img src="${m.image}" alt="${m.name} logo" loading="lazy">
                        <p>${m.tagline}</p>
                        <a href="${m.website}" target="_blank">Visit Site</a>
                    </div>`;
            });
        } catch (error) { console.error("Spotlights fetch failed:", error); }
    }

    // Set Footer Date
    document.getElementById('last-modified').textContent = `Last Modification: ${document.lastModified}`;
    document.getElementById('current-year').textContent = new Date().getFullYear();

    fetchHomeData();
});