export function initModal() {
  const modal = document.querySelector("#perfume-modal");
  const modalBody = document.querySelector("#modal-details");
  const closeBtn = document.querySelector("#close-modal");

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.close());
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.close();
    });
  }

  return function openModal(perfume) {
    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
      <img src="images/${perfume.id}.jpg" alt="${perfume.name}" class="modal-img">
      <h2>${perfume.name}</h2>
      <p><strong>Brand:</strong> ${perfume.brand}</p>
      <p><strong>Concentration:</strong> ${perfume.concentration}</p>
      <ul class="notes-list">
        <li><strong>Top Notes:</strong> ${perfume.topNotes}</li>
        <li><strong>Heart Notes:</strong> ${perfume.heartNotes}</li>
        <li><strong>Base Notes:</strong> ${perfume.baseNotes}</li>
      </ul>
      <p><strong>Retail Price:</strong> $${perfume.price} USD</p>
    `;

    modal.showModal();
  };
}