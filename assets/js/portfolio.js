const LOCALE = document.documentElement.lang.startsWith('fr') ? 'fr' : 'en';

const I18N = {
  en: {
    homePath: '/en/',
    projectFilterUi: {
      searchPlaceholder: 'Search by technology…',
      searchAriaLabel: 'Filter projects by technology',
      filterChipsAriaLabel: 'Active filters (match all)',
      removeFilterChipAriaPrefix: 'Remove filter',
      filterByTagAriaPrefix: 'Filter by',
      sortFeatured: 'Featured',
      sortChrono: 'Chronological',
      sortAriaLabel: 'Sort projects (Featured or Chronological)',
      resultsCount: (n) => `${n} project${n === 1 ? '' : 's'}`
    },
    contactForm: {
      sending: 'Sending…',
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
    oceanPause: {
      pause: 'Pause ocean',
      resume: 'Resume ocean'
    },
    commandPalette: {
      dialogLabel: 'Command palette',
      triggerLabel: 'Command palette',
      placeholder: 'Jump to project, technology, or action…',
      empty: 'No matches',
      sections: 'Sections',
      projects: 'Projects',
      technologies: 'Technologies',
      actions: 'Actions',
      home: 'Home',
      projectsSection: 'Projects',
      about: 'About',
      contact: 'Contact',
      langFr: 'Switch to French',
      langEn: 'Switch to English',
      cv: 'Open resume (PDF)',
      copyEmail: 'Copy email address',
      filterByPrefix: 'Filter ·',
      featuredMeta: 'Featured',
      githubMeta: 'GitHub ↗',
      oceanOn: 'Enable reduced ocean',
      oceanOff: 'Disable reduced ocean',
      oceanPause: 'Pause ocean',
      oceanResume: 'Resume ocean',
      footNav: '↑↓ navigate · ↵ open · Esc close'
    },
    projectToc: {
      label: 'On this page',
      toggle: 'Contents'
    },
    toast: {
      oceanPaused: 'Ocean paused · Space to resume',
      oceanResumed: 'Ocean resumed',
      oceanReducedOn: 'Reduced ocean enabled',
      oceanReducedOff: 'Full ocean enabled',
      emailCopied: 'Email copied · m.ctk3201@gmail.com',
      filterApplied: (tech) => `Filter active: ${tech}`
    },
    heroHint: {
      ripple: 'Click · ripple',
      lure: 'Hold · attract koi',
      pause: 'Space · pause',
      paused: 'Space · paused',
      cmd: (key) => `${key} · commands`
    },
    contactAside: {
      copy: 'Copy',
      copied: 'Copied ✓',
      projectDraft: (title) => `Hello Melih,\n\nI’m reaching out regarding your project "${title}".\n`
    },
    quickPeek: {
      trigger: 'Peek',
      dialogLabel: 'Project quick preview',
      close: 'Close',
      prev: 'Previous project',
      next: 'Next project',
      loading: 'Loading preview…',
      overview: 'Overview',
      architecture: 'Architecture flows',
      preview: 'Preview',
      stack: 'Technologies',
      openFull: 'Open case study →',
      github: 'GitHub ↗'
    },
    archBlueprint: {
      hint: 'Hover a node to inspect · click to filter projects',
      hintTouch: 'Tap a node to inspect · tap again to filter',
      filterCta: 'Filter →'
    },
    projectPager: {
      prev: '← Previous project',
      next: 'Next project →',
      discuss: 'Discuss this project',
      shot: 'Shot ↗'
    },
    aboutSkills: {
      hint: 'Hover a technology · click to filter projects',
      hintTouch: 'Tap a technology to filter projects',
      filterCta: 'Filter →',
      more: (n) => `+${n}`
    }
  },
  fr: {
    homePath: '/fr/',
    projectFilterUi: {
      searchPlaceholder: 'Rechercher une technologie…',
      searchAriaLabel: 'Filtrer les projets par technologie',
      filterChipsAriaLabel: 'Filtres actifs (intersection)',
      removeFilterChipAriaPrefix: 'Retirer le filtre',
      filterByTagAriaPrefix: 'Filtrer par',
      sortFeatured: 'Sélection',
      sortChrono: 'Chronologique',
      sortAriaLabel: 'Trier les projets (Sélection ou Chronologique)',
      resultsCount: (n) => `${n} projet${n === 1 ? '' : 's'}`
    },
    contactForm: {
      sending: 'Envoi…',
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
    oceanPause: {
      pause: 'Pause océan',
      resume: 'Reprendre océan'
    },
    commandPalette: {
      dialogLabel: 'Palette de commandes',
      triggerLabel: 'Palette de commandes',
      placeholder: 'Projet, technologie ou action…',
      empty: 'Aucun résultat',
      sections: 'Sections',
      projects: 'Projets',
      technologies: 'Technologies',
      actions: 'Actions',
      home: 'Accueil',
      projectsSection: 'Projets',
      about: 'À propos',
      contact: 'Contact',
      langFr: 'Passer en français',
      langEn: 'Passer en anglais',
      cv: 'Ouvrir le CV (PDF)',
      copyEmail: 'Copier l’adresse email',
      filterByPrefix: 'Filtrer ·',
      featuredMeta: 'Sélection',
      githubMeta: 'GitHub ↗',
      oceanOn: 'Activer l’océan réduit',
      oceanOff: 'Désactiver l’océan réduit',
      oceanPause: 'Mettre l’océan en pause',
      oceanResume: 'Reprendre l’océan',
      footNav: '↑↓ naviguer · ↵ ouvrir · Esc fermer'
    },
    projectToc: {
      label: 'Sur cette page',
      toggle: 'Sommaire'
    },
    toast: {
      oceanPaused: 'Océan en pause · Espace pour reprendre',
      oceanResumed: 'Océan relancé',
      oceanReducedOn: 'Mode océan réduit activé',
      oceanReducedOff: 'Océan complet activé',
      emailCopied: 'Email copié · m.ctk3201@gmail.com',
      filterApplied: (tech) => `Filtre actif : ${tech}`
    },
    heroHint: {
      ripple: 'Clic · onde',
      lure: 'Maintenir · attirer',
      pause: 'Espace · pause',
      paused: 'Espace · en pause',
      cmd: (key) => `${key} · commandes`
    },
    contactAside: {
      copy: 'Copier',
      copied: 'Copié ✓',
      projectDraft: (title) => `Bonjour Melih,\n\nJe vous contacte au sujet de votre projet « ${title} ».\n`
    },
    quickPeek: {
      trigger: 'Aperçu',
      dialogLabel: 'Aperçu rapide du projet',
      close: 'Fermer',
      prev: 'Projet précédent',
      next: 'Projet suivant',
      loading: 'Chargement de l’aperçu…',
      overview: 'Présentation',
      architecture: 'Flux d’architecture',
      preview: 'Aperçu visuel',
      stack: 'Technologies',
      openFull: 'Ouvrir l’étude de cas →',
      github: 'GitHub ↗'
    },
    archBlueprint: {
      hint: 'Survolez un nœud pour inspecter · cliquez pour filtrer les projets',
      hintTouch: 'Touchez un nœud pour inspecter · retouchez pour filtrer',
      filterCta: 'Filtrer →'
    },
    projectPager: {
      prev: '← Projet précédent',
      next: 'Projet suivant →',
      discuss: 'Discuter de ce projet',
      shot: 'Capture ↗'
    },
    aboutSkills: {
      hint: 'Survolez une technologie · cliquez pour filtrer les projets',
      hintTouch: 'Touchez une technologie pour filtrer les projets',
      filterCta: 'Filtrer →',
      more: (n) => `+${n}`
    }
  }
};

const CONFIG = {
  messageDisplayTime: 3000,
  languageFrameworks: {
    Python: ['FastAPI', 'Tkinter', 'SQLAlchemy', 'Alembic', 'Pytest', 'Flask', 'Django', 'Pydantic', 'scikit-learn', 'Pandas', 'NumPy', 'Pygame'],
    JavaScript: ['React', 'Next', 'Vue.js', 'Vue', 'Express', 'Express.js', 'Fastify', 'Node.js', 'jQuery', 'Vite', 'Zustand', 'Pinia', 'Axios', 'Leaflet', 'Vitest', 'Phaser'],
    TypeScript: ['React', 'Next', 'Vue.js', 'Vue', 'Vite', 'Zustand', 'shadcn/ui', 'Zod', 'Recharts'],
    Kotlin: ['Jetpack Compose', 'Retrofit'],
    PHP: ['Laravel', 'Symfony', 'Blade', 'Livewire', 'Doctrine', 'Twig', 'PHPUnit', 'PHPStan', 'Composer'],
    Swift: ['UIKit', 'iOS'],
    Dart: ['Flutter'],
    'C#': ['ASP.NET Core', '.NET Core', 'WPF', 'WinUI 3', 'Entity Framework Core', 'MSTest', 'xUnit', 'Moq'],
    '.NET': ['ASP.NET Core', '.NET Core', 'WPF', 'WinUI 3', 'Entity Framework Core'],
    '.NET Core': ['ASP.NET Core', '.NET Core', 'WPF', 'WinUI 3', 'Entity Framework Core']
  },
  projectFilterUi: I18N[LOCALE].projectFilterUi,
  contactForm: I18N[LOCALE].contactForm,
  spotlight: I18N[LOCALE].spotlight,
  homePath: I18N[LOCALE].homePath,
  oceanPower: I18N[LOCALE].oceanPower,
  commandPalette: I18N[LOCALE].commandPalette
};

const OCEAN_POWER_KEY = 'ocean-power-save';
const CONTACT_EMAIL = 'm.ctk3201@gmail.com';

function showToast(message) {
  if (!message) return;
  let stack = document.querySelector('.toast-stack');
  if (!stack) {
    stack = document.createElement('div');
    stack.className = 'toast-stack';
    stack.setAttribute('role', 'status');
    stack.setAttribute('aria-live', 'polite');
    stack.setAttribute('aria-atomic', 'true');
    document.body.appendChild(stack);
  }
  while (stack.children.length >= 2) {
    stack.firstElementChild.remove();
  }
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  stack.appendChild(el);
  requestAnimationFrame(() => el.classList.add('is-visible'));
  window.setTimeout(() => {
    el.classList.remove('is-visible');
    window.setTimeout(() => el.remove(), 220);
  }, 2600);
}

async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {}
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

function parseUrlSafe(href, base = location.href) {
  try {
    return new URL(href, base);
  } catch {
    return null;
  }
}

function isSafeSameOriginHref(href) {
  const url = parseUrlSafe(href);
  if (!url) return false;
  if (url.origin !== location.origin) return false;
  return url.protocol === 'http:' || url.protocol === 'https:';
}

function isSafeHttpsHref(href, { hosts = null } = {}) {
  const url = parseUrlSafe(href);
  if (!url) return false;
  if (url.protocol !== 'https:') return false;
  if (url.username || url.password) return false;
  if (hosts && hosts.length) {
    const host = url.hostname.toLowerCase();
    const allowed = hosts.some((h) => host === h || host.endsWith(`.${h}`));
    if (!allowed) return false;
  }
  return true;
}

function resolveSafeSameOriginSrc(src) {
  if (!src) return '';
  const url = parseUrlSafe(src);
  if (!url || url.origin !== location.origin) return '';
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return '';
  return `${url.pathname}${url.search}`;
}

function softNavigateTo(href) {
  if (!href || !isSafeSameOriginHref(href)) return;
  const a = document.createElement('a');
  a.href = href;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function syncHeroHintPause() {
  const el = document.querySelector('[data-hero-pause-hint]');
  if (!el) return;
  const paused = isOceanPaused();
  const ui = uiStrings().heroHint || {};
  el.textContent = paused ? ui.paused || 'Space · paused' : ui.pause || 'Space · pause';
  el.classList.toggle('is-paused', paused);
}

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
  const t = uiStrings().toast || {};
  showToast(next ? t.oceanReducedOn : t.oceanReducedOff);
  return next;
}

function isOceanEffectivelyStill() {
  return systemReducedMotion() || readOceanPowerPref() || document.documentElement.classList.contains('ocean-power-save');
}

function applyOceanPause(enabled) {
  const engine = window.__oceanEngine;
  if (engine && typeof engine.setPaused === 'function') {
    engine.setPaused(enabled);
  }
  document.documentElement.classList.toggle('ocean-paused', enabled);
  syncHeroHintPause();
}

function isOceanPaused() {
  const engine = window.__oceanEngine;
  if (engine && typeof engine.isPaused === 'function') return !!engine.isPaused();
  return document.documentElement.classList.contains('ocean-paused');
}

function toggleOceanPause() {
  if (isOceanEffectivelyStill()) return isOceanPaused();
  const next = !isOceanPaused();
  applyOceanPause(next);
  const t = uiStrings().toast || {};
  showToast(next ? t.oceanPaused : t.oceanResumed);
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
    this.loadToken = 0;

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
    const token = ++this.loadToken;
    await this.loadProjectTechnologies();
    if (this.destroyed || token !== this.loadToken) return;
    this.extractTechnologies();
    this.createFilterSearchUi();
    this.bindCardTechTags();
    this.attachEventListeners();
    this.hydrateFromUrl();
    this.applySortOrder();
    this.filterProjects(false);
    document.dispatchEvent(new CustomEvent('portfolio:filters-ready'));
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
    sortBtn.textContent = this.sortMode === 'featured' ? (ui.sortFeatured || 'Featured') : (ui.sortChrono || 'Chronological');
    sortBtn.addEventListener('click', () => {
      this.sortMode = this.sortMode === 'featured' ? 'chrono' : 'featured';
      this.applySortOrder(true);
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

  runGridTransition(mutate) {
    if (!this.projectList || systemReducedMotion()) {
      mutate();
      return;
    }

    const token = (this._reflowToken = (this._reflowToken || 0) + 1);
    if (this._reflowTimer) {
      clearTimeout(this._reflowTimer);
      this._reflowTimer = 0;
    }

    if (window.__oceanEngine?.ripple) {
      const listRect = this.projectList.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      window.__oceanEngine.ripple(
        listRect.left + listRect.width * 0.5,
        Math.max(80, Math.min(vh * 0.55, listRect.top + 120))
      );
    }

    this.projectList.classList.add('is-reflow-out');

    this._reflowTimer = window.setTimeout(() => {
      this._reflowTimer = 0;
      if (this.destroyed || token !== this._reflowToken) return;

      mutate();

      const compact = window.matchMedia('(max-width: 40em)').matches;
      const stepMs = compact ? 42 : 55;
      const maxSteps = compact ? 6 : 8;
      const visibleCards = Array.from(this.projectList.children).filter(
        (el) => el.classList.contains('project-card') && !el.classList.contains('filtered-out')
      );

      visibleCards.forEach((card, idx) => {
        card.classList.remove('is-filter-enter');
        card.classList.add('is-in', 'is-revealed');
        card.style.removeProperty('--reveal-delay');
        card.style.animationDelay = `${Math.min(idx, maxSteps) * stepMs}ms`;
      });

      void this.projectList.offsetWidth;
      this.projectList.classList.remove('is-reflow-out');

      visibleCards.forEach((card) => {
        card.classList.add('is-filter-enter');
        card.addEventListener(
          'animationend',
          () => {
            card.classList.remove('is-filter-enter');
            card.style.animationDelay = '';
          },
          { once: true }
        );
      });
    }, 260);
  }

  applySortOrder(animate = false) {
    if (!this.projectList) return;
    const ui = uiStrings().projectFilterUi || {};
    if (this.sortBtn) {
      this.sortBtn.setAttribute('data-sort-mode', this.sortMode);
      this.sortBtn.textContent =
        this.sortMode === 'featured'
          ? ui.sortFeatured || 'Featured'
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
    const layoutChanged = this.projectList.classList.contains('projects-list--bento') !== (this.activeFilters.size === 0 && this.sortMode === 'featured');
    const commit = () => {
      if (orderChanged) {
        cards.forEach((card) => this.projectList.appendChild(card));
      }
      this.syncBentoState();
    };
    if (animate && (orderChanged || layoutChanged)) {
      this.runGridTransition(commit);
    } else {
      commit();
    }
  }

  syncBentoState() {
    if (!this.projectList) return;
    const useBento = this.activeFilters.size === 0 && this.sortMode === 'featured';
    this.projectList.classList.toggle('projects-list--bento', useBento);
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

  getProjectsForTech(rawTech) {
    const { key, label } = this.resolveFilterLabel(rawTech);
    const projects = [];
    this.projectCards.forEach((card) => {
      if (this.cardMatchesSingleFilter(card, key)) {
        const title = card.querySelector('.project-title')?.textContent?.trim();
        if (title) projects.push(title);
      }
    });
    return { key, label, projects };
  }

  filterSingleTech(filterKey, displayLabel) {
    if (!filterKey) return;
    const { key, label } = this.resolveFilterLabel(displayLabel || filterKey);
    this.activeFilters.clear();
    this.activeFilters.set(key, (displayLabel || label || '').trim() || key);
    if (this.searchInput) this.searchInput.value = '';
    this.closeSearchSuggestions();
    this.syncAllButtonState();
    this.renderFilterChips();
    this.syncCardTagStates();
    this.syncUrlParams();
    this.filterProjects();
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
    const shouldAnimate = animate && !systemReducedMotion();
    let visibleCount = 0;

    this.projectCards.forEach((card) => {
      if (card.closest('.projects__btn-container')) return;
      if (keys.length === 0 || keys.every((k) => this.cardMatchesSingleFilter(card, k))) {
        visibleCount++;
      }
    });

    const applyFilterDom = () => {
      this.projectCards.forEach((card) => {
        if (card.closest('.projects__btn-container')) {
          return;
        }
        const match = keys.length === 0 || keys.every((k) => this.cardMatchesSingleFilter(card, k));

        card.classList.remove('is-filter-enter');
        card.style.display = '';
        card.style.opacity = '';
        card.style.transform = '';
        card.style.transition = '';
        card.style.animationDelay = '';

        if (match) {
          card.classList.remove('filtered-out');
          if (shouldAnimate || keys.length > 0) {
            card.classList.add('is-in', 'is-revealed');
            card.style.removeProperty('--reveal-delay');
          }
        } else {
          card.classList.add('filtered-out');
        }
      });

      this.syncBentoState();
    };

    this.updateResultsCount(visibleCount, shouldAnimate);

    if (shouldAnimate) {
      this.runGridTransition(applyFilterDom);
    } else {
      applyFilterDom();
    }
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
    this.loadToken += 1;
    if (this._reflowTimer) {
      clearTimeout(this._reflowTimer);
      this._reflowTimer = 0;
    }
    if (this._docClickBound && this._onSearchDocClick) {
      document.removeEventListener('click', this._onSearchDocClick);
      this._docClickBound = false;
    }
  }
}

class ContactForm {
  constructor() {
    this.form = document.querySelector('.contact__form');
    this.submitBtn = this.form ? this.form.querySelector('button[type="submit"], .contact__btn') : null;
    this.submitting = false;
    if (this.form) {
      this.init();
    }
  }

  init() {
    this.form.addEventListener('submit', (event) => this.handleSubmit(event));
    this.hydrateProjectContext();
  }

  async hydrateProjectContext() {
    const params = new URLSearchParams(location.search);
    const projectId = (params.get('project') || '').trim();
    if (!projectId) return;

    const locale = currentLocale();
    let title = '';
    const card = document.querySelector(`.project-card[data-project-id="${CSS.escape(projectId)}"]`);
    if (card) {
      title = card.querySelector('.project-title')?.textContent?.trim() || '';
    }
    if (!title) {
      const catalog = await getProjectsCatalog();
      const match = catalog?.projects?.find((p) => p.id === projectId);
      if (match) title = (match.titles && match.titles[locale]) || match.id;
    }
    if (!title) title = projectId;

    const reason = this.form.querySelector('#reason');
    if (reason && reason.querySelector('option[value="project_inquiry"]')) {
      reason.value = 'project_inquiry';
    }
    const msg = this.form.querySelector('#message');
    if (msg && !msg.value.trim()) {
      const asideUi = uiStrings().contactAside || {};
      msg.value = typeof asideUi.projectDraft === 'function' ? asideUi.projectDraft(title) : title;
    }

    const url = new URL(location.href);
    url.searchParams.delete('project');
    history.replaceState(history.state, '', `${url.pathname}${url.search}${url.hash}`);
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.submitting) return;

    const contactUi = uiStrings().contactForm || CONFIG.contactForm;
    const originalLabel = this.submitBtn ? this.submitBtn.textContent : '';

    this.submitting = true;
    this.form.setAttribute('aria-busy', 'true');
    if (this.submitBtn) {
      this.submitBtn.disabled = true;
      this.submitBtn.setAttribute('aria-busy', 'true');
      this.submitBtn.textContent = contactUi.sending || '…';
    }

    try {
      const response = await fetch(this.form.action, {
        method: this.form.method,
        body: new FormData(this.form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        this.showMessage(contactUi.success, 'success');
        this.form.reset();
      } else {
        this.showMessage(contactUi.error, 'error');
      }
    } catch (error) {
      this.showMessage(contactUi.error, 'error');
    } finally {
      this.submitting = false;
      this.form.removeAttribute('aria-busy');
      if (this.submitBtn) {
        this.submitBtn.disabled = false;
        this.submitBtn.removeAttribute('aria-busy');
        this.submitBtn.textContent = originalLabel;
      }
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

class AboutSkills {
  constructor(signal) {
    this.container = document.querySelector('#about .skills-lines');
    this.readout = document.querySelector('[data-skills-readout]');
    this.signal = signal;
    this.hydrated = false;
    if (!this.container || !this.readout) return;

    this.textEl = this.readout.querySelector('.skills-readout__text');
    this.ctaEl = this.readout.querySelector('.skills-readout__cta');
    this.setDefaultReadout();

    if (window.__projectFilters?.technologies?.length) {
      this.hydrate();
    } else {
      document.addEventListener('portfolio:filters-ready', () => this.hydrate(), { once: true, signal });
    }
  }

  setDefaultReadout() {
    const ui = uiStrings().aboutSkills || {};
    const isTouch = typeof window.matchMedia === 'function' && window.matchMedia('(hover: none)').matches;
    if (this.textEl) {
      this.textEl.textContent = (isTouch ? ui.hintTouch : ui.hint) || 'Hover a technology · click to filter projects';
      this.textEl.removeAttribute('title');
    }
    if (this.ctaEl) this.ctaEl.textContent = '';
  }

  hydrate() {
    if (this.hydrated || this.signal.aborted) return;
    const filters = window.__projectFilters;
    if (!filters || typeof filters.getProjectsForTech !== 'function') return;
    this.hydrated = true;

    const ui = uiStrings().aboutSkills || {};
    const toastUi = uiStrings().toast || {};
    const chips = Array.from(this.container.querySelectorAll('.skill-chip[data-skill]'));

    chips.forEach((chip) => {
      const rawTech = chip.getAttribute('data-skill');
      if (!rawTech) return;
      const displayName = chip.textContent.trim();
      const { key, label, projects } = filters.getProjectsForTech(rawTech);
      if (!projects.length) return;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'skill-chip is-interactive';
      btn.setAttribute('data-skill', rawTech);
      const filterPrefix = (uiStrings().projectFilterUi || {}).filterByTagAriaPrefix || 'Filter by';
      btn.setAttribute('aria-label', `${filterPrefix} ${displayName} (${projects.length})`);

      const nameSpan = document.createElement('span');
      nameSpan.textContent = displayName;
      const countSpan = document.createElement('span');
      countSpan.className = 'skill-chip__count';
      countSpan.setAttribute('aria-hidden', 'true');
      countSpan.textContent = String(projects.length);
      btn.append(nameSpan, countSpan);

      const showInfo = () => {
        if (!this.textEl) return;
        this.textEl.innerHTML = '';
        const strong = document.createElement('strong');
        strong.textContent = displayName;
        this.textEl.appendChild(strong);
        const shown = projects.slice(0, 4).join(', ');
        const extra = projects.length > 4 ? ` ${typeof ui.more === 'function' ? ui.more(projects.length - 4) : `+${projects.length - 4}`}` : '';
        this.textEl.appendChild(document.createTextNode(` — ${shown}${extra}`));
        this.textEl.title = `${displayName} — ${projects.join(', ')}`;
        if (this.ctaEl) this.ctaEl.textContent = ui.filterCta || 'Filter →';
      };

      const clearInfo = () => this.setDefaultReadout();

      btn.addEventListener('pointerenter', showInfo, { signal: this.signal });
      btn.addEventListener('pointerleave', clearInfo, { signal: this.signal });
      btn.addEventListener('focus', showInfo, { signal: this.signal });
      btn.addEventListener('blur', clearInfo, { signal: this.signal });
      btn.addEventListener(
        'click',
        () => {
          filters.filterSingleTech(key, label);
          const target = document.getElementById('projects');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
          if (typeof toastUi.filterApplied === 'function') showToast(toastUi.filterApplied(displayName));
        },
        { signal: this.signal }
      );

      chip.replaceWith(btn);
    });
  }
}

class ContactAside {
  constructor(signal) {
    const clock = document.querySelector('[data-local-clock]');
    if (clock) {
      const locale = currentLocale() === 'fr' ? 'fr-FR' : 'en-GB';
      const fmt = new Intl.DateTimeFormat(locale, {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit'
      });
      const updateClock = () => {
        const now = new Date();
        clock.textContent = fmt.format(now);
        clock.setAttribute('datetime', now.toISOString());
      };
      updateClock();
      const timer = window.setInterval(updateClock, 15000);
      signal.addEventListener('abort', () => window.clearInterval(timer));
    }

    document.querySelectorAll('[data-copy-email]').forEach((btn) => {
      let resetTimer = 0;
      btn.addEventListener(
        'click',
        async () => {
          const email = btn.getAttribute('data-copy-email') || CONTACT_EMAIL;
          const ok = await copyToClipboard(email);
          if (!ok) return;
          const ui = uiStrings().contactAside || {};
          const toastUi = uiStrings().toast || {};
          btn.textContent = ui.copied || 'Copied ✓';
          btn.classList.add('is-copied');
          showToast(toastUi.emailCopied || email);
          window.clearTimeout(resetTimer);
          resetTimer = window.setTimeout(() => {
            btn.textContent = ui.copy || 'Copy';
            btn.classList.remove('is-copied');
          }, 2000);
        },
        { signal }
      );
      signal.addEventListener('abort', () => window.clearTimeout(resetTimer));
    });
  }
}

class HeroHint {
  constructor(signal) {
    const hero = document.querySelector('.hero');
    if (!hero || hero.querySelector('.hero__hint')) return;
    const ui = uiStrings().heroHint || {};
    const isApple = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || navigator.userAgent || '');
    const cmdKey = isApple ? '⌘K' : 'Ctrl+K';

    const bar = document.createElement('div');
    bar.className = 'hero__hint';
    bar.setAttribute('aria-hidden', 'true');

    const parts = [
      { text: ui.ripple || 'Click · ripple' },
      { text: ui.lure || 'Hold · attract koi' },
      { text: isOceanPaused() ? ui.paused || 'Space · paused' : ui.pause || 'Space · pause', pauseAttr: true },
      { text: typeof ui.cmd === 'function' ? ui.cmd(cmdKey) : `${cmdKey} · commands` }
    ];

    parts.forEach((part, idx) => {
      if (idx > 0) {
        const sep = document.createElement('span');
        sep.className = 'hero__hint-sep';
        sep.textContent = '/';
        bar.appendChild(sep);
      }
      const span = document.createElement('span');
      span.className = 'hero__hint-item';
      span.textContent = part.text;
      if (part.pauseAttr) {
        span.setAttribute('data-hero-pause-hint', '');
        if (isOceanPaused()) span.classList.add('is-paused');
      }
      bar.appendChild(span);
    });

    hero.appendChild(bar);

    const onScroll = () => {
      bar.classList.toggle('is-hidden', window.scrollY > 120);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true, signal });
    signal.addEventListener('abort', () => bar.remove());
  }
}

class SiteChrome {
  constructor(signal) {
    this.header = document.querySelector('.header');
    this.toggle = document.querySelector('[data-nav-toggle]');
    this.panel = document.querySelector('[data-nav-panel]');
    this.navList = document.querySelector('.header__links');
    this.navIndicator = null;
    this.hoveredNavLink = null;
    this.sectionObserver = null;
    this.onScroll = this.onScroll.bind(this);
    const opts = { passive: true, signal };
    this.onScroll();
    window.addEventListener('scroll', this.onScroll, opts);
    this.initNavIndicator(signal);
    this.bindHomeLinks(signal);
    this.initScrollSpy(signal);
    if (location.hash === '#home') {
      window.scrollTo(0, 0);
    }
    if (this.toggle && this.panel) {
      const setPanelOpen = (open, restoreFocus = false) => {
        this.panel.classList.toggle('is-open', open);
        this.toggle.setAttribute('aria-expanded', String(open));
        document.body.classList.toggle('nav-open', open);
        if (!open && restoreFocus) this.toggle.focus();
      };
      const closePanel = (restoreFocus = false) => {
        if (!this.panel.classList.contains('is-open')) return;
        setPanelOpen(false, restoreFocus);
      };
      this.toggle.addEventListener('click', () => {
        setPanelOpen(!this.panel.classList.contains('is-open'));
      }, { signal });
      this.panel.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => closePanel(false), { signal });
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePanel(true);
      }, { signal });
      document.addEventListener('click', (e) => {
        if (!this.panel.classList.contains('is-open')) return;
        if (this.panel.contains(e.target) || this.toggle.contains(e.target)) return;
        closePanel(false);
      }, { signal });
      signal.addEventListener('abort', () => {
        document.body.classList.remove('nav-open');
      });
      const desktopMq = window.matchMedia('(min-width: 64.01em)');
      const onMqChange = (e) => {
        if (e.matches) closePanel(false);
      };
      if (typeof desktopMq.addEventListener === 'function') {
        desktopMq.addEventListener('change', onMqChange, { signal });
      }
    }
    document.querySelectorAll('[data-set-lang]').forEach((a) => {
      a.addEventListener('click', () => {
        try {
          localStorage.setItem('preferredLanguage', a.getAttribute('data-set-lang'));
        } catch (e) {}
      }, { signal });
    });
  }

  initNavIndicator(signal) {
    if (!this.navList) return;
    let bar = this.navList.querySelector('.header__indicator');
    if (!bar) {
      bar = document.createElement('span');
      bar.className = 'header__indicator';
      bar.setAttribute('aria-hidden', 'true');
      this.navList.appendChild(bar);
    }
    this.navIndicator = bar;
    this.navList.classList.add('has-indicator');

    const links = Array.from(this.navList.querySelectorAll('.header__link'));
    links.forEach((link) => {
      link.addEventListener(
        'pointerenter',
        (e) => {
          if (e.pointerType === 'touch') return;
          this.hoveredNavLink = link;
          this.syncNavIndicator(link);
        },
        { signal }
      );
      link.addEventListener('focus', () => this.syncNavIndicator(link), { signal });
    });

    this.navList.addEventListener(
      'pointerleave',
      () => {
        this.hoveredNavLink = null;
        this.syncNavIndicator();
      },
      { signal }
    );
    this.navList.addEventListener(
      'focusout',
      (e) => {
        if (e.relatedTarget && this.navList.contains(e.relatedTarget)) return;
        this.hoveredNavLink = null;
        this.syncNavIndicator();
      },
      { signal }
    );

    const onResize = () => this.syncNavIndicator();
    window.addEventListener('resize', onResize, { passive: true, signal });
    document.fonts?.ready?.then(() => {
      if (!signal.aborted) this.syncNavIndicator();
    });
    requestAnimationFrame(() => this.syncNavIndicator());
  }

  getActiveDesktopNavLink() {
    if (!this.navList) return null;
    return (
      this.navList.querySelector('.header__link.is-active') ||
      this.navList.querySelector('.header__link[aria-current="page"]') ||
      this.navList.querySelector('.header__link')
    );
  }

  syncNavIndicator(explicitLink = null) {
    if (!this.navIndicator || !this.navList) return;
    const target = explicitLink || this.hoveredNavLink || this.getActiveDesktopNavLink();
    if (!target || target.offsetWidth < 1) {
      this.navIndicator.classList.remove('is-ready');
      return;
    }
    const listRect = this.navList.getBoundingClientRect();
    const linkRect = target.getBoundingClientRect();
    const left = linkRect.left - listRect.left;
    const width = linkRect.width;
    this.navIndicator.style.transform = `translateX(${left.toFixed(1)}px) scaleX(${width.toFixed(1)})`;
    this.navIndicator.classList.add('is-ready');
  }

  navLinks() {
    return Array.from(document.querySelectorAll('.header__link, .header__panel a'));
  }

  clearNavActive() {
    this.navLinks().forEach((a) => {
      a.classList.remove('is-active');
      if (a.getAttribute('aria-current') === 'location') {
        a.removeAttribute('aria-current');
      }
    });
    this.syncNavIndicator();
  }

  setNavActiveByHash(hash) {
    this.clearNavActive();
    if (!hash) return;
    this.navLinks().forEach((a) => {
      const href = a.getAttribute('href') || '';
      if (href.endsWith(hash) || href === hash) {
        a.classList.add('is-active');
        a.setAttribute('aria-current', 'location');
      }
    });
    this.syncNavIndicator();
  }

  setProjectsNavActive() {
    this.clearNavActive();
    this.navLinks().forEach((a) => {
      const href = a.getAttribute('href') || '';
      if (href.includes('#projects')) {
        a.classList.add('is-active');
        a.setAttribute('aria-current', 'location');
      }
    });
    this.syncNavIndicator();
  }

  initScrollSpy(signal) {
    const path = location.pathname || '';
    if (/\/(fr\/projets|en\/projects)\//.test(path)) {
      this.setProjectsNavActive();
      return;
    }

    const ids = ['projects', 'about', 'contact'];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) return;

    const ratios = new Map();
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        let bestId = null;
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        if (bestId && bestRatio > 0) this.setNavActiveByHash(`#${bestId}`);
        else this.clearNavActive();
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => this.sectionObserver.observe(section));
    signal.addEventListener('abort', () => {
      if (this.sectionObserver) this.sectionObserver.disconnect();
      this.sectionObserver = null;
    });

    this.navLinks().forEach((a) => {
      a.addEventListener(
        'click',
        () => {
          const href = a.getAttribute('href') || '';
          const hashIdx = href.indexOf('#');
          if (hashIdx >= 0) {
            const hash = href.slice(hashIdx);
            if (hash === '#projects' || hash === '#about' || hash === '#contact') {
              this.setNavActiveByHash(hash);
            }
          }
        },
        { signal }
      );
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
        this.clearNavActive();
      }, { signal });
    });
  }

  onScroll() {
    if (!this.header) return;
    this.header.classList.toggle('header--scrolled', window.scrollY > 24);
  }
}

function parseCssHexToRgb(color, fallback) {
  const raw = (color || '').trim();
  const rgbMatch = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i.exec(raw);
  if (rgbMatch) {
    return [
      Math.max(0, Math.min(255, Math.round(Number(rgbMatch[1])))),
      Math.max(0, Math.min(255, Math.round(Number(rgbMatch[2])))),
      Math.max(0, Math.min(255, Math.round(Number(rgbMatch[3]))))
    ];
  }
  const clean = raw.replace(/^#/, '');
  if (/^[0-9a-f]{6}$/i.test(clean)) {
    return [
      parseInt(clean.slice(0, 2), 16),
      parseInt(clean.slice(2, 4), 16),
      parseInt(clean.slice(4, 6), 16)
    ];
  }
  if (/^[0-9a-f]{3}$/i.test(clean)) {
    return [
      parseInt(clean[0] + clean[0], 16),
      parseInt(clean[1] + clean[1], 16),
      parseInt(clean[2] + clean[2], 16)
    ];
  }
  return fallback;
}

function readOceanPaletteFromElement(el = document.body) {
  const cs = getComputedStyle(el);
  const beni = parseCssHexToRgb(cs.getPropertyValue('--koi-beni'), [220, 56, 42]);
  const shiro = parseCssHexToRgb(cs.getPropertyValue('--koi-shiro'), [240, 236, 228]);
  const orange = parseCssHexToRgb(cs.getPropertyValue('--koi-orange'), [232, 140, 36]);
  const kin = parseCssHexToRgb(cs.getPropertyValue('--koi-kin'), [210, 168, 58]);
  return {
    accents: [rgbToHex(beni), rgbToHex(shiro), rgbToHex(kin), rgbToHex(orange)],
    bubbleRgb: [
      Math.round((shiro[0] + kin[0]) / 2),
      Math.round((shiro[1] + kin[1]) / 2),
      Math.round((shiro[2] + kin[2]) / 2)
    ],
    koiRgb: [beni, shiro, [36, 34, 38], orange, kin]
  };
}

function readOceanPaletteFromCss() {
  const universe = document.body?.dataset?.universe || '';
  return universe
    ? readOceanPaletteForUniverse(universe)
    : readOceanPaletteFromElement(document.documentElement);
}

function readOceanPaletteForUniverse(universe) {
  if (!universe) return readOceanPaletteFromElement(document.documentElement);
  let probe = document.querySelector('[data-ocean-probe]');
  if (!probe) {
    probe = document.createElement('span');
    probe.className = 'visually-hidden';
    probe.style.transition = 'none';
    probe.setAttribute('aria-hidden', 'true');
    probe.setAttribute('data-ocean-probe', '');
    document.body.appendChild(probe);
  }
  probe.setAttribute('data-universe', universe);
  const palette = readOceanPaletteFromElement(probe);
  probe.removeAttribute('data-universe');
  return palette;
}

function readTargetFishCount() {
  const fishAttr = document.body.dataset.oceanFish;
  const parsedFish = fishAttr ? Number(fishAttr) : NaN;
  return Number.isFinite(parsedFish) && parsedFish > 0 ? parsedFish : undefined;
}

function applyOceanPalette(palette, fishCount, updateFish = true) {
  const engine = window.__oceanEngine;
  if (!engine) return;
  window.__oceanCurrentPalette = palette;
  if (updateFish && typeof engine.setFishCount === 'function') {
    engine.setFishCount(fishCount);
  }
  if (typeof engine.setPalette === 'function') {
    const [br, bg, bb] = palette.bubbleRgb;
    engine.setPalette({
      accents: palette.accents,
      bubble: `rgb(${br},${bg},${bb})`,
      koiRgb: palette.koiRgb
    });
  }
}

function lerpChannel(a, b, t) {
  return Math.round(a + (b - a) * t);
}

function lerpRgb(a, b, t) {
  return [lerpChannel(a[0], b[0], t), lerpChannel(a[1], b[1], t), lerpChannel(a[2], b[2], t)];
}

function rgbToHex(rgb) {
  return `#${rgb.map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function cancelOceanPaletteLerp() {
  if (window.__oceanPaletteLerpRaf) {
    cancelAnimationFrame(window.__oceanPaletteLerpRaf);
    window.__oceanPaletteLerpRaf = 0;
  }
}

function syncOceanAtmosphere(options = {}) {
  const engine = window.__oceanEngine;
  if (!engine) return;

  const animate = !!options.animate;
  const preserveFishCount = !!options.preserveFishCount;
  const fromPalette = options.fromPalette || null;
  const fromFish = options.fromFish;
  const toPalette = options.toPalette || readOceanPaletteFromCss();
  const toFish = readTargetFishCount();

  cancelOceanPaletteLerp();

  const skipLerp =
    !animate ||
    !fromPalette ||
    systemReducedMotion() ||
    document.documentElement.classList.contains('ocean-power-save');

  if (skipLerp) {
    applyOceanPalette(toPalette, toFish, !preserveFishCount);
    return;
  }

  const duration = typeof options.duration === 'number' ? options.duration : 400;
  const start = performance.now();
  const updateFish = !preserveFishCount && (typeof fromFish === 'number' || typeof toFish === 'number');
  const fromFishNum = typeof fromFish === 'number' ? fromFish : toFish || 120;
  const toFishNum = typeof toFish === 'number' ? toFish : fromFishNum;

  const tick = (now) => {
    const t = easeInOutCubic(Math.min(1, (now - start) / duration));
    const koiRgb = fromPalette.koiRgb.map((rgb, i) => lerpRgb(rgb, toPalette.koiRgb[i], t));
    const accents = fromPalette.accents.map((hex, i) => {
      const a = parseCssHexToRgb(hex, toPalette.koiRgb[i] || [200, 200, 200]);
      const b = parseCssHexToRgb(toPalette.accents[i], a);
      return rgbToHex(lerpRgb(a, b, t));
    });
    const bubbleRgb = lerpRgb(fromPalette.bubbleRgb, toPalette.bubbleRgb, t);
    applyOceanPalette(
      { accents, bubbleRgb, koiRgb },
      updateFish ? Math.round(fromFishNum + (toFishNum - fromFishNum) * t) : undefined,
      updateFish
    );
    if (t < 1) {
      window.__oceanPaletteLerpRaf = requestAnimationFrame(tick);
    } else {
      window.__oceanPaletteLerpRaf = 0;
      applyOceanPalette(toPalette, toFish, !preserveFishCount);
    }
  };
  window.__oceanPaletteLerpRaf = requestAnimationFrame(tick);
}

class FeaturedOceanPreview {
  constructor(signal) {
    if (document.body.dataset.universe) return;
    const featuredCards = Array.from(document.querySelectorAll('.project-card')).filter(
      (card) => card.getAttribute('data-featured') === 'true' && card.getAttribute('data-project-id')
    );
    if (!featuredCards.length) return;

    this.activeUniverse = null;
    this.revertTimer = 0;
    this.lastLureAt = 0;

    const preview = (universe, card = null) => {
      if (!universe || !window.__oceanEngine) return;
      if (isOceanEffectivelyStill() || isOceanPaused()) return;
      if (document.documentElement.classList.contains('is-soft-nav')) return;
      clearTimeout(this.revertTimer);
      this.revertTimer = 0;
      if (this.activeUniverse === universe) return;
      this.activeUniverse = universe;
      syncOceanAtmosphere({
        animate: true,
        duration: 750,
        preserveFishCount: true,
        fromPalette: window.__oceanCurrentPalette || readOceanPaletteFromCss(),
        toPalette: readOceanPaletteForUniverse(universe)
      });
      const now = performance.now();
      if (card && now - this.lastLureAt > 2400) {
        this.lastLureAt = now;
        const rect = card.getBoundingClientRect();
        const lx = rect.left > window.innerWidth * 0.45 ? rect.left * 0.45 : Math.min(window.innerWidth - 90, rect.right + 80);
        const ly = Math.max(90, Math.min(window.innerHeight - 90, rect.top + rect.height * 0.5));
        if (typeof window.__oceanEngine.dropLure === 'function') {
          window.__oceanEngine.dropLure(lx, ly);
        }
      }
    };

    const scheduleRevert = () => {
      if (!this.activeUniverse) return;
      if (document.documentElement.classList.contains('is-soft-nav')) return;
      clearTimeout(this.revertTimer);
      this.revertTimer = window.setTimeout(() => {
        this.revertTimer = 0;
        if (document.documentElement.classList.contains('is-soft-nav')) return;
        if (window.__quickPeek?.open) return;
        if (!this.activeUniverse) return;
        this.activeUniverse = null;
        if (isOceanEffectivelyStill() || isOceanPaused()) return;
        syncOceanAtmosphere({
          animate: true,
          duration: 850,
          preserveFishCount: true,
          fromPalette: window.__oceanCurrentPalette || readOceanPaletteFromCss(),
          toPalette: readOceanPaletteFromCss()
        });
      }, 300);
    };

    featuredCards.forEach((card) => {
      const universe = card.getAttribute('data-project-id');
      if (!universe) return;
      card.addEventListener(
        'pointerenter',
        (e) => {
          if (e.pointerType === 'touch') return;
          preview(universe, card);
        },
        { signal }
      );
      card.addEventListener(
        'pointerleave',
        (e) => {
          if (e.pointerType === 'touch') return;
          scheduleRevert();
        },
        { signal }
      );
      card.addEventListener('focusin', () => preview(universe, card), { signal });
      card.addEventListener(
        'focusout',
        (e) => {
          if (e.relatedTarget && card.contains(e.relatedTarget)) return;
          scheduleRevert();
        },
        { signal }
      );
    });

    signal.addEventListener('abort', () => {
      clearTimeout(this.revertTimer);
      this.revertTimer = 0;
      this.activeUniverse = null;
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
    window.__oceanEngine = new OceanEngine(canvas, undefined, {
      fishCount
    });
    syncOceanAtmosphere();
    const powerOn = systemReducedMotion() || readOceanPowerPref();
    applyOceanPowerSave(powerOn);
  }
}

class CommandPaletteTrigger {
  constructor(signal) {
    this.mount();
    const ui = uiStrings().commandPalette;
    const isApple = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || navigator.userAgent || '');
    const shortcut = isApple ? '⌘K' : 'Ctrl+K';

    const btn = document.querySelector('[data-cmd-trigger]');
    if (btn) {
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

    const panelBtn = document.querySelector('[data-cmd-panel-trigger]');
    if (panelBtn) {
      panelBtn.textContent = `${ui.triggerLabel || ui.dialogLabel} (${shortcut})`;
      panelBtn.addEventListener(
        'click',
        () => {
          const panel = document.querySelector('[data-nav-panel]');
          const toggle = document.querySelector('[data-nav-toggle]');
          if (panel) panel.classList.remove('is-open');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('nav-open');
          if (window.__commandPalette) {
            window.__commandPalette.show();
          }
        },
        { signal }
      );
    }
  }

  mount() {
    const content = document.querySelector('.header__content');
    if (content && !content.querySelector('[data-cmd-trigger]')) {
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

    const panel = document.querySelector('[data-nav-panel]');
    if (panel && !panel.querySelector('[data-cmd-panel-trigger]')) {
      const pbtn = document.createElement('button');
      pbtn.type = 'button';
      pbtn.className = 'header__panel-cmd';
      pbtn.setAttribute('data-cmd-panel-trigger', '');
      const langList = panel.querySelector('.header__lang');
      if (langList) panel.insertBefore(pbtn, langList);
      else panel.appendChild(pbtn);
    }
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

class ScrollReveal {
  constructor(signal) {
    this.observer = null;
    this.timers = new Set();
    const selectors = [
      '.section__head',
      '.project-card',
      '.about-col',
      '.about-timeline__item',
      '.skills-group',
      '.project-block',
      '.contact-panel',
      '.contact-aside'
    ];
    const nodes = Array.from(document.querySelectorAll(selectors.join(', ')));
    if (!nodes.length) return;

    nodes.forEach((el) => el.classList.add('scroll-reveal'));

    if (systemReducedMotion() || typeof IntersectionObserver !== 'function') {
      nodes.forEach((el) => el.classList.add('is-in', 'is-revealed'));
      return;
    }

    const revealNow = (el, delayMs = 0) => {
      if (delayMs > 0) {
        el.style.setProperty('--reveal-delay', `${delayMs}ms`);
      } else {
        el.style.removeProperty('--reveal-delay');
      }
      el.classList.add('is-in');
      const timer = window.setTimeout(() => {
        this.timers.delete(timer);
        el.classList.add('is-revealed');
        el.style.removeProperty('--reveal-delay');
      }, delayMs + 1040);
      this.timers.add(timer);
    };

    const compact = window.matchMedia('(max-width: 40em)').matches;
    const stepMs = compact ? 85 : 115;
    const maxSteps = compact ? 4 : 6;

    this.observer = new IntersectionObserver(
      (entries) => {
        const incoming = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const rowDiff =
              Math.round(a.boundingClientRect.top / 32) -
              Math.round(b.boundingClientRect.top / 32);
            if (rowDiff !== 0) return rowDiff;
            return a.boundingClientRect.left - b.boundingClientRect.left;
          });

        incoming.forEach((entry, idx) => {
          const el = entry.target;
          const delay = Math.min(idx, maxSteps) * stepMs;
          revealNow(el, delay);
          this.observer?.unobserve(el);
        });
      },
      { threshold: 0.01, rootMargin: '0px 0px -10% 0px' }
    );

    nodes.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom <= 0) {
        el.classList.add('is-in', 'is-revealed');
        return;
      }
      this.observer.observe(el);
    });

    signal.addEventListener('abort', () => {
      if (this.observer) this.observer.disconnect();
      this.observer = null;
      this.timers.forEach((t) => clearTimeout(t));
      this.timers.clear();
    });
  }
}

class OceanPauseHotkey {
  constructor(signal) {
    document.addEventListener(
      'keydown',
      (e) => {
        if (e.code !== 'Space' && e.key !== ' ') return;
        if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) return;
        const t = e.target;
        if (
          t instanceof HTMLElement &&
          (t.closest('input, textarea, select, [contenteditable="true"]') ||
            t.isContentEditable)
        ) {
          return;
        }
        if (document.body.classList.contains('cmd-palette-open')) return;
        if (document.body.classList.contains('spotlight-open')) return;
        if (document.body.classList.contains('quick-peek-open')) return;
        e.preventDefault();
        toggleOceanPause();
      },
      { signal }
    );
  }
}

function scoreFuzzyMatch(text, query) {
  if (!query) return { match: true, score: 0, indices: [] };
  const hay = text.toLowerCase();
  const q = query.toLowerCase();
  const subIdx = hay.indexOf(q);
  if (subIdx >= 0) {
    const indices = [];
    for (let i = 0; i < q.length; i += 1) indices.push(subIdx + i);
    return { match: true, score: 100 - subIdx * 0.5, indices };
  }
  let qi = 0;
  let score = 0;
  let lastIdx = -2;
  const indices = [];
  for (let i = 0; i < hay.length && qi < q.length; i += 1) {
    if (hay[i] === q[qi]) {
      indices.push(i);
      score += i === lastIdx + 1 ? 6 : 2;
      if (i === 0 || /[\s·\-_/]/.test(hay[i - 1])) score += 4;
      lastIdx = i;
      qi += 1;
    }
  }
  if (qi < q.length) return { match: false, score: -1, indices: [] };
  return { match: true, score, indices };
}

function buildHighlightedLabel(label, indices) {
  const frag = document.createDocumentFragment();
  if (!indices || !indices.length) {
    frag.appendChild(document.createTextNode(label));
    return frag;
  }
  const set = new Set(indices);
  let buf = '';
  let inMark = false;
  const flush = () => {
    if (!buf) return;
    if (inMark) {
      const m = document.createElement('mark');
      m.textContent = buf;
      frag.appendChild(m);
    } else {
      frag.appendChild(document.createTextNode(buf));
    }
    buf = '';
  };
  for (let i = 0; i < label.length; i += 1) {
    const hit = set.has(i);
    if (hit !== inMark) {
      flush();
      inMark = hit;
    }
    buf += label[i];
  }
  flush();
  return frag;
}

class CommandPalette {
  constructor() {
    if (window.__commandPalette) return window.__commandPalette;
    this.open = false;
    this.activeIndex = 0;
    this.items = [];
    this.filtered = [];
    this.lastFocus = null;
    this.previewedUniverse = null;
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

    this.foot = document.createElement('div');
    this.foot.className = 'cmd-palette__foot';

    this.panel.append(this.input, this.list, this.empty, this.foot);
    this.root.append(this.backdrop, this.panel);
    document.body.appendChild(this.root);

    this.backdrop.addEventListener('click', () => this.close());
    this.input.addEventListener('input', () => {
      this.activeIndex = 0;
      this.renderList();
    });
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
    const filterUi = uiStrings().projectFilterUi || {};
    const locale = currentLocale();
    const homeBase = locale === 'fr' ? '/fr/' : '/en/';
    const items = [];

    items.push(
      { group: ui.sections, label: ui.home, href: homeBase, keywords: 'home accueil', meta: 'Section' },
      { group: ui.sections, label: ui.projectsSection, href: `${homeBase}#projects`, keywords: 'projects projets', meta: 'Section' },
      { group: ui.sections, label: ui.about, href: `${homeBase}#about`, keywords: 'about propos', meta: 'Section' },
      { group: ui.sections, label: ui.contact, href: `${homeBase}#contact`, keywords: 'contact', meta: 'Section' }
    );

    const catalog = window.__projectsCatalog;
    if (catalog?.projects?.length) {
      const projects = catalog.projects.slice().sort((a, b) => {
        const fa = !!a.featured;
        const fb = !!b.featured;
        if (fa !== fb) return fa ? -1 : 1;
        if (fa && fb) {
          const foa = typeof a.featuredOrder === 'number' ? a.featuredOrder : 0;
          const fob = typeof b.featuredOrder === 'number' ? b.featuredOrder : 0;
          if (foa !== fob) return foa - fob;
        }
        const oa = typeof a.order === 'number' ? a.order : 0;
        const ob = typeof b.order === 'number' ? b.order : 0;
        return oa - ob;
      });
      const techCounts = new Map();
      projects.forEach((proj) => {
        const title = (proj.titles && proj.titles[locale]) || proj.id;
        const rawHref = proj.githubOnly
          ? proj.githubUrl
          : proj.detailPaths && proj.detailPaths[locale];
        if (!title || !rawHref) return;
        const external = !!proj.githubOnly;
        if (external && !isSafeHttpsHref(rawHref, { hosts: ['github.com'] })) return;
        if (!external && !isSafeSameOriginHref(rawHref)) return;
        const techKeywords = (proj.technologies || []).join(' ');
        items.push({
          group: ui.projects,
          label: title,
          href: rawHref,
          external,
          universe: proj.githubOnly ? null : proj.id,
          meta: proj.githubOnly ? ui.githubMeta || 'GitHub ↗' : proj.featured ? ui.featuredMeta || 'Featured' : '→',
          keywords: `${title} ${proj.id} ${techKeywords}`
        });
        const seen = new Set();
        (proj.technologies || []).forEach((tech) => {
          const key = normalizeFilterKey(tech);
          if (!key || seen.has(key)) return;
          seen.add(key);
          const entry = techCounts.get(key) || { label: tech, count: 0 };
          entry.count += 1;
          techCounts.set(key, entry);
        });
      });

      Array.from(techCounts.entries())
        .sort((a, b) => b[1].count - a[1].count || a[1].label.localeCompare(b[1].label))
        .forEach(([key, info]) => {
          const countLabel = typeof filterUi.resultsCount === 'function' ? filterUi.resultsCount(info.count) : `${info.count}`;
          items.push({
            group: ui.technologies || 'Technologies',
            label: `${ui.filterByPrefix || 'Filter ·'} ${info.label}`,
            action: 'filter-tech',
            techKey: key,
            techLabel: info.label,
            meta: countLabel,
            keywords: `${info.label} ${key} filter filtre tech stack`
          });
        });
    } else {
      const cards = Array.from(document.querySelectorAll('.project-card'));
      cards.forEach((card) => {
        const title = card.querySelector('.project-title')?.textContent?.trim();
        const link = card.querySelector('.project-link');
        if (!title || !link) return;
        items.push({
          group: ui.projects,
          label: title,
          href: link.getAttribute('href'),
          external: link.target === '_blank',
          universe: link.target === '_blank' ? null : card.getAttribute('data-project-id'),
          meta: link.target === '_blank' ? ui.githubMeta || 'GitHub ↗' : '→',
          keywords: title
        });
      });
    }

    items.push({
      group: ui.actions,
      label: ui.copyEmail || 'Copy email',
      action: 'copy-email',
      meta: CONTACT_EMAIL,
      keywords: 'email mail contact copy copier gmail'
    });

    const otherLang = locale === 'fr' ? 'en' : 'fr';
    const langLink = document.querySelector(`[data-set-lang="${otherLang}"]`);
    items.push({
      group: ui.actions,
      label: otherLang === 'fr' ? ui.langFr : ui.langEn,
      href: langLink ? langLink.getAttribute('href') : otherLang === 'fr' ? '/fr/' : '/en/',
      meta: otherLang.toUpperCase(),
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
      meta: 'PDF',
      keywords: 'cv resume pdf'
    });

    const powerOn = systemReducedMotion() || readOceanPowerPref();
    items.push({
      group: ui.actions,
      label: powerOn ? ui.oceanOff : ui.oceanOn,
      action: 'ocean-toggle',
      meta: 'Ocean',
      keywords: 'ocean océan battery performance power',
      disabled: systemReducedMotion()
    });

    const paused = isOceanPaused();
    items.push({
      group: ui.actions,
      label: paused ? ui.oceanResume : ui.oceanPause,
      action: 'ocean-pause',
      meta: 'Space',
      keywords: 'pause ocean océan space espace lecture',
      disabled: isOceanEffectivelyStill()
    });

    return items;
  }

  previewOceanForActive() {
    if (document.body.dataset.universe || !window.__oceanEngine) return;
    if (isOceanEffectivelyStill() || isOceanPaused()) return;
    const active = this.filtered[this.activeIndex];
    const nextUniverse = active?.item?.universe || null;
    if (nextUniverse === this.previewedUniverse) return;
    this.previewedUniverse = nextUniverse;
    syncOceanAtmosphere({
      animate: true,
      preserveFishCount: true,
      fromPalette: window.__oceanCurrentPalette || readOceanPaletteFromCss(),
      toPalette: nextUniverse ? readOceanPaletteForUniverse(nextUniverse) : readOceanPaletteFromCss()
    });
  }

  revertOceanPreview() {
    if (!this.previewedUniverse) return;
    this.previewedUniverse = null;
    if (document.body.dataset.universe || !window.__oceanEngine) return;
    if (isOceanEffectivelyStill() || isOceanPaused()) return;
    syncOceanAtmosphere({
      animate: true,
      preserveFishCount: true,
      fromPalette: window.__oceanCurrentPalette || readOceanPaletteFromCss(),
      toPalette: readOceanPaletteFromCss()
    });
  }

  show() {
    const ui = this.ui();
    if (window.__quickPeek?.open) window.__quickPeek.close(true);
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
    this.foot.textContent = ui.footNav || '';
    this.input.value = '';
    this.activeIndex = 0;
    this.lastFocus = document.activeElement;
    this.open = true;
    this.root.hidden = false;
    document.body.classList.add('cmd-palette-open');
    this.renderList();
    requestAnimationFrame(() => this.input.focus());
  }

  close(skipRevert = false) {
    if (!this.open) return;
    this.open = false;
    this.root.hidden = true;
    document.body.classList.remove('cmd-palette-open');
    if (!skipRevert) this.revertOceanPreview();
    else this.previewedUniverse = null;
    if (this.lastFocus && typeof this.lastFocus.focus === 'function') {
      this.lastFocus.focus();
    }
    this.lastFocus = null;
  }

  renderList() {
    const q = this.input.value.trim();
    const ui = this.ui();
    const scored = [];
    this.items.forEach((item, idx) => {
      if (!q) {
        // Keep the initial list focused: show top 6 techs only when typing
        if (item.group === (ui.technologies || 'Technologies')) return;
        scored.push({ item, score: 0, indices: [], idx });
        return;
      }
      const labelHit = scoreFuzzyMatch(item.label, q);
      if (labelHit.match) {
        scored.push({ item, score: labelHit.score + 20, indices: labelHit.indices, idx });
        return;
      }
      const kwHit = scoreFuzzyMatch(`${item.keywords || ''} ${item.group}`, q);
      if (kwHit.match) {
        scored.push({ item, score: kwHit.score, indices: [], idx });
      }
    });
    if (q) {
      scored.sort((a, b) => b.score - a.score || a.idx - b.idx);
    }
    this.filtered = scored;
    this.list.innerHTML = '';
    this.empty.hidden = this.filtered.length > 0;
    if (this.activeIndex >= this.filtered.length) this.activeIndex = Math.max(0, this.filtered.length - 1);

    let lastGroup = '';
    this.filtered.forEach((entry, index) => {
      const { item, indices } = entry;
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

      const labelSpan = document.createElement('span');
      labelSpan.className = 'cmd-palette__item-label';
      labelSpan.appendChild(buildHighlightedLabel(item.label, indices));
      li.appendChild(labelSpan);

      if (item.meta) {
        const metaSpan = document.createElement('span');
        metaSpan.className = 'cmd-palette__item-meta';
        metaSpan.textContent = item.meta;
        li.appendChild(metaSpan);
      }

      li.addEventListener('pointerenter', () => {
        if (this.activeIndex === index) return;
        this.activeIndex = index;
        this.syncActiveClasses();
        this.previewOceanForActive();
      });
      li.addEventListener('click', () => this.run(item));
      this.list.appendChild(li);
    });
    this.input.setAttribute('aria-activedescendant', this.filtered.length ? `cmd-opt-${this.activeIndex}` : '');
    this.scrollActiveIntoView();
    this.previewOceanForActive();
  }

  syncActiveClasses() {
    const items = this.list.querySelectorAll('.cmd-palette__item');
    items.forEach((el, idx) => {
      const active = idx === this.activeIndex;
      el.classList.toggle('is-active', active);
      el.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    this.input.setAttribute('aria-activedescendant', this.filtered.length ? `cmd-opt-${this.activeIndex}` : '');
  }

  scrollActiveIntoView() {
    const active = this.list.querySelector('.cmd-palette__item.is-active');
    if (!active) return;
    const listRect = this.list.getBoundingClientRect();
    const itemRect = active.getBoundingClientRect();
    if (itemRect.top < listRect.top) {
      this.list.scrollTop -= listRect.top - itemRect.top;
    } else if (itemRect.bottom > listRect.bottom) {
      this.list.scrollTop += itemRect.bottom - listRect.bottom;
    }
  }

  onInputKey(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!this.filtered.length) return;
      this.activeIndex = (this.activeIndex + 1) % this.filtered.length;
      this.syncActiveClasses();
      this.scrollActiveIntoView();
      this.previewOceanForActive();
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!this.filtered.length) return;
      this.activeIndex = (this.activeIndex - 1 + this.filtered.length) % this.filtered.length;
      this.syncActiveClasses();
      this.scrollActiveIntoView();
      this.previewOceanForActive();
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const entry = this.filtered[this.activeIndex];
      if (entry) this.run(entry.item);
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
    if (item.action === 'ocean-pause') {
      toggleOceanPause();
      this.close();
      return;
    }
    if (item.action === 'copy-email') {
      this.close();
      copyToClipboard(CONTACT_EMAIL).then((ok) => {
        if (ok) showToast((uiStrings().toast || {}).emailCopied || CONTACT_EMAIL);
      });
      return;
    }
    if (item.action === 'filter-tech' && item.techKey) {
      this.close();
      const toastUi = uiStrings().toast || {};
      if (window.__projectFilters) {
        window.__projectFilters.applyTechFromSearch(item.techKey, item.techLabel);
        const target = document.getElementById('projects');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
        if (typeof toastUi.filterApplied === 'function') showToast(toastUi.filterApplied(item.techLabel));
      } else {
        const locale = currentLocale();
        softNavigateTo(`/${locale}/?tech=${encodeURIComponent(item.techKey)}#projects`);
      }
      return;
    }
    if (!item.href) return;
    const keepPreview = !item.external && !!item.universe;
    this.close(keepPreview);
    if (item.external) {
      if (!isSafeHttpsHref(item.href, { hosts: ['github.com'] })) return;
      window.open(item.href, '_blank', 'noopener,noreferrer');
      return;
    }
    softNavigateTo(item.href);
  }
}

