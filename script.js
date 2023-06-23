document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll(".section");
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  const logo = document.querySelector(".logo");
  const navMenu = document.querySelector(".nav-menu");
  const portfolioButtons = document.querySelectorAll(".portfolio-menu-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const portfolioMenuBtns = document.querySelectorAll(".portfolio-menu-btn");

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
      const isSectionInView = scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight - windowHeight + 100;

      section.classList.toggle("centered", isSectionInView);

      if (isSectionInView) {
        activateMenuLink(section.id);
      }
    });

    scrollToTopBtn.style.display = scrollPosition >= windowHeight / 2 ? "block" : "none";
  }

  function scrollToTop() {
    const homeSection = document.getElementById("home");
    homeSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function activateMenuLink(sectionId) {
    const menuLinks = navMenu.querySelectorAll("a");

    menuLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${sectionId}`;
      link.classList.toggle("active", isActive);
    });
  }

  function filterPortfolioItems(category) {
    portfolioItems.forEach((item) => {
      const itemCategories = item.getAttribute("data-category").split(" ");
      const isActive = category === "all" || itemCategories.includes(category);
      item.classList.toggle("active", isActive);
    });
  }

  function handleMenuItemClick(e) {
    e.preventDefault();
    const targetSectionId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetSectionId);
    targetSection.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

  function handleWheelScroll(event) {
    event.preventDefault();
    const deltaY = event.deltaY;
    const windowHeight = window.innerHeight;
    const currentSection = document.querySelector(".centered");
    const nextSection = deltaY > 0 ? currentSection.nextElementSibling : currentSection.previousElementSibling;

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }
  }

  function toggleMobileMenu() {
    navMenu.classList.toggle("active");
  }

  function handlePortfolioButtonClick() {
    const category = this.getAttribute("data-filter");

    portfolioMenuBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    this.classList.add("active");

    portfolioItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");
      const isActive = category === "all" || category === itemCategory;
      item.style.display = isActive ? "block" : "none";
    });
  }

  logo.addEventListener("click", scrollToTop);
  scrollToTopBtn.addEventListener("click", scrollToTop);
  window.addEventListener("resize", adjustSectionsHeight);
  window.addEventListener("scroll", centerSectionInView);

  portfolioMenuBtns.forEach((btn) => {
    btn.addEventListener("click", handlePortfolioButtonClick);
  });

  // Smooth Scroll
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", handleMenuItemClick);
  });

  // Scroll with Mouse Wheel
  document.addEventListener("wheel", handleWheelScroll);

  // Mobile Menu
  const menuToggle = document.querySelector(".menu-toggle");
  menuToggle.addEventListener("click", toggleMobileMenu);

  // Initial filtering (show all items)
  handlePortfolioButtonClick.call(portfolioMenuBtns[0]);

  adjustSectionsHeight();
  centerSectionInView();
});
