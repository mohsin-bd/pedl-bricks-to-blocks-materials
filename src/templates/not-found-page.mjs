import { escapeHtml } from "./helpers.mjs";

export function renderNotFoundPage({ content, homeHref, projectHref }) {
  return `<body>
  <a class="skip-link" href="#main">Skip to main content</a>
  <main id="main" class="wrap not-found-wrap">
    <section class="card not-found-card" aria-labelledby="page-not-found">
      <div class="logo" aria-hidden="true">B2B</div>
      <h1 id="page-not-found">${escapeHtml(content.heading)}</h1>
      <p>${escapeHtml(content.lead)}</p>
      <p lang="bn">${escapeHtml(content.leadBangla)}</p>
      <ul class="actions">
        <li class="action-item">
          <a class="button" href="${escapeHtml(homeHref)}">${escapeHtml(content.homeLabel)}</a>
        </li>
        <li class="action-item">
          <a
            class="button outline"
            href="${escapeHtml(projectHref)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            ${escapeHtml(content.projectLabel)}
          </a>
        </li>
      </ul>
    </section>
  </main>
</body>`;
}
