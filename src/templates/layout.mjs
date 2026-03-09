import { escapeHtml, escapeJsonScript } from "./helpers.mjs";

export function renderLayout({
  alternateLocaleCode,
  bodyMarkup,
  canonicalUrl,
  csp,
  description,
  hreflangLinks,
  htmlLang,
  localeCode,
  ogImageAbsoluteUrl,
  ogImageAlt,
  ogTitle,
  pathHelpers,
  robots,
  structuredData,
  themeColor,
  twitterDescription,
}) {
  const { appleTouchIconHref, faviconHref, manifestHref, stylesheetHref } =
    pathHelpers;

  return `<!doctype html>
<html lang="${escapeHtml(htmlLang)}" data-theme="mmh_pedl">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(ogTitle)}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="${escapeHtml(robots)}">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <meta name="color-scheme" content="light">
  <meta name="theme-color" content="${escapeHtml(themeColor)}">
  <meta http-equiv="Content-Security-Policy" content="${escapeHtml(csp)}">
  <link rel="canonical" href="${escapeHtml(canonicalUrl)}">
  ${hreflangLinks}
  <link rel="icon" href="${escapeHtml(faviconHref)}" type="image/svg+xml">
  <link rel="apple-touch-icon" href="${escapeHtml(appleTouchIconHref)}" sizes="180x180">
  <link rel="manifest" href="${escapeHtml(manifestHref)}">
  <meta property="og:locale" content="${escapeHtml(localeCode)}">
  ${alternateLocaleCode ? `<meta property="og:locale:alternate" content="${escapeHtml(alternateLocaleCode)}">` : ""}
  <meta property="og:site_name" content="PEDL">
  <meta property="og:title" content="${escapeHtml(ogTitle)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${escapeHtml(canonicalUrl)}">
  <meta property="og:image" content="${escapeHtml(ogImageAbsoluteUrl)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${escapeHtml(ogImageAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(ogTitle)}">
  <meta name="twitter:description" content="${escapeHtml(twitterDescription)}">
  <meta name="twitter:image" content="${escapeHtml(ogImageAbsoluteUrl)}">
  <meta name="twitter:image:alt" content="${escapeHtml(ogImageAlt)}">
  <link rel="stylesheet" href="${escapeHtml(stylesheetHref)}">
  ${
    structuredData
      ? `<script type="application/ld+json">${escapeJsonScript(structuredData)}</script>`
      : ""
  }
</head>
${bodyMarkup}
</html>`;
}
