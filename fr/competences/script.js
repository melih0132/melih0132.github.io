document.addEventListener("DOMContentLoaded", () => {
  class HamburgerMenu {
    constructor() {
      this.menuBtn = document.querySelector(".header__main-ham-menu-cont");
      this.smallMenu = document.querySelector(".header__sm-menu");
      this.menuIcon = document.querySelector(".header__main-ham-menu");
      this.closeIcon = document.querySelector(".header__main-ham-menu-close");
      this.menuLinks = document.querySelectorAll(".header__sm-menu-link");

      this.init();
    }

    init() {
      this.menuBtn?.addEventListener("click", () => this.toggleMenu());

      this.menuLinks.forEach(link =>
        link.addEventListener("click", () => this.closeMenu())
      );
    }

    toggleMenu() {
      const isActive = this.smallMenu.classList.toggle("header__sm-menu--active");
      this.menuIcon.classList.toggle("d-none");
      this.closeIcon.classList.toggle("d-none");

      const header = document.querySelector(".header");
      const heroSection = document.querySelector(".project-cs-hero");
      if (header) {
        if (isActive) {
          if (heroSection) {
            const heroBackgroundColor = window
              .getComputedStyle(heroSection)
              .backgroundColor;
            header.style.backgroundColor = heroBackgroundColor;
          } else {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
              header.style.backgroundColor = "#121212";
            } else {
              header.style.backgroundColor = "#fff";
            }
          }
        }
      }
    }

    closeMenu() {
      this.smallMenu.classList.remove("header__sm-menu--active");
      this.menuIcon.classList.remove("d-none");
      this.closeIcon.classList.add("d-none");

      const header = document.querySelector(".header");
      const heroSection = document.querySelector(".project-cs-hero");
      if (header) {
        if (heroSection) {
          const heroBackgroundColor = window
            .getComputedStyle(heroSection)
            .backgroundColor;
          header.style.backgroundColor = heroBackgroundColor;
        } else {
          if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            header.style.backgroundColor = "#1d1d1d";
          } else {
            header.style.backgroundColor = "#c4c4c4";
          }
        }
      }
    }
  }

  new HamburgerMenu();

  const headerLogoContainer = document.querySelector(".header__logo-container");
  headerLogoContainer?.addEventListener("click", () => {
    location.href = "/fr/#home";
  });

  const header = document.querySelector(".header");
  const heroSection = document.querySelector(".project-cs-hero");
  if (header && heroSection) {
    const updateHeaderColor = () => {
      const heroBackgroundColor = window
        .getComputedStyle(heroSection)
        .backgroundColor;
      header.style.backgroundColor = heroBackgroundColor;
    };
    
    // Appliquer la couleur initiale
    updateHeaderColor();
    
    // Maintenir la couleur même lors du scroll
    window.addEventListener("scroll", updateHeaderColor);
    
    // Observer les changements de mode dark/light
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateHeaderColor);
  }
});

