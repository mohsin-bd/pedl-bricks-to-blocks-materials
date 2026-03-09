import test from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { homeLocaleKeys, siteConfig } from "../src/data/site.config.mjs";
import { buildSite, formatResourceSize } from "../scripts/build-site.mjs";
import { validateSite } from "../scripts/validate-site.mjs";

const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

function rootPath(...segments) {
  return path.join(ROOT, ...segments);
}

test.before(async () => {
  await buildSite();
});

test("resource registry points to existing files", async () => {
  for (const resource of siteConfig.resources) {
    const stats = await fs.stat(rootPath(...resource.sourcePath.split("/")));
    assert.ok(stats.size > 0, `${resource.sourcePath} should not be empty.`);
  }
});

test("computed resource sizes stay aligned with the shipped documents", async () => {
  const expectedLabels = {
    "resources/2025-10-26 Block_Producers_List_MMH.pdf": "275 KB",
    "resources/Workshop_Training_Manual.pdf": "20.8 MB",
    "resources/PEDL B2B Workshop Booklet.pdf": "12.5 MB",
  };

  for (const [resourcePath, expectedLabel] of Object.entries(expectedLabels)) {
    const stats = await fs.stat(rootPath(...resourcePath.split("/")));
    assert.equal(formatResourceSize(stats.size), expectedLabel);
  }
});

test("generated pages satisfy validation rules", async () => {
  const result = await validateSite();
  assert.deepEqual(result.errors, []);
});

test("localized home pages are emitted without runtime i18n scripts", async () => {
  const indexHtml = await fs.readFile(rootPath("index.html"), "utf8");
  const englishHtml = await fs.readFile(rootPath("en", "index.html"), "utf8");

  assert.match(indexHtml, /href="en\/"/);
  assert.match(englishHtml, /href="\.\.\//);
  assert.doesNotMatch(indexHtml, /assets\/scripts\.js/);
  assert.doesNotMatch(englishHtml, /assets\/scripts\.js/);
  assert.doesNotMatch(indexHtml, /localStorage/);
  assert.doesNotMatch(englishHtml, /localStorage/);
});

test("generated pages advertise both localized URLs", async () => {
  for (const localeKey of homeLocaleKeys) {
    const locale = siteConfig.locales[localeKey];
    const outputPath = locale.outputPath.split("/");
    const html = await fs.readFile(rootPath(...outputPath), "utf8");

    assert.match(html, /hreflang="bn-BD"/);
    assert.match(html, /hreflang="en-US"/);
    assert.match(html, new RegExp(siteConfig.basePath.replaceAll("/", "\\/")));
  }
});

test("404 page remains noindex and routes back to the home page", async () => {
  const html = await fs.readFile(rootPath("404.html"), "utf8");

  assert.match(html, /content="noindex,follow"/);
  assert.match(html, /href="index\.html"/);
  assert.match(html, /Open project page/);
});
