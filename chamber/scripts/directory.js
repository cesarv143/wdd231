/**
 * WDD 231 - Chamber of Commerce Directory Logic
 * Implements Fetch API with async/await and layout switching mechanics.
 */

const url = 'data/members.json';
const display = document.querySelector("#directory-container");
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");

// 1. Fetch JSON data using asynchronous programming
async function getMembers() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP network error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error("Error encountered while resolving data fetch:", error);
        display.innerHTML = `<p style="color:var(--accent-color); font-weight:bold;">Error: Failed to process member registry data.</p>`;
    }
}

// 2. Map and append structural template data into the layout
function displayMembers(members) {
    display.innerHTML = ""; // Clear active layout contents
    
    members.forEach(member => {
        const card = document.createElement('section');
        card.className = 'member-card';
        
        // Truncate protocols for cleaner string rendering (e.g. 'mybusiness.com')
        const displayUrl = member.website
            .replace('https://', '')
            .replace('http://', '')
            .replace('www.', '');

        card.innerHTML = `
            <div class="card-header">
                <h3>${member.name}</h3>
                <p class="tagline">${member.tagline}</p>
            </div>
            <div class="card-body">
                <div class="image-box">
                    <img src="${member.image}" alt="Logo of ${member.name}" loading="lazy" width="100" height="100">
                </div>
                <div class="info-text">
                    <p><strong>EMAIL:</strong> ${member.email}</p>
                    <p><strong>PHONE:</strong> ${member.phone}</p>
                    <p><strong>URL:</strong> <a href="${member.website}" target="_blank" rel="noopener">${displayUrl}</a></p>
                </div>
            </div>
        `;
        display.appendChild(card);
    });
}

// 3. View switching event listeners mapping strictly to class examples
gridbutton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
    gridbutton.classList.add("active");
    listbutton.classList.remove("active");
});

listbutton.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("grid");
    listbutton.classList.add("active");
    gridbutton.classList.remove("active");
});

// 4. Automatically populate the runtime dynamic metadata in the footer
document.getElementById('last-modified').textContent = `Last Modification: ${document.lastModified}`;

// Initialize execution
getMembers();