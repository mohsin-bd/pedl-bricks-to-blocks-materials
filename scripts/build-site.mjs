import { createHash } from "node:crypto";
import { execFile, spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { minify } from "html-minifier-terser";

import { homeLocaleKeys, siteConfig } from "../src/data/site.config.mjs";
import { relativeHref } from "../src/templates/helpers.mjs";
import { renderHomePage } from "../src/templates/home-page.mjs";
import { renderLayout } from "../src/templates/layout.mjs";
import { renderNotFoundPage } from "../src/templates/not-found-page.mjs";

const execFileAsync = promisify(execFile);
const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const GENERATED_HTML_HEADER =
  "<!-- Generated file. Edit src/* and scripts/* instead of this output. -->";
const GENERATED_CSS_HEADER =
  "/* Generated file. Edit src/styles/* and scripts/build-site.mjs instead of this output. */";
const BUTTON_CLASS_BY_INDEX = ["", "secondary", "outline"];

function rootPath(...segments) {
  return path.join(ROOT, ...segments);
}

function toAbsoluteUrl(publicPath) {
  const normalizedPath =
    publicPath === "/" ? "/" : publicPath.replace(/\/?$/, "/");
  return `${siteConfig.siteUrl}${siteConfig.basePath}${normalizedPath}`;
}

function pagePathHelpers(outputPath) {
  return {
    appleTouchIconHref: relativeHref(
      outputPath,
      siteConfig.assets.appleTouchIcon
    ),
    faviconHref: relativeHref(outputPath, siteConfig.assets.favicon),
    manifestHref: relativeHref(outputPath, "site.webmanifest"),
    stylesheetHref: relativeHref(outputPath, "assets/styles.css"),
  };
}

export function formatResourceSize(bytes) {
  if (bytes >= 1_000_000) {
    return `${(bytes / 1_000_000).toFixed(1)} MB`;
  }

  return `${Math.round(bytes / 1024)} KB`;
}

async function readResourceFacts() {
  const facts = [];

  for (const [index, resource] of siteConfig.resources.entries()) {
    const absoluteSourcePath = rootPath(resource.sourcePath);
    const stats = await fs.stat(absoluteSourcePath);

    facts.push({
      ...resource,
      absoluteSourcePath,
      sizeBytes: stats.size,
      sizeLabel: formatResourceSize(stats.size),
      buttonClass: BUTTON_CLASS_BY_INDEX[index] || "",
    });
  }

  return facts;
}

function createHomeLocaleContext(localeKey) {
  const locale = siteConfig.locales[localeKey];

  return {
    ...locale,
    compilerAriaLabel:
      localeKey === "bn"
        ? "Md. Mohsin Hossain-এর ওয়েবসাইট খুলুন"
        : "Open Md. Mohsin Hossain's website",
    compilerEmail: siteConfig.compiler.email,
    compilerName: siteConfig.compiler.name,
    compilerUrl: siteConfig.compiler.url,
    emailAriaLabel:
      localeKey === "bn"
        ? "মোহসিন হোসাইনের ইমেইল ঠিকানায় যোগাযোগ করুন"
        : "Email Mohsin Hossain",
    projectPageUrl: siteConfig.projectPageUrl,
    updatedAt: siteConfig.updatedAt,
  };
}

function createLocalizedResources(resourceFacts, localeKey, outputPath) {
  return resourceFacts.map((resource) => {
    const copy = resource.localeCopy[localeKey];

    return {
      ...resource,
      ...copy,
      href: encodeURI(relativeHref(outputPath, resource.sourcePath)),
      metaLabel: `${copy.metaLead} - PDF - ${resource.sizeLabel}`,
      srDescriptionId: `desc-${resource.id}`,
    };
  });
}

function createStructuredData(locale, resources) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: locale.title,
    description: locale.metaDescription,
    url: toAbsoluteUrl(locale.publicPath),
    inLanguage: locale.htmlLang,
    isAccessibleForFree: true,
    publisher: {
      "@type": "Organization",
      name: siteConfig.publisher.name,
      url: siteConfig.publisher.url,
    },
    hasPart: resources.map((resource) => ({
      "@type": "MediaObject",
      name: resource.title,
      encodingFormat: resource.mediaType,
      contentUrl: `${siteConfig.siteUrl}${siteConfig.basePath}/${resource.sourcePath.replaceAll(" ", "%20")}`,
    })),
  });
}

