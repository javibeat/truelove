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

  // Only enable magnetic effects on non-touch devices
  if (window.matchMedia('(hover: hover)').matches) {
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
  }

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

  // =====================
  // Coming Soon Modal
  // =====================
  const modal = document.getElementById('comingSoonModal');
  const modalBtns = document.querySelectorAll('[data-modal="coming-soon"]');
  const modalClose = document.querySelector('.modal-close');
  const modalOverlay = document.querySelector('.modal-overlay');

  const openModal = () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  // =====================
  // Scroll Percentage Indicator
  // =====================
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  const progressCircle = document.getElementById('progress-circle');
  const progressText = document.getElementById('progress-text');

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Avoid division by zero
    if (docHeight <= 0) return;

    const scrollPercent = (scrollTop / docHeight) * 100;
    const clampedPercent = Math.min(Math.floor(scrollPercent), 100);

    // Update visibility of the container
    if (scrollTop > 200) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }

    // Update progress circle (conic-gradient)
    if (progressCircle) {
      const angle = clampedPercent * 3.6;
      progressCircle.style.background = `conic-gradient(var(--accent) ${angle}deg, rgba(255, 255, 255, 0.1) ${angle}deg 360deg)`;
    }

    // Update text
    if (progressText) {
      progressText.textContent = `${clampedPercent}%`;
    }

    // Switch to arrow at 100%
    if (clampedPercent >= 99) {
      scrollToTopBtn.classList.add('active');
    } else {
      scrollToTopBtn.classList.remove('active');
    }
  };

  if (scrollToTopBtn) {
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  console.log('✨ Jesper Redesign loaded successfully');
});
