document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuClose = document.getElementById("menuClose");

  // === Открытие / закрытие мобильного меню ===
  if (menuToggle && menuOverlay) {
    menuToggle.addEventListener("click", () => menuOverlay.classList.add("active"));
    if (menuClose) {
      menuClose.addEventListener("click", () => menuOverlay.classList.remove("active"));
    }
  }

  // === Общая обработка ссылок (фикс + мобильное меню) ===
  const allMenuLinks = document.querySelectorAll(".menu-content a, .fixed-menu a");
  allMenuLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const href = link.getAttribute("href");
      if (!href) return;

      handleNavigation(href);

      if (menuOverlay) menuOverlay.classList.remove("active");
    });
  });

  // === Основная логика ===
  function handleNavigation(href) {
    const isOnIndex = isIndexPage();

    // --- Контакты ---
    if (href.includes("#contacts")) {
      const localContacts = document.querySelector("#contacts") || document.querySelector(".contacts-section");
      if (localContacts) {
        smoothScrollToElement(localContacts);
      } else {
        window.location.href = buildIndexURL() + "#contacts";
      }
      return;
    }

    // --- Главная / Био / Направление / Обучение / Кейсы ---
    const mainSections = ["#hero", "#bio", "#direction", "#education", "#cases"];
    const match = mainSections.find(sec => href.includes(sec));

    if (match) {
      if (!isOnIndex) {
        // если не на главной → перейти на index.php#section
        window.location.href = buildIndexURL() + match;
      } else {
        // если уже на главной → просто скролл
        const target = document.querySelector(match);
        if (target) smoothScrollToElement(target);
        else window.location.href = buildIndexURL() + match;
      }
      return;
    }

    // --- Любые другие случаи (education.html и т.д.) ---
    window.location.href = href;
  }

  // === Вспомогательные ===
  function isIndexPage() {
    const file = window.location.pathname.split("/").pop();
    return file === "" || file === "index.php";
  }

  function smoothScrollToElement(el) {
    const headerOffset = 80;
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }

  function buildIndexURL() {
    const pathParts = window.location.pathname.split("/");
    pathParts.pop();
    const basePath = pathParts.join("/") + "/";
    return window.location.origin + basePath + "index.php";
  }

  // === Автоскролл при загрузке страницы с хэшем ===
  function tryScrollToHash() {
    const hash = window.location.hash;
    if (!hash) return;
    let attempts = 0;
    const maxAttempts = 40;

    const interval = setInterval(() => {
      const el = document.querySelector(hash);
      attempts++;
      if (el) {
        clearInterval(interval);
        requestAnimationFrame(() => smoothScrollToElement(el));
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 120);
  }

  window.addEventListener("load", tryScrollToHash);
  window.addEventListener("hashchange", tryScrollToHash);
});
