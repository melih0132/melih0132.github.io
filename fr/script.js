const CONFIG = {
  scrollThreshold: 50,
  messageDisplayTime: 3000,
  languageChangeInterval: 2000,
  translations: [
    "Hi", "Ciao", "Hola", "Hey",
    "Salut", "Oi", "Hej", "Hoi", "Heya",
    "ねえ", "嗨", "เฮ", "नम", "Прив",
    "Ви", "よ", "ハイ", "サン", "안녕",
    "Heyo", "Hola", "Olá", "Zdrav", "Cześć", 
    "Salaam", "Nam", "Merh", "Selam"
  ],
  skillColors: {
    // Langages
    "HTML": "#E34C26",
    "CSS": "#732f9c",
    "JavaScript": "#F7DF1E",
    "TypeScript": "#3178C6",
    "PHP": "#777BB4",
    "Python": "#306998",
    "C# (.NET)": "#9B4F96",
    "SQL": "#CC2927",
    "PL/pgSQL": "#336791",
    "Bash": "#4EAA25",
    "XAML": "#007ACC",

    // Frameworks & Bibliothèques
    "Laravel": "#F05340",
    "Node.js": "#3C873A",
    "Express": "#4B8BBE",
    "React": "#61DAFB",
    "Next.js": "#000000",
    "Vue.js": "#42b883",
    "Bootstrap": "#6e11f5",
    "jQuery": "#0769AD",
    "FastAPI": "#05998B",
    "Flutter": "#02569B",
    "Phaser": "#00BCB4",
    "WPF": "#512BD4",
    "Socket.io": "#24c29f",
    "Nodemon": "#76D04B",
    "Vite": "#646CFF",
    "Tailwind CSS": "#06B6D4",
    "SQLAlchemy": "#D71F24",
    "Alembic": "#FF6B6B",
    "Pytest": "#0A9EDC",

    // Bases de Données
    "PostgreSQL": "#336791",
    "MongoDB": "#47A248",
    "JSON / JSONB": "#ffcc00",
    "Indexation": "#6A1B9A",
    "Optimisation": "#6A1B9A",
    "Reverse Engineering": "#607D8B",
    "MCD": "#FF5733",
    "MLD": "#33FF57",

    // Environnement & Outils
    "VS Code": "#007ACC",
    "Visual Studio": "#5C2D91",
    "Unity": "#222C37",
    "Git": "#F05032",
    "GitHub": "#181717",
    "Docker": "#0db7ed",
    "pgAdmin4": "#326690",
    "Postman": "#FF6C37",
    "Swagger": "#85EA2D",
    "Nginx": "#009639",
    "Apache": "#D22128",
    "Linux": "#ffc200",
    "Microsoft Azure": "#0078D4",
    "Excel": "#217346",
    "Power BI": "#F2C811",
    "PowerAMC": "#F08080",
    "Visual Paradigm": "#cc3433",
    "Trello": "#0079BF",
    "Microsoft Teams": "#6264A7",

    // Design & CMS
    "Figma": "#42498c",
    "Adobe Illustrator": "#FF9A00",
    "Canva": "#00C4CC",
    "WordPress": "#21759B",
    "Framer": "#0055FF",

    // Méthodologies & Concepts
    "UML": "#007ACC",
    "MVC": "#FF9800",
    "CRUD": "#4CAF50",
    "Tests Unitaires": "#55606E",
    "RESTful API": "#26A69A",
    "WebSockets": "#0091EA",
    "Agile": "#A0CE4E",
    "Scrum": "#FF7043"
  }
};

class HamburgerMenu {
  constructor() {
    this.menuBtn = document.querySelector('.header__main-ham-menu-cont');
    this.smallMenu = document.querySelector('.header__sm-menu');
    this.menuIcon = document.querySelector('.header__main-ham-menu');
    this.closeIcon = document.querySelector('.header__main-ham-menu-close');
    this.menuLinks = document.querySelectorAll('.header__sm-menu-link');
    this.header = document.querySelector('.header');

    this.init();
  }

  init() {
    this.menuBtn?.addEventListener('click', () => this.toggleMenu());
    this.menuLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
  }

  toggleMenu() {
    const isActive = this.smallMenu.classList.toggle('header__sm-menu--active');
    this.menuIcon.classList.toggle('d-none');
    this.closeIcon.classList.toggle('d-none');

    if (isActive) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.header.style.backgroundColor = '#121212';
      }
      else {
        this.header.style.backgroundColor = '#fff';
      }
    } else {
      this.header.style.backgroundColor = '';
    }
  }

  closeMenu() {
    this.smallMenu.classList.remove('header__sm-menu--active');
    this.menuIcon.classList.remove('d-none');
    this.closeIcon.classList.add('d-none');
    this.header.style.backgroundColor = '';
  }
}

