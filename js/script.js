document.addEventListener('DOMContentLoaded', () => {

// ============================== Скролл бар ============================================================

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


// ============================== Обучение вкладки ============================================================

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

// ============================== Обучение вкладки ============================================================
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


// ============================== Форма обратной связи ============================================================

(function () {
  const modalId = "feedbackModal";
  const modal = () => document.getElementById(modalId);
  const closeSelector = "#closeModal, .modal .close";

  let initialContentHeight = null; // ← КЛЮЧ

  /* ---------- OPEN ---------- */

  function openFeedback(subjectValue) {
    const m = modal();
    if (!m) return;

    m.style.display = "block";
    document.body.style.overflow = "hidden";

    const subjectSel = m.querySelector("#subject");
    if (subjectSel && subjectValue) {
      const opt = [...subjectSel.options].find(o => o.value === subjectValue);
      if (opt) subjectSel.value = subjectValue;
    }

    const content = m.querySelector(".modal-content");

    if (content) {
      // 🔑 сбрасываем прошлую фиксацию
      content.style.minHeight = "";
      initialContentHeight = null;

      // 🔒 замеряем реальную высоту формы (ПОСЛЕ рендера)
      requestAnimationFrame(() => {
        initialContentHeight = content.offsetHeight;
      });
    }
  }

  /* ---------- CLOSE ---------- */

  function closeFeedback() {
    const m = modal();
    if (!m) return;

    m.style.display = "none";
    document.body.style.overflow = "";

    const form = m.querySelector("#feedbackForm");
    const success = m.querySelector(".feedback-success");
    const content = m.querySelector(".modal-content");

    if (form) {
      form.reset();
      form.style.display = "";
    }

    if (success) success.hidden = true;

    if (content) {
      content.classList.remove("fade-out");
      content.style.minHeight = ""; // 🔓 обязательно снимаем
    }

    initialContentHeight = null;
  }

  /* ---------- CLICK HANDLER ---------- */

  document.addEventListener("click", (e) => {
    const opener = e.target.closest(
      "#openModal, #openModalEdu, [data-open-feedback]"
    );

    if (opener) {
      e.preventDefault();

      let subjectValue =
        opener.getAttribute("data-open-feedback-value") ||
        (opener.id === "openModalEdu" ? "Обучение" : "Сотрудничество");

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

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const m = modal();
      if (m && m.style.display === "block") closeFeedback();
    }
  });

  /* ===============================
     AJAX SUBMIT
  ================================ */

  document.addEventListener(
    "submit",
    async (e) => {
      const form = e.target;
      if (!form.matches("#feedbackForm")) return;

      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const m = modal();
      const success = m.querySelector(".feedback-success");
      const successText = success.querySelector("p");
      const content = m.querySelector(".modal-content");

      const userName =
        form.querySelector("#name")?.value.trim() || "друг";

      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
        });

        if (!res.ok) throw new Error("Send failed");

        // 🔑 персонализированный текст
        successText.textContent =
          `Здравствуйте, ${userName}! Мы получили ваше обращение и скоро ответим.`;

        // 🔒 фиксируем МИНИМАЛЬНУЮ высоту белого окна
        if (content && initialContentHeight) {
          content.style.minHeight = initialContentHeight + "px";
        }

        form.style.display = "none";
        success.hidden = false;

        setTimeout(() => {
          content.classList.add("fade-out");
          setTimeout(closeFeedback, 1000);
        }, 3000);

      } catch (err) {
        alert("Ошибка отправки. Попробуйте позже.");
        console.error(err);
      }
    },
    true
  );
})();








// ============================== CookieBanner ============================================================

(function () {
  const banner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('cookieAccept');
  const closeBtn = document.getElementById('cookieClose'); // крестик

  // -------------------------------
  // чтение / запись состояния
  // -------------------------------
  function saveConsent(obj) {
    localStorage.setItem('site_consent', JSON.stringify(obj));
  }

  function loadConsent() {
    try {
      return JSON.parse(localStorage.getItem('site_consent'));
    } catch (e) {
      return null;
    }
  }

  function applyConsent(consentObj) {
    // отправляем в GTM
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'consent_update',
      consent: consentObj
    });

    // сохраняем выбор
    saveConsent(consentObj);

    // скрываем баннер
    if (banner) banner.style.display = 'none';
  }

  // -------------------------------
  // ИНИЦИАЛИЗАЦИЯ
  // -------------------------------

  const stored = loadConsent();

  if (stored) {
    // Уже был выбор → сразу применяем
    applyConsent(stored);
  } else {
    // Показываем баннер
    if (banner) banner.style.display = 'block';
  }

  // -------------------------------
  // ПОВЕДЕНИЕ КНОПОК
  // -------------------------------

  // Принять cookies (включить аналитику)
  acceptBtn && acceptBtn.addEventListener('click', () => {
    applyConsent({
      analytics_storage: 'granted',
      ad_storage: 'denied'
    });
  });

  // Крестик (отклонить аналитику)
  closeBtn && closeBtn.addEventListener('click', () => {
    applyConsent({
      analytics_storage: 'denied',
      ad_storage: 'denied'
    });
  });

})();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('SW registered', reg))
      .catch(err => console.warn('SW registration failed:', err));
  });
}

(function() {
  function hideMobileMenuIfDesktop() {
    const isDesktop = window.innerWidth >= 769;
    const m = document.querySelector('.mobile-menu');
    const o = document.querySelector('.menu-overlay');
    if (m) m.style.display = isDesktop ? 'none' : '';
    if (o) o.style.display = isDesktop ? 'none' : '';
  }

  // запускаем сразу и при изменении размера
  hideMobileMenuIfDesktop();
  window.addEventListener('resize', hideMobileMenuIfDesktop);
})();


