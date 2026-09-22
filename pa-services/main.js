const PHONE = "+447976708226";

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const open = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.textContent = open ? "Close" : "Menu";
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.textContent = "Menu";
    });
  });
}

const today = new Date().getDay();
document.querySelectorAll("[data-day]").forEach((row) => {
  if (Number(row.dataset.day) === today) {
    row.classList.add("is-today");
  }
});

const form = document.querySelector("#enquiry-form");
const enquiryStatus = document.querySelector("#enquiry-status");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const lines = [
      "Hello Glen, I would like to book a mobile valet with P.A.Services.",
      `Name: ${String(data.get("name") || "").trim()}`,
      `Area: ${String(data.get("location") || "").trim()}`,
      `Service: ${String(data.get("service") || "").trim()}`,
      `Vehicle: ${String(data.get("vehicle") || "").trim()}`,
    ];
    const notes = String(data.get("message") || "").trim();
    if (notes) lines.push(`Notes: ${notes}`);

    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `sms:${PHONE}?&body=${body}`;

    if (enquiryStatus) {
      enquiryStatus.hidden = false;
      enquiryStatus.textContent =
        "Your phone should open a text to Glen on 07976 708226. If it does not, use the call button on this page.";
    }
  });
}

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");

document.querySelectorAll(".gallery-button").forEach((button) => {
  button.addEventListener("click", () => {
    const img = button.querySelector("img");
    if (!lightbox || !lightboxImage || !img) return;
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    if (lightboxCaption) lightboxCaption.textContent = button.dataset.caption || img.alt;
    if (typeof lightbox.showModal === "function") lightbox.showModal();
  });
});

document.querySelector("#lightbox-close")?.addEventListener("click", () => {
  lightbox?.close();
});

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
