const LOCALE = document.documentElement.lang.startsWith('fr') ? 'fr' : 'en';

const I18N = {
  en: {
    homePath: '/en/#home',
    projectFilterUi: {
      searchPlaceholder: 'Search by technology…',
      searchAriaLabel: 'Filter projects by technology',
      filterChipsAriaLabel: 'Active filters (match all)',
      removeFilterChipAriaPrefix: 'Remove filter',
      resultsCount: (n) => `${n} project${n === 1 ? '' : 's'}`
    },
    contactForm: {
      success: 'Thank you! Your message has been sent.',
      error: 'An error occurred. Please try again.'
    }
  },
  fr: {
    homePath: '/fr/#home',
    projectFilterUi: {
      searchPlaceholder: 'Rechercher une technologie…',
      searchAriaLabel: 'Filtrer les projets par technologie',
      filterChipsAriaLabel: 'Filtres actifs (intersection)',
      removeFilterChipAriaPrefix: 'Retirer le filtre',
      resultsCount: (n) => `${n} projet${n === 1 ? '' : 's'}`
    },
    contactForm: {
      success: 'Merci ! Votre message a été envoyé.',
      error: 'Une erreur est survenue. Veuillez réessayer.'
    }
  }
};

const CONFIG = {
  messageDisplayTime: 3000,
  languageFrameworks: {
    Python: ['FastAPI', 'Tkinter', 'SQLAlchemy', 'Alembic', 'Pytest', 'Flask', 'Django'],
    JavaScript: ['React', 'Next', 'Vue.js', 'Vue', 'Express', 'Express.js', 'Node.js', 'jQuery', 'Vite', 'Zustand'],
    TypeScript: ['React', 'Next', 'Vue.js', 'Vue', 'Vite', 'Zustand'],
    Kotlin: ['Jetpack Compose'],
    PHP: ['Laravel', 'Symfony'],
    Swift: ['UIKit', 'iOS'],
    Dart: ['Flutter'],
    'C#': ['ASP.NET Core', '.NET Core', 'WPF', 'WinUI 3'],
    '.NET': ['ASP.NET Core', '.NET Core', 'WPF', 'WinUI 3'],
    '.NET Core': ['ASP.NET Core', '.NET Core', 'WPF', 'WinUI 3']
  },
  projectFilterUi: I18N[LOCALE].projectFilterUi,
  contactForm: I18N[LOCALE].contactForm,
  homePath: I18N[LOCALE].homePath
};

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
    this.projectCards = document.querySelectorAll('.project-card');
    this.filterContainer = document.querySelector('.projects-filters');
    this.activeFilters = new Map();
    this.projectTechs = new Map(); // Stocker les technologies de chaque projet
    
    // Mapping pour regrouper les technologies similaires
    this.techMapping = {
      '.NET': ['.NET', '.NET Core', '.NET/C#', 'C#', 'C# (.NET)', 'ASP.NET Core'],
      'C#': ['.NET', '.NET Core', '.NET/C#', 'C#', 'C# (.NET)', 'ASP.NET Core'],
      '.NET Core': ['.NET', '.NET Core', '.NET/C#', 'C#', 'C# (.NET)', 'ASP.NET Core'],
      '.NET/C#': ['.NET', '.NET Core', '.NET/C#', 'C#', 'C# (.NET)', 'ASP.NET Core'],
      'C# (.NET)': ['.NET', '.NET Core', '.NET/C#', 'C#', 'C# (.NET)', 'ASP.NET Core'],
      'ASP.NET Core': ['.NET', '.NET Core', '.NET/C#', 'C#', 'C# (.NET)', 'ASP.NET Core'],
      'Express': ['Express', 'Express.js'],
      'Express.js': ['Express', 'Express.js'],
      'Vue': ['Vue', 'Vue.js'],
      'Vue.js': ['Vue', 'Vue.js'],
      'VS Code': ['VS Code', 'Visual Studio Code'],
      'Visual Studio Code': ['VS Code', 'Visual Studio Code'],
      'Phaser': ['Phaser', 'Phaser.js'],
      'Phaser.js': ['Phaser', 'Phaser.js'],
      'Next': ['Next', 'Next.js'],
      'Next.js': ['Next', 'Next.js'],
      'Material 3': ['Material 3', 'Material Design 3'],
      'Material Design 3': ['Material 3', 'Material Design 3'],
      'HTML/CSS': ['HTML/CSS', 'HTML', 'CSS', 'HTML5']
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
    this.updateResultsCount(this.projectCards.length);
  }

  // Charger les technologies depuis les pages de détails des projets
  async loadProjectTechnologies() {
    let projectsData = null;
    try {
      const response = await fetch('/assets/data/projects.json');
      if (response.ok) {
        projectsData = await response.json();
      }
    } catch (error) {
      console.warn('Unable to load projects.json:', error);
    }

    const projectsById = new Map();
    if (projectsData?.projects) {
      projectsData.projects.forEach(project => {
        projectsById.set(project.id, project);
      });
    }

    this.projectCards.forEach(card => {
      const projectId = card.getAttribute('data-project-id');
      const project = projectId ? projectsById.get(projectId) : null;

      if (project?.technologies?.length) {
        this.projectTechs.set(card, project.technologies);
        card.setAttribute('data-tech', project.technologies.join('|'));
        return;
      }

      this.fallbackToTechTags(card);
    });
  }

  // Fallback : utiliser les tech-tags si projects.json est indisponible
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
        return;
      }
      if (tech.startsWith('+')) {
        const extra = tag.getAttribute('title');
        if (extra) {
          extra.split(',').map(t => t.trim()).filter(Boolean).forEach(t => technologies.push(t));
        }
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
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-haspopup', 'listbox');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-expanded', 'false');

    const listId = 'projects-filter-suggestions';
    const list = document.createElement('ul');
    list.id = listId;
    list.className = 'projects-filters-search__list';
    list.setAttribute('role', 'listbox');
    list.hidden = true;
    input.setAttribute('aria-controls', listId);

    inner.appendChild(input);
    inner.appendChild(list);
    wrap.appendChild(inner);

    const resultsCount = document.createElement('p');
    resultsCount.className = 'projects-filters-search__count';
    resultsCount.setAttribute('aria-live', 'polite');
    resultsCount.setAttribute('aria-atomic', 'true');
    this.resultsCountEl = resultsCount;

    toolbar.appendChild(wrap);
    toolbar.appendChild(resultsCount);

    const chipsWrap = document.createElement('div');
    chipsWrap.className = 'projects-filters-chips';
    chipsWrap.setAttribute('role', 'group');
    chipsWrap.setAttribute('aria-label', ui.filterChipsAriaLabel || 'Active filters');
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
    return rows;
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
      li.setAttribute('aria-selected', 'false');
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
      el.setAttribute('aria-selected', i === this.searchHighlightIndex ? 'true' : 'false');
    });
    if (this.searchInput && this.searchHighlightIndex >= 0 && items[this.searchHighlightIndex]) {
      this.searchInput.setAttribute('aria-activedescendant', items[this.searchHighlightIndex].id);
    } else if (this.searchInput) {
      this.searchInput.removeAttribute('aria-activedescendant');
    }
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
    this.searchInput.removeAttribute('aria-activedescendant');
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
    const prefix = ui.removeFilterChipAriaPrefix || 'Remove filter';
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
      x.textContent = '✕';
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
      return;
    }
    this.activeFilters.set(key, (displayLabel || '').trim() || key);
    if (this.searchInput) {
      this.searchInput.value = '';
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
    let visibleCount = 0;

    this.projectCards.forEach(card => {
      if (card.closest('.projects__btn-container')) {
        return;
      }
      if (keys.length === 0) {
        card.style.display = '';
        card.classList.remove('filtered-out');
        visibleCount++;
        return;
      }
      const match = keys.every(k => this.cardMatchesSingleFilter(card, k));
      if (match) {
        card.style.display = '';
        card.classList.remove('filtered-out');
        visibleCount++;
      } else {
        card.style.display = 'none';
        card.classList.add('filtered-out');
      }
    });

    this.updateResultsCount(visibleCount);
    
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

  updateResultsCount(count) {
    if (!this.resultsCountEl) {
      return;
    }
    const ui = CONFIG.projectFilterUi || {};
    const formatter = ui.resultsCount || ((n) => `${n}`);
    this.resultsCountEl.textContent = formatter(count);
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
        this.showMessage(CONFIG.contactForm.success, 'success');
        this.form.reset();
      } else {
        this.showMessage(CONFIG.contactForm.error, 'error');
      }
    } catch (error) {
      this.showMessage(CONFIG.contactForm.error, 'error');
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

class SiteChrome {
  constructor() {
    this.header = document.querySelector('.header');
    this.toggle = document.querySelector('[data-nav-toggle]');
    this.panel = document.querySelector('[data-nav-panel]');
    this.onScroll = this.onScroll.bind(this);
    this.onScroll();
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.bindHomeLinks();
    if (location.hash === '#home') {
      window.scrollTo(0, 0);
    }
    if (this.toggle && this.panel) {
      this.toggle.addEventListener('click', () => {
        const open = this.panel.classList.toggle('is-open');
        this.toggle.setAttribute('aria-expanded', String(open));
      });
      this.panel.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => {
          this.panel.classList.remove('is-open');
          this.toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
    document.querySelectorAll('[data-set-lang]').forEach((a) => {
      a.addEventListener('click', () => {
        try {
          localStorage.setItem('preferredLanguage', a.getAttribute('data-set-lang'));
        } catch (e) {}
      });
    });
  }

  bindHomeLinks() {
    document.querySelectorAll('a[href="#home"]').forEach((a) => {
      a.addEventListener('click', (event) => {
        event.preventDefault();
        const top = document.getElementById('home');
        if (top) top.focus({ preventScroll: true });
        history.pushState(null, '', '#home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  onScroll() {
    if (!this.header) return;
    this.header.classList.toggle('header--scrolled', window.scrollY > 24);
  }
}

/** Per-project koi pond moods (UI tokens live in CSS; ocean gets accents/bubble/koiRgb). */
const UNIVERSES = {
  'evit-shuriken': {
    accents: ['#c43028', '#2a2422', '#e8dcc8', '#8a2018'],
    bubble: 'rgb(180,90,70)',
    koiRgb: [[200, 40, 32], [232, 220, 208], [28, 24, 26], [160, 50, 40], [120, 70, 50]],
  },
  'dortan-app': {
    accents: ['#e8dcc8', '#e0a060', '#c4b49a', '#f0e6d4'],
    bubble: 'rgb(210,185,150)',
    koiRgb: [[220, 140, 90], [242, 234, 220], [70, 58, 48], [232, 168, 100], [200, 170, 120]],
  },
  kube: {
    accents: ['#d4a84b', '#f0e0a8', '#a87828', '#e8dcc8'],
    bubble: 'rgb(210,180,100)',
    koiRgb: [[210, 168, 58], [245, 236, 210], [50, 42, 28], [232, 190, 80], [180, 140, 50]],
  },
  lpo: {
    accents: ['#e8dcc8', '#d87860', '#b8c4a0', '#c4a888'],
    bubble: 'rgb(190,175,150)',
    koiRgb: [[200, 100, 80], [238, 232, 220], [48, 52, 42], [180, 150, 90], [160, 170, 120]],
  },
  'uber-laravel': {
    accents: ['#e89040', '#f0c080', '#c46820', '#e8dcc8'],
    bubble: 'rgb(220,160,90)',
    koiRgb: [[232, 140, 36], [240, 230, 210], [42, 32, 24], [220, 110, 50], [200, 150, 70]],
  },
  'uber-vuejs-dotnet': {
    accents: ['#d4a84b', '#e8dcc8', '#c0b090', '#e0c878'],
    bubble: 'rgb(200,180,130)',
    koiRgb: [[210, 175, 70], [240, 236, 228], [40, 38, 36], [200, 160, 90], [180, 155, 100]],
  },
  heva: {
    accents: ['#dc4638', '#f0a090', '#e8dcc8', '#c43028'],
    bubble: 'rgb(210,120,100)',
    koiRgb: [[220, 56, 42], [242, 228, 220], [36, 28, 28], [232, 100, 60], [200, 120, 70]],
  },
  'smarthome-lite': {
    accents: ['#d4a84b', '#6a6050', '#e8dcc8', '#908070'],
    bubble: 'rgb(160,140,110)',
    koiRgb: [[180, 140, 50], [200, 190, 175], [24, 22, 20], [140, 110, 60], [100, 90, 70]],
  },
  'shared-ia': {
    accents: ['#d4a84b', '#dc4638', '#f0d090', '#e8dcc8'],
    bubble: 'rgb(210,160,100)',
    koiRgb: [[210, 168, 58], [240, 230, 210], [36, 30, 28], [220, 70, 48], [200, 140, 60]],
  },
  ranking: {
    accents: ['#dc4638', '#e89040', '#e8dcc8', '#c45028'],
    bubble: 'rgb(210,130,80)',
    koiRgb: [[220, 50, 36], [238, 228, 210], [32, 28, 26], [232, 140, 36], [200, 100, 40]],
  },
  'la-guilde-des-seigneurs': {
    accents: ['#dc4638', '#d4a84b', '#8a2018', '#e8dcc8'],
    bubble: 'rgb(190,120,70)',
    koiRgb: [[200, 40, 36], [236, 220, 190], [28, 22, 20], [210, 168, 58], [160, 90, 40]],
  },
};

class OceanBoot {
  constructor() {
    const canvas = document.querySelector('[data-ocean]');
    if (!canvas || typeof OceanEngine !== 'function') return;
    const reduced = document.body.dataset.oceanFish;
    const fishCount = reduced ? Number(reduced) : undefined;
    const universe = UNIVERSES[document.body.dataset.universe];
    const options = {};
    if (Number.isFinite(fishCount)) options.fishCount = fishCount;
    if (universe) {
      options.accents = universe.accents;
      options.bubble = universe.bubble;
      options.koiRgb = universe.koiRgb;
    }
    this.engine = new OceanEngine(canvas, undefined, options);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SiteChrome();
  new OceanBoot();
  if (document.querySelector('.projects-filters') && document.querySelectorAll('.project-card').length) {
    new ProjectFilters();
  }
  if (document.querySelector('.contact__form')) new ContactForm();
});
