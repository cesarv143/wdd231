document.addEventListener("DOMContentLoaded", () => {
  const summaryBox = document.querySelector("#summary-container");
  const yearSpan = document.querySelector("#current-year");

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Read URL parameters submitted by form GET action
  const params = new URLSearchParams(window.location.search);

  if (!summaryBox) return;

  if (params.toString() === "") {
    summaryBox.innerHTML = "<p>No request details submitted.</p>";
    return;
  }

  let html = "<div class='summary-details'>";
  params.forEach((value, key) => {
    const formattedKey = key.replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase());
    html += `
      <div class="summary-item">
        <strong>${formattedKey}:</strong>
        <span>${value}</span>
      </div>
    `;
  });
  html += "</div>";

  summaryBox.innerHTML = html;
});