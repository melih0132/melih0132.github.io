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
    "HTML/CSS": "#E34C26",
    "JavaScript": "#F7DF1E",
    "TypeScript": "#3178C6",
    "PHP": "#777BB4",
    "Python": "#306998",
    "C# (.NET)": "#9B4F96",
    "SQL & PL/pgSQL": "#336791",
    "Bash": "#4EAA25",
    "XAML": "#007ACC",
    "Swift": "#FA7343",
    "Kotlin": "#7F52FF",
    "Dart": "#0175C2",

    // Frameworks & Bibliothèques
    "Laravel": "#F05340",
    "Node.js & Express": "#3C873A",
    "React & Next.js": "#61DAFB",
    "Vue.js": "#42b883",
    "CSS Frameworks": "#6e11f5",
    "FastAPI": "#05998B",
    "Flutter": "#02569B",
    "Phaser": "#00BCB4",
    "Socket.io": "#24c29f",
    "Nodemon": "#76D04B",
    "Python ORM": "#D71F24",
    "Pytest": "#0A9EDC",
    "iOS Frameworks": "#007AFF",
    ".NET Ecosystem": "#512BD4",
    "Windows UI": "#512BD4",
    "Tkinter": "#3776AB",
    "Android UI": "#4285F4",
    "Data Science (Python)": "#306998",
    "OpenAI": "#10A37F",

    // Bases de Données
    "SQL Databases": "#336791",
    "MongoDB": "#47A248",
    "JSON / JSONB": "#ffcc00",
    "Database Optimization": "#6A1B9A",
    "Reverse Engineering": "#607D8B",
    "Database Design": "#FF5733",

    // Environnement & Outils
    "IDEs": "#007ACC",
    "Mobile IDEs": "#147EFB",
    "Unity": "#222C37",
    "Version Control": "#F05032",
    "Docker": "#0db7ed",
    "pgAdmin4": "#326690",
    "API Tools": "#FF6C37",
    "Web Servers": "#009639",
    "Linux": "#ffc200",
    "Microsoft Azure": "#0078D4",
    "Data Analysis": "#F2C811",
    "Visual Paradigm": "#cc3433",
    "Collaboration Tools": "#0079BF",

    // Design & CMS
    "Figma": "#42498c",
    "Canva": "#00C4CC",
    "WordPress": "#21759B",
    "Framer": "#0055FF",

    // Méthodologies & Concepts
    "UML": "#007ACC",
    "MVC": "#FF9800",
    "CRUD": "#4CAF50",
    "Tests Unitaires": "#55606E",
    "API & Web Services": "#26A69A",
    "OOP": "#FF6B6B",
    "Design Patterns": "#9C27B0",
    "HTTP": "#0052CC",
    "Agile/Scrum": "#A0CE4E"
  },
  techCategories: {
    "Langages": ["HTML", "CSS", "JavaScript", "TypeScript", "PHP", "Python", "C#", ".NET", ".NET Core", ".NET/C#", "C# (.NET)", "Swift", "Dart", "SQL", "PL/pgSQL", "Bash", "XAML"],
    "Frameworks & Bibliothèques": ["Laravel", "Node.js", "Express", "React", "Next.js", "Vue.js", "Vue", "Bootstrap", "jQuery", "Tailwind CSS", "FastAPI", "ASP.NET Core", ".NET Core", "Flutter", "UIKit", "WPF", "WinUI 3", "Tkinter", "Phaser", "Socket.io", "SQLAlchemy", "Alembic", "Pytest", "Nodemon", "iOS", "OpenAI"],
    "Bases de Données": ["PostgreSQL", "SQLite", "MongoDB", "JSON / JSONB", "pgAdmin4"],
    "Outils & Environnement": ["VS Code", "Visual Studio", "Xcode", "Unity", "Git", "GitHub", "Docker", "Nginx", "Apache", "Linux", "Postman", "Swagger", "pgAdmin4", "Microsoft Azure", "Visual Paradigm", "Excel", "Power BI", "PowerAMC", "Trello", "Microsoft Teams"],
    "Design & CMS": ["Figma", "Framer", "Adobe Illustrator", "Canva", "WordPress", "3D Modeling"],
    "Méthodologies & Concepts": ["UML", "MVC", "OOP", "Design Patterns", "CRUD", "Tests Unitaires", "HTTP", "RESTful API", "Web Service", "WebSockets", "Agile", "Scrum"]
  },
  languageFrameworks: {
    "Python": ["FastAPI", "Tkinter", "SQLAlchemy", "Alembic", "Pytest", "Flask", "Django"],
    "JavaScript": ["React", "Next.js", "Vue.js", "Vue", "Express", "Node.js", "jQuery"],
    "TypeScript": ["React", "Next.js", "Vue.js", "Vue"],
    "PHP": ["Laravel"],
    "Swift": ["UIKit", "iOS"],
    "Dart": ["Flutter"],
    "C#": ["ASP.NET Core", ".NET Core", "WPF", "WinUI 3"],
    ".NET": ["ASP.NET Core", ".NET Core", "WPF", "WinUI 3"],
    ".NET Core": ["ASP.NET Core", ".NET Core", "WPF", "WinUI 3"]
  }
};

