const form = document.getElementById("service-application-form");
const statusBox = document.getElementById("form-status");
const yearText = document.getElementById("copyright-year");

if (yearText) {
  yearText.textContent = new Date().getFullYear();
}

const validators = {
  firstName: (value) => {
    if (!value.trim()) return "First name is required.";
    if (value.trim().length < 2) return "Please enter at least 2 characters.";
    return "";
  },
  lastName: (value) => {
    if (!value.trim()) return "Last name is required.";
    if (value.trim().length < 2) return "Please enter at least 2 characters.";
    return "";
  },
  email: (value) => {
    if (!value.trim()) return "Email is required.";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(value)) return "Please enter a valid email address.";
    return "";
  },
  phoneRegion: (value) => {
    if (!value) return "Please select your phone region.";
    return "";
  },
  phone: (value) => {
    if (!value.trim()) return "Phone number is required.";
    const phonePattern = /^\+[0-9][0-9\s()-]{6,}$/;
    if (!phonePattern.test(value.trim())) return "Please include a valid country code (example: +1 555 123 4567).";
    return "";
  },
  propertyType: (value) => {
    if (!value) return "Please select a property type.";
    return "";
  },
  serviceNeeded: (value) => {
    if (!value) return "Please select a service.";
    return "";
  },
  projectDetails: (value) => {
    if (!value.trim()) return "Project details are required.";
    if (value.trim().length < 20) return "Please provide at least 20 characters of details.";
    return "";
  },
  consent: (checked) => {
    if (!checked) return "You must consent before submitting.";
    return "";
  }
};

function showFieldError(fieldName, message) {
  const field = document.getElementById(fieldName);
  const errorElement = document.getElementById(`${fieldName}-error`);

  if (!field || !errorElement) return;

  if (message) {
    errorElement.textContent = message;
    errorElement.classList.remove("hidden");
    field.setAttribute("aria-invalid", "true");
    field.setAttribute("aria-describedby", `${fieldName}-error`);
  } else {
    errorElement.textContent = "";
    errorElement.classList.add("hidden");
    field.removeAttribute("aria-invalid");
    field.removeAttribute("aria-describedby");
  }
}

function setStatus(type, message) {
  if (!statusBox) return;

  statusBox.textContent = message;
  statusBox.classList.remove("hidden", "bg-red-100", "text-red-800", "bg-green-100", "text-green-800");

  if (type === "error") {
    statusBox.classList.add("bg-red-100", "text-red-800");
  } else {
    statusBox.classList.add("bg-green-100", "text-green-800");
  }
}

function validateForm(currentForm) {
  const values = {
    firstName: currentForm.firstName.value,
    lastName: currentForm.lastName.value,
    email: currentForm.email.value,
    phoneRegion: currentForm.phoneRegion.value,
    phone: currentForm.phone.value,
    propertyType: currentForm.propertyType.value,
    serviceNeeded: currentForm.serviceNeeded.value,
    projectDetails: currentForm.projectDetails.value,
    consent: currentForm.consent.checked
  };

  const errors = {};

  Object.keys(validators).forEach((fieldName) => {
    const error = validators[fieldName](values[fieldName]);
    errors[fieldName] = error;
    showFieldError(fieldName, error);
  });

  return errors;
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const errors = validateForm(form);
    const hasErrors = Object.values(errors).some((error) => Boolean(error));

    if (hasErrors) {
      setStatus("error", "Please fix the highlighted errors before submitting.");
      const firstErrorField = Object.keys(errors).find((key) => errors[key]);
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        if (element) element.focus();
      }
      return;
    }

    setStatus("success", "Your application was submitted successfully. Our team will contact you soon.");
    form.reset();
  });

  ["firstName", "lastName", "email", "phoneRegion", "phone", "propertyType", "serviceNeeded", "projectDetails", "consent"].forEach((fieldName) => {
    const element = document.getElementById(fieldName);
    if (!element) return;

    element.addEventListener("input", () => {
      const value = fieldName === "consent" ? element.checked : element.value;
      const error = validators[fieldName](value);
      showFieldError(fieldName, error);
    });

    element.addEventListener("blur", () => {
      const value = fieldName === "consent" ? element.checked : element.value;
      const error = validators[fieldName](value);
      showFieldError(fieldName, error);
    });
  });
}