class Header {
  constructor() {
    this.header = document.querySelector('.header');
    this.logoContainer = document.querySelector('.header__logo-container');
    this.sections = document.querySelectorAll('section[id]');

    this.defaultBackgroundColor = window.getComputedStyle(this.header).backgroundColor;

    this.lightBackgroundColor = '#fff';
    this.darkBackgroundColor = '#121212';

    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.handleScroll());
    this.logoContainer.addEventListener('click', () => this.handleLogoClick());
    this.handleScroll();
  }

  handleScroll() {
    this.updateHeaderBackground();
    if (window.scrollY > CONFIG.scrollThreshold) {
      this.header.classList.add('header--scrolled');
    } else {
      this.header.classList.remove('header--scrolled');
    }

    if (window.scrollY === 0) {
      this.header.style.backgroundColor = 'transparent';
      this.header.style.boxShadow = 'none';
    }
    else if (window.scrollY > 0 && window.scrollY < CONFIG.scrollThreshold) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.header.style.backgroundColor = this.darkBackgroundColor;
      } else {
        this.header.style.backgroundColor = this.lightBackgroundColor;
      }
    }
  }

  updateHeaderBackground() {
    let currentSection = null;
    let closestDistance = Infinity;

    this.sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionBottom = sectionTop + sectionHeight;
      const distance = Math.abs(window.scrollY - sectionTop);

      if (section.id === 'home' || section.id === 'contact') {
        return;
      }

      if (distance < closestDistance && window.scrollY >= sectionTop && window.scrollY <= sectionBottom) {
        currentSection = section;
        closestDistance = distance;
      }
    });

    if (currentSection) {
      const backgroundColor = window.getComputedStyle(currentSection).backgroundColor;
      this.header.style.backgroundColor = backgroundColor;
      this.header.style.boxShadow = `0 0 0 0`;
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
    window.addEventListener('scroll', () => this.updateActiveSection());
    this.updateActiveSection();

    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleNavClick(e));
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

class MultilingualGreeting {
  constructor() {
    this.currentIndex = 0;
    this.langElement = document.getElementById('dynamic-lang');

    this.startRotation();
  }

  changeLanguage() {
    this.langElement.classList.add('slide-out');

    setTimeout(() => {
      this.langElement.textContent = CONFIG.translations[this.currentIndex];
      this.currentIndex = (this.currentIndex + 1) % CONFIG.translations.length;
      this.langElement.classList.remove('slide-out');
    }, 500);
  }

  startRotation() {
    setInterval(() => this.changeLanguage(), CONFIG.languageChangeInterval);
  }
}

class Skills {
  constructor() {
    this.skills = document.querySelectorAll('.skills__skill');
    this.applyColors();
  }

  applyColors() {
    this.skills.forEach(skill => {
      const skillName = skill.textContent.trim();
      const color = CONFIG.skillColors[skillName];
      if (color) {
        skill.style.backgroundColor = color;
        skill.style.color = '#ffffff';
      }
    });
  }
}

class CollapsibleSkills {
  constructor() {
    this.titles = document.querySelectorAll('.skills__category-title');
    this.skillRows = document.querySelectorAll('.skills__skill-row');
    this.mediaQuery = window.matchMedia('(max-width: 37.5em)');
    this.active = this.mediaQuery.matches;
    this.init();
  }

  init() {
    this.titles.forEach((title, index) => {
      const skillRow = title.nextElementSibling;
      title.setAttribute('role', 'button');
      title.setAttribute('aria-expanded', 'false');
      skillRow.setAttribute('aria-hidden', 'true');
    });

    this.handleMediaQueryChange(this.mediaQuery);
    this.mediaQuery.addEventListener('change', (e) => this.handleMediaQueryChange(e));

    document.documentElement.classList.add('js-enabled');
  }

  addEventListeners() {
    this.titles.forEach((title) => {
      title.addEventListener('click', this.toggleSkillRow);
    });
  }

  removeEventListeners() {
    this.titles.forEach((title) => {
      title.removeEventListener('click', this.toggleSkillRow);
    });
  }

  toggleSkillRow = (event) => {
    if (!this.active) return;
    const title = event.currentTarget;
    const skillRow = title.nextElementSibling;
    const isCurrentlyExpanded = skillRow.classList.contains('expanded');
    
    // Fermer tous les autres panneaux
    this.skillRows.forEach(row => {
      if (row !== skillRow) {
        this.collapse(row);
        const otherTitle = row.previousElementSibling;
        otherTitle.setAttribute('aria-expanded', 'false');
        otherTitle.classList.remove('expanded');
      }
    });

    // Basculer l'état actuel
    if (isCurrentlyExpanded) {
      this.collapse(skillRow);
      title.setAttribute('aria-expanded', 'false');
      title.classList.remove('expanded');
      skillRow.classList.remove('expanded');
    } else {
      this.expand(skillRow);
      title.setAttribute('aria-expanded', 'true');
      title.classList.add('expanded');
    }
  };

  expand(skillRow) {
    skillRow.classList.add('expanded');
    skillRow.style.maxHeight = `${skillRow.scrollHeight}px`;
    skillRow.setAttribute('aria-hidden', 'false');
  }