class HamburgerMenu {
  constructor() {
    this.menuBtn = safeQuerySelector('.header__main-ham-menu-cont');
    this.smallMenu = safeQuerySelector('.header__sm-menu');
    this.menuIcon = safeQuerySelector('.header__main-ham-menu');
    this.closeIcon = safeQuerySelector('.header__main-ham-menu-close');
    this.menuLinks = safeQuerySelectorAll('.header__sm-menu-link');
    this.header = safeQuerySelector('.header');

    if (this.menuBtn && this.smallMenu && this.menuIcon && this.closeIcon) {
      this.init();
    }
  }

  init() {
    // Initialiser l'état des icônes au chargement
    // L'icône hamburger doit être visible, l'icône close doit être cachée
    this.menuIcon?.classList.remove('d-none');
    this.closeIcon?.classList.add('d-none');
    // S'assurer que le menu est fermé
    this.smallMenu?.classList.remove('header__sm-menu--active');
    
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
      window.dispatchEvent(new Event('scroll'));
    }
  }

  closeMenu() {
    this.smallMenu.classList.remove('header__sm-menu--active');
    this.menuIcon.classList.remove('d-none');
    this.closeIcon.classList.add('d-none');
    this.header.style.backgroundColor = '';
    window.dispatchEvent(new Event('scroll'));
  }
}

class Header {
  constructor() {
    this.header = safeQuerySelector('.header');
    this.logoContainer = safeQuerySelector('.header__logo-container');
    this.sections = safeQuerySelectorAll('section[id]');

    if (!this.header) return;

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
    // Ne pas modifier le background si le menu hamburger est actif
    const smallMenu = document.querySelector('.header__sm-menu');
    const isMenuActive = smallMenu && smallMenu.classList.contains('header__sm-menu--active');
    
    // Gérer la classe header--scrolled même si le menu est actif
    if (window.scrollY > CONFIG.scrollThreshold) {
      this.header.classList.add('header--scrolled');
    } else {
      this.header.classList.remove('header--scrolled');
    }

    // Ne pas modifier le backgroundColor si le menu est ouvert
    if (isMenuActive) {
      return;
    }

    // Mettre à jour le background seulement si le menu n'est pas actif
    this.updateHeaderBackground();
    
    if (window.scrollY === 0) {
      this.header.style.backgroundColor = 'transparent';
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
    // Ne pas modifier le background si le menu hamburger est actif
    const smallMenu = document.querySelector('.header__sm-menu');
    const isMenuActive = smallMenu && smallMenu.classList.contains('header__sm-menu--active');
    if (isMenuActive) {
      return;
    }

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
    }
  }

  handleLogoClick() {
    location.href = '/fr/#home';
  }
}

