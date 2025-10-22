document.addEventListener("DOMContentLoaded", function() {
  const menuToggle = document.getElementById("menuToggle");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuClose = document.getElementById("menuClose");

  if (!menuToggle || !menuOverlay) return;

  // Открыть меню
  menuToggle.addEventListener("click", () => {
    menuOverlay.classList.add("active");
  });

  // Закрыть меню по крестику
  if (menuClose) {
    menuClose.addEventListener("click", () => {
      menuOverlay.classList.remove("active");
    });
  }

// Универсальная обработка кликов мобильного меню
document.querySelectorAll(".menu-content a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const href = link.getAttribute("href"); // вроде "#direction" или "index.php#direction"
    const currentPage = (window.location.pathname.split("/").pop() || "index.php");

    // Если это якорь
    if (href.startsWith("#")) {
      // Если мы уже на index.php — пытаемся плавно проскроллить
      if (currentPage === "index.php" || currentPage === "") {
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
        } else {
          // Если по какой-то причине элемент ещё не в DOM — сделаем fallback: навигация на index.php#...
          window.location.href = buildIndexURL() + href;
        }
      } else {
        // Не на index.php — переходим на абсолютный URL index.php#anchor
        window.location.href = buildIndexURL() + href;
      }
    } else {
      // Если ссылка уже содержит путь — просто перейти
      window.location.href = href;
    }

    // Закрыть меню
    const menuOverlay = document.getElementById("menuOverlay");
    if (menuOverlay) menuOverlay.classList.remove("active");
  });
});

/* Вспомогательная функция: строит абсолютный путь к index.php в текущей директории */
function buildIndexURL() {
  // Путь до текущей папки: /path/to/
  const pathParts = window.location.pathname.split("/");
  pathParts.pop(); // убрать имя файла (cases.php и т.п.)
  const basePath = pathParts.join("/") + "/";
  // пример: https://site.com/path/to/index.php
  return window.location.origin + basePath + "index.php";
}


// На index.php: если есть хэш в URL, прокручиваем к section после загрузки
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash) {
    const id = window.location.hash;
    // небольшая задержка — чтобы все блоки (и скрипты) успели отрисоваться/инициализироваться
    setTimeout(() => {
      const el = document.querySelector(id);
      if (el) {
        // Плавный скролл; если хочешь мгновенно — используй el.scrollIntoView()
        window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
      }
    }, 120); // 100–200 ms обычно достаточно
  }
});
}); // закрывает последний document.addEventListener

