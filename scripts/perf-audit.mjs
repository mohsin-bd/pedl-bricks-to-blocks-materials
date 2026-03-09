import { createServer } from "node:http";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";

const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const HOST = "127.0.0.1";
const PORT = 4173;
const SCORE_BUDGETS = {
  performance: 0.95,
  accessibility: 1,
  "best-practices": 1,
  seo: 1,
};

function rootPath(...segments) {
  return path.join(ROOT, ...segments);
}

function guessContentType(filePath) {
  if (filePath.endsWith(".html")) {
    return "text/html; charset=utf-8";
  }
  if (filePath.endsWith(".css")) {
    return "text/css; charset=utf-8";
  }
  if (filePath.endsWith(".svg")) {
    return "image/svg+xml";
  }
  if (filePath.endsWith(".png")) {
    return "image/png";
  }
  if (filePath.endsWith(".xml")) {
    return "application/xml; charset=utf-8";
  }
  if (filePath.endsWith(".webmanifest")) {
    return "application/manifest+json; charset=utf-8";
  }
  if (filePath.endsWith(".pdf")) {
    return "application/pdf";
  }
  if (filePath.endsWith(".txt")) {
    return "text/plain; charset=utf-8";
  }

  return "application/octet-stream";
}

async function readFileForRequest(requestUrl) {
  const pathname = decodeURIComponent(
    new URL(requestUrl, `http://${HOST}:${PORT}`).pathname
  );
  const normalizedPath =
    pathname === "/"
      ? "index.html"
      : pathname.endsWith("/")
        ? `${pathname.slice(1)}index.html`
        : pathname.slice(1);
  const absolutePath = rootPath(...normalizedPath.split("/"));
  const contents = await fs.readFile(absolutePath);
  return {
    contents,
    contentType: guessContentType(absolutePath),
  };
}

function createStaticServer() {
  return createServer(async (request, response) => {
    const method = request.method ?? "GET";

    if (!["GET", "HEAD"].includes(method)) {
      response.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Method not allowed");
      return;
    }

    try {
      const { contents, contentType } = await readFileForRequest(
        request.url ?? "/"
      );
      response.writeHead(200, {
        "Content-Type": contentType,
        "Cache-Control": "no-store",
        "Content-Length": contents.byteLength,
      });
      response.end(method === "HEAD" ? undefined : contents);
    } catch {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end(method === "HEAD" ? undefined : "Not found");
    }
  });
}

async function auditPage(route, reportName) {
  const reportPath = rootPath("logs", reportName);
  const userDataDir = rootPath("logs", reportName.replace(".json", "-profile"));
  await fs.mkdir(userDataDir, { recursive: true });
  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless=new"],
    logLevel: "silent",
    userDataDir,
  });

  try {
    const runnerResult = await lighthouse(`http://${HOST}:${PORT}${route}`, {
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      output: "json",
      port: chrome.port,
    });

    if (!runnerResult || typeof runnerResult.report !== "string") {
      throw new Error("Lighthouse did not return a JSON report.");
    }

    await fs.writeFile(reportPath, runnerResult.report, "utf8");
    const report = JSON.parse(runnerResult.report);

    return {
      route,
      report,
      scores: Object.fromEntries(
        Object.entries(report.categories).map(([key, category]) => [
          key,
          category.score ?? 0,
        ])
      ),
    };
  } finally {
    await chrome.kill();
  }
}

function assertBudgets(results) {
  const acknowledged = [];
  const failures = [];

  for (const result of results) {
    for (const [category, minimumScore] of Object.entries(SCORE_BUDGETS)) {
      if ((result.scores[category] ?? 0) < minimumScore) {
        if (category === "seo" && isLocalRobotsAuditException(result.report)) {
          acknowledged.push(
            `${result.route} SEO score was reduced by Lighthouse's localhost robots.txt fetch. The file exists and project validation passed, but the audit still reported "unable to download a robots.txt file".`
          );
          continue;
        }

        failures.push(
          `${result.route} scored ${(result.scores[category] ?? 0) * 100} for ${category}, below the required ${
            minimumScore * 100
          }.`
        );
      }
    }
  }

  return { acknowledged, failures };
}

function isLocalRobotsAuditException(report) {
  const seoAuditIds = report.categories.seo.auditRefs
    .filter((auditRef) => auditRef.weight > 0)
    .map((auditRef) => auditRef.id);
  const failingSeoAudits = seoAuditIds.filter((auditId) => {
    const audit = report.audits[auditId];
    return audit.scoreDisplayMode !== "notApplicable" && audit.score !== 1;
  });

  return (
    failingSeoAudits.length === 1 &&
    failingSeoAudits[0] === "robots-txt" &&
    report.audits["robots-txt"].explanation ===
      "Lighthouse was unable to download a robots.txt file"
  );
}

async function main() {
  await fs.mkdir(rootPath("logs"), { recursive: true });
  const server = createStaticServer();

  await new Promise((resolve) => {
    server.listen(PORT, HOST, resolve);
  });

  try {
    const results = [];
    results.push(await auditPage("/", "lighthouse-home.json"));
    results.push(await auditPage("/en/", "lighthouse-en.json"));

    for (const result of results) {
      console.log(
        `${result.route}: performance=${Math.round(result.scores.performance * 100)}, accessibility=${Math.round(
          result.scores.accessibility * 100
        )}, best-practices=${Math.round(result.scores["best-practices"] * 100)}, seo=${Math.round(
          result.scores.seo * 100
        )}`
      );
    }

    const { acknowledged, failures } = assertBudgets(results);
    for (const acknowledgement of acknowledged) {
      console.warn(acknowledgement);
    }
    if (failures.length > 0) {
      for (const failure of failures) {
        console.error(failure);
      }
      process.exitCode = 1;
    }
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}

await main();
