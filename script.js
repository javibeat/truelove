/**
 * TRUE LOVE CREATIVE - Main Script
 * Handles: Navigation, Portfolio Filtering, Scroll Animations, Mobile Menu
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.querySelector('.glass-header');
  const mainNav = document.getElementById('mainNav');
  const menuToggle = document.getElementById('menuToggle');
  const scrollTopBtn = document.getElementById('scrollTop');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const revealElements = document.querySelectorAll('.reveal');
  const navLinks = document.querySelectorAll('.main-nav a');

  // =====================
  // Mobile Menu Toggle
  // =====================
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);

      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // =====================
  // Smooth Scroll
  // =====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = header?.offsetHeight || 72;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // =====================
  // Active Navigation
  // =====================
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -80% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  document.querySelectorAll('section[id]').forEach(section => {
    sectionObserver.observe(section);
  });

  // =====================
  // Portfolio Filtering
  // =====================
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach((item, index) => {
        const category = item.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;

        if (shouldShow) {
          item.classList.remove('hidden');
          item.style.animationDelay = `${index * 0.1}s`;
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // =====================
  // Scroll Reveal Animation
  // =====================
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: stop observing after reveal
        // revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Also observe reveal-stagger elements
  document.querySelectorAll('.reveal-stagger').forEach(el => {
    revealObserver.observe(el);
  });

  // =====================
  // Scroll to Top Button
  // =====================
  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Show/hide scroll to top button
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('visible', scrollY > 400);
    }

    // Header background on scroll (optional enhancement)
    if (header) {
      header.classList.toggle('scrolled', scrollY > 50);
    }
  };

  // Throttle scroll events
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Scroll to top click handler
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // =====================
  // Logo Click - Scroll to top
  // =====================
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // =====================
  // Initial State
  // =====================
  handleScroll();

  // Trigger initial reveal for elements in viewport
  setTimeout(() => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  }, 100);

  // =====================
  // Performance: Lazy load images
  // =====================
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
      img.src = img.src; // Trigger load
    });
  } else {
    // Fallback for older browsers
    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          lazyImageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      lazyImageObserver.observe(img);
    });
  }

  // =====================
  // Keyboard Navigation
  // =====================
  document.addEventListener('keydown', (e) => {
    // Focus visible styles are handled by CSS :focus-visible

    // Close modals/menus on Escape
    if (e.key === 'Escape') {
      if (mainNav?.classList.contains('open')) {
        mainNav.classList.remove('open');
        menuToggle?.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

  console.log('✨ TRUE LOVE CREATIVE loaded successfully');
});
