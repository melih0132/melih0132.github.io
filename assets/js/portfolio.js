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
    },
    spotlight: {
      dialogLabel: 'Image preview',
      close: 'Close',
      previous: 'Previous image',
      next: 'Next image',
      open: 'Enlarge image'
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
    },
    spotlight: {
      dialogLabel: 'Aperçu de l’image',
      close: 'Fermer',
      previous: 'Image précédente',
      next: 'Image suivante',
      open: 'Agrandir l’image'
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
  spotlight: I18N[LOCALE].spotlight,
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
    this._docClickBound = true;

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

  destroy() {
    if (this._docClickBound && this._onSearchDocClick) {
      document.removeEventListener('click', this._onSearchDocClick);
      this._docClickBound = false;
    }
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
  constructor(signal) {
    this.header = document.querySelector('.header');
    this.toggle = document.querySelector('[data-nav-toggle]');
    this.panel = document.querySelector('[data-nav-panel]');
    this.onScroll = this.onScroll.bind(this);
    const opts = { passive: true, signal };
    this.onScroll();
    window.addEventListener('scroll', this.onScroll, opts);
    this.bindHomeLinks(signal);
    if (location.hash === '#home') {
      window.scrollTo(0, 0);
    }
    if (this.toggle && this.panel) {
      this.toggle.addEventListener('click', () => {
        const open = this.panel.classList.toggle('is-open');
        this.toggle.setAttribute('aria-expanded', String(open));
      }, { signal });
      this.panel.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => {
          this.panel.classList.remove('is-open');
          this.toggle.setAttribute('aria-expanded', 'false');
        }, { signal });
      });
    }
    document.querySelectorAll('[data-set-lang]').forEach((a) => {
      a.addEventListener('click', () => {
        try {
          localStorage.setItem('preferredLanguage', a.getAttribute('data-set-lang'));
        } catch (e) {}
      }, { signal });
    });
  }

  bindHomeLinks(signal) {
    document.querySelectorAll('a[href="#home"]').forEach((a) => {
      a.addEventListener('click', (event) => {
        event.preventDefault();
        const top = document.getElementById('home');
        if (top) top.focus({ preventScroll: true });
        history.pushState(null, '', '#home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, { signal });
    });
  }

  onScroll() {
    if (!this.header) return;
    this.header.classList.toggle('header--scrolled', window.scrollY > 24);
  }
}

class OceanBoot {
  constructor() {
    if (window.__oceanEngine) return;
    const canvas = document.querySelector('[data-ocean]');
    if (!canvas || typeof OceanEngine !== 'function') return;
    // Persistent pond: boot once with the default home palette (ignore per-page universe tint).
    window.__oceanEngine = new OceanEngine(canvas, undefined, {});
  }
}

function syncCopyrightYears() {
  const year = String(new Date().getFullYear());
  document.querySelectorAll('.copyright-year').forEach((el) => {
    el.textContent = year;
  });
}

class GallerySpotlight {
  constructor() {
    this.gallery = document.querySelector('.project-gallery');
    this.items = [];
    this.index = 0;
    this.open = false;
    this.lastFocus = null;
    const locale = document.documentElement.lang.startsWith('fr') ? 'fr' : 'en';
    this.ui = (I18N[locale] && I18N[locale].spotlight) || CONFIG.spotlight || {};
    this.onKeyDown = this.onKeyDown.bind(this);

    if (!this.gallery) return;

    this.items = Array.from(this.gallery.querySelectorAll('figure')).filter((figure) =>
      figure.querySelector('img')
    );
    if (this.items.length === 0) return;

    this.build();
    this.bindTriggers();
  }

  build() {
    this.root = document.createElement('div');
    this.root.className = 'spotlight';
    this.root.hidden = true;
    this.root.setAttribute('role', 'dialog');
    this.root.setAttribute('aria-modal', 'true');
    this.root.setAttribute('aria-label', this.ui.dialogLabel || 'Image preview');

    this.backdrop = document.createElement('button');
    this.backdrop.type = 'button';
    this.backdrop.className = 'spotlight__backdrop';
    this.backdrop.setAttribute('aria-label', this.ui.close || 'Close');

    this.panel = document.createElement('div');
    this.panel.className = 'spotlight__panel';

    this.img = document.createElement('img');
    this.img.className = 'spotlight__img';
    this.img.alt = '';

    this.caption = document.createElement('p');
    this.caption.className = 'spotlight__caption';

    this.closeBtn = document.createElement('button');
    this.closeBtn.type = 'button';
    this.closeBtn.className = 'spotlight__close';
    this.closeBtn.setAttribute('aria-label', this.ui.close || 'Close');
    this.closeBtn.textContent = '✕';

    this.prevBtn = document.createElement('button');
    this.prevBtn.type = 'button';
    this.prevBtn.className = 'spotlight__nav spotlight__nav--prev';
    this.prevBtn.setAttribute('aria-label', this.ui.previous || 'Previous image');
    this.prevBtn.textContent = '‹';

    this.nextBtn = document.createElement('button');
    this.nextBtn.type = 'button';
    this.nextBtn.className = 'spotlight__nav spotlight__nav--next';
    this.nextBtn.setAttribute('aria-label', this.ui.next || 'Next image');
    this.nextBtn.textContent = '›';

    this.panel.append(this.img, this.caption);
    this.root.append(this.backdrop, this.prevBtn, this.panel, this.nextBtn, this.closeBtn);
    document.body.appendChild(this.root);

    this.backdrop.addEventListener('click', () => this.close());
    this.closeBtn.addEventListener('click', () => this.close());
    this.prevBtn.addEventListener('click', () => this.show(this.index - 1));
    this.nextBtn.addEventListener('click', () => this.show(this.index + 1));
  }

  bindTriggers() {
    this.items.forEach((figure, i) => {
      const img = figure.querySelector('img');
      if (!img) return;

      figure.classList.add('project-gallery__item');
      img.classList.add('project-gallery__img');
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', this.ui.open || 'Enlarge image');

      const openAt = () => this.show(i);
      img.addEventListener('click', openAt);
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openAt();
        }
      });
    });
  }

  show(index) {
    if (!this.root || this.items.length === 0) return;

    const nextIndex = (index + this.items.length) % this.items.length;
    const figure = this.items[nextIndex];
    const source = figure.querySelector('img');
    const caption = figure.querySelector('figcaption');
    if (!source) return;

    if (!this.open) {
      this.lastFocus = document.activeElement;
      this.open = true;
      this.root.hidden = false;
      document.body.classList.add('spotlight-open');
      document.addEventListener('keydown', this.onKeyDown);
      requestAnimationFrame(() => {
        this.root.classList.add('is-active');
        this.closeBtn.focus();
      });
    }

    this.index = nextIndex;
    this.img.src = source.currentSrc || source.src;
    this.img.alt = source.alt || '';
    this.caption.textContent = caption ? caption.textContent.trim() : '';
    this.caption.hidden = !this.caption.textContent;

    const multi = this.items.length > 1;
    this.prevBtn.hidden = !multi;
    this.nextBtn.hidden = !multi;
  }

  close() {
    if (!this.open || !this.root) return;
    this.open = false;
    this.root.classList.remove('is-active');
    document.body.classList.remove('spotlight-open');
    document.removeEventListener('keydown', this.onKeyDown);

    const finish = () => {
      this.root.hidden = true;
      this.img.removeAttribute('src');
      if (this.lastFocus && typeof this.lastFocus.focus === 'function') {
        this.lastFocus.focus();
      }
      this.lastFocus = null;
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish();
      return;
    }

    window.setTimeout(finish, 180);
  }

  onKeyDown(e) {
    if (!this.open) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      this.close();
      return;
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.show(this.index - 1);
      return;
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.show(this.index + 1);
    }
  }

  destroy() {
    document.removeEventListener('keydown', this.onKeyDown);
    document.body.classList.remove('spotlight-open');
    if (this.root) this.root.remove();
    this.root = null;
    this.items = [];
    this.open = false;
  }
}

