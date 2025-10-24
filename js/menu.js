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

      let hash = "";
      let page = "";

      // разбираем ссылку (например, index.php#contacts)
      if (href.includes("#")) {
        const [maybePage, maybeHash] = href.split("#");
        page = maybePage;
        hash = "#" + (maybeHash || "");
      } else if (href.startsWith("#")) {
        hash = href;
      }

      // если якорь есть и элемент существует на текущей странице
      if (hash && document.querySelector(hash)) {
        smoothScrollToElement(document.querySelector(hash));
      } 
      // если якорь есть, но элемента нет — перейти на index.php#hash
      else if (hash) {
        window.location.href = buildIndexURL() + hash;
      } 
      // иначе обычный переход
      else {
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

  // если страница загружается с хэшем (например, ...#contacts)
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
