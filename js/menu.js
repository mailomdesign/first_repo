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

  // Плавный скролл по ссылкам
  document.querySelectorAll(".menu-content a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: "smooth"
        });
      }
      menuOverlay.classList.remove("active");
    });
  });
});

(function() {
  function updateStatsMode() {
    var wrap = document.querySelector('.stats-numbers');
    if (!wrap) return;
    if (window.innerWidth <= 768) {
      wrap.classList.add('mobile-stats');
    } else {
      wrap.classList.remove('mobile-stats');
    }
  }

  // запуск при загрузке
  document.addEventListener('DOMContentLoaded', updateStatsMode);
  // запуск при изменении размера
  window.addEventListener('resize', function() {
    // мелкая оптимизация: запускаем с небольшой задержкой
    clearTimeout(window._mobileStatsResizeTimer);
    window._mobileStatsResizeTimer = setTimeout(updateStatsMode, 120);
  });
})();
