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

  // === Общая обработка ссылок меню ===
  const allMenuLinks = document.querySelectorAll(".menu-content a, .fixed-menu a");
  allMenuLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const href = link.getAttribute("href");
      if (!href) return;

      handleNavigation(href);

      // закрыть мобильное меню
      if (menuOverlay) menuOverlay.classList.remove("active");
    });
  });

  // === Универсальная функция навигации ===
  function handleNavigation(href) {
    // 1️⃣ чистый якорь (#contacts и т.п.)
    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        smoothScrollToElement(target);
      } else {
        window.location.href = buildIndexURL() + href;
      }
      return;
    }

    // 2️⃣ ссылка вида index.php#section
    if (href.includes("index.php#")) {
      const [base, hash] = href.split("#");
      const target = document.querySelector(`#${hash}`);

      // если мы не на index.php → перейти
      if (!isCurrentPage(base)) {
        window.location.href = href;
        return;
      }

      // если блок найден → скролл, иначе переход
      if (target) {
        smoothScrollToElement(target);
      } else {
        window.location.href = href;
      }
      return;
    }

    // 3️⃣ ссылки на другие страницы (education.html#block)
    if (href.includes(".html#")) {
      const [base, hash] = href.split("#");
      const target = document.querySelector(`#${hash}`);

      if (!isCurrentPage(base)) {
        window.location.href = href;
        return;
      }

      if (target) {
        smoothScrollToElement(target);
      } else {
        window.location.href = href;
      }
      return;
    }

    // 4️⃣ просто переход, если не якорь
    window.location.href = href;
  }

  // === вспомогательные функции ===
  function isCurrentPage(base) {
    const current = window.location.pathname.split("/").pop() || "index.php";
    const compareTo = base.split("/").pop();
    return current === compareTo;
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
