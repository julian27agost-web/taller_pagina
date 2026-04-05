/* =============================================
   ReactPro — script.js
   Funcionalidades:
   1. Navbar: scroll + menú hamburguesa móvil
   2. Acordeón (temario y FAQ)
   3. Scroll reveal animations
   4. Toast de bienvenida
   5. Año dinámico en footer
============================================= */

// ══════════════════════════════════════════
// 1. NAVBAR — scroll + menú hamburguesa
// ══════════════════════════════════════════
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  // Cambiar fondo al hacer scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Abrir / cerrar menú móvil
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  // Cerrar menú al hacer clic en un enlace
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
})();


// ══════════════════════════════════════════
// 2. ACORDEÓN — temario y FAQ
// ══════════════════════════════════════════
(function initAccordion() {
  const buttons = document.querySelectorAll('.acc-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const body      = btn.nextElementSibling;   // .acc-body
      const isOpen    = btn.classList.contains('open');

      // Obtener el grupo (accordion padre) para cerrar los demás del mismo grupo
      const parentAcc = btn.closest('.accordion');
      if (parentAcc) {
        parentAcc.querySelectorAll('.acc-btn.open').forEach(openBtn => {
          if (openBtn !== btn) {
            openBtn.classList.remove('open');
            openBtn.nextElementSibling.classList.remove('show');
          }
        });
      }

      // Toggle del botón actual
      btn.classList.toggle('open', !isOpen);
      body.classList.toggle('show', !isOpen);
    });
  });
})();


// ══════════════════════════════════════════
// 3. SCROLL REVEAL
// ══════════════════════════════════════════
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // sólo animar una vez
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach(el => observer.observe(el));
})();


// ══════════════════════════════════════════
// 4. TOAST DE BIENVENIDA
// ══════════════════════════════════════════
(function initToast() {
  // Crear elemento
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = '🎉 <strong>¡Quedan 8 cupos!</strong> para la cohorte de junio';
  document.body.appendChild(toast);

  // Mostrar después de 2 segundos
  const showTimer = setTimeout(() => {
    toast.classList.add('show');

    // Ocultar después de 4 segundos
    const hideTimer = setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);

    // Cerrar al hacer clic
    toast.addEventListener('click', () => {
      clearTimeout(hideTimer);
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    });
  }, 2000);
})();


// ══════════════════════════════════════════
// 5. AÑO DINÁMICO EN FOOTER
// ══════════════════════════════════════════
(function updateYear() {
  const yearEls = document.querySelectorAll('[data-year]');
  const year = new Date().getFullYear();
  yearEls.forEach(el => (el.textContent = year));

  // También actualizar el texto estático si contiene el año
  document.querySelectorAll('.footer-row p').forEach(p => {
    p.textContent = p.textContent.replace(/\d{4}/, year);
  });
})();


// ══════════════════════════════════════════
// 6. SMOOTH SCROLL para enlaces internos
// ══════════════════════════════════════════
(function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav')) || 68;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