function bootPage() {
  if (window.__pageAbort) window.__pageAbort.abort();
  window.__pageAbort = new AbortController();
  const { signal } = window.__pageAbort;

  if (window.__projectFilters) {
    window.__projectFilters.destroy();
    window.__projectFilters = null;
  }
  if (window.__gallerySpotlight) {
    window.__gallerySpotlight.destroy();
    window.__gallerySpotlight = null;
  }

  new SiteChrome(signal);
  syncCopyrightYears();

  if (document.querySelector('.projects-filters') && document.querySelectorAll('.project-card').length) {
    window.__projectFilters = new ProjectFilters();
  }
  if (document.querySelector('.project-gallery')) {
    window.__gallerySpotlight = new GallerySpotlight();
  }
  if (document.querySelector('.contact__form')) new ContactForm();
}

/** Soft navigation: swap `.site` only so the ocean canvas keeps running. */
class SoftNav {
  constructor() {
    this.pending = false;
    document.addEventListener('click', (e) => this.onClick(e));
    window.addEventListener('popstate', () => {
      this.load(location.href, false);
    });
  }

  onClick(e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    const hrefAttr = a.getAttribute('href');
    if (!hrefAttr || hrefAttr.startsWith('mailto:') || hrefAttr.startsWith('tel:')) return;

    let url;
    try {
      url = new URL(a.href, location.href);
    } catch {
      return;
    }
    if (url.origin !== location.origin) return;
    if (!this.isSoftUrl(url)) return;

    if (
      url.pathname === location.pathname &&
      url.search === location.search &&
      url.hash &&
      !hrefAttr.startsWith('http')
    ) {
      return;
    }

    e.preventDefault();
    this.load(url.href, true);
  }

