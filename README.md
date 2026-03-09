# PEDL: Bricks to Blocks Materials

This repository publishes the PEDL Bricks to Blocks materials site at <https://mohsin-bd.github.io/pedl-bricks-to-blocks-materials/>.

The site remains a plain static GitHub Pages deployment, but the public files in the repository root are now generated from a maintainable source structure under `src/` and `scripts/`.

## Repository layout

- `src/data/site.config.mjs` holds the single source of truth for site metadata, localized copy, and downloadable resource definitions.
- `src/templates/` contains the shared HTML rendering logic for the home pages and the 404 page.
- `src/styles/` contains the split, commented stylesheet sources that are bundled into `assets/styles.css`.
- `scripts/build-site.mjs` generates `index.html`, `en/index.html`, `404.html`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, and the bundled stylesheet.
- `scripts/validate-site.mjs` checks generated output, metadata consistency, computed file sizes, and route integrity.
- `scripts/perf-audit.mjs` runs a local Lighthouse audit against `/` and `/en/`.
- `scripts/generate_og_image.py` regenerates the social share image in `assets/og-image.png`.
- `resources/` stores the distributed PDFs and PPTX source deck.

## Development workflow

1. Install dependencies with `npm install`.
2. Update copy, URLs, or resource metadata in `src/data/site.config.mjs`.
3. Update shared markup in `src/templates/` if the page structure changes.
4. Update styles in `src/styles/` if the presentation changes.
5. Regenerate the deployable site with `npm run build`.
6. Verify code quality with `npm run check`.
7. Run `npm run perf` when you want a local Lighthouse audit of the production build.

## Commands

- `npm run build` generates the public site files.
- `npm run lint` rebuilds the site and runs ESLint, Stylelint, Prettier checks, and HTML validation.
- `npm run test` rebuilds the site and runs the Node test suite.
- `npm run check` runs the full build, lint, and test pipeline.
- `npm run perf` runs a local Lighthouse audit against the generated Bangla and English home pages.

## Deployment assumptions

- GitHub Pages publishes the repository root.
- The Bangla page remains the canonical root route at `/`.
- The English page is generated at `/en/`.
- The documents in `resources/` are published as-is and are not optimized or rewritten during the build.

## OG image utility

To regenerate the social share image:

```bash
python scripts/generate_og_image.py
```

To write the image somewhere else temporarily:

```bash
python scripts/generate_og_image.py --output tmp/og-image.png
```
