/* =========================================================
   World Pet Care — Site scripts
   Handles: mobile nav, scroll-spy, service search,
   appointment / contact forms, and the log in / sign up modal.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  initMobileNav();
  initScrollSpy();
  initServiceSearch();
  initServiceBooking();
  initAppointmentForm();
  initQueryForm();
  initAuthModal();
  initBackToTop();
});

/* ---------- Footer year ---------- */
function setYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ---------- Mobile nav toggle ---------- */
function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const navList = document.getElementById("navList");
  if (!toggle || !navList) return;

  toggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Highlight the current section in the nav ---------- */
function initScrollSpy() {
  const links = document.querySelectorAll(".nav-list a");
  if (!links.length) return;

  const sections = Array.from(links)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || !sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.remove("active"));
        const activeLink = document.querySelector(
          `.nav-list a[href="#${entry.target.id}"]`
        );
        if (activeLink) activeLink.classList.add("active");
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------- Search box filters the service cards ---------- */
function initServiceSearch() {
  const form = document.getElementById("searchForm");
  const input = document.getElementById("siteSearch");
  const cards = document.querySelectorAll("#serviceGrid .service-card");
  if (!form || !input || !cards.length) return;

  const applyFilter = () => {
    const query = input.value.trim().toLowerCase();
    let anyVisible = false;

    cards.forEach((card) => {
      const haystack = card.textContent.toLowerCase();
      const matches = query === "" || haystack.includes(query);
      card.style.display = matches ? "" : "none";
      if (matches) anyVisible = true;
    });

    if (query !== "" && anyVisible) {
      document
        .getElementById("services")
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    applyFilter();
  });

  input.addEventListener("input", applyFilter);
}

/* ---------- "Book this service" pre-selects the appointment form ---------- */
function initServiceBooking() {
  const links = document.querySelectorAll("[data-service]");
  const serviceSelect = document.getElementById("serviceType");
  if (!links.length || !serviceSelect) return;

  links.forEach((link) => {
    link.addEventListener("click", () => {
      const service = link.getAttribute("data-service");
      const option = Array.from(serviceSelect.options).find(
        (opt) => opt.value === service
      );
      if (option) serviceSelect.value = service;
    });
  });
}

/* ---------- Appointment form ---------- */
function initAppointmentForm() {
  const form = document.getElementById("appointmentForm");
  const success = document.getElementById("appointmentSuccess");
  const dateInput = document.getElementById("visitDate");
  if (!form) return;

  if (dateInput) {
    dateInput.min = new Date().toISOString().split("T")[0];
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    success.classList.add("visible");
    form.reset();
    success.scrollIntoView({ behavior: "smooth", block: "center" });

    window.setTimeout(() => success.classList.remove("visible"), 6000);
  });
}

/* ---------- Contact / query form ---------- */
function initQueryForm() {
  const form = document.getElementById("queryForm");
  const success = document.getElementById("querySuccess");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    success.classList.add("visible");
    form.reset();

    window.setTimeout(() => success.classList.remove("visible"), 6000);
  });
}

/* ---------- Log in / Sign up modal ---------- */
function initAuthModal() {
  const backdrop = document.getElementById("modalBackdrop");
  const closeBtn = document.getElementById("modalClose");
  const openers = document.querySelectorAll("[data-modal-open]");
  const tabs = document.querySelectorAll(".modal-tab");
  const title = document.getElementById("modalTitle");
  const panels = {
    login: document.getElementById("loginForm"),
    signup: document.getElementById("signupForm"),
  };
  const titles = {
    login: "Welcome back",
    signup: "Create your account",
  };

  if (!backdrop) return;

  let lastFocused = null;

  const openModal = (panel) => {
    lastFocused = document.activeElement;
    switchTab(panel);
    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
    const firstField = panels[panel]?.querySelector("input");
    if (firstField) firstField.focus();
  };

  const closeModal = () => {
    backdrop.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  };

  const switchTab = (panel) => {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.tab === panel;
      tab.classList.toggle("active", isActive);
    });
    Object.entries(panels).forEach(([key, form]) => {
      if (form) form.hidden = key !== panel;
    });
    if (title) title.textContent = titles[panel] || "";
  };

  openers.forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn.dataset.modalOpen));
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });

  closeBtn?.addEventListener("click", closeModal);

  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !backdrop.hidden) closeModal();
  });

  [panels.login, panels.signup].forEach((form) => {
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      closeModal();
      form.reset();
    });
  });
}

/* ---------- Back-to-top button ---------- */
function initBackToTop() {
  const button = document.getElementById("toTop");
  if (!button) return;

  window.addEventListener("scroll", () => {
    button.classList.toggle("visible", window.scrollY > 600);
  });

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}