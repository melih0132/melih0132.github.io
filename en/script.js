const CONFIG = {
  languageChangeInterval: 2000,
  slideOutDuration: 500,
  messageDisplayTime: 3000,
  translations: [
    "Bonjour", "Hola", "Ciao", "Hallo", "Merhaba",
    "Привет", "こんにちは", "안녕하세요", "欢迎", "Olá"
  ],
  skillColors: {
    "HTML": "#E34C26",
    "CSS": "#1572B6",
    "JavaScript": "#F7DF1E",
    "PHP": "#777BB4",
    "Python": "#306998",
    "C#": "#9B4F96",
    "SQL": "#CC2927",
    "PostgreSQL": "#336791",
    "MongoDB": "#47A248",
    "MySQL": "#00758F",
    "Node.js": "#3C873A",
    "Express": "#4B8BBE",
    "Socket.io": "#24c29f",
    "Nodemon": "#76D04B",
    "Unity": "#222C37",
    "Phaser": "#00BCB4",
    "WPF": "#512BD4",
    "VS Code": "#007ACC",
    "Visual Studio": "#5C2D91",
    "Git": "#F05032",
    "GitHub": "#181717",
    "Linux": "#ffc200",
    "Bash": "#4EAA25",
    "Trello": "#0079BF",
    "Microsoft Teams": "#6264A7",
    "Excel": "#217346",
    "Power BI": "#F2C811",
    "Figma": "#42498c",
    "Adobe Illustrator": "#FF9A00",
    "WordPress": "#21759B",
    "Canva": "#00C4CC",
    "Unit Tests": "#55606E",
    "UML": "#007ACC",
    "Agile": "#A0CE4E",
    "Scrum": "#FF7043",
    "Terminal": "#111111",
    "Powershell": "#012456"
  },
  navigation: {
    sections: ['home', 'about', 'projects', 'contact'],
    defaultLang: 'en'
  }
};

class HamburgerMenu {
  constructor() {
    this.menuContainer = document.querySelector('.header__main-ham-menu-cont');
    this.smallMenu = document.querySelector('.header__sm-menu');
    this.menuIcon = document.querySelector('.header__main-ham-menu');
    this.closeIcon = document.querySelector('.header__main-ham-menu-close');
    this.smallMenuLinks = document.querySelectorAll('.header__sm-menu-link a');
    
    this.initialize();
  }

  initialize() {
    this.menuContainer.addEventListener('click', () => this.toggleMenu());
    this.smallMenuLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleLinkClick(e));
    });
    this.setupOutsideClickListener();
  }

  toggleMenu() {
    this.smallMenu.classList.toggle('header__sm-menu--active');
    this.menuIcon.classList.toggle('d-none');
    this.closeIcon.classList.toggle('d-none');
  }

  handleLinkClick(e) {
    const href = e.currentTarget.getAttribute('href');
    if (href.includes('#')) {
      e.preventDefault();
      const targetId = href.split('#')[1];
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        this.closeMenu();
      }
    }
  }

  closeMenu() {
    this.smallMenu.classList.remove('header__sm-menu--active');
    this.menuIcon.classList.remove('d-none');
    this.closeIcon.classList.add('d-none');
  }

  setupOutsideClickListener() {
    document.addEventListener('click', (e) => {
      if (!this.menuContainer.contains(e.target) && 
          !this.smallMenu.contains(e.target) &&
          this.smallMenu.classList.contains('header__sm-menu--active')) {
        this.closeMenu();
      }
    });
  }
}

class Navigation {
  constructor() {
    this.header = document.querySelector('.header');
    this.logoContainer = document.querySelector('.header__logo-container');
    this.mainLinks = document.querySelectorAll('.header__link');
    
    this.initialize();
  }

