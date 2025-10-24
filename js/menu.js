document.addEventListener("DOMContentLoaded", function() {
  const menuToggle = document.getElementById("menuToggle");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuClose = document.getElementById("menuClose");

  if (!menuToggle || !menuOverlay) return;

  // === Открыть меню ===
  menuToggle.addEventListener("click", () => {
    menuOverlay.classList.add("active");
  });

  // === Закрыть меню по крестику ===
  if (menuClose) {
    menuClose.addEventListener("click", () => {
      menuOverlay.classList.remove("active");
    });
  }

  // === Универсальная обработка ссылок меню ===
  document.querySelectorAll(".menu-content a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const href = link.getAttribute("href"); // например "#contacts" или "index.php#contacts"
      const currentPage = window.location.pathname.split("/").pop() || "index.php";

      // --- Только якоря (#section) ---
      if (href.startsWith("#")) {
        const target = document.querySelector(href);

        if (target) {
          // 1️⃣ Блок есть на текущей странице — плавно прокручиваем
          window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
        } else {
          // 2️⃣ Блока нет — открываем index.php с этим якорем
          window.location.href = buildIndexURL() + href;
        }
      } else {
        // --- Прямая ссылка, переходим как обычно ---
        window.location.href = href;
      }

      // --- Закрыть меню ---
      menuOverlay.classList.remove("active");
    });
  });

  // === Хелпер для построения ссылки на index.php ===
  function buildIndexURL() {
    const pathParts = window.location.pathname.split("/");
    pathParts.pop(); // убрать имя файла (education.html и т.п.)
    const basePath = pathParts.join("/") + "/";
    return window.location.origin + basePath + "index.php";
  }

  // === Автоматический скролл к блоку при загрузке страницы с хэшем ===
  if (window.location.hash) {
    setTimeout(() => {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }
});
