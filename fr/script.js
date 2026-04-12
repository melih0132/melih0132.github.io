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
  projectFilterUi: {
    searchPlaceholder: "Rechercher une technologie…",
    searchAriaLabel: "Filtrer les projets par technologie",
    clearAriaLabel: "Effacer la recherche",
    filterChipsAriaLabel: "Filtres actifs (intersection)",
    removeFilterChipAriaPrefix: "Retirer le filtre"
  },
  languageFrameworks: {
    "Python": ["FastAPI", "Tkinter", "SQLAlchemy", "Alembic", "Pytest", "Flask", "Django"],
    "JavaScript": ["React", "Next.js", "Vue.js", "Vue", "Express", "Express.js", "Node.js", "jQuery", "Vite", "Zustand"],
    "TypeScript": ["React", "Next.js", "Vue.js", "Vue", "Vite", "Zustand"],
    "Kotlin": ["Jetpack Compose"],
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
      this.removeEventListeners();
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

/** Normalisation unique pour clés de filtre (cohérence boutons / matching). */
function normalizeFilterKey(str) {
  return str.toLowerCase()
    .replace(/\.net/g, 'net')
    .replace(/c#/g, 'csharp')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

class ProjectFilters {
  constructor() {
    this.projectCards = safeQuerySelectorAll('.project-card');
    this.filterContainer = safeQuerySelector('.projects-filters');
    this.activeFilters = new Map();
    this.projectTechs = new Map(); // Stocker les technologies de chaque projet
    
    // Mapping pour regrouper les technologies similaires
    this.techMapping = {
      '.NET': ['.NET', '.NET Core', '.NET/C#', 'C#', 'C# (.NET)'],
      'C#': ['.NET', '.NET Core', '.NET/C#', 'C#', 'C# (.NET)'],
      '.NET Core': ['.NET', '.NET Core', '.NET/C#', 'C#', 'C# (.NET)'],
      '.NET/C#': ['.NET', '.NET Core', '.NET/C#', 'C#', 'C# (.NET)'],
      'C# (.NET)': ['.NET', '.NET Core', '.NET/C#', 'C#', 'C# (.NET)'],
      'React': ['React', 'React 19']
    };
    
    if (this.projectCards.length === 0 || !this.filterContainer) {
      return;
    }
    
    this.init();
  }

  async init() {
    await this.loadProjectTechnologies();
    this.extractTechnologies();
    this.createFilterSearchUi();
    this.attachEventListeners();
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

  createFilterSearchUi() {
    const allBtn = this.filterContainer.querySelector('.filter-btn[data-filter="all"]');
    if (!allBtn) {
      return;
    }

    const toolbar = document.createElement('div');
    toolbar.className = 'projects-filters-toolbar';
    this.filterContainer.insertBefore(toolbar, this.filterContainer.firstChild);
    toolbar.appendChild(allBtn);

    const ui = CONFIG.projectFilterUi || {};
    const wrap = document.createElement('div');
    wrap.className = 'projects-filters-search';

    const inner = document.createElement('div');
    inner.className = 'projects-filters-search__inner';

    const input = document.createElement('input');
    input.type = 'search';
    input.className = 'projects-filters-search__input';
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('spellcheck', 'false');
    input.placeholder = ui.searchPlaceholder || '…';
    input.setAttribute('aria-label', ui.searchAriaLabel || input.placeholder);
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-expanded', 'false');

    const listId = 'projects-filter-suggestions';
    const list = document.createElement('ul');
    list.id = listId;
    list.className = 'projects-filters-search__list';
    list.setAttribute('role', 'listbox');
    list.hidden = true;
    input.setAttribute('aria-controls', listId);

    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'projects-filters-search__clear';
    clearBtn.setAttribute('aria-label', ui.clearAriaLabel || 'Clear');
    clearBtn.textContent = '×';
    clearBtn.hidden = true;

    inner.appendChild(input);
    inner.appendChild(clearBtn);
    inner.appendChild(list);
    wrap.appendChild(inner);
    toolbar.appendChild(wrap);

    const chipsWrap = document.createElement('div');
    chipsWrap.className = 'projects-filters-chips';
    chipsWrap.setAttribute('aria-label', ui.filterChipsAriaLabel || 'Filtres actifs');
    chipsWrap.hidden = true;
    this.filterContainer.appendChild(chipsWrap);
    this.chipsWrap = chipsWrap;
    chipsWrap.addEventListener('click', (e) => {
      const chip = e.target.closest('.projects-filters-chip');
      if (!chip || !this.chipsWrap.contains(chip)) {
        return;
      }
      const key = chip.getAttribute('data-filter-key');
      if (key && this.activeFilters.has(key)) {
        this.activeFilters.delete(key);
        this.renderFilterChips();
        this.syncAllButtonState();
        this.filterProjects();
      }
    });

    this.searchInput = input;
    this.searchList = list;
    this.searchClearBtn = clearBtn;
    this.searchWrap = wrap;
    this.searchHighlightIndex = -1;

    this._onSearchDocClick = (e) => {
      if (!this.searchWrap || this.searchWrap.contains(e.target)) {
        return;
      }
      this.closeSearchSuggestions();
    };
    document.addEventListener('click', this._onSearchDocClick);

    input.addEventListener('focus', () => {
      this.refreshSearchSuggestions();
      this.openSearchSuggestions();
    });

    input.addEventListener('input', () => {
      this.searchHighlightIndex = -1;
      this.refreshSearchSuggestions();
      this.openSearchSuggestions();
      if (this.searchClearBtn) {
        this.searchClearBtn.hidden = input.value.trim() === '';
      }
    });

    clearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      input.value = '';
      clearBtn.hidden = true;
      this.closeSearchSuggestions();
    });

    list.addEventListener('click', (e) => {
      const li = e.target.closest('[role="option"]');
      if (!li || !this.searchList.contains(li)) {
        return;
      }
      const key = li.getAttribute('data-filter');
      const label = li.getAttribute('data-label') || li.textContent;
      if (key) {
        this.applyTechFromSearch(key, label);
      }
    });

    input.addEventListener('keydown', (e) => {
      const items = this.searchList.querySelectorAll('[role="option"]');
      if (!items.length) {
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.searchHighlightIndex = Math.min(this.searchHighlightIndex + 1, items.length - 1);
        this.highlightSearchOption(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.searchHighlightIndex = Math.max(this.searchHighlightIndex - 1, 0);
        this.highlightSearchOption(items);
      } else if (e.key === 'Enter' && this.searchHighlightIndex >= 0) {
        e.preventDefault();
        const li = items[this.searchHighlightIndex];
        const key = li.getAttribute('data-filter');
        const label = li.getAttribute('data-label') || li.textContent;
        if (key) {
          this.applyTechFromSearch(key, label);
        }
      } else if (e.key === 'Escape') {
        this.closeSearchSuggestions();
        this.searchInput.blur();
      }
    });
  }

  getSearchMatches(query) {
    const q = (query || '').trim().toLowerCase();
    const rows = [];
    (this.technologies || []).forEach(tech => {
      const display = this.techMap.get(tech) || tech;
      const hay = `${display} ${tech}`.toLowerCase();
      if (!q || hay.includes(q)) {
        rows.push({
          key: normalizeFilterKey(tech),
          label: display
        });
      }
    });
    rows.sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }));
    return rows.slice(0, 12);
  }

  refreshSearchSuggestions() {
    if (!this.searchList || !this.searchInput) {
      return;
    }
    const matches = this.getSearchMatches(this.searchInput.value);
    this.searchList.innerHTML = '';
    matches.forEach((m, i) => {
      const li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.setAttribute('data-filter', m.key);
      li.setAttribute('data-label', m.label);
      li.id = `filter-suggest-${i}`;
      li.textContent = m.label;
      if (this.activeFilters.has(m.key)) {
        li.classList.add('is-already-active');
      }
      this.searchList.appendChild(li);
    });
    this.searchHighlightIndex = matches.length ? 0 : -1;
    const items = this.searchList.querySelectorAll('[role="option"]');
    this.highlightSearchOption(items);
  }

  highlightSearchOption(items) {
    items.forEach((el, i) => {
      el.classList.toggle('is-highlighted', i === this.searchHighlightIndex);
    });
  }

  openSearchSuggestions() {
    if (!this.searchList || !this.searchInput) {
      return;
    }
    if (this.searchList.children.length === 0) {
      return;
    }
    this.searchList.hidden = false;
    this.searchInput.setAttribute('aria-expanded', 'true');
  }

  closeSearchSuggestions() {
    if (!this.searchList || !this.searchInput) {
      return;
    }
    this.searchList.hidden = true;
    this.searchInput.setAttribute('aria-expanded', 'false');
    this.searchHighlightIndex = -1;
  }

  renderFilterChips() {
    if (!this.chipsWrap) {
      return;
    }
    this.chipsWrap.innerHTML = '';
    if (this.activeFilters.size === 0) {
      this.chipsWrap.hidden = true;
      return;
    }
    this.chipsWrap.hidden = false;
    const ui = CONFIG.projectFilterUi || {};
    const prefix = ui.removeFilterChipAriaPrefix || 'Retirer le filtre';
    this.activeFilters.forEach((label, key) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'projects-filters-chip';
      chip.setAttribute('data-filter-key', key);
      chip.setAttribute('aria-label', `${prefix} ${label}`);
      const text = document.createElement('span');
      text.className = 'projects-filters-chip__text';
      text.textContent = label;
      const x = document.createElement('span');
      x.className = 'projects-filters-chip__remove';
      x.setAttribute('aria-hidden', 'true');
      x.textContent = '×';
      chip.appendChild(text);
      chip.appendChild(x);
      this.chipsWrap.appendChild(chip);
    });
  }

  syncAllButtonState() {
    const allBtn = this.filterContainer.querySelector('.filter-btn[data-filter="all"]');
    if (allBtn) {
      if (this.activeFilters.size === 0) {
        allBtn.classList.add('active');
      } else {
        allBtn.classList.remove('active');
      }
    }
  }

  cardMatchesSingleFilter(card, filterKey) {
    let projectTechs = this.projectTechs.get(card) || [];
    if (projectTechs.length === 0) {
      this.fallbackToTechTags(card);
      projectTechs = this.projectTechs.get(card) || [];
    }
    const normalizedFilter = normalizeFilterKey(filterKey);
    let matchingLanguage = null;
    for (const [lang] of Object.entries(CONFIG.languageFrameworks || {})) {
      if (normalizeFilterKey(lang) === normalizedFilter) {
        matchingLanguage = lang;
        break;
      }
    }
    for (const tech of projectTechs) {
      const normalizedTech = this.normalizeTech(tech);
      const normalizedTechForFilter = normalizeFilterKey(normalizedTech);
      if (normalizedTechForFilter === normalizedFilter) {
        return true;
      }
      if (matchingLanguage && CONFIG.languageFrameworks[matchingLanguage]) {
        const associatedFrameworks = CONFIG.languageFrameworks[matchingLanguage];
        if (associatedFrameworks.some(fw =>
          normalizeFilterKey(fw) === normalizedTechForFilter || tech === fw
        )) {
          return true;
        }
      }
    }
    return false;
  }

  applyTechFromSearch(filterKey, displayLabel) {
    if (!filterKey) {
      return;
    }
    const key = normalizeFilterKey(filterKey);
    if (this.activeFilters.has(key)) {
      this.closeSearchSuggestions();
      if (this.searchInput) {
        this.searchInput.value = '';
      }
      if (this.searchClearBtn) {
        this.searchClearBtn.hidden = true;
      }
      return;
    }
    this.activeFilters.set(key, (displayLabel || '').trim() || key);
    if (this.searchInput) {
      this.searchInput.value = '';
    }
    if (this.searchClearBtn) {
      this.searchClearBtn.hidden = true;
    }
    this.closeSearchSuggestions();
    this.syncAllButtonState();
    this.renderFilterChips();
    this.filterProjects();
  }

  resetSearchFilter() {
    this.activeFilters.clear();
    if (this.searchInput) {
      this.searchInput.value = '';
    }
    if (this.searchClearBtn) {
      this.searchClearBtn.hidden = true;
    }
    if (this.searchList) {
      this.searchList.innerHTML = '';
    }
    this.closeSearchSuggestions();
    this.renderFilterChips();
    this.syncAllButtonState();
    this.filterProjects();
  }

  attachEventListeners() {
    const filterButtons = this.filterContainer.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = button.getAttribute('data-filter');
        if (filter === 'all') {
          this.resetSearchFilter();
        }
      });
    });
  }

  filterProjects() {
    const keys = Array.from(this.activeFilters.keys());
    this.projectCards.forEach(card => {
      if (card.closest('.projects__btn-container')) {
        return;
      }
      if (keys.length === 0) {
        card.style.display = '';
        card.classList.remove('filtered-out');
        return;
      }
      const match = keys.every(k => this.cardMatchesSingleFilter(card, k));
      if (match) {
        card.style.display = '';
        card.classList.remove('filtered-out');
      } else {
        card.style.display = 'none';
        card.classList.add('filtered-out');
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
    // Supprimer l'ancien message s'il existe
    const existingMessage = this.form.querySelector('.contact__message');
    if (existingMessage) {
      existingMessage.classList.add('fade-out');
      setTimeout(() => {
        existingMessage.remove();
      }, 400);
    }

    const messageElement = document.createElement('div');
    messageElement.className = `contact__message ${type}`;
    messageElement.textContent = message;

    // Insérer le message à la fin du formulaire (en bas à gauche)
    this.form.appendChild(messageElement);

    // Attendre un peu avant de commencer la disparition pour laisser le temps de voir le message
    setTimeout(() => {
      messageElement.classList.add('fade-out');
      setTimeout(() => {
        messageElement.remove();
      }, 400);
    }, CONFIG.messageDisplayTime - 400);
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