class QuickPeek {
  constructor() {
    if (window.__quickPeek) return window.__quickPeek;
    this.open = false;
    this.entries = [];
    this.index = 0;
    this.cache = new Map();
    this.lastFocus = null;
    this.loadToken = 0;
    this.onKeyDown = this.onKeyDown.bind(this);
    this.build();
    window.__quickPeek = this;
  }

  build() {
    this.root = document.createElement('div');
    this.root.className = 'quick-peek';
    this.root.hidden = true;
    this.root.setAttribute('role', 'dialog');
    this.root.setAttribute('aria-modal', 'true');

    this.backdrop = document.createElement('button');
    this.backdrop.type = 'button';
    this.backdrop.className = 'quick-peek__backdrop';

    this.panel = document.createElement('div');
    this.panel.className = 'quick-peek__panel';

    this.bar = document.createElement('div');
    this.bar.className = 'quick-peek__bar';

    this.metaEl = document.createElement('span');
    this.metaEl.className = 'quick-peek__meta';

    const controls = document.createElement('div');
    controls.className = 'quick-peek__controls';

    this.prevBtn = document.createElement('button');
    this.prevBtn.type = 'button';
    this.prevBtn.className = 'quick-peek__icon-btn';
    this.prevBtn.textContent = '←';

    this.nextBtn = document.createElement('button');
    this.nextBtn.type = 'button';
    this.nextBtn.className = 'quick-peek__icon-btn';
    this.nextBtn.textContent = '→';

    this.closeBtn = document.createElement('button');
    this.closeBtn.type = 'button';
    this.closeBtn.className = 'quick-peek__icon-btn';
    this.closeBtn.textContent = '✕';

    controls.append(this.prevBtn, this.nextBtn, this.closeBtn);
    this.bar.append(this.metaEl, controls);

    this.body = document.createElement('div');
    this.body.className = 'quick-peek__body';

    this.foot = document.createElement('div');
    this.foot.className = 'quick-peek__foot';

    this.panel.append(this.bar, this.body, this.foot);
    this.root.append(this.backdrop, this.panel);
    document.body.appendChild(this.root);

    this.backdrop.addEventListener('click', () => this.close());
    this.closeBtn.addEventListener('click', () => this.close());
    this.prevBtn.addEventListener('click', () => this.showAt(this.index - 1));
    this.nextBtn.addEventListener('click', () => this.showAt(this.index + 1));
  }

