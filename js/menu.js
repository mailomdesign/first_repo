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

  // === Общая обработка ссылок (для мобильного и фиксированного меню) ===
  const allMenuLinks = document.querySelectorAll(".menu-content a, .fixed-menu a");
  allMenuLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const href = link.getAttribute("href");
      if (!href) return;

      handleNavigation(href);

      // закрытие мобильного меню
      if (menuOverlay) menuOverlay.classList.remove("active");
    });
  });

  // === Универсальная функция обработки переходов ===
  function handleNavigation(href) {
    // 1️⃣ Если ссылка — якорь (например "#contacts")
    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        smoothScrollToElement(target);
      } else {
        // если на текущей странице нет — перейти на главную
        window.location.href = buildIndexURL() + href;
      }
      return;
    }

    // 2️⃣ Если ссылка указывает на index.php#что-то
    if (href.includes("index.php#")) {
      const hash = href.split("#")[1];
      const target = document.getElementById(hash);
      if (target) {
        smoothScrollToElement(target);
      } else {
        window.location.href = href;
      }
      return;
    }

    // 3️⃣ Если ссылка на другую страницу (.html и т.п.)
    if (href.includes(".html")) {
      const hashIndex = href.indexOf("#");
      if (hashIndex !== -1) {
        const base = href.substring(0, hashIndex);
        const hash = href.substring(hashIndex);
        // проверяем, есть ли элемент с таким id на текущей странице
        const target = document.querySelector(hash);
        if (target) {
          smoothScrollToElement(target);
        } else {
          window.location.href = base + hash;
        }
      } else {
        window.location.href = href;
      }
      return;
    }

    // 4️⃣ Все остальные — просто переход
    window.location.href = href;
  }

  // === Плавный скролл с компенсацией отступа под шапку ===
  function smoothScrollToElement(el) {
    const headerOffset = 80;
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }

  // === Построение полного пути к index.php ===
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
