/* ═══════════════════════════════════════════════════════
   ISHAN JOGALEKAR — PORTFOLIO SCRIPT
═══════════════════════════════════════════════════════ */

(() => {
  'use strict';

  /* ── Auto current year ────────────────────────────── */
  const yearEl = document.getElementById('currentYear');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ── DOM refs ─────────────────────────────────────── */
  const navbar    = document.getElementById('navbar');
  const burger    = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');
  const navLinks  = document.querySelectorAll('.nav-links a');
  const mnLinks   = document.querySelectorAll('.mn-link');
  const sections  = document.querySelectorAll('section[id]');

  /* ── Sticky nav shadow ────────────────────────────── */
  function onScroll() {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveNav();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Active nav link ──────────────────────────────── */
  function highlightActiveNav() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /* ── Mobile nav toggle ────────────────────────────── */
  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mnLinks.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close mobile nav on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !mobileNav.contains(e.target)) {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ── Scroll Reveal (IntersectionObserver) ─────────── */
  const revealEls = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-hero'
  );

  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
  );

  revealEls.forEach(el => revealObs.observe(el));

  /* ── Hero reveal on load ──────────────────────────── */
  window.addEventListener('load', () => {
    const heroEl = document.querySelector('.reveal-hero');
    if (heroEl) {
      setTimeout(() => heroEl.classList.add('visible'), 100);
    }
  });

  /* ── Smooth scroll for anchor links ──────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight + 12;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── Animated count-up for stats ──────────────────── */
  function animateCount(el, target, suffix = '') {
    const duration = 1400;
    const start    = performance.now();
    const isFloat  = target % 1 !== 0;

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current  = eased * target;
      el.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const statObs = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const raw = el.textContent.trim();
        const suffix = raw.replace(/[\d.]/g, '');
        const num    = parseFloat(raw);
        if (!isNaN(num)) animateCount(el, num, suffix);
        statObs.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.stat-num').forEach(el => statObs.observe(el));

  /* ── Parallax hero glow on mouse move ─────────────── */
  const heroGlow = document.querySelector('.hero-glow');

  if (heroGlow) {
    document.addEventListener('mousemove', (e) => {
      const xPct = (e.clientX / window.innerWidth  - 0.5) * 2;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 2;
      heroGlow.style.transform = `translate(${xPct * -20}px, ${yPct * -15}px)`;
    });
  }

  /* ── Navbar scroll highlight init ─────────────────── */
  onScroll();

})();
