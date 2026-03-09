import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { siteConfig } from "../src/data/site.config.mjs";
import { buildSite, formatResourceSize } from "./build-site.mjs";

const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

function rootPath(...segments) {
  return path.join(ROOT, ...segments);
}

async function fileExists(relativePath) {
  try {
    await fs.access(rootPath(...relativePath.split("/")));
    return true;
  } catch {
    return false;
  }
}

async function readUtf8(relativePath) {
  return fs.readFile(rootPath(...relativePath.split("/")), "utf8");
}

export async function validateSite() {
  const errors = [];
  const requiredFiles = [
    "index.html",
    "en/index.html",
    "404.html",
    "assets/styles.css",
    "robots.txt",
    "sitemap.xml",
    "site.webmanifest",
  ];

  for (const requiredFile of requiredFiles) {
    if (!(await fileExists(requiredFile))) {
      errors.push(`Missing generated file: ${requiredFile}`);
    }
  }

  for (const resource of siteConfig.resources) {
    if (!(await fileExists(resource.sourcePath))) {
      errors.push(`Missing resource file: ${resource.sourcePath}`);
    }
  }

  if (errors.length > 0) {
    return { errors };
  }

  const [
    homeHtml,
    englishHtml,
    notFoundHtml,
    stylesCss,
    manifestRaw,
    sitemapRaw,
    robotsRaw,
  ] = await Promise.all([
    readUtf8("index.html"),
    readUtf8("en/index.html"),
    readUtf8("404.html"),
    readUtf8("assets/styles.css"),
    readUtf8("site.webmanifest"),
    readUtf8("sitemap.xml"),
    readUtf8("robots.txt"),
  ]);

  if (Buffer.byteLength(stylesCss, "utf8") > 10_000) {
    errors.push("Generated CSS exceeds the 10 KB raw budget.");
  }

  if (
    homeHtml.includes("assets/scripts.js") ||
    englishHtml.includes("assets/scripts.js")
  ) {
    errors.push("Home pages still reference runtime JavaScript.");
  }

  if (
    homeHtml.includes("localStorage") ||
    englishHtml.includes("localStorage")
  ) {
    errors.push(
      "Client-side language persistence code still appears in generated output."
    );
  }

  if (!homeHtml.includes('href="en/"')) {
    errors.push("Bangla home page is missing the English language switch.");
  }

  if (!englishHtml.includes('href="../"')) {
    errors.push("English home page is missing the Bangla language switch.");
  }

  if (
    !homeHtml.includes('hreflang="en-US"') ||
    !englishHtml.includes('hreflang="bn-BD"')
  ) {
    errors.push("Localized hreflang tags are incomplete.");
  }

  if (!notFoundHtml.includes('content="noindex,follow"')) {
    errors.push("404 page is missing the noindex robots directive.");
  }

  const manifest = JSON.parse(manifestRaw);
  if (
    manifest.start_url !== `${siteConfig.basePath}/` ||
    manifest.scope !== `${siteConfig.basePath}/`
  ) {
    errors.push(
      "Manifest start_url or scope does not match the configured GitHub Pages base path."
    );
  }

  const expectedRootUrl = `${siteConfig.siteUrl}${siteConfig.basePath}/`;
  const expectedEnglishUrl = `${siteConfig.siteUrl}${siteConfig.basePath}/en/`;
  if (
    !sitemapRaw.includes(expectedRootUrl) ||
    !sitemapRaw.includes(expectedEnglishUrl)
  ) {
    errors.push("Sitemap is missing one or more expected localized URLs.");
  }

  if (
    !robotsRaw.includes(
      `${siteConfig.siteUrl}${siteConfig.basePath}/sitemap.xml`
    )
  ) {
    errors.push("robots.txt does not reference the generated sitemap.");
  }

  for (const resource of siteConfig.resources) {
    const stats = await fs.stat(rootPath(...resource.sourcePath.split("/")));
    const sizeLabel = formatResourceSize(stats.size);
    if (!homeHtml.includes(sizeLabel) || !englishHtml.includes(sizeLabel)) {
      errors.push(
        `Expected computed size label ${sizeLabel} for ${resource.sourcePath} was not found.`
      );
    }
  }

  return { errors };
}

const isDirectRun =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  await buildSite();
  const result = await validateSite();

  if (result.errors.length > 0) {
    for (const error of result.errors) {
      console.error(`Validation error: ${error}`);
    }
    process.exitCode = 1;
  } else {
    console.log("Site validation passed.");
  }
}
