import { escapeHtml, iconMarkup } from "./helpers.mjs";

export function renderHomePage({ locale, resources }) {
  const summaryItems = resources
    .map(
      (resource) => `
          <li>
            <strong>${escapeHtml(resource.title)}:</strong>
            ${escapeHtml(resource.description)}
          </li>`
    )
    .join("");

  const actionItems = resources
    .map(
      (resource) => `
        <li class="action-item">
          <a
            class="button${resource.buttonClass ? ` ${resource.buttonClass}` : ""}"
            href="${escapeHtml(resource.href)}"
            download="${escapeHtml(resource.downloadFileName)}"
            type="${escapeHtml(resource.mediaType)}"
            title="${escapeHtml(resource.buttonTitle)}"
            aria-label="${escapeHtml(resource.buttonAria)}"
            aria-describedby="${escapeHtml(resource.srDescriptionId)}"
          >
            ${iconMarkup(resource.icon)}
            <span>${escapeHtml(resource.buttonLabel)}</span>
            <span class="sr-only">PDF</span>
          </a>
          <span id="${escapeHtml(resource.srDescriptionId)}" class="sr-only">${escapeHtml(
            resource.buttonSrDescription
          )}</span>
        </li>`
    )
    .join("");

  const resourceCards = resources
    .map(
      (resource) => `
        <li class="resource-item">
          <div class="resource-icon" aria-hidden="true">
            ${iconMarkup(resource.icon).replace(' width="18" height="18"', "")}
          </div>
          <div>
            <strong>${escapeHtml(resource.title)}</strong>
            <div class="meta-small">${escapeHtml(resource.metaLabel)}</div>
          </div>
        </li>`
    )
    .join("");

  return `<body>
  <a class="skip-link" href="#main">${escapeHtml(locale.skipLink)}</a>

  <main id="main" class="wrap">
    <header class="site-header">
      <div class="header-left">
        <div class="logo" role="img" aria-label="Bricks to Blocks logo">B2B</div>
        <div class="brand">
          <h1>${escapeHtml(locale.heading)}</h1>
          <p class="sub">${escapeHtml(locale.subheading)}</p>
        </div>
      </div>

      <nav class="nav-group" aria-label="Primary">
        <div class="nav-actions">
          <a
            class="button small outline"
            href="${escapeHtml(locale.projectPageUrl)}"
            title="${escapeHtml(locale.navProjectTitle)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>${escapeHtml(locale.navProjectLabel)}</span>
          </a>
          <a
            class="button small outline"
            href="#downloads"
            title="${escapeHtml(locale.navDownloadsTitle)}"
          >
            <span>${escapeHtml(locale.navDownloadsLabel)}</span>
          </a>
          <a
            class="lang-pill"
            href="${escapeHtml(locale.languageSwitch.href)}"
            title="${escapeHtml(locale.languageSwitch.title)}"
            lang="${escapeHtml(locale.languageSwitch.lang)}"
            hreflang="${escapeHtml(locale.languageSwitch.hreflang)}"
          >
            ${escapeHtml(locale.languageSwitch.label)}
          </a>
        </div>
      </nav>
    </header>

    <hr class="section-separator">

    <p>${escapeHtml(locale.intro)}</p>

    <p class="intro-label">${escapeHtml(locale.projectInfoLabel)}</p>
    <p>
      <a
        class="button outline"
        href="${escapeHtml(locale.projectPageUrl)}"
        title="${escapeHtml(locale.projectButtonTitle)}"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>${escapeHtml(locale.projectButtonLabel)}</span>
      </a>
    </p>

    <section class="card" aria-labelledby="repository-contents">
      <h2 id="repository-contents" class="sr-only">${escapeHtml(locale.repositoryHeading)}</h2>
      <details open>
        <summary>${escapeHtml(locale.summaryLabel)}</summary>
        <ul class="list">${summaryItems}
        </ul>
      </details>
    </section>

    <section class="card" aria-labelledby="downloads">
      <h2 id="downloads">${escapeHtml(locale.downloadsHeading)}</h2>
      <p class="section-note">${escapeHtml(locale.downloadsNote)}</p>

      <ul class="actions">${actionItems}
      </ul>

      <ul class="resources">${resourceCards}
      </ul>
    </section>

    <div class="meta">
      <span class="badge">
        <span>${escapeHtml(locale.updatedLabel)}</span>
        <time datetime="${escapeHtml(locale.updatedAt)}">${escapeHtml(locale.updatedAt)}</time>
      </span>
    </div>

    <footer class="site-footer">
      <div class="footer-left">
        <span>${escapeHtml(locale.footerContactPrefix)}</span>
        <a href="mailto:${escapeHtml(locale.compilerEmail)}">
          ${escapeHtml(locale.compilerEmail)}
        </a>
        <span>${escapeHtml(locale.footerContactSuffix)}</span>
      </div>
      <div class="footer-right">
        <div class="tiny">${escapeHtml(locale.license)}</div>
      </div>
    </footer>
  </main>
</body>`;
}
