# Portfolio - Melih CETINKAYA

Site portfolio bilingue (FR / EN) : projets, compétences, expérience et candidature en alternance.

## Lien

[melih0132.github.io](https://melih0132.github.io/)

- Français : [/fr/](https://melih0132.github.io/fr/)
- English : [/en/](https://melih0132.github.io/en/)

## Contenu

- Accueil avec objectif d'alternance et liens CV / réseaux
- Index de projets avec filtre multi-technologies (autocomplete, chips, intersection)
- Pages détail pour une partie des projets (galerie, stack, liens)
- Sections à propos, expérience, compétences, langues, contact
- Mode océan réduit (perf / batterie) via le header
- Palette de commandes `Ctrl+K` / `Cmd+K` (sections, projets, langue, CV, océan)

## Stack du site

- HTML5, CSS, JavaScript (vanilla)
- Hébergement GitHub Pages
- Données filtres : [`assets/data/projects.json`](assets/data/projects.json)
- Océan ASCII en fond : sources TypeScript dans [`assets/js/ocean/`](assets/js/ocean/), bundle navigateur [`assets/js/ocean.min.js`](assets/js/ocean.min.js) (adaptation MIT de ascii-sharks, voir [`assets/js/ocean/LICENSE`](assets/js/ocean/LICENSE))
- Images Open Graph projet : [`assets/og/`](assets/og/)

## Sources et fichiers minifiés

Les pages de production chargent les fichiers `.min` :

- [`assets/css/style.min.css`](assets/css/style.min.css) (source : `style.css`)
- [`assets/js/portfolio.min.js`](assets/js/portfolio.min.js) (source : `portfolio.js`)
- [`assets/js/ocean.min.js`](assets/js/ocean.min.js) (sources : `assets/js/ocean/*.ts`)

Régénération typique :

```bash
npx terser assets/js/portfolio.js -c -m -o assets/js/portfolio.min.js
npx clean-css-cli -o assets/css/style.min.css assets/css/style.css
npx esbuild assets/js/ocean/browser.ts --bundle --minify --outfile=assets/js/ocean.min.js --format=iife
```

Images OG (nécessite `sharp` en local) :

```bash
npm install sharp
node scripts/generate-og.mjs
```

## Contact

- Email : m.ctk3201@gmail.com
- LinkedIn : [linkedin.com/in/melih-ctk](https://www.linkedin.com/in/melih-ctk/)
- GitHub : [github.com/melih0132](https://github.com/melih0132)
