import { execSync } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

execSync(
  'npx esbuild assets/js/portfolio.js --minify --outfile=assets/js/portfolio.min.js',
  { cwd: ROOT, stdio: 'inherit' }
);

// Ocean (ascii-sharks / sftss) : sources TS trackées, bundle IIFE commit pour GitHub Pages.
// scripts/ et node_modules/ sont gitignorés ; ocean.min.js doit rester versionné.
execSync(
  'npx esbuild assets/js/ocean/browser.ts --bundle --minify --format=iife --outfile=assets/js/ocean.min.js',
  { cwd: ROOT, stdio: 'inherit' }
);

execSync(
  'npx lightningcss --minify assets/css/style.css -o assets/css/style.min.css',
  { cwd: ROOT, stdio: 'inherit' }
);

console.log(
  'Minified assets written to assets/js/portfolio.min.js, assets/js/ocean.min.js and assets/css/style.min.css'
);

execSync('node scripts/use-minified-assets.mjs', { cwd: ROOT, stdio: 'inherit' });
