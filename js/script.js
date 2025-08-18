// js/script.js
document.addEventListener('DOMContentLoaded', () => {
  // ========== НАВИГАЦИЯ МЕНЮ ==========
  const isIndex = location.pathname === '/' || /(^|\/)index\.php$/.test(location.pathname);
  const menuLinks = document.querySelectorAll('.fixed-menu a');

  menuLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    // приоритет: data-target, затем hash в href
    let targetId = link.dataset.target || null;
    if (!targetId) {
      if (href.startsWith('#')) targetId = href.slice(1);
      else if (href.includes('#')) {
        try { targetId = new URL(href, location.origin).hash.slice(1); } catch (e) { targetId = null; }
      }
    }

    // если нет якоря — ничего не трогаем (это внешняя/отдельная страница)
    if (!targetId) return;

    if (isIndex) {
      // На главной — перехватываем и плавно скроллим без перезагрузки
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const el = document.getElementById(targetId);
        if (!el) {
          // если вдруг нет элемента — уходим по ссылке (без перехвата)
          location.href = '/index.php#' + targetId;
          return;
        }
        // Плавный скролл к элементу (CSS scroll-margin-top должен быть задан)
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // обновляем hash без прыжка
        history.replaceState(null, '', '#' + targetId);
      });
    } else {
      // НЕ на главной — убедимся что ссылка ведёт на /index.php#id
      // если href был "#id", сделаем его явным, чтобы при клике браузер перешёл на index.php#id
      if (href.startsWith('#')) {
        link.href = '/index.php#' + targetId;
      }
      // не перехватываем клики — позволяем браузеру перейти на index.php#id
    }
  });


  // ========== КАСТОМНЫЙ СКРОЛЛБАР (плавный + drag) ==========
  const thumb = document.querySelector('.scroll-thumb');
  if (!thumb) return;

  // Обновление позиции ползунка — с rAF
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

  // pointer (works with mouse + touch)
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
    // временно отключаем нативный smooth при drag, чтобы scrollTo был мгновенным
    document.documentElement.style.scrollBehavior = 'auto';
  });

  window.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const delta = e.clientY - startY;
    const newTop = Math.min(Math.max(0, startTop + delta), maxTop());
    thumb.style.top = newTop + 'px';

    // переводим позицию ползунка в scrollY
    const ratio = newTop / maxTop();
    const newScrollY = ratio * scrollableHeight();
    window.scrollTo(0, newScrollY);
  });

  window.addEventListener('pointerup', (e) => {
    if (!dragging) return;
    dragging = false;
    thumb.releasePointerCapture(e.pointerId);
    // возвращаем плавный скролл после drag
    document.documentElement.style.scrollBehavior = 'smooth';
  });
});

