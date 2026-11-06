import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const legacy = readFileSync(join(ROOT, 'assets/js/portfolio.legacy.js'), 'utf8').split(/\r?\n/);

const head = `const LOCALE = document.documentElement.lang.startsWith('fr') ? 'fr' : 'en';

const I18N = {
  en: {
    homePath: '/en/#home',
    projectFilterUi: {
      searchPlaceholder: 'Search by technology…',
      searchAriaLabel: 'Filter projects by technology',
      filterChipsAriaLabel: 'Active filters (match all)',
      removeFilterChipAriaPrefix: 'Remove filter',
      resultsCount: (n) => \`\${n} project\${n === 1 ? '' : 's'}\`
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
      resultsCount: (n) => \`\${n} projet\${n === 1 ? '' : 's'}\`
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

`;

const filters = legacy.slice(549, 1109).join('\n');
const contact = legacy.slice(1110, 1167).join('\n');

const boot = `
class SiteChrome {
  constructor() {
    this.header = document.querySelector('.header');
    this.toggle = document.querySelector('[data-nav-toggle]');
    this.panel = document.querySelector('[data-nav-panel]');
    this.onScroll = this.onScroll.bind(this);
    this.onScroll();
    window.addEventListener('scroll', this.onScroll, { passive: true });
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

  onScroll() {
    if (!this.header) return;
    this.header.classList.toggle('header--scrolled', window.scrollY > 24);
  }
}

class OceanBoot {
  constructor() {
    const canvas = document.querySelector('[data-ocean]');
    if (!canvas || typeof OceanEngine !== 'function') return;
    const reduced = document.body.dataset.oceanFish;
    const fishCount = reduced ? Number(reduced) : undefined;
    const options = {};
    if (Number.isFinite(fishCount)) options.fishCount = fishCount;
    this.engine = new OceanEngine(canvas, undefined, options);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SiteChrome();
  new OceanBoot();
  if (document.querySelectorAll('.project-card').length) new ProjectFilters();
  if (document.querySelector('.contact__form')) new ContactForm();
});
`;

writeFileSync(join(ROOT, 'assets/js/portfolio.js'), `${head}${filters}\n\n${contact}\n${boot}`);
console.log('portfolio.js assembled');
