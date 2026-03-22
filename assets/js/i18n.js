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
    'intro.text': 'We craft <span class="highlight">high-impact</span> digital experiences. <span class="highlight">Minimalist</span> design, premium execution. From Dubai to the world.',

    // Services
    'services.title': 'SERVICES',
    'services.web': 'Web Design',
    'services.graphic': 'Graphic Design',
    'services.apps': 'App Development',

    // Portfolio
    'portfolio.title': 'SELECTED WORKS',
    'graphic.title': 'GRAPHIC DESIGN',
    'portfolio.view': 'View Project <i class="fas fa-arrow-right"></i>',
    'portfolio.viewDesign': 'View Design <i class="fas fa-expand"></i>',
    'portfolio.all': 'All',
    'portfolio.websites': 'Websites',
    'portfolio.graphic': 'Graphic Design',
    'portfolio.apps': 'Apps',
    'portfolio.coming': 'Coming soon...',

    // Portfolio Items
    'portfolio.kiko.cat': 'Web Design',
    'portfolio.kiko.desc': 'Legendary DJ & Producer personal website.',
    'portfolio.jess.cat': 'Branding & Web',
    'portfolio.jess.desc': 'Coaching and wellness platform.',
    'portfolio.javi.cat': 'Identity',
    'portfolio.estrela.cat': 'Portfolio',
    'portfolio.manu.cat': 'Web Design',
    'portfolio.manu.desc': 'Luxury Saxophonist personal brand and booking platform.',
    'portfolio.julio.cat': 'Identity',
    'portfolio.julio.desc': 'Violinist performance and artistic portfolio.',
    'portfolio.sergio.cat': 'Web Design',
    'portfolio.sergio.desc': 'Professional trumpet player portfolio.',

    // Digital Products
    'products.eyebrow': 'AVAILABLE FOR ACQUISITION',
    'products.title': 'DIGITAL PRODUCTS',
    'products.badge': '★ READY TO LAUNCH',
    'products.homeagent.cat': 'Real Estate Platform',
    'products.homeagent.title': 'Home Agent',
    'products.homeagent.desc': 'A fully-designed personal real estate portfolio platform. Listings, proforma calculator, lead capture — built and ready. No development needed.',
    'products.feat1': 'Responsive & mobile-first',
    'products.feat2': 'Proforma calculator included',
    'products.feat3': 'Lead capture forms',
    'products.feat4': 'White-label ready',
    'products.cta': 'Acquire this project',

    // Graphic Design
    'graphic.vinylCover': 'Vinyl Cover',

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
    'footer.tagline': 'Premium solutions in web & graphic design.',

    // Accessibility
    'aria.scrollTop': 'Scroll to top',

    // App Development
    'appdev.title': 'APP DEVELOPMENT',
    'appdev.badge': 'Live on iOS, Android & Web',
    'appdev.tagline': 'The marketplace that actually works.',
    'appdev.desc': 'Buy. Sell. Bid. Donate. 6 sections, 4 pricing models, real-time chat, zero commissions.',
    'appdev.view': 'View Project <i class="fas fa-arrow-right"></i>',
    'appdev.feat1': 'Categories',
    'appdev.feat2': 'Pricing Models',
    'appdev.feat3': 'Platforms',
    'appdev.feat4': 'Commission',
    'appdev.ios': '100% SwiftUI. Native performance.',
    'appdev.android': 'Material Design. Pixel perfect.',
    'appdev.web': 'Progressive Web App. Any browser.',

    // Nav (overlay)
    'nav.graphic': 'Graphic Design',
    'nav.products': 'Digital Products',
    'nav.behind': 'Behind the Scenes',

    // Behind the Scenes
    'bts.hero1': 'Not my job.',
    'bts.hero2': 'My obsession.',
    'bts.name': 'Javi Beat',
    'bts.role': 'Founder & Creative Director',
    'bts.bio': 'By day I work in a completely different world. Design is where I go when the day job ends — the space where I actually get to build things the way I think they should be built.',
    'bts.bio2': 'Dubai has been home for over a decade now. What started as a move became a life — and somewhere along the way, this city\'s energy pushed me to start creating on my own terms.',
    'bts.bio3': 'I started True Love Creative because I kept seeing websites that looked like everyone else\'s. No soul, no intention. A small studio with <span class="highlight">real taste</span> can deliver work that stands next to — or above — the big agencies.',
    'bts.bio4': 'Every project here was designed at night, on weekends, between flights. Not because I have to, but because I genuinely can\'t stop.',
    'bts.yearsDubai': 'Years in Dubai',
    'bts.projects': 'Projects Delivered',
    'bts.nights': 'Designed After Hours',
    'bts.quote': 'No agency. No rules.',
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
    'intro.text': 'Creamos experiencias digitales de <span class="highlight">alto impacto</span>. Diseño <span class="highlight">minimalista</span>, ejecución premium. Desde Dubai para el mundo.',

    // Services
    'services.title': 'SERVICIOS',
    'services.web': 'Diseño Web',
    'services.graphic': 'Diseño Gráfico',
    'services.apps': 'Desarrollo de Apps',

    // Portfolio
    'portfolio.title': 'TRABAJOS SELECCIONADOS',
    'graphic.title': 'DISEÑO GRÁFICO',
    'portfolio.view': 'Ver Proyecto <i class="fas fa-arrow-right"></i>',
    'portfolio.viewDesign': 'Ver Diseño <i class="fas fa-expand"></i>',
    'portfolio.all': 'Todo',
    'portfolio.websites': 'Webs',
    'portfolio.graphic': 'Diseño Gráfico',
    'portfolio.apps': 'Apps',
    'portfolio.coming': 'Próximamente...',

    // Portfolio Items
    'portfolio.kiko.cat': 'Diseño Web',
    'portfolio.kiko.desc': 'Web personal de DJ & Productor legendario.',
    'portfolio.jess.cat': 'Branding & Web',
    'portfolio.jess.desc': 'Plataforma de coaching y bienestar.',
    'portfolio.javi.cat': 'Identidad',
    'portfolio.estrela.cat': 'Portfolio',
    'portfolio.manu.cat': 'Diseño Web',
    'portfolio.manu.desc': 'Marca personal y plataforma de booking de saxofonista de lujo.',
    'portfolio.julio.cat': 'Identidad',
    'portfolio.julio.desc': 'Portfolio artístico y de performances de violinista.',
    'portfolio.sergio.cat': 'Diseño Web',
    'portfolio.sergio.desc': 'Portfolio profesional para trompetista.',

    // Digital Products
    'products.eyebrow': 'DISPONIBLE PARA ADQUISICIÓN',
    'products.title': 'PRODUCTOS DIGITALES',
    'products.badge': '★ LISTO PARA LANZAR',
    'products.homeagent.cat': 'Plataforma Inmobiliaria',
    'products.homeagent.title': 'Home Agent',
    'products.homeagent.desc': 'Una plataforma inmobiliaria personal completamente diseñada. Listados, calculadora proforma, captación de leads — construida y lista. Sin necesidad de desarrollo.',
    'products.feat1': 'Responsive y mobile-first',
    'products.feat2': 'Calculadora proforma incluida',
    'products.feat3': 'Formularios de captación',
    'products.feat4': 'Lista para white-label',
    'products.cta': 'Adquirir este proyecto',

    // Graphic Design
    'graphic.vinylCover': 'Portada de Vinilo',

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
    'footer.tagline': 'Soluciones premium en diseño web y gráfico.',

    // Accessibility
    'aria.scrollTop': 'Volver arriba',

    // App Development
    'appdev.title': 'DESARROLLO DE APPS',
    'appdev.badge': 'Disponible en iOS, Android y Web',
    'appdev.tagline': 'El marketplace que realmente funciona.',
    'appdev.desc': 'Compra. Vende. Puja. Dona. 6 secciones, 4 modelos de precio, chat en tiempo real, cero comisiones.',
    'appdev.view': 'Ver Proyecto <i class="fas fa-arrow-right"></i>',
    'appdev.feat1': 'Categorías',
    'appdev.feat2': 'Modelos de Precio',
    'appdev.feat3': 'Plataformas',
    'appdev.feat4': 'Comisión',
    'appdev.ios': '100% SwiftUI. Rendimiento nativo.',
    'appdev.android': 'Material Design. Pixel perfect.',
    'appdev.web': 'App Web Progresiva. Cualquier navegador.',

    // Nav (overlay)
    'nav.graphic': 'Diseño Gráfico',
    'nav.products': 'Productos Digitales',
    'nav.behind': 'Detrás de las Cámaras',

    // Behind the Scenes
    'bts.hero1': 'No es mi trabajo.',
    'bts.hero2': 'Es mi obsesión.',
    'bts.name': 'Javi Beat',
    'bts.role': 'Fundador y Director Creativo',
    'bts.bio': 'De día trabajo en un mundo completamente distinto. El diseño es donde voy cuando termina la jornada — el espacio donde realmente puedo construir las cosas como creo que deberían ser.',
    'bts.bio2': 'Dubai lleva siendo mi casa más de una década. Lo que empezó como una mudanza se convirtió en una vida — y en algún momento, la energía de esta ciudad me empujó a crear bajo mis propias reglas.',
    'bts.bio3': 'Fundé True Love Creative porque estaba cansado de ver webs que parecían todas iguales. Sin alma, sin intención. Un estudio pequeño con <span class="highlight">buen criterio</span> puede entregar trabajo que esté al nivel — o por encima — de las grandes agencias.',
    'bts.bio4': 'Cada proyecto de aquí fue diseñado de noche, en fines de semana, entre vuelos. No porque tenga que hacerlo, sino porque genuinamente no puedo parar.',
    'bts.yearsDubai': 'Años en Dubai',
    'bts.projects': 'Proyectos Entregados',
    'bts.nights': 'Diseñado Fuera de Horas',
    'bts.quote': 'Sin agencia. Sin reglas.',
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
      const translation = this.t(key);
      // Use innerHTML for elements with data-i18n-html attribute (supports highlight spans)
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = translation;
      } else {
        el.textContent = translation;
      }
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
