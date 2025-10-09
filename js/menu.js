const menuToggle = document.getElementById('menuToggle');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');

// Открытие / закрытие при клике на "МЕНЮ"
menuToggle.addEventListener('click', () => {
  menuOverlay.classList.add('active');
});

// Закрытие при клике на крестик
menuClose.addEventListener('click', () => {
  menuOverlay.classList.remove('active');
});

// Закрытие при клике на пункт меню
document.querySelectorAll('.menu-content a').forEach(link => {
  link.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
  });
});
