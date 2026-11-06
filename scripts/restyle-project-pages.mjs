import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function matchAll(re, html) {
  return [...html.matchAll(re)];
}

function extractHeadMeta(html) {
  const pick = (re, fallback = '') => {
    const m = html.match(re);
    return m ? m[1].trim() : fallback;
  };
  return {
    title: pick(/<title>([\s\S]*?)<\/title>/i),
    description: pick(/<meta\s+name="description"\s+content="([^"]*)"/i),
    canonical: pick(/<link\s+rel="canonical"\s+href="([^"]*)"/i),
    hreflangEn: pick(/<link\s+rel="alternate"\s+hreflang="en"\s+href="([^"]*)"/i),
    hreflangFr: pick(/<link\s+rel="alternate"\s+hreflang="fr"\s+href="([^"]*)"/i),
    hreflangDefault: pick(/<link\s+rel="alternate"\s+hreflang="x-default"\s+href="([^"]*)"/i),
    ogTitle: pick(/<meta\s+property="og:title"\s+content="([^"]*)"/i),
    ogDescription: pick(/<meta\s+property="og:description"\s+content="([^"]*)"/i),
    ogUrl: pick(/<meta\s+property="og:url"\s+content="([^"]*)"/i),
  };
}

function restyle(filePath, lang) {
  const html = readFileSync(filePath, 'utf8');
  const meta = extractHeadMeta(html);
  const home = lang === 'fr' ? '/fr/' : '/en/';
  const projectsHash = `${home}#projects`;
  const otherLang = lang === 'fr' ? 'en' : 'fr';
  const otherHref =
    lang === 'fr'
      ? meta.hreflangEn || meta.canonical.replace('/fr/projets/', '/en/projects/')
      : meta.hreflangFr || meta.canonical.replace('/en/projects/', '/fr/projets/');

  const heroTitle = stripTags(
    (html.match(/<h1 class="heading-primary">([\s\S]*?)<\/h1>/i) || [, meta.title])[1]
  );
  const heroLeadHtml = (html.match(/<div class="project-cs-hero__info">([\s\S]*?)<\/div>/i) || [, ''])[1]
    .replace(/class="text-primary"/g, '')
    .trim();
  const heroCta = html.match(
    /<div class="project-cs-hero__cta">\s*<a href="([^"]+)"[^>]*>[\s\S]*?<strong>([\s\S]*?)<\/strong>/i
  );

  const sections = matchAll(
    /<div class="project-details__section">([\s\S]*?)(?=<div class="project-details__section">|<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>)/g,
    html
  ).map((m) => m[1]);

  let overview = '';
  let features = '';
  let gallery = '';
  let tech = '';
  let links = '';

  for (const section of sections) {
    const title = stripTags((section.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i) || [, ''])[1]).toLowerCase();
    if (/aperçu|overview/.test(title)) {
      overview = matchAll(/<p class="project-details__desc-para">([\s\S]*?)<\/p>/gi, section)
        .map((p) => `<p>${p[1].trim()}</p>`)
        .join('\n');
    } else if (/fonctionnalités|features/.test(title)) {
      features = matchAll(/<div class="project-details__feature-item">([\s\S]*?)<\/div>\s*(?=<div class="project-details__feature-item">|$)/gi, section)
        .map((item) => {
          const t = stripTags((item[1].match(/<h3[^>]*>([\s\S]*?)<\/h3>/i) || [, ''])[1]);
          const d = stripTags((item[1].match(/<p[^>]*>([\s\S]*?)<\/p>/i) || [, ''])[1]);
          return `<li><strong>${t}</strong> — ${d}</li>`.replace(' — ', ' · ');
        })
        .join('\n');
    } else if (/galerie|gallery/.test(title)) {
      gallery = matchAll(
        /<div class="project-details__showcase-img-cont">([\s\S]*?)<\/div>/gi,
        section
      )
        .map((block) => {
          const src = (block[1].match(/src="([^"]+)"/i) || [, ''])[1];
          const alt = (block[1].match(/alt="([^"]*)"/i) || [, ''])[1];
          const cap = stripTags((block[1].match(/<p class="project-details__img-caption">([\s\S]*?)<\/p>/i) || [, ''])[1]);
          if (!src) return '';
          return `<figure><img src="${src}" alt="${alt}" loading="lazy" /><figcaption>${cap}</figcaption></figure>`;
        })
        .filter(Boolean)
        .join('\n');
    } else if (/technologies|tools|tech/.test(title)) {
      tech = matchAll(/<div class="skills__skill"><strong>([\s\S]*?)<\/strong><\/div>/gi, section)
        .map((t) => t[1].trim())
        .join(' · ');
    } else if (/explorer|explore/.test(title)) {
      links = matchAll(/<a href="([^"]+)"[^>]*>[\s\S]*?<strong>([\s\S]*?)<\/strong>[\s\S]*?<\/a>/gi, section)
        .map((a) => {
          const href = a[1];
          const label = stripTags(a[2]);
          const external = /^https?:/i.test(href);
          return `<a class="btn${/retour|back/i.test(label) ? '' : ' btn--solid'}" href="${href}"${external ? ' target="_blank" rel="noreferrer"' : ''}>${label}</a>`;
        })
        .join('\n');
    }
  }

  if (!links) {
    links = `<a class="btn" href="${projectsHash}">${lang === 'fr' ? 'Retour aux projets' : 'Back to projects'}</a>`;
  }

  const navLabels =
    lang === 'fr'
      ? { home: 'Accueil', projects: 'Projets', about: 'À propos', contact: 'Contact', menu: 'Menu', skip: 'Aller au contenu' }
      : { home: 'Home', projects: 'Projects', about: 'About', contact: 'Contact', menu: 'Menu', skip: 'Skip to content' };

  const out = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${meta.description.replace(/"/g, '&quot;')}" />
  <link rel="canonical" href="${meta.canonical}" />
  <link rel="alternate" hreflang="en" href="${meta.hreflangEn}" />
  <link rel="alternate" hreflang="fr" href="${meta.hreflangFr}" />
  <link rel="alternate" hreflang="x-default" href="${meta.hreflangDefault || meta.hreflangEn}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${(meta.ogTitle || meta.title).replace(/"/g, '&quot;')}" />
  <meta property="og:description" content="${(meta.ogDescription || meta.description).replace(/"/g, '&quot;')}" />
  <meta property="og:url" content="${meta.ogUrl || meta.canonical}" />
  <meta property="og:image" content="https://melih0132.github.io/assets/png/pp.png" />
  <meta name="twitter:card" content="summary" />
  <link rel="stylesheet" href="/assets/css/style.min.css" />
  <link rel="icon" href="/assets/png/logo.png" type="image/png">
  <title>${meta.title}</title>
