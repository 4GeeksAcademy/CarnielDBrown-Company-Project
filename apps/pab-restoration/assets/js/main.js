const yearElement = document.getElementById("copyright-year");
if (yearElement) {
  yearElement.textContent = `© ${new Date().getFullYear()} PAB Restoration. All rights reserved.`;
}

const menuButton = document.getElementById("menu-button");
const mobileNav = document.getElementById("mobile-nav");

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    mobileNav.classList.toggle("hidden");
  });
}
