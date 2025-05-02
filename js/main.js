document.addEventListener("DOMContentLoaded", function () {
  initializeBurger();

  initializeLazyVideos();
  initializeAgenticVideoControls();

  initializeAccordion();

  initializeBookDemoForm();
});

function initializeAgenticVideoControls() {
  const videos = document.querySelectorAll(".agentic-video > video");

  videos.forEach((video) => {
    const playButton = video.closest(".agentic-video").querySelector(".agentic-play-button");

    if (playButton) {
      video.controls = false;

      playButton.addEventListener("click", () => {
        video.controls = true;
        video.currentTime = 0;
        video.muted = false;
        video.play();
        playButton.classList.add("hidden");
      });

      video.addEventListener("ended", () => {
        playButton.classList.remove("hidden");
      });
    }
  });
}

function initializeLazyVideos() {
  const lazyVideos = document.querySelectorAll(".lazy-video");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const video = entry.target;
          const source = document.createElement("source");
          source.src = video.dataset.src;
          source.type = "video/mp4";
          video.appendChild(source);
          video.load();
          video.play();
          obs.unobserve(video);
        }
      });
    },
    { threshold: 0.25 }
  );

  lazyVideos.forEach((video) => observer.observe(video));
}

function initializeBurger() {
  const burger = document.querySelector(".burger");
  const burgerMenu = document.querySelector(".burger-menu");

  if (burger && burgerMenu) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("active");
      burgerMenu.classList.toggle("active");
      document.body.classList.toggle("locked");
    });
  }
}

function initializeAccordion() {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    const items = accordion.querySelectorAll(".accordion-item");

    items.forEach((item) => {
      const header = item.querySelector(".accordion-header");
      const content = item.querySelector(".accordion-content");

      header.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // Toggle active class
        item.classList.toggle("active");

        if (isActive) {
          // Collapse the content
          content.style.maxHeight = null;
        } else {
          // Expand the content
          const paddingSize = 20;
          content.style.maxHeight = content.scrollHeight + paddingSize + "px";
        }

        // Optionally collapse other items
        items.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
            const otherContent = otherItem.querySelector(".accordion-content");
            otherContent.style.maxHeight = null;
          }
        });
      });
    });
  });
}

function initializeBookDemoForm() {
  const bookDemoForm = document.querySelector("form.book-demo-form");

  if (!bookDemoForm) return;

  // Add blur event listeners to all inputs
  const inputs = bookDemoForm.querySelectorAll("input, textarea, select");
  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateInput(input));
  });

  // Handle form submission
  bookDemoForm.addEventListener("submit", onSubmitBookDemoForm);
}

function onSubmitBookDemoForm(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  let isValid = true;

  // Validate all inputs on form submission
  const inputs = event.target.querySelectorAll("input, textarea, select");
  inputs.forEach((input) => {
    if (!validateInput(input)) {
      isValid = false;
    }
  });

  if (isValid) {
    window.location.href = "/pages/thank-you.html";
  } else {
    console.log("Form validation failed.");
  }
}

function validateInput(inputElement) {
  const value = inputElement.value.trim();
  const row = inputElement.closest(".demo-form__row");
  let isValid = true;

  // Validation logic based on input type or ID
  if (inputElement.id === "demo-form-name-input") {
    if (!value) {
      markInvalid(row, "Name is required.");
      isValid = false;
    } else {
      markValid(row);
    }
  } else if (inputElement.id === "demo-form-company-input") {
    if (!value) {
      markInvalid(row, "Company name is required.");
      isValid = false;
    } else {
      markValid(row);
    }
  } else if (inputElement.id === "demo-form-email-input") {
    if (!value) {
      markInvalid(row, "Business email is required.");
      isValid = false;
    } else if (!isValidEmail(value)) {
      markInvalid(row, "Business email is wrong");
      isValid = false;
    } else {
      markValid(row);
    }
  } else if (inputElement.id === "demo-form-phone-input") {
    if (!value) {
      markInvalid(row, "Phone number is required.");
      isValid = false;
    } else if (value && !isValidPhone(value)) {
      markInvalid(row, "Phone number is invalid.");
      isValid = false;
    } else {
      markValid(row);
    }
  }

  return isValid;
}

function markValid(row) {
  row.classList.remove("invalid");
  row.classList.add("valid");
  const errorSpan = row.querySelector(".demo-form__error span");
  if (errorSpan) errorSpan.textContent = "";
}

function markInvalid(row, message) {
  row.classList.remove("valid");
  row.classList.add("invalid");
  const errorSpan = row.querySelector(".demo-form__error span");
  if (errorSpan) errorSpan.textContent = message;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^[0-9]{7,15}$/;
  return phoneRegex.test(phone);
}
