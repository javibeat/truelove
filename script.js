document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll(".section");
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  const logo = document.querySelector(".logo");
  const navMenu = document.querySelector(".nav-menu");

  const adjustSectionsHeight = () => {
    const windowHeight = window.innerHeight;

    sections.forEach((section) => {
      section.style.height = `${windowHeight}px`;
    });
  };

  const centerSectionInView = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionOffset = 100;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight - windowHeight + sectionOffset
      ) {
        section.classList.add("centered");
        activateMenuLink(section.id);
      } else {
        section.classList.remove("centered");
      }
    });

    scrollToTopBtn.style.display = scrollPosition >= windowHeight / 2 ? "block" : "none";
  };

  const scrollToTop = () => {
    const homeSection = document.getElementById("home");
    homeSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activateMenuLink = (sectionId) => {
    const menuLinks = navMenu.querySelectorAll("a");

    menuLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${sectionId}`);
    });
  };

  logo.addEventListener("click", scrollToTop);
  scrollToTopBtn.addEventListener("click", scrollToTop);

  window.addEventListener("resize", adjustSectionsHeight);
  window.addEventListener("scroll", centerSectionInView);

  adjustSectionsHeight();
  centerSectionInView();

  // Smooth Scroll
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", (e) => {
      e.preventDefault();
      const targetSectionId = menuItem.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetSectionId);
      targetSection.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    });
  });

  // Scroll with Mouse Wheel
  document.addEventListener("wheel", function(event) {
    event.preventDefault();

    const deltaY = event.deltaY;
    const windowHeight = window.innerHeight;
    const currentSection = document.querySelector(".centered");
    const nextSection = deltaY > 0 ? currentSection.nextElementSibling : currentSection.previousElementSibling;

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }
  });

  // Mobile Menu
  const toggleMobileMenu = () => {
    navMenu.classList.toggle("active");
  };

  const menuToggle = document.querySelector(".menu-toggle");
  menuToggle.addEventListener("click", toggleMobileMenu);

  // GALERÍA PORTFOLIO
  const menuButtons = document.querySelectorAll(".portfolio-menu-btn");
  const galleryItems = document.querySelectorAll(".portfolio-item");

  menuButtons.forEach((button) => {
    button.addEventListener("click", function() {
      const filter = button.getAttribute("data-filter");

      menuButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      galleryItems.forEach((item) => {
        const category = item.getAttribute("data-category");
        item.style.display = filter === "all" || category === filter ? "block" : "none";
      });
    });
  });
});