class HeaderNav {
  constructor() {
    this.navLinks = safeQuerySelectorAll('.header__link');
    this.sections = safeQuerySelectorAll('section[id]');

    if (this.navLinks.length > 0 && this.sections.length > 0) {
      this.init();
    }
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

        const activeLink = safeQuerySelector(`.header__link[href="./#${sectionId}"]`);
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
    this.langElement = safeQuerySelector('#dynamic-lang');

    if (this.langElement) {
      this.startRotation();
    }
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

class SkillsColors {
  constructor() {
    this.skills = safeQuerySelectorAll('.skills__skill');
    if (this.skills.length > 0) {
      this.applyColors();
    }
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
    this.titles = safeQuerySelectorAll('.skills__category-title');
    this.skillRows = safeQuerySelectorAll('.skills__skill-row');
    
    if (this.titles.length === 0 || this.skillRows.length === 0) return;
    
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

class Skills {
  constructor() {
    this.skillCards = safeQuerySelectorAll('.skill-card');
    if (this.skillCards.length > 0) {
      this.mediaQuery = window.matchMedia('(min-width: 769px)');
      this.isDesktop = this.mediaQuery.matches;
      this.init();
    }
  }

  init() {
    this.addClickHandlers();
    this.addOutsideClickHandler();
    this.addKeyboardSupport();
    this.handleMediaQueryChange(this.mediaQuery);
    this.mediaQuery.addEventListener('change', (e) => this.handleMediaQueryChange(e));
  }

  handleMediaQueryChange(mediaQuery) {
    this.isDesktop = mediaQuery.matches;
  }

  addClickHandlers() {
    this.skillCards.forEach(card => {
      const clickHint = card.querySelector('.skill-click-hint');
      
      if (clickHint) {
        // Toujours écouter le clic sur skill-click-hint en mode bureau
        clickHint.addEventListener('click', (e) => {
          if (this.isDesktop) {
            e.preventDefault();
            e.stopPropagation();
            this.handleSkillClick(e, card);
          }
        });
        
        // Toujours écouter le clic sur la carte en mode mobile
        card.addEventListener('click', (e) => {
          if (!this.isDesktop) {
            // Ne pas déclencher si on clique sur un lien de niveau
            if (!e.target.closest('.skill-level-link')) {
              this.handleSkillClick(e, card);
            }
          }
        });
      }
    });
  }

  addOutsideClickHandler() {
    document.addEventListener('click', (e) => {
      // En mode bureau, fermer seulement si on ne clique pas sur skill-click-hint
      if (this.isDesktop) {
        if (!e.target.closest('.skill-click-hint') && !e.target.closest('.skill-level-link')) {
          this.closeAllDropdowns();
        }
      } else {
        // En mode mobile, fermer si on ne clique pas sur la carte
        if (!e.target.closest('.skill-card')) {
          this.closeAllDropdowns();
        }
      }
    });
  }

  addKeyboardSupport() {
    this.skillCards.forEach(card => {
      const clickHint = card.querySelector('.skill-click-hint');
      const targetElement = this.isDesktop ? (clickHint || card) : card;
      
      if (targetElement) {
        targetElement.setAttribute('tabindex', '0');
        targetElement.setAttribute('role', 'button');
        card.setAttribute('aria-expanded', 'false');
        
        targetElement.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handleSkillClick(e, card);
          } else if (e.key === 'Escape') {
            this.closeAllDropdowns();
          }
        });
      }
    });
  }

  handleSkillClick(e, skillCard) {
    if (!skillCard) {
      skillCard = e.currentTarget;
    }
    
    // Empêcher la propagation si on clique sur un lien de niveau
    if (e.target.closest('.skill-level-link')) {
      return;
    }
    
    const isCurrentlyActive = skillCard.classList.contains('active');
    
    // Fermer tous les autres dropdowns
    this.skillCards.forEach(card => {
      if (card !== skillCard) {
        card.classList.remove('active');
        card.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Toggle le dropdown actuel
    if (isCurrentlyActive) {
      skillCard.classList.remove('active');
      skillCard.setAttribute('aria-expanded', 'false');
    } else {
      skillCard.classList.add('active');
      skillCard.setAttribute('aria-expanded', 'true');
    }
    
    // Animation de clic simple
    skillCard.style.transform = 'scale(0.98)';
    setTimeout(() => {
      skillCard.style.transform = '';
    }, 150);
  }

  closeAllDropdowns() {
    this.skillCards.forEach(card => {
      card.classList.remove('active');
      card.setAttribute('aria-expanded', 'false');
    });
  }
}

class Projects {
  constructor() {
    this.paragraphs = safeQuerySelectorAll('.projects__row-content');
    this.projectLinks = safeQuerySelectorAll('.project__link');
    
    // Si aucun élément n'est trouvé, ne pas initialiser
    if (this.paragraphs.length === 0) {
      return;
    }
    
    this.mediaQuery = window.matchMedia('(max-width: 37.5em)');
    this.githubProjectIndex = this.projectLinks.length > 0 
      ? Array.from(this.projectLinks).findIndex(link => link.href.includes('github.com'))
      : -1;
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

class ProjectFilters {
  constructor() {
    this.projectCards = safeQuerySelectorAll('.project-card');
    this.filterContainer = safeQuerySelector('.projects-filters');
    this.activeFilter = 'all';
    this.projectTechs = new Map(); // Stocker les technologies de chaque projet
    
    // Mapping pour regrouper les technologies similaires
    this.techMapping = {
      '.NET': ['.NET', '.NET Core', '.NET/C#', 'C#', 'C# (.NET)'],
      'C#': ['.NET', '.NET Core', '.NET/C#', 'C#', 'C# (.NET)'],
      '.NET Core': ['.NET', '.NET Core', '.NET/C#', 'C#', 'C# (.NET)'],
      '.NET/C#': ['.NET', '.NET Core', '.NET/C#', 'C#', 'C# (.NET)'],
      'C# (.NET)': ['.NET', '.NET Core', '.NET/C#', 'C#', 'C# (.NET)']
    };
    
    if (this.projectCards.length === 0 || !this.filterContainer) {
      return;
    }
    
    this.init();
  }

  async init() {
    await this.loadProjectTechnologies();
    this.extractTechnologies();
    this.categorizeTechnologies();
    this.createFilterButtons();
    this.attachEventListeners();
  }

  // Catégoriser les technologies
  categorizeTechnologies() {
    this.techCategories = {};
    const uncategorized = [];
    
    // Initialiser les catégories
    Object.keys(CONFIG.techCategories).forEach(category => {
      this.techCategories[category] = [];
    });
    
    // Catégoriser chaque technologie
    this.technologies.forEach(tech => {
      let categorized = false;
      
      for (const [category, techs] of Object.entries(CONFIG.techCategories)) {
        if (techs.some(t => {
          const normalizedTech = this.normalizeTech(tech);
          const normalizedT = this.normalizeTech(t);
          return normalizedTech === normalizedT || tech === t;
        })) {
          this.techCategories[category].push(tech);
          categorized = true;
          break;
        }
      }
      
      if (!categorized) {
        uncategorized.push(tech);
      }
    });
    
    // Ajouter les technologies non catégorisées dans "Autres"
    if (uncategorized.length > 0) {
      this.techCategories["Autres"] = uncategorized;
    }
    
    // Trier les technologies dans chaque catégorie
    Object.keys(this.techCategories).forEach(category => {
      this.techCategories[category].sort();
    });
  }

  // Charger les technologies depuis les pages de détails des projets
  async loadProjectTechnologies() {
    const promises = [];
    
    this.projectCards.forEach(card => {
      const link = card.querySelector('a[href*="/projets/"]');
      if (link && link.href) {
        const projectUrl = link.getAttribute('href');
        if (projectUrl && !projectUrl.includes('github.com')) {
          promises.push(this.fetchProjectTechnologies(projectUrl, card));
        } else {
          // Pour les projets sans page de détails, utiliser les tech-tags
          this.fallbackToTechTags(card);
        }
      } else {
        // Pas de lien, utiliser les tech-tags
        this.fallbackToTechTags(card);
      }
    });
    
    await Promise.all(promises);
  }

  // Extraire les technologies depuis une page de détails
  async fetchProjectTechnologies(url, card) {
    try {
      const response = await fetch(url);
      if (!response.ok) return;
      
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Chercher la section .skills__projects
      const skillsProjects = doc.querySelector('.skills__projects');
      if (!skillsProjects) return;
      
      const technologies = [];
      const skillElements = skillsProjects.querySelectorAll('.skills__skill');
      
      skillElements.forEach(skill => {
        const tech = skill.textContent.trim();
        if (tech) {
          technologies.push(tech);
        }
      });
      
      // Stocker les technologies pour ce projet
      if (technologies.length > 0) {
        this.projectTechs.set(card, technologies);
        // Ajouter un attribut data-tech à la carte pour référence rapide
        card.setAttribute('data-tech', technologies.join('|'));
      } else {
        this.fallbackToTechTags(card);
      }
    } catch (error) {
      console.warn(`Impossible de charger les technologies depuis ${url}:`, error);
      // En cas d'erreur, utiliser les tech-tags comme fallback
      this.fallbackToTechTags(card);
    }
  }

  // Fallback : utiliser les tech-tags si la page de détails ne peut pas être chargée
  fallbackToTechTags(card) {
    // Ne pas écraser si les technologies ont déjà été chargées
    if (this.projectTechs.has(card)) {
      return;
    }
    
    const techTags = card.querySelectorAll('.tech-tag');
    const technologies = [];
    
    techTags.forEach(tag => {
      const tech = tag.textContent.trim();
      if (!tech.startsWith('+') && tech !== '') {
        technologies.push(tech);
      }
    });
    
    if (technologies.length > 0) {
      this.projectTechs.set(card, technologies);
      card.setAttribute('data-tech', technologies.join('|'));
    }
  }

  // Normaliser une technologie pour le regroupement
  normalizeTech(tech) {
    const normalized = tech.trim();
    
    // Vérifier si la technologie fait partie d'un groupe
    for (const [key, variants] of Object.entries(this.techMapping)) {
      if (variants.includes(normalized)) {
        return key; // Retourner la clé principale
      }
    }
    
    return normalized;
  }

  extractTechnologies() {
    const technologies = new Set();
    const techMap = new Map(); // Pour stocker les technologies normalisées et leurs occurrences
    const techCount = new Map(); // Pour compter les occurrences de chaque variante
    
    // Extraire toutes les technologies depuis les projets
    this.projectTechs.forEach((techs, card) => {
      techs.forEach(tech => {
        const normalized = this.normalizeTech(tech);
        technologies.add(normalized);
        
        // Compter les occurrences de chaque variante
        if (!techCount.has(normalized)) {
          techCount.set(normalized, new Map());
        }
        const variants = techCount.get(normalized);
        variants.set(tech, (variants.get(tech) || 0) + 1);
      });
    });
    
    // Choisir la variante la plus fréquente pour chaque technologie normalisée
    technologies.forEach(normalized => {
      const variants = techCount.get(normalized);
      if (variants) {
        let mostCommon = normalized; // Par défaut, utiliser le nom normalisé
        let maxCount = 0;
        
        variants.forEach((count, variant) => {
          if (count > maxCount) {
            maxCount = count;
            mostCommon = variant;
          }
        });
        
        techMap.set(normalized, mostCommon);
      }
    });
    
    this.technologies = Array.from(technologies).sort();
    this.techMap = techMap; // Stocker le mapping pour l'affichage
  }

  createFilterButtons() {
    // Créer un header pour les onglets de catégories
    const filtersHeader = document.createElement('div');
    filtersHeader.className = 'projects-filters-header';
    
    // Créer les onglets de catégories (desktop)
    const categoryTabs = document.createElement('div');
    categoryTabs.className = 'filter-categories';
    
    // Créer les selects de catégories (mobile)
    const categorySelects = document.createElement('div');
    categorySelects.className = 'filter-category-selects';
    
    // Bouton "Tous" (existant)
    const allBtn = this.filterContainer.querySelector('.filter-btn[data-filter="all"]');
    
    // Créer les onglets et selects pour chaque catégorie
    Object.keys(this.techCategories).forEach((category, index) => {
      if (this.techCategories[category].length === 0) return;
      
      // Onglet pour desktop
      const categoryTab = document.createElement('button');
      categoryTab.className = 'filter-category-tab';
      categoryTab.textContent = category;
      categoryTab.setAttribute('data-category', category);
      if (index === 0) categoryTab.classList.add('active');
      categoryTabs.appendChild(categoryTab);
      
      // Select pour mobile
      const categorySelect = document.createElement('select');
      categorySelect.className = 'filter-category-select';
      categorySelect.setAttribute('data-category', category);
      
      // Option par défaut
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = category;
      categorySelect.appendChild(defaultOption);
      
      // Options pour chaque technologie
      this.techCategories[category].forEach(tech => {
        const option = document.createElement('option');
        const normalizedFilter = tech.toLowerCase()
          .replace(/\.net/g, 'net')
          .replace(/c#/g, 'csharp')
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        option.value = normalizedFilter;
        const displayName = this.techMap.get(tech) || tech;
        option.textContent = displayName;
        categorySelect.appendChild(option);
      });
      
      categorySelects.appendChild(categorySelect);
    });
    
    // Réorganiser la structure : le bouton "Tous" reste au-dessus, les onglets en dessous
    if (allBtn) {
      // Ajouter les onglets de catégories dans le header
      filtersHeader.appendChild(categoryTabs);
      // Insérer le header après le bouton "Tous"
      this.filterContainer.insertBefore(filtersHeader, allBtn.nextSibling);
      // Insérer les selects pour mobile après le header
      this.filterContainer.insertBefore(categorySelects, filtersHeader.nextSibling);
    }
    
    // Créer les conteneurs de filtres par catégorie (desktop)
    const filtersWrapper = document.createElement('div');
    filtersWrapper.className = 'filters-wrapper';
    
    Object.keys(this.techCategories).forEach((category, index) => {
      if (this.techCategories[category].length === 0) return;
      
      const categoryContainer = document.createElement('div');
      categoryContainer.className = 'filter-category-content';
      categoryContainer.setAttribute('data-category', category);
      if (index === 0) categoryContainer.classList.add('active');
      
      // Ajouter un titre de catégorie pour mobile
      const categoryTitle = document.createElement('h4');
      categoryTitle.className = 'filter-category-title';
      categoryTitle.textContent = category;
      categoryTitle.setAttribute('role', 'button');
      categoryTitle.setAttribute('aria-expanded', 'false');
      categoryContainer.appendChild(categoryTitle);
      
      // Créer un conteneur pour les boutons de filtres (comme skills__skill-row)
      const filterButtonsRow = document.createElement('div');
      filterButtonsRow.className = 'filter-buttons-row';
      filterButtonsRow.setAttribute('aria-hidden', 'true');
      
      this.techCategories[category].forEach(tech => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        // Normaliser le filtre de la même manière que dans filterProjects
        const normalizedFilter = tech.toLowerCase()
          .replace(/\.net/g, 'net')
          .replace(/c#/g, 'csharp')
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        button.setAttribute('data-filter', normalizedFilter);
        // Utiliser la variante la plus courante pour l'affichage
        const displayName = this.techMap.get(tech) || tech;
        button.textContent = displayName;
        filterButtonsRow.appendChild(button);
      });
      
      categoryContainer.appendChild(filterButtonsRow);
      
      filtersWrapper.appendChild(categoryContainer);
    });
    
    this.filterContainer.appendChild(filtersWrapper);
    
    // Gérer les clics sur les titres de catégories (mobile - accordéon)
    this.initMobileAccordion();
    
    // Gérer les clics sur les onglets de catégories (desktop)
    categoryTabs.querySelectorAll('.filter-category-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const category = tab.getAttribute('data-category');
        
        // Désactiver tous les onglets
        categoryTabs.querySelectorAll('.filter-category-tab').forEach(t => t.classList.remove('active'));
        // Activer l'onglet cliqué
        tab.classList.add('active');
        
        // Masquer tous les contenus
        filtersWrapper.querySelectorAll('.filter-category-content').forEach(c => c.classList.remove('active'));
        // Afficher le contenu de la catégorie sélectionnée
        const content = filtersWrapper.querySelector(`.filter-category-content[data-category="${category}"]`);
        if (content) {
          content.classList.add('active');
        }
      });
    });
    
    // Gérer les changements sur les selects (mobile)
    categorySelects.querySelectorAll('.filter-category-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const filter = e.target.value;
        if (filter) {
          this.setActiveFilter(filter);
          this.filterProjects(filter);
          // Désactiver le bouton "Tous"
          const allBtn = this.filterContainer.querySelector('.filter-btn[data-filter="all"]');
          if (allBtn) {
            allBtn.classList.remove('active');
          }
          // Réinitialiser tous les autres selects
          categorySelects.querySelectorAll('.filter-category-select').forEach(s => {
            if (s !== select) {
              s.value = '';
            }
          });
        } else {
          // Si on réinitialise le select, réactiver "Tous"
          const allBtn = this.filterContainer.querySelector('.filter-btn[data-filter="all"]');
          if (allBtn && !categorySelects.querySelector('.filter-category-select[value!=""]')) {
            this.setActiveFilter('all');
            this.filterProjects('all');
          }
        }
      });
    });
  }

  initMobileAccordion() {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const categoryTitles = this.filterContainer.querySelectorAll('.filter-category-title');
    const filterButtonsRows = this.filterContainer.querySelectorAll('.filter-buttons-row');
    
    // Initialiser les attributs ARIA
    categoryTitles.forEach((title, index) => {
      const buttonsRow = title.nextElementSibling;
      if (buttonsRow && buttonsRow.classList.contains('filter-buttons-row')) {
        title.setAttribute('role', 'button');
        title.setAttribute('aria-expanded', 'false');
        buttonsRow.setAttribute('aria-hidden', 'true');
      }
    });
    
    // Gérer le changement de media query
    const handleMediaQueryChange = (mq) => {
      if (mq.matches) {
        // Mobile : masquer tous les panneaux par défaut
        filterButtonsRows.forEach(row => {
          row.style.maxHeight = '0';
          row.setAttribute('aria-hidden', 'true');
        });
        categoryTitles.forEach(title => {
          title.setAttribute('aria-expanded', 'false');
          title.classList.remove('expanded');
        });
        this.addMobileEventListeners();
      } else {
        // Desktop : afficher tous les panneaux
        filterButtonsRows.forEach(row => {
          row.style.maxHeight = '';
          row.setAttribute('aria-hidden', 'false');
        });
        categoryTitles.forEach(title => {
          title.setAttribute('aria-expanded', 'true');
        });
        this.removeMobileEventListeners();
      }
    };
    
    handleMediaQueryChange(mediaQuery);
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    
    // Ajouter la classe js-enabled pour le CSS
    document.documentElement.classList.add('js-enabled-filters');
  }
  
  addMobileEventListeners() {
    const categoryTitles = this.filterContainer.querySelectorAll('.filter-category-title');
    
    categoryTitles.forEach(title => {
      title.addEventListener('click', this.toggleCategoryRow);
    });
  }
  
  removeMobileEventListeners() {
    const categoryTitles = this.filterContainer.querySelectorAll('.filter-category-title');
    
    categoryTitles.forEach(title => {
      title.removeEventListener('click', this.toggleCategoryRow);
    });
  }
  
  toggleCategoryRow = (event) => {
    const title = event.currentTarget;
    const buttonsRow = title.nextElementSibling;
    
    if (!buttonsRow || !buttonsRow.classList.contains('filter-buttons-row')) {
      return;
    }
    
    const isCurrentlyExpanded = buttonsRow.classList.contains('expanded');
    const allRows = this.filterContainer.querySelectorAll('.filter-buttons-row');
    const allTitles = this.filterContainer.querySelectorAll('.filter-category-title');
    
    // Fermer tous les autres panneaux
    allRows.forEach(row => {
      if (row !== buttonsRow) {
        this.collapseFilterRow(row);
        const otherTitle = row.previousElementSibling;
        if (otherTitle && otherTitle.classList.contains('filter-category-title')) {
          otherTitle.setAttribute('aria-expanded', 'false');
          otherTitle.classList.remove('expanded');
        }
      }
    });
    
    // Basculer l'état actuel
    if (isCurrentlyExpanded) {
      this.collapseFilterRow(buttonsRow);
      title.setAttribute('aria-expanded', 'false');
      title.classList.remove('expanded');
    } else {
      this.expandFilterRow(buttonsRow);
      title.setAttribute('aria-expanded', 'true');
      title.classList.add('expanded');
    }
  };
  
  expandFilterRow(row) {
    row.classList.add('expanded');
    // Forcer le recalcul en affichant temporairement le contenu
    const originalMaxHeight = row.style.maxHeight;
    const originalOverflow = row.style.overflow;
    row.style.maxHeight = 'none';
    row.style.overflow = 'visible';
    const height = row.scrollHeight;
    row.style.maxHeight = originalMaxHeight;
    row.style.overflow = originalOverflow;
    // Appliquer la hauteur calculée
    row.style.maxHeight = `${height}px`;
    row.setAttribute('aria-hidden', 'false');
  }
  
  collapseFilterRow(row) {
    row.style.maxHeight = '0';
    row.setAttribute('aria-hidden', 'true');
    row.classList.remove('expanded');
  }

  attachEventListeners() {
    const filterButtons = this.filterContainer.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = button.getAttribute('data-filter');
        this.setActiveFilter(filter);
        this.filterProjects(filter);
        
        // Si on clique sur "Tous", réinitialiser tous les selects
        if (filter === 'all') {
          const selects = this.filterContainer.querySelectorAll('.filter-category-select');
          selects.forEach(select => {
            select.value = '';
          });
        }
      });
    });
  }

  setActiveFilter(filter) {
    this.activeFilter = filter;
    const filterButtons = this.filterContainer.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
      if (btn.getAttribute('data-filter') === filter) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  filterProjects(filter) {
    this.projectCards.forEach(card => {
      // Ne pas filtrer le bouton GitHub
      if (card.closest('.projects__btn-container')) {
        return;
      }
      
      if (filter === 'all') {
        card.style.display = '';
        card.classList.remove('filtered-out');
      } else {
        let hasTech = false;
        
        // Utiliser les technologies chargées depuis les pages de détails
        const projectTechs = this.projectTechs.get(card) || [];
        
        // Si aucune technologie n'a été chargée, utiliser les tech-tags comme fallback
        if (projectTechs.length === 0) {
          this.fallbackToTechTags(card);
          const fallbackTechs = this.projectTechs.get(card) || [];
          projectTechs.push(...fallbackTechs);
        }
        
        // Normaliser le filtre pour la comparaison
        const normalizedFilter = filter.toLowerCase()
          .replace(/\.net/g, 'net')
          .replace(/c#/g, 'csharp')
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        
        // Trouver le langage correspondant au filtre (si c'est un langage)
        let matchingLanguage = null;
        for (const [lang, frameworks] of Object.entries(CONFIG.languageFrameworks || {})) {
          const normalizedLang = lang.toLowerCase()
            .replace(/\.net/g, 'net')
            .replace(/c#/g, 'csharp')
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
          
          if (normalizedLang === normalizedFilter) {
            matchingLanguage = lang;
            break;
          }
        }
        
        projectTechs.forEach(tech => {
          // Normaliser la technologie avec le mapping
          const normalizedTech = this.normalizeTech(tech);
          
          // Normaliser la technologie pour la comparaison
          const normalizedTechForFilter = normalizedTech.toLowerCase()
            .replace(/\.net/g, 'net')
            .replace(/c#/g, 'csharp')
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
          
          // Vérifier si la technologie correspond directement au filtre
          if (normalizedTechForFilter === normalizedFilter) {
            hasTech = true;
          }
          
          // Si le filtre est un langage, vérifier aussi les frameworks associés
          if (matchingLanguage && CONFIG.languageFrameworks[matchingLanguage]) {
            const associatedFrameworks = CONFIG.languageFrameworks[matchingLanguage];
            if (associatedFrameworks.some(fw => {
              const normalizedFw = fw.toLowerCase()
                .replace(/\.net/g, 'net')
                .replace(/c#/g, 'csharp')
                .replace(/[^a-z0-9]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
              return normalizedFw === normalizedTechForFilter || tech === fw;
            })) {
              hasTech = true;
            }
          }
        });
        
        if (hasTech) {
          card.style.display = '';
          card.classList.remove('filtered-out');
        } else {
          card.style.display = 'none';
          card.classList.add('filtered-out');
        }
      }
    });
    
    // Animation pour les projets visibles
    setTimeout(() => {
      this.projectCards.forEach(card => {
        if (!card.classList.contains('filtered-out')) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        }
      });
    }, 100);
  }
}

class ContactForm {
  constructor() {
    this.form = safeQuerySelector('.contact__form');
    if (this.form) {
      this.init();
    }
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
    this.selector = safeQuerySelector('#selectLang');
    if (this.selector) {
      this.init();
    }
  }

  init() {
    this.selector.addEventListener('change', () => this.handleLanguageChange());
  }

  handleLanguageChange() {
    const selectedLang = this.selector.value;
    location.href = `/${selectedLang}/`;
  }
}

// Classe pour gérer l'année du copyright
class CopyrightYear {
  constructor() {
    this.updateCopyrightYear();
  }

  updateCopyrightYear() {
    const copyrightElements = safeQuerySelectorAll('.copyright-year');
    const currentYear = new Date().getFullYear();
    
    copyrightElements.forEach(element => {
      element.textContent = currentYear;
    });
  }
}

// Fonction utilitaire pour vérifier l'existence des éléments (silencieuse)
function safeQuerySelector(selector) {
  return document.querySelector(selector);
}

// Fonction utilitaire pour vérifier l'existence de plusieurs éléments (silencieuse)
function safeQuerySelectorAll(selector) {
  return document.querySelectorAll(selector);
}

// Initialisation sécurisée des composants
// Scroll Reveal Animation Manager
class ScrollRevealManager {
  constructor() {
    this.elements = safeQuerySelectorAll('.scroll-reveal');
    if (this.elements.length === 0) return;
    this.lastScrollY = window.scrollY;
    this.init();
  }

  init() {
    // Track scroll direction globally
    let lastScrollY = window.scrollY || window.pageYOffset;
    let currentScrollDirection = 'down';
    
    // Mettre à jour la direction à chaque événement scroll
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY || window.pageYOffset;
      if (currentScrollY !== lastScrollY) {
        currentScrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        lastScrollY = currentScrollY;
      }
    }, { passive: true });
    
    // Create intersection observer
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('revealed-down') && !entry.target.classList.contains('revealed-up') && !entry.target.classList.contains('revealed')) {
          const hasSpecialAnimation = entry.target.classList.contains('scroll-reveal--fade-left') || 
                                      entry.target.classList.contains('scroll-reveal--fade-right') || 
                                      entry.target.classList.contains('scroll-reveal--scale');
          
          if (hasSpecialAnimation) {
            // Pour les animations spéciales, utiliser la classe revealed standard
            entry.target.classList.add('revealed');
          } else {
            // Remove old revealed classes
            entry.target.classList.remove('revealed', 'revealed-down', 'revealed-up', 'initial-up');
            
            // Utiliser la direction de défilement capturée
            // Défilement vers le bas → apparition du bas vers le haut
            // Défilement vers le haut → apparition du haut vers le bas
            if (currentScrollDirection === 'down') {
              // Défilement vers le bas : apparition du bas vers le haut
              entry.target.classList.add('revealed-down');
            } else {
              // Défilement vers le haut : apparition du haut vers le bas
              // Désactiver temporairement la transition pour définir l'état initial sans animation
              const originalTransition = entry.target.style.transition;
              entry.target.style.transition = 'none';
              entry.target.classList.add('initial-up');
              // Force reflow pour appliquer initial-up
              void entry.target.offsetHeight;
              // Réactiver la transition et ajouter revealed-up
              entry.target.style.transition = originalTransition;
              requestAnimationFrame(() => {
                entry.target.classList.add('revealed-up');
              });
            }
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all scroll reveal elements
    this.elements.forEach(element => {
      this.observer.observe(element);
    });
  }
}


document.addEventListener('DOMContentLoaded', () => {
  try {
    // Initialiser le copyright en premier
    new CopyrightYear();
    
    // Initialiser les autres composants avec vérifications
    if (safeQuerySelector('.header__main-ham-menu-cont')) {
      new HamburgerMenu();
    }
    
    if (safeQuerySelector('.header')) {
      new Header();
      new HeaderNav();
    }
    
    if (safeQuerySelector('#dynamic-lang')) {
      new MultilingualGreeting();
    }
    
    if (safeQuerySelectorAll('.skills__skill').length > 0) {
      new SkillsColors();
      new CollapsibleSkills();
    }
    
    if (safeQuerySelectorAll('.skill-card').length > 0) {
      new Skills();
    }
    
    // Initialiser Projects seulement si les éléments existent (pas de warning si absents)
    if (safeQuerySelectorAll('.projects__row-content').length > 0) {
      new Projects();
    }
    
    // Initialiser ProjectFilters pour les nouveaux projets
    if (safeQuerySelectorAll('.project-card').length > 0) {
      new ProjectFilters();
    }
    
    if (safeQuerySelector('.contact__form')) {
      new ContactForm();
    }
    
    if (safeQuerySelector('#selectLang')) {
      new LanguageSelector();
    }
    
    // Initialize Scroll Reveal
    if (safeQuerySelectorAll('.scroll-reveal').length > 0) {
      new ScrollRevealManager();
    }
  } catch (error) {
    console.error('Error initializing components:', error);
  }
});