/**
 * TRUE LOVE CREATIVE - Jesper Redesign Script
 * Handles: Smooth Scroll, Scroll Reveal, Magnetic Cursor, Language Switching
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.querySelector('.site-header');
  const revealElements = document.querySelectorAll('.reveal');
  const langBtns = document.querySelectorAll('.lang-btn');

  // =====================
  // Smooth Scroll
  // =====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // =====================
  // Scroll Reveal Animation
  // =====================
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // =====================
  // Magnetic Cursor (Simplified)
  // =====================
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  // =====================
  // Magnetic Buttons
  // =====================
  const magneticEls = document.querySelectorAll('.btn-contact, .cta-large-link, .site-logo');

  magneticEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = `translate(0px, 0px)`;
    });
  });

  // Custom Cursor
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .service-item, .bento-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  });

  // =====================
  // Header Scroll State
  // =====================
  const handleScroll = () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // =====================
  // Language Switching (i18n.js integration)
  // =====================
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (typeof setLanguage === 'function') {
        setLanguage(lang);
      }
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  console.log('✨ Jesper Redesign loaded successfully');
});
