import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function walkHtml(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      walkHtml(full, files);
    } else if (name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

const LENIS_CDN_RE = /\s*<link rel="stylesheet" href="https:\/\/unpkg\.com\/lenis@[^"]+">\n?/g;
const FONTS_RE = /\s*<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Oswald[^"]+" rel="stylesheet">\n?/g;
const LENIS_JS_CDN_RE = /<script src="https:\/\/unpkg\.com\/lenis@[^"]+"><\/script>\n?/g;

function syncHeadScripts(content) {
  let out = content
    .replace(LENIS_CDN_RE, '')
    .replace(FONTS_RE, '')
    .replace(LENIS_JS_CDN_RE, '')
    .replace(
      /<script src="\/assets\/js\/lenis-init\.js"><\/script>/g,
      '<script defer src="/assets/js/lenis-init.js"></script>'
    )
    .replace(
      /<script src="\/assets\/js\/portfolio\.js"><\/script>/g,
      '<script defer src="/assets/js/portfolio.js"></script>'
    )
    .replace(
      /<script src="(\/(?:en\/projects|fr\/projets)\/script\.js)"><\/script>/g,
      '<script defer src="$1"></script>'
    );

  if (!out.includes('/assets/vendor/lenis/lenis.min.js') && out.includes('lenis-init.js')) {
    out = out.replace(
      '<script defer src="/assets/js/lenis-init.js"></script>',
      '<script defer src="/assets/vendor/lenis/lenis.min.js"></script>\n  <script defer src="/assets/js/lenis-init.js"></script>'
    );
  }

  return out;
}

function removeRootFontPreconnect(content) {
  return content
    .replace(/\s*<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\n?/g, '')
    .replace(/\s*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>\n?/g, '')
    .replace(/\s*<link rel="dns-prefetch" href="https:\/\/fonts\.gstatic\.com">\n?/g, '');
}

const htmlFiles = walkHtml(ROOT);
let updated = 0;

for (const file of htmlFiles) {
  const rel = relative(ROOT, file).replace(/\\/g, '/');
  let content = readFileSync(file, 'utf8');
  let next = rel === 'index.html' ? removeRootFontPreconnect(content) : syncHeadScripts(content);

  if (next !== content) {
    writeFileSync(file, next);
    updated++;
    console.log('updated', rel);
  }
}

console.log(`Done. ${updated} file(s) updated.`);
