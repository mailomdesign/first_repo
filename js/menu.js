const menuToggle = document.getElementById('menuToggle');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');

// Открытие меню
menuToggle.addEventListener('click', () => {
  menuOverlay.classList.add('active');
});

// Закрытие при клике на крестик
menuClose.addEventListener('click', () => {
  menuOverlay.classList.remove('active');
});

// Клик по ссылке — плавный скролл
document.querySelectorAll('.menu-content a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      });
    }
    menuOverlay.classList.remove('active');
  });
});