  collectEntries() {
    return Array.from(document.querySelectorAll('.project-card'))
      .filter((card) => {
        if (card.classList.contains('filtered-out')) return false;
        const link = card.querySelector('.project-link');
        return link && link.target !== '_blank' && link.getAttribute('href');
      })
      .map((card) => ({
        id: card.getAttribute('data-project-id') || '',
        title: card.querySelector('.project-title')?.textContent?.trim() || '',
        href: card.querySelector('.project-link').getAttribute('href')
      }));
  }

  openProject(projectId) {
    this.entries = this.collectEntries();
    if (!this.entries.length) return;
    const idx = Math.max(0, this.entries.findIndex((e) => e.id === projectId));
    const ui = uiStrings().quickPeek || {};
    this.root.setAttribute('aria-label', ui.dialogLabel || 'Project quick preview');
    this.backdrop.setAttribute('aria-label', ui.close || 'Close');
    this.closeBtn.setAttribute('aria-label', ui.close || 'Close');
    this.prevBtn.setAttribute('aria-label', ui.prev || 'Previous project');
    this.nextBtn.setAttribute('aria-label', ui.next || 'Next project');

    if (!this.open) {
      this.lastFocus = document.activeElement;
      this.open = true;
      this.root.hidden = false;
      document.body.classList.add('quick-peek-open');
      document.addEventListener('keydown', this.onKeyDown);
      requestAnimationFrame(() => {
        this.root.classList.add('is-open');
        this.closeBtn.focus();
      });
    }
    this.showAt(idx);
  }

