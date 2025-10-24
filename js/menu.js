document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuClose = document.getElementById("menuClose");

  if (menuToggle && menuOverlay) {
    menuToggle.addEventListener("click", () => menuOverlay.classList.add("active"));
    if (menuClose) {
      menuClose.addEventListener("click", () => menuOverlay.classList.remove("active"));
    }
  }

  const allMenuLinks = document.querySelectorAll(".menu-content a, .fixed-menu a");
  const isIndex = location.pathname === "/" || /(^|\/)index\.php$/.test(location.pathname);

  allMenuLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;

    link.addEventListener("click", e => {
      e.preventDefault();

      // если ссылка указывает на index.php или другую страницу — просто перейти
      if (href.includes("index.php") || href.includes(".html")) {
        window.location.href = href;
        return;
      }

      // якорные ссылки внутри текущей страницы
      if (href.startsWith("#")) {
        const target = document.querySelector(href);

        if (target) {
          smoothScrollToElement(target);
        } else {
          // блока нет — перейти на index.php#...
          window.location.href = buildIndexURL() + href;
        }
      } else {
        // обычные прямые ссылки
        window.location.href = href;
      }

      if (menuOverlay) menuOverlay.classList.remove("active");
    });
  });

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
