const CONFIG = {
  scrollThreshold: 50,
  messageDisplayTime: 3000,
  languageChangeInterval: 2000,
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
  }
};

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
    this.menuBtn?.addEventListener('click', () => this.toggleMenu());
    this.menuLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
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
    window.addEventListener('scroll', () => this.handleScroll());
    this.logoContainer.addEventListener('click', () => this.handleLogoClick());
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
    location.href = `/${selectedLang}/#home`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new HamburgerMenu();
  new Header();
  new MultilingualGreeting();
  new Skills();
  new ContactForm();
  new LanguageSelector();
});