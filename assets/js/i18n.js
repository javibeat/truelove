/**
 * TRUE LOVE CREATIVE - Internationalization (i18n) Module
 * Supports: English (en) - Primary, Spanish (es) - Secondary
 */

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.portfolio': 'Work',
    'nav.about': 'About',
    'nav.contact': 'Contact',

    // Hero
    'hero.true': 'TRUE',
    'hero.love': 'LOVE',
    'hero.creative': 'CREATIVE',
    'hero.tagline': 'HIGH-END DIGITAL EXPERIENCES',
    'hero.scroll': 'Scroll to Explore',

    // Intro
    'intro.text': "We craft high-impact digital experiences. Minimalist design, premium execution. From Dubai to the world.",

    // Services
    'services.title': 'SERVICES',
    'services.web': 'Web Design',
    'services.graphic': 'Graphic Design',
    'services.apps': 'App Development',

    // Portfolio
    'portfolio.title': 'SELECTED WORKS',
    'portfolio.all': 'All',
    'portfolio.websites': 'Websites',
    'portfolio.graphic': 'Graphic Design',
    'portfolio.apps': 'Apps',
    'portfolio.coming': 'Coming soon...',

    // CTA
    'cta.text': "LET'S WORK TOGETHER",

    // About (Legacy but kept for fallback)
    'about.title': 'About Me',
    'about.p1': "Hi, I'm Javi Beat, a passionate designer and DJ based in Dubai.",

    // Contact
    'contact.title': 'Get in Touch',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.social': 'Social',

    // Footer
    'footer.sitemap': 'SITEMAP',
    'footer.contact': 'CONTACT',
    'footer.rights': 'All rights reserved.',
    'footer.made': 'Made with',

    // Accessibility
    'aria.scrollTop': 'Scroll to top',

    // Modal
    'modal.title': 'COMING SOON',
    'modal.text': 'We are currently working on this section to bring you the best experience.',
    'modal.close': 'Close',
  },

  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.portfolio': 'Trabajos',
    'nav.about': 'Sobre mí',
    'nav.contact': 'Contacto',

    // Hero
    'hero.true': 'TRUE',
    'hero.love': 'LOVE',
    'hero.creative': 'CREATIVE',
    'hero.tagline': 'EXPERIENCIAS DIGITALES HIGH-END',
    'hero.scroll': 'Desliza para explorar',

    // Intro
    'intro.text': "Transformamos ideas en experiencias digitales de alto impacto. Diseño minimalista, ejecución premium. Desde Dubái para el mundo.",

    // Services
    'services.title': 'SERVICIOS',
    'services.web': 'Diseño Web',
    'services.graphic': 'Diseño Gráfico',
    'services.apps': 'Desarrollo de Apps',

    // Portfolio
    'portfolio.title': 'TRABAJOS SELECCIONADOS',
    'portfolio.all': 'Todo',
    'portfolio.websites': 'Webs',
    'portfolio.graphic': 'Diseño Gráfico',
    'portfolio.apps': 'Apps',
    'portfolio.coming': 'Próximamente...',

    // CTA
    'cta.text': 'TRABAJEMOS JUNTOS',

    // About (Legacy)
    'about.title': 'Sobre Mí',
    'about.p1': "Hola, soy Javi Beat, un apasionado diseñador y DJ con base en Dubai.",

    // Contact
    'contact.title': 'Contacto',
    'contact.email': 'Email',
    'contact.phone': 'Teléfono',
    'contact.social': 'Redes',

    // Footer
    'footer.sitemap': 'MAPA DEL SITIO',
    'footer.contact': 'CONTACTO',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.made': 'Hecho con',

    // Accessibility
    'aria.scrollTop': 'Volver arriba',

    // Modal
    'modal.title': 'PRÓXIMAMENTE',
    'modal.text': 'Estamos trabajando en esta sección para ofrecerte la mejor experiencia.',
    'modal.close': 'Cerrar',
  }
};

class I18n {
  constructor() {
    this.currentLang = this.detectLanguage();
    this.init();
  }

  /**
   * Detect language from URL, localStorage, or browser
   */
  detectLanguage() {
    // Check URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang && translations[urlLang]) {
      return urlLang;
    }

    // Check localStorage
    const storedLang = localStorage.getItem('tlc-lang');
    if (storedLang && translations[storedLang]) {
      return storedLang;
    }

    // Check browser language
    const browserLang = navigator.language.split('-')[0];
    if (translations[browserLang]) {
      return browserLang;
    }

    // Default to English
    return 'en';
  }

  /**
   * Initialize i18n system
   */
  init() {
    document.documentElement.lang = this.currentLang;
    this.updateAllTranslations();
    this.setupLangSwitchers();
  }

  /**
   * Get translation for a key
   */
  t(key) {
    return translations[this.currentLang][key] || translations['en'][key] || key;
  }

  /**
   * Switch language
   */
  setLanguage(lang) {
    if (!translations[lang]) return;

    this.currentLang = lang;
    localStorage.setItem('tlc-lang', lang);
    document.documentElement.lang = lang;

    // Update URL without reload
    const url = new URL(window.location);
    if (lang === 'en') {
      url.searchParams.delete('lang');
    } else {
      url.searchParams.set('lang', lang);
    }
    window.history.replaceState({}, '', url);

    this.updateAllTranslations();
    this.updateLangSwitchers();
  }

  /**
   * Update all elements with data-i18n attribute
   */
  updateAllTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });

    // Update aria-labels
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      el.setAttribute('aria-label', this.t(key));
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.setAttribute('placeholder', this.t(key));
    });
  }

  /**
   * Setup language switcher buttons
   */
  setupLangSwitchers() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        this.setLanguage(lang);
      });
    });
    this.updateLangSwitchers();
  }

  /**
   * Update active state on language buttons
   */
  updateLangSwitchers() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const lang = btn.getAttribute('data-lang');
      btn.classList.toggle('active', lang === this.currentLang);
    });
  }
}

// Initialize and export
const i18n = new I18n();

// Make available globally
window.i18n = i18n;
window.t = (key) => i18n.t(key);
