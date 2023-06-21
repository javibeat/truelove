document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll(".section");
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  const logo = document.querySelector(".logo");
  const navMenu = document.querySelector(".nav-menu");

  function adjustSectionsHeight() {
    const windowHeight = window.innerHeight;

    sections.forEach((section) => {
      section.style.height = `${windowHeight}px`;
    });
  }

  function centerSectionInView() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight - windowHeight + 100) {
        section.classList.add("centered");
        activateMenuLink(section.id);
      } else {
        section.classList.remove("centered");
      }
    });

    if (scrollPosition >= windowHeight / 2) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  }

  function scrollToTop() {
    const homeSection = document.getElementById("home");
    homeSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function activateMenuLink(sectionId) {
    const menuLinks = navMenu.querySelectorAll("a");

    menuLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${sectionId}`) {
        link.classList.add("active");
      }
    });
  }

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
  function toggleMobileMenu() {
    navMenu.classList.toggle("active");
  }

  const menuToggle = document.querySelector(".menu-toggle");
  menuToggle.addEventListener("click", toggleMobileMenu);
});

// GALERÍA PORTFOLIO

document.addEventListener("DOMContentLoaded", function() {
  const menuButtons = document.querySelectorAll(".portfolio-menu-btn");
  const galleryItems = document.querySelectorAll(".portfolio-item");

  menuButtons.forEach(button => {
    button.addEventListener("click", function() {
      const filter = button.getAttribute("data-filter");

      menuButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      galleryItems.forEach(item => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});