  async fetchProjectSummary(href) {
    if (!isSafeSameOriginHref(href)) throw new Error('unsafe href');
    if (this.cache.has(href)) return this.cache.get(href);
    const res = await fetch(href, { headers: { Accept: 'text/html' }, credentials: 'same-origin' });
    if (!res.ok) throw new Error('fetch failed');
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const title = doc.querySelector('.project-hero__title')?.textContent?.trim() || '';
    const lead = doc.querySelector('.project-hero__lead')?.textContent?.trim() || '';
    const overviewP = doc.querySelector('.project-body .project-block p')?.textContent?.trim() || '';
    const firstFig = doc.querySelector('.project-gallery figure');
    const firstImg = firstFig?.querySelector('img');
    const mediaSrc = resolveSafeSameOriginSrc(firstImg?.getAttribute('src') || '');
    const media = firstImg && mediaSrc
      ? {
          src: mediaSrc,
          alt: firstImg.getAttribute('alt') || title,
          caption: firstFig.querySelector('figcaption')?.textContent?.trim() || ''
        }
      : null;
    const flows = [];
    const archSvg = doc.querySelector('.arch-svg');
    if (archSvg) {
      archSvg.querySelectorAll('g').forEach((g) => {
        if (g.hasAttribute('data-arch-node')) return;
        const line = g.querySelector('line');
        const txt = g.querySelector('text')?.textContent?.trim();
        if (line && txt) flows.push(txt);
      });
    }
    const techs = Array.from(doc.querySelectorAll('.project-tech__item'))
      .map((a) => a.textContent.trim())
      .filter(Boolean);
    const ghLink = doc.querySelector('.project-hero a[href*="github.com"], .project-actions a[href*="github.com"]');
    const rawGh = ghLink ? ghLink.getAttribute('href') : null;
    const data = {
      title,
      lead,
      overview: overviewP,
      media,
      flows,
      techs,
      githubUrl: rawGh && isSafeHttpsHref(rawGh, { hosts: ['github.com'] }) ? rawGh : null
    };
    this.cache.set(href, data);
    return data;
  }

