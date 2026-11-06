import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'assets', 'og');
const projectsPath = path.join(root, 'assets', 'data', 'projects.json');

function loadSharp() {
  try {
    return createRequire(import.meta.url)('sharp');
  } catch {
    return null;
  }
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function readTitle(enHtmlPath) {
  const html = fs.readFileSync(enHtmlPath, 'utf8');
  const m = html.match(/<h1[^>]*class="project-hero__title"[^>]*>([\s\S]*?)<\/h1>/i);
  if (!m) return null;
  return m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function pickTechs(techs) {
  const skip = new Set(['git', 'github', 'visual studio', 'vs code', 'pgadmin4', 'figma']);
  return techs
    .filter((t) => !skip.has(String(t).toLowerCase()))
    .slice(0, 5);
}

function buildSvg({ title, techs }) {
  const techLine = techs.join(' · ');
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#000000"/>
  <rect x="48" y="48" width="1104" height="534" fill="none" stroke="#d4a84b" stroke-opacity="0.35" stroke-width="2"/>
  <text x="80" y="120" fill="#d4a84b" font-family="ui-monospace, Cascadia Code, SF Mono, Menlo, Consolas, monospace" font-size="28" letter-spacing="4">MELIH CETINKAYA</text>
  <text x="80" y="320" fill="#ebe4d6" font-family="ui-monospace, Cascadia Code, SF Mono, Menlo, Consolas, monospace" font-size="64" font-weight="700">${escapeXml(title)}</text>
  <text x="80" y="400" fill="#a89880" font-family="ui-monospace, Cascadia Code, SF Mono, Menlo, Consolas, monospace" font-size="28">${escapeXml(techLine)}</text>
  <text x="80" y="540" fill="#dc4638" font-family="ui-monospace, Cascadia Code, SF Mono, Menlo, Consolas, monospace" font-size="22" letter-spacing="3">PORTFOLIO</text>
</svg>`;
}

async function main() {
  const sharp = loadSharp();
  if (!sharp) {
    console.error('sharp is required. Run: npm install sharp');
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });
  const data = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
  const detailProjects = data.projects.filter((p) => p.detailPaths && p.detailPaths.en);

  for (const project of detailProjects) {
    const enPath = path.join(root, project.detailPaths.en.replace(/^\//, ''));
    if (!fs.existsSync(enPath)) {
      console.warn('skip missing', enPath);
      continue;
    }
    const title = readTitle(enPath) || project.id;
    const techs = pickTechs(project.technologies || []);
    const svg = buildSvg({ title, techs });
    const out = path.join(outDir, `${project.id}.png`);
    await sharp(Buffer.from(svg)).png().toFile(out);
    console.log('wrote', path.relative(root, out), title);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
