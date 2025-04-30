document.addEventListener("DOMContentLoaded", function () {
  initializeAccordion();

  initializeBookDemoForm();
});

function initializeAccordion() {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    const items = accordion.querySelectorAll(".accordion-item");

    items.forEach((item) => {
      const header = item.querySelector(".accordion-header");

      header.addEventListener("click", () => {
        // Toggle active class on the clicked item
        item.classList.toggle("active");

        // Collapse other items if needed (optional)
        items.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
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
    console.log("Form submitted with data:", data);
  } else {
    console.log("Form validation failed.");
  }
}

function validateInput(inputElement) {
  const value = inputElement.value.trim();
  const row = inputElement.closest(".demo-form__row");
  let isValid = true;

  // Validation logic based on input type or ID
  if (inputElement.id === "name") {
    if (!value) {
      markInvalid(row, "Name is required.");
      isValid = false;
    } else {
      markValid(row);
    }
  } else if (inputElement.id === "email") {
    if (!value) {
      markInvalid(row, "Company name is required.");
      isValid = false;
    } else {
      markValid(row);
    }
  } else if (inputElement.id === "company") {
    if (!isValidEmail(value)) {
      markInvalid(row, "A valid business email is required.");
      isValid = false;
    } else {
      markValid(row);
    }
  } else if (inputElement.id === "phone") {
    if (value && !isValidPhone(value)) {
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
