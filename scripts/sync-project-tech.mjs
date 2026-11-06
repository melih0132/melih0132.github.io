import fs from 'fs';

const tech = {
  'evit-shuriken':
    '.NET/C# · WPF · XAML · Visual Studio · Git · GitHub',
  'dortan-app':
    '.NET/C# · WPF · XAML · SQL · PostgreSQL · pgAdmin4 · Figma · Visual Studio · Git · GitHub',
  kube: 'Unity · .NET/C# · 3D Modeling · Unity Editor · Visual Studio · Git · GitHub',
  lpo: 'Visual Paradigm · PowerAMC · PostgreSQL · pgAdmin4 · SQL · Excel · Power BI · Microsoft Teams · Git · GitHub',
  'uber-laravel':
    'PHP · Laravel · PostgreSQL · SQL · Bootstrap · Node.js · Power BI · Visual Paradigm · PowerAMC · Microsoft Azure · Microsoft Teams · VS Code · Git · GitHub · Agile · MVC',
  'uber-vuejs-dotnet':
    'Vue.js · .NET Core · C# · Node.js · PostgreSQL · RESTful API · JWT · Swagger · VS Code · Visual Studio · Git · GitHub · Postman · Microsoft Teams · MVC',
  heva: 'FastAPI · React · TypeScript · Node.js · OpenAI · Next · PostgreSQL · SQLAlchemy · Alembic · Pytest · Tailwind CSS · RESTful API · Swagger · Postman · Figma · Framer · Docker · Git · GitHub · VS Code',
  'smarthome-lite':
    'Python · FastAPI · Flask · PostgreSQL · SQLAlchemy · JWT · Pytest · Next · React · TypeScript · Tailwind CSS · Kotlin · Jetpack Compose · Raspberry Pi · Z-Wave · Android Studio · VS Code · Git · GitHub',
  'shared-ia':
    'Node.js · Express.js · Socket.io · React · TypeScript · Vite · Tailwind CSS · Zustand · OpenAI · PostgreSQL · JWT · Swagger · VS Code · Git · GitHub',
  ranking: 'Python · Tkinter · SQLite · VS Code · Git · GitHub',
  'la-guilde-des-seigneurs':
    'PHP · Symfony · MySQL · Doctrine · JWT · Bootstrap · Twig · OpenAPI · RESTful API · HttpClient · PHPUnit · VS Code · Git · GitHub · MVC',
};

function techSection(line) {
  return `        <section class="project-block"><div class="wrap"><h2>Tech</h2><p class="project-tech">${line}</p></div></section>\n`;
}

for (const [id, line] of Object.entries(tech)) {
  for (const rel of [`fr/projets/${id}.html`, `en/projects/${id}.html`]) {
    let html = fs.readFileSync(rel, 'utf8');
    if (/<p class="project-tech">[^<]*<\/p>/.test(html)) {
      html = html.replace(
        /<p class="project-tech">[^<]*<\/p>/,
        `<p class="project-tech">${line}</p>`,
      );
    } else if (/<h2>Explorer<\/h2>|<h2>Explore<\/h2>/.test(html)) {
      html = html.replace(
        /(<section class="project-block">\s*<div class="wrap">\s*<h2>(?:Explorer|Explore)<\/h2>)/,
        `${techSection(line)}        $1`,
      );
    } else {
      console.log('NO SLOT', rel);
      continue;
    }
    fs.writeFileSync(rel, html);
    console.log('OK', rel);
  }
}
