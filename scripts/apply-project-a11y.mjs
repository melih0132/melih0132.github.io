import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function walkHtml(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      walkHtml(full, files);
    } else if (name.endsWith('.html') && (full.includes('projets') || full.includes('projects'))) {
      files.push(full);
    }
  }
  return files;
}

function patchProjectPage(content) {
  let out = content;

  out = out.replace(
    /<img src="\/assets\/png\/pp\.png" alt="([^"]*)" class="header__logo-img"\s*\/>/g,
    '<img src="/assets/png/pp-80.png" alt="$1" class="header__logo-img" width="40" height="40" />'
  );

  out = out.replace(
    /<img src="\/assets\/svg\/ham-menu\.svg" alt="([^"]*)" class="header__main-ham-menu"\s*\/>/g,
    '<img src="/assets/svg/ham-menu.svg" alt="$1" class="header__main-ham-menu" width="26" height="26" />'
  );

  out = out.replace(
    /<img src="\/assets\/svg\/ham-menu-close\.svg" alt="([^"]*)"\s*\n\s*class="header__main-ham-menu-close d-none"\s*\/>/g,
    '<img src="/assets/svg/ham-menu-close.svg" alt="$1"\n          class="header__main-ham-menu-close d-none" width="26" height="26" />'
  );

  out = out.replace(
    /<img src="\/assets\/svg\/ham-menu-close\.svg" alt="([^"]*)" class="header__main-ham-menu-close d-none"\s*\/>/g,
    '<img src="/assets/svg/ham-menu-close.svg" alt="$1" class="header__main-ham-menu-close d-none" width="26" height="26" />'
  );

  if (!out.includes('<main id="main">')) {
    out = out.replace(/<\/header>\s*\n\s*<section/, '</header>\n\n  <main id="main">\n\n  <section');
    out = out.replace(/\n\s*<footer class="main-footer">/, '\n\n  </main>\n\n  <footer class="main-footer">');
  }

  return out;
}

let updated = 0;
for (const file of walkHtml(ROOT)) {
  const rel = relative(ROOT, file).replace(/\\/g, '/');
  const content = readFileSync(file, 'utf8');
  const next = patchProjectPage(content);
  if (next !== content) {
    writeFileSync(file, next);
    updated++;
    console.log('updated', rel);
  }
}

console.log(`Done. ${updated} project page(s) updated.`);