  isSoftUrl(url) {
    const p = url.pathname;
    if (p.startsWith('/assets/')) return false;
    if (/\.(pdf|png|jpe?g|webp|svg|zip|css|js|json|xml|txt)$/i.test(p)) return false;
    if (p === '/404.html' || p.endsWith('/404.html')) return false;
    return true;
  }

  async load(href, push) {
    if (this.pending) return;
    this.pending = true;
    document.documentElement.classList.add('is-soft-nav');
    try {
      const res = await fetch(href, { headers: { Accept: 'text/html' }, credentials: 'same-origin' });
      if (!res.ok) {
        location.href = href;
        return;
      }
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const nextSite = doc.querySelector('.site');
      const curSite = document.querySelector('.site');
      const nextOcean = doc.querySelector('[data-ocean]');
      if (!nextSite || !curSite || !nextOcean) {
        location.href = href;
        return;
      }

      curSite.replaceWith(document.importNode(nextSite, true));

      if (doc.body.dataset.universe) {
        document.body.dataset.universe = doc.body.dataset.universe;
      } else {
        delete document.body.dataset.universe;
      }
      if (doc.body.dataset.oceanFish) {
        document.body.dataset.oceanFish = doc.body.dataset.oceanFish;
      } else {
        delete document.body.dataset.oceanFish;
      }

      document.documentElement.lang = doc.documentElement.lang || document.documentElement.lang;
      document.title = doc.title;

      const nextIcon = doc.querySelector('link[rel="icon"]');
      const curIcon = document.querySelector('link[rel="icon"]');
      if (nextIcon && curIcon) curIcon.href = nextIcon.href;

      if (push) history.pushState({ soft: true }, '', href);

      const url = new URL(href, location.href);
      if (url.hash) {
        const target = document.querySelector(url.hash);
        if (target) {
          target.scrollIntoView();
        } else {
          window.scrollTo(0, 0);
        }
      } else {
        window.scrollTo(0, 0);
      }

      bootPage();
    } catch {
      location.href = href;
    } finally {
      this.pending = false;
      document.documentElement.classList.remove('is-soft-nav');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new OceanBoot();
  bootPage();
  new SoftNav();
});
