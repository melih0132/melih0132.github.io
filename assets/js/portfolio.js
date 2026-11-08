const LOCALE = document.documentElement.lang.startsWith('fr') ? 'fr' : 'en';

const I18N = {
  en: {
    homePath: '/en/#home',
    projectFilterUi: {
      searchPlaceholder: 'Search by technology…',
      searchAriaLabel: 'Filter projects by technology',
      filterChipsAriaLabel: 'Active filters (match all)',
      removeFilterChipAriaPrefix: 'Remove filter',
      filterByTagAriaPrefix: 'Filter by',
      sortFeatured: '★ Featured',
      sortChrono: 'Chronological',
      sortAriaLabel: 'Sort projects (Featured or Chronological)',
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
    },
    oceanPower: {
      enable: 'Reduced ocean',
      disable: 'Full ocean',
      forced: 'Ocean reduced (system preference)'
    },
    koiHint: 'Sometimes one fish stands apart.',
    commandPalette: {
      dialogLabel: 'Command palette',
      triggerLabel: 'Command palette',
      placeholder: 'Jump to…',
      empty: 'No matches',
      sections: 'Sections',
      projects: 'Projects',
      actions: 'Actions',
      home: 'Home',
      projectsSection: 'Projects',
      about: 'About',
      contact: 'Contact',
      langFr: 'Switch to French',
      langEn: 'Switch to English',
      cv: 'Open resume (PDF)',
      oceanOn: 'Enable reduced ocean',
      oceanOff: 'Disable reduced ocean'
    }
  },
  fr: {
    homePath: '/fr/#home',
    projectFilterUi: {
      searchPlaceholder: 'Rechercher une technologie…',
      searchAriaLabel: 'Filtrer les projets par technologie',
      filterChipsAriaLabel: 'Filtres actifs (intersection)',
      removeFilterChipAriaPrefix: 'Retirer le filtre',
      filterByTagAriaPrefix: 'Filtrer par',
      sortFeatured: '★ Pertinence',
      sortChrono: 'Chronologique',
      sortAriaLabel: 'Trier les projets (Pertinence ou Chronologique)',
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
    },
    oceanPower: {
      enable: 'Océan réduit',
      disable: 'Océan complet',
      forced: 'Océan réduit (préférence système)'
    },
    koiHint: 'Parfois un poisson se distingue.',
    commandPalette: {
      dialogLabel: 'Palette de commandes',
      triggerLabel: 'Palette de commandes',
      placeholder: 'Aller à…',
      empty: 'Aucun résultat',
      sections: 'Sections',
      projects: 'Projets',
      actions: 'Actions',
      home: 'Accueil',
      projectsSection: 'Projets',
      about: 'À propos',
      contact: 'Contact',
      langFr: 'Passer en français',
      langEn: 'Passer en anglais',
      cv: 'Ouvrir le CV (PDF)',
      oceanOn: 'Activer l’océan réduit',
      oceanOff: 'Désactiver l’océan réduit'
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
  homePath: I18N[LOCALE].homePath,
  oceanPower: I18N[LOCALE].oceanPower,
  koiHint: I18N[LOCALE].koiHint,
  commandPalette: I18N[LOCALE].commandPalette
};

const OCEAN_POWER_KEY = 'ocean-power-save';
const KOI_HINT_KEY = 'koi-site-hint-seen';

function currentLocale() {
  return document.documentElement.lang.startsWith('fr') ? 'fr' : 'en';
}

function uiStrings() {
  const locale = currentLocale();
  return I18N[locale] || I18N.en;
}

function readOceanPowerPref() {
  try {
    return localStorage.getItem(OCEAN_POWER_KEY) === '1';
  } catch {
    return false;
  }
}

function writeOceanPowerPref(enabled) {
  try {
    localStorage.setItem(OCEAN_POWER_KEY, enabled ? '1' : '0');
  } catch {}
}

function systemReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function applyOceanPowerSave(enabled) {
  const engine = window.__oceanEngine;
  if (engine && typeof engine.setPowerSave === 'function') {
    engine.setPowerSave(enabled);
  }
  document.documentElement.classList.toggle('ocean-power-save', enabled);
  document.querySelectorAll('[data-ocean-power]').forEach((btn) => syncOceanPowerButton(btn));
}

function syncOceanPowerButton(btn) {
  if (!(btn instanceof HTMLElement)) return;
  const ui = uiStrings().oceanPower;
  const forced = systemReducedMotion();
  const on = forced || readOceanPowerPref() || document.documentElement.classList.contains('ocean-power-save');
  btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  if (forced) {
    btn.setAttribute('aria-disabled', 'true');
    btn.disabled = true;
    btn.title = ui.forced;
    btn.textContent = ui.enable;
  } else {
    btn.removeAttribute('aria-disabled');
    btn.disabled = false;
    btn.title = on ? ui.disable : ui.enable;
    btn.textContent = on ? ui.disable : ui.enable;
  }
}

function toggleOceanPowerSave() {
  if (systemReducedMotion()) return readOceanPowerPref();
  const next = !readOceanPowerPref();
  writeOceanPowerPref(next);
  applyOceanPowerSave(next);
  return next;
}

function normalizeFilterKey(str) {
  return str.toLowerCase()
    .replace(/\.net/g, 'net')
    .replace(/c#/g, 'csharp')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function getProjectsCatalog() {
  if (window.__projectsCatalog) return window.__projectsCatalog;
  if (!window.__projectsCatalogPromise) {
    window.__projectsCatalogPromise = fetch('/assets/data/projects.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.projects) {
          window.__projectsCatalog = data;
        }
        return data;
      })
      .catch(() => null);
  }
  return window.__projectsCatalogPromise;
}

class ProjectFilters {
  constructor() {
    this.projectList = document.querySelector('.projects-list');
    this.projectCards = document.querySelectorAll('.project-card');
    this.filterContainer = document.querySelector('.projects-filters');
    this.activeFilters = new Map();
    this.projectTechs = new Map(); // Stocker les technologies de chaque projet
    this.projectsMeta = new Map();
    this.sortMode = 'featured'; // 'featured' | 'chrono'
    this.destroyed = false;
    
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
    if (this.destroyed) return;
    this.extractTechnologies();
    this.createFilterSearchUi();
    this.bindCardTechTags();
    this.attachEventListeners();
    this.hydrateFromUrl();
    this.applySortOrder();
    this.filterProjects(false);
  }

  // Charger les technologies depuis les pages de détails des projets
  async loadProjectTechnologies() {
    const projectsData = await getProjectsCatalog();

    const projectsById = new Map();
    if (projectsData?.projects) {
      projectsData.projects.forEach((project, idx) => {
        projectsById.set(project.id, project);
        this.projectsMeta.set(project.id, {
          featured: !!project.featured,
          featuredOrder: typeof project.featuredOrder === 'number' ? project.featuredOrder : idx,
          order: typeof project.order === 'number' ? project.order : idx
        });
      });
    }

    this.projectCards.forEach((card, domIdx) => {
      const projectId = card.getAttribute('data-project-id');
      const project = projectId ? projectsById.get(projectId) : null;

      if (projectId && !this.projectsMeta.has(projectId)) {
        const attrOrder = Number(card.getAttribute('data-order'));
        this.projectsMeta.set(projectId, {
          featured: card.getAttribute('data-featured') === 'true',
          featuredOrder: domIdx,
          order: Number.isFinite(attrOrder) ? attrOrder : domIdx
        });
      }

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

    const ui = uiStrings().projectFilterUi || {};
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

    const sortBtn = document.createElement('button');
    sortBtn.type = 'button';
    sortBtn.className = 'projects-sort-btn';
    sortBtn.setAttribute('data-sort-mode', this.sortMode);
    sortBtn.setAttribute('aria-label', ui.sortAriaLabel || 'Sort projects');
    sortBtn.textContent = this.sortMode === 'featured' ? (ui.sortFeatured || '★ Featured') : (ui.sortChrono || 'Chronological');
    sortBtn.addEventListener('click', () => {
      this.sortMode = this.sortMode === 'featured' ? 'chrono' : 'featured';
      this.applySortOrder();
      this.syncUrlParams();
    });
    this.sortBtn = sortBtn;

    const resultsCount = document.createElement('p');
    resultsCount.className = 'projects-filters-search__count';
    resultsCount.setAttribute('aria-live', 'polite');
    resultsCount.setAttribute('aria-atomic', 'true');
    this.resultsCountEl = resultsCount;

    toolbar.appendChild(wrap);
    toolbar.appendChild(sortBtn);
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
        this.syncCardTagStates();
        this.syncUrlParams();
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
    const ui = uiStrings().projectFilterUi || {};
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

  resolveFilterLabel(rawKeyOrLabel) {
    const targetKey = normalizeFilterKey(rawKeyOrLabel);
    for (const tech of this.technologies || []) {
      if (normalizeFilterKey(tech) === targetKey) {
        return { key: targetKey, label: this.techMap.get(tech) || tech };
      }
      const display = this.techMap.get(tech);
      if (display && normalizeFilterKey(display) === targetKey) {
        return { key: normalizeFilterKey(tech), label: display };
      }
    }
    const normalized = this.normalizeTech(rawKeyOrLabel);
    const key = normalizeFilterKey(normalized);
    const label = (this.techMap && this.techMap.get(normalized)) || rawKeyOrLabel;
    return { key, label };
  }

  bindCardTechTags() {
    const ui = uiStrings().projectFilterUi || {};
    const prefix = ui.filterByTagAriaPrefix || 'Filter by';
    this.projectCards.forEach((card) => {
      card.querySelectorAll('.tech-tag').forEach((tag) => {
        const raw = tag.textContent.trim();
        if (!raw || raw.startsWith('+')) return;
        const { key, label } = this.resolveFilterLabel(raw);
        tag.setAttribute('role', 'button');
        tag.setAttribute('tabindex', '0');
        tag.setAttribute('data-tech-key', key);
        tag.setAttribute('data-tech-label', label);
        tag.setAttribute('aria-label', `${prefix} ${raw}`);
        tag.setAttribute('aria-pressed', 'false');

        const toggleTag = (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (this.activeFilters.has(key)) {
            this.activeFilters.delete(key);
          } else {
            this.activeFilters.set(key, label);
          }
          this.syncAllButtonState();
          this.renderFilterChips();
          this.syncCardTagStates();
          this.syncUrlParams();
          this.filterProjects();
        };

        tag.addEventListener('click', toggleTag);
        tag.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleTag(e);
          }
        });
      });
    });
  }

  syncCardTagStates() {
    this.projectCards.forEach((card) => {
      card.querySelectorAll('.tech-tag[data-tech-key]').forEach((tag) => {
        const key = tag.getAttribute('data-tech-key');
        const active = !!(key && this.activeFilters.has(key));
        tag.classList.toggle('is-active', active);
        tag.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    });
  }

  applySortOrder() {
    if (!this.projectList) return;
    const ui = uiStrings().projectFilterUi || {};
    if (this.sortBtn) {
      this.sortBtn.setAttribute('data-sort-mode', this.sortMode);
      this.sortBtn.textContent =
        this.sortMode === 'featured'
          ? ui.sortFeatured || '★ Featured'
          : ui.sortChrono || 'Chronological';
    }
    const cards = Array.from(this.projectCards);
    cards.sort((a, b) => {
      const idA = a.getAttribute('data-project-id') || '';
      const idB = b.getAttribute('data-project-id') || '';
      const metaA = this.projectsMeta.get(idA) || {
        featured: a.getAttribute('data-featured') === 'true',
        featuredOrder: 99,
        order: Number(a.getAttribute('data-order') || 99)
      };
      const metaB = this.projectsMeta.get(idB) || {
        featured: b.getAttribute('data-featured') === 'true',
        featuredOrder: 99,
        order: Number(b.getAttribute('data-order') || 99)
      };
      if (this.sortMode === 'featured') {
        if (metaA.featured !== metaB.featured) {
          return metaA.featured ? -1 : 1;
        }
        if (metaA.featured && metaB.featured) {
          return metaA.featuredOrder - metaB.featuredOrder;
        }
      }
      return metaA.order - metaB.order;
    });
    const current = Array.from(this.projectList.children);
    const orderChanged = cards.some((card, idx) => card !== current[idx]);
    if (orderChanged) {
      cards.forEach((card) => this.projectList.appendChild(card));
    }
  }

  hydrateFromUrl() {
    const params = new URLSearchParams(location.search);
    const sortParam = params.get('sort');
    if (sortParam === 'chrono' || sortParam === 'featured') {
      this.sortMode = sortParam;
    }
    const techParam = params.get('tech');
    if (techParam) {
      techParam
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((token) => {
          const { key, label } = this.resolveFilterLabel(token);
          if (key) {
            this.activeFilters.set(key, label);
          }
        });
    }
    this.syncAllButtonState();
    this.renderFilterChips();
    this.syncCardTagStates();
  }

  syncUrlParams() {
    const url = new URL(location.href);
    if (this.activeFilters.size > 0) {
      url.searchParams.set('tech', Array.from(this.activeFilters.keys()).join(','));
    } else {
      url.searchParams.delete('tech');
    }
    if (this.sortMode === 'chrono') {
      url.searchParams.set('sort', 'chrono');
    } else {
      url.searchParams.delete('sort');
    }
    const nextHref = `${url.pathname}${url.search}${url.hash}`;
    if (nextHref !== `${location.pathname}${location.search}${location.hash}`) {
      history.replaceState(history.state, '', nextHref);
    }
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
      if (normalizedTechForFilter === normalizedFilter || normalizeFilterKey(tech) === normalizedFilter) {
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
    const { key, label } = this.resolveFilterLabel(displayLabel || filterKey);
    if (this.activeFilters.has(key)) {
      this.closeSearchSuggestions();
      if (this.searchInput) {
        this.searchInput.value = '';
      }
      return;
    }
    this.activeFilters.set(key, (displayLabel || label || '').trim() || key);
    if (this.searchInput) {
      this.searchInput.value = '';
    }
    this.closeSearchSuggestions();
    this.syncAllButtonState();
    this.renderFilterChips();
    this.syncCardTagStates();
    this.syncUrlParams();
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
    this.syncCardTagStates();
    this.syncUrlParams();
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

  filterProjects(animate = true) {
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
    
    if (!animate) return;
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
    const ui = uiStrings().projectFilterUi || {};
    const formatter = ui.resultsCount || ((n) => `${n}`);
    this.resultsCountEl.textContent = formatter(count);
  }

  destroy() {
    this.destroyed = true;
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

      const contactUi = uiStrings().contactForm || CONFIG.contactForm;
      if (response.ok) {
        this.showMessage(contactUi.success, 'success');
        this.form.reset();
      } else {
        this.showMessage(contactUi.error, 'error');
      }
    } catch (error) {
      const contactUi = uiStrings().contactForm || CONFIG.contactForm;
      this.showMessage(contactUi.error, 'error');
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
    messageElement.setAttribute('role', 'status');
    messageElement.setAttribute('aria-live', 'polite');
    messageElement.setAttribute('aria-atomic', 'true');
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
        history.pushState({ soft: true }, '', `${location.pathname}${location.search}#home`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, { signal });
    });
  }

  onScroll() {
    if (!this.header) return;
    this.header.classList.toggle('header--scrolled', window.scrollY > 24);
  }
}

function parseCssHexToRgb(hex, fallback) {
  const clean = (hex || '').trim().replace(/^#/, '');
  if (/^[0-9a-f]{6}$/i.test(clean)) {
    return [
      parseInt(clean.slice(0, 2), 16),
      parseInt(clean.slice(2, 4), 16),
      parseInt(clean.slice(4, 6), 16)
    ];
  }
  return fallback;
}

function syncOceanAtmosphere() {
  const engine = window.__oceanEngine;
  if (!engine) return;

  const fishAttr = document.body.dataset.oceanFish;
  const parsedFish = fishAttr ? Number(fishAttr) : NaN;
  const targetFish = Number.isFinite(parsedFish) && parsedFish > 0 ? parsedFish : undefined;
  if (typeof engine.setFishCount === 'function') {
    engine.setFishCount(targetFish);
  }

  if (typeof engine.setPalette === 'function') {
    const cs = getComputedStyle(document.body);
    const beniHex = cs.getPropertyValue('--koi-beni').trim() || '#dc4638';
    const shiroHex = cs.getPropertyValue('--koi-shiro').trim() || '#e8dcc8';
    const orangeHex = cs.getPropertyValue('--koi-orange').trim() || '#e89040';
    const kinHex = cs.getPropertyValue('--koi-kin').trim() || '#d4a84b';

    const beni = parseCssHexToRgb(beniHex, [220, 56, 42]);
    const shiro = parseCssHexToRgb(shiroHex, [240, 236, 228]);
    const orange = parseCssHexToRgb(orangeHex, [232, 140, 36]);
    const kin = parseCssHexToRgb(kinHex, [210, 168, 58]);

    engine.setPalette({
      accents: [beniHex, shiroHex, kinHex, orangeHex],
      bubble: `rgb(${Math.round((shiro[0] + kin[0]) / 2)},${Math.round((shiro[1] + kin[1]) / 2)},${Math.round((shiro[2] + kin[2]) / 2)})`,
      koiRgb: [beni, shiro, [36, 34, 38], orange, kin]
    });
  }
}

class OceanBoot {
  constructor() {
    if (window.__oceanEngine) return;
    const canvas = document.querySelector('[data-ocean]');
    if (!canvas || typeof OceanEngine !== 'function') return;
    const fishAttr = document.body.dataset.oceanFish;
    const parsedFish = fishAttr ? Number(fishAttr) : NaN;
    const fishCount = Number.isFinite(parsedFish) && parsedFish > 0 ? parsedFish : undefined;
    // Easter egg: one azure "~" minnow in the school → chamber.
    window.__oceanEngine = new OceanEngine(canvas, undefined, {
      fishCount,
      onSpecialFishClick: () => {
        location.assign('/koi.html');
      }
    });
    syncOceanAtmosphere();
    const powerOn = systemReducedMotion() || readOceanPowerPref();
    applyOceanPowerSave(powerOn);
  }
}

class CommandPaletteTrigger {
  constructor(signal) {
    this.mount();
    const btn = document.querySelector('[data-cmd-trigger]');
    if (!btn) return;
    const ui = uiStrings().commandPalette;
    const isApple = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || navigator.userAgent || '');
    const shortcut = isApple ? '⌘K' : 'Ctrl+K';
    btn.textContent = shortcut;
    btn.title = `${ui.triggerLabel || ui.dialogLabel} (${shortcut})`;
    btn.setAttribute('aria-label', `${ui.triggerLabel || ui.dialogLabel} (${shortcut})`);
    btn.addEventListener(
      'click',
      () => {
        if (window.__commandPalette) {
          window.__commandPalette.show();
        }
      },
      { signal }
    );
  }

  mount() {
    const content = document.querySelector('.header__content');
    if (!content || content.querySelector('[data-cmd-trigger]')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'header__cmd-trigger';
    btn.setAttribute('data-cmd-trigger', '');
    const powerBtn = content.querySelector('[data-ocean-power]');
    const lang = content.querySelector('.header__lang');
    const toggle = content.querySelector('[data-nav-toggle]');
    if (powerBtn) content.insertBefore(btn, powerBtn);
    else if (lang) content.insertBefore(btn, lang);
    else if (toggle) content.insertBefore(btn, toggle);
    else content.appendChild(btn);
  }
}

class OceanPowerToggle {
  constructor(signal) {
    this.mount();
    const btn = document.querySelector('[data-ocean-power]');
    if (!btn) return;
    syncOceanPowerButton(btn);
    btn.addEventListener(
      'click',
      () => {
        toggleOceanPowerSave();
      },
      { signal }
    );
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMq = () => {
      if (mq.matches) applyOceanPowerSave(true);
      else applyOceanPowerSave(readOceanPowerPref());
      syncOceanPowerButton(btn);
    };
    if (typeof mq.addEventListener === 'function') mq.addEventListener('change', onMq, { signal });
    else mq.addListener(onMq);
  }

  mount() {
    const content = document.querySelector('.header__content');
    if (!content || content.querySelector('[data-ocean-power]')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'header__ocean-power';
    btn.setAttribute('data-ocean-power', '');
    const lang = content.querySelector('.header__lang');
    const toggle = content.querySelector('[data-nav-toggle]');
    if (lang) content.insertBefore(btn, lang);
    else if (toggle) content.insertBefore(btn, toggle);
    else content.appendChild(btn);
  }
}

class KoiSiteHint {
  constructor() {
    if (window.__koiHintTimer) {
      window.clearTimeout(window.__koiHintTimer);
      window.__koiHintTimer = null;
    }
    if (!this.isHome()) return;
    if (this.shouldSkip()) return;
    this.el = this.mount();
    if (!this.el) return;
    this.timer = window.setTimeout(() => this.reveal(), 6000);
    window.__koiHintTimer = this.timer;
  }

  isHome() {
    const path = location.pathname.replace(/\/+$/, '') || '/';
    return path === '/fr' || path === '/en' || path === '/fr/index.html' || path === '/en/index.html';
  }

  shouldSkip() {
    try {
      if (localStorage.getItem(KOI_HINT_KEY) === '1') return true;
      if (localStorage.getItem('koi-chamber')) return true;
    } catch {}
    return false;
  }

  mount() {
    const footer = document.querySelector('.footer__inner');
    if (!footer) return null;
    let el = footer.querySelector('[data-koi-hint]');
    if (el) return el;
    el = document.createElement('p');
    el.className = 'koi-hint';
    el.setAttribute('data-koi-hint', '');
    el.setAttribute('hidden', '');
    el.textContent = uiStrings().koiHint;
    footer.appendChild(el);
    el.addEventListener('click', () => this.dismiss());
    return el;
  }

  reveal() {
    if (!this.el || this.shouldSkip()) return;
    this.el.removeAttribute('hidden');
    this.el.classList.add('is-visible');
    try {
      localStorage.setItem(KOI_HINT_KEY, '1');
    } catch {}
  }

  dismiss() {
    if (this.timer) window.clearTimeout(this.timer);
    if (!this.el) return;
    this.el.classList.remove('is-visible');
    this.el.setAttribute('hidden', '');
    try {
      localStorage.setItem(KOI_HINT_KEY, '1');
    } catch {}
  }
}

class CommandPalette {
  constructor() {
    if (window.__commandPalette) return window.__commandPalette;
    this.open = false;
    this.activeIndex = 0;
    this.items = [];
    this.filtered = [];
    this.lastFocus = null;
    this.ui = () => uiStrings().commandPalette;
    this.build();
    document.addEventListener('keydown', (e) => this.onGlobalKey(e));
    window.__commandPalette = this;
  }

  build() {
    this.root = document.createElement('div');
    this.root.className = 'cmd-palette';
    this.root.hidden = true;
    this.root.setAttribute('role', 'dialog');
    this.root.setAttribute('aria-modal', 'true');

    this.backdrop = document.createElement('button');
    this.backdrop.type = 'button';
    this.backdrop.className = 'cmd-palette__backdrop';
    this.backdrop.setAttribute('aria-label', 'Close');

    this.panel = document.createElement('div');
    this.panel.className = 'cmd-palette__panel';

    this.input = document.createElement('input');
    this.input.type = 'search';
    this.input.className = 'cmd-palette__input';
    this.input.autocomplete = 'off';
    this.input.spellcheck = false;

    this.list = document.createElement('ul');
    this.list.className = 'cmd-palette__list';
    this.list.id = 'cmd-palette-list';
    this.list.setAttribute('role', 'listbox');

    this.empty = document.createElement('p');
    this.empty.className = 'cmd-palette__empty';
    this.empty.hidden = true;

    this.panel.append(this.input, this.list, this.empty);
    this.root.append(this.backdrop, this.panel);
    document.body.appendChild(this.root);

    this.backdrop.addEventListener('click', () => this.close());
    this.input.addEventListener('input', () => this.renderList());
    this.input.addEventListener('keydown', (e) => this.onInputKey(e));
  }

  onGlobalKey(e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (this.open) this.close();
      else this.show();
      return;
    }
    if (!this.open) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      this.close();
    }
  }

  collectItems() {
    const ui = this.ui();
    const locale = currentLocale();
    const homeBase = locale === 'fr' ? '/fr/' : '/en/';
    const items = [];

    items.push(
      { group: ui.sections, label: ui.home, href: `${homeBase}#home`, keywords: 'home accueil' },
      { group: ui.sections, label: ui.projectsSection, href: `${homeBase}#projects`, keywords: 'projects projets' },
      { group: ui.sections, label: ui.about, href: `${homeBase}#about`, keywords: 'about propos' },
      { group: ui.sections, label: ui.contact, href: `${homeBase}#contact`, keywords: 'contact' }
    );

    const catalog = window.__projectsCatalog;
    if (catalog?.projects?.length) {
      catalog.projects.forEach((proj) => {
        const title = (proj.titles && proj.titles[locale]) || proj.id;
        const href = proj.githubOnly
          ? proj.githubUrl
          : proj.detailPaths && proj.detailPaths[locale];
        if (!title || !href) return;
        const techKeywords = (proj.technologies || []).join(' ');
        items.push({
          group: ui.projects,
          label: proj.featured ? `★ ${title}` : title,
          href,
          external: !!proj.githubOnly,
          keywords: `${title} ${proj.id} ${techKeywords}`
        });
      });
    } else {
      document.querySelectorAll('.project-card').forEach((card) => {
        const title = card.querySelector('.project-title')?.textContent?.trim();
        const link = card.querySelector('.project-link');
        if (!title || !link) return;
        items.push({
          group: ui.projects,
          label: title,
          href: link.getAttribute('href'),
          external: link.target === '_blank',
          keywords: title
        });
      });

      if (!document.querySelector('.project-card')) {
        document.querySelectorAll('.project-hero__title').forEach((h1) => {
          const title = h1.textContent.trim();
          if (title) {
            items.push({
              group: ui.projects,
              label: title,
              href: location.pathname,
              keywords: title
            });
          }
        });
      }
    }

    const otherLang = locale === 'fr' ? 'en' : 'fr';
    const langLink = document.querySelector(`[data-set-lang="${otherLang}"]`);
    items.push({
      group: ui.actions,
      label: otherLang === 'fr' ? ui.langFr : ui.langEn,
      href: langLink ? langLink.getAttribute('href') : otherLang === 'fr' ? '/fr/' : '/en/',
      keywords: 'lang language langue fr en'
    });

    const cvHref =
      locale === 'fr'
        ? '/assets/cv/melih-cetinkaya-cv.pdf'
        : '/assets/cv/melih-cetinkaya-resume.pdf';
    items.push({
      group: ui.actions,
      label: ui.cv,
      href: cvHref,
      external: true,
      keywords: 'cv resume pdf'
    });

    const powerOn = systemReducedMotion() || readOceanPowerPref();
    items.push({
      group: ui.actions,
      label: powerOn ? ui.oceanOff : ui.oceanOn,
      action: 'ocean-toggle',
      keywords: 'ocean océan battery performance power',
      disabled: systemReducedMotion()
    });

    return items;
  }

  show() {
    const ui = this.ui();
    this.items = this.collectItems();
    if (!window.__projectsCatalog) {
      getProjectsCatalog().then((data) => {
        if (data && this.open) {
          this.items = this.collectItems();
          this.renderList();
        }
      });
    }
    this.root.setAttribute('aria-label', ui.dialogLabel);
    this.input.placeholder = ui.placeholder;
    this.empty.textContent = ui.empty;
    this.input.value = '';
    this.activeIndex = 0;
    this.lastFocus = document.activeElement;
    this.open = true;
    this.root.hidden = false;
    document.body.classList.add('cmd-palette-open');
    this.renderList();
    requestAnimationFrame(() => this.input.focus());
  }

  close() {
    if (!this.open) return;
    this.open = false;
    this.root.hidden = true;
    document.body.classList.remove('cmd-palette-open');
    if (this.lastFocus && typeof this.lastFocus.focus === 'function') {
      this.lastFocus.focus();
    }
    this.lastFocus = null;
  }

  renderList() {
    const q = this.input.value.trim().toLowerCase();
    this.filtered = this.items.filter((item) => {
      if (!q) return true;
      const hay = `${item.label} ${item.keywords || ''} ${item.group}`.toLowerCase();
      return hay.includes(q);
    });
    this.list.innerHTML = '';
    this.empty.hidden = this.filtered.length > 0;
    if (this.activeIndex >= this.filtered.length) this.activeIndex = Math.max(0, this.filtered.length - 1);

    let lastGroup = '';
    this.filtered.forEach((item, index) => {
      if (item.group !== lastGroup) {
        lastGroup = item.group;
        const head = document.createElement('li');
        head.className = 'cmd-palette__group';
        head.textContent = item.group;
        head.setAttribute('role', 'presentation');
        this.list.appendChild(head);
      }
      const li = document.createElement('li');
      li.className = 'cmd-palette__item';
      li.setAttribute('role', 'option');
      li.id = `cmd-opt-${index}`;
      li.setAttribute('aria-selected', index === this.activeIndex ? 'true' : 'false');
      if (item.disabled) li.setAttribute('aria-disabled', 'true');
      if (index === this.activeIndex) li.classList.add('is-active');
      li.textContent = item.label;
      li.addEventListener('click', () => this.run(item));
      this.list.appendChild(li);
    });
    this.input.setAttribute('aria-activedescendant', this.filtered.length ? `cmd-opt-${this.activeIndex}` : '');
  }

  onInputKey(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!this.filtered.length) return;
      this.activeIndex = (this.activeIndex + 1) % this.filtered.length;
      this.renderList();
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!this.filtered.length) return;
      this.activeIndex = (this.activeIndex - 1 + this.filtered.length) % this.filtered.length;
      this.renderList();
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const item = this.filtered[this.activeIndex];
      if (item) this.run(item);
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      this.input.focus();
    }
  }

  run(item) {
    if (item.disabled) return;
    if (item.action === 'ocean-toggle') {
      toggleOceanPowerSave();
      this.close();
      return;
    }
    if (!item.href) return;
    this.close();
    if (item.external) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
      return;
    }
    const a = document.createElement('a');
    a.href = item.href;
    document.body.appendChild(a);
    a.click();
    a.remove();
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

  getFocusableElements() {
    if (!this.root) return [];
    const nodes = [this.closeBtn, this.prevBtn, this.nextBtn].filter(
      (el) => el && !el.hidden && !el.disabled
    );
    return nodes;
  }

  trapFocus(e) {
    const focusable = this.getFocusableElements();
    if (focusable.length === 0) {
      e.preventDefault();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (e.shiftKey) {
      if (active === first || !this.root.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else if (active === last || !this.root.contains(active)) {
      e.preventDefault();
      first.focus();
    }
  }

  onKeyDown(e) {
    if (!this.open) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      this.close();
      return;
    }
    if (e.key === 'Tab') {
      this.trapFocus(e);
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
  new OceanPowerToggle(signal);
  new CommandPaletteTrigger(signal);
  syncOceanAtmosphere();
  new KoiSiteHint();

  if (document.querySelector('.projects-filters') && document.querySelectorAll('.project-card').length) {
    window.__projectFilters = new ProjectFilters();
  }
  if (document.querySelector('.project-gallery')) {
    window.__gallerySpotlight = new GallerySpotlight();
  }
  if (document.querySelector('.contact__form')) new ContactForm();
}

/** Soft navigation: swap `.site` only so the ocean canvas keeps running. */
function syncMetaByName(doc, name) {
  const next = doc.querySelector(`meta[name="${name}"]`);
  let cur = document.querySelector(`meta[name="${name}"]`);
  if (!next) {
    if (cur) cur.remove();
    return;
  }
  if (!cur) {
    cur = document.createElement('meta');
    cur.setAttribute('name', name);
    document.head.appendChild(cur);
  }
  cur.setAttribute('content', next.getAttribute('content') || '');
}

function syncMetaByProperty(doc, property) {
  const next = doc.querySelector(`meta[property="${property}"]`);
  let cur = document.querySelector(`meta[property="${property}"]`);
  if (!next) {
    if (cur) cur.remove();
    return;
  }
  if (!cur) {
    cur = document.createElement('meta');
    cur.setAttribute('property', property);
    document.head.appendChild(cur);
  }
  cur.setAttribute('content', next.getAttribute('content') || '');
}

function syncLinkByRel(doc, rel) {
  const next = doc.querySelector(`link[rel="${rel}"]`);
  let cur = document.querySelector(`link[rel="${rel}"]`);
  if (!next) {
    if (cur) cur.remove();
    return;
  }
  if (!cur) {
    cur = document.createElement('link');
    cur.setAttribute('rel', rel);
    document.head.appendChild(cur);
  }
  const href = next.getAttribute('href');
  if (href != null) cur.setAttribute('href', href);
  const type = next.getAttribute('type');
  if (type != null) cur.setAttribute('type', type);
  else cur.removeAttribute('type');
}

function syncHreflangAlternates(doc) {
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
  doc.querySelectorAll('link[rel="alternate"][hreflang]').forEach((next) => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', next.getAttribute('hreflang') || '');
    link.setAttribute('href', next.getAttribute('href') || '');
    document.head.appendChild(link);
  });
}

function syncJsonLd(doc) {
  document.querySelectorAll('script[type="application/ld+json"]').forEach((el) => el.remove());
  doc.querySelectorAll('script[type="application/ld+json"]').forEach((next) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = next.textContent || '';
    document.head.appendChild(script);
  });
}

function syncDocumentHead(doc) {
  document.documentElement.lang = doc.documentElement.lang || document.documentElement.lang;
  document.title = doc.title;

  syncMetaByName(doc, 'description');
  syncMetaByName(doc, 'twitter:card');
  syncLinkByRel(doc, 'canonical');
  syncLinkByRel(doc, 'icon');
  syncHreflangAlternates(doc);
  syncJsonLd(doc);

  ['og:type', 'og:title', 'og:description', 'og:url', 'og:image', 'og:image:width', 'og:image:height'].forEach((property) => {
    syncMetaByProperty(doc, property);
  });
}

function normalizePathname(pathname) {
  let p = (pathname || '/').replace(/\/index\.html$/i, '/');
  if (p === '/fr' || p === '/en') p += '/';
  return p || '/';
}

class SoftNav {
  constructor() {
    this.pending = false;
    this.currentDocKey = this.getDocKey(location);
    document.addEventListener('click', (e) => this.onClick(e));
    window.addEventListener('popstate', () => {
      const nextKey = this.getDocKey(location);
      if (nextKey === this.currentDocKey) {
        this.scrollToHash(location.hash, 'smooth');
        return;
      }
      this.load(location.href, false);
    });
  }

  getDocKey(urlLike) {
    return `${normalizePathname(urlLike.pathname)}${urlLike.search || ''}`;
  }

  scrollToHash(hash, behavior = 'smooth') {
    if (!hash || hash === '#' || hash === '#home') {
      const top = document.getElementById('home');
      if (top) top.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior });
      return;
    }
    let target = null;
    try {
      target = document.querySelector(hash);
    } catch {
      const id = decodeURIComponent(hash.slice(1));
      target = document.getElementById(id);
    }
    if (target) {
      target.scrollIntoView({ behavior });
    }
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

    if (this.getDocKey(url) === this.getDocKey(location) && url.hash) {
      e.preventDefault();
      const nextHref = `${location.pathname}${location.search}${url.hash}`;
      if (`${location.pathname}${location.search}${location.hash}` !== nextHref) {
        history.pushState({ soft: true }, '', nextHref);
      }
      this.scrollToHash(url.hash, 'smooth');
      return;
    }

    e.preventDefault();
    this.load(url.href, true);
  }

  isSoftUrl(url) {
    const p = url.pathname;
    if (p.startsWith('/assets/')) return false;
    if (/\.(pdf|png|jpe?g|webp|svg|zip|css|js|json|xml|txt)$/i.test(p)) return false;
    if (p === '/404.html' || p.endsWith('/404.html') || p === '/koi.html' || p.endsWith('/koi.html')) return false;
    return true;
  }

  async load(href, push) {
    if (this.pending) return;
    this.pending = true;
    document.documentElement.classList.add('is-soft-nav');
    try {
      const targetUrl = new URL(href, location.href);
      let fetchPath = targetUrl.pathname;
      let res = await fetch(fetchPath, { headers: { Accept: 'text/html' }, credentials: 'same-origin' });
      let html = res.ok ? await res.text() : '';
      let doc = html ? new DOMParser().parseFromString(html, 'text/html') : null;

      if ((!res.ok || !doc?.querySelector('.site')) && normalizePathname(fetchPath).endsWith('/')) {
        const fallbackPath = `${normalizePathname(fetchPath)}index.html`;
        res = await fetch(fallbackPath, { headers: { Accept: 'text/html' }, credentials: 'same-origin' });
        html = res.ok ? await res.text() : '';
        doc = html ? new DOMParser().parseFromString(html, 'text/html') : null;
      }

      if (!res.ok || !doc) {
        location.assign(href);
        return;
      }

      const nextSite = doc.querySelector('.site');
      const curSite = document.querySelector('.site');
      const nextOcean = doc.querySelector('[data-ocean]');
      if (!nextSite || !curSite || !nextOcean) {
        location.assign(href);
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

      syncDocumentHead(doc);

      if (push) history.pushState({ soft: true }, '', href);
      this.currentDocKey = this.getDocKey(targetUrl);

      bootPage();

      if (targetUrl.hash) {
        this.scrollToHash(targetUrl.hash, 'auto');
        requestAnimationFrame(() => {
          this.scrollToHash(targetUrl.hash, 'auto');
        });
      } else {
        window.scrollTo(0, 0);
      }
    } catch {
      location.assign(href);
    } finally {
      this.pending = false;
      document.documentElement.classList.remove('is-soft-nav');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getProjectsCatalog();
  new OceanBoot();
  bootPage();
  new SoftNav();
  new CommandPalette();
});
