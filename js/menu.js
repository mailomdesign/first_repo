document.addEventListener("DOMContentLoaded", () => {
  // --- элементы мобильного меню ---
  const menuToggle = document.getElementById("menuToggle");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuClose = document.getElementById("menuClose");

  if (menuToggle && menuOverlay) {
    // открыть
    menuToggle.addEventListener("click", () => {
      menuOverlay.classList.add("active");
    });

    // закрыть
    if (menuClose) {
      menuClose.addEventListener("click", () => {
        menuOverlay.classList.remove("active");
      });
    }
  }

  // --- универсальная обработка всех меню (фикс + мобильное) ---
  const allMenuLinks = document.querySelectorAll(".menu-content a, .fixed-menu a");
  const isIndex = location.pathname === "/" || /(^|\/)index\.php$/.test(location.pathname);

  allMenuLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;

    link.addEventListener("click", e => {
      e.preventDefault();

      // 1️⃣ якорные ссылки (#contacts, #hero и т.п.)
      if (href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          smoothScrollToElement(target);
        } else {
          // если блока нет — переход на index.php#...
          window.location.href = buildIndexURL() + href;
        }
      }

      // 2️⃣ абсолютные ссылки (education.html и т.д.)
      else if (href.includes("#")) {
        try {
          const url = new URL(href, location.origin);
          const hash = url.hash;
          if (url.pathname === location.pathname) {
            const target = document.querySelector(hash);
            if (target) smoothScrollToElement(target);
            else window.location.href = buildIndexURL() + hash;
          } else {
            window.location.href = href;
          }
        } catch {
          window.location.href = href;
        }
      }

      // 3️⃣ обычные прямые ссылки без #
      else {
        window.location.href = href;
      }

      // закрываем оверлей (моб. меню)
      if (menuOverlay) menuOverlay.classList.remove("active");
    });
  });

  // --- плавный скролл ---
  function smoothScrollToElement(el) {
    const headerOffset = 80;
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }

  // --- построение абсолютного пути к index.php ---
  function buildIndexURL() {
    const pathParts = window.location.pathname.split("/");
    pathParts.pop();
    const basePath = pathParts.join("/") + "/";
    return window.location.origin + basePath + "index.php";
  }

  // --- автоскролл при загрузке с хэшем ---
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
