// Ожидаем полной загрузки страницы
document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('toggleButton');
  const content = document.getElementById('extraContent');

  button.addEventListener('click', function () {
    if (content.style.display === 'none') {
      content.style.display = 'block';
      button.textContent = 'Скрыть';
    } else {
      content.style.display = 'none';
      button.textContent = 'Показать больше';
    }
  });
});

const track = document.querySelector('.carousel-track');
const leftArrow = document.querySelector('.carousel-arrow.left');
const rightArrow = document.querySelector('.carousel-arrow.right');

let scrollAmount = 0;
const scrollStep = 300; // можно адаптировать под ширину карточки

leftArrow.addEventListener('click', () => {
  scrollAmount -= scrollStep;
  if (scrollAmount < 0) scrollAmount = 0;
  track.style.transform = `translateX(-${scrollAmount}px)`;
});

rightArrow.addEventListener('click', () => {
  const maxScroll = track.scrollWidth - track.clientWidth;
  scrollAmount += scrollStep;
  if (scrollAmount > maxScroll) scrollAmount = maxScroll;
  track.style.transform = `translateX(-${scrollAmount}px)`;
});

const buttons = document.querySelectorAll('.portfolio-nav button');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // В будущем здесь: фильтрация по btn.dataset.category
  });
});

<script src="script.js"></script>