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
      try {
        targetId = new URL(href, location.origin).hash.slice(1);
      } catch (e) {
        targetId = null;
      }
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

      // --- Центровка по экрану ---
      const targetRect = el.getBoundingClientRect();
      const targetY = window.scrollY + targetRect.top;
      const offset = 0; // регулируй ↑↓: отриц. выше, положит. ниже
      const centerY = targetY - (window.innerHeight / 2) + (el.offsetHeight / 2) + offset;

      window.scrollTo({ top: centerY, behavior: 'smooth' });
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

// === EDUCATION subnav tabs ===
document.addEventListener('DOMContentLoaded', () => {
  const subnav = document.getElementById('edu-subnav');
  if (!subnav) return;

  const tabs = Array.from(subnav.querySelectorAll('.edu-tab'));
  const panels = Array.from(document.querySelectorAll('.edu-panel'));
  const wrap = subnav.closest('.edu-subnav-wrap');
  const sentinel = wrap && wrap.querySelector('.edu-sentinel');

  // === переключение вкладок ===
  function setActive(id) {
    subnav.dataset.active = id;

    tabs.forEach(btn => {
      const on = btn.dataset.tab === id;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
      btn.setAttribute('tabindex', on ? '0' : '-1');
    });

    panels.forEach(p => {
      p.classList.toggle('is-hidden', p.dataset.panel !== id);
    });
  }

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      setActive(btn.dataset.tab);
    });
  });

  // === фиксация подменю ===
  if (wrap && sentinel) {
    const ph = document.createElement('div');
    ph.className = 'edu-subnav-placeholder';
    wrap.insertBefore(ph, subnav);

    const css = getComputedStyle(subnav);
    const stickOffset = parseInt(css.getPropertyValue('--stick-offset')) || 100;

    function fix() {
      if (!subnav.classList.contains('is-fixed')) {
        ph.style.height = subnav.offsetHeight + 'px';
        subnav.classList.add('is-fixed');
      }
    }
    function unfix() {
      if (subnav.classList.contains('is-fixed')) {
        subnav.classList.remove('is-fixed');
        ph.style.height = '0px';
      }
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          unfix(); // пока маяк в зоне — едет в потоке
        } else {
          fix();   // как только ушёл вверх — фиксируем
        }
      });
    }, { rootMargin: `-${stickOffset}px 0px 0px 0px`, threshold: 0 });

    io.observe(sentinel);

    window.addEventListener('resize', () => {
      if (subnav.classList.contains('is-fixed')) {
        ph.style.height = subnav.offsetHeight + 'px';
      }
    });
  }
});

// === EDUCATION subnav: фиксация + overlay ===
(() => {
  const subnav  = document.getElementById('edu-subnav');
  const wrap    = subnav?.parentElement;
  const overlay = document.getElementById('edu-overlay');

  if (!subnav || !wrap || !overlay) return;

  // placeholder, чтобы не прыгал контент
  const ph = document.createElement('div');
  ph.className = 'edu-subnav-placeholder';
  wrap.insertBefore(ph, subnav);

  // сторожок — для отслеживания момента прилипания
  let sent = document.getElementById('edu-stick-sentinel');
  if (!sent) {
    sent = document.createElement('div');
    sent.id = 'edu-stick-sentinel';
    sent.style.position = 'relative';
    sent.style.height = '1px';
    wrap.insertBefore(sent, subnav);
  }

  const css         = getComputedStyle(subnav);
  const stickOffset = parseInt(css.getPropertyValue('--stick-offset')) || 100;

  function fix() {
    if (!subnav.classList.contains('is-fixed')) {
      ph.style.height = subnav.offsetHeight + 'px';
      subnav.classList.add('is-fixed');
      overlay.classList.add('on');
    }
  }
  function unfix() {
    if (subnav.classList.contains('is-fixed')) {
      subnav.classList.remove('is-fixed');
      ph.style.height = '0px';
      overlay.classList.remove('on');
    }
  }

  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      unfix();   // пока sentinel виден → меню в потоке
    } else {
      fix();     // sentinel ушёл вверх → фиксируем
    }
  }, {
    rootMargin: `-${stickOffset}px 0px 0px 0px`,
    threshold: 0
  });

  io.observe(sent);

  // при ресайзе пересчитываем высоту
  window.addEventListener('resize', () => {
    if (subnav.classList.contains('is-fixed')) {
      ph.style.height = subnav.offsetHeight + 'px';
    }
  });
})();

(() => {
  const subnav  = document.getElementById('edu-subnav');
  const overlay = document.getElementById('edu-overlay');
  if (!subnav || !overlay) return;

  // sentinel (маяк для Observer)
  let sent = document.getElementById('edu-stick-sentinel');
  if (!sent) {
    sent = document.createElement('div');
    sent.id = 'edu-stick-sentinel';
    sent.style.position = 'relative';
    sent.style.height = '1px';
    subnav.parentElement.insertBefore(sent, subnav);
  }

  const stickOffset = parseInt(
    getComputedStyle(subnav).getPropertyValue('--stick-offset')
  ) || 100;

  const io = new IntersectionObserver(([entry]) => {
    const stuck = entry.isIntersecting === false;
    subnav.classList.toggle('is-stuck', stuck);
    overlay.classList.toggle('is-visible', stuck);
  }, { 
    rootMargin: `-${stickOffset}px 0px 0px 0px`,
    threshold: 0 
  });

  io.observe(sent);

  // дополнительная проверка на scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY <= sent.getBoundingClientRect().top + window.scrollY) {
      // в верхней части страницы → сбрасываем фиксацию
      subnav.classList.remove('is-stuck');
      overlay.classList.remove('is-visible');
    }
  });
})();


// === Универсальный делегированный обработчик модалки ===
(function() {
  const modalId = "feedbackModal";
  const modal = () => document.getElementById(modalId);
  const closeSelector = "#closeModal, .modal .close";

  function openFeedback(subjectValue) {
    const m = modal();
    if (!m) return;
    m.style.display = "block";
    document.body.style.overflow = "hidden";

    const subjectSel = m.querySelector("#subject");
    if (subjectSel && subjectValue) {
      const opt = Array.from(subjectSel.options).find(o => o.value === subjectValue);
      if (opt) subjectSel.value = subjectValue;
    }
  }

  function closeFeedback() {
    const m = modal();
    if (!m) return;
    m.style.display = "none";
    document.body.style.overflow = "";
  }

  document.addEventListener("click", function(e) {
    const opener = e.target.closest("#openModal, #openModalEdu, [data-open-feedback]");
    if (opener) {
      e.preventDefault();
      const subjectValue = opener.getAttribute("data-open-feedback-value") ||
        (opener.id === "openModalEdu" ? "Обучение" : null);
      openFeedback(subjectValue);
      return;
    }

    if (e.target.closest(closeSelector)) {
      e.preventDefault();
      closeFeedback();
      return;
    }

    const m = modal();
    if (m && e.target === m) closeFeedback();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      const m = modal();
      if (m && m.style.display === "block") closeFeedback();
    }
  });
})();


