document.addEventListener("DOMContentLoaded", () => {
    const currentUrl = window.location.href;
    const urlParams = new URLSearchParams(window.location.search);
    const resultsContainer = document.getElementById("results");

    if (resultsContainer) {
        const fname = urlParams.get("fname") || "N/A";
        const lname = urlParams.get("lname") || "N/A";
        const email = urlParams.get("email") || "N/A";
        const phone = urlParams.get("phone") || "N/A";
        const organization = urlParams.get("organization") || "N/A";
        const timestamp = urlParams.get("timestamp") || "N/A";

        resultsContainer.innerHTML = `
            <p><strong>First Name:</strong> ${fname}</p>
            <p><strong>Last Name:</strong> ${lname}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mobile Phone:</strong> ${phone}</p>
            <p><strong>Organization:</strong> ${organization}</p>
            <p><strong>Application Date & Time:</strong> ${timestamp}</p>
        `;
    }
});