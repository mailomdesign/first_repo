/*
fetch('cases.json')
  .then(response => response.json())
  .then(cases => {
    const container = document.querySelector('.cases-container');

    cases.forEach(c => {
      const html = `
        <a href="${c.page}" class="case-link" style="text-decoration: none; color: inherit;">
          <div class="case-card" style="margin: 40px 0; border-bottom: 1px solid #ddd; padding: 20px 0;">
            <img src="${c.logo_bw}" alt="${c.title} logo" style="height: 60px; margin-bottom: 20px;">
            <h2 style="font-family: 'Russo One'; font-size: 40px; color: #000;">${c.title}</h2>
            <p style="font-family: 'Alumni Sans'; font-size: 20px; color: #333; max-width: 600px;">${c.desc}</p>
            <div style="color: #999; margin-top: 10px;">${c.tag}</div>
          </div>
        </a>
      `;
      container.innerHTML += html;
    });
  })
  .catch(err => {
    console.error('Ошибка загрузки кейсов:', err);
  });
*/

// 🔹 АНИМАЦИЯ ПОЯВЛЕНИЯ
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.scroll-fade, .scroll-auto-fade');

  const onScroll = () => {
    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        el.classList.add('visible');
      }
    });
  };

  document.addEventListener('scroll', onScroll);
  window.addEventListener('load', onScroll);
});

// 🔹 СКРОЛЛ-ИНДИКАТОР
window.addEventListener('scroll', () => {
  const bar = document.querySelector('.scroll-indicator-bar');
  if (!bar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.height = `${(scrollTop / docHeight) * 100}%`;
});

// 🔹 МОДАЛЬНОЕ ОКНО ДЛЯ ГАЛЕРЕИ
document.addEventListener('DOMContentLoaded', () => {
  const tiles = Array.from(document.querySelectorAll('.js-lb'));
  const box = document.getElementById('lightbox');
  const img = box.querySelector('.lb-img');
  const btnClose = box.querySelector('.lb-close');
  const btnPrev  = box.querySelector('.lb-prev');
  const btnNext  = box.querySelector('.lb-next');
  let i = 0;

  const getSrc = (el) => {
    if (el.dataset.src) return el.dataset.src;
    const tagImg = el.querySelector('img');
    if (tagImg) return tagImg.src;
    const bg = getComputedStyle(el).backgroundImage;
    return bg && bg !== 'none'
      ? bg.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
      : '';
  };

  const open = (idx) => {
    i = idx;
    img.src = getSrc(tiles[i]);
    box.hidden = false;
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    box.hidden = true;
    img.src = '';
    document.body.style.overflow = '';
  };

  const next = () => open((i + 1) % tiles.length);
  const prev = () => open((i - 1 + tiles.length) % tiles.length);

  tiles.forEach((el, idx) => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', (e) => { 
      e.preventDefault();
      open(idx);
    });
  });

  btnClose.addEventListener('click', close);
  btnNext.addEventListener('click', next);
  btnPrev.addEventListener('click', prev);

  // Клик по фону — закрыть
  box.addEventListener('click', (e) => { if (e.target === box) close(); });

  // Клавиатура
  document.addEventListener('keydown', (e) => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
});
