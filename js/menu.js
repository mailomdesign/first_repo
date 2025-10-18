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

// Плавный скролл и переход для ссылок меню
document.querySelectorAll(".menu-content a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const href = link.getAttribute("href");
    const currentPage = window.location.pathname.split("/").pop();

    // Если ссылка указывает просто на якорь (#bio и т.п.)
    if (href.startsWith("#")) {
      const targetId = href;
      const target = document.querySelector(targetId);

      // Если мы уже на index.php и якорь существует — плавно скроллим
      if (currentPage === "index.php" && target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: "smooth"
        });
      } 
      // Если мы не на index.php — переходим туда с якорем
      else {
        window.location.href = "index.php" + href;
      }
    } 
    // Если это полная ссылка (index.php#bio и т.д.)
    else {
      window.location.href = href;
    }

    // Закрываем меню после клика
    const menuOverlay = document.getElementById("menuOverlay");
    if (menuOverlay) menuOverlay.classList.remove("active");
  });
});