</head>
<body data-ocean-fish="48">
  <canvas class="ocean" data-ocean aria-hidden="true"></canvas>
  <div class="site">
    <a href="#main" class="skip-link">${navLabels.skip}</a>
    <header class="header">
      <div class="header__content">
        <a class="header__brand" href="${home}">Melih C.</a>
        <ul class="header__links">
          <li><a class="header__link" href="${home}#home">${navLabels.home}</a></li>
          <li><a class="header__link" href="${home}#projects">${navLabels.projects}</a></li>
          <li><a class="header__link" href="${home}#about">${navLabels.about}</a></li>
          <li><a class="header__link" href="${home}#contact">${navLabels.contact}</a></li>
        </ul>
        <ul class="header__lang">
          <li><a href="${lang === 'fr' ? meta.canonical : otherHref}" data-set-lang="fr"${lang === 'fr' ? ' aria-current="true"' : ''}>FR</a></li>
          <li><a href="${lang === 'en' ? meta.canonical : otherHref}" data-set-lang="en"${lang === 'en' ? ' aria-current="true"' : ''}>EN</a></li>
        </ul>
        <button class="header__toggle" type="button" data-nav-toggle aria-expanded="false" aria-controls="nav-panel">${navLabels.menu}</button>
      </div>
      <div class="header__panel" id="nav-panel" data-nav-panel>
        <ul>
          <li><a href="${home}#home">${navLabels.home}</a></li>
          <li><a href="${home}#projects">${navLabels.projects}</a></li>
          <li><a href="${home}#about">${navLabels.about}</a></li>
          <li><a href="${home}#contact">${navLabels.contact}</a></li>
        </ul>
        <ul class="header__lang">
          <li><a href="${lang === 'fr' ? meta.canonical : otherHref}" data-set-lang="fr"${lang === 'fr' ? ' aria-current="true"' : ''}>FR</a></li>
          <li><a href="${lang === 'en' ? meta.canonical : otherHref}" data-set-lang="en"${lang === 'en' ? ' aria-current="true"' : ''}>EN</a></li>
        </ul>
      </div>
    </header>

    <main id="main">
      <section class="project-hero">
        <div class="wrap">
          <h1 class="project-hero__title">${heroTitle}</h1>
          <div class="project-hero__lead">${heroLeadHtml}</div>
          ${
            heroCta
              ? `<div class="hero__actions"><a class="btn btn--solid" href="${heroCta[1]}" target="_blank" rel="noreferrer">${stripTags(heroCta[2])}</a></div>`
              : ''
          }
        </div>
      </section>

      <div class="project-body">
        ${
          overview
            ? `<section class="project-block"><div class="wrap"><h2>${lang === 'fr' ? 'Aperçu' : 'Overview'}</h2>${overview}</div></section>`
            : ''
        }
        ${
          features
            ? `<section class="project-block"><div class="wrap"><h2>${lang === 'fr' ? 'Fonctionnalités' : 'Features'}</h2><ul>${features}</ul></div></section>`
            : ''
        }
        ${
          gallery
            ? `<section class="project-block"><div class="wrap"><h2>${lang === 'fr' ? 'Galerie' : 'Gallery'}</h2></div><div class="project-gallery">${gallery}</div></section>`
            : ''
        }
        ${
          tech
            ? `<section class="project-block"><div class="wrap"><h2>Tech</h2><p class="project-tech">${tech}</p></div></section>`
            : ''
        }
        <section class="project-block">
          <div class="wrap">
            <h2>${lang === 'fr' ? 'Explorer' : 'Explore'}</h2>
            <div class="project-actions">${links}</div>
          </div>
        </section>
      </div>
    </main>

    <footer class="footer">
      <div class="footer__inner">
        <span>&copy; <span class="copyright-year"></span> Melih Cetinkaya</span>
        <a href="https://github.com/melih0132" target="_blank" rel="noreferrer">github.com/melih0132</a>
      </div>
    </footer>
  </div>

  <script>
    document.querySelectorAll('.copyright-year').forEach((el) => { el.textContent = new Date().getFullYear(); });
  </script>
  <script src="/assets/js/ocean.min.js"></script>
  <script defer src="/assets/js/portfolio.min.js"></script>
</body>
</html>
`;

  writeFileSync(filePath, out);
}

const frDir = join(ROOT, 'fr/projets');
const enDir = join(ROOT, 'en/projects');
let n = 0;
for (const name of readdirSync(frDir).filter((f) => f.endsWith('.html'))) {
  restyle(join(frDir, name), 'fr');
  n++;
}
for (const name of readdirSync(enDir).filter((f) => f.endsWith('.html'))) {
  restyle(join(enDir, name), 'en');
  n++;
}
console.log(`Restyled ${n} project pages`);