function createScriptHash(scriptContent) {
  return createHash("sha256").update(scriptContent, "utf8").digest("base64");
}

function createHomeCsp(scriptContent) {
  const scriptHash = createScriptHash(scriptContent);
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'none'",
    "img-src 'self' data:",
    "manifest-src 'self'",
    "object-src 'none'",
    `script-src 'sha256-${scriptHash}'`,
    "style-src 'self'",
    "connect-src 'none'",
    "font-src 'none'",
    "media-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

function createNoScriptCsp() {
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'none'",
    "img-src 'self' data:",
    "manifest-src 'self'",
    "object-src 'none'",
    "script-src 'none'",
    "style-src 'self'",
    "connect-src 'none'",
    "font-src 'none'",
    "media-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

function createHreflangLinks() {
  const rootUrl = toAbsoluteUrl("/");
  const englishUrl = toAbsoluteUrl("/en/");

  return [
    `<link rel="alternate" hreflang="bn-BD" href="${rootUrl}">`,
    `<link rel="alternate" hreflang="en-US" href="${englishUrl}">`,
    `<link rel="alternate" hreflang="x-default" href="${rootUrl}">`,
  ].join("\n  ");
}

async function bundleStyles() {
  const lightningBinaryUnix = rootPath("node_modules", ".bin", "lightningcss");
  const lightningBinaryPs1 = rootPath(
    "node_modules",
    ".bin",
    "lightningcss.ps1"
  );
  const lightningBinaryCmd = rootPath(
    "node_modules",
    ".bin",
    "lightningcss.cmd"
  );

  if (process.platform === "win32") {
    // Try PowerShell Core if available; otherwise fall back to the .cmd shim.
    try {
      await execFileAsync(
        "pwsh.exe",
        [
          "-NoLogo",
          "-NoProfile",
          "-Command",
          `& "${lightningBinaryPs1}" "src/styles/index.css" --bundle --minify -o "assets/styles.css"`,
        ],
        { cwd: ROOT }
      );
    } catch (err) {
      if (err && err.code === "ENOENT") {
        await runCommand(lightningBinaryCmd, [
          "src/styles/index.css",
          "--bundle",
          "--minify",
          "-o",
          "assets/styles.css",
        ]);
      } else {
        throw err;
      }
    }
  } else {
    await runCommand(lightningBinaryUnix, [
      "src/styles/index.css",
      "--bundle",
      "--minify",
      "-o",
      "assets/styles.css",
    ]);
  }

  const generatedCss = await fs.readFile(
    rootPath("assets", "styles.css"),
    "utf8"
  );
  await fs.writeFile(
    rootPath("assets", "styles.css"),
    `${GENERATED_CSS_HEADER}\n${generatedCss}`,
    "utf8"
  );
}

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: ROOT,
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} exited with code ${code}`));
      }
    });
  });
}

async function minifyHtml(html) {
  return minify(html, {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    decodeEntities: false,
    removeAttributeQuotes: false,
    removeComments: true,
    sortAttributes: true,
    sortClassName: true,
  });
}

async function writeHtml(outputPath, html) {
  const absoluteOutputPath = rootPath(...outputPath.split("/"));
  await fs.mkdir(path.dirname(absoluteOutputPath), { recursive: true });
  const minifiedHtml = (await minifyHtml(html)).replace(
    /^<!doctype html>/i,
    "<!DOCTYPE html>"
  );
  await fs.writeFile(
    absoluteOutputPath,
    `${GENERATED_HTML_HEADER}\n${minifiedHtml}\n`,
    "utf8"
  );
}

async function writeTextFile(outputPath, contents) {
  const absoluteOutputPath = rootPath(...outputPath.split("/"));
  await fs.mkdir(path.dirname(absoluteOutputPath), { recursive: true });
  await fs.writeFile(absoluteOutputPath, contents, "utf8");
}

function createHomeHtml(localeKey, resourceFacts) {
  const locale = createHomeLocaleContext(localeKey);
  const localizedResources = createLocalizedResources(
    resourceFacts,
    localeKey,
    locale.outputPath
  );
  const structuredData = createStructuredData(locale, localizedResources);

  return renderLayout({
    alternateLocaleCode: localeKey === "bn" ? "en_US" : "bn_BD",
    bodyMarkup: renderHomePage({
      locale,
      resources: localizedResources,
    }),
    canonicalUrl: toAbsoluteUrl(locale.publicPath),
    csp: createHomeCsp(structuredData),
    description: locale.metaDescription,
    hreflangLinks: createHreflangLinks(),
    htmlLang: locale.htmlLang,
    localeCode: locale.localeCode,
    ogImageAbsoluteUrl: `${siteConfig.siteUrl}${siteConfig.basePath}/${siteConfig.assets.ogImage}`,
    ogImageAlt: locale.ogImageAlt,
    ogTitle: locale.title,
    pathHelpers: pagePathHelpers(locale.outputPath),
    robots: "index,follow,max-image-preview:large",
    structuredData,
    themeColor: siteConfig.themeColor,
    twitterDescription: locale.twitterCardDescription,
  });
}

function createNotFoundHtml() {
  const outputPath = "404.html";

  return renderLayout({
    alternateLocaleCode: "",
    bodyMarkup: renderNotFoundPage({
      content: siteConfig.notFound,
      homeHref: relativeHref(outputPath, "index.html"),
      projectHref: siteConfig.notFound.projectHref,
    }),
    canonicalUrl: `${siteConfig.siteUrl}${siteConfig.basePath}/404.html`,
    csp: createNoScriptCsp(),
    description: siteConfig.notFound.metaDescription,
    hreflangLinks: "",
    htmlLang: "en",
    localeCode: "en_US",
    ogImageAbsoluteUrl: `${siteConfig.siteUrl}${siteConfig.basePath}/${siteConfig.assets.ogImage}`,
    ogImageAlt: "PEDL Bricks to Blocks materials download page",
    ogTitle: siteConfig.notFound.title,
    pathHelpers: pagePathHelpers(outputPath),
    robots: "noindex,follow",
    structuredData: "",
    themeColor: siteConfig.themeColor,
    twitterDescription: siteConfig.notFound.metaDescription,
  });
}

function createManifest() {
  return JSON.stringify(
    {
      name: siteConfig.app.name,
      short_name: siteConfig.app.shortName,
      description: siteConfig.app.description,
      start_url: `${siteConfig.basePath}/`,
      scope: `${siteConfig.basePath}/`,
      display: "standalone",
      background_color: siteConfig.backgroundColor,
      theme_color: siteConfig.themeColor,
      icons: [
        {
          src: siteConfig.assets.icon192,
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: siteConfig.assets.icon512,
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    null,
    2
  );
}

function createSitemap() {
  const pages = homeLocaleKeys.map((localeKey) => {
    const locale = siteConfig.locales[localeKey];
    return `  <url>\n    <loc>${toAbsoluteUrl(locale.publicPath)}</loc>\n    <lastmod>${siteConfig.updatedAt}</lastmod>\n  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.join(
    "\n"
  )}\n</urlset>\n`;
}

function createRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteConfig.siteUrl}${siteConfig.basePath}/sitemap.xml\n`;
}

export async function buildSite() {
  const resourceFacts = await readResourceFacts();

  await bundleStyles();
  await writeHtml("index.html", createHomeHtml("bn", resourceFacts));
  await writeHtml("en/index.html", createHomeHtml("en", resourceFacts));
  await writeHtml("404.html", createNotFoundHtml());
  await writeTextFile("site.webmanifest", `${createManifest()}\n`);
  await writeTextFile("sitemap.xml", createSitemap());
  await writeTextFile("robots.txt", createRobots());

  return resourceFacts;
}

const isDirectRun =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  await buildSite();
}