  async showAt(index) {
    if (!this.entries.length) return;
    const nextIndex = (index + this.entries.length) % this.entries.length;
    this.index = nextIndex;
    const entry = this.entries[nextIndex];
    const ui = uiStrings().quickPeek || {};
    const num = String(nextIndex + 1).padStart(2, '0');
    const tot = String(this.entries.length).padStart(2, '0');
    this.metaEl.textContent = `${num} / ${tot}`;

    const multi = this.entries.length > 1;
    this.prevBtn.hidden = !multi;
    this.nextBtn.hidden = !multi;

    if (entry.id && !document.body.dataset.universe && window.__oceanEngine && !isOceanEffectivelyStill() && !isOceanPaused()) {
      syncOceanAtmosphere({
        animate: true,
        duration: 750,
        preserveFishCount: true,
        fromPalette: window.__oceanCurrentPalette || readOceanPaletteFromCss(),
        toPalette: readOceanPaletteForUniverse(entry.id)
      });
    }

    this.body.innerHTML = '';
    const titleEl = document.createElement('h2');
    titleEl.className = 'quick-peek__title';
    titleEl.textContent = entry.title;
    const loading = document.createElement('p');
    loading.className = 'quick-peek__lead';
    loading.textContent = ui.loading || 'Loading…';
    this.body.append(titleEl, loading);

    this.foot.innerHTML = '';
    const openBtn = document.createElement('a');
    openBtn.className = 'btn btn--solid';
    openBtn.href = entry.href;
    openBtn.textContent = ui.openFull || 'Open case study →';
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.close(true);
      softNavigateTo(entry.href);
    });
    this.foot.appendChild(openBtn);

    const token = ++this.loadToken;
    try {
      const data = await this.fetchProjectSummary(entry.href);
      if (!this.open || token !== this.loadToken) return;
      this.renderContent(entry, data);
    } catch {
      if (!this.open || token !== this.loadToken) return;
      loading.textContent = '';
    }
  }

  renderContent(entry, data) {
    const ui = uiStrings().quickPeek || {};
    this.body.innerHTML = '';

    const head = document.createElement('div');
    const titleEl = document.createElement('h2');
    titleEl.className = 'quick-peek__title';
    titleEl.textContent = data.title || entry.title;
    head.appendChild(titleEl);
    if (data.lead) {
      const leadEl = document.createElement('p');
      leadEl.className = 'quick-peek__lead';
      leadEl.style.marginTop = '0.5rem';
      leadEl.textContent = data.lead;
      head.appendChild(leadEl);
    }
    this.body.appendChild(head);

    if (data.media?.src) {
      const fig = document.createElement('figure');
      fig.className = 'quick-peek__media';
      const img = document.createElement('img');
      img.src = data.media.src;
      img.alt = data.media.alt || '';
      img.loading = 'lazy';
      fig.appendChild(img);
      if (data.media.caption) {
        const cap = document.createElement('figcaption');
        cap.textContent = data.media.caption;
        fig.appendChild(cap);
      }
      this.body.appendChild(fig);
    }

    if (data.flows?.length) {
      const wrap = document.createElement('div');
      const lbl = document.createElement('span');
      lbl.className = 'quick-peek__section-label';
      lbl.textContent = ui.architecture || 'Architecture';
      const list = document.createElement('div');
      list.className = 'quick-peek__flows';
      data.flows.forEach((flow) => {
        const chip = document.createElement('span');
        chip.className = 'quick-peek__flow-chip';
        chip.textContent = `⇄ ${flow}`;
        list.appendChild(chip);
      });
      wrap.append(lbl, list);
      this.body.appendChild(wrap);
    }

    if (data.overview) {
      const wrap = document.createElement('div');
      const lbl = document.createElement('span');
      lbl.className = 'quick-peek__section-label';
      lbl.textContent = ui.overview || 'Overview';
      const p = document.createElement('p');
      p.className = 'quick-peek__overview';
      p.textContent = data.overview;
      wrap.append(lbl, p);
      this.body.appendChild(wrap);
    }

    if (data.techs?.length) {
      const wrap = document.createElement('div');
      const lbl = document.createElement('span');
      lbl.className = 'quick-peek__section-label';
      lbl.textContent = ui.stack || 'Technologies';
      const tags = document.createElement('div');
      tags.className = 'quick-peek__tags';
      data.techs.slice(0, 12).forEach((tech) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'tech-tag';
        btn.textContent = tech;
        btn.addEventListener('click', () => {
          this.close();
          if (window.__projectFilters) {
            window.__projectFilters.applyTechFromSearch(normalizeFilterKey(tech), tech);
            const toastUi = uiStrings().toast || {};
            if (typeof toastUi.filterApplied === 'function') showToast(toastUi.filterApplied(tech));
          }
        });
        tags.appendChild(btn);
      });
      wrap.append(lbl, tags);
      this.body.appendChild(wrap);
    }

    this.foot.innerHTML = '';
    const openBtn = document.createElement('a');
    openBtn.className = 'btn btn--solid';
    openBtn.href = entry.href;
    openBtn.textContent = ui.openFull || 'Open case study →';
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.close(true);
      softNavigateTo(entry.href);
    });
    this.foot.appendChild(openBtn);

    if (data.githubUrl && isSafeHttpsHref(data.githubUrl, { hosts: ['github.com'] })) {
      const gh = document.createElement('a');
      gh.className = 'btn';
      gh.href = data.githubUrl;
      gh.target = '_blank';
      gh.rel = 'noopener noreferrer';
      gh.textContent = ui.github || 'GitHub ↗';
      this.foot.appendChild(gh);
    }
  }

  close(keepOcean = false) {
    if (!this.open) return;
    this.open = false;
    this.root.classList.remove('is-open');
    document.body.classList.remove('quick-peek-open');
    document.removeEventListener('keydown', this.onKeyDown);

    if (!keepOcean && !document.body.dataset.universe && window.__oceanEngine && !isOceanEffectivelyStill() && !isOceanPaused()) {
      syncOceanAtmosphere({
        animate: true,
        duration: 850,
        preserveFishCount: true,
        fromPalette: window.__oceanCurrentPalette || readOceanPaletteFromCss(),
        toPalette: readOceanPaletteFromCss()
      });
    }

    const finish = () => {
      if (this.open) return;
      this.root.hidden = true;
      if (this.lastFocus && typeof this.lastFocus.focus === 'function') {
        this.lastFocus.focus();
      }
      this.lastFocus = null;
    };
    if (systemReducedMotion()) finish();
    else window.setTimeout(finish, 210);
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
      this.showAt(this.index - 1);
      return;
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.showAt(this.index + 1);
      return;
    }
    if (e.key === 'Tab') {
      const focusable = Array.from(
        this.panel.querySelectorAll('button:not([hidden]):not([disabled]), a[href]')
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && (document.activeElement === first || !this.panel.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (document.activeElement === last || !this.panel.contains(document.activeElement))) {
        e.preventDefault();
        first.focus();
      }
    }
  }
}

