/**
 * Timbuktu Chamber of Commerce - Main Logic
 * Handles Weather API, Member Spotlights, and Footer Metadata.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Configuration
    const apiKey = 'TU_API_KEY_AQUI'; // Reemplaza con tu clave de OpenWeatherMap
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=16.76&lon=-3.00&units=imperial&appid=${apiKey}`;
    const membersUrl = 'data/members.json';

    // 1. Weather Data Retrieval
    async function getWeather() {
        try {
            const response = await fetch(weatherUrl);
            if (!response.ok) return; // Silent return on error
            const data = await response.json();
            
            // Current Weather
            const current = data.list[0];
            const weatherDiv = document.querySelector('#weather-info');
            if (weatherDiv) {
                weatherDiv.innerHTML = `<p><strong>${Math.round(current.main.temp)}°F</strong> - ${current.weather[0].description}</p>`;
            }

            // 3-Day Forecast (Taking indices 8, 16, 24 for approx 24h intervals)
            const forecastDiv = document.querySelector('#forecast-info');
            if (forecastDiv) {
                const forecast = [data.list[8], data.list[16], data.list[24]];
                forecastDiv.innerHTML = '<h4>3-Day Forecast:</h4>' + 
                    forecast.map(d => `<p>Day ${d.dt_txt.slice(5, 10)}: ${Math.round(d.main.temp)}°F</p>`).join('');
            }
        } catch (e) { /* Silent catch for production */ }
    }

    // 2. Member Spotlights Retrieval
    async function getSpotlights() {
        try {
            const response = await fetch(membersUrl);
            if (!response.ok) return;
            const data = await response.json();
            const container = document.getElementById('spotlights');
            if (!container) return;

            // Filter for Gold (3) and Silver (2) membership levels
            const qualified = data.filter(m => m.membershipLevel >= 2);
            
            // Randomly sort and pick 2-3 members
            const randomMembers = qualified.sort(() => 0.5 - Math.random()).slice(0, 3);
            
            randomMembers.forEach(m => {
                const levelName = m.membershipLevel === 3 ? "Gold Member" : "Silver Member";
                container.innerHTML += `
                    <div class="spotlight-card">
                        <h3>${m.name}</h3>
                        <img src="${m.image}" alt="Logo of ${m.name}" width="100" height="100" loading="lazy">
                        <p><em>${m.tagline}</em></p>
                        <p><strong>Level:</strong> ${levelName}</p>
                        <p>${m.phone}</p>
                        <a href="${m.website}" target="_blank">Visit Site</a>
                    </div>`;
            });
        } catch (e) { /* Silent catch for production */ }
    }

    // 3. Footer Metadata
    const lastMod = document.getElementById('last-modified');
    if (lastMod) {
        lastMod.textContent = `Last Modification: ${document.lastModified}`;
    }
    
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Initialize
    getWeather();
    getSpotlights();
});