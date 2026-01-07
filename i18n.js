/**
 * TRUE LOVE CREATIVE - Internationalization (i18n) Module
 * Supports: English (en) - Primary, Spanish (es) - Secondary
 */

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'About',
    'nav.contact': 'Contact',

    // Hero
    'hero.greeting': 'Hello Stranger!',
    'hero.tagline': 'Web & Graphic Design',

    // Portfolio
    'portfolio.title': 'Portfolio',
    'portfolio.all': 'All',
    'portfolio.websites': 'Websites',
    'portfolio.graphic': 'Graphic Design',
    'portfolio.apps': 'Apps',
    'portfolio.coming': 'Coming soon...',

    // About
    'about.title': 'About Me',
    'about.p1': "Hi, I'm Javi Beat, a passionate designer and DJ based in Dubai. I believe that design is an art form, and I pour my creativity and love into every project I work on. With over 4 years of experience in the industry, I have helped numerous clients create visually stunning and impactful designs that leave a lasting impression.",
    'about.p2': "Designing is not just a job for me; it's my way of expressing myself and bringing ideas to life. I specialize in both graphic and web design, offering a range of services to meet the unique needs of each client. Whether it's creating a captivating website, designing stunning visual identities, or developing innovative app interfaces, I always strive for excellence and innovation.",
    'about.p3': "Beyond design, music is another passion of mine. As a DJ, I understand the power of rhythm and how it connects people on a deeper level. I bring this understanding into my design work, infusing it with a sense of harmony and rhythm that resonates with the target audience.",
    'about.p4': "If you're looking for a dedicated and talented designer who can bring your ideas to life and create visually captivating experiences, I would love to work with you. Let's collaborate and make your vision a reality!",

    // Contact
    'contact.title': 'Get in Touch',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.social': 'Social',

    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.made': 'Made with',

    // Accessibility
    'aria.scrollTop': 'Scroll to top',
    'aria.openMenu': 'Open menu',
    'aria.closeMenu': 'Close menu'
  },

  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.portfolio': 'Portafolio',
    'nav.about': 'Sobre mí',
    'nav.contact': 'Contacto',

    // Hero
    'hero.greeting': '¡Hola!',
    'hero.tagline': 'Diseño Web y Gráfico',

    // Portfolio
    'portfolio.title': 'Portafolio',
    'portfolio.all': 'Todo',
    'portfolio.websites': 'Webs',
    'portfolio.graphic': 'Diseño Gráfico',
    'portfolio.apps': 'Apps',
    'portfolio.coming': 'Próximamente...',

    // About
    'about.title': 'Sobre Mí',
    'about.p1': "Hola, soy Javi Beat, un apasionado diseñador y DJ con base en Dubai. Creo que el diseño es una forma de arte, y pongo mi creatividad y amor en cada proyecto en el que trabajo. Con más de 4 años de experiencia en la industria, he ayudado a numerosos clientes a crear diseños visualmente impresionantes e impactantes que dejan una huella duradera.",
    'about.p2': "Diseñar no es solo un trabajo para mí; es mi forma de expresarme y dar vida a las ideas. Me especializo tanto en diseño gráfico como web, ofreciendo una gama de servicios para satisfacer las necesidades únicas de cada cliente. Ya sea creando un sitio web cautivador, diseñando identidades visuales impresionantes o desarrollando interfaces de aplicaciones innovadoras, siempre busco la excelencia y la innovación.",
    'about.p3': "Más allá del diseño, la música es otra de mis pasiones. Como DJ, entiendo el poder del ritmo y cómo conecta a las personas a un nivel más profundo. Llevo esta comprensión a mi trabajo de diseño, infundiéndolo con un sentido de armonía y ritmo que resuena con el público objetivo.",
    'about.p4': "Si buscas un diseñador dedicado y talentoso que pueda dar vida a tus ideas y crear experiencias visualmente cautivadoras, me encantaría trabajar contigo. ¡Colaboremos y hagamos realidad tu visión!",

    // Contact
    'contact.title': 'Contacto',
    'contact.email': 'Email',
    'contact.phone': 'Teléfono',
    'contact.social': 'Redes',

    // Footer
    'footer.rights': 'Todos los derechos reservados.',
    'footer.made': 'Hecho con',

    // Accessibility
    'aria.scrollTop': 'Volver arriba',
    'aria.openMenu': 'Abrir menú',
    'aria.closeMenu': 'Cerrar menú'
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