class QuickPeekTriggers {
  constructor(signal) {
    const cards = Array.from(document.querySelectorAll('.project-card[data-project-id]'));
    if (!cards.length) return;
    const ui = uiStrings().quickPeek || {};
    let hoveredId = null;

    cards.forEach((card) => {
      const link = card.querySelector('.project-link');
      const linksWrap = card.querySelector('.project-links');
      const id = card.getAttribute('data-project-id');
      if (!link || !linksWrap || !id || link.target === '_blank') return;

      if (!linksWrap.querySelector('.project-peek-btn')) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'project-peek-btn';
        const label = ui.trigger || 'Peek';
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 14 14');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '1.25');
        svg.setAttribute('aria-hidden', 'true');
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', '1.25');
        rect.setAttribute('y', '1.75');
        rect.setAttribute('width', '11.5');
        rect.setAttribute('height', '10.5');
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', '8.25');
        line.setAttribute('y1', '1.75');
        line.setAttribute('x2', '8.25');
        line.setAttribute('y2', '12.25');
        svg.append(rect, line);
        const labelEl = document.createElement('span');
        labelEl.textContent = label;
        btn.append(svg, labelEl);
        btn.title = `${label} (P)`;
        btn.setAttribute(
          'aria-label',
          `${label} · ${card.querySelector('.project-title')?.textContent?.trim() || id}`
        );
        btn.addEventListener(
          'click',
          (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (window.__quickPeek) window.__quickPeek.openProject(id);
          },
          { signal }
        );
        linksWrap.insertBefore(btn, linksWrap.firstChild);
      }

      card.addEventListener('pointerenter', () => { hoveredId = id; }, { signal });
      card.addEventListener('pointerleave', () => { if (hoveredId === id) hoveredId = null; }, { signal });
      card.addEventListener('focusin', () => { hoveredId = id; }, { signal });
    });

    document.addEventListener(
      'keydown',
      (e) => {
        if (e.key.toLowerCase() !== 'p' || e.ctrlKey || e.metaKey || e.altKey) return;
        const t = e.target;
        if (t instanceof HTMLElement && (t.closest('input, textarea, select, [contenteditable="true"]') || t.isContentEditable)) return;
        if (document.body.classList.contains('cmd-palette-open') || document.body.classList.contains('quick-peek-open')) return;
        if (!hoveredId) return;
        e.preventDefault();
        if (window.__quickPeek) window.__quickPeek.openProject(hoveredId);
      },
      { signal }
    );
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

    this.counter = document.createElement('span');
    this.counter.className = 'spotlight__counter';
    this.counter.setAttribute('aria-live', 'polite');

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
    this.root.append(this.backdrop, this.counter, this.prevBtn, this.panel, this.nextBtn, this.closeBtn);
    document.body.appendChild(this.root);

    this.backdrop.addEventListener('click', () => this.close());
    this.closeBtn.addEventListener('click', () => this.close());
    this.prevBtn.addEventListener('click', () => this.show(this.index - 1, -1));
    this.nextBtn.addEventListener('click', () => this.show(this.index + 1, 1));

    // Click image to toggle 1:1 native zoom
    this.img.addEventListener('click', () => {
      const zoomed = this.img.classList.toggle('is-zoomed');
      this.panel.classList.toggle('is-zoomed', zoomed);
    });

    // Touch swipe left/right on mobile
    let touchStartX = 0;
    let touchStartY = 0;
    this.panel.addEventListener(
      'touchstart',
      (e) => {
        if (e.touches.length !== 1) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      },
      { passive: true }
    );
    this.panel.addEventListener(
      'touchend',
      (e) => {
        if (this.img.classList.contains('is-zoomed') || e.changedTouches.length !== 1) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4 && this.items.length > 1) {
          this.show(dx < 0 ? this.index + 1 : this.index - 1, dx < 0 ? 1 : -1);
        }
      },
      { passive: true }
    );
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

  show(index, dir = 0) {
    if (!this.root || this.items.length === 0) return;

    const wasOpen = this.open;
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
    this.img.classList.remove('is-zoomed');
    this.panel.classList.remove('is-zoomed');
    this.img.src = source.currentSrc || source.src;
    this.img.alt = source.alt || '';
    this.caption.textContent = caption ? caption.textContent.trim() : '';
    this.caption.hidden = !this.caption.textContent;

    if (wasOpen && dir !== 0 && !systemReducedMotion() && typeof this.img.animate === 'function') {
      this.img.animate(
        [
          { opacity: 0, transform: `translateX(${dir * 28}px)` },
          { opacity: 1, transform: 'translateX(0)' }
        ],
        { duration: 480, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
      );
    }

    const multi = this.items.length > 1;
    this.prevBtn.hidden = !multi;
    this.nextBtn.hidden = !multi;
    if (this.counter) {
      this.counter.hidden = !multi;
      const num = String(nextIndex + 1).padStart(2, '0');
      const tot = String(this.items.length).padStart(2, '0');
      this.counter.textContent = `${num} / ${tot}`;
    }
  }

  close() {
    if (!this.open || !this.root) return;
    this.open = false;
    this.img.classList.remove('is-zoomed');
    this.panel.classList.remove('is-zoomed');
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

    window.setTimeout(finish, 420);
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
      this.show(this.index - 1, -1);
      return;
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.show(this.index + 1, 1);
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

class ProjectToc {
  constructor(signal) {
    this.root = null;
    this.observer = null;
    const body = document.querySelector('.project-body');
    if (!body) return;
    const headings = Array.from(
      body.querySelectorAll('.project-block > .wrap > h2, .project-block > .wrap--wide > h2')
    );
    if (headings.length < 2) return;

    const existing = body.querySelector('.project-toc');
    if (existing) existing.remove();

    const ui = uiStrings().projectToc || { label: 'On this page', toggle: 'Contents' };
    const nav = document.createElement('nav');
    nav.className = 'project-toc';
    nav.setAttribute('aria-label', ui.label);

    const list = document.createElement('ul');
    list.className = 'project-toc__list';
    list.id = 'project-toc-list';

    const links = [];
    headings.forEach((h2) => {
      const text = (h2.textContent || '').trim();
      if (!text) return;
      if (/^actions$/i.test(text)) return;
      const block = h2.closest('.project-block') || h2;
      let id = block.id || h2.id;
      if (!id) {
        id = text
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
        id = id || `section-${links.length}`;
      }
      block.id = id;
      if (h2.id === id) h2.removeAttribute('id');
      const idx = links.length + 1;
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.className = 'project-toc__link';
      a.href = `#${id}`;

      const idxEl = document.createElement('span');
      idxEl.className = 'project-toc__idx';
      idxEl.setAttribute('aria-hidden', 'true');
      idxEl.textContent = String(idx).padStart(2, '0');

      const textEl = document.createElement('span');
      textEl.className = 'project-toc__text';
      textEl.textContent = text;

      a.append(idxEl, textEl);
      li.appendChild(a);
      list.appendChild(li);
      links.push({ a, id, text, el: block });
    });

    if (links.length < 2) return;

    const totalPad = String(links.length).padStart(2, '0');
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'project-toc__toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', list.id);

    const currentWrap = document.createElement('span');
    currentWrap.className = 'project-toc__current';

    const counterEl = document.createElement('span');
    counterEl.className = 'project-toc__counter';
    counterEl.textContent = `01/${totalPad}`;

    const sepEl = document.createElement('span');
    sepEl.className = 'project-toc__sep';
    sepEl.setAttribute('aria-hidden', 'true');
    sepEl.textContent = '·';

    const activeLabelEl = document.createElement('span');
    activeLabelEl.className = 'project-toc__active-label';
    activeLabelEl.textContent = links[0].text;

    currentWrap.append(counterEl, sepEl, activeLabelEl);

    const caretWrap = document.createElement('span');
    caretWrap.className = 'project-toc__caret';

    const caretText = document.createElement('span');
    caretText.textContent = ui.toggle || 'Contents';

    const chevron = document.createElement('span');
    chevron.className = 'project-toc__chevron';
    chevron.setAttribute('aria-hidden', 'true');
    chevron.textContent = '▾';

    caretWrap.append(caretText, chevron);
    toggle.append(currentWrap, caretWrap);

    nav.append(toggle, list);

    const progress = document.createElement('span');
    progress.className = 'project-toc__progress';
    progress.setAttribute('aria-hidden', 'true');
    nav.appendChild(progress);

    body.insertBefore(nav, body.firstChild);
    this.root = nav;

    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };

    toggle.addEventListener(
      'click',
      () => {
        setOpen(!nav.classList.contains('is-open'));
      },
      { signal }
    );

    document.addEventListener(
      'click',
      (e) => {
        if (nav.classList.contains('is-open') && !nav.contains(e.target)) {
          setOpen(false);
        }
      },
      { signal }
    );

    document.addEventListener(
      'keydown',
      (e) => {
        if (e.key === 'Escape' && nav.classList.contains('is-open')) {
          e.preventDefault();
          setOpen(false);
          toggle.focus();
        }
      },
      { signal }
    );

    let progressRaf = 0;
    const syncProgress = () => {
      progressRaf = 0;
      const rect = body.getBoundingClientRect();
      const total = Math.max(1, body.scrollHeight - window.innerHeight * 0.7);
      const passed = Math.max(0, -rect.top + window.innerHeight * 0.15);
      const ratio = Math.min(1, Math.max(0, passed / total));
      progress.style.transform = `scaleX(${ratio.toFixed(4)})`;
    };
    const onScroll = () => {
      if (!progressRaf) progressRaf = requestAnimationFrame(syncProgress);
    };
    syncProgress();
    window.addEventListener('scroll', onScroll, { passive: true, signal });
    window.addEventListener(
      'resize',
      () => {
        onScroll();
        if (nav.classList.contains('is-open') && window.innerWidth > 672) setOpen(false);
      },
      { passive: true, signal }
    );

    const setCurrent = (id) => {
      let activeIdx = -1;
      links.forEach((item, idx) => {
        const active = item.id === id;
        if (active) {
          item.a.setAttribute('aria-current', 'true');
          activeIdx = idx;
        } else {
          item.a.removeAttribute('aria-current');
        }
      });
      if (activeIdx >= 0) {
        counterEl.textContent = `${String(activeIdx + 1).padStart(2, '0')}/${totalPad}`;
        activeLabelEl.textContent = links[activeIdx].text;
      }
    };

    links.forEach((item) => {
      item.a.addEventListener(
        'click',
        () => {
          setCurrent(item.id);
          setOpen(false);
        },
        { signal }
      );
    });

    if (links[0]?.id) {
      setCurrent(links[0].id);
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        const id = visible[0].target.id;
        if (id) setCurrent(id);
      },
      { rootMargin: '-28% 0px -52% 0px', threshold: [0, 0.2, 0.5, 1] }
    );
    links.forEach(({ el }) => this.observer.observe(el));

    signal.addEventListener('abort', () => {
      if (progressRaf) cancelAnimationFrame(progressRaf);
      if (this.observer) this.observer.disconnect();
      this.observer = null;
      this.root?.remove();
      this.root = null;
    });
  }
}

class ArchDiagram {
  constructor(signal) {
    const sections = document.querySelectorAll('[data-arch-section]');
    sections.forEach((section) => this.bindSection(section, signal));
  }

