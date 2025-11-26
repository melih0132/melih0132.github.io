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
      if (header) {
        if (isActive) {
          if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            header.style.backgroundColor = "#121212";
          } else {
            header.style.backgroundColor = "#fff";
          }
        }
      }
    }

    closeMenu() {
      this.smallMenu.classList.remove("header__sm-menu--active");
      this.menuIcon.classList.remove("d-none");
      this.closeIcon.classList.add("d-none");

      const header = document.querySelector(".header");
      if (header) {
        if (isActive) {
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
    location.href = "../#home";
  });

  const header = document.querySelector(".header");
  const heroSection = document.querySelector(".project-cs-hero");
  if (header && heroSection) {
    const heroBackgroundColor = window
      .getComputedStyle(heroSection)
      .backgroundColor;
    header.style.backgroundColor = heroBackgroundColor;
  }

  const skillColors = {
    HTML: "#E34C26",
    CSS: "#732f9c",
    JavaScript: "#F7DF1E",
    PHP: "#777BB4",
    Python: "#306998",
    ".NET/C#": "#9B4F96",
    PGSQL: "#336791",
    PostgreSQL: "#336791",
    pgAdmin4: "#326690",
    phpMyAdmin: "#f89d06",
    "Visual Paradigm": "#cc3433",
    PowerAMC: "#F08080",
    Git: "#F05032",
    GitHub: "#181717",
    Unity: "#222C37",
    WPF: "#512BD4",
    "Unit Tests": "#55606E",
    UML: "#007ACC",
    Phaser: "#00BCB4",
    Terminal: "#111111",
    Bash: "#4EAA25",
    Powershell: "#012456",
    "Microsoft Teams": "#6264A7",
    "Microsoft Azure": "#0078D4",
    Trello: "#0079BF",
    Bootstrap: "#6e11f5",
    Figma: "#42498c",
    Framer: "#0055FF",
    "Adobe Illustrator": "#FF9A00",
    WordPress: "#21759B",
    "Power BI": "#F2C811",
    Excel: "#217346",
    Nodemon: "#76D04B",
    Express: "#4B8BBE",
    "Socket.io": "#24c29f",
    "Node.js": "#3C873A",
    "VS Code": "#007ACC",
    Linux: "#ffc200",
    XAML: "#0C54C2",
    SQL: "#CC2927",
    Laravel: "#F05340",
    "3D Modeling": "#FF5733",
    Tkinter: "#1D6E1F",
    SQLite: "#003B57",
    CSV: "#FF9800",
    Flutter: "#02569B",
    Dart: "#00B4AB",
    "RESTful API": "#FF6B6B",
    "Visual Studio": "#5C2D91",
    Postman: "#FF6C37",
    Vue: "#4FC08D",
    ".NET Core": "#512BD4",
    C: "#A8B9CC",
    "C++": "#00599C",
    "C#": "#239120",
    FastAPI: "#05998B",
    React: "#61DAFB",
    TypeScript: "#3178C6",
    "Next.js": "#000000",
    SQLAlchemy: "#D71F24",
    Alembic: "#FF6B6B",
    Pytest: "#0A9EDC",
    Vite: "#646CFF",
    "Tailwind CSS": "#06B6D4",
    Swagger: "#85EA2D",
    Docker: "#2496ED",
    Swift: "#FA7343",
    UIKit: "#007AFF",
    "ASP.NET Core": "#512BD4",
    "WinUI 3": "#0078D4",
    Xcode: "#147EFB",
    "C# (.NET)": "#9B4F96",
    "JSON / JSONB": "#ffcc00",
    OOP: "#FF6B6B",
    "Design Patterns": "#9C27B0",
    HTTP: "#0052CC",
    "Web Service": "#00BCD4",
    MVC: "#FF9800",
    CRUD: "#4CAF50",
    "Tests Unitaires": "#55606E",
    Agile: "#A0CE4E",
    Scrum: "#FF7043",
    WebSockets: "#0091EA",
    Apache: "#D22128",
    Nginx: "#009639",
    "Vue.js": "#42b883",
    jQuery: "#0769AD",
    MongoDB: "#47A248",
    "PL/pgSQL": "#336791",
    Canva: "#00C4CC"
  };

  document.querySelectorAll(".skills__skill").forEach(skill => {
    const skillName = skill.textContent.trim();
    const color = skillColors[skillName];
    if (color) {
      skill.style.backgroundColor = color;
      skill.style.color = "#ffffff";
    }
  });
});