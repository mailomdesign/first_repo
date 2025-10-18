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
    const currentPage = window.location.pathname.split("/").pop() || "index.php";

    // если ссылка — это якорь (например, #bio)
    if (href.startsWith("#")) {
      const target = document.querySelector(href);

      // если мы уже на главной и элемент существует → плавно скроллим
      if ((currentPage === "index.php" || currentPage === "") && target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: "smooth"
        });
      } else {
        // иначе переходим на index.php с нужным якорем
        window.location.href = "index.php" + href;
      }
    } else {
      // если ссылка содержит index.php# — просто переходим
      window.location.href = href;
    }

    // закрываем меню
    const menuOverlay = document.getElementById("menuOverlay");
    if (menuOverlay) menuOverlay.classList.remove("active");
  });
});
})();