  collapse(skillRow) {
    skillRow.style.maxHeight = '0';
    skillRow.setAttribute('aria-hidden', 'true');
  }

  handleMediaQueryChange(mediaQuery) {
    this.active = mediaQuery.matches;
    if (this.active) {
      this.toggleAll(false);
      this.addEventListeners();
    } else {
      this.toggleAll(true);
      this.removeEventListeners();
    }
  }

  toggleAll(expand) {
    this.skillRows.forEach((skillRow, index) => {
      const title = skillRow.previousElementSibling;
      if (expand) {
        this.expand(skillRow);
        title.setAttribute('aria-expanded', 'true');
        title.classList.add('expanded');
      } else {
        this.collapse(skillRow);
        title.setAttribute('aria-expanded', 'false');
        title.classList.remove('expanded');
      }
    });
  }
}

class Projects {
  constructor() {
    this.paragraphs = document.querySelectorAll('.projects__row-content');
    this.mediaQuery = window.matchMedia('(max-width: 37.5em)');
    this.projectLinks = document.querySelectorAll('.project__link');
    this.githubProjectIndex = Array.from(this.projectLinks).findIndex(link => link.href.includes('github.com'));
    this.init();
  }

  init() {
    this.applySkillColors();
    this.handleMediaQueryChange(this.mediaQuery);
    this.mediaQuery.addEventListener('change', (e) => this.handleMediaQueryChange(e));
  }

  applySkillColors() {
    this.paragraphs.forEach(paragraph => {
      const spans = paragraph.querySelectorAll('span');
      spans.forEach(span => {
        const skillText = span.textContent.trim();
        if (CONFIG.skillColors.hasOwnProperty(skillText)) {
          span.style.color = CONFIG.skillColors[skillText];
        }
      });
    });
  }

  handleMediaQueryChange(mediaQuery) {
    if (mediaQuery.matches) {
      this.addLinks();
    } else {
      this.removeLinks();
    }
  }

  addLinks() {
    let adjustedIndex = 1;

    this.paragraphs.forEach((paragraph, index) => {
      if (paragraph.closest('#other-projects')) {
        if (!paragraph.querySelector('.btn--theme')) {
          const githubLink = document.createElement('a');
          githubLink.href = "https://github.com/melih0132/all-my-projects";
          githubLink.className = "btn btn--med btn--theme links";
          githubLink.target = "_blank";
          githubLink.textContent = "Voir mes projets sur GitHub";
          paragraph.appendChild(githubLink);
        }
        return;
      }

      const parentProject = paragraph.closest('.projects__row');
      const projectIndex = Array.from(this.projectLinks).indexOf(parentProject.closest('.project__link'));

      if (!paragraph.querySelector('.btn--theme')) {
        const link = document.createElement('a');

        if (projectIndex === this.githubProjectIndex) {
          link.href = this.projectLinks[this.githubProjectIndex].href;
          link.target = "_blank";
        } else {
          link.href = `/fr/projets/projet-${adjustedIndex}.html`;
          link.target = "_self";
          adjustedIndex++;
        }

        link.className = "btn btn--med btn--theme links";
        link.textContent = "Voir plus";
        paragraph.appendChild(link);
      }
    });
  }

  removeLinks() {
    this.paragraphs.forEach(paragraph => {
      if (paragraph.closest('#other-projects')) return;

      const existingLink = paragraph.querySelector('.btn--theme');
      if (existingLink) {
        paragraph.removeChild(existingLink);
      }
    });
  }
}

class ContactForm {
  constructor() {
    this.form = document.querySelector('.contact__form');
    this.init();
  }

  init() {
    this.form.addEventListener('submit', (event) => this.handleSubmit(event));
  }

  async handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(this.form.action, {
        method: this.form.method,
        body: new FormData(this.form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        this.showMessage("Merci ! Votre message a été envoyé.", "success");
        this.form.reset();
      } else {
        this.showMessage("Une erreur est survenue. Veuillez réessayer.", "error");
      }
    } catch (error) {
      this.showMessage("Une erreur est survenue. Veuillez réessayer.", "error");
    }
  }

  showMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.className = `contact__message ${type}`;
    messageElement.textContent = message;

    document.body.appendChild(messageElement);

    setTimeout(() => {
      messageElement.remove();
    }, CONFIG.messageDisplayTime);
  }
}

class LanguageSelector {
  constructor() {
    this.selector = document.getElementById('selectLang');
    this.init();
  }

  init() {
    this.selector.addEventListener('change', () => this.handleLanguageChange());
  }

  handleLanguageChange() {
    const selectedLang = this.selector.value;
    location.href = `/${selectedLang}/`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new HamburgerMenu();
  new Header();
  new HeaderNav();
  new MultilingualGreeting();
  new Skills();
  new CollapsibleSkills();
  new Projects();
  new ContactForm();
  new LanguageSelector();
});