  parseSvgNode(g) {
    const transform = g.getAttribute('transform') || '';
    const match = /translate\(\s*([-\d.]+)/.exec(transform);
    const x = match ? Number(match[1]) : 0;
    const layer = g.getAttribute('data-arch-node') || '';
    const techs = (g.getAttribute('data-arch-techs') || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const eyebrows = [];
    const titles = [];
    const items = [];
    g.querySelectorAll('text').forEach((t) => {
      const text = (t.textContent || '').trim();
      if (!text) return;
      const fill = (t.getAttribute('fill') || '').trim();
      if (fill.includes('--accent')) eyebrows.push(text);
      else if (fill.includes('--koi-shiro')) titles.push(text);
      else items.push(text);
    });

    const col = x < 260 ? 0 : x < 620 ? 1 : 2;
    return {
      col,
      layer,
      techs,
      eyebrow: eyebrows.join(' '),
      title: titles.join(' '),
      items
    };
  }

  bindSection(section, signal) {
    const diagram = section.querySelector('.arch-diagram');
    const svg = section.querySelector('.arch-svg');
    if (!diagram || !svg || !svg.querySelector('[data-arch-node]')) return;

    const existing = diagram.querySelector('.arch-ascii-box');
    if (existing) existing.remove();

    const ui = uiStrings().archBlueprint || {};
    const legendMap = new Map();
    section.querySelectorAll('[data-arch-legend]').forEach((li) => {
      const id = li.getAttribute('data-arch-legend');
      if (id) legendMap.set(id, li.textContent.trim());
    });

    const rawNodes = Array.from(svg.querySelectorAll('[data-arch-node]')).map((g) => this.parseSvgNode(g));
    const colsData = [[], [], []];
    rawNodes.forEach((n) => colsData[n.col].push(n));

    const leftNodes = colsData[0];
    const coreNode = colsData[1][0];
    const rightNodes = colsData[2];
    if (!coreNode || !leftNodes.length || !rightNodes.length) return;

    const leftFlows = [];
    const rightFlows = [];
    svg.querySelectorAll('g').forEach((g) => {
      if (g.hasAttribute('data-arch-node')) return;
      const line = g.querySelector('line');
      const label = g.querySelector('text')?.textContent?.trim();
      if (!line || !label) return;
      const x1 = Number(line.getAttribute('x1') || 0);
      if (x1 < 420) leftFlows.push(label);
      else rightFlows.push(label);
    });

    const nodeEls = [];
    const pipeEls = [];

    const makeNode = (node, padTo = 0, isCore = false) => {
      const wrap = document.createDocumentFragment();
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `arch-ascii__node${isCore ? ' arch-ascii__node--core' : ''}`;
      btn.textContent = node.title;
      wrap.appendChild(btn);
      const extra = Math.max(0, padTo - node.title.length);
      if (extra > 0) wrap.appendChild(document.createTextNode(' '.repeat(extra)));
      nodeEls.push({ btn, node });
      return wrap;
    };

    const makePipe = (text, relatedNodes) => {
      const span = document.createElement('span');
      span.className = 'arch-ascii__pipe';
      span.textContent = text;
      pipeEls.push({ el: span, nodes: relatedNodes });
      return span;
    };

    const dashR = (flow, maxLen) => {
      const label = flow || '';
      const trail = Math.max(2, maxLen - label.length + 2);
      return label ? `── ${label} ${'─'.repeat(trail)}` : '─'.repeat(maxLen + 6);
    };

    const lNodeW = Math.max(...leftNodes.map((n) => n.title.length));
    const lFlowW = leftFlows.length ? Math.max(...leftFlows.map((f) => f.length)) : 4;
    const rFlowW = rightFlows.length ? Math.max(...rightFlows.map((f) => f.length)) : 4;
    const coreW = coreNode.title.length;

    const pre = document.createElement('pre');
    pre.className = 'arch-ascii arch-ascii--horizontal';
    pre.setAttribute('aria-label', svg.getAttribute('aria-label') || 'Architecture');

    const appendLineTo = (target, ...parts) => {
      if (target.childNodes.length) target.appendChild(document.createTextNode('\n'));
      parts.forEach((p) => {
        if (typeof p === 'string') target.appendChild(document.createTextNode(p));
        else if (p) target.appendChild(p);
      });
    };
    const appendLine = (...parts) => appendLineTo(pre, ...parts);

    if (leftNodes.length === 2 && rightNodes.length === 2) {
      // Exact character-column math:
      // Left junction col X_L = lNodeW + 1 + (lFlowW + 6)
      // Right junction col X_R = X_L + 5 ('├──▶ ') + coreW + 3 (' ──') = X_L + coreW + 8
      const xL = lNodeW + 1 + lFlowW + 6;
      const gapMid = ' '.repeat(coreW + 7);
      appendLine(
        makeNode(leftNodes[0], lNodeW),
        ' ',
        makePipe(`${dashR(leftFlows[0], lFlowW)}┐`, [leftNodes[0], coreNode]),
        gapMid,
        makePipe(`┌${dashR(rightFlows[0], rFlowW)}▶`, [coreNode, rightNodes[0]]),
        ' ',
        makeNode(rightNodes[0])
      );
      appendLine(
        ' '.repeat(xL),
        makePipe('├──▶', [leftNodes[0], leftNodes[1], coreNode]),
        ' ',
        makeNode(coreNode, 0, true),
        ' ',
        makePipe('──┤', [coreNode, rightNodes[0], rightNodes[1]])
      );
      appendLine(
        makeNode(leftNodes[1], lNodeW),
        ' ',
        makePipe(`${dashR(leftFlows[1], lFlowW)}┘`, [leftNodes[1], coreNode]),
        gapMid,
        makePipe(`└${dashR(rightFlows[1], rFlowW)}▶`, [coreNode, rightNodes[1]]),
        ' ',
        makeNode(rightNodes[1])
      );
    } else if (leftNodes.length === 1 && rightNodes.length === 2) {
      // Right junction col X_R = lNodeW + 1 + (lFlowW + 6) + 1 ('▶') + 1 + coreW + 1 + 2 ('──')
      const xR = lNodeW + lFlowW + coreW + 12;
      appendLine(
        ' '.repeat(xR),
        makePipe(`┌${dashR(rightFlows[0], rFlowW)}▶`, [coreNode, rightNodes[0]]),
        ' ',
        makeNode(rightNodes[0])
      );
      appendLine(
        makeNode(leftNodes[0], lNodeW),
        ' ',
        makePipe(`${dashR(leftFlows[0], lFlowW)}▶`, [leftNodes[0], coreNode]),
        ' ',
        makeNode(coreNode, 0, true),
        ' ',
        makePipe('──┤', [coreNode, rightNodes[0], rightNodes[1]])
      );
      appendLine(
        ' '.repeat(xR),
        makePipe(`└${dashR(rightFlows[1], rFlowW)}▶`, [coreNode, rightNodes[1]]),
        ' ',
        makeNode(rightNodes[1])
      );
    } else {
      appendLine(
        makeNode(leftNodes[0]),
        ' ',
        makePipe(`${dashR(leftFlows[0], lFlowW)}▶`, [leftNodes[0], coreNode]),
        ' ',
        makeNode(coreNode, 0, true),
        ' ',
        makePipe(`${dashR(rightFlows[0], rFlowW)}▶`, [coreNode, rightNodes[0]]),
        ' ',
        makeNode(rightNodes[0])
      );
    }

    // Vertical ASCII topology for mobile / narrow viewports (zero horizontal scroll)
    const preV = document.createElement('pre');
    preV.className = 'arch-ascii arch-ascii--vertical';
    preV.setAttribute('aria-label', svg.getAttribute('aria-label') || 'Architecture');
    const appendLineV = (...parts) => appendLineTo(preV, ...parts);

    if (leftNodes.length === 2) {
      appendLineV(makePipe('┌ ', [leftNodes[0], coreNode]), makeNode(leftNodes[0]));
      appendLineV(makePipe(`│   ${leftFlows[0] || ''}`, [leftNodes[0], coreNode]));
      appendLineV(
        makePipe('├', [leftNodes[0], leftNodes[1], coreNode]),
        makePipe(' ', [leftNodes[1], coreNode]),
        makeNode(leftNodes[1])
      );
      appendLineV(
        makePipe('│', [leftNodes[0], leftNodes[1], coreNode]),
        makePipe(`   ${leftFlows[1] || ''}`, [leftNodes[1], coreNode])
      );
      appendLineV(makePipe('▼', [leftNodes[0], leftNodes[1], coreNode]));
    } else {
      appendLineV(makeNode(leftNodes[0]));
      appendLineV(makePipe(`│   ${leftFlows[0] || ''}`, [leftNodes[0], coreNode]));
      appendLineV(makePipe('▼', [leftNodes[0], coreNode]));
    }

    appendLineV(makeNode(coreNode, 0, true));

    if (rightNodes.length === 2) {
      appendLineV(
        makePipe('├', [coreNode, rightNodes[0], rightNodes[1]]),
        makePipe(`── ${rightFlows[0] || ''}`, [coreNode, rightNodes[0]])
      );
      appendLineV(
        makePipe('│', [coreNode, rightNodes[1]]),
        makePipe('   └─▶ ', [coreNode, rightNodes[0]]),
        makeNode(rightNodes[0])
      );
      appendLineV(makePipe(`└── ${rightFlows[1] || ''}`, [coreNode, rightNodes[1]]));
      appendLineV(makePipe('    └─▶ ', [coreNode, rightNodes[1]]), makeNode(rightNodes[1]));
    } else {
      appendLineV(makePipe(`│   ${rightFlows[0] || ''}`, [coreNode, rightNodes[0]]));
      appendLineV(makePipe('▼', [coreNode, rightNodes[0]]));
      appendLineV(makeNode(rightNodes[0]));
    }

    const box = document.createElement('div');
    box.className = 'arch-ascii-box';

    const wrap = document.createElement('div');
    wrap.className = 'arch-ascii__wrap';
    wrap.append(pre, preV);

    const status = document.createElement('div');
    status.className = 'arch-ascii__status';
    status.setAttribute('aria-live', 'polite');
    const statusText = document.createElement('span');
    statusText.className = 'arch-ascii__status-text';
    const statusCta = document.createElement('button');
    statusCta.type = 'button';
    statusCta.className = 'arch-ascii__status-cta';
    statusCta.hidden = true;
    status.append(statusText, statusCta);

    const isTouchEnv = () => typeof window.matchMedia === 'function' && window.matchMedia('(hover: none)').matches;
    let activeTouchNode = null;
    let currentNode = null;

    const setDefaultStatus = () => {
      currentNode = null;
      statusText.textContent = (isTouchEnv() ? ui.hintTouch : ui.hint) || 'Hover a node to inspect · click to filter projects';
      statusText.removeAttribute('title');
      statusCta.textContent = '';
      statusCta.hidden = true;
    };
    setDefaultStatus();

    box.append(wrap, status);
    diagram.insertBefore(box, diagram.firstChild);
    diagram.classList.add('is-ascii');

    const clear = () => {
      activeTouchNode = null;
      nodeEls.forEach(({ btn }) => btn.classList.remove('is-hot', 'is-dim'));
      pipeEls.forEach(({ el }) => el.classList.remove('is-hot', 'is-dim'));
      setDefaultStatus();
    };

    const highlight = (targetNode) => {
      currentNode = targetNode;
      nodeEls.forEach(({ btn, node }) => {
        const match = node === targetNode;
        btn.classList.toggle('is-hot', match);
        btn.classList.toggle('is-dim', !match);
      });
      pipeEls.forEach(({ el, nodes }) => {
        const match = nodes.includes(targetNode);
        el.classList.toggle('is-hot', match);
        el.classList.toggle('is-dim', !match);
      });

      statusText.innerHTML = '';
      const strong = document.createElement('strong');
      const titleLabel = targetNode.eyebrow ? `${targetNode.eyebrow} · ${targetNode.title}` : targetNode.title;
      strong.textContent = titleLabel;
      statusText.appendChild(strong);
      const specs = targetNode.items.length ? targetNode.items.join(' · ') : '';
      const leg = legendMap.get(targetNode.layer) || '';
      const detail = specs || leg;
      if (detail) {
        statusText.appendChild(document.createTextNode(` — ${detail}`));
        statusText.title = `${titleLabel} — ${detail}`;
      } else {
        statusText.title = titleLabel;
      }
      if (targetNode.techs.length) {
        statusCta.textContent = ui.filterCta || 'Filter →';
        statusCta.hidden = false;
      } else {
        statusCta.textContent = '';
        statusCta.hidden = true;
      }
    };

    const goFilter = (techs) => {
      if (!techs.length) return;
      const locale = currentLocale();
      softNavigateTo(`/${locale}/?tech=${encodeURIComponent(techs.join(','))}#projects`);
    };

    statusCta.addEventListener(
      'click',
      () => {
        if (currentNode?.techs?.length) goFilter(currentNode.techs);
      },
      { signal }
    );

    nodeEls.forEach(({ btn, node }) => {
      btn.addEventListener(
        'pointerenter',
        (e) => {
          if (e.pointerType === 'touch') return;
          highlight(node);
        },
        { signal }
      );
      btn.addEventListener(
        'pointerleave',
        (e) => {
          if (e.pointerType === 'touch') return;
          clear();
        },
        { signal }
      );
      btn.addEventListener('focus', () => highlight(node), { signal });
      btn.addEventListener(
        'blur',
        () => {
          if (!isTouchEnv()) clear();
        },
        { signal }
      );
      btn.addEventListener(
        'click',
        (e) => {
          e.preventDefault();
          if (isTouchEnv() && activeTouchNode !== node) {
            activeTouchNode = node;
            highlight(node);
            return;
          }
          goFilter(node.techs);
        },
        { signal }
      );
    });

    document.addEventListener(
      'click',
      (e) => {
        if (activeTouchNode && !box.contains(e.target)) clear();
      },
      { signal }
    );

    signal.addEventListener('abort', () => {
      box.remove();
      diagram.classList.remove('is-ascii');
    });
  }
}

class ProjectFeatures {
  constructor(signal) {
    const blocks = document.querySelectorAll('.project-body .project-block');
    if (!blocks.length) return;

    const figures = Array.from(document.querySelectorAll('.project-gallery figure')).filter((f) =>
      f.querySelector('img')
    );
    const figTokens = figures.map((fig, idx) => {
      const cap = fig.querySelector('figcaption')?.textContent || '';
      const src = fig.querySelector('img')?.getAttribute('src') || '';
      const file = src.split('/').pop()?.replace(/\.\w+$/, '') || '';
      return { idx, hay: this.normalize(`${cap} ${file}`) };
    });
    const usedFigs = new Set();
    const ui = uiStrings().projectPager || {};
    const shotLabel = ui.shot || 'Shot ↗';

    blocks.forEach((block) => {
      const h2 = block.querySelector('h2');
      const ul = block.querySelector('ul');
      if (!h2 || !ul || ul.classList.contains('project-features')) return;
      if (!/^(fonctionnalit[eé]s|features)$/i.test((h2.textContent || '').trim())) return;

      const items = Array.from(ul.children).filter((li) => li.tagName === 'LI' && li.querySelector('strong'));
      if (!items.length) return;

      ul.classList.add('project-features');
      items.forEach((li, i) => {
        const strong = li.querySelector('strong');
        const title = strong.textContent.trim();
        const clone = li.cloneNode(true);
        clone.querySelector('strong')?.remove();
        const desc = clone.textContent.replace(/^[\s·:\-–—]+/, '').trim();

        li.textContent = '';
        const idxEl = document.createElement('span');
        idxEl.className = 'project-features__idx';
        idxEl.textContent = String(i + 1).padStart(2, '0');

        const titleEl = document.createElement('span');
        titleEl.className = 'project-features__title';
        titleEl.textContent = title;

        const descEl = document.createElement('span');
        descEl.className = 'project-features__desc';
        descEl.textContent = desc;

        li.append(idxEl, titleEl, descEl);

        const matchIdx = this.findMatchingFigure(title, figTokens, usedFigs);
        if (matchIdx >= 0 && window.__gallerySpotlight) {
          usedFigs.add(matchIdx);
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'project-features__shot';
          btn.textContent = shotLabel;
          btn.setAttribute('aria-label', `${shotLabel.replace('↗', '').trim()} — ${title}`);
          btn.addEventListener(
            'click',
            () => {
              if (window.__gallerySpotlight) window.__gallerySpotlight.show(matchIdx);
            },
            { signal }
          );
          li.appendChild(btn);
        }
      });
    });
  }

  normalize(str) {
    return (str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  findMatchingFigure(title, figTokens, usedFigs) {
    if (!figTokens.length) return -1;
    const stop = new Set(['les', 'des', 'une', 'pour', 'avec', 'dans', 'the', 'and', 'for', 'with', 'spa', 'app', 'web']);
    const shortAllow = new Set(['ia', 'ai', 'api', 'sql', 'mcd', 'mld', 'bi', 'ui', 'otp', '2fa', 'jwt']);
    const tokens = this.normalize(title)
      .split(' ')
      .filter((t) => (t.length >= 4 || shortAllow.has(t)) && !stop.has(t));
    if (!tokens.length) return -1;

    let bestIdx = -1;
    let bestScore = 0;
    figTokens.forEach(({ idx, hay }) => {
      if (usedFigs.has(idx)) return;
      const words = hay.split(' ');
      let score = 0;
      tokens.forEach((tok) => {
        if (words.includes(tok)) score += 2;
        else if (tok.length >= 4 && hay.includes(tok)) score += 1;
      });
      if (score > bestScore) {
        bestScore = score;
        bestIdx = idx;
      }
    });
    return bestScore >= 2 ? bestIdx : -1;
  }
}

class ProjectDiscussAction {
  constructor(signal) {
    const body = document.querySelector('.project-body');
    if (!body) return;
    this.mount(body, signal);
  }

  async mount(body, signal) {
    const actions = body.querySelector('.project-actions');
    if (!actions || actions.querySelector('[data-discuss-project]')) return;

    const catalog = await getProjectsCatalog();
    if (signal.aborted || !catalog?.projects?.length) return;

    const locale = currentLocale();
    const ui = uiStrings().projectPager || {};
    const curPath = normalizePathname(location.pathname);

    const current = catalog.projects.find(
      (p) => !p.githubOnly && p.detailPaths && p.detailPaths[locale] && normalizePathname(p.detailPaths[locale]) === curPath
    );
    if (!current) return;

    const discuss = document.createElement('a');
    discuss.className = 'btn';
    discuss.setAttribute('data-discuss-project', '');
    discuss.href = `/${locale}/?project=${encodeURIComponent(current.id)}#contact`;
    discuss.textContent = ui.discuss || 'Discuss this project';
    actions.appendChild(discuss);
  }
}

class OceanDiveScroll {
  constructor(signal, immediate = false) {
    this.raf = 0;
    const projects = document.getElementById('projects');
    const about = document.getElementById('about');
    const contact = document.getElementById('contact');
    const projectBody = document.querySelector('.project-body');

    const smooth = (t) => t * t * (3 - 2 * t);

    // 4-Act POV dive:
    // 0.00 = Hero (top-down over pond)
    // 0.33 = Projects (upper water column side-view beneath surface waterline)
    // 0.67 = About (deep pond-bed side-view with rocky floor & swaying reeds)
    // 1.00 = Contact (bottom-up looking straight up into Snell's Window)
    const computeDive = () => {
      const vh = window.innerHeight || 800;
      if (projects && about && contact) {
        const pTop = projects.getBoundingClientRect().top;
        const aTop = about.getBoundingClientRect().top;
        const cTop = contact.getBoundingClientRect().top;
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);
        const nearBottom = Math.max(0, Math.min(1, (window.scrollY - (maxScroll - vh * 0.36)) / Math.max(1, vh * 0.36)));

        const p1 = Math.max(0, Math.min(1, (vh * 0.92 - pTop) / Math.max(1, vh * 0.74)));
        const p2 = Math.max(0, Math.min(1, (vh * 0.92 - aTop) / Math.max(1, vh * 0.72)));
        const p3 = Math.max(
          Math.max(0, Math.min(1, (vh * 0.94 - cTop) / Math.max(1, vh * 0.64))),
          nearBottom
        );
        return (smooth(p1) + smooth(p2) + smooth(p3)) / 3;
      }
      if (projectBody) {
        const max = Math.max(1, document.documentElement.scrollHeight - vh);
        const ratio = Math.max(0, Math.min(1, window.scrollY / max));
        return 1 / 3 + ratio * 0.14;
      }
      return 0;
    };

    const sync = (snap = false) => {
      const engine = window.__oceanEngine;
      if (!engine || typeof engine.setDive !== 'function') return;
      engine.setDive(computeDive(), snap);
    };

    const onScroll = () => {
      if (this.raf) return;
      this.raf = requestAnimationFrame(() => {
        this.raf = 0;
        sync(false);
      });
    };

    sync(immediate);
    window.addEventListener('scroll', onScroll, { passive: true, signal });
    window.addEventListener('resize', onScroll, { passive: true, signal });

    let ro = null;
    if (projects && typeof ResizeObserver === 'function') {
      ro = new ResizeObserver(onScroll);
      ro.observe(projects);
    }

    signal.addEventListener('abort', () => {
      if (this.raf) {
        cancelAnimationFrame(this.raf);
        this.raf = 0;
      }
      if (ro) {
        ro.disconnect();
        ro = null;
      }
    });
  }
}

class ProjectBuoyancy {
  constructor(signal) {
    if (systemReducedMotion()) return;
    const list = document.querySelector('.projects-list');
    if (!list) return;

    const weights = [0.72, 1.26, 0.96];
    let lastY = window.scrollY;
    let lag = 0;
    let raf = 0;

    const resetAll = () => {
      list.querySelectorAll('.project-card').forEach((card) => {
        card.style.removeProperty('--buoy-y');
      });
    };

    const tick = () => {
      if (isOceanEffectivelyStill() || isOceanPaused()) {
        lag = 0;
        raf = 0;
        resetAll();
        return;
      }

      lag *= 0.9;
      if (Math.abs(lag) < 0.08) {
        lag = 0;
        raf = 0;
        resetAll();
        return;
      }

      const vh = window.innerHeight || 800;
      const compact = window.matchMedia('(max-width: 40em)').matches;
      const cards = list.querySelectorAll('.project-card:not(.filtered-out)');
      cards.forEach((card, idx) => {
        const rect = card.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > vh + 120) return;
        const w = compact ? 0.65 : weights[idx % weights.length];
        const y = Math.max(-15, Math.min(15, lag * w));
        card.style.setProperty('--buoy-y', `${y.toFixed(2)}px`);
      });

      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      if (isOceanEffectivelyStill() || isOceanPaused()) return;
      if (Math.abs(delta) > 420 || Math.abs(delta) < 0.5) return;
      const compact = window.matchMedia('(max-width: 40em)').matches;
      const maxLag = compact ? 6 : 13;
      lag = Math.max(-maxLag, Math.min(maxLag, lag - delta * 0.14));
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true, signal });

    signal.addEventListener('abort', () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      resetAll();
    });
  }
}