  initialize() {
    this.logoContainer.addEventListener('click', () => this.handleLogoClick());
    this.mainLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleLinkClick(e));
    });
    this.setupScrollListener();
  }

  handleLogoClick() {
    window.location.href = './#home';
  }

  handleLinkClick(e) {
    const href = e.currentTarget.getAttribute('href');
    if (href.includes('#')) {
      e.preventDefault();
      const targetId = href.split('#')[1];
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  setupScrollListener() {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        this.header.classList.add('header--scrolled');
      } else {
        this.header.classList.remove('header--scrolled');
      }
    });
  }
}

class HeaderLogo {
  constructor() {
    this.logoContainer = document.querySelector('.header__logo-container');
    this.initialize();
  }

  initialize() {
    this.logoContainer.addEventListener('click', () => this.handleClick());
  }

  handleClick() {
    location.href = '/en/#home';
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
    // Mise à jour initiale
    this.updateActiveSection();
    
    // Ajouter les événements de clic pour un défilement fluide
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
      
      if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        // Retirer la classe active de tous les liens
        this.navLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Ajouter la classe active au lien correspondant
        const activeLink = document.querySelector(`.header__link[href="./#${sectionId}"]`);
        if(activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }

  handleNavClick(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').replace('./#', '');
    const targetSection = document.getElementById(targetId);
    
    if(targetSection) {
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
    }, CONFIG.slideOutDuration);
  }

  startRotation() {
    setInterval(() => this.changeLanguage(), CONFIG.languageChangeInterval);
  }
}

class SkillsManager {
  constructor() {
    this.skillElements = document.querySelectorAll('.skills__skill');
    this.applyColors();
  }

  applyColors() {
    this.skillElements.forEach(skill => {
      const skillName = skill.textContent.trim();
      const color = CONFIG.skillColors[skillName];
      
      if (color) {
        skill.style.backgroundColor = color;
        skill.style.color = '#ffffff';
      }
    });
  }
}

class Projects {
  constructor() {
    this.paragraphs = document.querySelectorAll('.projects__row-content-desc');
    this.init();
  }

  init() {
    this.applySkillColors();
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
}

class ContactForm {
  constructor() {
    this.form = document.querySelector('.contact__form');
    if (this.form) {
      this.initialize();
    }
  }

  initialize() {
    this.form.addEventListener('submit', (event) => this.handleSubmit(event));
    this.setupFormValidation();
  }

  setupFormValidation() {
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
    });
  }

  validateField(field) {
    if (field.hasAttribute('required') && !field.value.trim()) {
      field.classList.add('error');
      return false;
    }
    if (field.type === 'email' && !this.validateEmail(field.value)) {
      field.classList.add('error');
      return false;
    }
    field.classList.remove('error');
    return true;
  }

  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async handleSubmit(event) {
    event.preventDefault();
    
    const inputs = this.form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    if (!isValid) {
      this.showMessage("Please fill in all required fields correctly.", "error");
      return;
    }

    try {
      const response = await fetch(this.form.action, {
        method: this.form.method,
        body: new FormData(this.form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        this.showMessage("Thank you! Your message has been sent.", "success");
        this.form.reset();
      } else {
        throw new Error("Server error");
      }
    } catch (error) {
      this.showMessage("An error occurred. Please try again later.", "error");
    }
  }

  showMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.className = `contact__message ${type}`;
    messageElement.textContent = message;
    
    const existingMessage = document.querySelector('.contact__message');
    if (existingMessage) {
      existingMessage.remove();
    }

    document.body.appendChild(messageElement);
    setTimeout(() => messageElement.remove(), CONFIG.messageDisplayTime);
  }
}

class LanguageSelector {
  constructor() {
    this.selector = document.getElementById('selectLang');
    this.initialize();
  }

  initialize() {
    this.selector.addEventListener('change', () => this.handleChange());
  }

  handleChange() {
    const selectedLang = this.selector.value;
    location.href = `/${selectedLang}/#home`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new HamburgerMenu();
  new Navigation();
  new HeaderLogo();
  new HeaderNav();
  new MultilingualGreeting();
  new SkillsManager();
  new Projects();
  new ContactForm();
  new LanguageSelector();
});