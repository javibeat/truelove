/**
 * TRUE LOVE CREATIVE - Main Script
 * Handles: Navigation, Portfolio Filtering, Scroll Animations, Mobile Menu
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.querySelector('.glass-header');
  const mainNav = document.getElementById('mainNav');
  const scrollTopBtn = document.getElementById('scrollTop');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const revealElements = document.querySelectorAll('.reveal');
  const navLinks = document.querySelectorAll('.pill-nav .nav-item');

  // =====================
  // Navigation Active State
  // =====================

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
  const sections = document.querySelectorAll('section[id]');

  function highlightNavigation() {
    // 1. Force Contact active if at bottom of page (strict override)
    if ((window.innerHeight + Math.ceil(window.scrollY)) >= document.documentElement.scrollHeight - 5) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#contact');
      });
      return;
    }

    // 2. Standard ScrollSpy: Active = The last section that has crossed the trigger line
    // We use a top offset (header size + buffer) so active state updates as soon as section hits top area.
    const triggerPoint = window.scrollY + 150;
    let activeId = '';

    sections.forEach(section => {
      if (triggerPoint >= section.offsetTop) {
        activeId = section.getAttribute('id');
      }
    });

    // 3. Update nav links
    if (activeId) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
      });
    }
  }

  window.addEventListener('scroll', highlightNavigation);
  // Initial check (delay slightly to ensure layout is done)
  setTimeout(highlightNavigation, 100);

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
  });

  console.log('✨ TRUE LOVE CREATIVE loaded successfully');
});