function bootPage(options = {}) {
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
  if (window.__quickPeek?.open) {
    window.__quickPeek.close(true);
  }

  new SiteChrome(signal);
  syncCopyrightYears();
  new OceanPowerToggle(signal);
  new CommandPaletteTrigger(signal);
  new OceanPauseHotkey(signal);
  new HeroHint(signal);
  syncOceanAtmosphere({
    animate: !!options.animateOcean,
    duration: options.oceanDuration,
    fromPalette: options.fromPalette,
    fromFish: options.fromFish
  });
  if (isOceanPaused()) applyOceanPause(true);

  if (document.querySelector('.projects-filters') && document.querySelectorAll('.project-card').length) {
    window.__projectFilters = new ProjectFilters();
  }
  new FeaturedOceanPreview(signal);
  new OceanDiveScroll(signal, !options.animateOcean);
  new ProjectBuoyancy(signal);
  new QuickPeekTriggers(signal);
  if (document.querySelector('.project-gallery')) {
    window.__gallerySpotlight = new GallerySpotlight();
  }
  if (document.querySelector('.contact__form')) new ContactForm();
  new AboutSkills(signal);
  new ContactAside(signal);
  new ProjectToc(signal);
  new ArchDiagram(signal);
  new ProjectFeatures(signal);
  new ProjectDiscussAction(signal);
  new ScrollReveal(signal);
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

  isProjectPath(pathname) {
    return /\/(fr\/projets|en\/projects)\//.test(pathname || '');
  }

  bone(mods = []) {
    const el = document.createElement('span');
    el.className = ['skeleton__bone', ...mods.map((m) => `skeleton__bone--${m}`)].join(' ');
    el.setAttribute('aria-hidden', 'true');
    return el;
  }

  buildHomeSkeleton() {
    const root = document.createElement('div');
    root.className = 'skeleton skeleton--home';

    const hero = document.createElement('section');
    hero.className = 'skeleton-home__hero';
    hero.append(
      this.bone(['brand']),
      this.bone(['title-lg']),
      this.bone(['lead']),
      this.bone(['lead-short']),
      this.bone(['btn']),
      this.bone(['btn'])
    );

    const projects = document.createElement('section');
    projects.className = 'skeleton-home__projects';
    const wrap = document.createElement('div');
    wrap.className = 'wrap';
    wrap.append(this.bone(['eyebrow']), this.bone(['section']));

    for (let i = 0; i < 5; i += 1) {
      const card = document.createElement('div');
      card.className = 'skeleton-home__card';
      card.append(
        this.bone(['card-title']),
        this.bone(['tag']),
        this.bone(['tag']),
        this.bone(['tag']),
        this.bone(['desc']),
        this.bone(['desc-short'])
      );
      wrap.append(card);
    }

    projects.append(wrap);
    root.append(hero, projects);
    return root;
  }

  buildProjectSkeleton() {
    const root = document.createElement('div');
    root.className = 'skeleton skeleton--project';

    const hero = document.createElement('section');
    hero.className = 'skeleton-project__hero';
    const heroWrap = document.createElement('div');
    heroWrap.className = 'wrap';
    heroWrap.append(
      this.bone(['title']),
      this.bone(['lead']),
      this.bone(['lead-short']),
      this.bone(['btn'])
    );
    hero.append(heroWrap);

    const body = document.createElement('div');
    body.className = 'skeleton-project__body';
    const bodyWrap = document.createElement('div');
    bodyWrap.className = 'wrap';

    for (let i = 0; i < 3; i += 1) {
      const block = document.createElement('div');
      block.className = 'skeleton-project__block';
      block.append(
        this.bone(['block-title']),
        this.bone(['para']),
        this.bone(['para-mid']),
        this.bone(['para-short'])
      );
      bodyWrap.append(block);
    }

    body.append(bodyWrap);
    root.append(hero, body);
    return root;
  }

  showSkeleton(pathname) {
    const main = document.querySelector('.site main');
    if (!main) return;
    const label = document.documentElement.lang === 'fr' ? 'Chargement de la page' : 'Loading page';
    main.setAttribute('aria-busy', 'true');
    main.replaceChildren();
    const status = document.createElement('p');
    status.className = 'visually-hidden';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.textContent = label;
    main.append(status, this.isProjectPath(pathname) ? this.buildProjectSkeleton() : this.buildHomeSkeleton());
    window.scrollTo(0, 0);
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

    if (this.getDocKey(url) === this.getDocKey(location)) {
      e.preventDefault();
      const hash = url.hash && url.hash !== '#home' ? url.hash : '';
      const nextHref = `${location.pathname}${location.search}${hash}`;
      if (`${location.pathname}${location.search}${location.hash}` !== nextHref) {
        history.pushState({ soft: true }, '', nextHref);
      }
      this.scrollToHash(hash, 'smooth');
      return;
    }

    e.preventDefault();
    this.load(url.href, true, { x: e.clientX, y: e.clientY });
  }

  isSoftUrl(url) {
    const p = url.pathname;
    if (p.startsWith('/assets/')) return false;
    if (/\.(pdf|png|jpe?g|webp|svg|zip|css|js|json|xml|txt)$/i.test(p)) return false;
    if (p === '/404.html' || p.endsWith('/404.html')) return false;
    return true;
  }

  async load(href, push, origin = null) {
    if (this.pending) return;
    if (!isSafeSameOriginHref(href)) return;
    this.pending = true;
    document.documentElement.classList.add('is-soft-nav');
    if (window.__oceanEngine?.ripple) {
      window.__oceanEngine.ripple(origin?.x, origin?.y);
    }
    let skeletonTimer = 0;
    let shownSkeleton = false;
    try {
      const targetUrl = new URL(href, location.href);
      skeletonTimer = window.setTimeout(() => {
        shownSkeleton = true;
        this.showSkeleton(targetUrl.pathname);
      }, 180);

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

      clearTimeout(skeletonTimer);
      skeletonTimer = 0;

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

      const fromPalette = window.__oceanCurrentPalette || readOceanPaletteFromCss();
      const fromFish = readTargetFishCount();

      const commitSwap = () => {
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

        bootPage({
          animateOcean: true,
          oceanDuration: 1250,
          fromPalette,
          fromFish
        });

        if (targetUrl.hash) {
          this.scrollToHash(targetUrl.hash, 'auto');
          requestAnimationFrame(() => {
            this.scrollToHash(targetUrl.hash, 'auto');
          });
        } else {
          window.scrollTo(0, 0);
        }
      };

      const canViewTransition =
        !shownSkeleton &&
        !systemReducedMotion() &&
        typeof document.startViewTransition === 'function';

      if (canViewTransition) {
        document.documentElement.classList.add('is-vt');
        try {
          const vt = document.startViewTransition(() => {
            commitSwap();
          });
          await vt.updateCallbackDone.catch(() => {});
          vt.finished.finally(() => {
            document.documentElement.classList.remove('is-vt');
          });
        } catch {
          document.documentElement.classList.remove('is-vt');
          commitSwap();
        }
      } else {
        commitSwap();
        if (!systemReducedMotion()) {
          const nextMain = document.querySelector('.site main');
          if (nextMain) {
            nextMain.classList.add('is-page-enter');
            nextMain.addEventListener(
              'animationend',
              () => nextMain.classList.remove('is-page-enter'),
              { once: true }
            );
          }
        }
      }
    } catch {
      location.assign(href);
    } finally {
      clearTimeout(skeletonTimer);
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
  new QuickPeek();
});
