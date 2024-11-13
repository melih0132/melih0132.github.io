class HamburgerMenu {
  constructor() {
    this.menuBtn = document.querySelector('.header__main-ham-menu-cont');
    this.smallMenu = document.querySelector('.header__sm-menu');
    this.menuIcon = document.querySelector('.header__main-ham-menu');
    this.closeIcon = document.querySelector('.header__main-ham-menu-close');
    this.menuLinks = document.querySelectorAll('.header__sm-menu-link');

    this.init();
  }

  init() {
    this.menuBtn?.addEventListener('click', this.toggleMenu.bind(this));
    this.menuLinks.forEach(link => {
      link.addEventListener('click', this.closeMenu.bind(this));
    });
  }

  toggleMenu() {
    this.smallMenu.classList.toggle('header__sm-menu--active');
    this.menuIcon.classList.toggle('d-none');
    this.closeIcon.classList.toggle('d-none');
  }

  closeMenu() {
    this.smallMenu.classList.remove('header__sm-menu--active');
    this.menuIcon.classList.remove('d-none');
    this.closeIcon.classList.add('d-none');
  }
}

class Header {
  constructor() {
    this.header = document.querySelector('.header');
    this.logoContainer = document.querySelector('.header__logo-container');

    this.init();
  }

  init() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    this.logoContainer.addEventListener('click', this.handleLogoClick.bind(this));
    this.handleScroll();
  }

  handleScroll() {
    if (window.scrollY > CONFIG.scrollThreshold) {
      this.header.classList.add('header--scrolled');
    } else {
      this.header.classList.remove('header--scrolled');
    }
  }

  handleLogoClick() {
    location.href = '/fr/#home';
  }
}

class HeaderNav {
  constructor() {
    this.navLinks = document.querySelectorAll('.header__link');
    this.sections = document.querySelectorAll('section[id]');

    this.init();
  }

  init() {
    window.addEventListener('scroll', this.updateActiveSection.bind(this));
    this.updateActiveSection(); // Initial update

    this.navLinks.forEach(link => {
      link.addEventListener('click', this.handleNavClick.bind(this));
    });
  }

  updateActiveSection() {
    const scrollY = window.pageYOffset;

    this.sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        this.navLinks.forEach(link => {
          link.classList.remove('active');
        });

        const activeLink = document.querySelector(`.header__link[href="./#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }

  handleNavClick(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').replace('./#', '');
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new HamburgerMenu();
  new Header();
  new HeaderNav();
});

const skillColors = {
  "HTML": "#E34C26",
  "CSS": "#1572B6",
  "JavaScript": "#F7DF1E",
  "PHP": "#777BB4",
  "Python": "#306998",
  "C#": "#9B4F96",
  "PGSQL": "#336791",
  "PostgreSQL": "#336791",
  "MySQL": "#00758F",
  "Git": "#F05032",
  "GitHub": "#181717",
  "Unity": "#222C37",
  "WPF": "#512BD4",
  "Unit Tests": "#55606E",
  "UML": "#007ACC",
  "Phaser": "#00BCB4",
  "Terminal": "#111111",
  "Bash": "#4EAA25",
  "Powershell": "#012456",
  "Microsoft Teams": "#6264A7",
  "Trello": "#0079BF",
  "Figma": "#42498c",
  "Adobe Illustrator": "#FF9A00",
  "WordPress": "#21759B",
  "Power BI": "#F2C811",
  "Excel": "#217346",
  "Nodemon": "#76D04B",
  "Express": "#4B8BBE",
  "Socket.io": "#24c29f",
  "Node.js": "#3C873A",
  "VS Code": "#007ACC",
  "Linux": "#ffc200",
  "XAML": "#0C54C2",
  "SQL": "#CC2927",
  "3D Modeling": "#FF5733"
};

document.querySelectorAll(".skills__skill").forEach(skill => {
  const skillName = skill.textContent.trim();
  const color = skillColors[skillName];
  if (color) {
    skill.style.backgroundColor = color;
    skill.style.color = '#ffffff';
  }
});