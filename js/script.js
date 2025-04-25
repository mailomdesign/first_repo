document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('toggleButton');
  const content = document.getElementById('extraContent');

  if (button && content) {
    button.addEventListener('click', function () {
      if (content.style.display === 'none') {
        content.style.display = 'block';
        button.textContent = 'Скрыть';
      } else {
        content.style.display = 'none';
        button.textContent = 'Показать больше';
      }
    });
  }

  const track = document.querySelector('.carousel-track');
  const buttons = document.querySelectorAll('.portfolio-nav button');
  const leftArrow = document.querySelector('.carousel-arrow.left');
  const rightArrow = document.querySelector('.carousel-arrow.right');

  let scrollAmount = 0;
  const scrollStep = 320;

  function loadCategory(category) {
    fetch(`getImages.php?category=${category}`)
      .then(res => res.json())
      .then(images => {
        track.innerHTML = '';
        scrollAmount = 0;
        track.style.transform = `translateX(0px)`;

        images.forEach(img => {
          const div = document.createElement('div');
          div.className = 'carousel-item';
          div.style.backgroundImage = `url(${img})`;
          track.appendChild(div);
        });
      });
  }

  // Начальная загрузка
  loadCategory('print');

  // Обработка переключения категорий
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category;
      loadCategory(cat);
    });
  });

  // Стрелки прокрутки
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
});
