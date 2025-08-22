document.addEventListener('DOMContentLoaded', () => {
  // ========== НАВИГАЦИЯ МЕНЮ ==========
  const isIndex = location.pathname === '/' || /(^|\/)index\.php$/.test(location.pathname);
  const menuLinks = document.querySelectorAll('.fixed-menu a');

  menuLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    let targetId = link.dataset.target || null;
    if (!targetId) {
      if (href.startsWith('#')) targetId = href.slice(1);
      else if (href.includes('#')) {
        try { targetId = new URL(href, location.origin).hash.slice(1); } catch (e) { targetId = null; }
      }
    }
    if (!targetId) return;

    if (isIndex) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const el = document.getElementById(targetId);
        if (!el) {
          location.href = '/index.php#' + targetId;
          return;
        }
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', '#' + targetId);
      });
    } else {
      if (href.startsWith('#')) {
        link.href = '/index.php#' + targetId;
      }
    }
  });

  // ========== КАСТОМНЫЙ СКРОЛЛБАР ==========
  const thumb = document.querySelector('.scroll-thumb');
  if (thumb) {
    function updateThumbPosition() {
      const total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio = window.scrollY / total;
      const maxTop = Math.max(0, window.innerHeight - thumb.offsetHeight);
      thumb.style.top = (ratio * maxTop) + 'px';
    }

    let rafId = null;
    function scheduleUpdate() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateThumbPosition);
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    scheduleUpdate();

    let dragging = false;
    let startY = 0;
    let startTop = 0;

    function maxTop() {
      return Math.max(0, window.innerHeight - thumb.offsetHeight);
    }
    function scrollableHeight() {
      return Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    }

    thumb.addEventListener('pointerdown', (e) => {
      dragging = true;
      startY = e.clientY;
      startTop = parseFloat(getComputedStyle(thumb).top) || 0;
      thumb.setPointerCapture(e.pointerId);
      document.documentElement.style.scrollBehavior = 'auto';
    });

    window.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const delta = e.clientY - startY;
      const newTop = Math.min(Math.max(0, startTop + delta), maxTop());
      thumb.style.top = newTop + 'px';
      const ratio = newTop / maxTop();
      const newScrollY = ratio * scrollableHeight();
      window.scrollTo(0, newScrollY);
    });

    window.addEventListener('pointerup', (e) => {
      if (!dragging) return;
      dragging = false;
      thumb.releasePointerCapture(e.pointerId);
      document.documentElement.style.scrollBehavior = 'smooth';
    });
  }

  // ========== АНИМАЦИЯ SCROLL-FADE ==========
  const elements = document.querySelectorAll('.scroll-fade');
  if (elements.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    elements.forEach(el => observer.observe(el));
  }
});

// ВНЕ document.addEventListener(...), в самом начале или конце файла:
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// === EDUCATION: overlay + sticky state ======================================
(() => {
  const subnav = document.getElementById('edu-subnav');
  const wrap   = subnav ? subnav.closest('.edu-subnav-wrap') : null;
  if (!subnav || !wrap) return;

  // Создаём (или берём) глобальный белый оверлей в <body>
  let overlay = document.getElementById('edu-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'edu-overlay';
    document.body.appendChild(overlay);
  }

  const cs = getComputedStyle(subnav);
  const stickOffset = parseInt(cs.getPropertyValue('--stick-offset')) || 100;

  let raf = 0;
  function tick() {
    raf = 0;

    // положение обёртки относительно вьюпорта
    const r = wrap.getBoundingClientRect();
    const subH = subnav.offsetHeight;

    // Саб-меню считается "в зоне прилипания", если его верх уже дошёл до offset,
    // и нижняя граница секции ещё не вышла выше позиции саб-меню.
    const shouldStick = (r.top <= stickOffset) && (r.bottom > stickOffset + subH);

    // Переключаем состояние
    subnav.classList.toggle('is-stuck', shouldStick);
    overlay.classList.toggle('on', shouldStick);
  }

  function onScroll() {
    if (!raf) raf = requestAnimationFrame(tick);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  // первый расчёт
  onScroll();
})();


  




