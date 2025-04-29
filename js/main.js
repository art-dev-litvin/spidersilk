// Feature Cards Mouse Effect
document.addEventListener("DOMContentLoaded", function () {
  const featureCards = document.querySelectorAll(".feature-card");

  featureCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top; // y position within the element

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
});

// Accordion functionality for FAQ section
document.addEventListener("DOMContentLoaded", function () {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const accordionItem = this.parentElement;
      const accordionContent = accordionItem.querySelector(".accordion-content");
      const accordionIcon = this.querySelector(".accordion-icon");

      // Close all other accordion items
      document.querySelectorAll(".accordion-content").forEach((content) => {
        if (content !== accordionContent) {
          content.classList.remove("active");
          content.parentElement.querySelector(".accordion-icon").textContent = "+";
        }
      });

      // Toggle current accordion item
      accordionContent.classList.toggle("active");
      accordionIcon.textContent = accordionContent.classList.contains("active") ? "-" : "+";
    });
  });
});
