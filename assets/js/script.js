const nav = document.getElementById("mainNav");
const currentYear = document.getElementById("currentYear");
const projectCarouselInner = document.getElementById("projectCarouselInner");
const projectCarouselIndicators = document.getElementById("projectCarouselIndicators");
let lastCardsPerSlide = 0;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const projectImages = [
  "WhatsApp Image 2026-04-04 at 3.56.24 AM (1).jpeg",
  "WhatsApp Image 2026-04-04 at 3.56.24 AM (2).jpeg",
  "WhatsApp Image 2026-04-04 at 3.56.24 AM.jpeg",
  "WhatsApp Image 2026-04-04 at 3.56.25 AM.jpeg",
  "WhatsApp Image 2026-04-04 at 4.00.53 AM.jpeg",
  "WhatsApp Image 2026-04-04 at 4.00.54 AM (1).jpeg",
  "WhatsApp Image 2026-04-04 at 4.00.54 AM.jpeg",
  "WhatsApp Image 2026-04-04 at 4.06.48 AM (1).jpeg",
  "WhatsApp Image 2026-04-04 at 4.06.48 AM.jpeg",
  "WhatsApp Image 2026-04-04 at 4.08.57 AM.jpeg",
  "WhatsApp Image 2026-04-04 at 4.17.59 AM (1).jpeg",
  "WhatsApp Image 2026-04-04 at 4.17.59 AM.jpeg",
  "WhatsApp Image 2026-04-06 at 8.38.03 AM.jpeg",
  "WhatsApp Image 2026-04-06 at 8.38.04 AM (1).jpeg",
  "WhatsApp Image 2026-04-06 at 8.38.04 AM.jpeg",
  "WhatsApp Image 2026-04-06 at 8.38.05 AM.jpeg",
  "WhatsApp Image 2026-04-06 at 8.38.06 AM (1).jpeg",
  "WhatsApp Image 2026-04-06 at 8.38.06 AM.jpeg",
  "WhatsApp Image 2026-04-06 at 8.38.07 AM (1).jpeg",
  "WhatsApp Image 2026-04-06 at 8.38.07 AM (3).jpeg",
  "WhatsApp Image 2026-04-06 at 8.38.07 AM.jpeg",
  "WhatsApp Image 2026-04-06 at 8.38.08 AM.jpeg"
];

const syncNavState = () => {
  if (!nav) return;
  nav.classList.toggle("scrolled", window.scrollY > 24);
};

const getCardsPerSlide = () => {
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1200) return 2;
  return 3;
};

const buildProjectCarousel = () => {
  if (!projectCarouselInner || !projectCarouselIndicators) return;

  const cardsPerSlide = getCardsPerSlide();
  if (cardsPerSlide === lastCardsPerSlide && projectCarouselInner.childElementCount > 0) return;

  lastCardsPerSlide = cardsPerSlide;
  projectCarouselInner.innerHTML = "";
  projectCarouselIndicators.innerHTML = "";

  const groupedImages = [];
  for (let index = 0; index < projectImages.length; index += cardsPerSlide) {
    groupedImages.push(projectImages.slice(index, index + cardsPerSlide));
  }

  groupedImages.forEach((group, slideIndex) => {
    const indicator = document.createElement("button");
    indicator.type = "button";
    indicator.setAttribute("data-bs-target", "#projectCarousel");
    indicator.setAttribute("data-bs-slide-to", String(slideIndex));
    indicator.setAttribute("aria-label", `Go to project slide ${slideIndex + 1}`);
    if (slideIndex === 0) {
      indicator.classList.add("active");
      indicator.setAttribute("aria-current", "true");
    }
    projectCarouselIndicators.appendChild(indicator);

    const item = document.createElement("div");
    item.className = `carousel-item${slideIndex === 0 ? " active" : ""}`;

    const row = document.createElement("div");
    row.className = "row g-4";

    group.forEach((fileName, imageIndex) => {
      const column = document.createElement("div");
      column.className = `col-${12 / cardsPerSlide}`;

      const card = document.createElement("figure");
      card.className = "project-carousel-card";

      const image = document.createElement("img");
      image.className = "w-100";
      image.src = `assets/images/${fileName}`;
      image.alt = `Ethical Plumbing project image ${slideIndex * cardsPerSlide + imageIndex + 1}`;

      card.appendChild(image);
      column.appendChild(card);
      row.appendChild(column);
    });

    item.appendChild(row);
    projectCarouselInner.appendChild(item);
  });
};

const prepareAnimations = () => {
  const heroAnimatedElements = [
    ".hero-section .eyebrow",
    ".hero-section h1",
    ".hero-section .hero-copy",
    ".hero-section .hero-actions",
    ".hero-section .hero-highlights",
    ".hero-section .hero-card"
  ];

  heroAnimatedElements.forEach((selector, index) => {
    const element = document.querySelector(selector);
    if (!element) return;
    element.classList.add("hero-animate");
    element.classList.add(`hero-animate-delay-${Math.min(index, 3)}`);
  });

  const revealSelectors = [
    ".section-heading",
    ".stat-card",
    ".service-card",
    ".project-carousel",
    ".about-visual",
    ".feature-panel",
    ".area-card",
    ".contact-wrap"
  ];

  revealSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add("reveal-on-scroll");
      element.classList.add(`reveal-stagger-${index % 4}`);
    });
  });

  if (reduceMotion) {
    document.querySelectorAll(".reveal-on-scroll").forEach((element) => {
      element.classList.add("revealed");
    });
    document.body.classList.add("is-ready");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  document.querySelectorAll(".reveal-on-scroll").forEach((element) => {
    observer.observe(element);
  });

  requestAnimationFrame(() => {
    document.body.classList.add("is-ready");
  });
};

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

buildProjectCarousel();
prepareAnimations();
syncNavState();
window.addEventListener("scroll", syncNavState);
window.addEventListener("resize", buildProjectCarousel);
