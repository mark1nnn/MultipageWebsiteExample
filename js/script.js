(function () {
  const body = document.body;
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  const navLinks = Array.from(document.querySelectorAll(".nav-list a, .nav-dropdown-panel a"));
  const backToTop = document.querySelector("[data-back-to-top]");
  const dropdownToggles = Array.from(document.querySelectorAll("[data-dropdown-toggle]"));

  function setMenuState(isOpen) {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Закрити меню" : "Відкрити меню");
    nav.classList.toggle("is-open", isOpen);
    body.classList.toggle("nav-open", isOpen);
  }

  function setDropdownState(toggle, isOpen) {
    const panelId = toggle.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;
    toggle.setAttribute("aria-expanded", String(isOpen));
    panel?.classList.toggle("is-open", isOpen);
  }

  function updateScrollState() {
    const scrolled = window.scrollY > 24;
    header?.classList.toggle("is-scrolled", scrolled);
    backToTop?.classList.toggle("is-visible", window.scrollY > 520);
  }

  function currentFileName() {
    const fileName = window.location.pathname.split("/").pop();
    return fileName || "index.html";
  }

  function setActiveNavLinks() {
    const current = currentFileName();
    navLinks.forEach((link) => {
      const linkPath = new URL(link.getAttribute("href"), window.location.href).pathname;
      const linkFile = linkPath.split("/").pop() || "index.html";
      const isActive = linkFile === current;
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    dropdownToggles.forEach((toggle) => {
      const panelId = toggle.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;
      const hasActiveChild = Boolean(panel?.querySelector('[aria-current="page"]'));
      toggle.classList.toggle("is-current", hasActiveChild);
    });
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      dropdownToggles.forEach((item) => {
        if (item !== toggle) setDropdownState(item, false);
      });
      setDropdownState(toggle, !isOpen);
    });
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
      dropdownToggles.forEach((toggle) => setDropdownState(toggle, false));
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (!target.closest(".nav-dropdown")) {
      dropdownToggles.forEach((toggle) => setDropdownState(toggle, false));
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
      dropdownToggles.forEach((toggle) => setDropdownState(toggle, false));
    }
  });

  window.addEventListener("scroll", updateScrollState, { passive: true });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const panelId = button.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;
      const isOpen = button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", String(!isOpen));
      if (panel) {
        panel.hidden = isOpen;
      }
    });
  });

  function fieldError(form, field) {
    if (!field.id) return null;
    return form.querySelector(`[data-error-for="${field.id}"]`);
  }

  function showError(form, field, message) {
    if (!field) return;
    const error = fieldError(form, field);
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) {
      error.textContent = message;
    }
  }

  function clearErrors(form) {
    form.querySelectorAll("[aria-invalid]").forEach((field) => {
      field.setAttribute("aria-invalid", "false");
    });
    form.querySelectorAll(".field-error").forEach((error) => {
      error.textContent = "";
    });
  }

  function validateForm(form) {
    const name = form.elements.namedItem("name");
    const phone = form.elements.namedItem("phone");
    const service = form.elements.namedItem("service");
    const consent = form.elements.namedItem("consent");
    const invalidFields = [];

    clearErrors(form);

    if (name && !name.value.trim()) {
      showError(form, name, "Вкажіть ім’я.");
      invalidFields.push(name);
    }

    if (phone) {
      const phoneDigits = phone.value.replace(/\D/g, "");
      if (!phone.value.trim()) {
        showError(form, phone, "Вкажіть телефон.");
        invalidFields.push(phone);
      } else if (phoneDigits.length < 7) {
        showError(form, phone, "Телефон має містити щонайменше 7 цифр.");
        invalidFields.push(phone);
      }
    }

    if (service && !service.value.trim()) {
      showError(form, service, "Оберіть послугу або проблему.");
      invalidFields.push(service);
    }

    if (consent && !consent.checked) {
      showError(form, consent, "Підтвердіть згоду на обробку даних.");
      invalidFields.push(consent);
    }

    if (invalidFields.length > 0) {
      invalidFields[0].focus();
      return false;
    }

    return true;
  }

  function setServiceValue(serviceName) {
    if (!serviceName) return;
    document.querySelectorAll('select[name="service"]').forEach((select) => {
      const option = Array.from(select.options).find((item) => item.value === serviceName || item.textContent === serviceName);
      if (option) {
        select.value = option.value;
      }
    });
  }

  document.querySelectorAll("[data-service-choice]").forEach((link) => {
    link.addEventListener("click", () => {
      setServiceValue(link.getAttribute("data-service-choice"));
    });
  });

  const params = new URLSearchParams(window.location.search);
  setServiceValue(params.get("service"));

  document.querySelectorAll("[data-booking-form]").forEach((form) => {
    const statusMessage = form.querySelector("[data-form-status]");
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!validateForm(form)) {
        if (statusMessage) statusMessage.textContent = "";
        return;
      }

      // TODO: підключити реальне надсилання через Netlify Forms, Formspree, EmailJS або власний backend.
      if (statusMessage) {
        statusMessage.textContent = "Дякуємо! Ваша заявка підготовлена. Ми зв’яжемося з вами найближчим часом.";
      }
      form.reset();
      clearErrors(form);
    });
  });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  updateScrollState();
  setActiveNavLinks();
})();
