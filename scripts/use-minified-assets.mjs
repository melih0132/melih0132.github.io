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

let updated = 0;
for (const file of walkHtml(ROOT)) {
  const rel = relative(ROOT, file).replace(/\\/g, '/');
  if (rel === 'index.html') continue;

  let content = readFileSync(file, 'utf8');
  const next = content
    .replace(/href="\/assets\/css\/style\.css"/g, 'href="/assets/css/style.min.css"')
    .replace(/src="\/assets\/js\/portfolio\.js"/g, 'src="/assets/js/portfolio.min.js"');

  if (next !== content) {
    writeFileSync(file, next);
    updated++;
    console.log('updated', rel);
  }
}

console.log(`Done. ${updated} file(s) point to minified assets.`);
