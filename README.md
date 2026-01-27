Access the project materials webpage at [https://mohsin-bd.github.io/pedl-bricks-to-blocks-materials/](https://mohsin-bd.github.io/pedl-bricks-to-blocks-materials/)

This repository contains open materials for the PEDL: Bricks to Blocks project, including PDFs for block producer lists and training manuals. It will be updated regularly with new files in the future.

Local development

1. Install Node (optional but recommended).
2. Run `npm run start` to serve the site locally on http://localhost:8080.

Accessibility

- A GitHub Actions workflow (`.github/workflows/accessibility.yml`) runs `pa11y-ci` and `lhci` on push/PRs.

Notes

- Downloadable resources live in `resources/` and are linked from the front page.
- Styles are in `assets/styles.css` and small interactive scripts are in `assets/scripts.js`.

Contributing

- Make changes on a branch and open a pull request against `main`.
- The accessibility workflow will run automatically.
